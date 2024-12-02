import mongoose from 'mongoose';

const GameSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // Game ID from the API as a string
  date: { type: Date, required: true }, // Date and time of the game
  homeTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true }, // Reference Team ObjectId
  awayTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true }, // Reference Team ObjectId
  homeScore: { type: Number, default: null }, // Home team score
  awayScore: { type: Number, default: null }, // Away team score
  status: { type: String, enum: ['Scheduled', 'Final', 'Live', 'Postponed'], required: true }, // Game status
});

export const Game = mongoose.models.Game || mongoose.model('Game', GameSchema);
