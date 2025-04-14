import { MovieCard } from "@/app/movie-results/_components/movie-card";
import { Movie } from "@/app/movie-results/page";

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
    <div className="bg-background/80 relative top-40 grid gap-4 rounded-xl p-4">
      <h1 className="text-2xl font-semibold">Popular</h1>
      <Carousel
        opts={{
          align: "start",
          loop: true,
          dragFree: true,
        }}
        className="flex max-w-[370px] items-center justify-center sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-[1300px]"
      >
        <CarouselContent>
          {movies.results.map((movie: Movie, index: number) => (
            <CarouselItem
              key={index}
              className="basis-1/3 md:basis-1/4 lg:basis-1/4 xl:basis-1/5"
            >
              <MovieCard movie={movie} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute -left-3" />
        <CarouselNext className="absolute -right-3" />
      </Carousel>
    </div>
  );
}
