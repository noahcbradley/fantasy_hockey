from datetime import datetime

from espn_api.hockey import League


def get_season_year() -> int:
    """Auto-detect NHL season year.
    Oct 2025 - Jun 2026 => year=2026
    Jul 2026 - Sep 2026 => year=2026 (previous season just ended)
    Oct 2026 - Dec 2026 => year=2027 (new season started)
    """
    now = datetime.now()
    if now.month >= 10:
        return now.year + 1
    return now.year


def connect_league(swid: str, espn_s2: str, league_id: int) -> League:
    year = get_season_year()
    return League(league_id=league_id, year=year, espn_s2=espn_s2, swid=swid)


def get_teams(league: League) -> list[dict]:
    return [
        {
            "team_name": team.team_name,
            "wins": team.wins,
            "losses": team.losses,
            "ties": team.ties,
        }
        for team in league.teams
    ]


def get_roster(league: League, team_name: str) -> list[dict]:
    year = str(get_season_year())
    for team in league.teams:
        if team.team_name == team_name:
            players = []
            for player in team.roster:
                if player.position == "Goalie":
                    continue
                try:
                    stats = player.stats.get(f"Total {year}", {}).get("total", {})
                    if stats:
                        players.append(
                            {
                                "name": player.name,
                                "pro_team": player.proTeam,
                                "position": player.position,
                                "stats": stats,
                            }
                        )
                except (KeyError, AttributeError):
                    continue
            return players
    raise ValueError(f"Team '{team_name}' not found in league")


def get_free_agents(league: League) -> list[dict]:
    year = str(get_season_year())
    free_agents = league.free_agents(size=1000)
    players = []
    for player in free_agents:
        if player.position == "Goalie":
            continue
        try:
            stats = player.stats.get(f"Total {year}", {}).get("total", {})
            if stats:
                players.append(
                    {
                        "name": player.name,
                        "pro_team": player.proTeam,
                        "position": player.position,
                        "stats": stats,
                    }
                )
        except (KeyError, AttributeError):
            continue
    return players
