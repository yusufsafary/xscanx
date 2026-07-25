# xscanx

**X Profile Scanner** — Check if an X (Twitter) profile has been flagged for suspicious crypto activity by the community.

## What it does

xscanx lets you enter any X username and instantly see:

- A risk score from 1 to 100
- Risk level: Clean, Low, Medium, or High
- Flag categories (Pump & Dump, Rug Pull, Fake Giveaway, etc.)
- Individual flag entries with dates and descriptions
- Total scan count and first-seen date

## Stack

- [Next.js 14](https://nextjs.org/) with App Router
- [Tailwind CSS](https://tailwindcss.com/) for styling
- TypeScript throughout
- Deployed on [Vercel](https://vercel.com/)

## Pages

| Route | Description |
|---|---|
| `/` | Main scanner — enter any X username |
| `/scan/[username]` | Scan results for a specific profile |
| `/about` | About xscanx |
| `/how-to` | Step-by-step usage guide |
| `/cookies` | Cookie policy |

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Design

- Mobile-first, responsive layout
- Doodle/hand-drawn aesthetic with warm cream background and green ink palette
- Fonts: Archivo Black (headings), JetBrains Mono (code), Archivo (body)
- No em-dashes, no placeholder content, no generic AI text

## License

MIT
