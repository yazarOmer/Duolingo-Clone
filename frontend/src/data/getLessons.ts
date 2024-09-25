import { Lesson } from "@/types";
import axios from "axios";

export const getLessons = async () => {
  const response = await axios.get<Lesson[]>(
    "http://localhost:3000/api/lesson"
  );
  const data = response.data;

  return data;
};
