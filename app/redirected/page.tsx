import { cookies } from "next/headers";
import Link from "next/link";

export default function RedirectedPage() {
  const tk = cookies().get("tk")?.value;
  return (
    <main>
      <h1>Redirected Page (RSC)</h1>
      <br />
      <p>Cookie [tk]: {String(tk)}</p>
      <br />
      <Link href="/">Go to home</Link>
    </main>
  );
}
