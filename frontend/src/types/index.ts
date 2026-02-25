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
}

export interface AnalyzeResponse {
  targets: Player[];
  drop_candidates: Player[];
  team_name: string;
  year: number;
}

export interface Credentials {
  swid: string;
  espn_s2: string;
  league_id: number;
}
