"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { TodoActionState } from "@/types/next-auth";

/* ----------------------------------
   Utility — Get Current User ID
----------------------------------- */
async function getCurrentUserId() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");
  return session.user.id;
}

/* ----------------------------------
   Convert YYYY-MM-DD → Local Date
   (No timezone shift, Prisma-safe)
----------------------------------- */
function parseLocalDate(dateStr?: string | null): Date | null {
  if (!dateStr) return null;

  const parts = dateStr.split("-");
  if (parts.length !== 3) return null;

  const [year, month, day] = parts.map(Number);
  if (!year || !month || !day) return null;

  const date = new Date(year, month - 1, day);
  return isNaN(date.getTime()) ? null : date;
}

/* ----------------------------------------------------------
 ✅ CREATE Todo
---------------------------------------------------------- */
export async function createTodo(
  prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  const title = formData.get("Title") as string;
  const taskDateStr = formData.get("Date") as string;

  if (!title?.trim() || !taskDateStr?.trim()) {
    return { error: "Title and Date are required." };
  }

  const userId = await getCurrentUserId();
  const localDate = parseLocalDate(taskDateStr);

  // 🔴 STRICT VALIDATION (IMPORTANT)
  if (!localDate) {
    return { error: "Invalid date format." };
  }

  try {
    await prisma.todo.create({
      data: {
        title,
        completed: false,
        taskDate: localDate, // ✅ ALWAYS VALID
        userId,
      },
    });

    revalidatePath("/");
    return { error: undefined };
  } catch (err) {
    console.error("❌ Error creating todo:", err);
    return { error: "Failed to create todo." };
  }
}

/* ----------------------------------
   UPDATE TODO
----------------------------------- */
export async function updateTodo(
  id: number,
  title: string,
  taskDateStr?: string
) {
  const userId = await getCurrentUserId();

  const todo = await prisma.todo.findUnique({ where: { id } });
  if (!todo) throw new Error("Todo not found");
  if (todo.userId !== userId) throw new Error("Forbidden");

  const normalizedDate = parseLocalDate(taskDateStr);

  // 🔴 Prevent invalid date update
  if (taskDateStr && !normalizedDate) {
    throw new Error("Invalid date format");
  }

  await prisma.todo.update({
    where: { id },
    data: {
      title,
      ...(normalizedDate && { taskDate: normalizedDate }), // ✅ SAFE
    },
  });

  revalidatePath("/");
  return { success: true };
}

/* ----------------------------------
   TOGGLE COMPLETION
----------------------------------- */
export async function toggleTodo(id: number) {
  const userId = await getCurrentUserId();

  const todo = await prisma.todo.findUnique({ where: { id } });
  if (!todo) throw new Error("Todo not found");
  if (todo.userId !== userId) throw new Error("Forbidden");

  await prisma.todo.update({
    where: { id },
    data: { completed: !todo.completed },
  });

  revalidatePath("/");
}

/* ----------------------------------
   DELETE TODO
----------------------------------- */
export async function deleteTodo(id: number) {
  const userId = await getCurrentUserId();

  const todo = await prisma.todo.findUnique({ where: { id } });
  if (!todo) throw new Error("Todo not found");
  if (todo.userId !== userId) throw new Error("Forbidden");

  await prisma.todo.delete({ where: { id } });

  revalidatePath("/");
}

/* ----------------------------------
   GET TODOS (ALL / FILTER BY DATE)
----------------------------------- */
export async function getTodos(date?: string) {
  const userId = await getCurrentUserId();

  try {
    const where: any = { userId };

    if (date) {
      const [year, month, day] = date.split("-").map(Number);

      const localStart = new Date(year, month - 1, day, 0, 0, 0);
      const localEnd = new Date(year, month - 1, day, 23, 59, 59);

      where.taskDate = {
        gte: localStart,
        lte: localEnd,
      };
    }

    const todos = await prisma.todo.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return { todos };
  } catch (error) {
    console.error("Error fetching todos:", error);
    return { todos: [] };
  }
}
