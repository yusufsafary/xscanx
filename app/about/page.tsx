import type { Metadata } from "next";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: "About xscanx",
  description: "Learn about xscanx, the community-powered X profile scanner for crypto safety.",
};

export default function AboutPage() {
  return (
    <div className="flex-1 flex flex-col items-center px-4 py-10 sm:py-14">
      <div className="w-full max-w-lg flex flex-col gap-8">

        <div className="flex flex-col gap-2">
          <h1 className="font-heading text-3xl text-green-ink">About xscanx</h1>
          <p className="font-mono text-sm text-ink-muted">What we are, why we built it, and how it works.</p>
        </div>

        {/* Origin */}
        <section className="doodle-border bg-white p-5 flex flex-col gap-3">
          <h2 className="font-heading text-base uppercase tracking-widest text-green-ink">The Problem</h2>
          <p className="font-mono text-sm text-ink leading-relaxed">
            Crypto Twitter is full of noise. Rug pulls, pump and dump schemes, fake giveaways, coordinated shilling rings. Spotting a bad actor before you follow them, engage with their content, or send them money is hard work.
          </p>
          <p className="font-mono text-sm text-ink leading-relaxed">
            We built xscanx because the community needed a shared memory. A place to record flags, surface patterns, and warn each other before it is too late.
          </p>
        </section>

        {/* What we are */}
        <section className="flex flex-col gap-3">
          <h2 className="font-heading text-base uppercase tracking-widest text-green-ink">What xscanx is</h2>
          <div className="flex flex-col gap-2">
            {[
              {
                title: "Community database",
                body: "Flags come from real people in the crypto community who have witnessed suspicious behaviour and reported it.",
              },
              {
                title: "Pattern scanner",
                body: "We analyse reported activity across multiple categories: rug pulls, pump & dumps, fake giveaways, phishing links, and more.",
              },
              {
                title: "Risk scoring",
                body: "Each profile gets a risk score from 1 to 100, weighted by number of reports, report recency, and flag severity.",
              },
              {
                title: "Not a judge",
                body: "We surface data. We do not make final decisions. Always do your own research alongside any scan result.",
              },
            ].map((item) => (
              <div key={item.title} className="doodle-border-light bg-white p-4 flex flex-col gap-1">
                <p className="font-heading text-sm text-green-ink">{item.title}</p>
                <p className="font-mono text-xs text-ink-muted leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What we are not */}
        <section className="doodle-border bg-cream-dark p-5 flex flex-col gap-3">
          <h2 className="font-heading text-base uppercase tracking-widest text-green-ink">What xscanx is not</h2>
          <ul className="flex flex-col gap-2">
            {[
              "A financial advisor. Nothing here is investment advice.",
              "A legal authority. We cannot take action against anyone.",
              "An X (Twitter) official product. We have no affiliation with X Corp.",
              "Infallible. Community data can be wrong or outdated.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 font-mono text-xs text-ink-muted">
                <span className="text-green-ink font-heading mt-0.5">x</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Mission */}
        <section className="flex flex-col gap-3">
          <h2 className="font-heading text-base uppercase tracking-widest text-green-ink">Our mission</h2>
          <p className="font-mono text-sm text-ink leading-relaxed">
            Make crypto Twitter safer, one scan at a time. We want every person who clicks a link or follows a new account to have access to the community knowledge that already exists but was previously scattered across threads, DMs, and deleted posts.
          </p>
          <p className="font-mono text-sm text-ink leading-relaxed">
            xscanx is built for people who are serious about protecting themselves and their community in the wild west of on-chain activity.
          </p>
        </section>

        <div className="border-t border-cream-border pt-4">
          <Logo size={36} />
        </div>

      </div>
    </div>
  );
}
