import type { AnalyzeResponse } from '../types';
import PlayerTable from './PlayerTable';

export default function ResultsView({
  results,
  onBack,
}: {
  results: AnalyzeResponse;
  onBack: () => void;
}) {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Results for {results.team_name} ({results.year - 1}-{results.year})
        </h2>
        <button
          onClick={onBack}
          className="rounded-lg border border-gray-600 px-4 py-2 text-gray-300 hover:bg-gray-800"
        >
          Start Over
        </button>
      </div>

      <PlayerTable
        title={`Recommended Pickups (${results.targets.length})`}
        players={results.targets}
        accent="green"
      />

      <PlayerTable
        title={`Drop Candidates - Not on PP1 (${results.drop_candidates.length})`}
        players={results.drop_candidates}
        accent="amber"
      />
    </div>
  );
}
