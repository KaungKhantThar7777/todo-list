import { prisma } from "@/utils/db";
import TodoList from "./components/TodoList";
import AddForm from "./components/AddForm";

export default async function Home() {
  const todos = await prisma.todo.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <main className="p-4 mt-20 max-w-lg mx-auto">
      <AddForm />
      <TodoList todos={todos} />
    </main>
  );
}
