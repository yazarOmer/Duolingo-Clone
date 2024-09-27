import { Question as QuestionType } from "@/types";
import { Button } from "./ui/button";
import { QuestionHeader } from "./QuestionHeader";

type QuestionProps = {
  question: QuestionType;
  onNext: React.Dispatch<React.SetStateAction<number>>;
  totalQuestionLen: number;
  completedLen: number;
};

export const Question = ({
  question,
  onNext,
  totalQuestionLen,
  completedLen,
}: QuestionProps) => {
  return (
    <div className="flex flex-col h-screen">
      <QuestionHeader
        totalQuestion={totalQuestionLen}
        completedLen={completedLen}
      />
    </div>
  );
};
