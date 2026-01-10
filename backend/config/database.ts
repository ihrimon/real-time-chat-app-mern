import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.DATABASE_URI as string);
  } catch (error: any) {
    console.log('Mongoose connection error: ', error);
    throw error;
  }
};

export default connectDB;
