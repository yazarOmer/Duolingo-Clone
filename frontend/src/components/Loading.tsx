import { Loader } from "lucide-react";

export const Loading = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Loader className="text-green-500 animate-spin" />
    </div>
  );
};
