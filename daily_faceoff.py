from bs4 import BeautifulSoup
from requests_html import HTMLSession

def pp1_daily_faceoff():
    TEAMS = ['anaheim-ducks',
            'boston-bruins',
            'buffalo-sabres',
            'calgary-flames',
            'carolina-hurricanes',
            'chicago-blackhawks',
            'colorado-avalanche',
            'columbus-blue-jackets',
            'dallas-stars',
            'detroit-red-wings',
            'edmonton-oilers',
            'florida-panthers',
            'los-angeles-kings',
            'minnesota-wild',
            'montreal-canadiens',
            'nashville-predators',
            'new-jersey-devils',
            'new-york-islanders',
            'new-york-rangers',
            'ottawa-senators',
            'philadelphia-flyers',
            'pittsburgh-penguins',
            'san-jose-sharks',
            'seattle-kraken',
            'st-louis-blues',
            'tampa-bay-lightning',
            'toronto-maple-leafs',
            'utah-mammoth',
            'vancouver-canucks',
            'vegas-golden-knights',
            'washington-capitals',
            'winnipeg-jets']

    session = HTMLSession()

    all_pp1_list = []

    for team in TEAMS:

        url = f'https://www.dailyfaceoff.com/teams/{team}/line-combinations'

        response = session.get(url)

        html_content = response.text

        soup = BeautifulSoup(html_content, "html.parser")

        htmltext = soup.prettify()

        lined_html = htmltext.split('\n')

        in_pp1 = False
        save_next_line = False
        pp1_players = []

        for line in lined_html:
            if '<span class="text-3xl text-white" id="powerplay">' in line:
                in_pp1 = True
            if save_next_line == True:
                line = line.lstrip()
                pp1_players.append(line)
                save_next_line = False
            if in_pp1 == True and '<span class="text-xs font-bold uppercase xl:text-base">' in line:
                save_next_line = True
            if len(pp1_players) == 5:
                break

        all_pp1_list.append(pp1_players)

    return all_pp1_list