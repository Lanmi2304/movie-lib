import { Search } from "../(hero)/_components/search";

export default function MoviesListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-[700px]w-full mx-auto flex max-w-5xl flex-col items-center justify-center gap-10 p-4">
      <Search />
      {children}
    </div>
  );
}
