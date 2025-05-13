import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath =
    path === "/" ||
    path === "/login" ||
    path === "/register" ||
    path.startsWith("/_next") ||
    path.startsWith("/api") ||
    path.startsWith("/communities") ||
    path.startsWith("/discover")

  // Get the authentication token from cookies
  const isAuthenticated = request.cookies.has("auth")

  // Redirect logic
  if (path === "/" && isAuthenticated) {
    // If user is on the home page and is authenticated, redirect to feed
    return NextResponse.redirect(new URL("/feed", request.url))
  }

  if (!isPublicPath && !isAuthenticated) {
    // If user is on a protected path and is not authenticated, redirect to home
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
