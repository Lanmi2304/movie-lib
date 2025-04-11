import { z } from "zod";

export const searchSchema = z.object({
  term: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export type SearchSchemaInput = z.infer<typeof searchSchema>;
