import { db } from "@/server/db";
import { favoritesMovies } from "@/server/db/auth-schema";
import { and, eq } from "drizzle-orm";

export async function toggleFavorite(movie: {
  mediaType: string;
  movieId: number;
  userId: string;
  posterPath: string;
  title: string;
  voteAverage: number;
}) {
  const existingFavorite = await db
    .select()
    .from(favoritesMovies)
    .where(
      and(
        eq(favoritesMovies.movieId, movie.movieId),
        eq(favoritesMovies.userId, movie.userId),
      ),
    );

  if (existingFavorite.length > 0) {
    await db
      .delete(favoritesMovies)
      .where(
        and(
          eq(favoritesMovies.movieId, movie.movieId),
          eq(favoritesMovies.userId, movie.userId),
        ),
      );
  } else {
    await db.insert(favoritesMovies).values(movie);
  }
}
