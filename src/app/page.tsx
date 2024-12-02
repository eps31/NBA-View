'use client'; // Enables state and effects in the app directory
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
  homeScore: number | null;
  awayScore: number | null;
  status: string;
}

export default function HomePage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]); // Default to today

  // Fetch games from the backend API
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

  // Handle date input changes
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  return (
    <div className="p-8 bg-customGray">
      {/* Logo and Title */}
      <div className="flex items-center mb-6">
        <img src="/nba-logo.png" alt="NBA Logo" className="w-10 mr-4" />
        <h1 className="text-6xl font-bold">NBA View</h1>
      </div>

      <div className="text-center mb-6">
        <label htmlFor="date" className="block mb-2 text-lg font-mesdium">
          Select a date:
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={handleDateChange}
          className="border border-gray-300 bg-customGray rounded p-2"
        />
      </div>

      {/* Loading, Error, and No Games States */}
      {loading && <p>Loading games...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {games.length === 0 && !loading && <p>No games scheduled for this date.</p>}

      {/* Display Games */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <div
            key={game._id}
            className="border border-gray-300 rounded-lg p-6 shadow-md"
          >
            <div className="mt-4 text-center">
              <p>{game.status}</p>
              {/* Conditionally display start time only if status is "Scheduled" */}
              {game.status === 'Scheduled' && (
                <p>
                  {new Date(game.date).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="text-center">
                <img
                  src={game.homeTeam.logo}
                  alt={game.homeTeam.name}
                  className="w-12 mx-auto"
                />
                <p className="font-bold">{game.homeTeam.name}</p>
                <p className="text-xl font-bold">{game.homeScore ?? '-'}</p>
              </div>
              <p className="text-xl font-bold">vs</p>
              <div className="text-center">
                <img
                  src={game.awayTeam.logo}
                  alt={game.awayTeam.name}
                  className="w-12 mx-auto"
                />
                <p className="font-bold">{game.awayTeam.name}</p>
                <p className="text-xl font-bold">{game.awayScore ?? '-'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
