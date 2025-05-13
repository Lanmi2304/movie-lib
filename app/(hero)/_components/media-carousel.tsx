import { Movie } from "@/app/search-results/page";
import { MediaCard } from "@/components/shared/media-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export async function MediaCarousel({
  title,
  type,
  description,
  path,
}: {
  title: string;
  description?: string;
  type?: "tv-show-details" | "movie-details";
  path: string;
}) {
  const response = await fetch(path, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  });

  const movies = await response.json();

  return (
    <div className="relative w-full rounded-xl bg-black/70 p-4">
      <h3 className="my-2 text-xl font-semibold lg:text-3xl">{title}</h3>
      {description && (
        <p className="text-foreground/70 py-2 text-sm">{description}</p>
      )}
      {movies.results.length === 0 ? (
        <p>Not found :(</p>
      ) : (
        <Carousel className="w-full" opts={{ loop: true, dragFree: true }}>
          <CarouselContent>
            {movies.results.map((movie: Movie) => (
              <CarouselItem
                key={crypto.randomUUID()}
                className="mx-0 basis-1/2 pl-1 sm:basis-1/3 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
              >
                <div className="p-1">
                  <MediaCard
                    type={type}
                    movie={movie}
                    className="h-80 w-full lg:h-96"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-background absolute -left-3 cursor-pointer" />
          <CarouselNext className="bg-background absolute -right-3 cursor-pointer" />
        </Carousel>
      )}
    </div>
  );
}
