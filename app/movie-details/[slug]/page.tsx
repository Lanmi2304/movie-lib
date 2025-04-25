import { categoryTitle } from "@/lib/utils/categories";
import { Clock, Star } from "lucide-react";
import Image from "next/image";
import PlayTrailer from "./_components/play-trailler";

// TODO: refactor this
export const options = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  },
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${slug}?language=en-US`,
    options,
  );

  const movie = await response.json();
  const movieVideoResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`,
    options,
  );
  // console.log(movie);
  const movieVideo = await movieVideoResponse.json();
  const videoKey: string =
    movieVideo.results.filter(
      (result: { type: string }) => result.type === "Trailer",
    )[0]?.key ?? "";

  const categories = movie.genres
    .map((gen: { id: number; name: string }) => categoryTitle(gen.id))
    .splice(0, 2)
    .join(", ");

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
            <div className="flex w-3/4 flex-col gap-8">
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

              <PlayTrailer videoKey={videoKey} />

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
