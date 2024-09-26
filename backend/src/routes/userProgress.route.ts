import express from "express";
import {
  CreateUserProgress,
  GetUserProgress,
  UpdateUserProgress,
} from "../controllers/userProgress.controller";

const router = express.Router();

router.post("/", CreateUserProgress);
router.put("/", UpdateUserProgress);
router.get("/:userId", GetUserProgress);

export default router;
