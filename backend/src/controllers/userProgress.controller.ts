import { Request, Response } from "express";
import { UserProgress } from "../models/userProgress.model";

export const CreateUserProgress = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      throw new Error("User Id is required");
    }

    const progress = await UserProgress.create({ userId });

    return res.status(201).json(progress);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
  }
};

export const UpdateUserProgress = async (req: Request, res: Response) => {
  try {
    const { userId, questionId } = req.body;

    if (!userId || !questionId) {
      throw new Error("All fields are required");
    }

    const progress = await UserProgress.findOneAndUpdate(
      { where: userId },
      { $push: { completedQuestions: questionId } }
    );

    return res.status(200).json(progress);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
  }
};

export const GetUserProgress = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      throw new Error("User ID is required");
    }

    const progress = await UserProgress.findOne({ userId });

    return res.status(200).json(progress);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
  }
};
