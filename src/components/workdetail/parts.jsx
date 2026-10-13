import PropTypes from "prop-types";

// Composants réutilisables pour la page de détail d'un projet (WorkDetail).
// Objectif : éliminer les duplications de markup entre les sections.

import { CheckIcon } from "./icons";

/** Liste à puces générique avec icône de check, utilisée pour Objectifs / Fonctionnalités / Résultats */
export const InfoList = ({ items = [], iconClassName, textClassName = "text-sm text-white/80" }) => (
  <ul className="space-y-2">
    {items.map((item, idx) => (
      <li key={idx} className="flex items-start gap-2">
        <CheckIcon className={iconClassName} />
        <span className={textClassName}>{item}</span>
      </li>
    ))}
  </ul>
);
InfoList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  iconClassName: PropTypes.string,
  textClassName: PropTypes.string,
};

/** Badge de technologie, avec son logo local quand il existe */
export const TechBadge = ({ label, logo, size = "md" }) => {
  const dims = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";
  const padding = size === "sm" ? "px-2.5 py-1 text-[11px]" : "px-3 py-1 text-xs";
  return (
    <span className={`inline-flex items-center gap-2 rounded-full bg-black/40 border border-white/10 text-white/90 ${padding}`}>
      {logo && <img src={logo} alt="" className={`${dims} object-contain`} loading="lazy" />}
      {label}
    </span>
  );
};
TechBadge.propTypes = {
  label: PropTypes.string.isRequired,
  logo: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md"]),
};

/** Bloc de section réutilisable (titre + contenu, dans une carte) */
export const SectionCard = ({ id, title, children, className = "" }) => (
  <div id={id} className={`rounded-xl border border-white/10 bg-white/5 p-4 space-y-3 ${className}`}>
    <h3 className="text-white font-semibold">{title}</h3>
    {children}
  </div>
);
SectionCard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
