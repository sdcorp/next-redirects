import { cookies } from "next/headers";
import Link from "next/link";

export default function AnotherPage() {
  const tk = cookies().get("tk")?.value;
  return (
    <main>
      <h1>Another Page (RSC)</h1>
      <br />
      <p>Cookie [tk]: {String(tk)}</p>
      <br />
      <Link href="/">Go to home</Link>
    </main>
  );
}
