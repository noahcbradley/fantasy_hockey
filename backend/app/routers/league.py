import asyncio

from fastapi import APIRouter, HTTPException

from app.models.schemas import (
    AnalyzeRequest,
    AnalyzeResponse,
    Credentials,
    PlayerData,
    PlayerStats,
    TeamInfo,
    TeamsResponse,
)
from app.services import analyzer, espn, scraper

router = APIRouter()


def _to_player_data(p: dict) -> PlayerData:
    return PlayerData(
        name=p["name"],
        pro_team=p["pro_team"],
        position=p["position"],
        stats=PlayerStats(**p["stats"]),
        last_7=PlayerStats(**p["Last 7"]) if p.get("Last 7") else None,
        last_15=PlayerStats(**p["Last 15"]) if p.get("Last 15") else None,
        last_30=PlayerStats(**p["Last 30"]) if p.get("Last 30") else None,
    )


@router.post("/teams", response_model=TeamsResponse)
async def get_teams(creds: Credentials):
    try:
        league = await asyncio.to_thread(
            espn.connect_league, creds.swid, creds.espn_s2, creds.league_id
        )
    except Exception as e:
        raise HTTPException(
            status_code=401,
            detail=f"Failed to connect to ESPN league: {e}",
        )

    teams = espn.get_teams(league)
    return TeamsResponse(
        teams=[TeamInfo(**t) for t in teams],
        year=espn.get_season_year(),
    )


@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze(req: AnalyzeRequest):
    try:
        league = await asyncio.to_thread(
            espn.connect_league, req.swid, req.espn_s2, req.league_id
        )
    except Exception as e:
        raise HTTPException(
            status_code=401,
            detail=f"Failed to connect to ESPN league: {e}",
        )

    try:
        roster = await asyncio.to_thread(espn.get_roster, league, req.team_name)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

    free_agents = await asyncio.to_thread(espn.get_free_agents, league)
    pp1_players = await scraper.scrape_all_pp1()

    targets = analyzer.find_targets(free_agents, pp1_players)
    drop_candidates = analyzer.find_drop_candidates(roster, pp1_players)

    return AnalyzeResponse(
        targets=[_to_player_data(t) for t in targets],
        drop_candidates=[_to_player_data(p) for p in drop_candidates],
        team_name=req.team_name,
        year=espn.get_season_year(),
    )
