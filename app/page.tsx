import { Container } from "@/components/shared/container";
import { Search } from "./(hero)/_components/search";
import { Trending } from "./(hero)/_components/trending-carousel";

export default function Page() {
  return (
    <div className="relative flex size-full flex-col items-center justify-center">
      <div className="absolute size-full bg-[url(/images/dp_hero.jpg)] mask-r-from-5% mask-l-from-5% bg-cover bg-center"></div>
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-4">
        <h1 className="to-foreground/60 from-foreground w-full bg-gradient-to-r bg-clip-text text-2xl font-extrabold text-transparent lg:text-4xl">
          Millions of movies, TV shows and people to discover. Explore now.
        </h1>
        <Search className="text-white placeholder:text-white" />
      </div>
      <Container className="m-0">
        <Trending />
      </Container>
    </div>
  );
}
