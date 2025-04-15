import { categoryTitle } from "@/lib/utils/categories";
import { Clock, SunSnow, Tv } from "lucide-react";
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
  console.log(tvShow);

  const categories = tvShow.genres
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
            <div className="flex flex-col gap-8">
              <div>
                <h1 className="text-4xl font-semibold">{tvShow.name}</h1>
                <p className="text-foreground/80">{categories}</p>
              </div>

              <div className="flex flex-col gap-2">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
