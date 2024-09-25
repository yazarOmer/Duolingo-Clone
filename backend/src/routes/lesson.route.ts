import express from "express";
import { createLesson, getLessons } from "../controllers/lesson.controller";

const router = express.Router();

router.post("/", createLesson);
router.get("/", getLessons);

export default router;
