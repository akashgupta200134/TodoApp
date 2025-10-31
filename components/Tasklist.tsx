"use client";

import { Edit3, Trash2 } from "@deemlol/next-icons"
import { startTransition, useState, useTransition } from "react"
import EditTodoDialog from "@/components/todos/EditTodo";
import { toggleTodo, deleteTodo } from "@/app/actions";
import { log } from "console";



type Todo = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
  taskDate: Date;
  userId: string; // 👈 add this line
};




export default function Tasklist( {todo }: { todo: Todo }) {
  const [open, setOpen] = useState(false) // controls dialog visibility
  const [isPending, startTransition] = useTransition();

    const handleToggle = (id: number) => {
    startTransition(async () => {
      await toggleTodo(todo.id);
    });
  };

   const handleDelete = () => {
    startTransition(async () => {
      await deleteTodo(todo.id);
    });
  };
  
  
  

  return (
    <div className="flex justify-center mt-8">
      <div className="flex flex-row items-center gap-4 w-[400px] md:w-[500px] bg-white dark:bg-neutral-900 shadow-md border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 transition-all duration-300">
        {/* Checkbox */}
      <input
  type="checkbox"
  checked={todo.completed}
  onChange={() => handleToggle(todo.id)} // <- call an update function
  className="h-5 w-5 cursor-pointer accent-emerald-600 border-gray-300 dark:border-neutral-700 rounded-md focus:ring-2 focus:ring-amber-400 transition-all"
/>

        {/* Task Info */}
        <div className="flex flex-col grow ">
          <p
            className={`text-[17px] font-semibold transition-all duration-200 ${
              todo.completed
                ? "line-through text-gray-400"
                : "text-gray-800 dark:text-gray-100"
            }`}
          >
            {todo.title}
          </p>
          <p className="text-[14px] text-gray-500 dark:text-gray-400">
           {new Date(todo.taskDate).toLocaleDateString()}
          </p>
        </div>

        {/* Action Icons */}
        <div className="flex flex-row gap-4">
          <Edit3
            onClick={() => setOpen(true)} // open dialog when clicked
            size={22}
            className="cursor-pointer text-gray-700 dark:text-gray-200 hover:text-amber-500 transition-colors duration-200"
          />
          <Trash2 onClick={() => {handleDelete()}}
            size={22}
            className="cursor-pointer text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400 transition-colors duration-200"
          />
        </div>
      </div>

      {/* Dialog rendered here */}
{open && todo && (
  <EditTodoDialog open={open} onOpenChange={setOpen} todo={todo} />
)}
    </div>
  )
}

