"use client";

import Script from "next/script";
import { useEffect } from "react";

const projectId = "ygahwfxyx3";
const languageEvent = "axs-academy-language-change";

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
  }
}

function currentLanguage() {
  return document.documentElement.dataset.academyLang || "EN";
}

export default function MicrosoftClarity() {
  useEffect(() => {
    const syncLanguage = () => {
      window.clarity?.("set", "academy_language", currentLanguage());
    };

    window.addEventListener(languageEvent, syncLanguage);
    return () => window.removeEventListener(languageEvent, syncLanguage);
  }, []);

  return (
    <Script id="academy-microsoft-clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,'clarity','script','${projectId}');window.clarity('set','academy_language',document.documentElement.dataset.academyLang||'EN');`}
    </Script>
  );
}
