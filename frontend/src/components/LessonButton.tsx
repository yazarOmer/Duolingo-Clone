import { Lesson } from "@/types";
import { Button } from "./ui/button";
import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";

type LessonButtonProps = {
  lesson: Lesson;
  isFirst: boolean;
  index: number;
};

export const LessonButton = ({ lesson, isFirst, index }: LessonButtonProps) => {
  const cycleLen = 6;

  const itemIndex = index % cycleLen;
  let indentationLevel;

  if (itemIndex <= 2) {
    indentationLevel = itemIndex;
  } else if (itemIndex <= 4) {
    indentationLevel = 4 - itemIndex;
  } else if (itemIndex <= 6) {
    indentationLevel = 4 - itemIndex;
  } else {
    indentationLevel = itemIndex - 8;
  }

  const rightPosition = indentationLevel * 40;

  return (
    <Button
      size="rounded"
      variant="secondary"
      style={{ right: rightPosition }}
      className={cn(
        "w-[72px] h-[72px] border-b-8 hover:border-b-[6px] relative",
        isFirst && "mt-10"
      )}
    >
      <Crown className="text-white size-8" />
    </Button>
  );
};
