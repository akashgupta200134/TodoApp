import Button from "./AddButton";
import { ModeToggle } from "./mode-toggle";
import Profile from "./Profile";
import CreateTodo from "./todos/createTodo";

export default function Menubarr(){
return (
    <>
     {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 mt-4 mx-2.5 w-[311px] dark:border border-slate-800 rounded-xl shadow">
            <p className="font-semibold text-xl text-black dark:text-white ">
              Menu
            </p>
            <div className="flex  items-center ">
            {/* toggle button */}
              <ModeToggle />
              
               {/* profileicons */}
              <Profile />
            </div>
          </div>
    
          {/* Todo Inputs */}
          <CreateTodo/>
    
          {/* Add Button */}
    
    
    </>
)
}