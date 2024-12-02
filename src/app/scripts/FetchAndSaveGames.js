import axios from 'axios';
import connectDB from '../lib/mongodb.js';
import { Game } from '../models/Game.js';
import { Team } from '../models/Team.js';

const BASE_URL = 'https://api.sportsdata.io/v3/nba/scores/json';
const API_KEY = process.env.SPORTS_INFO_KEY;

const fetchAndSaveGames = async (year) => {
  await connectDB();

  try {
    const response = await axios.get(`${BASE_URL}/SchedulesBasic/${year}`, {
      headers: { 'Ocp-Apim-Subscription-Key': API_KEY },
    });

    const games = response.data;

    for (const game of games) {
      const homeTeam = await Team.findOne({ teamId: game.HomeTeamID });
      const awayTeam = await Team.findOne({ teamId: game.AwayTeamID });

      if (!homeTeam || !awayTeam) {
        console.error('Missing team data for game:', game);
        continue; // Skip if teams are not found
      }

      await Game.updateOne(
        { _id: game.GameID }, // Match by GameID
        {
          _id: game.GameID,
          date: game.DateTime,
          homeTeam: homeTeam._id, // Reference Team _id
          awayTeam: awayTeam._id, // Reference Team _id
          homeScore: game.HomeTeamScore,
          awayScore: game.AwayTeamScore,
          status: game.Status,
        },
        { upsert: true }
      );
    }

    console.log(`Games for ${year} successfully saved to MongoDB.`);
  } catch (error) {
    console.error('Error fetching or saving games:', error.message);
  }
};

fetchAndSaveGames('2025');