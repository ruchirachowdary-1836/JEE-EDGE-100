"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { load, setStudied, subscribe } from "@site/lib/progress";
import { cn } from "@/lib/utils";

/** Self-reported "I have studied this topic", saved in this browser and counted on the Progress page. */
export function StudiedToggle({ topic }: { topic: string }) {
  const [at, setAt] = useState<number | null>(null);
  useEffect(() => {
    const sync = () => setAt(load().studied[topic] ?? null);
    sync();
    return subscribe(sync);
  }, [topic]);
  return (
    <button onClick={() => setStudied(topic, !at)} aria-pressed={!!at}
      className={cn("btn-ghost", !!at && "!border-emerald-500 !text-emerald-600 dark:!text-emerald-400")}>
      {at ? <CheckCircle2 size={16} /> : <Circle size={16} />}
      {at ? `Studied · ${new Date(at).toLocaleDateString(undefined, { day: "numeric", month: "short" })}` : "Mark as studied"}
    </button>
  );
}
