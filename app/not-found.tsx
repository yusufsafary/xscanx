import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <span className="font-heading text-8xl text-green-light">404</span>
        <h1 className="font-heading text-xl text-green-ink">Page not found</h1>
        <p className="font-mono text-sm text-ink-muted max-w-xs">
          This page does not exist in our database. Try scanning a username instead.
        </p>
      </div>

      {/* Doodle decoration */}
      <svg width="120" height="80" viewBox="0 0 120 80" fill="none" className="opacity-40">
        <path d="M10 40 Q30 10 60 40 Q90 70 110 40" stroke="#2a5e2a" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <circle cx="60" cy="40" r="6" fill="#a8d4a8" stroke="#2a5e2a" strokeWidth="2"/>
        <path d="M57 37 L63 43 M57 43 L63 37" stroke="#2a5e2a" strokeWidth="2" strokeLinecap="round"/>
      </svg>

      <Link
        href="/"
        className="doodle-btn bg-green-light text-green-ink font-heading text-sm px-6 py-3 uppercase tracking-widest"
      >
        Back to scanner
      </Link>
    </div>
  );
}
