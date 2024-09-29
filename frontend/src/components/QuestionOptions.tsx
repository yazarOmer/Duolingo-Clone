import { Options } from "@/types";
import { OptionsCard } from "./OptionsCard";

type QuestionOptionsProps = {
  options: Options[];
  status: "correct" | "wrong" | "none";
  selectedOption: string | undefined;
  disabled?: boolean;
  onSelect: (option: string) => void;
};

export const QuestionOptions = ({
  options,
  status,
  selectedOption,
  disabled,
  onSelect,
}: QuestionOptionsProps) => {
  return (
    <div className="grid gap-2 grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
      {options.map((option) => (
        <OptionsCard
          key={option.name}
          text={option.name}
          selected={selectedOption === option.name}
          onClick={() => onSelect(option.name)}
          status={status}
          disabled={disabled}
        />
      ))}
    </div>
  );
};
