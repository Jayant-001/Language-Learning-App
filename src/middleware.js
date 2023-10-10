import { NextResponse } from "next/server";

export function middleware(request) {

    const path = request.nextUrl.pathname;
    const authPaths = path === "/auth/login" || path === "/auth/signup" ;
    const privatePaths = path.endsWith("/test") || path.startsWith("/user") || path === "/add-question" ;
    const token = request.cookies.get("token")?.value || "";

    if (authPaths && token) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    if (privatePaths && !token) {
        return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
    }
}

export const config = {
    matcher: ["/", "/user", "/:path/:path/test", "/auth/login", "/auth/signup", "/add-question"],
};
