import daily_faceoff
import my_team
import os
from espn_api.hockey import League
from dotenv import load_dotenv

load_dotenv()

# Constants
NAME = 0
TEAM = 1
POSITION = 2
STATS = 3
LAST_7_GAMES = 4
GOALS = 'G'
ASSISTS = 'A'
POWERPLAY_POINTS = 'PPP'

choice = input("\nEnter one of the following: \n\n1 for MyFantasy\n2 for PGs\n: ")

if int(choice) == 1:
    # MyFantasy
    league = League(league_id=1520803790, year=2025, espn_s2=os.environ.get('MYFANTASY_ESPN_S2'), swid=os.environ.get('MY_ESPN_SWID'))
else:
    # PGs
    league = League(league_id=32023125, year=2026, espn_s2=os.environ.get('PGS_ESPN_S2'), swid=os.environ.get('MY_ESPN_SWID'))

os.system('cls' if os.name == 'nt' else 'clear')

# Print player list
def print_players(player_list):
    for player in player_list:
        # if player[3] != {}:
            # print(player)
            print(player[NAME] + " - " + player[TEAM] + " - " + player[POSITION])
            # print('Goals: ' + str(player[5]) + ' | Assists: ' + str(player[6]) + ' | Points: ' + str(player[7]) + ' | Powerplay Points: ' + str(player[8]) +"\n")# ' | Last 7 Games (Points): ' + str(player[9]) +"\n")


pp1_players = daily_faceoff.pp1_daily_faceoff()

pp1_players = [item for sublist in pp1_players for item in sublist]

my_players = my_team.get_my_players(league)

waiver_players = league.free_agents(size=1000)

# for player in waiver_players:
#     if player.name in pp1_players:
#         print(player.name)

target_players = []

to_dump = []

# Make list of players on pp1 from the waiver list
for player in waiver_players:
    try:
        #print(player.stats)
        if player.name in pp1_players and player.position != 'Goalie':# and 'Last 7 2025' in player.stats:
            target_players.append([player.name, player.proTeam, player.position])#, player.stats['Total 2025']['total'], player.stats['Last 7 2025']['total']])
            to_dump.append(player.name + "\n" + str(player.stats) + "\n")
    except KeyError as e:
        print()
        print(player.name)
        print(player.position)
        print(player.stats)
        print(f"Error: {e}")

with open("output.txt", 'w') as json_file:

    for player in to_dump:
        json_file.write(player)

# Append stats to each player
# for player in target_players:
    # if player[STATS] != {}:
        # goals = str(player[STATS][GOALS]).split('.')[0]
        # assists = str(player[STATS][ASSISTS]).split('.')[0]
        # powerplay_pts = str(player[STATS][POWERPLAY_POINTS]).split('.')[0]
        # last_7_games_points = player[LAST_7_GAMES][GOALS] + player[LAST_7_GAMES][ASSISTS]
        # player.append(int(goals)) # Goals index 5
        # player.append(int(assists)) # Assists index 6
        # player.append(player[5] + player[6]) # Points index 7
        # player.append(int(powerplay_pts)) # PPP index 8
        #player.append(int(last_7_games_points)) # Last 7 points index 9

#Sort players by points 
#target_players = sorted(target_players, key=lambda x: (x[9], x[7]), reverse=True)
print('\n---------RESULTS---------')

print_players(target_players)

#
#   Which players are on my team but not on pp1
#

print("\nTHE FOLLOWING PLAYERS ARE ON YOUR TEAM BUT NOT PP1:\n")

players_not_pp1 = []
# print(my_players)
# print(pp1_players)
for player in my_players:
    if player[NAME] not in pp1_players and player[POSITION] != 'Goalie':
        # goals = player[STATS][GOALS]
        # assists = player[STATS][ASSISTS]
        # points = goals + assists
        # powerplay_pts = player[STATS][POWERPLAY_POINTS]
        #print(player[NAME] + ' ' + str(player[LAST_7_GAMES]))
        # last_7_games_points = player[LAST_7_GAMES][GOALS] + player[LAST_7_GAMES][ASSISTS]
        players_not_pp1.append([player[NAME], player[TEAM], player[POSITION]])#, ' ', ' ', int(goals), int(assists), int(points), int(powerplay_pts) ])#int(last_7_games_points)])


# players_not_pp1 = sorted(players_not_pp1, key=lambda x: (x[9], x[7]))
print_players(players_not_pp1)

