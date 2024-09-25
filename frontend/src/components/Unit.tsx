import { getLessons } from "@/data/getLessons";
import { Unit as UnitType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "./Loading";
import { LessonButton } from "./LessonButton";

type UnitProps = {
  unit: UnitType;
};

export const Unit = ({ unit }: UnitProps) => {
  const { data: lessons, isPending } = useQuery({
    queryFn: getLessons,
    queryKey: ["lessons"],
  });

  if (isPending) {
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
          const isFirst = index === 0;
          return (
            <LessonButton lesson={lesson} isFirst={isFirst} index={index} />
          );
        })}
      </div>
    </>
  );
};
