import { categoryTitle } from "@/lib/utils/categories";
import { Clock } from "lucide-react";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${slug}?language=en-US`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
    },
  );

  const movie = await response.json();
  console.log(movie);

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
            <div className="flex flex-col gap-8">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
