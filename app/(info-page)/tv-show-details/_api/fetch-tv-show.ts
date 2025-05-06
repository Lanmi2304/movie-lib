import { options } from "@/lib/configs/auth-options";

export async function fetchTvShowDetails(id: string) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US'`,
      options,
    );

    if (!response.ok) throw new Error("Failed to fetch movie details");

    const tvShow = await response.json();
    return tvShow;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchTvShowTrailer(id: string) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`,
      options,
    );

    const json = await response.json();
    return (
      json.results.find((r: { type: string }) => r.type === "Trailer")?.key ??
      ""
    );
  } catch (error) {
    console.log(error);
  }
}
