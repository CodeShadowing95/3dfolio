import { useSyncExternalStore } from "react";

// Lit une media query côté navigateur. Pendant le rendu serveur (et la première
// hydratation) on renvoie `serverValue`, puis la vraie valeur : pas d'écart d'hydratation.
const useMediaQuery = (query, serverValue = false) =>
  useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverValue
  );

export const useCanHover = () => useMediaQuery("(hover: hover)");
export const usePrefersReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");

export default useMediaQuery;
