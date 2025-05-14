import { z } from "zod";

export const reviewSchema = z.object({
  review: z
    .string()
    .min(2, { message: "Review must be at least 2 characters." }),
});

export type ReviewSchemaInput = z.infer<typeof reviewSchema>;
