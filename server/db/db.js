import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    const MONGO_URL = process.env.MONGO_URL;
    await mongoose.connect(MONGO_URL, { useNewUrlParser: true });
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Failed to connect to database");
  }
};

export default connectDB;
