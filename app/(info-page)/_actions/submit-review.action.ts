"use server";

import { authActionClient } from "@/lib/safe-action";
import { z } from "zod";
import { submitReviewRepository } from "../_repositories/submit-review.repository";

const addToFavoritesSchema = z.object({
  mediaType: z.string().min(1),
  movieId: z.number(),
  review: z.string(),
  rate: z.number(),
});

export const submitReviewAction = authActionClient
  .metadata({ actionName: "submitReviewAction" })
  .schema(addToFavoritesSchema)
  .action(
    async ({
      parsedInput: { mediaType, movieId, review, rate },

      ctx: { userId },
    }) => {
      await submitReviewRepository({
        mediaType,
        movieId,
        userId,
        review,
        rate,
      });

      return { message: "Success" };
    },
  );
