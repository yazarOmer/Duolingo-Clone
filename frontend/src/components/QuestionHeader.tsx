import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Link } from "react-router-dom";

type QuestionHeaderProps = {
  totalQuestion: number;
  completedLen: number;
};

export const QuestionHeader = ({
  totalQuestion,
  completedLen,
}: QuestionHeaderProps) => {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <div className="w-full py-14 flex items-center justify-center gap-10">
      <Button size="icon" variant="ghost">
        <Link to="/learn">
          <X />
        </Link>
      </Button>

      <Progress value={Math.floor((completedLen / totalQuestion) * 100)} />

      <div className="flex items-center gap-2">
        <img src="/heart.svg" alt="heart" />
        <p className="font-extrabold text-red-500">{user?.lifePoint}</p>
      </div>
    </div>
  );
};
