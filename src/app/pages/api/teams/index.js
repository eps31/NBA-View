import connectDB from '../../../lib/mongodb';
import { Team } from '../../../models/Team';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const teams = await Team.find();
      res.status(200).json(teams);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching teams' });
    }
  } else if (req.method === 'POST') {
    try {
      const team = await Team.create(req.body);
      res.status(201).json(team);
    } catch (error) {
      res.status(400).json({ message: 'Error creating team' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
