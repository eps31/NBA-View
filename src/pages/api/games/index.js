import connectDB from '../../../app/lib/mongodb';
import { Game } from '../../../app/models/Game';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    const { date } = req.query;

    try {
      if (!date) {
        return res.status(400).json({ message: 'Date query parameter is required' });
      }

      // Ensure the date is parsed into a valid range
      const startOfDay = new Date(date).setHours(0, 0, 0, 0);
      const endOfDay = new Date(date).setHours(23, 59, 59, 999);

      const games = await Game.find({
        date: { $gte: startOfDay, $lte: endOfDay },
      })
        .populate('homeTeam', 'name city abbreviation logo')
        .populate('awayTeam', 'name city abbreviation logo');

      res.status(200).json(games);
    } catch (error) {
      console.error('Error fetching games:', error.message);
      res.status(500).json({ message: 'Error fetching games', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
