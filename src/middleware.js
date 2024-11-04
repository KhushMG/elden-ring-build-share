// middleware.js
import { NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

// Define public routes that don't require authentication
const isPublicRoute = (pathname) => {
  return ["/", "/builds", "/sign-in", "/sign-up"].some((route) => pathname.startsWith(route));
};

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const pathname = req.nextUrl.pathname;

  // If the route is not public and there’s no session, redirect to sign-in
  if (!isPublicRoute(pathname) && !session) {
    const redirectUrl = new URL("/sign-in", req.url);
    redirectUrl.searchParams.set("redirect", pathname); // Optional: redirect back after sign-in
    return NextResponse.redirect(redirectUrl);
  }

  // Allow request to proceed if it's a public route or user is authenticated
  return res;
}

export const config = {
  matcher: [
    // Match all routes, excluding Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Include all API routes
    "/(api|trpc)(.*)",
  ],
};
