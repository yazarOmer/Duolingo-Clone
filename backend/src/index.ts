import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth.route";
import unitRoutes from "./routes/unit.route";
import lessonRoutes from "./routes/lesson.route";
import questionRoutes from "./routes/question.route";
import userProgressRoutes from "./routes/userProgress.route";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  console.log(`Server started on port: ${port}`);
  await connectDB();
});

app.use("/api/auth/", authRoutes);
app.use("/api/unit/", unitRoutes);
app.use("/api/lesson/", lessonRoutes);
app.use("/api/question", questionRoutes);
app.use("/api/user-progress", userProgressRoutes);
