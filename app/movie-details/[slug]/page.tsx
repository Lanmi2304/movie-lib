import { categoryTitleMovie } from "@/lib/utils/categories";
import { Clock, Star } from "lucide-react";
import Image from "next/image";
import PlayTrailer from "./_components/play-trailler";
import { MovieActions } from "./_components/movie-actions";
import { db } from "@/server/db";
import { favoritesMovies } from "@/server/db/auth-schema";
import { and, eq } from "drizzle-orm";
import { fetchMovieDetails, fetchMovieTrailer } from "@/lib/api/movie";
import { auth } from "@/server/auth";
import { headers } from "next/headers";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const movie = await fetchMovieDetails(slug);
  const movieTrailer = await fetchMovieTrailer(movie.id);
  const session = await auth.api.getSession({ headers: await headers() });

  const userId = session?.user?.id;

  let isFavorite = false;

  if (userId) {
    const favorite = await db
      .select()
      .from(favoritesMovies)
      .where(
        and(
          eq(favoritesMovies.movieId, movie.id),
          eq(favoritesMovies.userId, userId),
        ),
      )
      .limit(1);

    isFavorite = favorite.length > 0;
  }

  const categories = movie.genres
    .map((gen: { id: number; name: string }) => categoryTitleMovie(gen.id))
    .splice(0, 2)
    .join(", ");

  const pathName = (await headers()).get("x-path");
  const mediaType = pathName?.startsWith("/m") ? "movie" : "tv";

  return (
    <div className="flex w-full items-center justify-center">
      <div className="h-[100dvh] w-full px-4">
        <div className="relative h-[520px] w-full">
          <div
            className="absolute size-full mask-r-from-10% mask-l-from-10% bg-cover bg-center opacity-60"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            }}
          ></div>

          <div className="flex size-full gap-10 p-4 pt-10">
            {/*  Poster */}
            <div className="relative hidden h-full w-1/4 lg:flex">
              <Image
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={`${movie.title} poster`}
                className="absolute inset-0 rounded-xl"
                fill
              />
            </div>

            {/* Details etc..  */}
            <div className="relative flex w-full flex-col gap-8 lg:w-3/4">
              <div>
                <h1 className="text-4xl font-semibold">
                  {movie.title} ({movie.release_date.slice(0, 4)})
                </h1>
                <p className="text-foreground/80">{categories}</p>
              </div>

              <div className="flex items-center gap-2">
                <Clock />
                <p>{movie.runtime} min</p>
              </div>

              <div className="flex items-center gap-2">
                <Star />
                <p>{movie.vote_average.toFixed(1)}</p>
              </div>

              <p className="text-lg italic">``{movie.tagline ?? ""}``</p>

              <PlayTrailer videoKey={movieTrailer} />

              <MovieActions
                movie={{ media_type: mediaType, ...movie }}
                isFavorite={isFavorite}
              />

              <div className="flex flex-col gap-2">
                <h3 className="text-foreground/60 text-2xl">Overview</h3>
                <p>{movie.overview}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
