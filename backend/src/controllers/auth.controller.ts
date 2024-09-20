import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcryptjs from "bcryptjs";
import { setToken } from "../helpers/setToken";
import { JwtPayload } from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      throw new Error("All fields are required");
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
      throw new Error("User already exist");
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    setToken(res, user._id);

    return res.status(201).json({
      user: {
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        gem: user.gem,
        lifePoint: user.lifePoint,
        point: user.point,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    if (error instanceof Error)
      return res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("All fields are required");
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordMatch = await bcryptjs.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new Error("Email or password not correct");
    }

    setToken(res, user._id);

    return res.status(200).json({
      user: {
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        gem: user.gem,
        lifePoint: user.lifePoint,
        point: user.point,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    if (error instanceof Error)
      return res.status(400).json({ message: error.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "User logged out successfully" });
};
