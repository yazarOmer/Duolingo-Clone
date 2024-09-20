import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  console.log(`Server started on port: ${port}`);
  await connectDB();
});
