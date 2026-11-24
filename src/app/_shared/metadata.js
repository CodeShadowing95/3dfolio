import { localizePath } from "../../i18n/config";

export const SITE_URL = "https://patrktech.com";

const texts = {
  fr: {
    title: "Patrick Namegni – Développeur Full-Stack (Java, Node.js, React, Vue.js)",
    description:
      "Développeur full-stack Java/Spring Boot, Node.js, React et Vue.js, disponible en CDI. Projets, expériences et résultats : CI/CD, sécurité, IA générative.",
    ogLocale: "fr_FR",
    ogAlt: "Patrick Namegni, Développeur Full-Stack : Java, Node.js, React, Vue",
  },
  en: {
    title: "Patrick Namegni – Full-Stack Developer (Java, Node.js, React, Vue.js)",
    description:
      "Full-stack developer in Java/Spring Boot, Node.js, React and Vue.js, available for a permanent role in France. Projects, experience and results: CI/CD, security, generative AI.",
    ogLocale: "en_US",
    ogAlt: "Patrick Namegni, Full-Stack Developer: Java, Node.js, React, Vue",
  },
};

// Adresse canonique et versions linguistiques d'une page (chemin français en entrée)
export const alternates = (frPath, locale) => ({
  canonical: localizePath(frPath, locale),
  languages: {
    fr: frPath,
    en: localizePath(frPath, "en"),
    "x-default": frPath,
  },
});

// Métadonnées de base d'une langue (titre par défaut, partage, langues alternatives de l'accueil)
export const baseMetadata = (locale) => {
  const { title, description, ogLocale, ogAlt } = texts[locale];
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: "%s | Patrick Namegni" },
    description,
    authors: [{ name: "Patrick Namegni" }],
    alternates: alternates("/", locale),
    openGraph: {
      type: "website",
      locale: ogLocale,
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
      siteName: "Patrick Namegni",
      url: localizePath("/", locale),
      title,
      description,
      images: [{ url: "/og-banner.jpg?v=1", width: 1200, height: 630, alt: ogAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-banner.jpg?v=1"],
    },
  };
};

export const viewport = {
  themeColor: "#050816",
};
