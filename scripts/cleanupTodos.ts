import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function cleanupTodos() {
  console.log("🧹 Starting todo cleanup...");

  // 1️⃣ Get all valid user IDs
  const users = await prisma.user.findMany({ select: { id: true } });
  const validUserIds = new Set(users.map(u => u.id));

  // 2️⃣ Get all todos
  const todos = await prisma.todo.findMany();

  // 3️⃣ Find todos with invalid or missing userId
  const invalidTodos = todos.filter(todo => !validUserIds.has(todo.userId));

  if (invalidTodos.length === 0) {
    console.log("✅ All todos have valid user references!");
  } else {
    console.log(`⚠️ Found ${invalidTodos.length} invalid todos:`);
    invalidTodos.forEach(t => console.log(`  - id: ${t.id}, userId: ${t.userId}`));

    // 4️⃣ Option A: Delete them
    const deleteIds = invalidTodos.map(t => t.id);
    await prisma.todo.deleteMany({
      where: { id: { in: deleteIds } },
    });
    console.log(`🗑️ Deleted ${deleteIds.length} invalid todos.`);

    // 4️⃣ Option B (Alternative): Reassign to a default user
    // Uncomment this if you want to reassign instead of delete:
    /*
    const DEFAULT_USER_ID = "your_valid_user_id_here";
    for (const todo of invalidTodos) {
      await prisma.todo.update({
        where: { id: todo.id },
        data: { userId: DEFAULT_USER_ID },
      });
    }
    console.log(`🔁 Reassigned ${invalidTodos.length} todos to user ${DEFAULT_USER_ID}`);
    */
  }

  await prisma.$disconnect();
  console.log("✨ Cleanup completed!");
}

cleanupTodos().catch(err => {
  console.error("❌ Error during cleanup:", err);
  prisma.$disconnect();
});
