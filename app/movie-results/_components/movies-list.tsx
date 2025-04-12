import Item from "@/app/(hero)/_components/item";
import { MovieCard } from "./movie-card";
import { cn } from "@/lib/utils/cn";

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export async function MovieList({
  searchTerm,
  page,
}: {
  searchTerm: string | string[] | undefined;
  page: string | string[] | undefined;
}) {
  console.log(searchTerm);
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=${page}`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
    },
  );

  const movieList = await response.json();

  if (!movieList.results.length) return <div>No results found</div>;

  const rowsLg = Math.ceil(movieList.results.length / 4);
  const rowsSm = Math.ceil(movieList.results.length / 2);

  return (
    <div className="mb-10 grid gap-10">
      <div
        className={cn(
          "grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4",
          ` grid-rows-[${rowsSm}] lg:grid-rows-[${rowsLg}]`,
        )}
      >
        {movieList.results.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <Item pageSize={20} totalCount={movieList.total_results} />
    </div>
  );
}
