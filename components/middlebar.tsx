"use client";

import { useState, useEffect } from "react";
import TodosList from "@/components/todos/TodoList";
import { DatePickerIcon } from "@/components/ui/DatePicker";

export default function Middlebar() {
  // Use a Date object, not string
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());


  // ✅ On mount, set default date to *today in IST*
  useEffect(() => {
    const todayIST = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );
    setSelectedDate(todayIST);
  }, []);

  return (
    <div>
      {/* Date Picker */}
      <div className="flex items-center gap-4 mb-4">
        <DatePickerIcon
          onDateSelect={(dateString: string) => {
            const [year, month, day] = dateString.split("-").map(Number);
            const selected = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
            setSelectedDate(selected);
          }}
        />
      </div>

      {/* Todos List filtered by selectedDate */}
      {selectedDate && <TodosList selectedDate={selectedDate} />}
    </div>
  );
}
