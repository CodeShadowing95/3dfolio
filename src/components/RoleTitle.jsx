"use client";

import PropTypes from "prop-types";

import { useI18n } from "../i18n/I18nProvider";

// « Développeur Full-Stack » / « Full-Stack Developer », avec « Full-Stack » mis en couleur
const RoleTitle = ({ accentClassName }) => {
  const { locale } = useI18n();
  const accent = <span className={accentClassName}>Full-Stack</span>;
  return locale === "en" ? <>{accent} Developer</> : <>Développeur {accent}</>;
};

RoleTitle.propTypes = {
  accentClassName: PropTypes.string.isRequired,
};

export default RoleTitle;
