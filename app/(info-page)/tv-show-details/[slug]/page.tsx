import { MovieActions } from "@/app/(info-page)/_components/movie-actions";
import PlayTrailer from "@/app/(info-page)/_components/play-trailler";
import { categoryTitleShow } from "@/lib/utils/categories";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { favoritesMovies, reviews } from "@/server/db/auth-schema";
import { and, eq } from "drizzle-orm";
import { Star, SunSnow, Tv } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import { fetchProviders } from "../../_api/get-providers";
import { fetchTvShowDetails, fetchTvShowTrailer } from "../_api/fetch-tv-show";
import { fetchCasts } from "../../_api/fetch-credits";
import { CastsCarousel } from "../../_components/casts-carousel";
import { Reviews } from "../../_components/reviews";
import { MediaCarousel } from "@/app/(hero)/_components/media-carousel";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tvShow = await fetchTvShowDetails(slug);
  const casts = await fetchCasts("tv", slug);
  const videoKey = await fetchTvShowTrailer(slug);
  const tvProviders = await fetchProviders("tv", tvShow.id);

  const { RS } = tvProviders.results;

  const session = await auth.api.getSession({ headers: await headers() });

  const userId = session?.user?.id;

  let isFavorite = false;
  let isRated = false;

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

    const rated = await db
      .select()
      .from(reviews)
      .where(and(eq(reviews.movieId, tvShow.id), eq(reviews.userId, userId)))
      .limit(1);

    isFavorite = favorite.length > 0;
    isRated = rated.length > 0;
  }

  const categories = tvShow.genres
    .map((gen: { id: number; name: string }) => categoryTitleShow(gen.id))
    .splice(0, 2)
    .join(", ");

  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-full lg:px-4">
        <div className="relative block h-[500px] w-full lg:hidden">
          <Image
            src={`https://image.tmdb.org/t/p/original${tvShow.poster_path}`}
            alt={`${tvShow.title} poster`}
            className="absolute inset-0 rounded-b-xl object-cover object-center"
            fill
          />
        </div>
        <div className="relative h-[520px] w-full">
          <div
            className="absolute size-full mask-r-from-10% mask-b-from-80% mask-l-from-10% bg-cover bg-center opacity-60"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${tvShow.backdrop_path})`,
            }}
          ></div>

          <div className="flex size-full gap-10 pt-10 lg:p-4">
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
            <div className="relative flex w-full flex-col justify-between lg:w-3/4">
              <div>
                <h1 className="text-4xl font-semibold">{tvShow.name}</h1>
                <p className="text-foreground/80">{categories}</p>
              </div>

              <div className="flex items-center gap-2">
                <Tv className="text-foreground/70" />
                <p className="text-foreground/70">
                  Number of episodes:{" "}
                  <strong className="text-foreground">
                    {tvShow.number_of_episodes}
                  </strong>{" "}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <SunSnow className="text-foreground/70" />
                <p className="text-foreground/70">
                  Number of seasons:{" "}
                  <strong>{tvShow.number_of_seasons}</strong>{" "}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Star className="text-foreground/70" />
                <p>{tvShow.vote_average.toFixed(1)}</p>
              </div>

              {tvShow.tagline && (
                <p className="text-lg italic">``{tvShow.tagline ?? ""}``</p>
              )}

              <PlayTrailer videoKey={videoKey} />

              <MovieActions
                movie={tvShow}
                isFavorite={isFavorite}
                isRated={isRated}
              />

              <div>
                <h3 className="text-foreground/70">
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
                  <p className="text-red-400">Unavailable</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 lg:mt-2">
          <div>
            <h3 className="text-foreground/70 text-2xl">Overview</h3>
            <p>{tvShow.overview}</p>
          </div>

          <h3 className="text-foreground/70 text-2xl">Casts</h3>
          <CastsCarousel casts={casts} />

          <Reviews type={"tv"} id={slug} />

          <MediaCarousel
            title={`Similar for '${tvShow.name}'`}
            description="📘NOTE: This method only looks for other items based on genres and plot keywords. As such, the results found here are not always going to be 💯. Use it with that in mind."
            path={`https://api.themoviedb.org/3/tv/${slug}/similar`}
            type="tv-show-details"
          />
        </div>
      </div>
    </div>
  );
}
