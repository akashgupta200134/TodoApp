"use client";

import * as React from "react";
import { format, isToday, isTomorrow } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DatePickerIconProps {
  onDateSelect?: (date: string) => void;
}

export function DatePickerIcon({ onDateSelect }: DatePickerIconProps) {
  const [date, setDate] = React.useState<Date>(new Date());

  const getDateLabel = (d?: Date): string => {
    if (!d) return "No date selected";
    if (isToday(d)) return "Today";
    if (isTomorrow(d)) return "Tomorrow";
    return format(d, "EEEE, d MMM");
  };

  const handleDateChange = (selected?: Date) => {
    if (selected) {
      setDate(selected);
      onDateSelect?.(selected.toLocaleDateString("en-CA"));
    }
  };

  const clearDate = () => {
    setDate(new Date());
    onDateSelect?.("");
  };

  return (
    <div className="flex justify-center px-3 md:px-0 mt-2 md:mt-0">
      <div
        className="
          w-[350px] md:w-full max-w-[420px] md:max-w-none
          flex flex-col md:flex-row
          md:items-center
          gap-4 md:gap-10

          p-4 md:p-5
          bg-white dark:bg-neutral-900
          border border-gray-200 dark:border-neutral-800
          rounded-2xl shadow-md
          transition-all
        "
      >
        {/* Date Label */}
        <div className="flex flex-col text-left md:w-full">
          <p className="text-sm text-gray-500 dark:text-gray-400 tracking-wide">
            {isToday(date)
              ? "Selected Day"
              : isTomorrow(date)
              ? "Next Day"
              : "Selected Date"}
          </p>

          <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100 leading-tight break-words">
            {getDateLabel(date)}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between md:justify-start gap-4">
          {/* Calendar */}
          <Popover>
            <PopoverTrigger asChild>
              <button
                aria-label="Select date"
                className="
                  flex items-center justify-center
                  rounded-full
                  p-3 md:p-2
                  bg-amber-100 dark:bg-amber-900/30
                  hover:bg-amber-200 dark:hover:bg-amber-800
                  transition
                "
              >
                <CalendarIcon className="h-7 w-7 md:h-6 md:w-6 text-amber-600 dark:text-amber-400" />
              </button>
            </PopoverTrigger>

            <PopoverContent
              align="center"
              sideOffset={8}
              className="p-0 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-lg rounded-xl"
            >
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {/* Clear Button */}
          <button
            onClick={clearDate}
            className="
              text-sm md:text-sm
              px-4 py-2
              rounded-lg
              bg-yellow-400
              text-gray-900
              hover:bg-yellow-300
              transition
              w-[110px] md:w-[180px]
            "
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
