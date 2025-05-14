import { db } from "@/server/db";
import { reviews } from "@/server/db/auth-schema";
import { and, eq } from "drizzle-orm";

export async function getPersonalReviews(userId: string, movieId: number) {
  return await db
    .select()
    .from(reviews)
    .where(and(eq(reviews.movieId, movieId), eq(reviews.userId, userId)))
    .limit(1);
}
