import { changeEligibility } from "@/app/admin/actions";
import { eligibilityStatuses, type EligibilityStatus } from "@/lib/content";

/** Suivi de l'éligibilité : trois boutons, celui du statut en cours est mis en avant. */
export function AdminEligibility({
  pathname,
  current
}: {
  pathname: string;
  current?: EligibilityStatus;
}) {
  const active = current ?? "a-etudier";

  return (
    <form action={changeEligibility} className="admin-eligibility" aria-label="Éligibilité">
      <input type="hidden" name="pathname" value={pathname} />
      {eligibilityStatuses.map((status) => (
        <button
          key={status.value}
          className={`admin-eligibility__button admin-eligibility__button--${status.value}${
            active === status.value ? " is-active" : ""
          }`}
          type="submit"
          name="eligibility"
          value={status.value}
          aria-pressed={active === status.value}
        >
          {status.label}
        </button>
      ))}
    </form>
  );
}
