import type { Metadata } from "next";
import { Archivo, Cormorant } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "./GoogleAnalytics";
import MicrosoftClarity from "./MicrosoftClarity";

const display = Cormorant({ variable: "--font-display-family", subsets: ["latin", "cyrillic"], weight: "variable", style: ["normal"] });
const sans = Archivo({ variable: "--font-body-family", subsets: ["latin"], weight: "variable" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://academy.axsintimflex.com"),
  title: "AXS INTIMFLEX Academy | Trainer Certification",
  description: "International online trainer certification program by AXS INTIMFLEX.",
  openGraph: {
    type: "website",
    url: "https://academy.axsintimflex.com/",
    title: "AXS INTIMFLEX Academy | Trainer Certification",
    description: "International online trainer certification program by AXS INTIMFLEX.",
    images: [
      {
        url: "/img/academy-social-preview.jpg",
        width: 1200,
        height: 630,
        alt: "AXS INTIMFLEX Academy — Trainer Certification Program",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AXS INTIMFLEX Academy | Trainer Certification",
    description: "International online trainer certification program by AXS INTIMFLEX.",
    images: ["/img/academy-social-preview.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const languageBootstrap = `(function(){try{var saved=localStorage.getItem('axs-academy-language');var code=saved==='RU'||saved==='ES'||saved==='EN'?saved:(navigator.languages&&navigator.languages[0]||navigator.language||'en').split('-')[0].toLowerCase();var lang=saved==='RU'||saved==='ES'||saved==='EN'?saved:code==='ru'?'RU':code==='es'?'ES':'EN';document.documentElement.dataset.academyLang=lang;document.documentElement.lang=lang.toLowerCase();document.documentElement.classList.add('academy-lang-pending')}catch(e){document.documentElement.dataset.academyLang='EN';document.documentElement.classList.add('academy-lang-pending')}})();`;
  return <html lang="en" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: languageBootstrap }} /><noscript><style>{`.academy-lang-pending body{visibility:visible}`}</style></noscript></head><body>{children}<GoogleAnalytics /><MicrosoftClarity /></body></html>;
}
