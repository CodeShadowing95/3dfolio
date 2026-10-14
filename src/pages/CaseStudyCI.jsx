import { useEffect } from "react";
import { Link } from "react-router-dom";

// Étude de cas : optimisation de la CI du site corporate Hapticmedia
const steps = [
  {
    title: "Contexte",
    body: "Le site corporate de Hapticmedia, en Nuxt avec un back-office Strapi, est reconstruit par la CI à chaque mise à jour. Le build prenait 25 à 30 minutes, ce qui ralentissait chaque livraison et chaque correction.",
  },
  {
    title: "Diagnostic",
    body: "En découpant la durée du build étape par étape, deux postes ressortaient : les requêtes vers l'API Strapi, refaites pendant la génération des pages, et le traitement des images, repris à chaque build. Les téléchargements de ressources s'enchaînaient en plus les uns après les autres.",
  },
];

const actions = [
  "Mise en cache des requêtes Strapi pendant le build, pour ne plus interroger l'API plusieurs fois pour les mêmes données.",
  "Optimisation automatique des images avec SVGO, Sharp et gifsicle, jusqu'à -80 % de poids.",
  "Téléchargements parallélisés au lieu d'être exécutés un par un.",
];

const stack = ["Nuxt", "Strapi", "Node.js", "GitHub Actions", "SVGO", "Sharp", "gifsicle"];

const CaseStudyCI = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Étude de cas : un build CI divisé par 5 | Patrick Namegni";
  }, []);

  return (
    <div className="bg-primary min-h-screen text-white">
      <div className="max-w-3xl mx-auto px-6 sm:px-10 py-10 sm:py-16">
        <Link
          to="/#expérience"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-sm font-semibold transition-colors"
        >
          ← Retour au portfolio
        </Link>

        <p className="mt-10 text-secondary uppercase tracking-wider text-[14px]">Étude de cas · Hapticmedia · 2026</p>
        <h1 className="mt-2 font-black text-[36px] sm:text-[48px] leading-tight">Diviser par 5 le temps de build d&apos;une CI</h1>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-tertiary rounded-2xl p-6 border border-white/10">
            <p className="text-secondary text-[14px]">Avant</p>
            <p className="mt-1 text-[32px] font-black">25-30 min</p>
          </div>
          <div className="green-pink-gradient p-[1px] rounded-2xl">
            <div className="bg-tertiary rounded-2xl p-6 h-full">
              <p className="text-secondary text-[14px]">Après</p>
              <p className="mt-1 text-[32px] font-black text-cyan">~5 min</p>
            </div>
          </div>
        </div>

        {steps.map((step) => (
          <section key={step.title} className="mt-12">
            <h2 className="text-[24px] font-bold">{step.title}</h2>
            <p className="mt-3 text-white-100/90 text-[17px] leading-8">{step.body}</p>
          </section>
        ))}

        <section className="mt-12">
          <h2 className="text-[24px] font-bold">Actions</h2>
          <ol className="mt-4 space-y-3">
            {actions.map((action, index) => (
              <li key={action} className="flex gap-4 text-white-100/90 text-[17px] leading-7">
                <span className="shrink-0 w-8 h-8 rounded-full bg-accent/20 text-accent-light font-bold flex items-center justify-center text-[14px]">
                  {index + 1}
                </span>
                <span>{action}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-12">
          <h2 className="text-[24px] font-bold">Résultat</h2>
          <p className="mt-3 text-white-100/90 text-[17px] leading-8">
            Le build est passé de 25-30 minutes à environ 5 minutes, soit 5 à 6 fois plus rapide. Une correction sur le site est désormais en ligne en quelques minutes.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-[18px] font-bold">Stack</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {stack.map((item) => (
              <li key={item} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white-100 text-[14px]">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-16 flex flex-wrap gap-4">
          <Link
            to="/#contact"
            className="px-6 py-3 rounded-xl bg-accent hover:bg-accent-hover text-white font-semibold transition-colors"
          >
            Me contacter
          </Link>
          <a
            href="/CV.pdf"
            download
            className="px-6 py-3 rounded-xl border border-white/40 hover:border-white hover:bg-white/10 text-white font-semibold transition-colors"
          >
            Télécharger mon CV
          </a>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyCI;
