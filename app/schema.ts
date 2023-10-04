import { z } from "zod";

export const addFormSchema = z.object({
  content: z.string().nonempty(),
});

export const toggleTodoSchema = z.object({
  id: z.string().nonempty(),
  done: z.boolean(),
});

export const updateTodoSchema = z.object({
  id: z.string().nonempty(),
  content: z.string().nonempty(),
});

export const deleteTodoSchema = z.object({
  id: z.string().nonempty(),
});
