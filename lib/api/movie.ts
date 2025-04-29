import { options } from "../configs/auth-options";

export async function fetchMovieDetails(id: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    options,
  );

  if (!res.ok) throw new Error("Failed to fetch movie details");
  return res.json();
}

export async function fetchMovieTrailer(id: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
    options,
  );

  if (!res.ok) return "";

  const json = await res.json();
  return (
    json.results.find((r: { type: string }) => r.type === "Trailer")?.key ?? ""
  );
}
