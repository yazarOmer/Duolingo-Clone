import { Lesson } from "@/types";
import { Button } from "./ui/button";
import { Check, Crown, LockKeyhole } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type LessonButtonProps = {
  lesson: Lesson;
  isFirst: boolean;
  index: number;
  isLocked: boolean;
  isCompleted: boolean;
};

export const LessonButton = ({
  lesson,
  isFirst,
  index,
  isLocked,
  isCompleted,
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
    <Popover>
      <PopoverTrigger disabled={isLocked}>
        <div className="relative">
          <Button
            size="rounded"
            variant={isLocked ? "locked" : "secondary"}
            style={{ right: rightPosition }}
            disabled={isLocked}
            className={cn(
              "w-[72px] h-[72px] border-b-8 hover:border-b-[6px] relative",
              isFirst && "mt-10",
              isLocked && "pointer-events-none"
            )}
          >
            <Icon
              className={cn(
                "text-white size-8",
                isLocked
                  ? "text-neutral-400 stroke-neutral-400 pointer-events-none"
                  : ""
              )}
            />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={20}
        className="shadow-none border-none rounded-xl bg-green-500 text-white"
      >
        <h3 className="font-bold tracking-wide text-lg">{lesson.title}</h3>
        <p className="font-semibold mb-2">
          Yeterliliğini Efsanevi düzeyle kanıtla
        </p>
        <Button className="w-full text-green-500">alıştırma +5 puan</Button>
      </PopoverContent>
    </Popover>
  );
};
