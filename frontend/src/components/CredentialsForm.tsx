import { useState } from 'react';
import type { Credentials, TeamsResponse } from '../types';
import { fetchTeams } from '../api/client';
import LoadingSpinner from './LoadingSpinner';

export default function CredentialsForm({
  onSubmit,
  onError,
}: {
  onSubmit: (creds: Credentials, teams: TeamsResponse) => void;
  onError: (msg: string) => void;
}) {
  const [swid, setSwid] = useState('');
  const [espnS2, setEspnS2] = useState('');
  const [leagueId, setLeagueId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const creds: Credentials = {
      swid,
      espn_s2: espnS2,
      league_id: parseInt(leagueId, 10),
    };

    setLoading(true);
    try {
      const teams = await fetchTeams(creds);
      onSubmit(creds, teams);
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Failed to connect');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Connecting to ESPN..." />;
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-lg space-y-5">
      <h2 className="text-xl font-semibold">Enter ESPN Credentials</h2>

      <div>
        <label className="mb-1 block text-sm text-gray-400">ESPN SWID</label>
        <input
          type="text"
          value={swid}
          onChange={(e) => setSwid(e.target.value)}
          required
          placeholder="{XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX}"
          className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-gray-400">ESPN S2</label>
        <input
          type="text"
          value={espnS2}
          onChange={(e) => setEspnS2(e.target.value)}
          required
          placeholder="AEB7s52..."
          className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-gray-400">League ID</label>
        <input
          type="number"
          value={leagueId}
          onChange={(e) => setLeagueId(e.target.value)}
          required
          placeholder="123456789"
          className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
      >
        Connect to League
      </button>
    </form>
  );
}
