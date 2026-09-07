"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

type SiteLang = "EN" | "RU" | "ES";
type PaymentVariant = "deposit" | "full";
type PaymentLang = "en" | "es" | "ru";

const paymentLinks: Record<PaymentVariant, Record<PaymentLang, string>> = {
  deposit: {
    en: "https://buy.stripe.com/eVq00l5zK8NY5m6dDy3ZK0W",
    es: "https://buy.stripe.com/7sY8wR3rCfcm7uebvq3ZK0U",
    ru: "https://buy.stripe.com/fZu9AV0fq6FQdSC9ni3ZK0S",
  },
  full: {
    en: "https://buy.stripe.com/3cI28td2c8NY8yifLG3ZK0V",
    es: "https://buy.stripe.com/9B67sN4vG9S27uearm3ZK0T",
    ru: "https://buy.stripe.com/5kQ5kF7HS2pAg0Kczu3ZK0R",
  },
};

const copy: Record<SiteLang, { title: string; note: string; close: string }> = {
  EN: {
    title: "Choose your course language",
    note: "After payment, you will receive access to a private WhatsApp group with Ilona, where all course information will be provided.",
    close: "Close",
  },
  RU: {
    title: "Выбери язык курса",
    note: "После оплаты вы получите доступ к закрытой группе Telegram с Илоной, где будет размещена вся информация о курсе.",
    close: "Закрыть",
  },
  ES: {
    title: "Elige el idioma del curso",
    note: "Después del pago, recibirás acceso a un grupo privado de WhatsApp con Ilona, donde se publicará toda la información del curso.",
    close: "Cerrar",
  },
};

export default function CourseLanguageModal({ variant, siteLang, onClose }: { variant: PaymentVariant; siteLang: SiteLang; onClose: () => void }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", onKeyDown); };
  }, [onClose]);

  const labels: Array<[PaymentLang, string]> = [["en", "English"], ["es", "Español"], ["ru", "Русский"]];
  const text = copy[siteLang];
  const modal = (
    <div className="academy-language-overlay" role="dialog" aria-modal="true" aria-label={text.title} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="academy-language-modal">
        <button className="academy-language-close" type="button" onClick={onClose} aria-label={text.close}>×</button>
        <h2>{text.title}</h2>
        <div className="academy-language-options">
          {labels.map(([language, label]) => <a className="academy-language-option" key={language} href={paymentLinks[variant][language]}>{label}</a>)}
        </div>
        <p className="academy-language-note">{text.note}</p>
      </div>
    </div>
  );
  return typeof document === "undefined" ? null : createPortal(modal, document.body);
}
