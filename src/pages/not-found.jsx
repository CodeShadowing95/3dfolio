import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0b1220] text-white">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Panneau de gauche (texte) */}
        <section className="flex flex-col justify-between px-6 sm:px-10 py-8 border-r border-white/10 bg-[#0d1426]">
          {/* En‑tête avec logo */}
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Site logo" className="w-9 h-9 opacity-90" />
          </div>

          {/* Contenu principal */}
          <div className="max-w-2xl">
            <p className="text-indigo-400 font-semibold">404</p>
            <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
              Page introuvable
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/70">
              Désolé, la page que vous recherchez n{`'`}existe pas (ou pas encore 😏).
            </p>

            <div className="mt-8">
              <Link to="/" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300">
                <span className="text-sm">Retour à l{`'`}accueil</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M10 19l-7-7l7-7v4h8v6h-8z"/></svg>
              </Link>
            </div>
          </div>

          {/* Pied de page */}
          <div className="flex items-center gap-4 text-sm text-white/60 pt-8">
            <a href="/#contact" className="hover:text-white">Contact support</a>
            <span className="opacity-40">·</span>
            <a href="/" className="hover:text-white">Statut du site</a>
          </div>
        </section>

        {/* Panneau de droite (image) */}
        <section className="relative">
          <img
            src="/side-img.jpg"
            alt="Starry night desert landscape"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </section>
      </div>
    </div>
  );
}
