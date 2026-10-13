import {
  mobile,
  backend,
  creator,
  web,
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
  hkdigitals,
  pristydelices,
  estiam,
  teepyjob,
  indextv,
  hapticmedia,
  nextjs,
  python,
  exalta,
  youwatch,
  animevault,
  carhub,
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
  twitter,
  youtube,
  github,
} from "../assets";

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
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Frontend",
    icon: web,
    items: ["React", "Next.js", "Vue / Nuxt", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Backend & API",
    icon: backend,
    items: ["Node.js", "PHP / Laravel", "Java", "API REST", "MongoDB"],
  },
  {
    title: "DevOps & Cloud",
    icon: creator,
    items: ["AWS", "Docker", "Kubernetes", "CI/CD GitHub Actions"],
  },
  {
    title: "Sécurité & Qualité",
    icon: mobile,
    items: ["Politiques CSP", "Gouvernance des dépendances", "Performance", "SEO technique"],
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
    title: "Développeur Fullstack & DevOps en alternance",
    company_name: "Hapticmedia",
    icon: hapticmedia,
    iconBg: "#383E56",
    date: "Septembre 2025 - Août 2026",
    points: [
      "Optimisation du site et de la CI : build réduit de 25-30 min à ~5 min, audit et correction du SEO technique international (hreflang, sitemaps).",
      "Sécurisation de l'outil CLI interne (passage en asynchrone, faille d'injection de commandes corrigée) et refonte des politiques CSP avec cloisonnement sandbox/dev/prod sur AWS.",
      "Mise à niveau Node.js et des dépendances sur un parc multi-dépôts pour réduire la dette technique et fiabiliser la CI/CD.",
      "Migration du site vitrine vers Nuxt 4, mode preview Strapi/Nuxt pour l'équipe éditoriale et refactoring du backend Strapi sans rupture de service.",
    ],
  },
  {
    title: "Consultant développeur",
    company_name: "Index.tv",
    icon: indextv,
    iconBg: "#383E56",
    date: "Mai 2025 - Août 2025",
    points: [
      "Conception et développement d'un plugin vidéo full-stack pour Twilio Flex, intégré au service d'aide à domicile.",
      "Gestion complète du cycle de vie des appels vidéo (connexion, contrôles, déconnexion) avec une interface responsive mobile/desktop.",
      "Optimisation des performances : bundle ramené à 522 Ko grâce au code-splitting.",
    ],
  },
  {
    title: "Développeur web en alternance",
    company_name: "Teepy-Job",
    icon: teepyjob,
    iconBg: "#383E56",
    date: "Septembre 2024 - Avril 2025",
    points: [
      "Développement d’un système de récupération automatique de 2500+ offres d’emploi depuis divers ATS recruteurs via API et flux XML. Réduction du temps de traitement manuel de 80%.",
      "Mise en place d’un pipeline d’analyse et pré-traitement des annonces, avec filtrage et enrichissement des données (catégorisation, géolocalisation) sur une base de 200000+ profils. Gain de 40% en rapidité sur la publication des offres.",
      "Développement d’algorithmes de matching automatique basé sur géolocalisation et critères d’offres, suivi de mailing et gestion de priorités d’annonces. Augmentation de 30% du taux de mise en relation candidats/recruteurs et amélioration du délai de proposition des profils.",
    ],
  },
  {
    title: "Étudiant Développeur - Formation",
    company_name: "ÉSTIAM",
    icon: estiam,
    iconBg: "#E6DEDD",
    date: "Septembre 2023 - Juillet 2024",
    points: [
      "Formation en data/BI (Python, Pandas, Power BI), cloud et conteneurs (AWS, Docker, Kubernetes), développement mobile (Android, Flutter) et RPA.",
    ],
  },
  {
    title: "Développeur Web Fullstack",
    company_name: "HKDigitals",
    icon: hkdigitals,
    iconBg: "#E6DEDD",
    date: "Juillet 2023 - Décembre 2023",
    points: [
      "Scraping de données (LinkedIn, Google Maps, Pages Jaunes) pour alimenter la stratégie marketing, en respectant les règles d'utilisation des sources.",
      "Intégration des données collectées dans les outils des équipes marketing et data.",
    ],
  },
  {
    title: "Développeur Web en Freelance",
    company_name: "PristyDelices",
    icon: pristydelices,
    iconBg: "#383E56",
    date: "Juin 2022 - Janvier 2023",
    points: [
      "Conception d'une application web de commande de pâtisseries, fidèle à l'image de la marque, avec options de personnalisation et intégration des réseaux sociaux.",
      "Optimisation des performances (images, nombre de requêtes).",
    ],
  },
  {
    title: "Développeur web Junior",
    company_name: "Univers Binaire SARL",
    icon: ub,
    iconBg: "#383E56",
    date: "Octobre 2019 - Juillet 2021",
    points: [
      "Développement et maintenance d'applications e-commerce : nouvelles fonctionnalités, corrections de bugs et mises à jour, en lien avec l'équipe marketing.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "Son travail à HKDigitals est superbe, il est travailleur, motivé, et a le sens de l'initiative.",
    name: "Hermann Kuaté",
    designation: "CEO",
    company: "HKDigitals",
  },
  {
    testimonial:
      "Il est très autonome, en 2 mois il a développé notre app sans nécessiter mon intervention. Bon profil.",
    name: "Emmanuel G. G.",
    designation: "CTO",
    company: "HKDigitals",
  },
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
    source_code_link: "",
    app_link: "",
    private_repo: true,
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
        name: "react-router v7",
      },
      {
        name: "tailwindcss",
      },
      {
        name: "ai",
      },
    ],
    image: curriqulumai,
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
    id: "fitguide",
    name: "Fit Guide",
    description:
      "Explorez une collection complète d'exercices de gym classés par parties du corps et par équipement, garantissant une approche ciblée d'un programme d'entraînement.",
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
        name: "css",
      },
    ],
    image: exalta,
    source_code_link: "https://github.com/CodeShadowing95/gym_tutorial",
    app_link: "https://exalta.netlify.app/",
    status: "Terminé",
    details: {
      fullDescription: "Fit Guide aide les utilisateurs à construire un programme d’entraînement ciblé grâce à un catalogue d’exercices classés par groupe musculaire et par équipement. L’interface facilite la recherche et la création de routines.",
      keyObjectives: [
        "Permettre une recherche d’exercices efficace",
        "Structurer des routines personnalisées",
        "Offrir des fiches claires et illustrées",
      ],
      functionalities: [
        "Catalogue d’exercices par muscle/équipement",
        "Recherche et filtres avancés",
        "Fiches détaillées (instructions, vidéos)",
        "Création et sauvegarde de routines",
      ],
    }
  },
  {
    id: "youwatch",
    name: "YouWatch",
    featured: true,
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
  {
    id: "carhub",
    name: "Car Hub",
    description:
      "Application de location de voitures de manière rapide. Naviguez par modèle, nom, type de carburant ou année de fabrication. La voiture idéale est à portée de main.",
    reason: "Projet personnel",
    tags: [
      {
        name: "nextjs",
      },
      {
        name: "nodejs",
      },
      {
        name: "typescript",
      },
      {
        name: "restapi",
      },
      {
        name: "tailwindcss",
      },
    ],
    image: carhub,
    source_code_link: "https://github.com/CodeShadowing95/carhub",
    app_link: "https://rentalcar237.vercel.app/",
    status: "En cours",
    details: {
      fullDescription: "Car Hub simplifie la location de voitures. Les utilisateurs filtrent par modèle, carburant, année et caractéristiques pour trouver le véhicule idéal. L’application met en avant la rapidité et la clarté des informations.",
      keyObjectives: [
        "Accélérer la recherche de véhicules",
        "Offrir des filtres pertinents et rapides",
        "Afficher des fiches véhicules complètes",
      ],
      functionalities: [
        "Filtrage par modèle, carburant et année",
        "Fiches détaillées (prix, specs, photos)",
        "Favoris et comparaisons (selon implémentation)",
        "Processus de contact/réservation",
      ],
    }
  },
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
  {
    name: "Twitter",
    logo: twitter,
    link: "https://twitter.com/",
  },
  {
    name: "Youtube",
    logo: youtube,
    link: "https://www.youtube.com/",
  },
]

const keyAchievements = [
  {
    value: "80%",
    label: "de réduction du temps de traitement manuel",
  },
  {
    value: "2500+",
    label: "offres d’emploi agrégées automatiquement",
  },
  {
    value: "200000+",
    label: "profils analysés et enrichis",
  },
  {
    value: "x5",
    label: "d’accélération du pipeline CI (25-30 min → ~5 min)",
  },
];

export { services, technologies, experiences, testimonials, projects, projectCategories, socials, keyAchievements };