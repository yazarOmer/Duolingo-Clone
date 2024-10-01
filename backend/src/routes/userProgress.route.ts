import express from "express";
import {
  CreateUserProgress,
  decreaseHearts,
  GetUserProgress,
  refillHearts,
  UpdateUserProgress,
} from "../controllers/userProgress.controller";

const router = express.Router();

router.post("/", CreateUserProgress);
router.put("/", UpdateUserProgress);
router.get("/:userId", GetUserProgress);
router.post("/hearts", decreaseHearts);
router.post("/refillHearts", refillHearts);

export default router;
