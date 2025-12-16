"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { TodoActionState } from "@/types/next-auth";

// Utility — Get Current User ID
async function getCurrentUserId() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");
  return session.user.id;
}

//  Convert YYYY-MM-DD → local date (no timezone shift)
function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day, 0, 0, 0);
}


 //CREATE Todo

export async function createTodo(
  prevState: TodoActionState,
  formData: FormData
): Promise<TodoActionState> {
  const title = formData.get("Title") as string;
  const taskDateStr = formData.get("Date") as string;

  if (!title?.trim() || !taskDateStr?.trim()) {
    return { error: "Title and Date are required." };
  }

  const userId = await getCurrentUserId();

  try {
    const localDate = parseLocalDate(taskDateStr);

    await prisma.todo.create({
      data: {
        title,
        completed: false,
        taskDate: localDate,
        userId,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error("Error creating todo:", err);
    return { error: "Failed to create todo." };
  }
}


// UPDATE Todo

export async function updateTodo(id: number, title: string, taskDateStr: string) {
  const userId = await getCurrentUserId();

  const todo = await prisma.todo.findUnique({ where: { id } });
  if (!todo) throw new Error("Todo not found");
  if (todo.userId !== userId) throw new Error("Forbidden");

  const normalizedDate = parseLocalDate(taskDateStr);

  await prisma.todo.update({
    where: { id },
    data: { title, taskDate: normalizedDate },
  });

  revalidatePath("/");
  return { success: true };
}


 //TOGGLE Completion

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


 // DELETE Todo

export async function deleteTodo(id: number) {
  const userId = await getCurrentUserId();

  const todo = await prisma.todo.findUnique({ where: { id } });
  if (!todo) throw new Error("Todo not found");
  if (todo.userId !== userId) throw new Error("Forbidden");

  await prisma.todo.delete({ where: { id } });

  revalidatePath("/");
}


 // GET Todos (All or Filtered by Date)

export async function getTodos(date?: string) {
  const userId = await getCurrentUserId();

  try {
    const where: any = { userId };

    if (date) {
      // Local start/end of day
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
    console.error("❌ Error fetching todos:", error);
    return { todos: [] };
  }
}
