import { Suspense } from "react";
import { MovieList } from "./_components/movies-list";
import { MovieListSkeleton } from "./_components/loading-movies-list-skeleton";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

// export async function generateMetadata(props: {
//   params: Params;
//   searchParams: SearchParams;
// }) {
//   const params = await props.params;
//   const searchParams = await props.searchParams;
//   const slug = params.slug;
//   const query = searchParams.query;
// }

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  name: string;
  original_name: string;
  media_type: string;
};

export default async function Page(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { searchTerm, page } = await props.searchParams;

  return (
    <Suspense fallback={<MovieListSkeleton />}>
      <MovieList searchTerm={searchTerm} page={page} />
    </Suspense>
  );
}
