import asyncio

import httpx
from bs4 import BeautifulSoup

from app.constants import NHL_TEAM_SLUGS


async def _scrape_team_pp1(client: httpx.AsyncClient, team_slug: str) -> list[str]:
    url = f"https://www.dailyfaceoff.com/teams/{team_slug}/line-combinations"
    try:
        response = await client.get(url)
        html_content = response.text
    except Exception:
        return []

    soup = BeautifulSoup(html_content, "html.parser")
    html_text = soup.prettify()
    lines = html_text.split("\n")

    in_pp1 = False
    save_next = False
    pp1_players: list[str] = []

    for line in lines:
        if '<span class="text-3xl text-white" id="powerplay">' in line:
            in_pp1 = True
        if save_next:
            pp1_players.append(line.strip())
            save_next = False
        if (
            in_pp1
            and '<span class="text-xs font-bold uppercase xl:text-base">' in line
        ):
            save_next = True
        if len(pp1_players) == 5:
            break

    return pp1_players


async def scrape_all_pp1() -> list[str]:
    """Scrape PP1 players for all 32 NHL teams.
    Returns a flat list of all PP1 player names.
    """
    limits = httpx.Limits(max_connections=10, max_keepalive_connections=10)
    async with httpx.AsyncClient(limits=limits, timeout=30.0) as client:
        tasks = [_scrape_team_pp1(client, slug) for slug in NHL_TEAM_SLUGS]
        results = await asyncio.gather(*tasks)

    return [player for team_players in results for player in team_players]
