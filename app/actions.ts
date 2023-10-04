"use server";
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { TodoForm } from "./types";
import { addFormSchema } from "./schema";

export async function createTodo(prevState: any, formData: TodoForm) {
  console.log({ formData }, "from here");
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
