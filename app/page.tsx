"use client";

import { doRedirect } from "@/app/_actions";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Redirects options ("use client")</h1>
      <br />
      <p>It has to set cookie and redirect to "/another" page</p>
      <br />
      <Link href="/another">Go to another page</Link>
      <br />
      <br />
      <div style={{ display: "grid", gap: 16 }}>
        <div>
          <button
            type="button"
            onClick={() => {
              void fetch("/api/run", {
                method: "POST",
                body: JSON.stringify({ type: "redirect" }),
              });
            }}
          >
            Redirect (API Route with redirect)
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              void fetch("/api/run", {
                method: "POST",
                body: JSON.stringify({ type: "NextResponse.redirect" }),
              });
            }}
          >
            Redirect (API Route with NextResponse.redirect)
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              void fetch("/api/run", {
                method: "POST",
                body: JSON.stringify({ type: "NextResponse.rewrite" }),
              }).then((r) => {
                if (r.status >= 500) {
                  alert(
                    JSON.stringify(
                      {
                        status: r.status,
                        reason:
                          "Error: NextResponse.rewrite() was used in a app route handler, this is not currently supported. Please remove the invocation to continue.",
                      },
                      null,
                      2
                    )
                  );
                }
                return r;
              });
            }}
          >
            Redirect (API Route with NextResponse.rewrite) [500]
          </button>
        </div>
        <div>
          <form action={doRedirect}>
            <button type="submit">Redirect (Server Action)</button>
          </form>
        </div>
      </div>
    </main>
  );
}
