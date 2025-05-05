"use server";

import { authActionClient } from "@/lib/safe-action";
import { z } from "zod";
import { toggleFavorite } from "../_repositories/toggle-favorite.repository";
import { revalidatePath } from "next/cache";

const addToFavoritesSchema = z.object({
  mediaType: z.string().min(1),
  movieId: z.number(),
  title: z.string().min(1),
  voteAverage: z.number(),
  posterPath: z.string(),
});

export const addToFavoritesAction = authActionClient
  .metadata({ actionName: "addToFavoritesAction" })
  .schema(addToFavoritesSchema)
  .action(
    async ({
      parsedInput: { mediaType, movieId, posterPath, voteAverage, title },
      ctx: { userId },
    }) => {
      await toggleFavorite({
        mediaType,
        movieId,
        userId,
        posterPath,
        voteAverage,
        title,
      });

      revalidatePath(`/movie-details/${movieId}`);
      return { message: "Success" };
    },
  );
