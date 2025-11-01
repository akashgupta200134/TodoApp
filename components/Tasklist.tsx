"use client";

import { Edit3, Trash2 } from "@deemlol/next-icons";
import { useState } from "react";
import EditTodoDialog from "@/components/todos/EditTodo";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
  taskDate: Date;
  userId: string;
};

export default function Tasklist({
  todo,
  onToggle,
  onDelete,
  onUpdated, // 👈 add this prop
}: {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdated?: () => void; // 👈 optional
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-center mt-8">
      <div className="flex flex-row items-center gap-4 w-[380px] md:w-[490px] bg-white dark:bg-neutral-900 shadow-md border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 transition-all duration-300">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="h-5 w-5 cursor-pointer accent-emerald-600 border-gray-300 dark:border-neutral-700 rounded-md focus:ring-2 focus:ring-amber-400 transition-all"
        />

        <div className="flex flex-col grow">
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
            {new Date(todo.taskDate).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="flex flex-row gap-4">
          <Edit3
            onClick={() => setOpen(true)}
            size={22}
            className="cursor-pointer text-gray-700 dark:text-gray-200 hover:text-amber-500 transition-colors duration-200"
          />
          <Trash2
            onClick={() => onDelete(todo.id)}
            size={22}
            className="cursor-pointer text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400 transition-colors duration-200"
          />
        </div>
      </div>

      {/* Dialog */}
      {open && todo && (
        <EditTodoDialog
          open={open}
          onOpenChange={setOpen}
          todo={todo}
          onUpdated={onUpdated} // ✅ call parent’s re-fetch function
        />
      )}
    </div>
  );
}
