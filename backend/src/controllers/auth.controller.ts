import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcryptjs from "bcryptjs";
import { setToken } from "../helpers/setToken";

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
