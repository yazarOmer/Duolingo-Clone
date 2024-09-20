import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    gem: {
      type: Number,
      required: true,
      default: 0,
    },
    lifePoint: {
      type: Number,
      required: true,
      default: 5,
    },
    point: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
