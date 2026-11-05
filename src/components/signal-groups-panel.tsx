"use client";

import { ExternalLink } from "lucide-react";
import {
  SIGNAL_ANNOUNCEMENT_URL,
  SIGNAL_SERVER_GROUPS,
} from "@/lib/signal-groups";
import { cn } from "@/lib/utils";

type SignalGroupsPanelProps = {
  className?: string;
  variant?: "default" | "compact";
};

export function SignalGroupsPanel({
  className,
  variant = "default",
}: SignalGroupsPanelProps) {
  const isCompact = variant === "compact";

  return (
    <div className={cn("w-full space-y-4 text-left", className)}>
      <a
        href={SIGNAL_ANNOUNCEMENT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "flex items-center justify-center gap-2 w-full font-semibold transition-colors",
          isCompact
            ? "px-6 py-3 mt-3 rounded-full border border-zinc-800 bg-zinc-950 text-zinc-100 hover:bg-zinc-800"
            : "py-4 px-6 text-lg tracking-wide bg-zinc-950 border border-zinc-800 text-white hover:border-zinc-700 hover:bg-zinc-900"
        )}
      >
        Signal Duyuru Grubu
        <ExternalLink className="w-4 h-4 shrink-0 opacity-70" />
      </a>

      <div className="space-y-2">
        <div className="flex items-center gap-2 border-b border-zinc-900 pb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
          <span className="font-mono text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
            Signal sunucuları
          </span>
        </div>

        <ul className="flex flex-col gap-2" role="list">
          {SIGNAL_SERVER_GROUPS.map((group, index) => (
            <li key={group.id}>
              <a
                href={group.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group flex items-center justify-between gap-3 border p-3 transition-all duration-200",
                  isCompact
                    ? "rounded-lg border-zinc-900 bg-zinc-950/60 hover:border-zinc-700 hover:bg-zinc-900"
                    : "border-zinc-900 bg-zinc-950/40 hover:border-zinc-800 hover:bg-zinc-950/90"
                )}
              >
                <div className="min-w-0">
                  <span className="font-mono text-[10px] text-zinc-700 font-bold uppercase tracking-wider block mb-1">
                    // kanal {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium text-zinc-300 group-hover:text-white">
                    {group.name}
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 shrink-0 text-zinc-700 group-hover:text-white transition-colors" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
