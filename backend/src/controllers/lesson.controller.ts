import { Request, Response } from "express";
import { Lesson } from "../models/lesson.model";

export const createLesson = async (req: Request, res: Response) => {
  try {
    const { title, unitId, order } = req.body;

    if (!title || !unitId) {
      throw new Error("All fields are required");
    }

    const lesson = new Lesson({ title, unitId, order });

    await lesson.save();

    return res.status(201).json(lesson);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
  }
};

export const getLessons = async (req: Request, res: Response) => {
  try {
    const { unitId } = req.params;
    const lessons = await Lesson.find({ unitId });

    return res.status(200).json(lessons);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
  }
};
