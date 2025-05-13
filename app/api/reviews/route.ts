import { options } from "@/lib/configs/auth-options";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const type = url.searchParams.get("type");
    const id = url.searchParams.get("id");
    const page = url.searchParams.get("page");

    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/reviews?language=en-US&page=${page}`,
      options,
    );

    if (!response.ok) throw new Error("Error while fetching reviews.");

    const json = await response.json().then();

    return Response.json(json);
  } catch (error) {
    console.log(error);
  }
}
