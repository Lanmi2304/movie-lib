import { options } from "@/lib/configs/auth-options";

export async function getMovieProviders(movieId: number) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/watch/providers`,
      options,
    );

    if (!res.ok) throw new Error("Failed to fetch movie providers");
    return res.json();
  } catch (error) {
    console.log(error);
  }
}
