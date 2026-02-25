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


class PlayerData(BaseModel):
    name: str
    pro_team: str
    position: str
    stats: PlayerStats
    last_7: PlayerStats | None = None
    last_15: PlayerStats | None = None
    last_30: PlayerStats | None = None


class AnalyzeResponse(BaseModel):
    targets: list[PlayerData]
    drop_candidates: list[PlayerData]
    team_name: str
    year: int
