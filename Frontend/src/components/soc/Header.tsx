import { Shield, Activity } from "lucide-react";

interface HeaderProps {
  severitySummary?: {
    low: number;
    medium: number;
    high: number;
    critical: number;
  };
}

export function Header({ severitySummary }: HeaderProps) {
  const totalIncidents = severitySummary 
    ? severitySummary.low + severitySummary.medium + severitySummary.high + severitySummary.critical 
    : 0;

  return (
    <header className="h-16 bg-card border-b border-border px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Shield className="h-8 w-8 text-primary" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-severity-low rounded-full animate-pulse" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-foreground tracking-tight">
            SOC AI Incident Response Platform
          </h1>
          <p className="text-xs text-muted-foreground">
            AI-Powered Security Analysis
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {totalIncidents > 0 && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-lg">
            <Activity className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              {totalIncidents} Analyzed
            </span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-severity-low animate-pulse" />
          <span className="text-xs text-muted-foreground">System Online</span>
        </div>
      </div>
    </header>
  );
}
