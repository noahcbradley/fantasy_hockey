import { useEffect, useState } from "react";
import TeamSelector from "./components/TeamSelector";
import ResultsView from "./components/ResultsView";
import ErrorBanner from "./components/ErrorBanner";
import LoadingSpinner from "./components/LoadingSpinner";
import type { TeamsResponse, AnalyzeResponse } from "./types";
import { fetchTeams } from "./api/client";

type Step = "loading" | "team_select" | "results";

function App() {
  const [step, setStep] = useState<Step>("loading");
  const [teamsData, setTeamsData] = useState<TeamsResponse | null>(null);
  const [results, setResults] = useState<AnalyzeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTeams()
      .then((data) => {
        setTeamsData(data);
        setStep("team_select");
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Failed to connect");
        setStep("team_select");
      });
  }, []);

  const handleTeamSelected = (analysis: AnalyzeResponse) => {
    setResults(analysis);
    setError(null);
    setStep("results");
  };

  const handleBackToTeams = () => {
    setResults(null);
    setError(null);
    setStep("team_select");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="border-b border-gray-700 bg-gray-800 px-6 py-4">
        <h1 className="text-2xl font-bold">ESPN Fantasy Hockey Analyzer</h1>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">
        {error && (
          <ErrorBanner message={error} onDismiss={() => setError(null)} />
        )}

        {step === "loading" && (
          <LoadingSpinner message="Connecting to ESPN..." />
        )}

        {step === "team_select" && teamsData && (
          <TeamSelector
            teams={teamsData.teams}
            year={teamsData.year}
            onAnalyzed={handleTeamSelected}
            onError={setError}
          />
        )}

        {step === "results" && results && (
          <ResultsView results={results} onBack={handleBackToTeams} />
        )}
      </main>
    </div>
  );
}

export default App;
