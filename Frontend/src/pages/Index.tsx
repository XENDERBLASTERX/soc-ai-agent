import { useState, useCallback } from "react";
import { Header } from "@/components/soc/Header";
import { Sidebar } from "@/components/soc/Sidebar";
import { IncidentForm } from "@/components/soc/IncidentForm";
import { LoadingState } from "@/components/soc/LoadingState";
import { ResultsPanel } from "@/components/soc/ResultsPanel";
import { ErrorBanner } from "@/components/soc/ErrorBanner";
import { HistoryPanel } from "@/components/soc/HistoryPanel";
import { SettingsPanel } from "@/components/soc/SettingsPanel";
import { analyzeIncident } from "@/services/incidentService";
import type { IncidentAnalysis } from "@/types/incident";

const Index = () => {
  const [activeNav, setActiveNav] = useState("analyze");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<IncidentAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastDescription, setLastDescription] = useState("");

  const handleAnalyze = useCallback(async (description: string) => {
    setIsLoading(true);
    setError(null);
    setResults(null);
    setLastDescription(description);

    try {
      const response = await analyzeIncident({ description });
      console.log("✅ FRONTEND RECEIVED:", response);
      setResults(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleRetry = useCallback(() => {
    if (lastDescription) {
      handleAnalyze(lastDescription);
    }
  }, [lastDescription, handleAnalyze]);

  const renderMainContent = () => {
    switch (activeNav) {
      case "history":
        return <HistoryPanel />;
      case "settings":
        return <SettingsPanel />;
      default:
        return (
          <div className="space-y-6">
            {error && (
              <ErrorBanner
                message={error}
                onDismiss={() => setError(null)}
                onRetry={handleRetry}
              />
            )}
            
            {!isLoading && !results && (
              <IncidentForm onSubmit={handleAnalyze} isLoading={isLoading} />
            )}

            {isLoading && <LoadingState />}

            {results && !isLoading && (
              <>
                <ResultsPanel results={results} />
                <div className="flex justify-center pt-4">
                  <button
                    onClick={() => {
                      setResults(null);
                      setError(null);
                    }}
                    className="text-sm text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
                  >
                    Analyze New Incident
                  </button>
                </div>
              </>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar activeItem={activeNav} onItemClick={setActiveNav} />
        <main className="flex-1 p-6 overflow-auto scrollbar-soc">
          <div className="max-w-4xl mx-auto">
            {renderMainContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
