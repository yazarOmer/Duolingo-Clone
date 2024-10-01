import { useMutation } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { PiDotsThreeCircleFill } from "react-icons/pi";
import axios from "axios";
import { deleteUser } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { toast } from "sonner";

export const MoreButton = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { mutate: LogoutMutation } = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        "http://localhost:3000/api/auth/logout"
      );
      return response.data;
    },
    onSuccess: () => {
      dispatch(deleteUser());
      toast.success(`Çıkış yapıldı`);
      localStorage.removeItem("user");
    },
    onError: () => {
      toast.error("Çıkış yapılamadı");
    },
  });

  const onClick = () => {
    LogoutMutation();
  };

  return (
    <div className="relative flex group">
      <Button
        variant="sidebar"
        className="flex items-center justify-start  flex-1"
      >
        <PiDotsThreeCircleFill className="size-8 text-purple-400 -translate-x-2" />
        More
      </Button>
      <div className="hidden hover:flex group-hover:flex flex-col border-2 rounded-lg bg-white w-[200px] py-1 absolute  left-[215px]">
        <Button variant="sidebar" className="flex-1 rounded-none">
          Settings
        </Button>
        <Button
          onClick={onClick}
          variant="sidebar"
          className="flex-1 rounded-none"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};
