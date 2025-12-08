"use client";
import { createTodo } from "@/app/actions/index";
import { useActionState } from "react";
import Button from "../AddButton";

export default function AddTodo() {
  const [state, formAction, isPending] = useActionState(createTodo, {
    error: "",
  } as const);
  return (
    <div>
      <form action={formAction}>
        <div className="mt-10">
          <p className="font-semibold ml-4 text-lg text-gray-700 dark:text-gray-200 mb-2">
            Add Todo :
          </p>

          <div className="flex flex-row gap-2 ml-2.5">
            <input
              type="text"
              name="Title"
              placeholder="Enter title"
              className="border rounded-lg border-gray-300 dark:border-gray-700 bg-transparent p-1 w-38 text-gray-800 dark:text-white"
              required
            />

            <input
              type="date"
              name="Date"
              className="border rounded-lg border-gray-300 dark:border-gray-700 bg-transparent p-2 w-38 text-gray-800 dark:text-white"
              required
            />
          </div>
        </div>
        <div className="mt-10 flex justify-center ">
          <Button  isPending = {isPending} />
        </div>
      </form>
    </div>
  );
}
