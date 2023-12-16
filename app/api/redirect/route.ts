import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = await request.json();
  cookies().set("tk", Math.random().toString());

  const to = new URL("/redirected", request.url);

  console.log("[API-ROUTE]", { to, res });

  if (res?.type === "redirect") {
    // return permanentRedirect("/redirected");
    // return redirect("/redirected");
    return redirect(to.href);
  }

  if (res?.type === "NextResponse.redirect") {
    return NextResponse.redirect(to);
  }

  if (res?.type === "NextResponse.rewrite") {
    //! NOTE: NextResponse.rewrite() was used in a app route handler, this is not currently supported. But docs says nothing about that
    return NextResponse.rewrite(to);
  }

  return Response.json({ res });
}
