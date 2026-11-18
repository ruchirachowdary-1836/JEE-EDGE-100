/**
 * Small fixed-window rate limiter kept in process memory.
 * Good enough for a single Node instance; a multi-instance deployment should move this to Redis or the database.
 */
const buckets = new Map<string, { count: number; resetAt: number }>();

export function hit(key: string, limit: number, windowMs: number, now = Date.now()) {
  const b = buckets.get(key);
  if (!b || b.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    if (buckets.size > 10_000) for (const [k, v] of buckets) if (v.resetAt <= now) buckets.delete(k);
    return { allowed: true, retryAfterSec: 0 };
  }
  b.count++;
  return { allowed: b.count <= limit, retryAfterSec: Math.ceil((b.resetAt - now) / 1000) };
}

/** Is the key over its limit right now? Does not count as a hit. */
export function blocked(key: string, limit: number, now = Date.now()) {
  const b = buckets.get(key);
  if (!b || b.resetAt <= now || b.count < limit) return { blocked: false, retryAfterSec: 0 };
  return { blocked: true, retryAfterSec: Math.ceil((b.resetAt - now) / 1000) };
}

export function clearKey(key: string) {
  buckets.delete(key);
}

export function clientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "local";
}
