"use client";

import PropTypes from "prop-types";

// Composants réutilisables pour la page de détail d'un projet (WorkDetail).

/** Badge de technologie, avec son logo local quand il existe */
export const TechBadge = ({ label, logo, size = "md" }) => {
  const dims = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";
  const padding = size === "sm" ? "px-2.5 py-1 text-[11px]" : "px-3 py-1.5 text-[13px]";
  return (
    <span className={`inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 text-[#dfd9ff] ${padding}`}>
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
