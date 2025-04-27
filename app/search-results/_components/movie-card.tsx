import { categoryTitle } from "@/lib/utils/categories";
import { Movie } from "../page";
import { cn } from "@/lib/utils/cn";
import { Star } from "lucide-react";
import Link from "next/link";

export function MovieCard({
  movie,
  className,
}: {
  movie: Movie;
  className?: string;
}) {
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
    : "/images/posterless.jpg";

  const categories =
    movie.genre_ids !== undefined
      ? movie.genre_ids
          .map((id) => categoryTitle(id))
          .splice(0, 2)
          .join(", ")
      : "Category";

  const mediaType = movie.media_type === "tv";
  return (
    <Link
      href={
        !mediaType ? `movie-details/${movie.id}` : `tv-show-details/${movie.id}`
      }
    >
      <div className="group/card">
        <div
          className={cn(
            "card relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-md bg-cover bg-center p-4 shadow-xl",
            className,
          )}
          style={{
            backgroundImage: `url(${poster})`,
          }}
        >
          <div className="absolute top-0 left-0 h-full w-full opacity-80 transition duration-300 group-hover/card:bg-black"></div>
          <div className="z-10 hidden flex-row items-center space-x-4 group-hover/card:flex">
            <div className="flex flex-col">
              <p className="relative z-10 text-base font-normal text-gray-50">
                {categories}
              </p>
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <Star className="size-4" />
                {movie.vote_average ? movie.vote_average.toFixed(1) : ""}
              </div>
            </div>
          </div>
          <div className="text content hidden group-hover/card:block">
            <h1 className="relative z-10 text-xl font-bold text-gray-50 md:text-2xl">
              {movie.title}
            </h1>
            <p className="relative z-10 my-4 line-clamp-3 text-sm font-normal text-gray-50">
              {movie.overview}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
