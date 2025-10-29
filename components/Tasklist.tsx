"use client"

import { Edit3, Trash2 } from "@deemlol/next-icons"
import AddUserDialog from "./Adduserdialog"
import { useState } from "react"

export default function Tasklist() {
  const [open, setOpen] = useState(false) // controls dialog visibility

  return (
    <div className="flex justify-center mt-8">
      <div className="flex flex-row items-center gap-4 w-[400px] md:w-[500px] bg-white dark:bg-neutral-900 shadow-md border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 transition-all duration-300">
        {/* Checkbox */}
        <input
          type="checkbox"
          className="h-5 w-5 cursor-pointer accent-emerald-600 border-gray-300 dark:border-neutral-700 rounded-md focus:ring-2 focus:ring-amber-400 transition-all"
        />

        {/* Task Info */}
        <div className="flex flex-col grow ">
          <p className="text-[17px] font-semibold text-gray-800 dark:text-gray-100">
            Hello
          </p>
          <p className="text-[14px] text-gray-500 dark:text-gray-400">
            30/10/25
          </p>
        </div>

        {/* Action Icons */}
        <div className="flex flex-row gap-4">
          <Edit3
            onClick={() => setOpen(true)} // open dialog when clicked
            size={22}
            className="cursor-pointer text-gray-700 dark:text-gray-200 hover:text-amber-500 transition-colors duration-200"
          />
          <Trash2
            size={22}
            className="cursor-pointer text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400 transition-colors duration-200"
          />
        </div>
      </div>

      {/* Dialog rendered here */}
      <AddUserDialog open={open} onOpenChange={setOpen} />
    </div>
  )
}
