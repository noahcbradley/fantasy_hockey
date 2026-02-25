import type { Credentials, TeamsResponse, AnalyzeResponse } from '../types';

const BASE_URL = import.meta.env.VITE_API_URL || '';

export async function fetchTeams(creds: Credentials): Promise<TeamsResponse> {
  const res = await fetch(`${BASE_URL}/api/teams`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(creds),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || 'Failed to fetch teams');
  }
  return res.json();
}

export async function fetchAnalysis(
  creds: Credentials,
  team_name: string
): Promise<AnalyzeResponse> {
  const res = await fetch(`${BASE_URL}/api/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...creds, team_name }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || 'Analysis failed');
  }
  return res.json();
}
