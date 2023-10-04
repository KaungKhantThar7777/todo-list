"use server";
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";

import { DeleteTodo, TodoForm, ToggleTodo, UpdateTodo } from "./types";
import { addFormSchema, deleteTodoSchema, toggleTodoSchema, updateTodoSchema } from "./schema";

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

export async function updateTodo(prevState: any, data: UpdateTodo) {
  updateTodoSchema.parse(data);

  try {
    const todo = await prisma.todo.update({
      where: {
        id: data.id,
      },
      data: {
        content: data.content,
      },
    });

    revalidatePath("/");
    return {
      message: `Update todo ${todo.id}`,
    };
  } catch (error) {
    return {
      message: "Failed to upate todo.",
    };
  }
}

export async function deleteTodo(prevState: any, formData: FormData) {
  const data = deleteTodoSchema.parse({
    id: formData.get("id"),
  });

  try {
    const todo = await prisma.todo.delete({
      where: {
        id: data.id,
      },
    });

    revalidatePath("/");
    return {
      message: `Removed todo ${todo.id}`,
    };
  } catch (error) {
    return {
      message: "Failed to remove todo.",
    };
  }
}
