import axios from 'axios';

const BASE_URL = 'https://api.sportsdata.io/v3/nba/scores/json';
const API_KEY = '3b9e4ddb1907470ea901d7800e6602cf';

export const fetchGamesByDate = async (date) => {
  const response = await axios.get(`${BASE_URL}/GamesByDate/${date}`, {
    headers: { 'Ocp-Apim-Subscription-Key': API_KEY },
  });
  return response.data;
};