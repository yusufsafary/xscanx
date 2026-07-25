"use client";

import { useState, FormEvent, useTransition } from "react";
import { useRouter } from "next/navigation";
import { isValidUsername, normalizeUsername } from "@/lib/scanner";

export default function ScanClientWrapper({ currentUsername }: { currentUsername: string }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

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
    startTransition(() => router.push(`/scan/${clean}`));
  }

  return (
    <div className="doodle-border bg-cream-dark p-4 flex flex-col gap-3">
      <p className="font-heading text-xs uppercase tracking-widest text-green-ink">Scan another profile</p>
      <form onSubmit={handleSubmit} className="flex gap-0">
        <div className="doodle-border-light flex items-center bg-white flex-1 overflow-hidden" style={{ borderRight: "none" }}>
          <span className="pl-3 pr-1.5 font-mono text-green-ink font-bold text-base select-none">@</span>
          <input
            type="text"
            value={username}
            onChange={(e) => { setUsername(e.target.value); setError(""); }}
            placeholder={currentUsername}
            className="flex-1 py-2.5 pr-3 bg-transparent font-mono text-sm text-ink placeholder:text-ink-muted focus:outline-none"
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            maxLength={50}
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="doodle-btn bg-green-light text-green-ink font-heading text-xs px-4 py-2.5 uppercase tracking-widest disabled:cursor-wait disabled:opacity-70"
        >
          {isPending ? "Checking..." : "Scan"}
        </button>
      </form>
      {error && (
        <p className="font-mono text-xs text-red-700">{error}</p>
      )}
    </div>
  );
}
