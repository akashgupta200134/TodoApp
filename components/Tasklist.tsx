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
  onUpdated,
}: {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdated?: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center   justify-center md:justify-start mt-4 md:mt-8 px-2 sm:px-0">
      <div
        className="
          flex items-center gap-3 md:gap-4  
          sm:w-full w-full  md:w-[90%]

          bg-white dark:bg-neutral-900
          border border-neutral-200 dark:border-neutral-800
          shadow-md rounded-xl

          p-3 md:p-4
          transition-all duration-300
        "
      >
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="
            h-5 w-5 shrink-0
            cursor-pointer
            accent-emerald-600
            rounded-md
            focus:ring-2 focus:ring-amber-400
          "
        />

        {/* Content */}
        <div className="flex flex-col grow min-w-0">
          <p
            className={`text-[15px] md:text-[17px] font-semibold truncate ${
              todo.completed
                ? "line-through text-gray-400"
                : "text-gray-800 dark:text-gray-100"
            }`}
          >
            {todo.title}
          </p>

          <p className="text-[13px] md:text-[14px] text-gray-500 dark:text-gray-400">
            {new Date(todo.taskDate).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Edit3
            onClick={() => setOpen(true)}
            size={20}
            className="cursor-pointer text-gray-700 dark:text-gray-200 hover:text-amber-500 transition-colors"
          />
          <Trash2
            onClick={() => onDelete(todo.id)}
            size={20}
            className="cursor-pointer text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400 transition-colors"
          />
        </div>
      </div>

      {/* Dialog */}
      {open && (
        <EditTodoDialog
          open={open}
          onOpenChange={setOpen}
          todo={todo}
          onUpdated={onUpdated}
        />
      )}
    </div>
  );
}
