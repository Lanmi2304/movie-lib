import { Search } from "./(hero)/_components/search";
import { Trending } from "./(hero)/_components/trending-carousel";

export default function Page() {
  return (
    <div className="flex w-full flex-col items-center justify-center py-20">
      <div className="absolute size-full bg-[url(/images/dp_hero.jpg)] mask-r-from-5% mask-l-from-5% bg-contain bg-no-repeat"></div>
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-4">
        <h1 className="to-foreground/60 from-foreground mt-20 w-full bg-gradient-to-r bg-clip-text text-2xl font-extrabold text-transparent lg:text-4xl">
          Millions of movies, TV shows and people to discover. Explore now.
        </h1>
        <Search className="text-white placeholder:text-white" />
      </div>

      <div className="mt-40 flex w-full flex-col gap-10">
        <Trending
          title="Popular Movies"
          path="https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
        />
        <Trending
          title="Trending series this week"
          path="https://api.themoviedb.org/3/trending/tv/week?language=en-US"
        />
      </div>
    </div>
  );
}
