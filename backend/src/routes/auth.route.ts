import express from "express";
import { gett, login, logout, register } from "../controllers/auth.controller";
import { verifyToken } from "../middlewares/verifyToken";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/get", verifyToken, gett);

export default router;
