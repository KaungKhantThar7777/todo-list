import { z } from "zod";

export const addFormSchema = z.object({
  content: z.string().nonempty(),
});
