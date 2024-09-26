import mongoose from "mongoose";

const userProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  completedQuestions: {
    type: mongoose.Schema.Types.Array,
    required: true,
    default: [],
  },
  allowedLessons: {
    type: mongoose.Schema.Types.Array,
    required: true,
    default: [1],
  },
});

export const UserProgress = mongoose.model("UserProgress", userProgressSchema);
