import { MovieCard } from "@/app/search-results/_components/movie-card";
import { Movie } from "@/app/search-results/page";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export async function Trending() {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
    },
  );

  const movies = await response.json();

  return (
    <div className="w-full rounded-xl">
      <h3 className="text-3xl font-semibold">Popular</h3>
      {movies.length === 0 ? (
        <p>No movies found</p>
      ) : (
        <Carousel
          className="w-full bg-black/80"
          opts={{ loop: true, dragFree: true }}
        >
          <CarouselContent className="relative -ml-1 flex">
            {movies.results.map((movie: Movie) => (
              <CarouselItem
                key={crypto.randomUUID()}
                className="mx-0 basis-1/2 pl-1 sm:basis-1/3 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
              >
                <div className="p-1">
                  <MovieCard movie={movie} className="h-96 lg:w-full" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute -left-3" />
          <CarouselNext className="absolute -right-3" />
        </Carousel>
      )}
    </div>
  );
}
