"use server";

import { authActionClient } from "@/lib/safe-action";
import { searchSchema } from "../_schemas/search.schema";

export const searchAction = authActionClient
  .metadata({ actionName: "searchAction" })
  .schema(searchSchema)
  .action(async ({ parsedInput: { term } }) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${term}&include_adult=false&language=en-US&page=1`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
      },
    );

    if (!res.ok)
      return {
        message: "Error while searching for a movie",
      };

    console.log(await res.json());
  });
