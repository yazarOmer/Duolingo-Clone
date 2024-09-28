import { Loading } from "@/components/Loading";
import { Question } from "@/components/Question";
import { getQuestions } from "@/data/getQuestions";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";

const LessonPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

  const { data: questions, isLoading } = useQuery({
    queryKey: ["questions", id],
    queryFn: () => getQuestions(id as string),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!questions) {
    return null;
  }

  const actualQuestion = questions.notCompletedQuestions[order];
  const totalQuestion = questions.totalQuestionsLength;

  const onSelect = (option: string) => {
    if (status !== "none") return;

    setSelectedOption(option);
  };

  return (
    <Question
      question={actualQuestion}
      onSelect={onSelect}
      selectedOption={selectedOption}
      totalQuestionLen={totalQuestion}
      completedLen={totalQuestion - questions.notCompletedQuestions.length}
      status={status}
    />
  );
};

export default LessonPage;
