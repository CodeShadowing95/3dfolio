"use client";

import PropTypes from "prop-types";

import { useI18n } from "../i18n/I18nProvider";
import { track } from "../utils/analytics";

// Fichiers dans public/cv/. Le « pack » = CV puis lettre de motivation dans un seul PDF :
// un clic, un fichier, sans l'alerte « plusieurs téléchargements » du navigateur.
export const CV_FILES = {
  fr: {
    pack: "/cv/Patrick-Namegni-CV-et-Lettre-FR.pdf",
    cv: "/cv/Patrick-Namegni-CV-FR.pdf",
  },
  en: {
    pack: "/cv/Patrick-Namegni-Resume-and-Cover-Letter-EN.pdf",
    cv: "/cv/Patrick-Namegni-CV-EN.pdf",
  },
};

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z" />
  </svg>
);

const variants = {
  primary:
    "min-h-[50px] px-6 text-[16px] bg-accent-hover hover:bg-[#6a3cf0] text-white shadow-[0_14px_36px_-14px_rgba(145,94,255,0.8)]",
  compact: "min-h-[44px] px-5 text-[15px] bg-accent-hover hover:bg-[#6a3cf0] text-white",
  outline: "min-h-[50px] px-[26px] text-[16px] border border-white/40 hover:bg-white/10 text-white",
};

// Un seul bouton, aucun choix à faire : il télécharge le CV et la lettre dans la langue de la page.
// La langue de la page suit déjà celle du navigateur du visiteur (redirection vers /en/),
// donc un recruteur anglophone reçoit l'anglais, un francophone le français.
const CvDownload = ({ emplacement, variant = "primary", label, showIcon = false, fullWidth = false, className = "", onDownload }) => {
  const { locale, t } = useI18n();

  return (
    <a
      href={CV_FILES[locale].pack}
      download
      onClick={() => {
        track("cv-telecharge", { emplacement, langue: locale, contenu: "cv+lettre" });
        onDownload?.();
      }}
      className={`${fullWidth ? "flex w-full" : "inline-flex"} items-center justify-center gap-2.5 whitespace-nowrap rounded-[14px] font-semibold transition-colors duration-300 ${variants[variant]} ${className}`}
    >
      {showIcon && <DownloadIcon />}
      {label ?? t.common.downloadCv}
    </a>
  );
};

CvDownload.propTypes = {
  emplacement: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["primary", "compact", "outline"]),
  label: PropTypes.node,
  showIcon: PropTypes.bool,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  onDownload: PropTypes.func,
};

export default CvDownload;
