import { updateUserProgress } from "@/data/UpdateUserProgress";
import { RootState } from "@/store/store";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Question } from "./Question";
import { Question as QuestionType } from "@/types";

type QuizProps = {
  questions: {
    totalQuestionsLength: number;
    completedQuestionsLength: number;
    notCompletedQuestions: QuestionType[];
  };
  lessonId: string;
};

export const Quiz = ({ questions, lessonId }: QuizProps) => {
  const [order, setOrder] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | undefined>("");
  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");
  const navigate = useNavigate();
  const [progress, setProgress] = useState(
    Math.floor(
      (questions.completedQuestionsLength / questions.totalQuestionsLength) *
        100
    )
  );

  const user = useSelector((state: RootState) => state.auth.user);

  const { mutate } = useMutation({
    mutationFn: (data: {
      userId: string;
      lessonId: string;
      questionId: string;
    }) => updateUserProgress(data),
    onSuccess: (data) => {
      setStatus("correct");
      setProgress(
        (prev) => prev + Math.floor((1 / questions.totalQuestionsLength) * 100)
      );
      if (data.lessonCompleted) {
        navigate("/learn");
      }
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });

  const actualQuestion = questions.notCompletedQuestions[order];
  const totalQuestion = questions.totalQuestionsLength;
  const completedLen = questions.completedQuestionsLength;

  const onNext = () => {
    setOrder((prev) => prev + 1);
  };

  const onSelect = (option: string) => {
    if (status !== "none") return;

    setSelectedOption(option);
  };

  const onContinue = () => {
    if (!selectedOption) return;

    if (status === "wrong") {
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    if (status === "correct") {
      onNext();
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    const correctOption = actualQuestion.data.options.find(
      (opt) => opt.correct
    );

    if (!correctOption) return;

    if (correctOption.name === selectedOption) {
      if (user && user?.lifePoint > 0) {
        mutate({
          userId: user.id,
          lessonId: lessonId as string,
          questionId: actualQuestion._id,
        });
      } else {
        toast.error("No hearts");
      }
    } else {
      setStatus("wrong");
    }
  };
  return (
    <Question
      question={actualQuestion}
      progress={progress}
      onSelect={onSelect}
      selectedOption={selectedOption}
      totalQuestionLen={totalQuestion}
      completedLen={completedLen}
      status={status}
      onContinue={onContinue}
    />
  );
};
