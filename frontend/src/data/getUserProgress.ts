import { UserProgress } from "@/types";
import axios from "axios";

export const getUserProgress = async () => {
  const response = await axios.get<UserProgress>(
    "http://localhost:3000/api/user-progress/" + "66ef1d6b7a3fde5596124f03"
  );

  return response.data;
};
