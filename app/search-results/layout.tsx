import { Search } from "@/components/shared/search";

export default function MoviesListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto mt-12 flex w-full max-w-5xl flex-col gap-10 p-4">
      <Search />
      {children}
    </div>
  );
}
