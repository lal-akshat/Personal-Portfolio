"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/", label: "Home", index: "01" },
  { href: "/experience", label: "Experience", index: "02" },
  { href: "/projects", label: "Projects", index: "03" },
  { href: "/contact", label: "Contact", index: "04" },
];

export default function Nav() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Sync local state with the theme the init script already applied.
  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    if (current === "dark" || current === "light") setTheme(current);
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  return (
    <aside className="sidebar">
      <div className="brand">
        <Link href="/" className="brand-mark">
          AL
        </Link>
      </div>

      <nav className="nav" aria-label="Main">
        {LINKS.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-item${active ? " is-active" : ""}`}
            >
              <span className="nav-index">{link.index}</span>
              <span className="nav-label">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle color theme"
        >
          <span className="theme-toggle-dot" />
          <span className="theme-toggle-label">{theme}</span>
        </button>

        <div className="socials">
          {/* TODO: swap these for your real profiles */}
          <a href="https://github.com/YOUR-USERNAME" target="_blank" rel="noreferrer">
            gh
          </a>
          <a href="https://linkedin.com/in/YOUR-USERNAME" target="_blank" rel="noreferrer">
            in
          </a>
        </div>
      </div>
    </aside>
  );
}