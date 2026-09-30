"use client";

import { Trash2 } from "lucide-react";
import { removePreinscription } from "@/app/admin/actions";

export function AdminDeleteButton({ pathname, name }: { pathname: string; name: string }) {
  return (
    <form
      action={removePreinscription}
      onSubmit={(event) => {
        if (!window.confirm(`Supprimer définitivement la pré-inscription de ${name} ?`)) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="pathname" value={pathname} />
      <button className="admin-delete" type="submit" aria-label={`Supprimer la pré-inscription de ${name}`}>
        <Trash2 size={16} aria-hidden="true" />
      </button>
    </form>
  );
}
