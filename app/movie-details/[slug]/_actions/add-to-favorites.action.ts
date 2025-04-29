"use server";

import { authActionClient } from "@/lib/safe-action";
import { z } from "zod";
import { toggleFavorite } from "../_repositories/add-to-favorites.repository";
import { revalidatePath } from "next/cache";

const addToFavoritesSchema = z.object({
  type: z.string().min(1),
  movieId: z.number(),
});

export const addToFavoritesAction = authActionClient
  .metadata({ actionName: "addToFavoritesAction" })
  .schema(addToFavoritesSchema)
  .action(async ({ parsedInput: { type, movieId }, ctx: { userId } }) => {
    await toggleFavorite({ type, movieId, userId });

    revalidatePath(`/movie-details/${movieId}`);
    return { message: "Success" };
  });
