import { experiences, projects } from "./index";
import { stackTechs } from "./stack";

// Données de la constellation « Stack technique ».
// Les usages (quels projets / postes utilisent une techno) viennent de constants/stack.js,
// qui les déduit automatiquement des tags des projets et du champ `stack` des expériences.
// Ici on ajoute seulement la mise en scène : domaine, position dans le ciel, profondeur.

export const domains = [
  { id: "front", name: { fr: "Front-end", en: "Front-end" }, color: "#b07cff", depth: 1, hub: "TypeScript", corner: "left-[4%] top-[5%]" },
  { id: "back", name: { fr: "Back-end", en: "Back-end" }, color: "#7c6cff", depth: 0.6, hub: "Python", corner: "right-[4%] top-[5%]" },
  { id: "data", name: { fr: "Données", en: "Data" }, color: "#4f8cff", depth: 0.8, hub: "PostgreSQL", corner: "left-[4%] bottom-[4%]" },
  { id: "infra", name: { fr: "Infra / DevOps", en: "Infra / DevOps" }, color: "#22d3ee", depth: 0.45, hub: "Docker", corner: "right-[4%] bottom-[4%]" },
  { id: "ai", name: { fr: "IA", en: "AI" }, color: "#e879f9", depth: 0.7, hub: "IA générative", corner: "left-1/2 -translate-x-1/2 bottom-[4%]" },
];

// Position de chaque étoile en % du cadre (x, y), et ordre du tracé de chaque constellation
const layout = {
  JavaScript: [8, 17],
  React: [19, 25],
  "Next.js": [31, 13],
  TypeScript: [33, 32],
  "Vue.js / Nuxt": [10, 41],
  Angular: [22, 50],
  "Tailwind CSS": [39, 47],
  "Node.js": [62, 18],
  Java: [78, 12],
  "Spring Boot": [88, 27],
  Python: [71, 37],
  PHP: [55, 34],
  WordPress: [87, 45],
  MongoDB: [9, 70],
  PostgreSQL: [21, 76],
  MySQL: [31, 86],
  Docker: [62, 72],
  "GitHub Actions": [76, 60],
  AWS: [87, 62],
  Kubernetes: [74, 86],
  Git: [90, 80],
  "IA générative": [46, 66],
  "OpenAI API": [41, 78],
  LangChain: [51, 81],
  "Claude API": [55, 73],
};

export const lines = {
  front: ["JavaScript", "React", "Next.js", "TypeScript", "Tailwind CSS", "Angular", "Vue.js / Nuxt", "React"],
  back: ["Node.js", "Java", "Spring Boot", "WordPress", "Python", "PHP", "Node.js"],
  data: ["MongoDB", "PostgreSQL", "MySQL"],
  infra: ["Docker", "GitHub Actions", "AWS", "Git", "Kubernetes", "Docker"],
  ai: ["IA générative", "OpenAI API", "LangChain", "Claude API", "IA générative"],
};

// Technos présentes partout : toujours allumées, taille maximale
const everywhere = { Git: true, "GitHub Actions": true };
// Technos « transversales » : allumées dès qu'une techno qui en dépend l'est
const impliedBy = { JavaScript: ["React", "Next.js", "TypeScript", "Vue.js / Nuxt", "Angular"] };
// Libellés moins longs pour les puces de sélection
const shortLabel = (label) => label.replace(/ SARL$/, "");

const domainOrder = ["front", "back", "data", "infra", "ai"];

export const stars = stackTechs
  .filter((tech) => layout[tech.name])
  .sort((a, b) => domainOrder.indexOf(a.layerId) - domainOrder.indexOf(b.layerId))
  .map((tech) => {
    const used = [...new Set(tech.usedIn.map((usage) => shortLabel(usage.label)))];
    const wide = Boolean(tech.usageNote);
    return {
      name: tech.name,
      domain: tech.layerId,
      x: layout[tech.name][0],
      y: layout[tech.name][1],
      used,
      everywhere: Boolean(everywhere[tech.name]),
      wide,
      // Taille : nombre de projets / postes, plafonné ; les technos utilisées partout sont au maximum
      weight: wide ? 5 : Math.min(used.length, 5),
    };
  });

export const starByName = Object.fromEntries(stars.map((star) => [star.name, star]));

// Puces : les postes, puis les projets phares
export const pickers = [
  ...experiences.map((experience) => shortLabel(experience.company_name)),
  ...projects.filter((project) => project.featured).map((project) => project.name),
];

// Une étoile est-elle allumée quand on choisit ce projet ou ce poste ?
export const isLitFor = (star, label) => {
  if (star.everywhere || star.used.includes(label)) return true;
  const parents = impliedBy[star.name];
  return Boolean(parents && parents.some((parent) => starByName[parent]?.used.includes(label)));
};
