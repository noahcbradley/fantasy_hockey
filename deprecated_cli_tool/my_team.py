from espn_api.hockey import League

# Constants
MF_TEAM_NAME = 'ChuChu Train'
GOONS_TEAM_NAME = 'All Heil Leon'
CURRENT_YEAR = '2026'

# Returns players on a team
def get_my_players(league: League):
    teams = league.teams
    my_team = None
    for team in teams:
        if team.team_name == GOONS_TEAM_NAME or team.team_name == MF_TEAM_NAME:
            my_team = team
            break

    my_players = my_team.roster
    players = []
    
    try:
        for player in my_players:
            # print(player.stats)
            if player.position != 'Goalie':# and f'Last 7 {CURRENT_YEAR}' in player.stats:
                players.append([player.name, player.proTeam, player.position, player.stats[f'Total {CURRENT_YEAR}']['total']])#, player.stats[f'Last 7 {CURRENT_YEAR}']['total']])
    except KeyError as e:
        print(player.name)
        print(player.position)
        print(player.stats)
        print(f"Error: {e}")

    return players