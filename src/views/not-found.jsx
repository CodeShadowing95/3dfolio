"use client";

import { useSyncExternalStore } from "react";

import BrandMark from "../components/BrandMark";

// Page 404 commune : la langue est déduite de l'adresse demandée (/en/… = anglais)
const texts = {
  fr: {
    title: "Page introuvable",
    body: "Désolé, la page que vous recherchez n'existe pas (ou pas encore 😏).",
    home: "Retour à l'accueil",
    contact: "Me contacter",
    homeHref: "/",
  },
  en: {
    title: "Page not found",
    body: "Sorry, the page you are looking for doesn't exist (or not yet 😏).",
    home: "Back to home",
    contact: "Contact me",
    homeHref: "/en/",
  },
};

const subscribe = () => () => {};
const getLocale = () => (/^\/en(\/|$)/.test(window.location.pathname) ? "en" : "fr");

export default function NotFound() {
  const locale = useSyncExternalStore(subscribe, getLocale, () => "fr");
  const text = texts[locale];
  return (
    <div className="min-h-screen bg-[#0b1220] text-white" lang={locale}>
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Panneau de gauche (texte) */}
        <section className="flex flex-col justify-between px-6 sm:px-10 py-8 border-r border-white/10 bg-[#0d1426]">
          {/* En‑tête avec logo */}
          <div className="flex items-center gap-3">
            <BrandMark size={40} />
            <span className="font-bold">Patrick Namegni</span>
          </div>

          {/* Contenu principal */}
          <div className="max-w-2xl">
            <p className="text-indigo-400 font-semibold">404</p>
            <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
              {text.title}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/70">
              {text.body}
            </p>

            <div className="mt-8">
              <a href={text.homeHref} className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300">
                <span className="text-sm">{text.home}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M10 19l-7-7l7-7v4h8v6h-8z"/></svg>
              </a>
            </div>
          </div>

          {/* Pied de page */}
          <div className="flex items-center gap-4 text-sm text-white/60 pt-8">
            <a href={`${text.homeHref}#contact`} className="hover:text-white">{text.contact}</a>
          </div>
        </section>

        {/* Panneau de droite (image) */}
        <section className="relative">
          <img
            src="/side-img.webp"
            alt="Starry night desert landscape"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
        </section>
      </div>
    </div>
  );
}
