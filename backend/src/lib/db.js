import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();   

const MONGODB_URI = process.env.MONGODB_URI;

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export const disconnectDB = async () => {
  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
};
export default { connectDB, disconnectDB };

// Usage example (you can remove this in production):
// connectDB();