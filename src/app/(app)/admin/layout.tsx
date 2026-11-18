import { requireUser } from "@/lib/auth";
import { AdminNav } from "./AdminNav";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireUser("ADMIN");
  return (
    <div>
      <AdminNav />
      {children}
    </div>
  );
}
