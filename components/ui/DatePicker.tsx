"use client";

import * as React from "react";
import { format, isToday, isTomorrow } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerIconProps {
  onDateSelect?: (date: string) => void; // 👈 added prop
}

export function DatePickerIcon({ onDateSelect }: DatePickerIconProps) {
  const [date, setDate] = React.useState<Date>(new Date());

  // ✅ Function to get readable label
  const getDateLabel = (d?: Date): string => {
    if (!d) return "No date selected";
    if (isToday(d)) return "Today";
    if (isTomorrow(d)) return "Tomorrow";
    return format(d, "EEEE, d MMM"); // e.g., Friday, 1 Nov
  };

  // ✅ Handle date selection
const handleDateChange = (selected?: Date) => {
  if (selected) {
    setDate(selected);
    const formatted = selected.toLocaleDateString("en-CA"); // ✅ local date, not UTC
    onDateSelect?.(formatted);
  }
};


  // ✅ Handle clear date
  const clearDate = () => {
    setDate(new Date());
    onDateSelect?.(""); // reset to show all
  };

  return (
    <div className="flex items-center justify-center mt-1">
      <div className="flex items-center gap-6 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl px-6 py-4 shadow-md">
        
        {/* ✅ Date Label */}
        <div className="flex flex-col items-start min-w-[180px] text-left">
          <p className="text-lg text-gray-500 dark:text-gray-400 tracking-wide">
            {isToday(date)
              ? "Selected Day"
              : isTomorrow(date)
              ? "Next Day"
              : "Selected Date"}
          </p>
          <p className="text-3xl font-semibold text-gray-900 dark:text-gray-100 leading-tight">
            {getDateLabel(date)}
          </p>
        </div>

        {/* ✅ Calendar Icon + Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <button
              className="flex items-center justify-center rounded-full p-3 bg-amber-100 dark:bg-amber-900/30 hover:bg-amber-200 dark:hover:bg-amber-800 transition"
              aria-label="Select date"
            >
              <CalendarIcon className="h-7 w-7 text-amber-600 dark:text-amber-400" />
            </button>
          </PopoverTrigger>

          <PopoverContent
            align="center"
            sideOffset={8}
            className="w-auto p-0 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-lg rounded-xl"
          >
            <Calendar
              mode="single"
              selected={date}
              onSelect={(selected) => handleDateChange(selected)}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {/* ✅ Clear Button */}
        <button
          onClick={clearDate}
          className="ml-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
