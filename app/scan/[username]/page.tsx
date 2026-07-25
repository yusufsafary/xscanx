import { isValidUsername, normalizeUsername, scanProfile, RISK_CONFIG, type RiskLevel } from "@/lib/scanner";
import type { Metadata } from "next";
import Link from "next/link";
import ScanClientWrapper from "./ScanClientWrapper";
import ResultActions from "@/components/ResultActions";
import { notFound } from "next/navigation";

interface Props {
  params: { username: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const username = normalizeUsername(params.username);
  if (!isValidUsername(username)) return { title: "Profile not found" };
  return {
    title: `@${username} scan results`,
    description: `xscanx scan results for @${username}. Check if this X profile has been flagged for suspicious crypto activity.`,
  };
}

export default async function ScanPage({ params }: Props) {
  const username = normalizeUsername(params.username);
  if (!isValidUsername(username)) notFound();
  const result = scanProfile(username);
  const config = RISK_CONFIG[result.riskLevel];

  const riskColors: Record<RiskLevel, { bar: string; badge: string; bg: string }> = {
    clean: { bar: "#4caf50", badge: "risk-clean", bg: "#e8f5e8" },
    low: { bar: "#8bc34a", badge: "risk-low", bg: "#f1f8e9" },
    medium: { bar: "#ff9800", badge: "risk-medium", bg: "#fff8e1" },
    high: { bar: "#f44336", badge: "risk-high", bg: "#ffebee" },
  };

  const colors = riskColors[result.riskLevel];

  const RISK_ICON: Record<RiskLevel, string> = {
    clean: "ok",
    low: "caution",
    medium: "warn",
    high: "danger",
  };

  return (
    <div className="flex-1 flex flex-col items-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-lg flex flex-col gap-6">

        {/* Back */}
        <Link
          href="/"
          className="font-mono text-xs text-green-ink flex items-center gap-1 hover:underline underline-offset-2 self-start"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
          Scan another profile
        </Link>

        {/* Header card */}
        <div className="doodle-border bg-white p-5 flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2a5e2a" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M4 4l16 16M4 20L20 4" />
                </svg>
                <span className="font-heading text-xl text-green-ink">@{result.username}</span>
              </div>
              <p className="font-mono text-xs text-ink-muted">
                First seen: {result.firstSeen} &nbsp;&middot;&nbsp; Total scans: {result.totalScans.toLocaleString()}
              </p>
            </div>
            <span className={`${colors.badge} font-heading text-xs uppercase tracking-widest px-2.5 py-1.5 rounded-sm whitespace-nowrap`}>
              {config.label}
            </span>
          </div>

          {/* Risk bar */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs text-ink-muted uppercase tracking-widest">Risk score</span>
              <span className="font-heading text-lg text-green-ink">{result.riskScore}/100</span>
            </div>
            <div className="h-3 bg-cream-dark rounded-sm border border-cream-border overflow-hidden">
              <div
                className="h-full rounded-sm transition-all duration-1000"
                style={{ width: `${result.riskScore}%`, backgroundColor: colors.bar }}
              />
            </div>
          </div>

          {/* Verdict */}
          <div className="rounded-sm px-4 py-3 border-l-4" style={{ backgroundColor: colors.bg, borderColor: colors.bar }}>
            <p className="font-heading text-sm text-ink">{config.headline}</p>
            <p className="font-mono text-xs text-ink-muted mt-0.5">{config.subtext}</p>
          </div>
        </div>

        <ResultActions username={result.username} riskLevel={config.label} riskScore={result.riskScore} />

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="doodle-border-light bg-white p-4 flex flex-col gap-1">
            <span className="font-mono text-xs text-ink-muted uppercase tracking-wider">Flags</span>
            <span className="font-heading text-3xl text-green-ink">{result.flagCount}</span>
          </div>
          <div className="doodle-border-light bg-white p-4 flex flex-col gap-1">
            <span className="font-mono text-xs text-ink-muted uppercase tracking-wider">Last flagged</span>
            <span className="font-heading text-sm text-green-ink leading-tight">
              {result.lastFlagged ?? "Never"}
            </span>
          </div>
        </div>

        {/* Categories */}
        {result.categories.length > 0 && (
          <div className="doodle-border-light bg-white p-4 flex flex-col gap-3">
            <p className="font-heading text-xs uppercase tracking-widest text-green-ink">Flag categories</p>
            <div className="flex flex-wrap gap-2">
              {result.categories.map((cat) => (
                <span
                  key={cat}
                  className="font-mono text-xs border border-green-ink text-green-ink px-2.5 py-1 rounded-sm bg-green-pale"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Recent flags */}
        {result.recentFlags.length > 0 ? (
          <div className="flex flex-col gap-3">
            <p className="font-heading text-xs uppercase tracking-widest text-green-ink">Recent flags</p>
            <div className="flex flex-col gap-2">
              {result.recentFlags.map((flag, i) => (
                <div key={i} className="doodle-border-light bg-white p-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs border border-green-mid text-green-mid px-2 py-0.5 rounded-sm bg-green-pale">
                      {flag.category}
                    </span>
                    <span className="font-mono text-xs text-ink-muted">{flag.date}</span>
                  </div>
                  <p className="font-mono text-xs text-ink leading-relaxed">{flag.description}</p>
                  <p className="font-mono text-xs text-ink-muted">Reported by {flag.reporter}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="doodle-border-light bg-white p-6 text-center flex flex-col gap-2 items-center">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2" strokeLinecap="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <p className="font-heading text-sm text-green-ink">No flags on record</p>
            <p className="font-mono text-xs text-ink-muted">This profile has a clean history in our database.</p>
          </div>
        )}

        {/* Disclaimer */}
        <p className="font-mono text-xs text-ink-muted text-center leading-relaxed px-2">
          xscanx is community-powered. Results are for informational purposes only and do not constitute financial or legal advice. Always do your own research.
        </p>

        {/* Scan another */}
        <ScanClientWrapper currentUsername={result.username} />
      </div>
    </div>
  );
}
