import { createNEMO, type MiddlewareConfig } from "@rescale/nemo";
import { headers } from "next/headers";
import { auth } from "./server/auth";
import { NextRequest, NextResponse } from "next/server";

const authMiddleware = async (request: NextRequest) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  return NextResponse.next();
};

const getPathMiddleware = async (request: NextRequest) => {
  const url = new URL(request.url);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-path", url.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
};

const middlewares = {
  "/favorites": [async (request) => authMiddleware(request)],
  "/dashboard": [async (request) => authMiddleware(request)], // Do I need this?
  "/movie-details/:path*": [async (request) => getPathMiddleware(request)],
} satisfies MiddlewareConfig;

export const middleware = createNEMO(middlewares);

export const config = {
  runtime: "nodejs",
  matcher: ["/((?!_next/|_static|_vercel|[\\w-]+\\.\\w+).*)"],
};
