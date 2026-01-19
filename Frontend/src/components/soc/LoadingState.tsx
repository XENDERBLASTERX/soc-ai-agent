import { Shield, Brain, Search, FileText } from "lucide-react";

const steps = [
  { icon: Search, label: "Parsing incident details..." },
  { icon: Brain, label: "AI agents analyzing threat patterns..." },
  { icon: Shield, label: "Mapping MITRE ATT&CK framework..." },
  { icon: FileText, label: "Generating response recommendations..." },
];

export function LoadingState() {
  return (
    <div className="soc-card flex flex-col items-center justify-center py-16 animate-fade-in">
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-full border-2 border-primary/30 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-2 border-primary/50 flex items-center justify-center animate-spin-slow">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Brain className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-pulse" />
      </div>

      <h3 className="text-xl font-semibold text-foreground mb-2">
        AI Agents Analyzing Incident
      </h3>
      <p className="text-muted-foreground text-sm mb-8">
        Please wait while our security AI processes your incident...
      </p>

      <div className="space-y-3 w-full max-w-md">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-3 px-4 py-2 bg-secondary/50 rounded-lg animate-slide-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <Icon className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">{step.label}</span>
              <div className="ml-auto flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0s" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.2s" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.4s" }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
