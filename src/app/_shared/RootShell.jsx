import Script from "next/script";
import PropTypes from "prop-types";

import "../globals.css";
import { fontClassName } from "./fonts";
import { I18nProvider } from "../../i18n/I18nProvider";
import { languageScript } from "../../i18n/config";

// Exécuté avant le premier affichage : masque l'intro si elle a déjà été vue
// dans cette visite ou si le visiteur demande moins d'animations (voir views/Home.jsx)
const introScript = `try{if(matchMedia("(prefers-reduced-motion: reduce)").matches||sessionStorage.getItem("introSeen"))document.documentElement.dataset.intro="skip"}catch(e){}`;

// Squelette HTML commun aux deux langues : chaque langue a sa mise en page racine
// (app/(fr)/layout.jsx et app/(en)/layout.jsx) pour porter le bon <html lang>
export default function RootShell({ locale, children }) {
  return (
    <html lang={locale} className={fontClassName} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: languageScript(locale) }} />
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body className="bg-primary">
        <I18nProvider locale={locale}>{children}</I18nProvider>
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="5bb3eceb-fa9d-4fe7-9f5d-1c7a55b3e5b3"
          data-domains="patrktech.com"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

RootShell.propTypes = {
  locale: PropTypes.oneOf(["fr", "en"]).isRequired,
  children: PropTypes.node,
};
