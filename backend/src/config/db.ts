import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI!);
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    if (error instanceof Error)
      console.log("Error for connection to MongoDB: ", error.message);
  }
};
