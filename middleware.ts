import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // const tk = request.cookies.get("tk")?.value;

  // if (!tk) {
  //   const to = new URL("/", request.url);
  //   to.searchParams.set("from", request.nextUrl.pathname);

  //   console.log("redirecting...", [
  //     tk,
  //     ["request.url", request.url],
  //     ["to.href", to.href],
  //   ]);

  //   return NextResponse.redirect(to);
  // }

  const response = NextResponse.next();
  console.log("[MIDDLEWARE]", [
    ["request.url", request.url],
    ["request.nextUrl.href", request.nextUrl.href],
    ["request.nextUrl.origin", request.nextUrl.origin],
    ["request.nextUrl.pathname", request.nextUrl.pathname],
    ["response.url", response.url],
  ]);

  return response;
}

// run only middleware only on "/redirected" page
export const config = {
  matcher: "/redirected",
};
