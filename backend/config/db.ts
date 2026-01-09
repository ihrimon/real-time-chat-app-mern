import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();

const connectDB = async () : Promise<void> => {
    try {
        await mongoose.connect(process.env.DATABASE_URI as string);
    } catch (error: any) {
        console.log('Mongoose connection error: ', error)
        throw error;
    }
}

export default connectDB;
