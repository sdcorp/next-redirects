"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function doRedirect() {
  cookies().set("tk", Math.random().toString());
  redirect("/redirected");
}

export async function deleteCookie() {
  cookies().delete("tk");
}
