import { Request, Response } from "express";
import { Unit } from "../models/unit.model";

export const createUnit = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      throw new Error("All fields are required");
    }

    const unit = new Unit({ title, description });

    await unit.save();

    return res.status(201).json(unit);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
  }
};

export const getUnits = async (req: Request, res: Response) => {
  try {
    const units = await Unit.find({});

    return res.status(200).json(units);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
  }
};
