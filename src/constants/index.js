import {
  mobile,
  backend,
  creator,
  web,
  world,
  openai,
  javascript,
  typescript,
  reactjs,
  kubernetes,
  tailwind,
  nodejs,
  mongodb,
  git,
  docker,
  // threejs,
  ub,
  teepyjob,
  hapticmedia,
  nextjs,
  python,
  youwatch,
  animevault,
  pokedexhub,
  vue,
  angular,
  java,
  spring,
  aws,
  brainwave,
  appleclone,
  servermanagement,
  bikemapper,
  curriqulumai,
  kamercare,
  // batipilote,
  linkedin,
  github,
} from "../assets";

// Galeries de captures par projet
// import batipiloteLogo from "../assets/ProjectAssets/batipilote/logo.webp";
import bikemapperPreview from "../assets/ProjectAssets/bikemapper/demo/bikemapper-preview.mp4";
import youwatchPreview from "../assets/ProjectAssets/youwatch/demo/youwatch-preview.mp4";
import curriqulumPreview from "../assets/ProjectAssets/curriqulum.ai/demo/curriqulum-preview.mp4";
import pokedexhubPreview from "../assets/ProjectAssets/pokedexhub/demo/pokedexhub-preview.mp4";
// import batipiloteShowcase from "../assets/ProjectAssets/batipilote/demo/batipilote-showcase.mp4";
import applePreview from "../assets/ProjectAssets/apple/demo/apple-preview.mp4";
import brainwavePreview from "../assets/ProjectAssets/brainwave/demo/brainwave-preview.mp4";
// import batipiloteScreen1 from "../assets/ProjectAssets/batipilote/gallery/1.webp";
// import batipiloteScreen2 from "../assets/ProjectAssets/batipilote/gallery/2.webp";
// import batipiloteScreen3 from "../assets/ProjectAssets/batipilote/gallery/3.webp";
// import batipiloteScreen4 from "../assets/ProjectAssets/batipilote/gallery/4.webp";
// import batipiloteScreen5 from "../assets/ProjectAssets/batipilote/gallery/5.webp";
// import batipiloteScreen6 from "../assets/ProjectAssets/batipilote/gallery/6.webp";
// import batipiloteScreen7 from "../assets/ProjectAssets/batipilote/gallery/7.webp";
// import batipiloteScreen8 from "../assets/ProjectAssets/batipilote/gallery/8.webp";

// Lien de prise de rendez-vous (Calendly, Cal.com, Google Agenda...). Laisser vide pour masquer les boutons.
export const BOOKING_URL = "";

export const navLinks = [
  {
    id: "profil",
    title: "Profil",
  },
  {
    id: "projets",
    title: "Projets",
  },
  {
    id: "expérience",
    title: "Expérience",
  },
  {
    id: "stack",
    title: "Stack",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Front-end",
    icon: web,
    items: ["React", "Next.js", "Vue.js / Nuxt", "shadcn", "React Native", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Back-end & API",
    icon: backend,
    items: ["Node.js / Express / Hono", "PHP / Laravel", "Java / Spring Boot", "Strapi", "API REST"],
  },
  {
    title: "Données",
    icon: world,
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Elasticsearch"],
  },
  {
    title: "DevOps & Cloud",
    icon: creator,
    items: ["GitHub Actions", "Azure DevOps", "AWS", "Linux", "Docker, Kubernetes, Terraform"],
  },
  {
    title: "Sécurité & Qualité",
    icon: mobile,
    items: ["Sécurité applicative", "Politiques CSP", "Tests unitaires / Jest", "SonarQube"],
  },
  {
    title: "IA",
    icon: openai,
    items: ["IA générative", "OpenAI API", "LangChain", "Python"],
  },
];

const technologies = [
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Next JS",
    icon: nextjs,
  },
  {
    name: "Vue.js",
    icon: vue,
  },
  {
    name: "Angular",
    icon: angular,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "Java",
    icon: java,
  },
  {
    name: "Spring",
    icon: spring,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  // {
  //   name: "Three JS",
  //   icon: threejs,
  // },
  {
    name: "Kubernetes",
    icon: kubernetes,
  },
  {
    name: "Git",
    icon: git,
  },
  {
    name: "Python",
    icon: python,
  },
  {
    name: "AWS",
    icon: aws,
  },
  {
    name: "Docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "Développeur Full-Stack & DevOps",
    company_name: "Hapticmedia",
    location: "Strasbourg · Alternance",
    stack: "Nuxt / Vue.js, TypeScript, Node.js, Strapi, AWS (S3, CloudFront), GitHub Actions",
    caseStudy: { to: "/etude-de-cas/build-ci", label: "Lire l'étude de cas : un build CI divisé par 5" },
    icon: hapticmedia,
    iconBg: "#383E56",
    date: "Janvier 2026 - Septembre 2026",
    points: [
      "Optimisation de la CI du site corporate : build ramené de 25-30 min à environ 5 min (cache des requêtes Strapi, compression automatique des images).",
      "Mise à niveau Node.js / npm de 130+ applications (30+ web, 100+ 3D) : plusieurs milliers de vulnérabilités corrigées, chaque mise à jour validée par tests, build et Pull Request.",
      "Sécurisation de 4 environnements (sandbox, développement, test, production) par des Content Security Policies centralisées, et évolution de la CLI interne de livraison (S3 / CloudFront, npm).",
      "Migration du site de Nuxt 3 à Nuxt 4 (158 fichiers) avec un démarrage serveur 3 fois plus rapide, et prévisualisation sécurisée Strapi ↔ Nuxt pour l'équipe éditoriale.",
    ],
  },
  {
    title: "Développeur Web Full-Stack",
    company_name: "TeePy Job",
    location: "Lyon · Alternance",
    stack: "PHP, jQuery, AJAX, WordPress, Elasticsearch, MySQL",
    icon: teepyjob,
    iconBg: "#383E56",
    date: "Juin 2024 - Juillet 2025",
    points: [
      "Développement d’un système de récupération automatique de 2500+ offres d’emploi depuis divers ATS recruteurs via API et flux XML. Réduction du temps de traitement manuel de 80%.",
      "Mise en place d’un pipeline d’analyse et pré-traitement des annonces, avec filtrage et enrichissement des données (catégorisation, géolocalisation) sur une base de 200000+ profils. Gain de 40% en rapidité sur la publication des offres.",
      "Développement d’algorithmes de matching automatique basé sur géolocalisation et critères d’offres, suivi de mailing et gestion de priorités d’annonces. Augmentation de 30% du taux de mise en relation candidats/recruteurs et amélioration du délai de proposition des profils.",
    ],
  },
  {
    title: "Développeur web Junior",
    company_name: "Univers Binaire SARL",
    location: "Yaoundé, Cameroun",
    stack: "Java / Spring Boot, Laravel, Angular, React, TypeScript, PostgreSQL, MySQL",
    icon: ub,
    iconBg: "#383E56",
    date: "Octobre 2019 - Juillet 2021",
    points: [
      "Conception et développement de 10+ applications web métier pour des clients professionnels (banques, établissements scolaires, agences de voyages), en Java / Spring Boot, Laravel, Angular ou React selon les projets.",
      "Développement et maintenance d'API REST (utilisateurs, transactions, réservations, données métier) et conception des bases PostgreSQL / MySQL associées.",
      "Collaboration avec les équipes techniques et fonctionnelles : analyse des besoins, estimation, documentation et évolution des solutions livrées.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "Son investissement et son apport dans nos projets e-commerce sont très louables. Je recommande.",
    name: "N. Martial",
    designation: "CEO",
    company: "Univers Binaire",
  },
];

const projectCategories = [
  {
    id: 1,
    title: "Tous"
  },
  {
    id: 2,
    title: "UI/UX"
  },
  {
    id: 3,
    title: "Fullstack App"
  },
  {
    id: 4,
    title: "React"
  },
  {
    id: 5,
    title: "Next.js"
  },
  {
    id: 6,
    title: "Angular"
  },
  {
    id: 7,
    title: "AI"
  },
];

const projects = [
  // {
  //   name: "GPT3_Showcase",
  //   description:
  //     "Transformation d'un design Figma en site web fonctionnel, moderne et responsive. Amélioration de mes capacités actuelles en CSS.",
  //   tags: [
  //     {
  //       name: "html",
  //     },
  //     {
  //       name: "css",
  //     },
  //     {
  //       name: "react",
  //     },
  //   ],
  //   image: gpt3,
  //   source_code_link: "https://github.com/CodeShadowing95/GPT3-Webpage",
  //   app_link: "https://gpt3-ui-ux-app.netlify.app/"
  // },
  // {
  //   id: "rehobothnettoyage",
  //   name: "REHOBOTH Nettoyage",
  //   description:
  //     "Site vitrine pour une entreprise de nettoyage professionnel basée à Lyon. Besoin de nettoyer vos bureaux, nettoyage de fin de chantier,... Contactez les et obtenez un devis gratuitement. Coûts adaptés à vos budgets et qualité de service garantis.",
  //   reason: "Projet client",
  //   tags: [
  //     {
  //       name: "react",
  //     },
  //     {
  //       name: "tailwindcss",
  //     },
  //   ],
  //   image: rehobothnettoyage,
  //   source_code_link: "#",
  //   app_link: "https://rehobothnettoyage.com/",
  //   status: "Terminé",
  //   details: {
  //     fullDescription:
  //       "REHOBOTH Nettoyage est un site vitrine entreprise proposant des services de nettoyage pour particuliers et professionnels, basée à Lyon. Si vous avez besoin de nettoyer votre domicile, vos bureaux, nettoyage de fin de chantier,... Contactez les et obtenez un devis gratuitement. Coûts adaptés à vos budgets et qualité de service garantis.",
  //     keyObjectives: [
  //       "Présenter clairement les services et la valeur ajoutée",
  //       "Permettre une demande de contact/devis rapide",
  //       "Renforcer la crédibilité avec un design professionnel",
  //     ],
  //     functionalities: [
  //       "Pages services (ménage, vitres, bureaux, etc.)",
  //       "Formulaire de contact et demande de devis",
  //       "Mise en avant des engagements qualité et écologie",
  //       "Responsive design (mobile, tablette, desktop)",
  //     ],
  //   },
  // },
  // {
  //   id: "batipilote",
  //   featured: true,
  //   name: "BatiPilote",
  //   description:
  //     "Copilote IA pour les artisans du bâtiment : devis générés à partir d'une dictée vocale, facturation électronique et analyse de photos de chantier.",
  //   reason: "Projet de fin d'études",
  //   period: "2025 – 2026",
  //   role: "Architecture et développement full-stack",
  //   tags: [
  //     {
  //       name: "react native",
  //     },
  //     {
  //       name: "nextjs",
  //     },
  //     {
  //       name: "nodejs",
  //     },
  //     {
  //       name: "ai",
  //     },
  //     {
  //       name: "python",
  //     },
  //     {
  //       name: "postgresql",
  //     },
  //   ],
  //   image: batipilote,
  //   video: batipiloteShowcase,
  //   // Vidéo de présentation complète, affichée en tête de la fiche projet
  //   showcase: batipiloteShowcase,
  //   source_code_link: "",
  //   app_link: "",
  //   private_repo: true,
  //   logo: batipiloteLogo,
  //   gallery: [
  //     { src: batipiloteScreen1, caption: "Onboarding : dicter un devis à voix haute" },
  //     { src: batipiloteScreen2, caption: "Onboarding : analyse IA d'une photo de chantier" },
  //     { src: batipiloteScreen3, caption: "Onboarding : facturation électronique via les plateformes agréées" },
  //     { src: batipiloteScreen4, caption: "Onboarding : suivi des factures et relances" },
  //     { src: batipiloteScreen5, caption: "Connexion et inscription" },
  //     { src: batipiloteScreen6, caption: "Nouveau devis par dictée vocale, transcrit en direct" },
  //     { src: batipiloteScreen7, caption: "Aperçu PDF du devis généré" },
  //     { src: batipiloteScreen8, caption: "Facture au format Factur-X (PDF + XML)" },
  //   ],
  //   status: "Prototype",
  //   details: {
  //     context: "Projet de fin d'études mené avec un associé développeur Python, en collaboration avec des artisans du bâtiment.",
  //     fullDescription: "Les artisans du bâtiment perdent un temps précieux sur les devis, la facturation et la réglementation. BatiPilote est un copilote IA qui génère des devis à partir d'une dictée vocale, gère la facturation électronique Factur-X, répond aux questions réglementaires et analyse des photos de chantier. J'ai conçu l'architecture du produit et assuré le développement full-stack : une application mobile React Native, un site Next.js, une API Node.js et un service IA en Python, développé avec un associé développeur Python et en collaboration avec les artisans du bâtiment, ceci connecté à OpenAI et LangChain, le tout avec une intégration continue.",
  //     keyObjectives: [
  //       "Générer un devis complet à partir d'une simple dictée vocale",
  //       "Automatiser la facturation électronique au format Factur-X",
  //       "Aider l'artisan sur chantier : réglementation et diagnostic photo",
  //     ],
  //     functionalities: [
  //       "Dictée vocale transcrite (Whisper) et transformée en devis (GPT-4o)",
  //       "Facturation électronique Factur-X",
  //       "Assistant réglementaire (LangChain, PostgreSQL + pgvector)",
  //       "Analyse de photos de chantier",
  //       "Application mobile React Native / Expo et site Next.js",
  //       "Monorepo Turborepo, CI GitHub Actions, Docker, Sentry",
  //     ],
  //   }
  // },
  {
    id: "kamercare",
    featured: true,
    name: "KamerCare",
    description: "Plateforme médicale moderne conçue pour le système de santé camerounais, facilitant la connexion entre patients et professionnels de santé.",
    reason: "Projet personnel",
    tags: [
      {
        name: "laravel",
      },
      {
        name: "nextjs",
      },
      {
        name: "tailwindcss",
      },
      {
        name: "restapi",
      }
    ],
    image: kamercare,
    source_code_link: "https://github.com/CodeShadowing95/KamerCare",
    app_link: "https://github.com/CodeShadowing95/KamerCare",
    status: "En cours",
    details: {
      fullDescription: "KamerCare est une plateforme de santé pensée pour le contexte camerounais. Elle centralise la recherche de médecins et établissements, la prise de rendez-vous, la gestion du dossier patient et la communication sécurisée entre patients et praticiens. L'application met l'accent sur l'accessibilité, la confidentialité et la fiabilité des services, avec une architecture modulaire et performante.",
      keyObjectives: [
        "Faciliter la mise en relation patients–professionnels de santé",
        "Standardiser et sécuriser la gestion des rendez-vous",
        "Garantir la confidentialité des données médicales",
        "Offrir une expérience fluide sur web et mobile",
      ],
      functionalities: [
        "Recherche avancée de médecins par spécialité et ville",
        "Prise et gestion de rendez-vous avec rappels",
        "Messagerie chiffrée patient–praticien",
        "Dossier patient avec historiques et documents",
        "Tableaux de bord pour praticiens et patients",
      ],
    }
  },
  {
    id: "bikemapper",
    featured: true,
    name: "BikeMapper",
    description:"Application de géolocalisation de stations de vélos en libre-service en France et dans le monde. Vous pouvez découvrir la liste des services, les bornes de station, les détails de la station par ville.",
    reason: "Test technique",
    tags: [
      {
        name: "react",
      },
      {
        name: "nodejs",
      },
      {
        name: "tailwindcss",
      },
      {
        name: "restapi",
      },
    ],
    image: bikemapper,
    video: bikemapperPreview,
    source_code_link: "https://github.com/CodeShadowing95/velolibreservice",
    app_link: "https://bikemapper.netlify.app/",
    status: "Terminé",
    details: {
      context: "Test technique réalisé dans le cadre d'une recherche d'alternance.",
      results: [
        "Test technique validé",
      ],
      fullDescription: "BikeMapper est une application de cartographie des services de vélos en libre-service. Elle agrège les données des réseaux disponibles (France et international), affiche les stations sur une carte interactive, expose les disponibilités en temps réel et permet de consulter des détails par ville et par opérateur. L'interface est optimisée pour la découverte et la planification rapide.",
      keyObjectives: [
        "Centraliser les réseaux de vélos en libre-service",
        "Offrir une cartographie claire et réactive",
        "Informer sur disponibilité et caractéristiques des stations",
        "Permettre la recherche par ville et opérateur",
      ],
      functionalities: [
        "Carte interactive des stations",
        "Filtrage par ville, réseau et type de service",
        "Fiches détaillées de station (bornes, horaires, disponibilité)",
        "Favoris et navigation rapide",
      ],
    }
  },
  {
    id: "pokedexhub",
    name: "Pokedex Hub",
    description:
      "Pour les amateurs de Pokemon, plongez dans une présentation époustouflante de chaque Pokémon, découvrez leurs caractéristiques uniques.",
    reason: "Test technique",
    tags: [
      {
        name: "angular",
      },
      {
        name: "typescript",
      },
      {
        name: "tailwindcss",
      },
    ],
    image: pokedexhub,
    video: pokedexhubPreview,
    source_code_link: "https://github.com/CodeShadowing95/pokepokedex.git",
    app_link: "https://pokecraftershub.netlify.app/",
    status: "Terminé",
    details: {
      context: "Test technique réalisé dans le cadre d'une recherche d'alternance.",
      results: [
        "Test technique validé",
        "Rendu très apprécié par l'entreprise",
      ],
      fullDescription: "Pokedex Hub est une expérience immersive pour les fans de Pokémon. L'application présente chaque Pokémon avec des visuels soignés, des statistiques détaillées, des types et faiblesses, ainsi que des informations complémentaires. La navigation est pensée pour une exploration rapide et agréable.",
      keyObjectives: [
        "Proposer une encyclopédie Pokémon ergonomique",
        "Rendre l’exploration visuelle et informative",
        "Offrir filtres et recherches performants",
      ],
      functionalities: [
        "Catalogue complet des Pokémon",
        "Recherche par nom, type et génération",
        "Fiches détaillées (stats, types, faiblesses)",
        "Favoris et navigation par catégories",
      ],
    }
  },
  {
    id: "curriqulumai",
    name: "Curriqulum.ai",
    description:
      "Application web sophistiquée qui utilise l'IA pour garantir une compatibilité 100% ATS de tout CV. Notre solution maximise ainsi vos chances d'obtenir un entretien.",
    reason: "Projet personnel",
    tags: [
      {
        name: "react",
      },
      {
        name: "react-router v7",
      },
      {
        name: "typescript",
      },
      {
        name: "ai",
        label: "Puter.js (IA)",
      },
      {
        name: "tailwindcss",
      },
      {
        name: "vite",
      },
      {
        name: "pdfjs",
      },
      {
        name: "zustand",
      },
      {
        name: "docker",
      },
      {
        name: "vercel",
      },
      {
        name: "git",
      },
    ],
    image: curriqulumai,
    video: curriqulumPreview,
    source_code_link: "https://github.com/CodeShadowing95/ai-resume-analyzer.git",
    app_link: "https://curriqulum-ai.netlify.app/",
    status: "Terminé",
    details: {
      fullDescription: "Curriqulum.ai est une application d’analyse de CV assistée par IA, conçue pour garantir une compatibilité 100% ATS. Elle scanne la structure et le contenu, identifie les points d’amélioration et propose des recommandations pour augmenter vos chances d’obtenir un entretien.",
      keyObjectives: [
        "Assurer la compatibilité ATS des CV",
        "Fournir des recommandations claires et actionnables",
        "Automatiser l’analyse et le scoring",
      ],
      functionalities: [
        "Analyse IA de la structure et des mots-clés",
        "Score ATS et rapport d’amélioration",
        "Suggestions personnalisées et export",
        "Historique des analyses",
      ],
    }
  },
  {
    id: "appleclone",
    featured: true,
    name: "Apple 2.0",
    description:
      "Site vitrine clone de Apple. Navigation fluide, animations GSAP, festin de visuels 3D des dernières sorties de iPhone. Simplement beau.",
    reason: "Projet personnel",
    tags: [
      {
        name: "react",
      },
      {
        name: "tailwindcss",
      },
    ],
    image: appleclone,
    video: applePreview,
    source_code_link: "https://github.com/CodeShadowing95/apple_website_clone",
    app_link: "https://mynewappleclone.netlify.app/",
    status: "Terminé",
    details: {
      fullDescription: "Apple 2.0 est un site vitrine inspiré des pages marketing d’Apple, avec une navigation fluide, des animations GSAP et des visuels 3D mettant en avant les derniers iPhone. Le projet se concentre sur la performance et l’esthétique.",
      keyObjectives: [
        "Reproduire une expérience marketing premium",
        "Mettre en avant visuels 3D et animations",
        "Optimiser performance et accessibilité",
      ],
      functionalities: [
        "Sections vitrines animées",
        "Effets parallax et transitions GSAP",
        "Galeries produits interactives",
        "CTA et navigation bento",
      ],
    }
  },
  {
    id: "brainwave",
    name: "Brainwave",
    description:
      "Landing Page avec des effets parallax élégants et des mises en page bento pour présenter la puissance de nos services alimentés par l'IA. (In process...)",
    reason: "Projet personnel",
    tags: [
      {
        name: "react",
      },
      {
        name: "tailwindcss",
      },
    ],
    image: brainwave,
    video: brainwavePreview,
    source_code_link: "https://github.com/CodeShadowing95/ai_is_coming",
    app_link: "https://brainwave-tech.netlify.app/",
    status: "Terminé",
    details: {
      fullDescription: "Brainwave est une landing page moderne présentant des services alimentés par l’IA, avec mises en page bento et effets parallax. L’accent est mis sur la narration visuelle et la conversion.",
      keyObjectives: [
        "Présenter clairement l’offre IA",
        "Maximiser l’engagement visuel",
        "Favoriser la conversion via CTA",
      ],
      functionalities: [
        "Sections bento modulaires",
        "Parallax et micro-interactions",
        "CTA dynamiques et suivi",
        "FAQ et témoignages",
      ],
    }
  },
  {
    id: "youwatch",
    featured: true,
    name: "YouWatch",
    description:
      "Pseudo-clone de la plateforme YouTube permettant de voir n'importe quelle vidéo, rechercher des vidéos précises, consulter des vidéos par catégorie et par chaîne, etc...",
    reason: "Projet personnel",
    tags: [
      {
        name: "react",
      },
      {
        name: "nodejs",
      },
      {
        name: "restapi",
      },
      {
        name: "materialui",
      },
    ],
    image: youwatch,
    video: youwatchPreview,
    source_code_link: "https://github.com/CodeShadowing95/yutubewatch",
    app_link: "https://yutubewatch.netlify.app/",
    status: "En cours",
    details: {
      fullDescription: "YouWatch est un pseudo-clone de YouTube permettant d’explorer, rechercher et visionner des vidéos par catégories et par chaînes. Le projet met en œuvre une intégration d’API, une interface réactive et une navigation intuitive.",
      keyObjectives: [
        "Permettre la recherche et la découverte de contenus",
        "Proposer une expérience de lecture fluide",
        "Structurer les contenus par chaîne et catégories",
      ],
      functionalities: [
        "Recherche de vidéos et suggestions",
        "Lecture embarquée et pages de chaîne",
        "Classement par catégories",
        "Historique et favoris (selon implémentation)",
      ],
    }
  },
  // {
  //   name: "Lyriks",
  //   description:
  //     "Site web de streaming temporaire (limité par par l'API utilisé) de musiques, découvrir les nouveaux morceaux, les artistes du moment, etc... Assez conviviale",
  //   tags: [
  //     {
  //       name: "react",
  //     },
  //     {
  //       name: "nodejs",
  //     },
  //     {
  //       name: "redux",
  //     },
  //     {
  //       name: "restapi",
  //     },
  //   ],
  //   image: lyriks,
  //   source_code_link: "https://github.com/CodeShadowing95/Lyriks",
  //   app_link: "https://na-lyriks-app.netlify.app/"
  // },
  // {
  //   id: "memorymingle",
  //   name: "Memory Mingle",
  //   description:
  //     "Application de création et de partage de photos (un peu comme Pinterest🙂), listing de photos et créations par catégorie et par utilisateur, recherche de photos,...",
  //   reason: "Projet personnel",
  //   tags: [
  //     {
  //       name: "react",
  //     },
  //     {
  //       name: "nodejs",
  //     },
  //     {
  //       name: "mongodb",
  //     },
  //     {
  //       name: "tailwindcss",
  //     },
  //   ],
  //   image: lugia,
  //   source_code_link: "https://github.com/CodeShadowing95/lugia",
  //   app_link: "https://lugia-app.netlify.app/",
  //   status: "En cours",
  //   details: {
  //     fullDescription: "Memory Mingle est une application sociale orientée autour des images. Les utilisateurs créent, classent et partagent des photos par catégorie, explorent les créations d’autres utilisateurs et recherchent des contenus inspirants. L’objectif est de proposer une expérience simple et moderne pour la curation visuelle.",
  //     keyObjectives: [
  //       "Faciliter la création et le partage de visuels",
  //       "Offrir une exploration par catégories et auteurs",
  //       "Proposer une recherche rapide et pertinente",
  //     ],
  //     functionalities: [
  //       "Publication et édition de photos",
  //       "Catégorisation et tags",
  //       "Recherche par mots-clés et catégories",
  //       "Profils utilisateurs et listes de créations",
  //       "Aimer/enregistrer des contenus",
  //     ],
  //   }
  // },
  {
    id: "animevault",
    name: "Anime Vault",
    description:
      "Application web de diffusion en streaming d'Animés japonais en HD, explorer tout type d'Animés par catégorie, par nom, par nom d'auteur, par titre, etc...",
    reason: "Projet personnel",
    tags: [
      {
        name: "nextjs",
      },
      {
        name: "nodejs",
      },
      {
        name: "restapi",
      },
      {
        name: "tailwindcss",
      },
    ],
    image: animevault,
    source_code_link: "https://github.com/CodeShadowing95/anime237",
    app_link: "https://anime237.vercel.app/",
    status: "Terminé",
    details: {
      fullDescription: "Anime Vault est une plateforme de streaming d’animés japonais en HD. Elle permet d’explorer les œuvres par catégories, titres, auteurs et d’accéder à des fiches détaillées. L’expérience privilégie la performance et la qualité vidéo.",
      keyObjectives: [
        "Proposer un catalogue riche d’animés",
        "Offrir un streaming fluide en HD",
        "Faciliter l’exploration par filtres et recherches",
      ],
      functionalities: [
        "Catalogue par genres et auteurs",
        "Recherche et filtres multiples",
        "Lecteur vidéo intégré",
        "Fiches œuvres (synopsis, épisodes)",
      ],
    }
  },
  // {
  //   name: "Employee Management",
  //   description: "Application de gestion des employés. Ajouter, modifier, supprimer des employés. Gérer les informations des employés.",
  //   tags: [
  //     {
  //       name: "angular",
  //     },
  //     {
  //       name: "springboot",
  //     },
  //     {
  //       name: "restapi",
  //     },
  //     {
  //       name: "tailwindcss",
  //     },
  //   ],
  //   image: empmanagement,
  //   source_code_link: "https://github.com/CodeShadowing95/employeeManagement",
  //   app_link: "https://github.com/CodeShadowing95/employeeManagementt"
  // },
  // {
  //   name: "Promptopia",
  //   description:
  //     "Promptopia est un outil open-source d'IA pour le monde moderne qui permet de découvrir, de créer et de partager des messages créatifs. (En développement)",
  //   tags: [
  //     {
  //       name: "nextjs",
  //     },
  //     {
  //       name: "nodejs",
  //     },
  //     {
  //       name: "typescript",
  //     },
  //     {
  //       name: "restapi",
  //     },
  //     {
  //       name: "tailwindcss",
  //     },
  //   ],
  //   image: promptopia,
  //   source_code_link: "https://github.com/CodeShadowing95/prompts",
  //   app_link: "https://promptopia-mu-livid.vercel.app/"
  // },
  {
    id: "servermanagement",
    name: "Server Management",
    description:
      "Ajoutez et supprimez des serveurs, activez et désactivez les serveurs inutilisés, gérez la connectivité avec vos différents serveurs,...",
    reason: "Projet personnel",
    tags: [
      {
        name: "angular",
      },
      {
        name: "springboot",
      },
      {
        name: "restapi",
      },
      {
        name: "tailwindcss",
      },
    ],
    image: servermanagement,
    source_code_link: "https://github.com/CodeShadowing95/ServerManagement",
    app_link: "https://github.com/CodeShadowing95/ServerManagement",
    status: "Terminé",
    details: {
      fullDescription: "Server Management est une application de supervision et de gestion de serveurs. Elle permet d’ajouter/supprimer des serveurs, d’activer/désactiver ceux inutilisés et de contrôler l’état de connectivité. Architecture fullstack visant robustesse et lisibilité.",
      keyObjectives: [
        "Centraliser l’administration des serveurs",
        "Surveiller l’état et la connectivité",
        "Simplifier les opérations courantes",
      ],
      functionalities: [
        "CRUD des serveurs",
        "Activation/désactivation et états",
        "Tableaux de bord et filtres",
        "Historique des opérations",
      ],
    }
  },
];

const socials = [
  {
    name: "Linkedin",
    logo: linkedin,
    link: "https://www.linkedin.com/in/frank-patrick-namegni/",
  },
  {
    name: "Github",
    logo: github,
    link: "https://github.com/CodeShadowing95",
  },
]

const keyAchievements = [
  {
    value: "~5 min",
    label: "de build CI au lieu de 25-30 min",
    link: { to: "/etude-de-cas/build-ci", label: "Lire l'étude de cas" },
  },
  {
    value: "130+",
    label: "applications mises à jour et sécurisées",
  },
  {
    value: "2 500+",
    // label: "offres d’emploi collectées automatiquement (-80 % de traitement manuel)",
    label: "offres d’emploi collectées traitées",
  },
  {
    value: "2019",
    label: "premier poste de développeur, 10+ applications métier livrées",
  },
];

// Parcours affiché sur le globe de la section Contact (du plus ancien au plus récent)
const journey = [
  {
    city: "Yaoundé, Cameroun",
    period: "2015 – 2021",
    detail: "Licence IAI, 1er poste chez Univers Binaire, Pristy Délices",
    lat: 3.87,
    lon: 11.52,
    labelClassName: "ml-3 -translate-y-1/2",
  },
  {
    city: "Lyon",
    period: "2022 – 2025",
    detail: "Bachelor ESTIAM, TeePy Job, Index.tv",
    lat: 45.76,
    lon: 4.84,
    labelClassName: "-ml-3 -translate-x-full -translate-y-1/2",
  },
  {
    city: "Strasbourg",
    period: "Depuis 2025",
    detail: "Mastère Ynov, Hapticmedia",
    lat: 48.57,
    lon: 7.75,
    labelClassName: "ml-3 -translate-y-full",
  },
];

const education = [
  {
    years: "2024 – 2026",
    degree: "Mastère Expert développement full stack",
    level: "Bac+5",
    school: "Ynov Campus, Lyon puis Strasbourg",
    note: "En alternance",
  },
  {
    years: "2022 – 2024",
    degree: "Bachelor Analyste en Informatique Appliquée, spécialité Data & Application Design",
    level: "Bac+3",
    school: "ESTIAM, Lyon",
    note: "Major de promotion",
  },
  {
    years: "2015 – 2018",
    degree: "Licence professionnelle Informatique",
    level: "Bac+3",
    school: "IAI-Cameroun, Yaoundé",
  },
];

const languages = [
  { name: "Français", level: "Courant" },
  { name: "Allemand", level: "C1" },
  { name: "Anglais", level: "B2" },
];


export { services, technologies, experiences, testimonials, projects, projectCategories, socials, keyAchievements, education, languages, journey };