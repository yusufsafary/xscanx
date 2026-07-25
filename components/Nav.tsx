"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { useState } from "react";

const links = [
  { href: "/", label: "Scanner" },
  { href: "/about", label: "About" },
  { href: "/how-to", label: "How To" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full border-b-2 border-green-ink bg-cream sticky top-0 z-50" style={{ boxShadow: "0 2px 0 #2a5e2a" }}>
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
        <Logo size={40} />

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-3 py-1.5 font-mono text-sm font-semibold rounded-sm transition-all duration-100 border-2 ${
                pathname === l.href
                  ? "bg-green-ink text-cream border-green-ink"
                  : "text-green-ink border-transparent hover:border-green-ink hover:bg-green-pale"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="sm:hidden flex flex-col gap-1.5 p-2 border-2 border-green-ink rounded-sm doodle-btn bg-cream"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-green-ink transition-all duration-200 ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-green-ink transition-all duration-200 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-green-ink transition-all duration-200 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden border-t-2 border-green-ink bg-cream px-4 pb-4 flex flex-col gap-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`px-3 py-2 font-mono text-sm font-semibold rounded-sm border-2 text-center ${
                pathname === l.href
                  ? "bg-green-ink text-cream border-green-ink"
                  : "text-green-ink border-green-ink hover:bg-green-pale"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
