"use client";

import { createContext, useContext, useMemo } from "react";
import PropTypes from "prop-types";

import fr from "./dictionaries/fr";
import en from "./dictionaries/en";
import { localizePath, pick } from "./config";

const dictionaries = { fr, en };

const I18nContext = createContext(null);

export const I18nProvider = ({ locale, children }) => {
  const value = useMemo(
    () => ({
      locale,
      t: dictionaries[locale],
      href: (path) => localizePath(path, locale),
      pick: (field) => pick(field, locale),
    }),
    [locale]
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

I18nProvider.propTypes = {
  locale: PropTypes.oneOf(["fr", "en"]).isRequired,
  children: PropTypes.node,
};

// { locale, t (textes de l'interface), href (lien dans la langue courante), pick (contenu { fr, en }) }
export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n doit être utilisé sous <I18nProvider>");
  return context;
};
