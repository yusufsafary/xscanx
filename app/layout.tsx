import type { Metadata, Viewport } from "next";
import { Archivo_Black, JetBrains_Mono, Archivo } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo-black",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#f4ede0",
};

export const metadata: Metadata = {
  title: {
    default: "xscanx - X Profile Scanner",
    template: "%s | xscanx",
  },
  description: "Check if an X profile has been flagged for suspicious crypto activity. Community-powered scanner for rug pulls, pump & dumps, and scams.",
  keywords: ["xscanx", "X scanner", "Twitter scanner", "crypto scam", "rug pull", "pump dump", "crypto safety"],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://xscanx.vercel.app"),
  applicationName: "xscanx",
  openGraph: {
    title: "xscanx - X Profile Scanner",
    description: "Check if an X profile has been flagged for suspicious crypto activity.",
    siteName: "xscanx",
    type: "website",
    url: "https://xscanx.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "xscanx - X Profile Scanner",
    description: "Check if an X profile has been flagged for suspicious crypto activity.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${archivoBlack.variable} ${jetbrainsMono.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="font-body min-h-screen flex flex-col bg-cream">
        <Nav />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
