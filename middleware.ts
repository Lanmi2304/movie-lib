import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "./server/auth";

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const url = new URL(request.url);

  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-path", url.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  runtime: "nodejs",
  matcher: [
    "/dashboard",
    "/favorites",
    "/movie-details/:path*",
    "/tv-show-details/:path*",
  ], // Apply middleware to specific routes
};
