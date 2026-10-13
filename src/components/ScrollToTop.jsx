import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

// React Router ne gère pas le défilement : à chaque changement de page on remonte en haut,
// ou on rejoint l'ancre demandée (ex. "/#projets" depuis la page d'un projet).
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return undefined;
    }

    // La page d'accueil peut mettre quelques instants à monter : on réessaie brièvement
    let attempts = 0;
    let timer;
    const scrollToHash = () => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        target.scrollIntoView();
      } else if (attempts++ < 20) {
        timer = setTimeout(scrollToHash, 50);
      }
    };
    scrollToHash();
    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
