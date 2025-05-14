import { db } from "@/server/db";
import { reviews } from "@/server/db/auth-schema";

export async function submitReviewRepository(media: {
  mediaType: string;
  movieId: number;
  userId: string;
  review: string;
  rate: number;
}) {
  await db.insert(reviews).values(media);
}
