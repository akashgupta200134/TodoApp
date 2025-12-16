"use client";

import { createTodo } from "@/app/actions/index";
import { useActionState } from "react";
import Button from "../AddButton";

// Action state union
type TodoActionState =
  | { success: true }
  | { error: string };

export default function AddTodo() {
  // Explicitly type useActionState with FormData
  const [state, formAction, isPending] = useActionState<
    TodoActionState,
    FormData
  >(createTodo, { error: "" });

  return (
    <div>
      <form action={formAction}>
        <div className="mt-10">
          <p className="font-semibold md:ml-4 ml-2 text-lg text-gray-700 dark:text-gray-200 mb-2">
            Add Todo :
          </p>

          <div className="flex md:flex-row md:gap-2  flex-col gap-3">
            <input
              type="text"
              name="Title"
              placeholder="Enter title"
              className="border rounded-lg border-gray-300 dark:border-gray-700 bg-transparent p-3 md:w-38 w-full text-gray-800 dark:text-white"
              required
            />

            <input
              type="date"
              name="Date"
              className="border rounded-lg border-gray-300 w-full dark:border-gray-700 bg-transparent p-3 md:w-38 text-gray-800 dark:text-white"
              required
            />
          </div>
        </div>

        {/* Error message */}
        {"error" in state && (
          <p className="text-red-500 mt-2 ml-4">{state.error}</p>
        )}

        {/* Success message */}
        {"success" in state && (
          <p className="text-green-500 mt-2 ml-4">Todo added successfully ✅</p>
        )}

        <div className="md:mt-10 md:mb-4  ml-0  flex md:justify-center">
          <Button isPending={isPending} />
        </div>
      </form>
    </div> 
  );
}
