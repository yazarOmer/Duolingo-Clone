import express from "express";
import {
  CreateUserProgress,
  decreaseHearts,
  getLeaderboard,
  GetUserProgress,
  refillHearts,
  UpdateUserProgress,
} from "../controllers/userProgress.controller";

const router = express.Router();

router.post("/", CreateUserProgress);
router.put("/", UpdateUserProgress);
router.post("/hearts", decreaseHearts);
router.post("/refillHearts", refillHearts);
router.get("/leaderboard", getLeaderboard);
router.get("/:userId", GetUserProgress);

export default router;
