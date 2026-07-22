import type { Metadata } from "next";
import "./globals.css";

const title = "Borussia Deutsch Akademie | Interview & Kundenservice";
const description = "Interaktiver Deutschkurs für Bewerbungsgespräche und Kundenservice mit Lektionen, Musterantworten, Wortschatz, Dialogen und Aussprache.";

export const metadata: Metadata = {
  metadataBase: new URL("https://bvb-deutsch-akademie.vercel.app"),
  title,
  description,
  keywords: ["Deutsch lernen", "Bewerbungsgespräch", "Kundenservice", "Interviewfragen", "Deutsch B1 B2"],
  icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
  openGraph: { title, description, type: "website", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Borussia Deutsch Akademie" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="de" dir="ltr"><body>{children}</body></html>;
}
