import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth.route";
dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  console.log(`Server started on port: ${port}`);
  await connectDB();
});

app.use("/api/auth/", authRoutes);
