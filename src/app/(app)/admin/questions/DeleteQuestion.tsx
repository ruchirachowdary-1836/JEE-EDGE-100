"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { api } from "@/lib/client";

export function DeleteQuestion({ id }: { id: string }) {
  const router = useRouter();
  return (
    <button className="muted hover:text-rose-500" aria-label="Delete question" onClick={async () => {
      if (!confirm("Permanently delete this question and all student attempts on it? This cannot be undone. (Unpublishing is usually the better choice.)")) return;
      try { await api(`/api/admin/questions?id=${encodeURIComponent(id)}`, { method: "DELETE" }); router.refresh(); }
      catch (e) { alert((e as Error).message); }
    }}><Trash2 size={15} /></button>
  );
}
