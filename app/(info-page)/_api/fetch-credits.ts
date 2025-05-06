import { options } from "@/lib/configs/auth-options";

export async function fetchCasts(type: "tv" | "movie", id: string) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/credits?language=en-US`,
      options,
    );

    if (!response.ok) throw new Error("Failed to fetch casts.");

    const json = await response.json().then((value) => value.cast);

    return json;
  } catch (error) {
    console.log(error);
  }
}
