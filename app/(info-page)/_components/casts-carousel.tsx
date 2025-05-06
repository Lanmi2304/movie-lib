import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CastsCarousel({
  casts,
}: {
  casts: { name: string; profile_path: string; character: string }[];
}) {
  return (
    <div className="w-full">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {casts.map((cast, index) => (
            <CarouselItem
              key={index}
              className="flex basis-1/3 items-center justify-center lg:basis-1/5"
            >
              <div className="p-1">
                <div className="flex flex-col items-center justify-center gap-4">
                  <Avatar className="size-16 lg:size-22">
                    <AvatarImage
                      src={`https://image.tmdb.org/t/p/original${cast.profile_path}`}
                      alt={cast.name}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <div className="flex h-22 flex-col">
                    <p className="text-center">{cast.character}</p>
                    <p className="text-foreground/70 text-center text-sm">
                      {cast.name}
                    </p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-background absolute -left-1 cursor-pointer" />
        <CarouselNext className="bg-background absolute -right-1 cursor-pointer" />
      </Carousel>
    </div>
  );
}
