import "./globals.css";
import { fontClassName } from "./_shared/fonts";
import NotFound from "@/views/not-found";

export const metadata = {
  title: "Page introuvable · Page not found | Patrick Namegni",
};

// Page 404 commune aux deux langues (le site a une mise en page racine par langue)
export default function GlobalNotFound() {
  return (
    <html lang="fr" className={fontClassName} data-scroll-behavior="smooth">
      <body className="bg-primary">
        <NotFound />
      </body>
    </html>
  );
}
