import { reactjs, nextjs, nodejs, angular, typescript, tailwind, css, spring, mongodb, python, openai, docker, git } from "../assets";

// Nom affiché et logo local de chaque techno (sans logo : badge texte seul)
const TECH_INFO = {
  react: { label: "React", logo: reactjs },
  "react native": { label: "React Native", logo: reactjs },
  "react-router v7": { label: "React Router 7" },
  nextjs: { label: "Next.js", logo: nextjs },
  next: { label: "Next.js", logo: nextjs },
  nodejs: { label: "Node.js", logo: nodejs },
  angular: { label: "Angular", logo: angular },
  typescript: { label: "TypeScript", logo: typescript },
  tailwindcss: { label: "Tailwind CSS", logo: tailwind },
  css: { label: "CSS", logo: css },
  materialui: { label: "Material UI" },
  springboot: { label: "Spring Boot", logo: spring },
  mongodb: { label: "MongoDB", logo: mongodb },
  laravel: { label: "Laravel" },
  python: { label: "Python", logo: python },
  postgresql: { label: "PostgreSQL" },
  ai: { label: { fr: "IA (OpenAI)", en: "AI (OpenAI)" }, logo: openai },
  restapi: { label: { fr: "API REST", en: "REST API" } },
  vite: { label: "Vite" },
  pdfjs: { label: "PDF.js" },
  zustand: { label: "Zustand" },
  docker: { label: "Docker", logo: docker },
  vercel: { label: "Vercel" },
  git: { label: "Git", logo: git },
};

// Un tag peut imposer son propre libellé (ex. "ai" réalisé avec Puter.js et non OpenAI) : badge texte seul.
// Le libellé peut être { fr, en } : à passer par pick() à l'affichage.
export const getTechInfo = ({ name, label }) =>
  label ? { label } : TECH_INFO[String(name || "").toLowerCase().trim()] || { label: name };
