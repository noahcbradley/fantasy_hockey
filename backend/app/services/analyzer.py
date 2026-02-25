from app.services.espn import PERIODS


def extract_player_stats(raw_stats: dict) -> dict:
    return {
        "goals": int(float(raw_stats.get("G", 0))),
        "assists": int(float(raw_stats.get("A", 0))),
        "points": int(float(raw_stats.get("G", 0)))
        + int(float(raw_stats.get("A", 0))),
        "powerplay_points": int(float(raw_stats.get("PPP", 0))),
        "games_played": int(float(raw_stats.get("GP", 0))),
    }


def _build_player(player: dict) -> dict:
    result = {
        "name": player["name"],
        "pro_team": player["pro_team"],
        "position": player["position"],
        "stats": extract_player_stats(player["stats"]),
    }
    for period in PERIODS:
        raw = player.get(period)
        result[period] = extract_player_stats(raw) if raw else None
    return result


def find_targets(free_agents: list[dict], pp1_players: list[str]) -> list[dict]:
    """Free agents on PP1, sorted by PPP desc then assists desc."""
    targets = []
    for fa in free_agents:
        if fa["name"] in pp1_players:
            targets.append(_build_player(fa))

    targets.sort(
        key=lambda x: (x["stats"]["powerplay_points"], x["stats"]["assists"]),
        reverse=True,
    )
    return targets


def find_drop_candidates(
    roster: list[dict], pp1_players: list[str]
) -> list[dict]:
    """Roster players NOT on PP1, sorted by PPP asc then assists asc (weakest first)."""
    candidates = []
    for player in roster:
        if player["name"] not in pp1_players:
            candidates.append(_build_player(player))

    candidates.sort(
        key=lambda x: (x["stats"]["powerplay_points"], x["stats"]["assists"])
    )
    return candidates
