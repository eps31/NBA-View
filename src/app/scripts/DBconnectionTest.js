import connectDB from '../lib/mongodb.js';

const testDBConnection = async () => {
  try {
    await connectDB();
    console.log('MongoDB connection successful.');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
  }
};

testDBConnection();
