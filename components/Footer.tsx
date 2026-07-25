import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="mt-auto border-t-2 border-green-ink bg-cream-dark w-full">
      <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Logo size={36} />
          <div className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-sm text-green-ink">
            <Link href="/about" className="hover:underline underline-offset-2">About</Link>
            <Link href="/how-to" className="hover:underline underline-offset-2">How To</Link>
            <Link href="/cookies" className="hover:underline underline-offset-2">Cookies</Link>
          </div>
        </div>
        <div className="border-t border-cream-border pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <p className="font-mono text-xs text-ink-muted">
            xscanx is a community tool. Results are crowd-sourced and for informational purposes only.
          </p>
          <p className="font-mono text-xs text-ink-muted whitespace-nowrap">
            &copy; {new Date().getFullYear()} xscanx
          </p>
        </div>
        <div className="flex justify-center pt-2">
          <a href="https://orynth.dev/projects/xscanx" target="_blank" rel="noopener">
            <img src="https://orynth.dev/api/badge/xscanx?theme=light&style=default" alt="Featured on Orynth" width="260" height="80" />
          </a>
        </div>
      </div>
    </footer>
  );
}
