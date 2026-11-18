import { NextResponse } from "next/server";
import { ZodError, type ZodTypeAny, type output } from "zod";
import { HttpError } from "./auth";

/** Wraps a route handler with uniform JSON error handling. */
export function handler<Ctx = unknown>(fn: (req: Request, ctx: Ctx) => Promise<unknown>) {
  return async (req: Request, ctx: Ctx) => {
    try {
      assertSameOrigin(req);
      const out = await fn(req, ctx);
      return out instanceof Response ? out : NextResponse.json(out ?? { ok: true });
    } catch (err) {
      if (err instanceof HttpError) return NextResponse.json({ error: err.message }, { status: err.status });
      if (err instanceof ZodError)
        return NextResponse.json(
          { error: err.issues.map((i) => `${i.path.join(".") || "input"}: ${i.message}`).join("; ") },
          { status: 400 },
        );
      console.error(err);
      return NextResponse.json({ error: "Something went wrong on the server." }, { status: 500 });
    }
  };
}

/**
 * CSRF defence in depth (the session cookie is already SameSite=Lax): a state-changing request that carries
 * an Origin header must come from this site. Requests without Origin (curl, server-to-server) are allowed,
 * since they cannot ride on a victim's browser cookies.
 */
export function assertSameOrigin(req: Request) {
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) return;
  const origin = req.headers.get("origin");
  if (!origin) return;
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  let originHost: string;
  try {
    originHost = new URL(origin).host;
  } catch {
    throw new HttpError(403, "Cross-site request blocked.");
  }
  if (!host || originHost !== host) throw new HttpError(403, "Cross-site request blocked.");
}

export async function body<S extends ZodTypeAny>(req: Request, schema: S): Promise<output<S>> {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    throw new HttpError(400, "Request body must be JSON.");
  }
  return schema.parse(json);
}
