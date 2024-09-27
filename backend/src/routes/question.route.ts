import express from "express";
import {
  createQuestion,
  getQuestionsByLessonId,
} from "../controllers/question.controller";

const router = express.Router();

router.post("/", createQuestion);
router.get("/:lessonId", getQuestionsByLessonId);

export default router;
