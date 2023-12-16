import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const tk = request.cookies.get("tk")?.value;
  const to = new URL("/", request.url);

  console.log("[MIDDLEWARE]", { tk, to }, request.url, request.nextUrl);

  // if (!tk) {
  //   console.log("redirect to home...");
  //   return NextResponse.redirect(to);
  // }

  const response = NextResponse.next();

  return response;
}

//  run only middleware only on "/another" page
export const config = {
  matcher: "/another",
};
