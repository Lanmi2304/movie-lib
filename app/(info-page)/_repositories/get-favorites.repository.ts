import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { favoritesMovies } from "@/server/db/auth-schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export async function getFavoritesList() {
  try {
    const userId =
      (await auth.api
        .getSession({ headers: await headers() })
        .then((value) => value?.user.id)) ?? "";
    const list = await db
      .select()
      .from(favoritesMovies)
      .where(eq(favoritesMovies.userId, userId));

    console.log(list);
    return list;
  } catch (error) {
    console.log(error);
  }
}
