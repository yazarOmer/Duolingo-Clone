import { MobileHeader } from "@/components/MobileHeader";
import { Sidebar } from "@/components/Sidebar";

const LearnPage = () => {
  return (
    <div>
      <Sidebar className="hidden lg:flex" />
      <MobileHeader />
      <div className="h-full lg:pl-[256px] pt-12 lg:pt-0">
        <div className="h-screen">learn</div>
      </div>
    </div>
  );
};

export default LearnPage;
