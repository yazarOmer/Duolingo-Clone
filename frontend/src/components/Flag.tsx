import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { useState } from "react";
import { SquarePlus } from "lucide-react";

export const Flag = () => {
  const [open, setOpen] = useState(false);

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Button variant="ghost" size="icon">
          <img src="/usa.svg" alt="usa flag" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        className="w-56 rounded-2xl pb-0 overflow-hidden shadow-none border-2 px-0"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <h2 className="uppercase font-extrabold text-zinc-400 text-sm tracking-wide px-5 pb-2">
          Kurslarım
        </h2>
        <Button
          variant="sidebar"
          className="w-full rounded-none justify-start text-zinc-700 font-extrabold"
        >
          <img src="/usa.svg" alt="flag" className="mr-5" />
          İngilizce
        </Button>
        <Button
          variant="sidebar"
          className="w-full rounded-none justify-start text-zinc-700 font-extrabold "
        >
          <SquarePlus className="text-slate-400 size-8 mr-5" />
          Diğer kurslar
        </Button>
      </PopoverContent>
    </Popover>
  );
};
