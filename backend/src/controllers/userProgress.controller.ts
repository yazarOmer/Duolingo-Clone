import { Request, Response } from "express";
import { UserProgress } from "../models/userProgress.model";
import { User } from "../models/user.model";
import { Lesson } from "../models/lesson.model";

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
    const { userId, questionId, lessonId } = req.body;

    if (!userId || !questionId || !lessonId) {
      throw new Error("All fields are required");
    }

    const lesson = await Lesson.findById(lessonId);

    if (!lesson) {
      throw new Error("Lesson not found");
    }

    const progress = await UserProgress.findOne({ userId });

    if (!progress) {
      throw new Error("Progress not found");
    }

    progress.completedQuestions.push(questionId);
    await progress.save();

    if (
      lesson.questions.every((q) => progress.completedQuestions.includes(q))
    ) {
      progress.allowedLessons.push(progress.allowedLessons.length + 1);
      await progress.save();

      return res.status(200).json({ lessonCompleted: true, progress });
    }

    return res.status(200).json({ lessonCompleted: false, progress });
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

export const decreaseHearts = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    console.log(userId);

    if (!userId) {
      throw new Error("User ID is required");
    }

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    user.lifePoint -= 1;
    await user.save();

    return res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      gem: user.gem,
      lifePoint: user.lifePoint,
      point: user.point,
      createdAt: user.createdAt,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
  }
};
