import { useState } from 'react';
import type { Player } from '../types';

type SortKey = 'name' | 'pro_team' | 'position' | 'goals' | 'assists' | 'points' | 'powerplay_points' | 'games_played';

function getValue(player: Player, key: SortKey): string | number {
  switch (key) {
    case 'name': return player.name;
    case 'pro_team': return player.pro_team;
    case 'position': return player.position;
    default: return player.stats[key];
  }
}

export default function PlayerTable({
  players,
  title,
  accent,
}: {
  players: Player[];
  title: string;
  accent: 'green' | 'amber';
}) {
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortAsc, setSortAsc] = useState(false);

  const headerColor =
    accent === 'green'
      ? 'border-green-600 text-green-400'
      : 'border-amber-600 text-amber-400';

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(false);
    }
  };

  const sorted = sortKey
    ? [...players].sort((a, b) => {
        const aVal = getValue(a, sortKey);
        const bVal = getValue(b, sortKey);
        let cmp: number;
        if (typeof aVal === 'string' && typeof bVal === 'string') {
          cmp = aVal.localeCompare(bVal);
        } else {
          cmp = (aVal as number) - (bVal as number);
        }
        return sortAsc ? cmp : -cmp;
      })
    : players;

  const arrow = (key: SortKey) => {
    if (sortKey !== key) return '';
    return sortAsc ? ' \u25B2' : ' \u25BC';
  };

  const thClass = 'px-3 py-2 cursor-pointer select-none hover:text-white';

  if (players.length === 0) {
    return (
      <div className="mb-8">
        <h2 className={`mb-3 border-l-4 pl-3 text-lg font-semibold ${headerColor}`}>
          {title}
        </h2>
        <p className="text-gray-500">No players found.</p>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className={`mb-3 border-l-4 pl-3 text-lg font-semibold ${headerColor}`}>
        {title}
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-700 text-gray-400">
              <th className={thClass} onClick={() => handleSort('name')}>Name{arrow('name')}</th>
              <th className={thClass} onClick={() => handleSort('pro_team')}>Team{arrow('pro_team')}</th>
              <th className={thClass} onClick={() => handleSort('position')}>Pos{arrow('position')}</th>
              <th className={`${thClass} text-right`} onClick={() => handleSort('goals')}>G{arrow('goals')}</th>
              <th className={`${thClass} text-right`} onClick={() => handleSort('assists')}>A{arrow('assists')}</th>
              <th className={`${thClass} text-right`} onClick={() => handleSort('points')}>Pts{arrow('points')}</th>
              <th className={`${thClass} text-right`} onClick={() => handleSort('powerplay_points')}>PPP{arrow('powerplay_points')}</th>
              <th className={`${thClass} text-right`} onClick={() => handleSort('games_played')}>GP{arrow('games_played')}</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((p, i) => (
              <tr
                key={p.name}
                className={`border-b border-gray-800 ${
                  i % 2 === 0 ? 'bg-gray-800/50' : ''
                } hover:bg-gray-700/50`}
              >
                <td className="px-3 py-2 font-medium text-white">{p.name}</td>
                <td className="px-3 py-2">{p.pro_team}</td>
                <td className="px-3 py-2">{p.position}</td>
                <td className="px-3 py-2 text-right">{p.stats.goals}</td>
                <td className="px-3 py-2 text-right">{p.stats.assists}</td>
                <td className="px-3 py-2 text-right">{p.stats.points}</td>
                <td className="px-3 py-2 text-right">{p.stats.powerplay_points}</td>
                <td className="px-3 py-2 text-right">{p.stats.games_played}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
