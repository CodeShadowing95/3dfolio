import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    typescript,
    reactjs,
    redux,
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
    nextjs,
    python,
    gpt3,
    exalta,
    youwatch,
    lugia,
    animevault,
    carhub,
    promptopia,
    pricesniffer,
    pokedexhub,
    angular,
    figma,
    campcompanion,
    brainwave,
    appleclone,
  } from "../assets";
  
  export const navLinks = [
    {
      id: "profil",
      title: "Profil",
    },
    {
      id: "expérience",
      title: "Expérience",
    },
    {
      id: "projets",
      title: "Projets",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  
  const services = [
    {
      title: "Développeur Web",
      icon: web,
    },
    {
      title: "Intégrateur Web",
      icon: mobile,
    },
    {
      title: "Développeur Backend",
      icon: backend,
    },
    {
      title: "Data Analyste",
      icon: creator,
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
      name: "MongoDB",
      icon: mongodb,
    },
    // {
    //   name: "Three JS",
    //   icon: threejs,
    // },
    {
      name: "Redux Toolkit",
      icon: redux,
    },
    {
      name: "git",
      icon: git,
    },
    {
      name: "python",
      icon: python,
    },
    {
      name: "figma",
      icon: figma,
    },
    {
      name: "docker",
      icon: docker,
    },
  ];
  
  const experiences = [
    {
      title: "Développeur web Junior",
      company_name: "Univers Binaire SARL",
      icon: ub,
      iconBg: "#383E56",
      date: "Octobre 2019 - Juillet 2021",
      points: [
        "Participation au développement d'applications e-commerce en utilisant les langages de programmation et les frameworks pertinents.",
        "Maintenance des applications existantes en corrigeant les bugs, en effectuant des mises à jour et en améliorant les fonctionnalités existantes.",
        "Collaboration étroite avec d'autres membres de l'équipe de développement, ainsi qu'avec des équipes interfonctionnelles telles que le marketing.",
        "Suivi des tendances et des nouvelles technologies liées au e-commerce et aux applications afin de rester à jour et d'apporter des solutions innovantes.",
      ],
    },
    {
      title: "Développeur Web en Freelance",
      company_name: "PristyDelices",
      icon: pristydelices,
      iconBg: "#383E56",
      date: "Juin 2022 - Janvier 2023",
      points: [
        "Conception d'une application web de commande de pâtisseries. S'assurer de la convivialité du site et de la conformité à l'image de la pâtisserie.",
        "Intégration des fonctionnalités de personnalisation si nécessaire.",
        "Veiller à ce que le site web soit rapide et performant en optimisant les images, en minimisant les requêtes et en adoptant d'autres bonnes pratiques.",
        "Intégrer des liens vers les réseaux sociaux de la pâtisserie et, si nécessaire, intégrer des flux sociaux sur le site web.",
      ],
    },
    {
      title: "Développeur Web Fullstack",
      company_name: "HKDigitals",
      icon: hkdigitals,
      iconBg: "#E6DEDD",
      date: "Juillet 2023 - Décembre 2023",
      points: [
        "Développement d'une application de scraping de données à partir de sources telles que LinkedIn, Google Maps, Pages Jaunes afin d'optimiser la stratégie marketing de l'entreprise.",
        "Mise en place des mécanismes pour collecter efficacement des données pertinentes à partir de ces sources de données, en respectant les règles d'utilisation.",
        "Collaboration avec d'autres équipes, telles que le marketing ou l'analyse des données, pour intégrer les résultats du webscraping dans d'autres outils utilisés par l'entreprise.",
        "Documentation du code pour faciliter la compréhension et la collaboration au sein de l'équipe.",
      ],
    },
    {
      title: "Étudiant Développeur - Formation",
      company_name: "ÉSTIAM",
      icon: estiam,
      iconBg: "#E6DEDD",
      date: "Janvier 2024 - Actuellement",
      points: [
        "Acquisition des connaissances relatives à l'analyse de données et la BI avec les technos telles que Python, Pandas, Numpy, Power BI, etc...",
        "Acquisition des connaissances sur le Cloud Computing notamment avec Amazon AWS et des technologies de conteneurisation d'applications telles que Docker, Kubernetes",
        "Acquisition de connaissances sur le développement d'applications mobiles avec Androïd, Flutter, Dart",
        "Apprentissage des fondamentaux de la robotique logicielle (RPA)",
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
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      testimonial:
        "Il est très autonome, en 2 mois il a développé notre app sans nécessiter mon intervention. Bon profil.",
      name: "Emmanuel G. G.",
      designation: "CTO",
      company: "HKDigitals",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      testimonial:
        "Son investissement et son apport dans nos projets e-commerce sont très louables. Je recommande.",
      name: "N. Martial",
      designation: "CEO",
      company: "Univers Binaire",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
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
    }
];
  
  const projects = [
    {
      name: "GPT3_Showcase",
      description:
        "Transformation d'un design Figma en site web fonctionnel, moderne et responsive. Amélioration de mes capacités actuelles en CSS.",
      tags: [
        {
          name: "html",
          color: "orange-text-gradient",
        },
        {
          name: "css",
          color: "blue-text-gradient",
        },
        {
          name: "react",
          color: "pink-text-gradient",
        },
      ],
      image: gpt3,
      source_code_link: "https://github.com/CodeShadowing95/GPT3-Webpage",
      app_link: "https://gpt3-ui-ux-app.netlify.app/"
    },
    {
      name: "Pokedex Hub",
      description:
        "Pour les amateurs de Pokemon, plongez dans une présentation époustouflante de chaque Pokémon, découvrez leurs caractéristiques uniques.",
      tags: [
        {
          name: "angular",
          color: "yellow-text-gradient",
        },
        {
          name: "typescript",
          color: "pink-text-gradient",
        },
        {
          name: "tailwindcss",
          color: "green-text-gradient",
        },
      ],
      image: pokedexhub,
      source_code_link: "#",
      app_link: "https://pokecraftershub.netlify.app/"
    },
    {
      name: "Apple 2.0",
      description:
        "Site vitrine clone de Apple. Navigation fluide, animations GSAP, festin de visuels 3D des dernières sorties de iPhone. Simplement beau.",
      tags: [
        {
          name: "react",
          color: "green-text-gradient",
        },
        {
          name: "tailwindcss",
          color: "blue-text-gradient",
        },
      ],
      image: appleclone,
      source_code_link: "https://github.com/CodeShadowing95/apple_website_clone",
      app_link: "https://mynewappleclone.netlify.app/"
    },
    {
      name: "Brainwave",
      description:
        "Landing Page avec des effets parallax élégants et des mises en page bento pour présenter la puissance de nos services alimentés par l'IA. (In process...)",
      tags: [
        {
          name: "react",
          color: "green-text-gradient",
        },
        {
          name: "tailwindcss",
          color: "blue-text-gradient",
        },
      ],
      image: brainwave,
      source_code_link: "https://github.com/CodeShadowing95/ai_is_coming",
      app_link: "https://brainwave-tech.netlify.app/"
    },
    {
      name: "Fit Guide",
      description:
        "Explorez une collection complète d'exercices de gym classés par parties du corps et par équipement, garantissant une approche ciblée d'un programme d'entraînement.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "nodejs",
          color: "green-text-gradient",
        },
        {
          name: "restapi",
          color: "orange-text-gradient",
        },
        {
          name: "css",
          color: "pink-text-gradient",
        },
      ],
      image: exalta,
      source_code_link: "https://github.com/CodeShadowing95/gym_tutorial",
      app_link: "https://exalta.netlify.app/"
    },
    {
      name: "YouWatch",
      description:
        "Pseudo-clone de la plateforme YouTube permettant de voir n'importe quelle vidéo, rechercher des vidéos précises, consulter des vidéos par catégorie et par chaîne, etc...",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "nodejs",
          color: "green-text-gradient",
        },
        {
          name: "restapi",
          color: "pink-text-gradient",
        },
        {
          name: "materialui",
          color: "orange-text-gradient",
        },
      ],
      image: youwatch,
      source_code_link: "https://github.com/CodeShadowing95/yutubewatch",
      app_link: "https://yutubewatch.netlify.app/"
    },
    // {
    //   name: "Lyriks",
    //   description:
    //     "Site web de streaming temporaire (limité par par l'API utilisé) de musiques, découvrir les nouveaux morceaux, les artistes du moment, etc... Assez conviviale",
    //   tags: [
    //     {
    //       name: "react",
    //       color: "blue-text-gradient",
    //     },
    //     {
    //       name: "nodejs",
    //       color: "green-text-gradient",
    //     },
    //     {
    //       name: "redux",
    //       color: "violet-text-gradient",
    //     },
    //     {
    //       name: "restapi",
    //       color: "pink-text-gradient",
    //     },
    //   ],
    //   image: lyriks,
    //   source_code_link: "https://github.com/CodeShadowing95/Lyriks",
    //   app_link: "https://na-lyriks-app.netlify.app/"
    // },
    {
      name: "Memory Mingle",
      description:
        "Application de création et de partage de photos (un peu comme Pinterest🙂), listing de photos et créations par catégorie et par utilisateur, recherche de photos,...",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "nodejs",
          color: "green-text-gradient",
        },
        {
          name: "mongodb",
          color: "violet-text-gradient",
        },
        {
          name: "tailwindcss",
          color: "yellow-text-gradient",
        },
      ],
      image: lugia,
      source_code_link: "https://github.com/CodeShadowing95/lugia",
      app_link: "https://lugia-app.netlify.app/"
    },
    {
      name: "Anime Vault",
      description:
        "Application web de diffusion en streaming d'Animés japonais en HD, explorer tout type d'Animés par catégorie, par nom, par nom d'auteur, par titre, etc...",
      tags: [
        {
          name: "nextjs",
          color: "orange-text-gradient",
        },
        {
          name: "nodejs",
          color: "green-text-gradient",
        },
        {
          name: "restapi",
          color: "yellow-text-gradient",
        },
        {
          name: "tailwindcss",
          color: "pink-text-gradient",
        },
      ],
      image: animevault,
      source_code_link: "https://github.com/CodeShadowing95/anime237",
      app_link: "https://anime237.vercel.app/"
    },
    {
      name: "Hilink",
      description:
        "Landing page - Découvrez les sites de camping, les sentiers de randonnée et les terrains de camping parfaits grâce à des cartes détaillées.",
      tags: [
        {
          name: "next",
          color: "text-white-400",
        },
        {
          name: "tailwindcss",
          color: "orange-text-gradient",
        },
      ],
      image: campcompanion,
      source_code_link: "https://github.com/CodeShadowing95/campcompanion",
      app_link: "https://campcompanion.netlify.app/"
    },
    {
      name: "Car Hub",
      description:
        "Application de location de voitures de manière rapide. Naviguez par modèle, nom, type de carburant ou année de fabrication. La voiture idéale est à portée de main.",
      tags: [
        {
          name: "nextjs",
          color: "orange-text-gradient",
        },
        {
          name: "nodejs",
          color: "green-text-gradient",
        },
        {
          name: "typescript",
          color: "blue-text-gradient",
        },
        {
          name: "restapi",
          color: "yellow-text-gradient",
        },
        {
          name: "tailwindcss",
          color: "pink-text-gradient",
        },
      ],
      image: carhub,
      source_code_link: "https://github.com/CodeShadowing95/carhub",
      app_link: "https://rentalcar237.vercel.app/"
    },
    {
      name: "Promptopia",
      description:
        "Promptopia est un outil open-source d'IA pour le monde moderne qui permet de découvrir, de créer et de partager des messages créatifs. (En développement)",
      tags: [
        {
          name: "nextjs",
          color: "orange-text-gradient",
        },
        {
          name: "nodejs",
          color: "green-text-gradient",
        },
        {
          name: "typescript",
          color: "blue-text-gradient",
        },
        {
          name: "restapi",
          color: "yellow-text-gradient",
        },
        {
          name: "tailwindcss",
          color: "pink-text-gradient",
        },
      ],
      image: promptopia,
      source_code_link: "https://github.com/CodeShadowing95/prompts",
      app_link: "https://promptopia-mu-livid.vercel.app/"
    },
    {
      name: "Price Sniffer",
      description:
        "Outil de webscraping de suivi des prix de produits depuis Amazon afin d'économiser de l'argent sur les achats en ligne. Intégration d'autres plateformes bientôt.",
      tags: [
        {
          name: "nextjs",
          color: "blue-text-gradient",
        },
        {
          name: "typescript",
          color: "green-text-gradient",
        },
        {
          name: "restapi",
          color: "yellow-text-gradient",
        },
        {
          name: "tailwindcss",
          color: "pink-text-gradient",
        },
        {
          name: "brightdata",
          color: "text-white-100",
        },
        {
          name: "cronjob",
          color: "orange-text-gradient",
        },
      ],
      image: pricesniffer,
      source_code_link: "https://github.com/CodeShadowing95/pricesniffer",
      app_link: "https://pricesniffer.vercel.app/"
    },
  ];
  
  export { services, technologies, experiences, testimonials, projects, projectCategories };