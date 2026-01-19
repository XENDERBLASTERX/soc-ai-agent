import { cn } from "@/lib/utils";
import type { Severity } from "@/types/incident";

interface SeverityBadgeProps {
  severity: Severity;
  size?: "sm" | "md" | "lg";
}

const severityConfig = {
  LOW: { label: "Low", className: "severity-low" },
  MEDIUM: { label: "Medium", className: "severity-medium" },
  HIGH: { label: "High", className: "severity-high" },
  CRITICAL: { label: "Critical", className: "severity-critical" },
};

export function SeverityBadge({ severity, size = "md" }: SeverityBadgeProps) {
  const config = severityConfig[severity];

  return (
    <span
      className={cn(
        "severity-badge inline-flex items-center gap-1.5",
        config.className,
        size === "sm" && "text-[10px] px-2 py-0.5",
        size === "lg" && "text-sm px-4 py-1.5"
      )}
    >
      <span className={cn(
        "w-1.5 h-1.5 rounded-full",
        severity === "LOW" && "bg-severity-low",
        severity === "MEDIUM" && "bg-severity-medium",
        severity === "HIGH" && "bg-severity-high",
        severity === "CRITICAL" && "bg-severity-critical"
      )} />
      {config.label}
    </span>
  );
}
