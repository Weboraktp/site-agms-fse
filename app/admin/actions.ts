"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { closeAdminSession, isAdmin, isValidAdminPassword, openAdminSession } from "@/lib/admin-auth";
import { deletePreinscription, setPreinscriptionEligibility } from "@/lib/preinscription-server";

export type LoginState = { error?: string };

export async function login(_previous: LoginState, formData: FormData): Promise<LoginState> {
  if (!isValidAdminPassword(String(formData.get("password") ?? ""))) {
    return { error: "Mot de passe incorrect." };
  }
  await openAdminSession();
  redirect("/admin");
}

export async function logout() {
  await closeAdminSession();
  redirect("/admin");
}

export async function changeEligibility(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin");
  await setPreinscriptionEligibility(
    String(formData.get("pathname") ?? ""),
    String(formData.get("eligibility") ?? "")
  );
  revalidatePath("/admin");
}

export async function removePreinscription(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin");
  await deletePreinscription(String(formData.get("pathname") ?? ""));
  revalidatePath("/admin");
}
