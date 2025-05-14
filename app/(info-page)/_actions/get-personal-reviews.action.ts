"use server";

import { authActionClient } from "@/lib/safe-action";
import { getPersonalReviews } from "../_repositories/get-personal-reviews.repository";
import { z } from "zod";

const getReviewsActionSchema = z.object({
  mediaId: z.number(),
});

export const getPersonalReviewsAction = authActionClient
  .metadata({ actionName: "getPersonalReviewsAction" })
  .schema(getReviewsActionSchema)
  .action(async ({ parsedInput: { mediaId }, ctx: { userId } }) => {
    const reviews = await getPersonalReviews(userId, mediaId);

    if (reviews === null) throw new Error("Reviews not found");

    return reviews;
  });
