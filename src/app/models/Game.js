import mongoose from 'mongoose';

const GameSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  homeTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  awayTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  homeScore: { type: Number, default: 0 },
  awayScore: { type: Number, default: 0 },
  status: { type: String, enum: ['Scheduled', 'Live', 'Finished'], required: true },
});

export const Game = mongoose.model('Game', GameSchema);
