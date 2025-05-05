import { Search } from "./(hero)/_components/search";
import { MediaCarousel } from "./(hero)/_components/media-carousel";

export default function Page() {
  return (
    <div className="flex w-full flex-col items-center justify-center py-20">
      <div className="absolute inset-0 mt-10 bg-[url(/images/dp_hero.jpg)] mask-r-from-5% mask-l-from-5% bg-auto bg-top bg-no-repeat md:bg-contain"></div>
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-4">
        <h1 className="to-foreground/60 from-foreground w-full bg-gradient-to-r bg-clip-text text-2xl font-extrabold text-transparent lg:mt-20 lg:text-4xl">
          Millions of movies, TV shows and people to discover. Explore now.
        </h1>
        <Search className="text-white placeholder:text-white" />
      </div>

      <div className="mt-10 flex w-full flex-col gap-4 lg:mt-40">
        <MediaCarousel
          title="Popular Movies"
          path="https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
        />
        <MediaCarousel
          title="Trending series this week"
          path="https://api.themoviedb.org/3/trending/tv/week?language=en-US"
        />
      </div>
    </div>
  );
}
