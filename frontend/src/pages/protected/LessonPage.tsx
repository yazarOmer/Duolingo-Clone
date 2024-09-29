import { Loading } from "@/components/Loading";
import { Question } from "@/components/Question";
import { getQuestions } from "@/data/getQuestions";
import { updateUserProgress } from "@/data/UpdateUserProgress";
import { RootState } from "@/store/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const LessonPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | undefined>("");
  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user);

  const { data: questions, isLoading } = useQuery({
    queryKey: ["questions", id],
    queryFn: () => getQuestions(id as string),
  });

  const { mutate } = useMutation({
    mutationFn: (data: {
      userId: string;
      lessonId: string;
      questionId: string;
    }) => updateUserProgress(data),
    onSuccess: (data) => {
      setStatus("correct");
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

  if (isLoading) {
    return <Loading />;
  }

  if (!questions || !user) {
    return null;
  }

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
          lessonId: id as string,
          questionId: actualQuestion._id,
        });
      } else {
        toast.error("No hearts");
      }
    } else {
      console.log("Wrong");
    }
  };

  return (
    <Question
      question={actualQuestion}
      onSelect={onSelect}
      selectedOption={selectedOption}
      totalQuestionLen={totalQuestion}
      completedLen={completedLen}
      status={status}
      onContinue={onContinue}
    />
  );
};

export default LessonPage;
