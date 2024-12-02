'use client'; // Allows state and effects in the app directory
import { useState, useEffect } from 'react';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]); // Default to today

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/games?date=${date}`);
        if (!response.ok) {
          throw new Error('Failed to fetch games');
        }
        const data = await response.json();
        setGames(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [date]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">NBA Games</h1>
      <div className="mb-6">
        <label htmlFor="date" className="block mb-2 text-lg font-medium">
          Select a date:
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={handleDateChange}
          className="border border-gray-300 rounded p-2"
        />
      </div>

      {loading && <p>Loading games...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {games.length === 0 && !loading && <p>No games scheduled for this date.</p>}

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
