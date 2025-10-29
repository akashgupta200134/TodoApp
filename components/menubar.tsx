import Button from "./AddButton";
import { ModeToggle } from "./mode-toggle";
import Profile from "./Profile";

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
          <div className="mt-10 ">
            <p className="font-semibold ml-4 text-lg text-gray-700 dark:text-gray-200 mb-2">
              Add Todo:
            </p>
            <div className="flex flex-row gap-2 ml-2.5 ">
              <input
                type="text"
                name="Title"
                placeholder="Enter title"
                className="border rounded-lg border-gray-300 dark:border-gray-700 bg-transparent p-1 w-38 text-gray-800 dark:text-white"
              />
              <input
                type="date"
                name="Date"
                className="border rounded-lg border-gray-300 dark:border-gray-700 bg-transparent p-2 w-38 text-gray-800 dark:text-white"
              />
            </div>
          </div>
    
          {/* Add Button */}
          <div className="mt-8 flex justify-center">
            <Button />
          </div>
    
    </>
)
}