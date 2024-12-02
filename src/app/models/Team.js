import mongoose from 'mongoose';

const TeamSchema = new mongoose.Schema({
  teamId: { type: Number, required: true, unique: true }, // SportsData.io TeamID
  name: { type: String, required: true },
  city: { type: String, required: true },
  abbreviation: { type: String, required: true, unique: true },
  logo: { type: String, required: true },
});

export const Team = mongoose.model('Team', TeamSchema);
