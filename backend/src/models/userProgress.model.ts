import mongoose, { Schema } from "mongoose";
import { Question } from "./question.model";

const userProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  completedQuestions: {
    type: [Schema.Types.String],
    required: true,
    default: [],
  },
  allowedLessons: {
    type: [Schema.Types.Number],
    required: true,
    default: [1],
  },
});

export const UserProgress = mongoose.model("UserProgress", userProgressSchema);
