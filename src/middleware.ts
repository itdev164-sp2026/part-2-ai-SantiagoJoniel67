import { type NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@/lib/supabase/middleware";

const protectedRoutes = ["/projects", "/settings"];
const authRoutes = ["/login"];
const publicRoutes = ["/"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const { supabase, response } = createMiddlewareClient(request);

  // Refresh the user's auth session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Determine if the route is protected or public
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isPublicRoute = publicRoutes.some((route) => pathname === route);

  // If user is authenticated
  if (user) {
    // Prevent authenticated users from accessing auth pages
    if (isAuthRoute) {
      return NextResponse.redirect(new URL("/projects", request.url));
    }
    return response;
  }

  // If user is not authenticated
  if (isProtectedRoute) {
    // Redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
