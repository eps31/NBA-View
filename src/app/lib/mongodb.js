import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    // Already connected
    return mongoose.connection.asPromise();
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI); // Simplified connection
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    throw new Error('Database connection failed');
  }
};

export default connectDB;
