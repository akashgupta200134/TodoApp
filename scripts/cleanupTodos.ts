import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function cleanupTodos() {
  console.log("🧹 Starting todo cleanup...");

  //  Get all valid user IDs
  const users = await prisma.user.findMany({ select: { id: true } });
     const validUserIds = new Set(users.map((u: { id: string }) => u.id));

  //  Get all todos
  const todos = await prisma.todo.findMany();

  //  Find todos with invalid or missing userId
const invalidTodos = todos.filter((todo: { userId: string }) => !validUserIds.has(todo.userId));


  if (invalidTodos.length === 0) {
    console.log("All todos have valid user references!");
  } else {
    console.log(`⚠️ Found ${invalidTodos.length} invalid todos:`);

type TodoType = Awaited<ReturnType<typeof prisma.todo.findMany>>[number];

invalidTodos.forEach((t: TodoType) =>
  console.log(`  - id: ${t.id}, userId: ${t.userId}`)
);


    //Option A: Delete them


const deleteIds = invalidTodos.map((t: TodoType) => t.id);

    await prisma.todo.deleteMany({
      where: { id: { in: deleteIds } },
    });
    console.log(` Deleted ${deleteIds.length} invalid todos.`);
  }

  await prisma.$disconnect();
  console.log("✨ Cleanup completed!");
}

cleanupTodos().catch(err => {
  console.error(" Error during cleanup:", err);
  prisma.$disconnect();
});


