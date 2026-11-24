import { SITE_URL } from "./_shared/metadata";

// Consignes pour les robots d'indexation (généré au build : /robots.txt)
export const dynamic = "force-static";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/formation/"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
