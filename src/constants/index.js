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
  batipilote,
  linkedin,
  github,
} from "../assets";

// Galeries de captures par projet
const batipiloteLogo = "/assets/ProjectAssets/batipilote/logo.webp";
const bikemapperPreview = "/assets/ProjectAssets/bikemapper/demo/bikemapper-preview.mp4";
const bikemapperShowcase = "/assets/ProjectAssets/bikemapper/demo/bikemapper-showcase.mp4";
const youwatchPreview = "/assets/ProjectAssets/youwatch/demo/youwatch-preview.mp4";
const youwatchShowcase = "/assets/ProjectAssets/youwatch/demo/youwatch-showcase.mp4";
const kmertubeLogo = "/assets/ProjectAssets/kmertube/logo.svg";
const kmertubeCover = "/assets/ProjectAssets/kmertube/gallery/kmertube-cover.webp";
const kmertubeShowcase = "/assets/ProjectAssets/kmertube/demo/kmertube-showcase.mp4";
const kmertubeAccueil = "/assets/ProjectAssets/kmertube/gallery/kmertube-01-accueil.webp";
const kmertubeCategorie = "/assets/ProjectAssets/kmertube/gallery/kmertube-02-categorie.webp";
const kmertubeRecherche = "/assets/ProjectAssets/kmertube/gallery/kmertube-03-recherche.webp";
const kmertubeFicheVideo = "/assets/ProjectAssets/kmertube/gallery/kmertube-04-fiche-video.webp";
const kmertubeChaine = "/assets/ProjectAssets/kmertube/gallery/kmertube-05-chaine.webp";
const kmertubeMusique = "/assets/ProjectAssets/kmertube/gallery/kmertube-06-musique.webp";
const curriqulumPreview = "/assets/ProjectAssets/curriqulum.ai/demo/curriqulum-preview.mp4";
const pokecraftCover = "/assets/ProjectAssets/poke-craft/gallery/pokecraft-cover.webp";
const pokecraftLogo = "/assets/ProjectAssets/poke-craft/logo.webp";
const pokecraftPreview = "/assets/ProjectAssets/poke-craft/demo/pokecraft-preview.mp4";
const pokecraftShowcase = "/assets/ProjectAssets/poke-craft/demo/pokecraft-showcase.mp4";
const pokecraftAvatar = "/assets/ProjectAssets/poke-craft/gallery/pokecraft-01-avatar.webp";
const pokecraftStarter = "/assets/ProjectAssets/poke-craft/gallery/pokecraft-02-starter.webp";
const pokecraftPokedex = "/assets/ProjectAssets/poke-craft/gallery/pokecraft-03-pokedex.webp";
const pokecraftFichePokemon = "/assets/ProjectAssets/poke-craft/gallery/pokecraft-04-fiche-pokemon.webp";
const pokecraftArene = "/assets/ProjectAssets/poke-craft/gallery/pokecraft-05-arene.webp";
const pokecraftDuel = "/assets/ProjectAssets/poke-craft/gallery/pokecraft-06-duel.webp";
const pokecraftCampagne = "/assets/ProjectAssets/poke-craft/gallery/pokecraft-07-campagne.webp";
const pokecraftCollection = "/assets/ProjectAssets/poke-craft/gallery/pokecraft-08-collection.webp";
const pokecraftEquipe = "/assets/ProjectAssets/poke-craft/gallery/pokecraft-09-equipe.webp";
const pokecraftBooster = "/assets/ProjectAssets/poke-craft/gallery/pokecraft-10-booster.webp";
const batipiloteShowcase = "/assets/ProjectAssets/batipilote/demo/batipilote-showcase.mp4";
const applePreview = "/assets/ProjectAssets/apple/demo/apple-preview.mp4";
const appleShowcase = "/assets/ProjectAssets/apple/demo/apple-showcase.mp4";
const brainwavePreview = "/assets/ProjectAssets/brainwave/demo/brainwave-preview.mp4";
const batipiloteScreen1 = "/assets/ProjectAssets/batipilote/gallery/1.webp";
const batipiloteScreen2 = "/assets/ProjectAssets/batipilote/gallery/2.webp";
const batipiloteScreen3 = "/assets/ProjectAssets/batipilote/gallery/3.webp";
const batipiloteScreen4 = "/assets/ProjectAssets/batipilote/gallery/4.webp";
const batipiloteScreen5 = "/assets/ProjectAssets/batipilote/gallery/5.webp";
const batipiloteScreen6 = "/assets/ProjectAssets/batipilote/gallery/6.webp";
const batipiloteScreen7 = "/assets/ProjectAssets/batipilote/gallery/7.webp";
const batipiloteScreen8 = "/assets/ProjectAssets/batipilote/gallery/8.webp";
const merkod = "/assets/ProjectAssets/merkod/gallery/merkod-cover.webp";
const merkodLogo = "/assets/ProjectAssets/merkod/merkod-logo.webp";
const merkodPreview = "/assets/ProjectAssets/merkod/demo/merkod-card.mp4";
const merkodShowcase = "/assets/ProjectAssets/merkod/demo/merkod-showcase.mp4";
const merkodExplorer = "/assets/ProjectAssets/merkod/gallery/merkod-01-explorer.webp";
const merkodRecherche = "/assets/ProjectAssets/merkod/gallery/merkod-02-recherche.webp";
const merkodFiche = "/assets/ProjectAssets/merkod/gallery/merkod-03-fiche-outil.webp";
const merkodCoupon = "/assets/ProjectAssets/merkod/gallery/merkod-04-coupon-copie.webp";
const merkodVote = "/assets/ProjectAssets/merkod/gallery/merkod-05-vote.webp";
const merkodCreateur = "/assets/ProjectAssets/merkod/gallery/merkod-06-page-createur.webp";
const merkodSombre = "/assets/ProjectAssets/merkod/gallery/merkod-07-mode-sombre.webp";
const merkodEspaceCreateur = "/assets/ProjectAssets/merkod/gallery/merkod-08-espace-createur.webp";
const merkodAdminStats = "/assets/ProjectAssets/merkod/gallery/merkod-09-admin-stats.webp";
const merkodAdminAccueil = "/assets/ProjectAssets/merkod/gallery/merkod-10-admin-accueil.webp";

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

// Domaines de compétences de la section Profil (textes { fr, en } quand ils diffèrent)
const services = [
  {
    title: "Front-end",
    icon: web,
    items: ["React", "Next.js", "Vue.js / Nuxt", "shadcn", "React Native", "TypeScript", "Tailwind CSS"],
  },
  {
    title: { fr: "Back-end et API", en: "Back-end and APIs" },
    icon: backend,
    items: ["Node.js / Express / Hono", "PHP / Laravel", "Java / Spring Boot", "Strapi", { fr: "API REST", en: "REST APIs" }],
  },
  {
    title: { fr: "Données", en: "Data" },
    icon: world,
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Elasticsearch"],
  },
  {
    title: { fr: "DevOps et Cloud", en: "DevOps and Cloud" },
    icon: creator,
    items: ["GitHub Actions", "Azure DevOps", "AWS", "Linux", "Docker, Kubernetes, Terraform"],
  },
  {
    title: { fr: "Sécurité et Qualité", en: "Security and Quality" },
    icon: mobile,
    items: [
      { fr: "Sécurité applicative", en: "Application security" },
      { fr: "Politiques CSP", en: "CSP policies" },
      { fr: "Tests unitaires / Jest", en: "Unit tests / Jest" },
      "SonarQube",
    ],
  },
  {
    title: { fr: "IA", en: "AI" },
    icon: openai,
    items: [{ fr: "IA générative", en: "Generative AI" }, "OpenAI API", "LangChain", "Python"],
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
    title: { fr: "Développeur Full-Stack et DevOps", en: "Full-Stack & DevOps Developer" },
    company_name: "Hapticmedia",
    location: { fr: "Strasbourg · Alternance", en: "Strasbourg, France · Work-study" },
    stack: "Nuxt / Vue.js, TypeScript, Node.js, Strapi, AWS (S3, CloudFront), GitHub Actions",
    caseStudy: {
      to: "/etude-de-cas/build-ci",
      label: { fr: "Lire l'étude de cas : un build CI divisé par 5", en: "Read the case study: a CI build 5× faster" },
    },
    context: {
      fr: "Hapticmedia permet aux marques de présenter leurs produits en 3D et en réalité augmentée sur leur site. Dans une équipe d'une vingtaine de personnes, on m'a confié des sujets exigeants pour mon niveau, et l'équipe m'a formé de façon intensive au back-end.",
      en: "Hapticmedia lets brands showcase their products in 3D and augmented reality on their websites. In a team of about twenty, I was trusted with demanding topics for my level, and the team trained me intensively on back-end work.",
    },
    quote: {
      text: { fr: "Son investissement, sa curiosité et sa volonté d'apprendre.", en: "His commitment, his curiosity and his eagerness to learn." },
      author: { fr: "Loïc Muhlmann, directeur général d'Hapticmedia (lettre de recommandation)", en: "Loïc Muhlmann, CEO of Hapticmedia (letter of recommendation)" },
    },
    icon: hapticmedia,
    ringColor: "#22d3ee",
    highlight: true,
    date: { fr: "Janvier 2026 – Septembre 2026", en: "January 2026 – September 2026" },
    points: [
      {
        fr: "Optimisation de la CI du site corporate : build ramené de 25-30 min à environ 5 min (cache des requêtes Strapi, compression automatique des images).",
        en: "Sped up the corporate website CI: build time cut from 25-30 min to about 5 min (Strapi request caching, automatic image compression).",
      },
      {
        fr: "Mise à niveau Node.js / npm de 130+ applications (30+ web, 100+ 3D) : plusieurs milliers de vulnérabilités corrigées, chaque mise à jour validée par tests, build et Pull Request.",
        en: "Upgraded Node.js / npm across 130+ applications (30+ web, 100+ 3D): several thousand vulnerabilities fixed, each upgrade validated by tests, build and pull request.",
      },
      {
        fr: "Sécurisation de 4 environnements (sandbox, développement, test, production) par des Content Security Policies centralisées, et évolution de la CLI interne de livraison (S3 / CloudFront, npm).",
        en: "Secured 4 environments (sandbox, development, staging, production) with centralised Content Security Policies, and extended the internal delivery CLI (S3 / CloudFront, npm).",
      },
      {
        fr: "Migration du site de Nuxt 3 à Nuxt 4 (158 fichiers) avec un démarrage serveur 3 fois plus rapide, et prévisualisation sécurisée Strapi ↔ Nuxt pour l'équipe éditoriale.",
        en: "Migrated the website from Nuxt 3 to Nuxt 4 (158 files) with a 3× faster server start, and built a secure Strapi ↔ Nuxt preview for the editorial team.",
      },
    ],
  },
  {
    title: { fr: "Développeur Web Full-Stack", en: "Full-Stack Web Developer" },
    company_name: "TeePy Job",
    location: { fr: "Lyon · Alternance", en: "Lyon, France · Work-study" },
    stack: "PHP, jQuery, AJAX, WordPress, Elasticsearch, MySQL",
    context: {
      fr: "TeePy Job est un site d'offres d'emploi qui met en relation candidats et recruteurs. Dans une équipe de 8 personnes, je travaillais chaque jour avec le CTO, les commerciaux, le marketing et les recruteurs, et chacune de mes modifications était relue par le CTO.",
      en: "TeePy Job is a job board connecting candidates and recruiters. In a team of 8, I worked daily with the CTO, sales, marketing and recruiters, and the CTO reviewed every change I made.",
    },
    icon: teepyjob,
    ringColor: "#7c6cff",
    date: { fr: "Juin 2024 – Juillet 2025", en: "June 2024 – July 2025" },
    points: [
      {
        fr: "Développement d’un système de récupération automatique de 2500+ offres d’emploi depuis divers ATS recruteurs via API et flux XML. Réduction du temps de traitement manuel de 80%.",
        en: "Built an automated system pulling 2,500+ job offers from recruiters' ATS through APIs and XML feeds, cutting manual processing time by 80%.",
      },
      {
        fr: "Mise en place d’un pipeline d’analyse et pré-traitement des annonces, avec filtrage et enrichissement des données (catégorisation, géolocalisation) sur une base de 200000+ profils. Gain de 40% en rapidité sur la publication des offres.",
        en: "Set up a pipeline to analyse and pre-process job ads, filtering and enriching the data (categories, geolocation) over a base of 200,000+ profiles. Offers were published 40% faster.",
      },
      {
        fr: "Développement d’algorithmes de matching automatique basé sur géolocalisation et critères d’offres, suivi de mailing et gestion de priorités d’annonces. Augmentation de 30% du taux de mise en relation candidats/recruteurs et amélioration du délai de proposition des profils.",
        en: "Developed automatic matching algorithms based on location and job criteria, with mailing follow-up and ad prioritisation. Candidate / recruiter matches rose by 30% and profiles were proposed sooner.",
      },
      {
        fr: "Formation de la chargée de sourcing à l'application : trouver les candidats, récupérer et valider leurs CV, les rapprocher des offres, leur proposer des postes et les relancer. Elle l'utilise aujourd'hui en autonomie.",
        en: "Trained the sourcing officer on the application: finding candidates, collecting and checking their résumés, matching them with offers, proposing roles and following up. She now uses it on her own.",
      },
    ],
  },
  {
    title: { fr: "Développeur web Junior", en: "Junior Web Developer" },
    company_name: "Univers Binaire SARL",
    location: { fr: "Yaoundé, Cameroun", en: "Yaoundé, Cameroon" },
    stack: "Java / Spring Boot, Laravel, Angular, React, TypeScript, PostgreSQL, MySQL",
    context: {
      fr: "Univers Binaire crée des logiciels sur mesure pour des écoles, des banques, des agences de voyages, des établissements de santé et des hôtels. Mon premier poste, dans une équipe d'une vingtaine de personnes, où j'ai appris à travailler pour un client.",
      en: "Univers Binaire builds custom software for schools, banks, travel agencies, healthcare providers and hotels. My first job, in a team of about twenty, where I learned to work for a client.",
    },
    icon: ub,
    ringColor: "#b07cff",
    date: { fr: "Octobre 2019 – Juillet 2021", en: "October 2019 – July 2021" },
    points: [
      {
        fr: "Conception et développement de 10+ applications web métier pour des clients professionnels (banques, établissements scolaires, agences de voyages), en Java / Spring Boot, Laravel, Angular ou React selon les projets.",
        en: "Designed and built 10+ business web applications for professional clients (banks, schools, travel agencies) in Java / Spring Boot, Laravel, Angular or React depending on the project.",
      },
      {
        fr: "Développement et maintenance d'API REST (utilisateurs, transactions, réservations, données métier) et conception des bases PostgreSQL / MySQL associées.",
        en: "Developed and maintained REST APIs (users, transactions, bookings, business data) and designed the related PostgreSQL / MySQL databases.",
      },
      {
        fr: "Collaboration avec les équipes techniques et fonctionnelles : analyse des besoins, estimation, documentation et évolution des solutions livrées.",
        en: "Worked with technical and business teams: requirements analysis, estimates, documentation and ongoing improvements to delivered solutions.",
      },
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
  {
    id: "pokecraft",
    featured: true,
    name: "Pokécraft",
    description:
      "Les 1 025 Pokémon en français, un duel de cartes au tour par tour contre la machine, une campagne d'arènes et une collection qui grandit chaque jour.",
    reason: "Test technique validé",
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
    image: pokecraftCover,
    video: pokecraftPreview,
    // Vidéo de présentation complète (avec musique), affichée en tête de la fiche projet
    showcase: pokecraftShowcase,
    logo: pokecraftLogo,
    source_code_link: "https://github.com/CodeShadowing95/pokepokedex.git",
    app_link: "https://poke-craft.netlify.app/",
    gallery: [
      { src: pokecraftAvatar, caption: "Bienvenue : choisis ton dresseur parmi huit avatars" },
      { src: pokecraftStarter, caption: "Choisis ton premier Pokémon, il devient ta première carte" },
      { src: pokecraftPokedex, caption: "Pokédex national : 1025 Pokémon, filtres par région, tri et type" },
      { src: pokecraftFichePokemon, caption: "Fiche Pokémon : illustration, type et numéro" },
      { src: pokecraftArene, caption: "Arène : ton équipe de trois cartes contre la machine" },
      { src: pokecraftDuel, caption: "Duel au tour par tour, capacités et efficacité des types" },
      { src: pokecraftCampagne, caption: "Campagne : huit arènes par région, puis la Ligue" },
      { src: pokecraftCollection, caption: "Collection : les cartes gagnent de l'expérience et évoluent" },
      { src: pokecraftEquipe, caption: "Atelier d'équipe : couverture des 18 types" },
      { src: pokecraftBooster, caption: "Booster du jour : cinq nouvelles cartes à ouvrir" },
    ],
    status: "Terminé",
    details: {
      context: "Test technique réalisé dans le cadre d'une recherche d'alternance.",
      results: [
        "Test technique validé",
        "Rendu très apprécié par l'entreprise",
      ],
      fullDescription: "Pokécraft est un Pokédex « papier & encre » devenu jeu de cartes. On choisit son dresseur et son premier Pokémon, puis on explore les 1 025 Pokémon en français, on affronte la machine en duel au tour par tour, on progresse dans une campagne d'arènes par région et on fait grandir sa collection : les cartes gagnent de l'expérience et évoluent. Toute la progression reste dans le navigateur, sans compte.",
      keyObjectives: [
        "Proposer une encyclopédie Pokémon ergonomique",
        "Rendre l’exploration visuelle et informative",
        "Offrir filtres et recherches performants",
      ],
      functionalities: [
        "Pokédex national : 1 025 Pokémon, recherche, filtres par région et par type",
        "Duel de cartes au tour par tour avec efficacité des types",
        "Campagne : huit arènes par région, puis la Ligue",
        "Collection, expérience, évolutions et booster quotidien",
        "Atelier d'équipe avec couverture des 18 types",
      ],
    }
  },
  {
    id: "batipilote",
    featured: true,
    name: "BatiPilote",
    description:
      "Copilote IA pour les artisans du bâtiment : devis générés à partir d'une dictée vocale, facturation électronique et analyse de photos de chantier.",
    reason: "Projet de fin d'études",
    period: "2025 – 2026",
    role: "Architecture et développement full-stack",
    tags: [
      {
        name: "react native",
      },
      {
        name: "nextjs",
      },
      {
        name: "nodejs",
      },
      {
        name: "ai",
      },
      {
        name: "python",
      },
      {
        name: "postgresql",
      },
    ],
    image: batipilote,
    video: batipiloteShowcase,
    // Vidéo de présentation complète, affichée en tête de la fiche projet
    showcase: batipiloteShowcase,
    source_code_link: "",
    app_link: "",
    private_repo: true,
    logo: batipiloteLogo,
    gallery: [
      { src: batipiloteScreen1, caption: "Onboarding : dicter un devis à voix haute" },
      { src: batipiloteScreen2, caption: "Onboarding : analyse IA d'une photo de chantier" },
      { src: batipiloteScreen3, caption: "Onboarding : facturation électronique via les plateformes agréées" },
      { src: batipiloteScreen4, caption: "Onboarding : suivi des factures et relances" },
      { src: batipiloteScreen5, caption: "Connexion et inscription" },
      { src: batipiloteScreen6, caption: "Nouveau devis par dictée vocale, transcrit en direct" },
      { src: batipiloteScreen7, caption: "Aperçu PDF du devis généré" },
      { src: batipiloteScreen8, caption: "Facture au format Factur-X (PDF + XML)" },
    ],
    status: "Prototype",
    details: {
      context: "Projet de fin d'études mené avec un associé développeur Python, en collaboration avec des artisans du bâtiment.",
      fullDescription: "Les artisans du bâtiment perdent un temps précieux sur les devis, la facturation et la réglementation. BatiPilote est un copilote IA qui génère des devis à partir d'une dictée vocale, gère la facturation électronique Factur-X, répond aux questions réglementaires et analyse des photos de chantier. J'ai conçu l'architecture du produit et assuré le développement full-stack : une application mobile React Native, un site Next.js, une API Node.js et un service IA en Python, développé avec un associé développeur Python et en collaboration avec les artisans du bâtiment, ceci connecté à OpenAI et LangChain, le tout avec une intégration continue.",
      keyObjectives: [
        "Générer un devis complet à partir d'une simple dictée vocale",
        "Automatiser la facturation électronique au format Factur-X",
        "Aider l'artisan sur chantier : réglementation et diagnostic photo",
      ],
      functionalities: [
        "Dictée vocale transcrite (Whisper) et transformée en devis (GPT-4o)",
        "Facturation électronique Factur-X",
        "Assistant réglementaire (LangChain, PostgreSQL + pgvector)",
        "Analyse de photos de chantier",
        "Application mobile React Native / Expo et site Next.js",
        "Monorepo Turborepo, CI GitHub Actions, Docker, Sentry",
      ],
    }
  },
  {
    id: "merkod",
    featured: true,
    name: "Merkod",
    description:
      "Le comptoir des codes promo de créateurs : chaque code donné en vidéo ou en podcast est relié à sa source, crédité à son créateur et vérifié, sans compte ni publicité.",
    reason: "Projet personnel",
    period: "2026",
    role: "Conception produit, design, développement full-stack et mise en production (projet solo)",
    tags: [
      { name: "nextjs", label: "Next.js 15" },
      { name: "react", label: "React 19" },
      { name: "typescript", label: "TypeScript" },
      { name: "postgresql", label: "PostgreSQL (Neon)" },
      { name: "drizzle", label: "Drizzle ORM" },
      { name: "ai", label: { fr: "IA Claude", en: "Claude AI" } },
      { name: "gsap", label: "GSAP" },
      { name: "vercel", label: "Vercel" },
    ],
    image: merkod,
    video: merkodPreview,
    showcase: merkodShowcase,
    logo: merkodLogo,
    source_code_link: "https://github.com/CodeShadowing95/koupi",
    app_link: "https://merkod.com",
    status: "En cours",
    gallery: [
      { src: merkodExplorer, caption: "Explorer : tous les codes de créateurs sur un seul comptoir" },
      { src: merkodRecherche, caption: "Recherche instantanée par outil, créateur ou code" },
      { src: merkodFiche, caption: "Fiche outil : le code, sa source et son taux de réussite" },
      { src: merkodCoupon, caption: "Le coupon se détache : code copié, créateur crédité" },
      { src: merkodVote, caption: "Au retour, un pouce anonyme pour dire si le code a marché" },
      { src: merkodCreateur, caption: "Page créateur : ses codes, ses réseaux, ses votes" },
      { src: merkodSombre, caption: "Thème sombre, design accessible" },
      { src: merkodEspaceCreateur, caption: "Espace créateur : connexion par lien, sans mot de passe" },
      { src: merkodAdminStats, caption: "Back-office : statistiques du catalogue et de l'audience" },
      { src: merkodAdminAccueil, caption: "Back-office : les actions du jour, classées par impact" },
    ],
    details: {
      context:
        "Projet personnel lancé en 2026 pour répondre à un vrai irritant : retrouver le code promo donné par un créateur et savoir s'il marche encore. Je l'ai construit seul, de la recherche du nom et du logo au déploiement sur merkod.com, en m'imposant les règles d'une équipe : une PR par étape, Conventional Commits, CI obligatoire et décisions d'architecture documentées.",
      results: [
        "Site en ligne sur merkod.com, plus de 500 codes publiés",
        "Plus de 300 pull requests relues et fusionnées, versions publiées en continu (v0.23)",
        "50 décisions d'architecture (ADR) documentées",
        "Plus de 150 fichiers de tests (Vitest), base testée sur PGlite avec les vraies migrations",
        "CI/CD : typecheck, tests, build et audit des dépendances sur chaque PR, releases automatisées",
        "Zéro traceur tiers : mesure d'audience anonyme maison",
      ],
      fullDescription:
        "Avant de payer un abonnement à un outil en ligne (VPN, hébergement, IA, logiciels pour freelances), beaucoup de gens cherchent le code promo qu'un créateur a donné dans une vidéo. Ces codes sont éparpillés, souvent expirés, et les sites de coupons classiques ne disent ni d'où ils viennent ni s'ils marchent. Merkod part de la source : chaque code est rattaché à la vidéo ou à l'épisode qui l'a donné, crédite le créateur qui l'a négocié et affiche son taux de réussite selon les votes des visiteurs. Côté coulisses, un back-office complet permet de trouver de nouveaux codes (YouTube Data API, podcasts Apple), de les faire relire par l'IA Claude, de les modérer et de suivre le catalogue avec des statistiques mesurées sans aucun traceur tiers. J'ai mené le projet seul, de l'idée et du nom jusqu'au déploiement, avec une méthode d'équipe : petites PR relues, CI, décisions d'architecture écrites et releases versionnées.",
      keyObjectives: [
        "Relier chaque code promo à sa source et au créateur qui l'a négocié",
        "Montrer aux visiteurs les codes qui marchent vraiment, grâce aux votes",
        "Donner aux créateurs un espace pour gérer et suivre leurs codes",
        "Livrer une application fiable et maintenable : tests, CI et déploiements maîtrisés",
      ],
      functionalities: [
        "Explorer : catalogue de codes classés par familles et catégories, cartes détaillées ou simples",
        "Recherche instantanée par outil, créateur ou code, avec suggestions",
        "Coupon détachable animé (GSAP) qui copie le code et ouvre le lien du créateur",
        "Votes anonymes « ça marche / ça ne marche plus » et taux de réussite par code",
        "Pages créateur à l'adresse merkod.com/@nom, avec réseaux et statistiques",
        "Espace créateur : connexion par lien e-mail, preuve de la chaîne par la bio",
        "Formulaire « Proposer un code » protégé par Cloudflare Turnstile et une limite de débit",
        "Thème clair et sombre accessible, interface pensée pour le mobile",
        "Back-office : modération, gestion des codes, outils, créateurs et catégories, export CSV",
        "Recherche de codes sur YouTube et les podcasts, relecture assistée par l'IA Claude avec budget plafonné",
        "Statistiques (Chart.js) et mesure d'audience anonyme stockée dans sa propre base",
        "Retests automatiques des codes et mode maintenance pilotable depuis l'admin",
      ],
    },
  },
  {
    id: "bikemapper",
    featured: true,
    name: "BikeMapper",
    description:"Application de géolocalisation de stations de vélos en libre-service en France et dans le monde. Vous pouvez découvrir la liste des services, les bornes de station, les détails de la station par ville.",
    reason: "Test technique validé",
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
    video: bikemapperShowcase,
    // Vidéo de présentation complète, affichée en tête de la fiche projet
    showcase: bikemapperShowcase,
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
        label: { fr: "Puter.js (IA)", en: "Puter.js (AI)" },
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
    video: appleShowcase,
    // Vidéo de présentation complète, affichée en tête de la fiche projet
    showcase: appleShowcase,
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
    id: "kmertube",
    featured: true,
    name: "KmerTube",
    description:
      "Plateforme vidéo inspirée de YouTube, à l'interface modernisée : regarder n'importe quelle vidéo, la rechercher, parcourir les catégories et les chaînes.",
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
    image: kmertubeCover,
    video: kmertubeShowcase,
    // Vidéo de présentation complète, affichée en tête de la fiche projet
    showcase: kmertubeShowcase,
    logo: kmertubeLogo,
    source_code_link: "https://github.com/CodeShadowing95/yutubewatch",
    app_link: "https://kmertube.netlify.app/",
    gallery: [
      { src: kmertubeAccueil, caption: "Accueil : les nouveautés et les catégories" },
      { src: kmertubeCategorie, caption: "Navigation par catégorie, ici JS Mastery" },
      { src: kmertubeRecherche, caption: "Recherche de vidéos via l'API YouTube" },
      { src: kmertubeFicheVideo, caption: "Fiche vidéo : lecteur, vues, likes et description" },
      { src: kmertubeChaine, caption: "Page de chaîne et dernières vidéos" },
      { src: kmertubeMusique, caption: "Catégorie Musique, même interface sombre" },
    ],
    status: "En cours",
    details: {
      fullDescription: "KmerTube (anciennement YouWatch) est une plateforme vidéo inspirée de YouTube permettant d’explorer, rechercher et visionner des vidéos par catégories et par chaînes. Le projet met en œuvre une intégration d’API, une interface réactive et une navigation intuitive.",
      keyObjectives: [
        "Permettre la recherche et la découverte de contenus",
        "Proposer une expérience de lecture fluide",
        "Structurer les contenus par chaîne et catégories",
      ],
      functionalities: [
        "Recherche de vidéos et suggestions",
        "Lecture embarquée et pages de chaîne",
        "Classement par catégories",
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
    id: "kamercare",
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

// Textes { fr, en } : la langue est choisie à l'affichage (voir src/i18n)
const keyAchievements = [
  {
    value: "~5 min",
    label: { fr: "de build CI au lieu de 25-30 min", en: "CI build time, down from 25-30 min" },
    link: { to: "/etude-de-cas/build-ci", label: { fr: "Lire l'étude de cas", en: "Read the case study" } },
  },
  {
    value: "130+",
    label: { fr: "applications mises à jour et sécurisées", en: "applications updated and secured" },
  },
  {
    value: "2 500+",
    valueEn: "2,500+",
    // label: "offres d’emploi collectées automatiquement (-80 % de traitement manuel)",
    label: { fr: "offres d’emploi collectées traitées", en: "job listings collected and processed" },
  },
  {
    value: "2019",
    label: {
      fr: "premier poste de développeur, 10+ applications métier livrées",
      en: "first developer role, 10+ business applications delivered",
    },
  },
];

// Parcours affiché sur le globe de la section Contact (du plus ancien au plus récent)
const journey = [
  {
    city: { fr: "Yaoundé", en: "Yaoundé" },
    period: { fr: "2015 – 2021", en: "2015 – 2021" },
    lat: 3.87,
    lon: 11.52,
    labelClassName: "ml-3 -translate-y-1/2",
  },
  {
    city: { fr: "Lyon", en: "Lyon" },
    period: { fr: "2022 – 2025", en: "2022 – 2025" },
    lat: 45.76,
    lon: 4.84,
    labelClassName: "-ml-3 -translate-x-full -translate-y-1/2",
  },
  {
    city: { fr: "Strasbourg", en: "Strasbourg" },
    period: { fr: "Depuis 2025", en: "Since 2025" },
    lat: 48.57,
    lon: 7.75,
    labelClassName: "ml-3 -translate-y-full",
  },
];

const education = [
  {
    years: "2024 – 2026",
    degree: { fr: "Master Expert développement full stack", en: "Master's degree, Full-Stack Development Expert" },
    level: { fr: "Bac+5", en: "Master's level" },
    school: { fr: "Ynov Campus, Lyon puis Strasbourg", en: "Ynov Campus, Lyon then Strasbourg" },
    note: { fr: "En alternance", en: "Work-study programme" },
  },
  {
    years: "2022 – 2024",
    degree: {
      fr: "Bachelor Analyste en Informatique Appliquée, spécialité Data & Application Design",
      en: "Bachelor's in Applied Computer Science, Data & Application Design track",
    },
    level: { fr: "Bac+3", en: "Bachelor's level" },
    school: "ESTIAM, Lyon",
    note: { fr: "Major de promotion", en: "Top of the class" },
  },
  {
    years: "2015 – 2018",
    degree: { fr: "Licence professionnelle Informatique", en: "Professional Bachelor's in Computer Science" },
    level: { fr: "Bac+3", en: "Bachelor's level" },
    school: "IAI-Cameroun, Yaoundé",
  },
];

const languages = [
  { name: { fr: "Français", en: "French" }, level: { fr: "Courant", en: "Fluent" } },
  { name: { fr: "Allemand", en: "German" }, level: "C1" },
  { name: { fr: "Anglais", en: "English" }, level: "B2" },
  { name: { fr: "Chinois", en: "Chinese" }, level: { fr: "A1 (en apprentissage)", en: "A1 (learning)" } },
];


export { services, technologies, experiences, testimonials, projects, socials, keyAchievements, education, languages, journey };