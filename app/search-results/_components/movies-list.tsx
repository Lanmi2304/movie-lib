import { cn } from "@/lib/utils/cn";
import { Movie } from "../page";
import { MediaCard } from "@/components/shared/media-card";
import Pagination from "@/app/search-results/_components/pagination";

export async function MovieList({
  searchTerm,
  page,
}: {
  searchTerm: string | string[] | undefined;
  page: string | string[] | undefined;
}) {
  console.log(searchTerm);
  const response = await fetch(
    `https://api.themoviedb.org/3/search/multi?query=${searchTerm}&include_adult=false&language=en-US&page=${page}`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
    },
  );

  const movieList = await response.json();
  console.log(123, movieList);

  if (!movieList.results.length) return <div>No results found</div>;

  const rowsLg = Math.ceil(movieList.results.length / 4);
  const rowsSm = Math.ceil(movieList.results.length / 2);

  const resultsFor = `  ' ${searchTerm} '`;

  return (
    <div>
      <p className="text-muted-foreground mb-4">
        Search results for: &nbsp;{" "}
        <span className="text-foreground">{resultsFor.toUpperCase()}</span>
      </p>
      <div className="mb-10 grid w-full gap-10">
        <div
          className={cn(
            "grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4",
            ` grid-rows-[${rowsSm}] lg:grid-rows-[${rowsLg}]`,
          )}
        >
          {movieList.results.map((movie: Movie) => (
            <MediaCard
              key={movie.id}
              movie={movie}
              className="h-80 w-full lg:h-96 lg:w-60"
            />
          ))}
        </div>
        <Pagination pageSize={20} totalCount={movieList.total_results} />
      </div>
    </div>
  );
}
