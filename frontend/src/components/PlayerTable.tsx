import { useState } from 'react';
import type { Player, PlayerStats } from '../types';

type SortKey = 'name' | 'pro_team' | 'position' | 'goals' | 'assists' | 'points' | 'powerplay_points' | 'games_played';
type Period = 'season' | 'last_7' | 'last_15' | 'last_30';

const PERIOD_LABELS: Record<Period, string> = {
  season: 'Season',
  last_7: 'Last 7',
  last_15: 'Last 15',
  last_30: 'Last 30',
};

function getStats(player: Player, period: Period): PlayerStats | null {
  if (period === 'season') return player.stats;
  return player[period];
}

function getValue(player: Player, key: SortKey, period: Period): string | number {
  switch (key) {
    case 'name': return player.name;
    case 'pro_team': return player.pro_team;
    case 'position': return player.position;
    default: {
      const s = getStats(player, period);
      return s ? s[key] : 0;
    }
  }
}

export default function PlayerTable({
  players,
  title,
  accent,
  defaultSortKey = 'points',
  defaultSortAsc = false,
}: {
  players: Player[];
  title: string;
  accent: 'green' | 'amber';
  defaultSortKey?: SortKey;
  defaultSortAsc?: boolean;
}) {
  const [sortKey, setSortKey] = useState<SortKey>(defaultSortKey);
  const [sortAsc, setSortAsc] = useState(defaultSortAsc);
  const [period, setPeriod] = useState<Period>('season');

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

  const sorted = [...players].sort((a, b) => {
    const aVal = getValue(a, sortKey, period);
    const bVal = getValue(b, sortKey, period);
    let cmp: number;
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      cmp = aVal.localeCompare(bVal);
    } else {
      cmp = (aVal as number) - (bVal as number);
    }
    return sortAsc ? cmp : -cmp;
  });

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
      <div className="mb-3 flex items-center justify-between">
        <h2 className={`border-l-4 pl-3 text-lg font-semibold ${headerColor}`}>
          {title}
        </h2>
        <div className="flex gap-1 rounded-lg bg-gray-800 p-1">
          {(Object.keys(PERIOD_LABELS) as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`rounded-md px-3 py-1 text-xs font-medium transition ${
                period === p
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {PERIOD_LABELS[p]}
            </button>
          ))}
        </div>
      </div>
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
            {sorted.map((p, i) => {
              const s = getStats(p, period);
              return (
                <tr
                  key={p.name}
                  className={`border-b border-gray-800 ${
                    i % 2 === 0 ? 'bg-gray-800/50' : ''
                  } hover:bg-gray-700/50`}
                >
                  <td className="px-3 py-2 font-medium text-white">{p.name}</td>
                  <td className="px-3 py-2">{p.pro_team}</td>
                  <td className="px-3 py-2">{p.position}</td>
                  {s ? (
                    <>
                      <td className="px-3 py-2 text-right">{s.goals}</td>
                      <td className="px-3 py-2 text-right">{s.assists}</td>
                      <td className="px-3 py-2 text-right">{s.points}</td>
                      <td className="px-3 py-2 text-right">{s.powerplay_points}</td>
                      <td className="px-3 py-2 text-right">{s.games_played}</td>
                    </>
                  ) : (
                    <td colSpan={5} className="px-3 py-2 text-center text-gray-500">
                      No data for this period
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
