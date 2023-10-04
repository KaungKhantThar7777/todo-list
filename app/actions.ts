"use server";
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";

import { TodoForm, ToggleTodo } from "./types";
import { addFormSchema, toggleTodoSchema } from "./schema";

export async function createTodo(prevState: any, formData: TodoForm) {
  addFormSchema.parse(formData);

  try {
    const todo = await prisma.todo.create({
      data: formData,
    });
    revalidatePath("/");

    return { message: `Added todo ${todo.id}` };
  } catch (error) {
    return {
      message: "Failed to create todo",
    };
  }
}

export async function toggleTodo(prevState: any, data: ToggleTodo) {
  console.log({ data });
  toggleTodoSchema.parse(data);

  try {
    const todo = await prisma.todo.update({
      where: {
        id: data.id,
      },
      data: {
        done: data.done,
      },
    });

    revalidatePath("/");
    return {
      message: `Toggled todo ${todo.id}`,
    };
  } catch (error) {
    return {
      message: "Failed to toggle todo.",
    };
  }
}
