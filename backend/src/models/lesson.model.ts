import mongoose, { Schema } from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    unitId: {
      type: Schema.Types.ObjectId,
      ref: "Unit",
    },
    questions: {
      type: [Schema.Types.String],
      required: true,
      default: [],
      ref: "Question",
    },
    order: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Lesson = mongoose.model("Lesson", lessonSchema);
