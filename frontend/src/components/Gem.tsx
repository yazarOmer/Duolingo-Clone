import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Link } from "react-router-dom";

export const Gem = () => {
  const user = useSelector((state: RootState) => state.auth.user);
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
        <Button variant="ghost">
          <img src="/gem.svg" alt="gem" className="size-6 mr-5" />
          <p className="font-extrabold text-sky-400 tracking-wider">
            {user?.gem}
          </p>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        className="px-7 w-auto py-5 rounded-2xl overflow-hidden shadow-none border-2 flex items-center gap-6"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div>
          <img src="/treasure.svg" alt="treasure" className="size-24" />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-extrabold text-zinc-700">Mücevher</h1>
          <p className="font-semibold text-zinc-500">
            {user?.gem} mücevherin var
          </p>
          <Link
            to="/shop"
            className="font-extrabold text-sky-500 uppercase transition-all duration-150 hover:text-sky-400"
          >
            Mağazaya git
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
};
