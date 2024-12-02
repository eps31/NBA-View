import axios from 'axios';

const BASE_URL = 'https://api.sportsdata.io/v3/nba/scores/json';
const API_KEY = process.env.SPORTS_INFO_KEY;

export const fetchGamesByDate = async (date) => {
  const response = await axios.get(`${BASE_URL}/GamesByDate/${date}`, {
    headers: { 'Ocp-Apim-Subscription-Key': API_KEY },
  });
  return response.data;
};