import { cn } from "@/lib/utils";
import type { YoklamaStatus } from "@/lib/yoklama";

const statusStyles: Record<YoklamaStatus, string> = {
  active: "bg-emerald-500/80 shadow-[0_0_6px_rgba(16,185,129,0.4)]",
  warning: "bg-amber-500/80 shadow-[0_0_6px_rgba(245,158,11,0.35)]",
  inactive: "bg-red-500/40 shadow-none",
};

type YoklamaStatusDotProps = {
  status: YoklamaStatus;
  label: string;
};

export function YoklamaStatusDot({ status, label }: YoklamaStatusDotProps) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className={cn("h-1.5 w-1.5 shrink-0 rounded-full", statusStyles[status])}
        aria-hidden
      />
      <span className="text-xs text-zinc-400">{label}</span>
    </span>
  );
}
