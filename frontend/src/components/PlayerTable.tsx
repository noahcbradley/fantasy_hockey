import type { Player } from '../types';

export default function PlayerTable({
  players,
  title,
  accent,
}: {
  players: Player[];
  title: string;
  accent: 'green' | 'amber';
}) {
  const headerColor =
    accent === 'green'
      ? 'border-green-600 text-green-400'
      : 'border-amber-600 text-amber-400';

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
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Team</th>
              <th className="px-3 py-2">Pos</th>
              <th className="px-3 py-2 text-right">G</th>
              <th className="px-3 py-2 text-right">A</th>
              <th className="px-3 py-2 text-right">Pts</th>
              <th className="px-3 py-2 text-right font-bold">PPP</th>
              <th className="px-3 py-2 text-right">GP</th>
            </tr>
          </thead>
          <tbody>
            {players.map((p, i) => (
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
                <td className="px-3 py-2 text-right font-bold text-yellow-400">
                  {p.stats.powerplay_points}
                </td>
                <td className="px-3 py-2 text-right">{p.stats.games_played}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
