import connectDB from '../../../lib/mongodb';
import { Game } from '../../../models/Game';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    const { date } = req.query;

    try {
      let query = {};

      // Handle the "today" query
      if (date === 'today') {
        const startOfDay = new Date().setHours(0, 0, 0, 0);
        const endOfDay = new Date().setHours(23, 59, 59, 999);
        query.date = { $gte: startOfDay, $lte: endOfDay };
      } else if (date) {
        query.date = date;
      }

      const games = await Game.find(query)
        .populate('homeTeam', 'name city abbreviation logo')
        .populate('awayTeam', 'name city abbreviation logo');

      res.status(200).json(games);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching games', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
