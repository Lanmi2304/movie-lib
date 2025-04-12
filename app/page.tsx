import { Search } from "./(hero)/_components/search";

export default function Page() {
  return (
    <div className="relative flex h-[100dvh] w-full flex-col items-center justify-center p-4">
      <div className="absolute size-full bg-[url(/images/dp_hero.jpg)] mask-r-from-5% mask-l-from-5% bg-cover bg-center"></div>

      <div className="grid max-w-3xl gap-4">
        <h1 className="to-muted from-foreground w-full bg-gradient-to-r bg-clip-text text-4xl font-extrabold text-transparent">
          Millions of movies, TV shows and people to discover. Explore now.
        </h1>
        <Search className="text-white placeholder:text-white" />
      </div>
    </div>
  );
}
