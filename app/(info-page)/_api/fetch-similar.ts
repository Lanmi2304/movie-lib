import { options } from "@/lib/configs/auth-options";

export async function fetchReviews(type: "tv" | "movie", id: string) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/similar`,
      options,
    );

    if (!response.ok) throw new Error("Error while fetching similar.");

    const json = await response.json().then((value) => value.results);

    return json;
  } catch (error) {
    console.log(error);
  }
}
