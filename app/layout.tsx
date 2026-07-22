import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const incoming = await headers();
  const host = incoming.get("x-forwarded-host") ?? incoming.get("host") ?? "localhost:3000";
  const protocol = incoming.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);
  const title = "Borussia Deutsch Akademie | كورس الألماني للمقابلات وخدمة العملاء";
  const description = "كورس ألماني تفاعلي كامل للمقابلات وخدمة العملاء: محاضرات، أسئلة بإجابات، قاموس، مواقف ونطق مع ترجمة عربية عند الطلب.";
  return {
    metadataBase, title, description,
    keywords: ["Deutsch", "German Interview", "Kundenservice", "تعلم الألمانية", "مقابلة ألماني"],
    icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
    openGraph: { title, description, type: "website", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Borussia Deutsch Akademie" }] },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl"><body>{children}</body></html>;
}
