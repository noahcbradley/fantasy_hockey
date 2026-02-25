from pydantic import BaseModel


class Credentials(BaseModel):
    swid: str
    espn_s2: str
    league_id: int


class AnalyzeRequest(BaseModel):
    swid: str
    espn_s2: str
    league_id: int
    team_name: str


class TeamInfo(BaseModel):
    team_name: str
    wins: int
    losses: int
    ties: int


class TeamsResponse(BaseModel):
    teams: list[TeamInfo]
    year: int


class PlayerStats(BaseModel):
    goals: int
    assists: int
    points: int
    powerplay_points: int
    games_played: int


class TargetPlayer(BaseModel):
    name: str
    pro_team: str
    position: str
    stats: PlayerStats


class RosterPlayer(BaseModel):
    name: str
    pro_team: str
    position: str
    stats: PlayerStats


class AnalyzeResponse(BaseModel):
    targets: list[TargetPlayer]
    drop_candidates: list[RosterPlayer]
    team_name: str
    year: int
