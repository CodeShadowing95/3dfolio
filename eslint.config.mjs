import nextVitals from "eslint-config-next/core-web-vitals";

const config = [
  ...nextVitals,
  {
    rules: {
      // Le site affiche des images déjà optimisées en WebP (export statique, pas de next/image)
      "@next/next/no-img-element": "off",
      // Règles « React Compiler » arrivées avec React 19 : les scènes three.js modifient
      // leurs objets dans useFrame, c'est l'usage normal de R3F. Signalées sans bloquer le build.
      "react-hooks/immutability": "warn",
      "react-hooks/refs": "warn",
      "react-hooks/purity": "warn",
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  { ignores: [".next/**", "out/**", "node_modules/**"] },
];

export default config;
