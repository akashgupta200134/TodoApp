"use client";

import { useEffect, useState, useTransition } from "react";
import Tasklist from "@/components/Tasklist";
import { getTodos, toggleTodo, deleteTodo } from "@/app/actions";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
  taskDate: Date;
  userId: string;
};

export default function TodosList({ selectedDate }: { selectedDate?: Date | null }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isPending, startTransition] = useTransition();

  // 🧠 Fetch todos
  const fetchTodos = async (date?: Date | null) => {
    if (!date) return;

    // ✅ Convert selectedDate to YYYY-MM-DD format (UTC-safe)
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const formatted = `${year}-${month}-${day}`;

    const result = await getTodos(formatted);
    if (result?.todos && Array.isArray(result.todos)) {
      setTodos(result.todos);
    } else {
      setTodos([]);
    }
  };

  // 🔄 Load todos when component mounts or date changes
  useEffect(() => {
    startTransition(() => {
      fetchTodos(selectedDate);
    });
  }, [selectedDate]);

  // ✅ Optimistic toggle
  const handleToggle = async (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    await toggleTodo(id);
    fetchTodos(selectedDate);
  };

  // ✅ Optimistic delete
  const handleDelete = async (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    await deleteTodo(id);
    fetchTodos(selectedDate);
  };

  return (
    <div>
      {todos.length === 0 ? (
        <p className="text-gray-500 mt-4 text-center">No tasks available for this date.</p>
      ) : (
        todos.map((todo) => (
          <Tasklist
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onUpdated={() => fetchTodos(selectedDate)}
          />
        ))
      )}
    </div>
  );
}
