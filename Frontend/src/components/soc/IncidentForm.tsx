import { useState } from "react";
import { Send, Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IncidentFormProps {
  onSubmit: (description: string) => void;
  isLoading: boolean;
}

export function IncidentForm({ onSubmit, isLoading }: IncidentFormProps) {
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim() && !isLoading) {
      onSubmit(description.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="soc-card space-y-4 animate-fade-in">
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">New Incident Analysis</h2>
      </div>
      
      <div className="relative">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the security incident in detail...

Example: User reported suspicious login attempts from multiple countries within a 5-minute window. Account shows password reset requests from unknown IP addresses."
          className="soc-input min-h-[200px] resize-none font-mono text-sm scrollbar-soc"
          disabled={isLoading}
        />
        <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
          {description.length} characters
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          AI agents will analyze and classify the incident
        </p>
        <Button
          type="submit"
          disabled={!description.trim() || isLoading}
          className="gap-2"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Analyze Incident
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
