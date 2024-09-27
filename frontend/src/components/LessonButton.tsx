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
  isCurrent: boolean;
};

export const LessonButton = ({
  lesson,
  isCurrent,
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
        <div
          className="relative"
          style={{
            right: rightPosition,
            marginTop: isFirst && !isCompleted ? 48 : 4,
          }}
        >
          {isCurrent ? (
            <div className="size-[80px] relative">
              <div className="absolute -top-8  px-3 py-2.5 border-2 font-bold uppercase text-green-500 bg-white rounded-xl animate-bounce tracking-wide z-10">
                start
                <div className="absolute border-x-8 border-t-8 border-x-transparent left-1/2 -bottom-2 -translate-x-1/2" />
              </div>
              <Button
                size="rounded"
                variant={isLocked ? "locked" : "secondary"}
                className="size-[80px] border-b-8"
              >
                <Icon
                  className={cn(
                    "size-8",
                    isLocked &&
                      "fill-neutral-400 text-neutral-400 stroke-neutral-400",
                    isCompleted && "fill-none stroke-[4]"
                  )}
                />
              </Button>
            </div>
          ) : (
            <Button
              size="rounded"
              disabled={isLocked}
              variant={isLocked ? "locked" : "secondary"}
              className="size-[80px] border-b-8"
            >
              <Icon
                className={cn(
                  "size-8",
                  isLocked && " text-neutral-400 stroke-neutral-400",
                  isCompleted && "fill-none stroke-[4]"
                )}
              />
            </Button>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="shadow-none border-none rounded-xl bg-green-500 text-white">
        <h3 className="font-bold tracking-wide text-lg">{lesson.title}</h3>
        <p className="font-semibold mb-2">
          Yeterliliğini Efsanevi düzeyle kanıtla
        </p>
        <Button className="w-full text-green-500">alıştırma +5 puan</Button>
      </PopoverContent>
    </Popover>
  );
};
