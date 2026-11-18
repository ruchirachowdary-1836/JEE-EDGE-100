import Link from "next/link";
import { redirect } from "next/navigation";
import { Target } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  if (await getCurrentUser()) redirect("/dashboard");
  return (
    <div className="bg-hero grid min-h-screen place-items-center px-4 py-10">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-6 flex items-center justify-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-electric-500 to-violet-500 text-white"><Target size={20} /></span>
          <span className="font-display text-xl font-bold">JEE EDGE 100</span>
        </Link>
        <div className="card card-pad">{children}</div>
      </div>
    </div>
  );
}
