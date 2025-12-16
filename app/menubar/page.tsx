import Menubarr from "@/components/menubar";
export default function Menubar() {
  return (
    <div
      className="
        w-full max-w-full md:w-[56%] md:max-w-[26%] h-auto md:h-[550px] mx-0 sm:mx-2 md:ml-2.5 rounded-xl border dark:bg-gray-950
        p-3 sm:p-4 md:p-2    transition-all duration-300 overflow-hidden                
      "
    >
      <Menubarr />
    </div>
  );
}




