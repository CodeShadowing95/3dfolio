"use client";

import { usePathname } from "next/navigation";
import PropTypes from "prop-types";

import { useI18n } from "../i18n/I18nProvider";
import { LANG_KEY, locales, switchLocalePath } from "../i18n/config";
import { track } from "../utils/analytics";

const labels = {
  fr: { short: "FR", long: "Version française" },
  en: { short: "EN", long: "English version" },
};

// Bascule FR / EN : même page dans l'autre langue, choix retenu pour les visites suivantes
const LanguageSwitcher = ({ className = "", large = false }) => {
  const { locale, t } = useI18n();
  const pathname = usePathname() ?? "/";

  const choose = (event, target) => {
    event.preventDefault();
    try {
      localStorage.setItem(LANG_KEY, target);
    } catch {
      // Stockage indisponible : la bascule fonctionne quand même pour cette page
    }
    track("langue-changee", { langue: target });
    // Rechargement complet : chaque langue a sa propre mise en page (<html lang>)
    window.location.assign(switchLocalePath(pathname, target) + window.location.hash);
  };

  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className={`inline-flex items-center p-1 rounded-xl border border-white/15 font-mono ${className}`}
    >
      {locales.map((target) => {
        const active = target === locale;
        return (
          <a
            key={target}
            href={switchLocalePath(pathname, target)}
            hrefLang={target}
            lang={target}
            aria-label={labels[target].long}
            aria-current={active ? "true" : undefined}
            onClick={(event) => (active ? event.preventDefault() : choose(event, target))}
            className={`flex items-center justify-center rounded-lg font-semibold transition-colors ${
              large ? "min-w-[52px] min-h-[40px] text-[14px]" : "min-w-[38px] min-h-[34px] text-[13px]"
            } ${active ? "bg-white/10 text-white" : "text-secondary hover:text-white"}`}
          >
            {labels[target].short}
          </a>
        );
      })}
    </div>
  );
};

LanguageSwitcher.propTypes = {
  className: PropTypes.string,
  large: PropTypes.bool,
};

export default LanguageSwitcher;
