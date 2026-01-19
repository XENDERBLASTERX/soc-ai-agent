import { API_ENDPOINTS } from "@/config/api";
import type { AnalyzeRequest, IncidentAnalysis, Severity } from "@/types/incident";

function normalizeSeverity(input: unknown): Severity {
  const value = String(input || "").toUpperCase();

  if (value.includes("CRITICAL")) return "CRITICAL";
  if (value.includes("HIGH")) return "HIGH";
  if (value.includes("MEDIUM")) return "MEDIUM";
  if (value.includes("LOW")) return "LOW";

  // fallback
  return "LOW";
}

export async function analyzeIncident(
  request: AnalyzeRequest
): Promise<IncidentAnalysis> {
  const response = await fetch(API_ENDPOINTS.analyze, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Analysis failed: ${response.status} - ${errorText || response.statusText}`
    );
  }

  const data = await response.json();

  console.log("🔍 RAW BACKEND RESPONSE:", data);

  return {
    classification: String(data.classification ?? "Unknown"),
    mitre: String(data.mitre ?? "N/A"),
    severity: normalizeSeverity(data.severity),
    report: String(data.report ?? ""),
    response: String(data.response ?? ""),
    auto_response: String(data.auto_response ?? ""),
  };
}
