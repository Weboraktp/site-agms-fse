"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";
import { espaceEtudiantUrl, site } from "@/lib/content";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="navbar container" aria-label="Navigation principale">
        <Link className="brand" href="/" onClick={() => setOpen(false)}>
          <span className="brand__mark" aria-hidden="true">
            <img src="/images/agms-logo.png" alt="" />
          </span>
          <span>
            <strong>
              <span className="brand__long">AGMS — Dispositif FSE+ PASS/LAS</span>
              <span className="brand__short">AGMS FSE+</span>
            </strong>
            <small>Dispositif FSE+</small>
          </span>
        </Link>

        <button
          className="nav-toggle"
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div className={`nav-links ${open ? "nav-links--open" : ""}`}>
          {site.nav.map((item) => (
            <Link
              className={pathname === item.href ? "active" : ""}
              href={item.href}
              key={item.href}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}

        <a className="nav-cta button" href={espaceEtudiantUrl} onClick={() => setOpen(false)}>
          <GraduationCap size={18} aria-hidden="true" />
          Accès étudiants
        </a>
        </div>
      </nav>
    </header>
  );
}
