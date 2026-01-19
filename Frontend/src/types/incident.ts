export type Severity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface IncidentAnalysis {
  classification: string;
  mitre: string;
  severity: Severity;
  report: string;
  response: string;
  auto_response: string;
}

export interface AnalyzeRequest {
  description: string;
}
