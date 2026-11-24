import { existsSync } from "node:fs";

// La formation (src/app/(fr)/formation) est ignorée par Git : elle n'existe que sur
// l'ordinateur de développement. Le lien « Formation » de la barre n'apparaît que si elle est là.
const hasFormation = existsSync(new URL("./src/app/(fr)/formation/page.jsx", import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Site 100 % statique : `next build` produit le dossier out/, déployé tel quel sur Hostinger
  output: "export",
  // /project/batipilote/ -> out/project/batipilote/index.html, servi par Apache sans réécriture
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_FORMATION: hasFormation ? "1" : "" },
  reactStrictMode: true,
  // Une mise en page racine par langue : la page 404 est définie à part (app/global-not-found.jsx)
  experimental: { globalNotFound: true },
};

export default nextConfig;
