"use client";

import { useMovementCounter } from "@/hooks/use-movement-counter";

export function MovementCounter() {
  const count = useMovementCounter(5732);

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm text-sm font-medium text-zinc-300 animate-pulse-slow glow-border">
      <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
      <span>{count !== null ? count.toLocaleString('tr-TR') : "---"} genç katıldı</span>
    </div>
  );
}
