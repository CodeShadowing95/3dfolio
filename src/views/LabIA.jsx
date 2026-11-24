"use client";

import Link from "next/link";
import PropTypes from "prop-types";

import { useI18n } from "../i18n/I18nProvider";
import LanguageSwitcher from "../components/LanguageSwitcher";
import BrandMark from "../components/BrandMark";

// Page « Labo IA » : le système d'agents de recherche d'emploi (n8n + Claude, auto-hébergé).
// Couleur propre à la page : le rose de la constellation IA (#e879f9), avec le cyan pour l'humain.

const copy = {
  fr: {
    back: "Retour au portfolio",
    eyebrow: "Labo IA · projet en cours",
    title: ["Des agents IA au travail,", "sans leur laisser le dernier mot."],
    lead: "Pendant ma recherche d'emploi, j'ai voulu appliquer l'IA à un vrai problème : le mien. J'ai construit un petit système d'agents avec n8n et Claude, hébergé sur mon propre serveur Linux. Il lit les réponses des recruteurs, me propose les relances au bon moment et repère les offres qui correspondent à mon profil.",
    leadStrong: "L'IA trie et prépare, je décide.",
    consoleLabel: "Les trois flux du système d'agents",
    status: "en service",
    lanes: [
      [
        { label: "Réponse d'un recruteur", tool: "Gmail" },
        { label: "Classe la réponse", tool: "Claude Haiku", kind: "ai" },
        { label: "Suivi mis à jour", tool: "Google Sheets" },
      ],
      [
        { label: "Nouvelles offres", tool: "veille quotidienne" },
        { label: "Note sur 100", tool: "Claude Haiku · garde ≥ 70", kind: "ai" },
        { label: "Je choisis", tool: "Telegram", kind: "me" },
      ],
      [
        { label: "Relance due", tool: "J+7 · J+14" },
        { label: "Rédige la relance", tool: "Claude Sonnet", kind: "ai" },
        { label: "Je valide l'envoi", tool: "bouton « Envoyer »", kind: "me" },
      ],
    ],
    legend: { ai: "étape IA", me: "décision humaine", auto: "automatisation sans IA" },
    phone: {
      head: "Agent relances · 09:12",
      text: ["Relance J+7 pour ", "[entreprise]", ", poste développeur full-stack :"],
      quote: "« Bonjour, je me permets de revenir vers vous au sujet de ma candidature… »",
      send: "Envoyer",
      edit: "Modifier",
      foot: "Rien ne part tant que je n'ai pas appuyé.",
    },
    figures: [
      { value: "470+", label: "candidatures suivies dans un seul tableau, tenu à jour par les agents" },
      { value: "0", label: "mail envoyé sans ma validation" },
      { value: "2 modèles", label: "un petit pour classer et noter, un plus grand pour rédiger" },
      { value: "19,99 €", label: "par mois pour le serveur, que j'ai sécurisé moi-même" },
    ],
    whyTitle: "Les trois questions à se poser avant de brancher une IA",
    why: [
      {
        title: "Ce que fait l'IA",
        body: "Claude a trois rôles précis : il classe chaque réponse de recruteur (refus, entretien, demande d'info, offre), il note chaque nouvelle offre sur 100 par rapport à mon profil, et il rédige les relances. Tout le reste (lire les mails, écrire dans le tableau, planifier) est fait par n8n, sans IA : là où une règle simple suffit, je n'utilise pas de modèle.",
      },
      {
        title: "Comment je contrôle ses erreurs",
        body: "Aucun mail ne part sans mon accord : je reçois le texte sur Telegram et je dois appuyer sur « Envoyer ». Les consignes interdisent à l'IA d'inventer une date ou un chiffre ; elle laisse un repère « à compléter » à la place. Une consigne la protège des mails qui tentent de détourner ses instructions, testée avec un faux mail piégé. Et si un agent tombe en panne, je reçois une alerte.",
      },
      {
        title: "Comment je contrôle les coûts",
        body: "Un petit modèle rapide (Claude Haiku) pour classer et noter, un modèle plus capable (Claude Sonnet) seulement pour rédiger. Les offres sont filtrées avant d'arriver au modèle, et chaque mail traité reçoit une étiquette pour ne jamais être analysé deux fois.",
      },
    ],
    infraTitle: "Le serveur, monté de A à Z",
    infra: "J'ai loué un serveur Linux (Ubuntu) et je l'ai sécurisé moi-même : connexion SSH par clé, pare-feu, HTTPS automatique avec Caddy. Dessus tournent n8n et PostgreSQL, le tout sous Docker. Le code est versionné sur GitHub, sans aucun secret dedans.",
    infraStack: ["Ubuntu", "Docker", "n8n", "PostgreSQL", "Caddy (HTTPS)", "Claude Haiku", "Claude Sonnet", "Telegram", "GitHub"],
    lesson:
      "Pour moi, c'est ça, utiliser l'IA sérieusement : savoir où elle fait gagner du temps, et où il faut garder la main.",
    productsTitle: "L'IA aussi dans mes produits",
    products: [
      { id: "batipilote", name: "BatiPilote", detail: "Devis dictés à la voix et analyse de photos de chantier · OpenAI, LangChain" },
      { id: "merkod", name: "Merkod", detail: "Relecture des codes promo par Claude, avec un budget plafonné · Claude API" },
    ],
    ctaTitle: "Envie d'en parler ?",
    ctaText: "Je vous montre le système en entretien, en direct.",
    contact: "Me contacter",
  },
  en: {
    back: "Back to portfolio",
    eyebrow: "AI lab · work in progress",
    title: ["AI agents at work,", "without giving them the final say."],
    lead: "During my job search, I wanted to apply AI to a real problem: my own. I built a small system of agents with n8n and Claude, hosted on my own Linux server. It reads recruiters' replies, suggests follow-ups at the right time and spots the job offers that match my profile.",
    leadStrong: "The AI sorts and prepares, I decide.",
    consoleLabel: "The three flows of the agent system",
    status: "running",
    lanes: [
      [
        { label: "Recruiter's reply", tool: "Gmail" },
        { label: "Classifies the reply", tool: "Claude Haiku", kind: "ai" },
        { label: "Tracker updated", tool: "Google Sheets" },
      ],
      [
        { label: "New job offers", tool: "daily watch" },
        { label: "Scores out of 100", tool: "Claude Haiku · keeps ≥ 70", kind: "ai" },
        { label: "I choose", tool: "Telegram", kind: "me" },
      ],
      [
        { label: "Follow-up due", tool: "D+7 · D+14" },
        { label: "Drafts the follow-up", tool: "Claude Sonnet", kind: "ai" },
        { label: "I approve sending", tool: "“Send” button", kind: "me" },
      ],
    ],
    legend: { ai: "AI step", me: "human decision", auto: "automation without AI" },
    phone: {
      head: "Follow-up agent · 09:12",
      text: ["D+7 follow-up for ", "[company]", ", full-stack developer role:"],
      quote: "“Hello, I'm following up on my application…”",
      send: "Send",
      edit: "Edit",
      foot: "Nothing goes out until I press the button.",
    },
    figures: [
      { value: "470+", label: "applications tracked in a single sheet, kept up to date by the agents" },
      { value: "0", label: "emails sent without my approval" },
      { value: "2 models", label: "a small one to classify and score, a bigger one to write" },
      { value: "€19.99", label: "a month for the server, which I secured myself" },
    ],
    whyTitle: "Three questions to ask before plugging in an AI",
    why: [
      {
        title: "What the AI does",
        body: "Claude has three precise roles: it classifies every recruiter reply (rejection, interview, request for information, offer), scores every new job offer out of 100 against my profile, and drafts the follow-ups. Everything else (reading emails, writing to the sheet, scheduling) is done by n8n without AI: where a simple rule is enough, I don't use a model.",
      },
      {
        title: "How I keep its mistakes in check",
        body: "No email goes out without my approval: I get the text on Telegram and have to press “Send”. The instructions forbid the AI from inventing a date or a figure; it leaves a “to complete” marker instead. A dedicated instruction protects it from emails that try to hijack it, tested with a fake trapped email. And if an agent fails, I get an alert.",
      },
      {
        title: "How I keep costs down",
        body: "A small, fast model (Claude Haiku) to classify and score, a more capable one (Claude Sonnet) only for writing. Offers are filtered before they reach the model, and every processed email gets a label so it is never analysed twice.",
      },
    ],
    infraTitle: "The server, built from scratch",
    infra: "I rented a Linux server (Ubuntu) and secured it myself: key-based SSH, firewall, automatic HTTPS with Caddy. It runs n8n and PostgreSQL, all under Docker. The code is versioned on GitHub, with no secrets in it.",
    infraStack: ["Ubuntu", "Docker", "n8n", "PostgreSQL", "Caddy (HTTPS)", "Claude Haiku", "Claude Sonnet", "Telegram", "GitHub"],
    lesson: "To me, that's what using AI seriously means: knowing where it saves time, and where you need to stay in control.",
    productsTitle: "AI in my products too",
    products: [
      { id: "batipilote", name: "BatiPilote", detail: "Voice-dictated quotes and worksite photo analysis · OpenAI, LangChain" },
      { id: "merkod", name: "Merkod", detail: "Promo codes reviewed by Claude, with a capped budget · Claude API" },
    ],
    ctaTitle: "Want to talk about it?",
    ctaText: "I can demo the system live in an interview.",
    contact: "Contact me",
  },
};

const eyebrow = "text-[12px] uppercase tracking-[0.14em] font-semibold";
const aiBorder = "border border-transparent [background:linear-gradient(#08071c,#08071c)_padding-box,linear-gradient(135deg,#e879f9,rgba(124,77,255,.5)_45%,#22d3ee)_border-box]";

const nodeStyles = {
  ai: "border-[#e879f9]/55 bg-[#1c1238] shadow-[0_0_26px_-8px_rgba(232,121,249,0.7)]",
  me: "border-cyan/60 bg-tertiary shadow-[0_0_26px_-8px_rgba(34,211,238,0.7)]",
  auto: "border-white/10 bg-tertiary",
};
const toolStyles = { ai: "text-[#f0abfc]", me: "text-[#67e8f9]", auto: "text-secondary" };

const FlowNode = ({ node }) => {
  const kind = node.kind ?? "auto";
  return (
    <div className={`relative z-[1] rounded-[14px] border px-3.5 py-3 text-[14px] leading-[1.35] text-white-100 ${nodeStyles[kind]}`}>
      {node.label}
      <span className={`block mt-1 font-mono text-[11px] ${toolStyles[kind]}`}>{node.tool}</span>
    </div>
  );
};
FlowNode.propTypes = { node: PropTypes.object.isRequired };

// Fil entre deux étapes : un point lumineux y circule (immobile si « réduire les animations »)
const Wire = ({ to, delay }) => (
  <div aria-hidden="true" className="relative h-5 w-0.5 mx-auto md:mx-0 md:h-0.5 md:w-auto labo-wire">
    <span
      className={`labo-dot absolute w-2 h-2 rounded-full ${
        to === "me" ? "bg-cyan shadow-[0_0_10px_#22d3ee]" : "bg-[#e879f9] shadow-[0_0_10px_#e879f9]"
      }`}
      style={{ animationDelay: `${delay}s` }}
    />
  </div>
);
Wire.propTypes = { to: PropTypes.string, delay: PropTypes.number };

const LabIA = () => {
  const { href, locale } = useI18n();
  const c = copy[locale];

  return (
    <div className="relative bg-primary min-h-screen text-white-100 overflow-hidden">
      {/* Lueur propre à la page : rose IA en haut, cyan en bas */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_60%_35%_at_80%_8%,rgba(232,121,249,.14),transparent_70%),radial-gradient(ellipse_50%_30%_at_10%_60%,rgba(34,211,238,.07),transparent_70%)]"
      />

      <div className="relative max-w-[1200px] mx-auto px-6 sm:px-12 pt-8 pb-24">
        <div className="flex justify-between items-center gap-4">
          <Link
            href={href("/")}
            className="inline-flex items-center gap-2.5 min-h-[44px] pl-2 pr-[18px] rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/10 text-white text-[14px] font-semibold transition-colors"
          >
            <BrandMark size={28} />← {c.back}
          </Link>
          <LanguageSwitcher />
        </div>

        {/* En-tête */}
        <header className="mt-14 grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-end">
          <div>
            <p className={`${eyebrow} text-[#e879f9] text-[13px]`}>{c.eyebrow}</p>
            <h1 className="mt-3 font-black text-white text-[clamp(34px,5vw,58px)] leading-[1.08]">
              {c.title[0]}
              <br />
              <span className="text-accent">{c.title[1]}</span>
            </h1>
          </div>
          <p className="text-[17px] leading-[1.75] font-light text-[#dfd9ff]">
            {c.lead} <strong className="font-semibold text-white">{c.leadStrong}</strong>
          </p>
        </header>

        {/* Console : les trois flux */}
        <section aria-label={c.consoleLabel} className={`mt-12 rounded-[26px] overflow-hidden ${aiBorder}`}>
          <div className="flex items-center justify-between gap-4 px-5 sm:px-6 py-3.5 border-b border-white/[0.07] font-mono text-[12px] sm:text-[13px] text-secondary">
            <span className="flex items-center gap-2 min-w-0">
              <span aria-hidden="true" className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span aria-hidden="true" className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span aria-hidden="true" className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-white-100">agent-emploi</span>
              <span className="hidden sm:inline truncate">· n8n · Docker · Ubuntu</span>
            </span>
            <span className="flex items-center gap-2 text-[#4ade80] whitespace-nowrap">
              <span aria-hidden="true" className="w-2 h-2 rounded-full bg-[#4ade80] shadow-[0_0_8px_#4ade80]" />
              {c.status}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row gap-7 p-5 sm:p-8">
            <div className="flex-1 min-w-0 flex flex-col gap-7">
              <ol className="flex flex-col gap-7">
                {c.lanes.map((lane, i) => (
                  <li
                    key={lane[0].label}
                    className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(28px,0.5fr)_minmax(0,1.1fr)_minmax(28px,0.5fr)_minmax(0,1.1fr)] md:items-center"
                  >
                    <FlowNode node={lane[0]} />
                    <Wire to="ai" delay={i * 0.6} />
                    <FlowNode node={lane[1]} />
                    <Wire to={lane[2].kind === "me" ? "me" : "ai"} delay={i * 0.6 + 1.3} />
                    <FlowNode node={lane[2]} />
                  </li>
                ))}
              </ol>
              <p className="font-mono text-[12px] text-secondary flex flex-wrap gap-x-5 gap-y-1">
                <span><span className="text-[#e879f9]">■</span> {c.legend.ai}</span>
                <span><span className="text-cyan">■</span> {c.legend.me}</span>
                <span><span className="text-[#dfd9ff]">■</span> {c.legend.auto}</span>
              </p>
            </div>

            {/* Téléphone : la validation humaine, en image */}
            <div aria-hidden="true" className="w-full max-w-[280px] mx-auto lg:mx-0 lg:w-[250px] shrink-0 rounded-[30px] p-2.5 bg-[#1b1736] border border-white/[0.12]">
              <div className="h-full rounded-[22px] bg-[#0e1621] p-4 flex flex-col gap-2.5">
                <p className="font-mono text-[11px] text-[#8aa4c0]">{c.phone.head}</p>
                <div className="rounded-[14px_14px_14px_4px] bg-[#182533] px-3 py-2.5 text-[13px] leading-[1.5] text-[#e6edf3]">
                  {c.phone.text[0]}
                  <b>{c.phone.text[1]}</b>
                  {c.phone.text[2]}
                  <br />
                  <span className="text-[#b6c2cf]">{c.phone.quote}</span>
                </div>
                <div className="flex gap-2">
                  <span className="flex-1 text-center py-2 rounded-[10px] bg-cyan text-primary font-bold text-[13px]">{c.phone.send}</span>
                  <span className="flex-1 text-center py-2 rounded-[10px] border border-[#33475b] text-[#b6c2cf] text-[13px]">{c.phone.edit}</span>
                </div>
                <p className="mt-auto pt-2 text-[12px] leading-[1.5] text-[#8aa4c0]">{c.phone.foot}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Chiffres */}
        <ul className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {c.figures.map((figure) => (
            <li key={figure.value} className="rounded-[18px] bg-black-100 border border-white/[0.08] p-4 sm:p-5">
              <p className="text-white font-extrabold text-[26px] sm:text-[32px] leading-none">{figure.value}</p>
              <p className="mt-2 text-[13px] sm:text-[14px] leading-[1.45] text-secondary">{figure.label}</p>
            </li>
          ))}
        </ul>

        {/* Ce que fait l'IA, erreurs, coûts */}
        <section className="mt-16">
          <h2 className="text-white text-[24px] sm:text-[28px] font-bold">{c.whyTitle}</h2>
          <ol className="mt-6 grid gap-4 lg:grid-cols-3">
            {c.why.map((item, i) => (
              <li key={item.title} className="rounded-[20px] bg-tertiary border border-white/[0.08] p-6">
                <h3 className="flex items-center gap-2.5 text-white text-[17px] font-bold">
                  <span className="font-mono text-[12px] text-[#e879f9] px-2 py-0.5 rounded-md bg-[#e879f9]/[0.12]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.7] text-[#dfd9ff]">{item.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Le serveur */}
        <section className="mt-16 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <h2 className="text-white text-[24px] sm:text-[28px] font-bold">{c.infraTitle}</h2>
            <p className="mt-4 text-[17px] leading-[1.75] font-light text-[#dfd9ff]">{c.infra}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {c.infraStack.map((item) => (
                <li key={item} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#dfd9ff] text-[13px] font-mono">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <blockquote className="rounded-[22px] p-7 border-l-2 border-[#e879f9] bg-[linear-gradient(135deg,rgba(232,121,249,.08),rgba(34,211,238,.05))]">
            <p className="text-white text-[20px] sm:text-[22px] leading-[1.5] font-medium">{c.lesson}</p>
          </blockquote>
        </section>

        {/* Passerelles vers les projets */}
        <section className="mt-16">
          <h2 className="text-white text-[20px] font-bold">{c.productsTitle}</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {c.products.map((product) => (
              <li key={product.id}>
                <Link
                  href={href(`/project/${product.id}/`)}
                  className="group flex items-center justify-between gap-4 rounded-[18px] bg-tertiary border border-white/[0.08] hover:border-[#e879f9]/50 p-5 transition-colors"
                >
                  <span>
                    <span className="flex items-center gap-2 text-white font-semibold">
                      <span aria-hidden="true" className="w-2 h-2 rounded-full bg-[#e879f9]" />
                      {product.name}
                    </span>
                    <span className="block mt-1 text-[14px] text-secondary">{product.detail}</span>
                  </span>
                  <span aria-hidden="true" className="text-[#e879f9] text-[20px] transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Appel à l'action */}
        <section className={`mt-16 rounded-3xl p-7 sm:p-9 flex flex-wrap justify-between items-center gap-5 ${aiBorder}`}>
          <div>
            <p className="text-white text-[22px] sm:text-[24px] font-extrabold">{c.ctaTitle}</p>
            <p className="mt-1.5 text-secondary">{c.ctaText}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={href("/#contact")}
              className="inline-flex items-center min-h-[50px] px-[26px] rounded-[14px] bg-[#7c4dff] hover:bg-accent text-white font-semibold transition-colors"
            >
              {c.contact}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LabIA;
