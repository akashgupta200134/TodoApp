"use client";

import { useState, useEffect } from "react";
import TodosList from "@/components/todos/TodoList";
import { DatePickerIcon } from "@/components/ui/DatePicker";

export default function Middlebar() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  // Default date → Today (IST)
  useEffect(() => {
    const todayIST = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );
    setSelectedDate(todayIST);
  }, []);

  return (
    <section
      className="
        w-full md:w-[48%]
        px-3 sm:px-4 md:px-0
        mt-4 md:mt-0
        ml-0 md:ml-0
      "
    >
      {/* Date Picker */}
      <div
        className="
          flex items-center
          justify-center md:justify-start
          gap-3 md:gap-4
          mb-4
        "
      >
        <DatePickerIcon
          onDateSelect={(dateString: string) => {
            const [year, month, day] = dateString.split("-").map(Number);
            const selected = new Date(Date.UTC(year, month - 1, day));
            setSelectedDate(selected);
          }}
        />
      </div>

      {/* Todos */}
      <div className="w-full">
        {selectedDate && <TodosList selectedDate={selectedDate} />}
      </div>
    </section>
  );
}
