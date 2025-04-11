import Item from "../(hero)/_components/item";

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
};

export default async function Page(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { searchTerm, page } = await props.searchParams;
  console.log(searchTerm, page);
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=${page}`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
    }
  );

  const movieList = await response.json();
  console.log(123, movieList);

  if (!movieList.results.length) return <div>No results found</div>;

  return (
    <div className="grid gap-10">
      <div className="grid grid-cols-4 grid-rows-5 gap-4">
        {/* TODO: movie-card */}
        {movieList.results.map((movie: Movie) => (
          <p key={movie.id}>{movie.title}</p>
        ))}
      </div>
      <Item pageSize={20} totalCount={movieList.total_results} />
    </div>
  );
}
