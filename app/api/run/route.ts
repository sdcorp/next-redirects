import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = await request.json();
  cookies().set("tk", Math.random().toString());

  const to = new URL("/another", request.url);

  console.log("[API-ROUTE]", { to, res });

  if (res?.type === "redirect") {
    // return permanentRedirect("/another");
    // return redirect("/another");
    return redirect(to.href);
  }

  if (res?.type === "NextResponse.redirect") {
    return NextResponse.redirect(to);
  }

  if (res?.type === "NextResponse.rewrite") {
    //! NOTE: NextResponse.rewrite() was used in a app route handler, this is not currently supported.
    return NextResponse.rewrite(to);
  }

  return Response.json({ res });
}
