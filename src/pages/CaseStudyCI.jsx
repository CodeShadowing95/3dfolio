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

// Chaque goulot d'étranglement et l'action qui l'a levé
const actions = [
  {
    before: "Les mêmes données Strapi redemandées à l'API pendant la génération des pages.",
    after: "Mise en cache des requêtes Strapi pendant le build : chaque donnée n'est demandée qu'une fois.",
  },
  {
    before: "Les images retraitées à chaque build, sans optimisation.",
    after: "Optimisation automatique des images avec SVGO, Sharp et gifsicle, jusqu'à -80 % de poids.",
  },
  {
    before: "Les téléchargements de ressources exécutés un par un.",
    after: "Téléchargements parallélisés.",
  },
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
            <div className="mt-4 h-2 rounded-full bg-white/10" aria-hidden="true">
              <div className="h-full w-full rounded-full bg-secondary/60" />
            </div>
          </div>
          <div className="green-pink-gradient p-[1px] rounded-2xl">
            <div className="bg-tertiary rounded-2xl p-6 h-full">
              <p className="text-secondary text-[14px]">Après</p>
              <p className="mt-1 text-[32px] font-black text-cyan">~5 min</p>
              <div className="mt-4 h-2 rounded-full bg-white/10" aria-hidden="true">
                <div className="h-full w-[18%] rounded-full bg-cyan" />
              </div>
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
          <ol className="mt-5 space-y-4">
            {actions.map((action, index) => (
              <li key={action.after} className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-stretch gap-2 sm:gap-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[12px] uppercase tracking-wider text-secondary">Avant</p>
                  <p className="mt-1 text-white-100/90 text-[15px] leading-6">{action.before}</p>
                </div>
                <div className="flex items-center justify-center text-cyan" aria-hidden="true">
                  <span className="sm:hidden">↓</span>
                  <span className="hidden sm:inline">→</span>
                </div>
                <div className="rounded-xl border border-cyan/30 bg-cyan/5 p-4">
                  <p className="text-[12px] uppercase tracking-wider text-cyan">Action {index + 1}</p>
                  <p className="mt-1 text-white text-[15px] leading-6">{action.after}</p>
                </div>
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
