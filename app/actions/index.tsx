"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";

// 🟢 CREATE Todo
export async function createTodo(
  prevState: any,
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  const title = formData.get("Title") as string;
  const taskDate = formData.get("Date") as string;

  if (!title?.trim() || !taskDate?.trim()) {
    return { error: "Title and Date are required." };
  }

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

try {
await prisma.todo.create({
  data: {
    title,
    taskDate: new Date(taskDate),
    user: { connect: { id: session.user.id } },
  },
})
    


    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error("Error creating todo:", err);
    return { error: "Failed to create todo." };
  }
}

// 🟡 UPDATE Todo
export async function updateTodo(id: number, title: string, taskDate: Date) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const todo = await prisma.todo.findUnique({ where: { id } });
  if (!todo || todo.userId !== session.user.id)
    throw new Error("Forbidden");

  await prisma.todo.update({
    where: { id },
    data: { title, taskDate },
  });

  revalidatePath("/");
}

// 🔵 TOGGLE Completion
export async function toggleTodo(id: number) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const todo = await prisma.todo.findUnique({ where: { id } });
  if (!todo || todo.userId !== session.user.id)
    throw new Error("Forbidden");

  await prisma.todo.update({
    where: { id },
    data: { completed: !todo.completed },
  });

  revalidatePath("/");
}

// 🔴 DELETE Todo
export async function deleteTodo(id: number) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const todo = await prisma.todo.findUnique({ where: { id } });
  if (!todo || todo.userId !== session.user.id)
    throw new Error("Forbidden");

  console.log("Todo:", todo);
console.log("Session user:", session?.user);


  await prisma.todo.delete({
    where: { id },
  });

  revalidatePath("/");
}
