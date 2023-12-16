"use client";

import { doRedirect } from "@/app/_actions";
import Link from "next/link";

function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export default function Home() {
  const API_URL = getBaseUrl() + "/api/redirect";

  return (
    <main>
      <h1>Redirects options</h1>
      <br />
      <p>
        Click a button to perform a redirect to the "/redirected" page. Use with
        Chrome Devtools / Network opened
      </p>
      <br />
      <p>
        Note: redirect is done on the server via API Route handler
        ("/api/redirect") and Server Action
      </p>
      <br />
      <Link href="/redirected">Go to redirected page</Link>
      <br />
      <br />
      <div style={{ display: "grid", gap: 16 }}>
        <div>
          <button
            type="button"
            onClick={async () => {
              await fetch(API_URL, {
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
              void fetch(API_URL, {
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
              void fetch(API_URL, {
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
