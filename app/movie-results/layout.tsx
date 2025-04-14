import { Search } from "../(hero)/_components/search";

export default function MoviesListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto mt-12 flex w-full max-w-5xl flex-col items-center justify-center gap-10 p-4">
      <Search />
      {children}
    </div>
  );
}
