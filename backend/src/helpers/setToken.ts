import { Response } from "express";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";

export const setToken = (res: Response, userId: Types.ObjectId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return token;
};
