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

export function DatePickerIcon() {
  const [date, setDate] = React.useState<Date>(new Date());

  // Function to get custom label
  const getDateLabel = (d?: Date): string => {
    if (!d) return "No date selected";
    if (isToday(d)) return "Today";
    if (isTomorrow(d)) return "Tomorrow";
    return format(d, "EEEE, d MMM"); // Example: Friday, 1 Nov
  };

  return (
    <div className="flex items-center gap-4">
      {/* ✅ Label on Left */}
      <p className="text-5xl font-bold text-black dark:text-white min-w-[120px]">
        {getDateLabel(date)}
      </p>

      {/* ✅ Calendar Icon Trigger */}
      <Popover>
        <PopoverTrigger asChild>
          <CalendarIcon
            className="h-8 w-8 mt-5 text-gray-700 dark:text-gray-200 cursor-pointer hover:text-amber-500 transition-colors"
          />
        </PopoverTrigger>

        {/* ✅ Calendar Popup */}
        <PopoverContent
          className="w-auto p-0 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-md rounded-xl"
          align="end"
        >
 <Calendar
  mode="single"
  selected={date}
  onSelect={(selected) => {
    if (selected) setDate(selected);
  }}
  required={false}
  initialFocus
/>

        </PopoverContent>
      </Popover>
    </div>
  );
}
