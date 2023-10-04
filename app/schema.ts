import { z } from "zod";

export const addFormSchema = z.object({
  content: z.string().nonempty(),
});

export const toggleTodoSchema = z.object({
  id: z.string().nonempty(),
  done: z.boolean(),
});
