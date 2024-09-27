import { Loading } from "@/components/Loading";
import { Question } from "@/components/Question";
import { getQuestions } from "@/data/getQuestions";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";

const LessonPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(0);

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

  return (
    <div className="max-w-6xl mx-auto">
      <Question
        question={actualQuestion}
        onNext={setOrder}
        totalQuestionLen={totalQuestion}
        completedLen={totalQuestion - questions.notCompletedQuestions.length}
      />
    </div>
  );
};

export default LessonPage;
