import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/** Accès à /admin : un mot de passe unique (variable ADMIN_PASSWORD sur Vercel), mémorisé 14 jours par cookie. */
const cookieName = "agms_admin";

function sessionToken(password: string) {
  return createHmac("sha256", password).update("agms-fse-admin-session").digest();
}

function sha256(value: string) {
  return createHash("sha256").update(value).digest();
}

export function isValidAdminPassword(input: string) {
  const password = process.env.ADMIN_PASSWORD;
  return Boolean(password) && timingSafeEqual(sha256(input), sha256(password!));
}

export async function isAdmin() {
  const password = process.env.ADMIN_PASSWORD;
  const token = (await cookies()).get(cookieName)?.value;
  if (!password || !token) return false;
  const expected = sessionToken(password);
  const received = Buffer.from(token, "hex");
  return received.length === expected.length && timingSafeEqual(received, expected);
}

export async function openAdminSession() {
  (await cookies()).set(cookieName, sessionToken(process.env.ADMIN_PASSWORD!).toString("hex"), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: 60 * 60 * 24 * 14
  });
}

export async function closeAdminSession() {
  (await cookies()).delete({ name: cookieName, path: "/admin" });
}
