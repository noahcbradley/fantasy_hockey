export interface TeamInfo {
  team_name: string;
  wins: number;
  losses: number;
  ties: number;
}

export interface TeamsResponse {
  teams: TeamInfo[];
  year: number;
}

export interface PlayerStats {
  goals: number;
  assists: number;
  points: number;
  powerplay_points: number;
  games_played: number;
}

export interface Player {
  name: string;
  pro_team: string;
  position: string;
  stats: PlayerStats;
  last_7: PlayerStats | null;
  last_15: PlayerStats | null;
  last_30: PlayerStats | null;
}

export interface AnalyzeResponse {
  targets: Player[];
  drop_candidates: Player[];
  team_name: string;
  year: number;
}
