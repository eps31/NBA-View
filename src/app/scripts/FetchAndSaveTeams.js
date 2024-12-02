import axios from 'axios';
import connectDB from '../lib/mongodb.js';
import { Team } from '../models/Team.js';

// Define the API base URL and your API key
const BASE_URL = 'https://api.sportsdata.io/v3/nba/scores/json';
const API_KEY = process.env.SPORTS_INFO_KEY;

const fetchAndSaveTeams = async () => {
  await connectDB(); // Ensure database connection

  try {
    // Fetch teams from the API
    const response = await axios.get(`${BASE_URL}/Teams`, {
      headers: { 'Ocp-Apim-Subscription-Key': API_KEY },
    });

    const teams = response.data;

    for (const team of teams) {
      // Upsert each team into the database
      await Team.updateOne(
        { teamId: team.TeamID }, // Match by TeamID
        {
          teamId: team.TeamID,
          name: team.Name,
          city: team.City,
          abbreviation: team.Key,
          logo: team.WikipediaLogoUrl,
        },
        { upsert: true } // Create a new document if no match is found
      );
    }

    console.log('Teams successfully saved to MongoDB.');
  } catch (error) {
    console.error('Error fetching or saving teams:', error.message);
  }
};

fetchAndSaveTeams();
