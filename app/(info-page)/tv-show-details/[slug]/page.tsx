import { MovieActions } from "@/app/(info-page)/_components/movie-actions";
import PlayTrailer from "@/app/(info-page)/_components/play-trailler";
import { options } from "@/lib/configs/auth-options";

import { categoryTitleShow } from "@/lib/utils/categories";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { favoritesMovies } from "@/server/db/auth-schema";
import { and, eq } from "drizzle-orm";
import { Star, SunSnow, Tv } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${slug}?language=en-US'`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
    },
  );

  const tvShow = await response.json();
  const tvShowVideo = await fetch(
    `https://api.themoviedb.org/3/tv/${tvShow.id}/videos?language=en-US`,
    options,
  );

  const showVideo = await tvShowVideo.json();
  const videoKey: string =
    showVideo.results.filter(
      (result: { type: string }) => result.type === "Trailer",
    )[0]?.key ?? "";
  console.log(tvShow);

  const session = await auth.api.getSession({ headers: await headers() });

  const userId = session?.user?.id;

  let isFavorite = false;

  if (userId) {
    const favorite = await db
      .select()
      .from(favoritesMovies)
      .where(
        and(
          eq(favoritesMovies.movieId, tvShow.id),
          eq(favoritesMovies.userId, userId),
        ),
      )
      .limit(1);

    isFavorite = favorite.length > 0;
  }

  const categories = tvShow.genres
    .map((gen: { id: number; name: string }) => categoryTitleShow(gen.id))
    .splice(0, 2)
    .join(", ");

  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-full px-4">
        <div className="relative h-[520px] w-full">
          <div
            className="absolute size-full mask-r-from-10% mask-l-from-10% bg-cover bg-center opacity-60"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${tvShow.backdrop_path})`,
            }}
          ></div>

          <div className="flex size-full gap-10 p-4 pt-10">
            {/*  Poster */}
            <div className="relative hidden h-full w-1/4 lg:flex">
              <Image
                src={`https://image.tmdb.org/t/p/original${tvShow.poster_path}`}
                alt={`${tvShow.title} poster`}
                className="absolute inset-0 rounded-xl"
                fill
              />
            </div>

            {/* Details etc..  */}
            <div className="relative flex w-full flex-col gap-8 lg:w-3/4">
              <div>
                <h1 className="text-4xl font-semibold">{tvShow.name}</h1>
                <p className="text-foreground/80">{categories}</p>
              </div>

              <div className="flex items-center gap-2">
                <Tv />
                <p>
                  Number of episodes:{" "}
                  <strong>{tvShow.number_of_episodes}</strong>{" "}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <SunSnow />
                <p>
                  Number of seasons:{" "}
                  <strong>{tvShow.number_of_seasons}</strong>{" "}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Star />
                <p>{tvShow.vote_average.toFixed(1)}</p>
              </div>

              <p className="text-lg italic">``{tvShow.tagline ?? ""}``</p>

              <PlayTrailer videoKey={videoKey} />

              <MovieActions movie={tvShow} isFavorite={isFavorite} />
            </div>
          </div>
        </div>

        {}
        <div className="mt-2 flex flex-col gap-4">
          <div>
            <h3 className="text-foreground/60 text-2xl">Overview</h3>
            <p>{tvShow.overview}</p>
          </div>

          <h3 className="text-foreground/60 text-2xl">Casts</h3>
          <div></div>
        </div>
      </div>
    </div>
  );
}
