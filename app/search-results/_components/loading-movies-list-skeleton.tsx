import { Skeleton } from "@/components/ui/skeleton";

export function MovieListSkeleton() {
  return (
    <div className="grid grid-cols-2 grid-rows-4 gap-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 20 }).map((_, idx) => (
        <Skeleton key={idx} className="h-80 w-full lg:h-96 lg:w-60" />
      ))}
    </div>
  );
}
