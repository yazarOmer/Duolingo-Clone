import express from "express";
import {
  CreateUserProgress,
  decreaseHearts,
  GetUserProgress,
  UpdateUserProgress,
} from "../controllers/userProgress.controller";

const router = express.Router();

router.post("/", CreateUserProgress);
router.put("/", UpdateUserProgress);
router.get("/:userId", GetUserProgress);
router.post("/hearts", decreaseHearts);

export default router;
