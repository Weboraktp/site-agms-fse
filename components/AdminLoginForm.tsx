"use client";

import { useActionState } from "react";
import { LockKeyhole } from "lucide-react";
import { login, type LoginState } from "@/app/admin/actions";

const initialState: LoginState = {};

export function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form className="contact-form admin-login" action={formAction}>
      {state.error ? (
        <p className="form-error" role="alert">
          {state.error}
        </p>
      ) : null}
      <label>
        Mot de passe
        <input name="password" type="password" autoComplete="current-password" required autoFocus />
      </label>
      <button className="button button--primary form-submit" type="submit" disabled={pending}>
        <LockKeyhole size={18} aria-hidden="true" />
        {pending ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}
