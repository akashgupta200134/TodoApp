"use client";

import { useState, useTransition } from "react";
import { updateTodo } from "@/app/actions";

export default function EditTodoDialog({
  open,
  onOpenChange,
  todo,
  onUpdated, // ✅ add this
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  todo: any;
  onUpdated?: () => void; // ✅ optional type
}) {
  const [title, setTitle] = useState(todo.title);
  const [taskDate, setTaskDate] = useState(
    new Date(todo.taskDate).toISOString().split("T")[0]
  );
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      // ✅ Fix timezone shift when saving
      const utcDate = new Date(`${taskDate}T00:00:00.000Z`);
      await updateTodo(todo.id, title, new Date(`${taskDate}T00:00:00.000Z`).toISOString());


      onOpenChange(false);
      if (onUpdated) onUpdated(); // ✅ refresh todos in parent
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-md w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Edit Todo</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded-md bg-transparent text-gray-900 dark:text-white"
          />
          <input
            type="date"
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
            className="border p-2 rounded-md bg-transparent text-gray-900 dark:text-white"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 bg-gray-300 dark:bg-neutral-800 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 bg-emerald-600 text-white rounded-md"
            >
              {isPending ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
