import type { TeamsResponse, AnalyzeResponse } from '../types';

const BASE_URL = import.meta.env.VITE_API_URL || '';

export async function fetchTeams(): Promise<TeamsResponse> {
  const res = await fetch(`${BASE_URL}/api/teams`);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || 'Failed to fetch teams');
  }
  return res.json();
}

export async function fetchAnalysis(
  team_name: string
): Promise<AnalyzeResponse> {
  const res = await fetch(`${BASE_URL}/api/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ team_name }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || 'Analysis failed');
  }
  return res.json();
}
