import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Your MongoDB connection string from the .env file
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
      throw new Error("MongoDB connection string is missing in .env");
    }

    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectDB;
