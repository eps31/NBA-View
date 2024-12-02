'use client'; // Required for state and effects in the app directory

import { useEffect, useState } from 'react';

interface Team {
  name: string;
  city: string;
  abbreviation: string;
  logo: string;
}

interface Game {
  _id: string;
  date: string;
  homeTeam: Team;
  awayTeam: Team;
  status: string;
}

export default function HomePage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch games for today
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('/api/games?date=today');
        if (!response.ok) throw new Error('Failed to fetch games');
        const data = await response.json();
        setGames(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) return <p className="p-8 text-xl">Loading games...</p>;
  if (error) return <p className="p-8 text-xl text-red-500">Error: {error}</p>;
  if (games.length === 0) return <p className="p-8 text-xl">No games scheduled for today.</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Today's NBA Games</h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <div
            key={game._id}
            className="border border-gray-300 rounded-lg p-6 shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="text-center">
                <img
                  src={game.homeTeam.logo}
                  alt={game.homeTeam.name}
                  className="w-12 mx-auto"
                />
                <p className="font-bold">{game.homeTeam.city} {game.homeTeam.name}</p>
              </div>
              <p className="text-xl font-bold">vs</p>
              <div className="text-center">
                <img
                  src={game.awayTeam.logo}
                  alt={game.awayTeam.name}
                  className="w-12 mx-auto"
                />
                <p className="font-bold">{game.awayTeam.city} {game.awayTeam.name}</p>
              </div>
            </div>
            <div className="mt-4">
              <p>
                <strong>Status:</strong> {game.status}
              </p>
              <p>
                <strong>Time:</strong> {new Date(game.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
