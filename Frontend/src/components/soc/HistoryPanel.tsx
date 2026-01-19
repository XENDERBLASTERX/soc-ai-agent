import { Clock, FileText } from "lucide-react";
import { SeverityBadge } from "./SeverityBadge";
import type { Severity } from "@/types/incident";

// Mock data for demonstration
const mockHistory = [
  {
    id: 1,
    classification: "Phishing Attack",
    severity: "HIGH" as Severity,
    timestamp: "2024-01-15 14:32:00",
  },
  {
    id: 2,
    classification: "Malware Detection",
    severity: "CRITICAL" as Severity,
    timestamp: "2024-01-15 11:18:00",
  },
  {
    id: 3,
    classification: "Unauthorized Access Attempt",
    severity: "MEDIUM" as Severity,
    timestamp: "2024-01-14 22:45:00",
  },
  {
    id: 4,
    classification: "Data Exfiltration Attempt",
    severity: "HIGH" as Severity,
    timestamp: "2024-01-14 16:20:00",
  },
  {
    id: 5,
    classification: "Suspicious Login",
    severity: "LOW" as Severity,
    timestamp: "2024-01-14 09:12:00",
  },
];

export function HistoryPanel() {
  return (
    <div className="soc-card animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Incident History</h2>
        <span className="text-xs px-2 py-0.5 bg-secondary text-muted-foreground rounded-full ml-2">
          Mock Data
        </span>
      </div>

      <div className="space-y-3">
        {mockHistory.map((incident) => (
          <div
            key={incident.id}
            className="flex items-center gap-4 p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
          >
            <FileText className="h-5 w-5 text-muted-foreground" />
            <div className="flex-1">
              <p className="font-medium text-foreground text-sm">
                {incident.classification}
              </p>
              <p className="text-xs text-muted-foreground">
                {incident.timestamp}
              </p>
            </div>
            <SeverityBadge severity={incident.severity} size="sm" />
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mt-4 text-center">
        This is mock data for demonstration purposes
      </p>
    </div>
  );
}
