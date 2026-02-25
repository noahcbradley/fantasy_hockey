import { useState } from "react";
import CredentialsForm from "./components/CredentialsForm";
import TeamSelector from "./components/TeamSelector";
import ResultsView from "./components/ResultsView";
import ErrorBanner from "./components/ErrorBanner";
import type { Credentials, TeamsResponse, AnalyzeResponse } from "./types";

type Step = "credentials" | "team_select" | "results";

function App() {
  const [step, setStep] = useState<Step>("credentials");
  const [credentials, setCredentials] = useState<Credentials | null>(null);
  const [teamsData, setTeamsData] = useState<TeamsResponse | null>(null);
  const [results, setResults] = useState<AnalyzeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCredentialsSubmit = (
    creds: Credentials,
    teams: TeamsResponse,
  ) => {
    setCredentials(creds);
    setTeamsData(teams);
    setError(null);
    setStep("team_select");
  };

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

        {step === "credentials" && (
          <CredentialsForm
            onSubmit={handleCredentialsSubmit}
            onError={setError}
          />
        )}

        {step === "team_select" && credentials && teamsData && (
          <TeamSelector
            credentials={credentials}
            teams={teamsData.teams}
            year={teamsData.year}
            onAnalyzed={handleTeamSelected}
            onBack={handleBackToTeams}
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
