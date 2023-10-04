import { Prisma } from "@prisma/client";

export type TodoForm = {
  content: string;
};

export type ToggleTodo = Pick<Prisma.TodoCreateInput, "id" | "done">;
export type UpdateTodo = Pick<Prisma.TodoCreateInput, "id" | "content">;
export type DeleteTodo = Pick<Prisma.TodoCreateInput, "id">;
