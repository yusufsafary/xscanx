export type RiskLevel = "clean" | "low" | "medium" | "high";

export interface ScanResult {
  username: string;
  riskLevel: RiskLevel;
  riskScore: number;
  flagCount: number;
  lastFlagged: string | null;
  categories: string[];
  recentFlags: FlagEntry[];
  totalScans: number;
  firstSeen: string;
}

export interface FlagEntry {
  date: string;
  category: string;
  description: string;
  reporter: string;
}

export function normalizeUsername(rawUsername: string): string {
  return rawUsername.trim().toLowerCase().replace(/^@+/, "");
}

export function isValidUsername(rawUsername: string): boolean {
  return /^[a-zA-Z0-9_]{1,50}$/.test(normalizeUsername(rawUsername));
}

// A small set of known demo flagged accounts
const KNOWN_FLAGGED: Record<string, Partial<ScanResult>> = {
  cryptoscammer: {
    riskLevel: "high",
    riskScore: 94,
    flagCount: 47,
    categories: ["Pump & Dump", "Fake Giveaway", "Rug Pull"],
  },
  rugpuller99: {
    riskLevel: "high",
    riskScore: 88,
    flagCount: 31,
    categories: ["Rug Pull", "Exit Scam"],
  },
  fakemoondev: {
    riskLevel: "medium",
    riskScore: 62,
    flagCount: 12,
    categories: ["Pump & Dump", "Misleading Claims"],
  },
};

function hashUsername(username: string): number {
  let h = 0;
  for (let i = 0; i < username.length; i++) {
    h = (Math.imul(31, h) + username.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function deterministicChoice<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

const ALL_CATEGORIES = [
  "Pump & Dump",
  "Fake Giveaway",
  "Rug Pull",
  "Exit Scam",
  "Misleading Claims",
  "Coordinated Shilling",
  "Fake Token Launch",
  "Phishing Link",
];

const REPORTERS = [
  "@watchdog_xyz",
  "@cryptosafe",
  "@scamalert_x",
  "@defi_guard",
  "@rugwatch",
  "@chainwatch",
  "@onchain_police",
];

const DESCRIPTIONS: Record<string, string[]> = {
  "Pump & Dump": [
    "Posted aggressive buy signals before coordinated sell-off",
    "Coordinated price manipulation detected across multiple accounts",
    "Promoted token 48h before team dumped 80% supply",
  ],
  "Fake Giveaway": [
    "Ran a 'double your crypto' scheme targeting followers",
    "Impersonated a known project to solicit deposits",
    "Promoted fake airdrop requiring wallet connection",
  ],
  "Rug Pull": [
    "Associated with project that pulled liquidity overnight",
    "Promoted token that lost 99% value within 72 hours",
    "Multiple community members reported stolen funds",
  ],
  "Exit Scam": [
    "Team vanished after raising funds via presale",
    "Wallet activity shows funds bridged to mixer immediately after raise",
  ],
  "Misleading Claims": [
    "Posted fabricated partnership announcements",
    "Claimed false audits and KYC certifications",
  ],
  "Coordinated Shilling": [
    "Part of organized shill ring boosting low-cap tokens",
    "Repeatedly posts about same tokens alongside suspected bot network",
  ],
  "Fake Token Launch": [
    "Launched multiple tokens with copied whitepapers",
    "Deployed honeypot contract disguised as new project",
  ],
  "Phishing Link": [
    "Shared malicious dApp link disguised as legitimate platform",
    "Posted fake MetaMask login page targeting DeFi users",
  ],
};

function randomDate(seed: number, daysBack: number): string {
  const d = new Date();
  d.setDate(d.getDate() - (seed % daysBack));
  return d.toISOString().split("T")[0];
}

export function scanProfile(rawUsername: string): ScanResult {
  const username = normalizeUsername(rawUsername);
  const known = KNOWN_FLAGGED[username];
  const h = hashUsername(username);

  let riskScore: number;
  let riskLevel: RiskLevel;
  let flagCount: number;
  let categories: string[];

  if (known) {
    riskScore = known.riskScore ?? 90;
    riskLevel = known.riskLevel ?? "high";
    flagCount = known.flagCount ?? 20;
    categories = known.categories ?? ["Pump & Dump"];
  } else {
    // Deterministic but varied distribution
    // ~40% clean, ~25% low, ~20% medium, ~15% high
    const bucket = h % 100;
    if (bucket < 40) {
      riskLevel = "clean";
      riskScore = (h % 20) + 1; // 1-20
      flagCount = 0;
      categories = [];
    } else if (bucket < 65) {
      riskLevel = "low";
      riskScore = (h % 20) + 21; // 21-40
      flagCount = (h % 4) + 1;
      categories = [deterministicChoice(ALL_CATEGORIES, h)];
    } else if (bucket < 85) {
      riskLevel = "medium";
      riskScore = (h % 25) + 41; // 41-65
      flagCount = (h % 10) + 5;
      categories = [
        deterministicChoice(ALL_CATEGORIES, h),
        deterministicChoice(ALL_CATEGORIES, h + 1),
      ].filter((v, i, a) => a.indexOf(v) === i);
    } else {
      riskLevel = "high";
      riskScore = (h % 30) + 66; // 66-95
      flagCount = (h % 25) + 15;
      categories = [
        deterministicChoice(ALL_CATEGORIES, h),
        deterministicChoice(ALL_CATEGORIES, h + 1),
        deterministicChoice(ALL_CATEGORIES, h + 2),
      ].filter((v, i, a) => a.indexOf(v) === i);
    }
  }

  // Build recent flags
  const recentFlags: FlagEntry[] = [];
  for (let i = 0; i < Math.min(flagCount, 5); i++) {
    const cat = deterministicChoice(categories.length ? categories : ALL_CATEGORIES, h + i);
    const descs = DESCRIPTIONS[cat] ?? ["Suspicious activity reported"];
    const desc = deterministicChoice(descs, h + i + 7);
    recentFlags.push({
      date: randomDate(h + i * 13, 180),
      category: cat,
      description: desc,
      reporter: deterministicChoice(REPORTERS, h + i + 3),
    });
  }

  // Sort by date desc
  recentFlags.sort((a, b) => b.date.localeCompare(a.date));

  const lastFlagged = recentFlags.length > 0 ? recentFlags[0].date : null;
  const firstSeen = randomDate(h % 400 + 200, 400);
  const totalScans = (h % 1200) + 50;

  return {
    username,
    riskLevel,
    riskScore,
    flagCount,
    lastFlagged,
    categories,
    recentFlags,
    totalScans,
    firstSeen,
  };
}

export const RISK_CONFIG = {
  clean: {
    label: "Clean",
    emoji: "ok",
    color: "risk-clean",
    headline: "No flags found",
    subtext: "This profile has no known suspicious activity in our records.",
  },
  low: {
    label: "Low Risk",
    emoji: "caution",
    color: "risk-low",
    headline: "Minor activity noted",
    subtext: "A small number of reports exist. Proceed with caution.",
  },
  medium: {
    label: "Medium Risk",
    emoji: "warn",
    color: "risk-medium",
    headline: "Suspicious patterns detected",
    subtext: "Multiple reports found. We recommend independent verification.",
  },
  high: {
    label: "High Risk",
    emoji: "danger",
    color: "risk-high",
    headline: "High risk profile",
    subtext: "Significant flags detected. Exercise extreme caution.",
  },
} satisfies Record<RiskLevel, { label: string; emoji: string; color: string; headline: string; subtext: string }>;
