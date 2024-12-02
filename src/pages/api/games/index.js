import connectDB from '../../../app/lib/mongodb';
import { Game } from '../../../app/models/Game';
import { Team } from '../../../app/models/Team';

export default async function handler(req, res) {
  console.log('API route called'); // Log when the route is hit
  await connectDB();

  if (req.method === 'GET') {
    const { date } = req.query;

    try {
      console.log('Query received:', date); // Log the received query

      let query = {};

      if (date === 'today') {
        const startOfDay = new Date().setHours(0, 0, 0, 0);
        const endOfDay = new Date().setHours(23, 59, 59, 999);
        query.date = { $gte: startOfDay, $lte: endOfDay };
        console.log('Query for today:', query); // Log the query for "today"
      } else if (date) {
        query.date = date;
        console.log('Query for specific date:', query); // Log the query for specific date
      }

      const games = await Game.find(query)
        .populate('homeTeam', 'name city abbreviation logo')
        .populate('awayTeam', 'name city abbreviation logo');

      console.log('Games found:', games); // Log the games retrieved

      res.status(200).json(games);
    } catch (error) {
      console.error('Error fetching games:', error); // Log any error
      res.status(500).json({ message: 'Error fetching games', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
