import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "xscanx cookie policy. Learn what cookies we use and why.",
};

export default function CookiesPage() {
  return (
    <div className="flex-1 flex flex-col items-center px-4 py-10 sm:py-14">
      <div className="w-full max-w-lg flex flex-col gap-8">

        <div className="flex flex-col gap-2">
          <h1 className="font-heading text-3xl text-green-ink">Cookie Policy</h1>
          <p className="font-mono text-xs text-ink-muted">Last updated: July 2025</p>
        </div>

        <section className="doodle-border bg-white p-5 flex flex-col gap-3">
          <h2 className="font-heading text-sm uppercase tracking-widest text-green-ink">What are cookies?</h2>
          <p className="font-mono text-xs text-ink leading-relaxed">
            Cookies are small text files that websites store on your device. They help sites remember your preferences and understand how you use them.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-heading text-base uppercase tracking-widest text-green-ink">Cookies we use</h2>

          <div className="doodle-border-light bg-white p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="font-heading text-sm text-green-ink">Strictly necessary</p>
              <span className="font-mono text-xs risk-clean px-2 py-0.5 rounded-sm">Always on</span>
            </div>
            <p className="font-mono text-xs text-ink-muted leading-relaxed">
              These cookies are required for xscanx to function. They do not store any personally identifiable information. Examples include session state and security tokens.
            </p>
          </div>

          <div className="doodle-border-light bg-white p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="font-heading text-sm text-green-ink">Performance cookies</p>
              <span className="font-mono text-xs risk-low px-2 py-0.5 rounded-sm">Optional</span>
            </div>
            <p className="font-mono text-xs text-ink-muted leading-relaxed">
              Anonymous analytics that help us understand which pages are most visited and how users navigate the site. No personal data is collected. We use aggregated, anonymised data only.
            </p>
          </div>

          <div className="doodle-border-light bg-white p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="font-heading text-sm text-green-ink">Preference cookies</p>
              <span className="font-mono text-xs risk-low px-2 py-0.5 rounded-sm">Optional</span>
            </div>
            <p className="font-mono text-xs text-ink-muted leading-relaxed">
              These remember your settings across visits, such as your most recently scanned username. This data stays on your device and is not sent to our servers.
            </p>
          </div>

          <div className="doodle-border-light bg-white p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="font-heading text-sm text-green-ink">Advertising cookies</p>
              <span className="font-mono text-xs risk-clean px-2 py-0.5 rounded-sm">Not used</span>
            </div>
            <p className="font-mono text-xs text-ink-muted leading-relaxed">
              xscanx does not use advertising cookies. We do not sell your data. We do not profile users for ad targeting.
            </p>
          </div>
        </section>

        <section className="doodle-border bg-cream-dark p-5 flex flex-col gap-3">
          <h2 className="font-heading text-sm uppercase tracking-widest text-green-ink">Third-party services</h2>
          <p className="font-mono text-xs text-ink leading-relaxed">
            xscanx is hosted on Vercel. Vercel may set technical cookies for infrastructure purposes such as load balancing and DDoS protection. These are strictly necessary and cannot be disabled.
          </p>
          <p className="font-mono text-xs text-ink leading-relaxed">
            We do not embed social media plugins, advertising networks, or tracking pixels from third-party services.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-heading text-base uppercase tracking-widest text-green-ink">Managing cookies</h2>
          <p className="font-mono text-xs text-ink leading-relaxed">
            You can control and delete cookies through your browser settings. Most browsers allow you to block cookies from specific sites, delete existing cookies, or be notified before a cookie is set.
          </p>
          <p className="font-mono text-xs text-ink leading-relaxed">
            Note that blocking strictly necessary cookies may affect how xscanx works.
          </p>
          <div className="flex flex-col gap-1.5 mt-1">
            {[
              { browser: "Chrome", url: "https://support.google.com/chrome/answer/95647" },
              { browser: "Firefox", url: "https://support.mozilla.org/kb/cookies-information-websites-store-on-your-computer" },
              { browser: "Safari", url: "https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" },
              { browser: "Edge", url: "https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" },
            ].map((b) => (
              <a
                key={b.browser}
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-green-ink underline underline-offset-2 hover:text-green-mid"
              >
                {b.browser} cookie settings
              </a>
            ))}
          </div>
        </section>

        <section className="doodle-border-light bg-white p-4 flex flex-col gap-2">
          <h2 className="font-heading text-sm uppercase tracking-widest text-green-ink">Contact</h2>
          <p className="font-mono text-xs text-ink-muted leading-relaxed">
            If you have questions about how xscanx uses cookies, you can reach us via our X profile or through GitHub Issues on our public repository.
          </p>
        </section>

      </div>
    </div>
  );
}
