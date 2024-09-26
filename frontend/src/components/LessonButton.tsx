import { Lesson } from "@/types";
import { Button } from "./ui/button";
import { Check, Crown, LockKeyhole } from "lucide-react";
import { cn } from "@/lib/utils";

type LessonButtonProps = {
  lesson: Lesson;
  isFirst: boolean;
  index: number;
  isLocked: boolean;
  isCompleted: boolean;
  isCurrent: boolean;
  isNew: boolean;
};

export const LessonButton = ({
  lesson,
  isFirst,
  index,
  isLocked,
  isCompleted,
  isCurrent,
  isNew,
}: LessonButtonProps) => {
  const Icon = isLocked ? LockKeyhole : isCompleted ? Check : Crown;
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
    <div className="relative">
      <Button
        size="rounded"
        variant={isLocked ? "locked" : "secondary"}
        style={{ right: rightPosition }}
        disabled={isLocked}
        className={cn(
          "w-[72px] h-[72px] border-b-8 hover:border-b-[6px] relative",
          isFirst && "mt-10"
        )}
      >
        <Icon
          className={cn(
            "text-white size-8",
            isLocked ? "text-neutral-400 stroke-neutral-400" : ""
          )}
        />
      </Button>
    </div>
  );
};
