import { useState } from "react";
import { 
  Tag, 
  Target, 
  AlertTriangle, 
  FileText, 
  Shield, 
  Zap, 
  Copy, 
  Check,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SeverityBadge } from "./SeverityBadge";
import type { IncidentAnalysis } from "@/types/incident";
import { toast } from "sonner";

interface ResultsPanelProps {
  results: IncidentAnalysis;
}

export function ResultsPanel({ results }: ResultsPanelProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(field);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(null), 2000);
  };

  const exportReport = () => {
    const reportContent = `
SOC AI INCIDENT ANALYSIS REPORT
================================

Classification: ${results.classification}
MITRE ATT&CK: ${results.mitre}
Severity: ${results.severity}

INCIDENT REPORT
---------------
${results.report}

RECOMMENDED RESPONSE
--------------------
${results.response}

AUTO-RESPONSE ACTIONS
---------------------
${results.auto_response}

Generated: ${new Date().toISOString()}
    `.trim();

    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `incident-report-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Report exported successfully");
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header with Severity */}
      <div className="soc-card flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-foreground">Analysis Complete</h2>
          <SeverityBadge severity={results.severity} size="lg" />
        </div>
        <Button variant="outline" size="sm" onClick={exportReport} className="gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Classification & MITRE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="soc-card">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Classification</h3>
          </div>
          <div className="bg-secondary/50 rounded-lg px-4 py-3">
            <p className="text-foreground font-medium">{results.classification}</p>
          </div>
        </div>

        <div className="soc-card">
          <div className="flex items-center gap-2 mb-3">
            <Target className="h-5 w-5 text-accent" />
            <h3 className="font-semibold text-foreground">MITRE ATT&CK Mapping</h3>
          </div>
          <div className="bg-secondary/50 rounded-lg px-4 py-3">
            <p className="text-foreground font-mono text-sm">{results.mitre}</p>
          </div>
        </div>
      </div>

      {/* Incident Report */}
      <div className="soc-card">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Incident Report</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard(results.report, "report")}
            className="gap-1.5"
          >
            {copied === "report" ? (
              <Check className="h-4 w-4 text-severity-low" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            Copy
          </Button>
        </div>
        <div className="bg-secondary/30 rounded-lg p-4 max-h-64 overflow-y-auto scrollbar-soc">
          <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
            {results.report}
          </p>
        </div>
      </div>

      {/* Recommended Response */}
      <div className="soc-card border-l-4 border-l-primary">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Recommended Response</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard(results.response, "response")}
            className="gap-1.5"
          >
            {copied === "response" ? (
              <Check className="h-4 w-4 text-severity-low" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            Copy
          </Button>
        </div>
        <div className="space-y-2">
          {(results.response || "")
            .split("\n")
            .filter(Boolean)
            .map((line, index) => (

            <div key={index} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <p className="text-sm text-foreground/90">{line.replace(/^[-•]\s*/, "")}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Auto-Response Actions */}
      <div className="soc-card border border-severity-high/30 bg-severity-high/5">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="h-5 w-5 text-severity-high" />
          <h3 className="font-semibold text-foreground">Auto-Response Actions</h3>
          <span className="text-xs px-2 py-0.5 bg-severity-high/20 text-severity-high rounded-full">
            Automated
          </span>
        </div>
        <div className="bg-secondary/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-severity-high flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-foreground/90 whitespace-pre-wrap">
                {results.auto_response}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
