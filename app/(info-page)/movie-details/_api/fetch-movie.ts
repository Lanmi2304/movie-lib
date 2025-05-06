import { options } from "../../../../lib/configs/auth-options";

export async function fetchMovieDetails(id: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    options,
  );

  if (!res.ok) throw new Error("Failed to fetch movie details");
  const movie = await res.json();
  return movie;
}

export async function fetchMovieTrailer(id: string) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
    options,
  );

  if (!response.ok) return "";

  const json = await response.json();
  return (
    json.results.find((r: { type: string }) => r.type === "Trailer")?.key ?? ""
  );
}
