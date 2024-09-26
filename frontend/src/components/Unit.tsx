import { getLessons } from "@/data/getLessons";
import { Unit as UnitType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "./Loading";
import { LessonButton } from "./LessonButton";
import { getUserProgress } from "@/data/getUserProgress";

type UnitProps = {
  unit: UnitType;
};

export const Unit = ({ unit }: UnitProps) => {
  const {
    data: userProgress,
    isPending: pendingProgress,
    isSuccess,
  } = useQuery({
    queryFn: getUserProgress,
    queryKey: ["user-progress"],
  });
  const { data: lessons, isPending } = useQuery({
    queryFn: getLessons,
    queryKey: ["lessons"],
  });

  if (isPending || pendingProgress || !isSuccess) {
    return <Loading />;
  }

  return (
    <>
      <div className="bg-green-500 p-5 rounded-xl">
        <h3 className="text-2xl text-white font-extrabold">{unit.title}</h3>
        <p className="text-white font-bold text-lg">{unit.description}</p>
      </div>
      <div className="flex flex-col items-center gap-4">
        {lessons?.map((lesson, index) => {
          const isLocked = !userProgress.allowedLessons.includes(index + 1);
          const isFirst = index === 0;

          const isCompleted =
            lesson.questions &&
            lesson.questions.length > 0 &&
            lesson.questions.every(
              (val) =>
                userProgress &&
                userProgress.completedQuestions &&
                userProgress.completedQuestions.length > 0 &&
                userProgress.completedQuestions.includes(val)
            );
          return (
            <LessonButton
              key={index}
              lesson={lesson}
              isFirst={isFirst}
              index={index}
              isLocked={isLocked}
              isCompleted={isCompleted}
            />
          );
        })}
      </div>
    </>
  );
};
