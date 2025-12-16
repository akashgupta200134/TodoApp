import Button from "./AddButton";
import { ModeToggle } from "./mode-toggle";
import Profile from "./Profile";
import CreateTodo from "./todos/createTodo";

export default function Menubarr() {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between w-full px-3 py-2  sm:mx-0 sm:px-4 sm:py-3 md:w-[311px] dark:border border-slate-800 rounded-xl shadow">
        <p className="font-semibold text-lg sm:text-xl text-black dark:text-white">
          Menu
        </p>
        <div className="flex items-center space-x-2">
          {/* Toggle button */}
          <ModeToggle />

          {/* Profile icon */}
          <Profile />
        </div>
      </div>

      {/* Todo Inputs */}
      <div className="mt-4">
        <CreateTodo />
      </div>

    
     
    </>
  );
}
