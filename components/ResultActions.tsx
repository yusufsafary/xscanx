"use client";

import { useState } from "react";

interface ResultActionsProps {
  username: string;
  riskLevel: string;
  riskScore: number;
}

export default function ResultActions({ username, riskLevel, riskScore }: ResultActionsProps) {
  const [status, setStatus] = useState("");
  const profileUrl = `https://x.com/${username}`;

  async function copyReport() {
    const report = `xscanx report for @${username}\nRisk: ${riskLevel} (${riskScore}/100)\n${window.location.href}`;
    try {
      await navigator.clipboard.writeText(report);
      setStatus("Report copied");
    } catch {
      setStatus("Copy unavailable");
    }
    window.setTimeout(() => setStatus(""), 2200);
  }

  async function shareReport() {
    const shareData = {
      title: `xscanx report for @${username}`,
      text: `${riskLevel} risk · ${riskScore}/100`,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setStatus("Shared");
      } catch {
        return;
      }
    } else {
      await copyReport();
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={copyReport} className="doodle-border-light bg-white px-3 py-2 font-mono text-xs text-green-ink hover:bg-green-pale transition-colors">
          Copy report
        </button>
        <button type="button" onClick={shareReport} className="doodle-border-light bg-white px-3 py-2 font-mono text-xs text-green-ink hover:bg-green-pale transition-colors">
          Share result
        </button>
        <a href={profileUrl} target="_blank" rel="noreferrer" className="doodle-border-light bg-white px-3 py-2 font-mono text-xs text-green-ink hover:bg-green-pale transition-colors">
          Open on X
        </a>
      </div>
      {status && <p role="status" className="font-mono text-xs text-green-ink">{status}</p>}
    </div>
  );
}