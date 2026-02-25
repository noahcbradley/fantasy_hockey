import { useState } from 'react';
import type { Credentials, TeamInfo, AnalyzeResponse } from '../types';
import { fetchAnalysis } from '../api/client';
import LoadingSpinner from './LoadingSpinner';

export default function TeamSelector({
  credentials,
  teams,
  year,
  onAnalyzed,
  onBack,
  onError,
}: {
  credentials: Credentials;
  teams: TeamInfo[];
  year: number;
  onAnalyzed: (data: AnalyzeResponse) => void;
  onBack: () => void;
  onError: (msg: string) => void;
}) {
  const [selected, setSelected] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!selected) return;
    setLoading(true);
    try {
      const data = await fetchAnalysis(credentials, selected);
      onAnalyzed(data);
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <LoadingSpinner message="Analyzing league and scraping 32 NHL teams... This may take 10-15 seconds." />
    );
  }

  return (
    <div className="mx-auto max-w-lg space-y-5">
      <h2 className="text-xl font-semibold">
        Select Your Team ({year - 1}-{year} Season)
      </h2>

      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
      >
        <option value="">-- Select a team --</option>
        {teams.map((t) => (
          <option key={t.team_name} value={t.team_name}>
            {t.team_name} ({t.wins}-{t.losses}-{t.ties})
          </option>
        ))}
      </select>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="rounded-lg border border-gray-600 px-4 py-2 text-gray-300 hover:bg-gray-800"
        >
          Back
        </button>
        <button
          onClick={handleAnalyze}
          disabled={!selected}
          className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Analyze
        </button>
      </div>
    </div>
  );
}
