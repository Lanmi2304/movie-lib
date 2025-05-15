import { getFavoritesList } from "@/app/(info-page)/_repositories/get-favorites.repository";
import { MediaCard } from "@/components/shared/media-card";

import { Telescope } from "lucide-react";

export default async function Favorites() {
  const favorites = await getFavoritesList();

  return (
    <div className="flex flex-col py-10">
      <h1 className="text-2xl">Favorites</h1>

      {/* If list is empty render the message  */}
      {favorites && favorites.length === 0 && (
        <div className="flex h-screen items-center justify-center">
          <div className="relative -top-20 flex flex-col items-center text-xl font-semibold">
            <Telescope className="size-10" />
            <p className="text-center">
              Looks like you don&apos;t have favorites movies in your list..🫤
            </p>
            <p className="mt-4">Feel free to add some</p>
          </div>
        </div>
      )}

      {favorites && favorites.length > 0 && (
        <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {favorites?.map((movie) => (
            <MediaCard
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
