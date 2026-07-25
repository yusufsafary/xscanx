import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to use xscanx",
  description: "Step-by-step guide to using xscanx to check X profiles for suspicious crypto activity.",
};

interface Step {
  number: string;
  title: string;
  body: string;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Find a username",
    body: "Get the X (Twitter) handle of the account you want to check. You can paste it with or without the @ symbol. The username appears in the URL of their profile and below their display name.",
  },
  {
    number: "02",
    title: "Enter it in the scanner",
    body: "Go to the xscanx home page. Type or paste the username into the input field. You do not need to include the @ symbol, but you can.",
  },
  {
    number: "03",
    title: "Hit Scan",
    body: "Tap or click the Scan button. xscanx will look up the username in our community database and calculate a risk score based on all recorded flags.",
  },
  {
    number: "04",
    title: "Read the report",
    body: "You will see a risk level (Clean, Low, Medium, or High), a score out of 100, a list of flag categories, and individual flag entries including the type of activity, a description, and the date it was reported.",
  },
  {
    number: "05",
    title: "Make your own call",
    body: "Use the report as one input among many. Check the profile yourself. Read their posts. Look at who they interact with. xscanx gives you the community view, not the final word.",
  },
];

const categories = [
  { name: "Pump & Dump", desc: "Posting aggressive buy signals before a coordinated sell-off." },
  { name: "Fake Giveaway", desc: "Running 'double your crypto' scams or impersonating projects." },
  { name: "Rug Pull", desc: "Promoting tokens that lost nearly all value rapidly after launch." },
  { name: "Exit Scam", desc: "Raising funds then disappearing, often bridging to mixers." },
  { name: "Misleading Claims", desc: "Fabricating partnerships, audits, or KYC certifications." },
  { name: "Coordinated Shilling", desc: "Operating as part of an organised paid shill network." },
  { name: "Fake Token Launch", desc: "Deploying honeypot contracts or copying whitepapers." },
  { name: "Phishing Link", desc: "Sharing malicious links disguised as legitimate dApps." },
];

export default function HowToPage() {
  return (
    <div className="flex-1 flex flex-col items-center px-4 py-10 sm:py-14">
      <div className="w-full max-w-lg flex flex-col gap-8">

        <div className="flex flex-col gap-2">
          <h1 className="font-heading text-3xl text-green-ink">How to use xscanx</h1>
          <p className="font-mono text-sm text-ink-muted">A quick guide to getting the most out of your scans.</p>
        </div>

        {/* Steps */}
        <section className="flex flex-col gap-3">
          <h2 className="font-heading text-base uppercase tracking-widest text-green-ink">Step by step</h2>
          <div className="flex flex-col gap-3">
            {steps.map((step) => (
              <div key={step.number} className="doodle-border bg-white p-5 flex gap-4">
                <span className="font-heading text-2xl text-green-light leading-none flex-shrink-0">{step.number}</span>
                <div className="flex flex-col gap-1">
                  <p className="font-heading text-sm text-green-ink">{step.title}</p>
                  <p className="font-mono text-xs text-ink-muted leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Risk levels */}
        <section className="flex flex-col gap-3">
          <h2 className="font-heading text-base uppercase tracking-widest text-green-ink">Understanding risk levels</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { level: "Clean", color: "risk-clean", desc: "Zero community flags on record. Always stay alert." },
              { level: "Low Risk", color: "risk-low", desc: "A small number of reports. Worth a closer look." },
              { level: "Medium Risk", color: "risk-medium", desc: "Multiple flags detected. Do your own research carefully." },
              { level: "High Risk", color: "risk-high", desc: "Significant flags. Proceed with extreme caution." },
            ].map((item) => (
              <div key={item.level} className={`${item.color} p-3 rounded-sm flex flex-col gap-1 border-2`}>
                <p className="font-heading text-sm">{item.level}</p>
                <p className="font-mono text-xs leading-relaxed opacity-80">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Flag categories */}
        <section className="flex flex-col gap-3">
          <h2 className="font-heading text-base uppercase tracking-widest text-green-ink">Flag categories explained</h2>
          <div className="flex flex-col gap-2">
            {categories.map((cat) => (
              <div key={cat.name} className="doodle-border-light bg-white p-3 flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
                <span className="font-heading text-xs text-green-ink whitespace-nowrap pt-0.5 min-w-36">{cat.name}</span>
                <p className="font-mono text-xs text-ink-muted leading-relaxed">{cat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section className="doodle-border bg-cream-dark p-5 flex flex-col gap-3">
          <h2 className="font-heading text-base uppercase tracking-widest text-green-ink">Tips for better results</h2>
          <ul className="flex flex-col gap-2">
            {[
              "Always scan before interacting with a new account in crypto spaces.",
              "A clean result does not mean safe. New scammers have no history yet.",
              "Cross-reference with on-chain explorers for wallet activity.",
              "Report suspicious accounts to help the community database grow.",
              "Check results for accounts that DM you unsolicited crypto advice.",
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-2 font-mono text-xs text-ink">
                <span className="text-green-ink font-heading mt-0.5 flex-shrink-0">{i + 1}.</span>
                {tip}
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <div className="flex justify-center">
          <Link
            href="/"
            className="doodle-btn bg-green-light text-green-ink font-heading text-sm px-8 py-3 uppercase tracking-widest inline-block"
          >
            Start scanning
          </Link>
        </div>

      </div>
    </div>
  );
}
