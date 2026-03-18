import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /iyel but not /iyel/login
  if (pathname.startsWith("/iyel") && pathname !== "/iyel/login") {
    const session = request.cookies.get("admin_session");

    if (!session || session.value !== "authenticated") {
      const loginUrl = new URL("/iyel/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Block /admin entirely — return 404
  if (pathname.startsWith("/admin")) {
    return NextResponse.rewrite(new URL("/_not-found", request.url));
  }

  // Protect API write routes (except login/logout)
  if (
    pathname.startsWith("/api/") &&
    !pathname.startsWith("/api/admin/") &&
    request.method !== "GET"
  ) {
    const session = request.cookies.get("admin_session");

    if (!session || session.value !== "authenticated") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/iyel/:path*", "/admin/:path*", "/api/:path*"],
};
