import { Request, Response } from "express";
import { Question } from "../models/question.model";
import { Lesson } from "../models/lesson.model";

export const createQuestion = async (req: Request, res: Response) => {
  try {
    const { type, data, lessonId } = req.body;

    if (!type || !data || !lessonId) {
      throw new Error("All fields are required");
    }

    const question = new Question({ type, data, lessonId });
    const lesson = await Lesson.findByIdAndUpdate(lessonId, {
      $push: { questions: question._id },
    });

    await question.save();
    await lesson?.save();

    return res.status(201).json(question);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
  }
};

export const getQuestionsByLessonId = async (req: Request, res: Response) => {
  try {
    const { lessonId } = req.params;
    const questions = await Question.find({ lessonId });

    return res.status(200).json(questions);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
  }
};
