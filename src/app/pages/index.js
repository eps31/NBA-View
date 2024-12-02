import { useState, useEffect } from 'react';

export default function HomePage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(`/api/games?date=today`);
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
  }, []);

  if (loading) return <p>Loading games...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Today's Games ({today})</h1>
      <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        {games.map((game) => (
          <div
            key={game._id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <img src={game.homeTeam.logo} alt={game.homeTeam.name} width="50" />
                <h3>{game.homeTeam.city} {game.homeTeam.name}</h3>
              </div>
              <p>vs</p>
              <div>
                <img src={game.awayTeam.logo} alt={game.awayTeam.name} width="50" />
                <h3>{game.awayTeam.city} {game.awayTeam.name}</h3>
              </div>
            </div>
            <div style={{ marginTop: '10px' }}>
              <p><strong>Status:</strong> {game.status}</p>
              <p><strong>Time:</strong> {new Date(game.date).toLocaleTimeString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
