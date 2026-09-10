"use client";

import Script from "next/script";
import { useEffect } from "react";

const measurementId = "G-VT9MJ32QL7";
const languageEvent = "axs-academy-language-change";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function currentLanguage() {
  return document.documentElement.dataset.academyLang || "EN";
}

export default function GoogleAnalytics() {
  useEffect(() => {
    const syncLanguage = () => {
      const language = currentLanguage();
      window.gtag?.("set", "user_properties", { academy_language: language });
      window.gtag?.("event", "language_change", { academy_language: language });
    };

    window.addEventListener(languageEvent, syncLanguage);
    return () => window.removeEventListener(languageEvent, syncLanguage);
  }, []);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="academy-google-analytics" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('set','user_properties',{academy_language:document.documentElement.dataset.academyLang||'EN'});gtag('config','${measurementId}');`}
      </Script>
    </>
  );
}
