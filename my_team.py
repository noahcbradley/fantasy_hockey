from espn_api.hockey import League

# Fantasy league team names

MF_TEAM_NAME = 'Tkachuk Around. Find Out'
GOONS_TEAM_NAME = 'Kuchy Gang'

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
            # print(player)
            if player.position != 'Goalie' and 'Last 7 2025' in player.stats:
                players.append([player.name, player.proTeam, player.position, player.stats['Total 2025']['total'], player.stats['Last 7 2025']['total']])

    except KeyError as e:
        print(player.name)
        print(player.position)
        print(player.stats)
        print(f"Error: {e}")

    return players