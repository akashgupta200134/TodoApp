import { prisma } from "@/lib/prisma";
import Tasklist from "@/components/Tasklist";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function TodosList() {
  const session = await getServerSession(authOptions);

  // ✅ Always check if session exists before using it
  if (!session || !session.user) {
    return (
      <p className="text-gray-500 text-center mt-6">
        Please log in to view your todos.
      </p>
    );
  }

  const todos = await prisma.todo.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  if (todos.length === 0) {
    return (
      <p className="text-gray-500 text-center mt-6">No todos yet. Add one!</p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      {todos.map((todo) => (
        <Tasklist key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
