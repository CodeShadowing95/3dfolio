import {
  javascript,
  typescript,
  reactjs,
  nextjs,
  vue,
  angular,
  tailwind,
  nodejs,
  java,
  spring,
  python,
  mongodb,
  docker,
  kubernetes,
  aws,
  git,
} from "../assets";
import { experiences, projects } from "./index";

// Pile technique affichée dans la section « Stack » : 4 couches, de bas en haut.
// Les liens « Utilisé dans » ne sont pas saisis à la main : ils sont déduits du
// champ `stack` des expériences, des `tags` des projets et de leurs
// `details.functionalities`. Une techno sans correspondance garde `usedIn` vide.
//
// `aliases` : formes sous lesquelles la techno apparaît dans les données
// (comparaison exacte, insensible à la casse, sur des segments déjà découpés).
// `usageNote` : phrase générale affichée en tête du panneau (techno utilisée partout),
// la liste calculée devient alors une liste d'exemples.
// `extraUsedIn` : projets précisés par Patrick qui ne figurent pas dans les données du site.
// `monogram` : texte affiché sur la tuile quand aucun logo n'existe dans src/assets/tech.

const rawLayers = [
  {
    id: "infra",
    name: "Infra / DevOps",
    color: "#22d3ee",
    nodes: [
      {
        id: "node-1",
        techs: [
          {
            name: "Docker",
            icon: docker,
            aliases: ["docker"],
            usageNote: "Utilisé dans la plupart de mes projets",
          },
          {
            name: "Kubernetes",
            icon: kubernetes,
            aliases: ["kubernetes", "k8s"],
            extraUsedIn: [{ label: "To Do App", detail: "Projet scolaire", kind: "project" }],
          },
        ],
      },
      {
        id: "node-2",
        techs: [
          { name: "AWS", icon: aws, aliases: ["aws"] },
          {
            name: "GitHub Actions",
            monogram: "CI",
            aliases: ["github actions", "ci github actions"],
            usageNote: "Utilisé dans tous mes projets",
          },
        ],
      },
      {
        id: "node-3",
        techs: [{ name: "Git", icon: git, aliases: ["git"], usageNote: "Utilisé dans tous mes projets" }],
      },
    ],
  },
  {
    id: "data",
    name: "Data",
    color: "#4f8cff",
    techs: [
      {
        name: "MongoDB",
        icon: mongodb,
        aliases: ["mongodb"],
        extraUsedIn: [{ label: "Eatons", detail: "Projet académique", kind: "project" }],
      },
      { name: "PostgreSQL", monogram: "PG", aliases: ["postgresql", "postgres"] },
      { name: "MySQL", monogram: "SQL", aliases: ["mysql"] },
    ],
  },
  {
    id: "back",
    name: "Back-end",
    color: "#7c6cff",
    techs: [
      { name: "Node.js", icon: nodejs, aliases: ["node.js", "nodejs", "node"] },
      {
        name: "Java",
        icon: java,
        aliases: ["java"],
        extraUsedIn: [{ label: "Birth Express", detail: "Application de gestion des naissances", kind: "project" }],
      },
      { name: "Spring Boot", icon: spring, aliases: ["spring boot", "springboot", "spring"] },
      { name: "Python", icon: python, aliases: ["python"] },
    ],
  },
  {
    id: "front",
    name: "Front-end",
    color: "#b07cff",
    techs: [
      {
        name: "JavaScript",
        icon: javascript,
        aliases: ["javascript"],
        usageNote: "Utilisé dans la majorité de mes projets",
      },
      {
        name: "TypeScript",
        icon: typescript,
        aliases: ["typescript"],
        usageNote: "Utilisé dans la majorité de mes projets",
      },
      { name: "React", icon: reactjs, aliases: ["react", "reactjs", "react js"] },
      { name: "Next.js", icon: nextjs, aliases: ["nextjs", "next.js", "next js"] },
      { name: "Vue.js / Nuxt", icon: vue, aliases: ["vue.js", "vue", "vuejs", "nuxt"] },
      { name: "Angular", icon: angular, aliases: ["angular"] },
      { name: "Tailwind CSS", icon: tailwind, aliases: ["tailwindcss", "tailwind css", "tailwind"] },
    ],
  },
];

// Découpe « Nuxt / Vue.js, AWS (S3, CloudFront) » en segments comparables.
const splitSegments = (text) =>
  String(text)
    .toLowerCase()
    .split(/[,/()+]| et /)
    .map((part) => part.trim())
    .filter(Boolean);

const sources = [
  ...experiences.map((experience) => ({
    label: experience.company_name,
    detail: experience.title,
    kind: "experience",
    segments: splitSegments(experience.stack ?? ""),
  })),
  ...projects.map((project) => ({
    label: project.name,
    detail: project.reason ?? null,
    kind: "project",
    segments: [
      ...(project.tags ?? []).map((tag) => tag.name.toLowerCase().trim()),
      ...(project.details?.functionalities ?? []).flatMap(splitSegments),
    ],
  })),
];

const findUsages = (aliases) =>
  sources
    .filter((source) => source.segments.some((segment) => aliases.includes(segment)))
    .map(({ label, detail, kind }) => ({ label, detail, kind }));

const withUsages = (layer, tech) => ({
  name: tech.name,
  icon: tech.icon ?? null,
  monogram: tech.monogram ?? null,
  layerId: layer.id,
  layerName: layer.name,
  usageNote: tech.usageNote ?? null,
  usedIn: [
    ...findUsages(tech.aliases),
    ...(tech.extraUsedIn ?? []).filter(
      (extra) => !findUsages(tech.aliases).some((usage) => usage.label === extra.label)
    ),
  ],
});

export const stackLayers = rawLayers.map((layer) =>
  layer.nodes
    ? {
        ...layer,
        nodes: layer.nodes.map((node) => ({
          ...node,
          techs: node.techs.map((tech) => withUsages(layer, tech)),
        })),
      }
    : { ...layer, techs: layer.techs.map((tech) => withUsages(layer, tech)) }
);

// Liste à plat (sr-only, fallback, contrôles)
export const stackTechs = stackLayers.flatMap((layer) =>
  layer.nodes ? layer.nodes.flatMap((node) => node.techs) : layer.techs
);
