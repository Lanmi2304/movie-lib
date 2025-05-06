import { categoryTitleMovie } from "@/lib/utils/categories";
import { Clock, Star } from "lucide-react";
import Image from "next/image";
import PlayTrailer from "../../_components/play-trailler";
import { MovieActions } from "../../_components/movie-actions";
import { db } from "@/server/db";
import { favoritesMovies } from "@/server/db/auth-schema";
import { and, eq } from "drizzle-orm";
import {
  fetchMovieDetails,
  fetchMovieTrailer,
} from "@/app/(info-page)/movie-details/_api/fetch-movie";
import { auth } from "@/server/auth";
import { headers } from "next/headers";
import { fetchProviders } from "../../_api/get-providers";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const movie = await fetchMovieDetails(slug);
  const movieTrailer = await fetchMovieTrailer(movie.id);
  const movieProviders = await fetchProviders("movie", movie.id);
  const session = await auth.api.getSession({ headers: await headers() });

  const userId = session?.user?.id;

  let isFavorite = false;

  const { RS } = movieProviders.results;

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

  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-full lg:px-4">
        <div className="w-full lg:px-4">
          <div className="relative block h-[420px] w-full lg:hidden">
            <Image
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={`${movie.title} poster`}
              className="absolute inset-0 rounded-b-xl object-cover object-center"
              fill
            />
          </div>
        </div>
        <div className="relative h-[500px] w-full">
          <div
            className="absolute size-full mask-r-from-10% mask-b-from-80% mask-l-from-10% bg-cover bg-center opacity-60"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            }}
          ></div>

          <div className="flex size-full gap-10 pt-10 lg:p-4">
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
            <div className="relative flex w-full flex-col justify-between lg:w-3/4">
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

              {movie.tagline && (
                <p className="text-lg italic">``{movie.tagline ?? ""}``</p>
              )}

              <PlayTrailer videoKey={movieTrailer} />

              <MovieActions movie={movie} isFavorite={isFavorite} />

              <div>
                <h3>
                  Where to watch <span>(Serbia)</span>
                </h3>
                {RS?.flatrate.length > 0 ? (
                  RS?.flatrate.map(
                    (
                      el: { provider_name: string; logo_path: string },
                      idx: number,
                    ) => (
                      <div key={idx} className="flex items-center gap-2 py-1">
                        <Image
                          src={`https://image.tmdb.org/t/p/original${el.logo_path}`}
                          alt={`${el.provider_name} logo`}
                          width={30}
                          height={30}
                          className="rounded-lg"
                        />
                        <p>{el.provider_name}</p>
                      </div>
                    ),
                  )
                ) : (
                  <p className="text-red-300">Unavailable</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 flex flex-col gap-4">
          <div>
            <h3 className="text-foreground/60 text-2xl">Overview</h3>
            <p>{movie.overview}</p>
          </div>

          <h3 className="text-foreground/60 text-2xl">Casts</h3>
          <div></div>
        </div>
      </div>
    </div>
  );
}
