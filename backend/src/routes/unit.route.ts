import express from "express";
import { createUnit, getUnits } from "../controllers/unit.controller";

const router = express.Router();

router.post("/", createUnit);
router.get("/", getUnits);

export default router;
