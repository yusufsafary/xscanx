"use client";

import { useEffect, useState, FormEvent, useTransition } from "react";
import { useRouter } from "next/navigation";
import { isValidUsername, normalizeUsername } from "@/lib/scanner";

const RECENT_SCANS_KEY = "xscanx:recent-scans";
const FEATURED_SCANS = ["cryptoking", "moondegen", "nftwhale", "defi_bro", "rugninja", "alphamoon"];

export default function HomePage() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [recentScans, setRecentScans] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(RECENT_SCANS_KEY) ?? "[]");
      if (Array.isArray(stored)) setRecentScans(stored.filter((value): value is string => typeof value === "string").slice(0, 6));
    } catch {
      localStorage.removeItem(RECENT_SCANS_KEY);
    }
  }, []);

  function rememberScan(clean: string) {
    const next = [clean, ...recentScans.filter((item) => item !== clean)].slice(0, 6);
    setRecentScans(next);
    localStorage.setItem(RECENT_SCANS_KEY, JSON.stringify(next));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const clean = normalizeUsername(username);
    if (!clean) {
      setError("Please enter an X username.");
      return;
    }
    if (!isValidUsername(clean)) {
      setError("That doesn't look like a valid X username.");
      return;
    }
    setError("");
    rememberScan(clean);
    startTransition(() => router.push(`/scan/${clean}`));
  }

  function openScan(value: string) {
    rememberScan(value);
    startTransition(() => router.push(`/scan/${value}`));
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-start px-4 py-8 sm:py-14">
      <div className="w-full max-w-lg flex flex-col gap-7">

        {/* Social / Partner bar */}
        <div className="flex items-center justify-between flex-wrap gap-3 doodle-border-light bg-cream-dark px-4 py-2.5">
          {/* Official X account */}
          <a
            href="https://x.com/xscanxapp"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 group"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0"
            >
              <path
                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"
                fill="#2a5e2a"
              />
            </svg>
            <span className="font-mono text-xs text-green-ink font-semibold group-hover:underline underline-offset-2">
              @xscanxapp
            </span>
            <span className="font-mono text-[10px] text-ink-muted hidden sm:inline">Official</span>
          </a>

          {/* EasyA Kickstart */}
          <a
            href="https://kickstart.easya.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 group"
          >
            <img
              src="/easya-kickstart-logo.png"
              alt="EasyA Kickstart"
              width="22"
              height="22"
              style={{ objectFit: "contain" }}
              className="flex-shrink-0"
            />
            <span className="font-mono text-xs text-green-ink group-hover:underline underline-offset-2">
              EasyA Kickstart
            </span>
          </a>
        </div>

        {/* Hero */}
        <div className="flex flex-col items-start gap-2">
          <h1 className="font-heading text-green-ink text-3xl sm:text-4xl leading-tight tracking-tight">
            X Profile Scanner
          </h1>
          <p className="font-mono text-sm text-ink-muted leading-relaxed max-w-sm">
            Check if an X profile has been flagged for suspicious crypto activity by the community.
          </p>
        </div>

        {/* Scanner form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex gap-0">
            <div className="doodle-border flex items-center bg-white flex-1 overflow-hidden" style={{ borderRight: "none" }}>
              <span className="pl-4 pr-2 font-mono text-green-ink font-bold text-lg select-none">@</span>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError("");
                }}
                placeholder="username"
                className="flex-1 py-3.5 pr-4 bg-transparent font-mono text-base text-ink placeholder:text-ink-muted focus:outline-none"
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
                maxLength={50}
              />
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="doodle-btn bg-green-light text-green-ink font-heading text-sm px-5 py-3.5 whitespace-nowrap uppercase tracking-widest disabled:cursor-wait disabled:opacity-70"
            >
              {isPending ? "Checking..." : "Scan"}
            </button>
          </div>
          {error && (
            <p className="font-mono text-xs text-red-700 bg-red-50 border border-red-300 rounded px-3 py-2">
              {error}
            </p>
          )}
        </form>

        {/* How it works */}
        <div className="doodle-border-light bg-cream-dark p-4 flex flex-col gap-2">
          <p className="font-heading text-green-ink text-sm uppercase tracking-wider">How it works</p>
          <ol className="list-none flex flex-col gap-1.5">
            {[
              "Enter any X username above",
              "We cross-check our community database",
              "Get an instant risk report with flags",
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-2 font-mono text-xs text-ink-muted">
                <span className="font-heading text-green-ink text-xs mt-0.5">{i + 1}.</span>
                {step}
              </li>
            ))}
          </ol>
          <a href="/how-to" className="font-mono text-xs text-green-mid underline underline-offset-2 mt-1 self-start hover:text-green-ink">
            Full guide →
          </a>
        </div>

        {/* Recent scans */}
        <div className="flex flex-col gap-2">
          <p className="font-mono text-xs text-ink-muted uppercase tracking-widest">Recent scans</p>
          <div className="flex flex-wrap gap-2">
            {(recentScans.length > 0 ? recentScans : FEATURED_SCANS).map((u) => (
              <button
                key={u}
                onClick={() => openScan(u)}
                className="font-mono text-xs text-green-ink border border-green-ink px-2.5 py-1 rounded-sm hover:bg-green-pale transition-colors"
              >
                @{u}
              </button>
            ))}
          </div>
          {recentScans.length > 0 && (
            <p className="font-mono text-[10px] text-ink-muted">Saved on this device. No account required.</p>
          )}
        </div>

      </div>

      {/* Background doodle decoration */}
      <div className="fixed bottom-24 right-4 opacity-5 pointer-events-none select-none hidden sm:block">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="90" stroke="#2a5e2a" strokeWidth="3" strokeDasharray="8 6" />
          <circle cx="100" cy="100" r="60" stroke="#2a5e2a" strokeWidth="2" strokeDasharray="5 5" />
          <circle cx="100" cy="100" r="30" stroke="#2a5e2a" strokeWidth="1.5" />
          <line x1="10" y1="100" x2="190" y2="100" stroke="#2a5e2a" strokeWidth="1" />
          <line x1="100" y1="10" x2="100" y2="190" stroke="#2a5e2a" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
}
