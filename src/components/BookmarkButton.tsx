"use client";

import { useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { api } from "@/lib/client";
import { cn } from "@/lib/utils";

export function BookmarkButton({ itemType, itemId, initial, small = false }: { itemType: "TOPIC" | "FORMULA" | "QUESTION" | "REACTION"; itemId: string; initial: boolean; small?: boolean }) {
  const [on, setOn] = useState(initial);
  const [busy, setBusy] = useState(false);
  const toggle = async () => {
    setBusy(true);
    try { const r = await api<{ bookmarked: boolean }>("/api/bookmarks", { body: { itemType, itemId } }); setOn(r.bookmarked); } finally { setBusy(false); }
  };
  return (
    <button onClick={toggle} disabled={busy} className={cn("btn-ghost", small && "!px-2 !py-1 text-xs", on && "!border-electric-500 !text-electric-500")} aria-pressed={on}>
      {on ? <BookmarkCheck size={small ? 14 : 16} /> : <Bookmark size={small ? 14 : 16} />} {on ? "Bookmarked" : "Bookmark"}
    </button>
  );
}
