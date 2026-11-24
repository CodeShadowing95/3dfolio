"use client";

import { useEffect } from "react";
import PropTypes from "prop-types";

// Ancienne adresse d'un projet renommé : on renvoie vers la nouvelle, dans la même langue
const LegacyProjectRedirect = ({ from, to }) => {
  useEffect(() => {
    const next = window.location.pathname.replace(`/project/${from}`, `/project/${to}`);
    window.location.replace(next + window.location.search + window.location.hash);
  }, [from, to]);

  return (
    <main className="bg-primary min-h-screen flex items-center justify-center text-white-100 p-6 text-center">
      <p>
        Ce projet a changé d&apos;adresse. <a className="underline" href={`/project/${to}/`}>Voir le projet</a>
      </p>
    </main>
  );
};

LegacyProjectRedirect.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default LegacyProjectRedirect;
