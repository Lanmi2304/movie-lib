import { getFavoritesList } from "@/app/movie-details/[slug]/_repositories/get-favorites.repository";
import { MovieCard } from "@/app/search-results/_components/movie-card";
import { Telescope } from "lucide-react";

export default async function Favorites() {
  const favorites = await getFavoritesList();
  console.log(123, favorites);

  return (
    <div className="flex size-full flex-col py-10">
      <h1 className="text-2xl">Favorites</h1>

      {/* If list is empty render the message  */}
      {favorites?.length === 0 && (
        <div className="flex size-full items-center justify-center">
          <div className="flex flex-col items-center text-xl font-semibold">
            <Telescope className="size-10" />
            <p>
              Looks like you don&apos;t have favorites movies in your list..🫤
            </p>
            <p>Feel free to add some</p>
          </div>
        </div>
      )}

      {favorites?.length && favorites.length > 0 && (
        <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {favorites?.map((movie) => (
            <MovieCard
              key={movie.id}
              className="h-80 lg:h-96"
              movie={{
                poster_path: movie.posterPath ?? "",
                vote_average: movie.voteAverage,
                id: movie.movieId,
                title: movie.title,
                media_type: movie.mediaType,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
