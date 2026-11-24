// English version of the project texts, by project id.
// Only the texts live here: images, links, tags and order stay in index.js.
// A field missing here falls back to the French text.
const projectsEn = {
  batipilote: {
    description:
      "AI copilot for construction tradespeople: quotes generated from voice dictation, e-invoicing and analysis of job-site photos.",
    reason: "Final-year project",
    role: "Architecture and full-stack development",
    status: "Prototype",
    captions: [
      "Onboarding: dictate a quote out loud",
      "Onboarding: AI analysis of a job-site photo",
      "Onboarding: e-invoicing through approved platforms",
      "Onboarding: invoice tracking and reminders",
      "Sign in and sign up",
      "New quote by voice dictation, transcribed live",
      "PDF preview of the generated quote",
      "Invoice in Factur-X format (PDF + XML)",
    ],
    details: {
      context:
        "Final-year project carried out with a partner Python developer, in collaboration with construction tradespeople.",
      fullDescription:
        "Construction tradespeople lose valuable time on quotes, invoicing and regulations. BatiPilote is an AI copilot that generates quotes from voice dictation, handles Factur-X e-invoicing, answers regulatory questions and analyses job-site photos. I designed the product architecture and led the full-stack development: a React Native mobile app, a Next.js website, a Node.js API and a Python AI service, built with a partner Python developer and in collaboration with tradespeople, connected to OpenAI and LangChain, all with continuous integration.",
      keyObjectives: [
        "Generate a complete quote from a simple voice dictation",
        "Automate e-invoicing in the Factur-X format",
        "Help tradespeople on site: regulations and photo diagnosis",
      ],
      functionalities: [
        "Voice dictation transcribed (Whisper) and turned into a quote (GPT-4o)",
        "Factur-X e-invoicing",
        "Regulatory assistant (LangChain, PostgreSQL + pgvector)",
        "Job-site photo analysis",
        "React Native / Expo mobile app and Next.js website",
        "Turborepo monorepo, GitHub Actions CI, Docker, Sentry",
      ],
    },
  },
  merkod: {
    description:
      "The counter for creators' promo codes: every code given in a video or podcast is linked to its source, credited to its creator and verified, with no account and no ads.",
    reason: "Personal project",
    role: "Product design, UI design, full-stack development and production release (solo project)",
    status: "In progress",
    captions: [
      "Explore: every creator code on a single counter",
      "Instant search by tool, creator or code",
      "Tool page: the code, its source and its success rate",
      "The coupon tears off: code copied, creator credited",
      "On return, an anonymous thumbs-up to say whether the code worked",
      "Creator page: their codes, their channels, their votes",
      "Dark theme, accessible design",
      "Creator space: sign in by link, no password",
      "Back office: catalogue and audience statistics",
      "Back office: today's actions, ranked by impact",
    ],
    details: {
      context:
        "Personal project launched in 2026 to solve a real annoyance: finding the promo code a creator gave and knowing whether it still works. I built it alone, from choosing the name and logo to deploying merkod.com, holding myself to a team's rules: one PR per step, Conventional Commits, mandatory CI and documented architecture decisions.",
      results: [
        "Live at merkod.com, over 500 codes published",
        "Over 300 pull requests reviewed and merged, continuous releases (v0.23)",
        "50 architecture decision records (ADRs)",
        "Over 150 test files (Vitest), database tested on PGlite with the real migrations",
        "CI/CD: typecheck, tests, build and dependency audit on every PR, automated releases",
        "Zero third-party trackers: in-house anonymous audience measurement",
      ],
      fullDescription:
        "Before paying for an online tool (VPN, hosting, AI, freelance software), many people look for the promo code a creator gave in a video. These codes are scattered, often expired, and classic coupon sites say neither where they come from nor whether they work. Merkod starts from the source: each code is tied to the video or episode that gave it, credits the creator who negotiated it and shows its success rate based on visitors' votes. Behind the scenes, a full back office finds new codes (YouTube Data API, Apple podcasts), has them reviewed by Claude AI, moderates them and tracks the catalogue with statistics measured without any third-party tracker. I ran the project alone, from the idea and the name to deployment, with a team method: small reviewed PRs, CI, written architecture decisions and versioned releases.",
      keyObjectives: [
        "Link every promo code to its source and to the creator who negotiated it",
        "Show visitors the codes that really work, thanks to votes",
        "Give creators a space to manage and track their codes",
        "Ship a reliable, maintainable application: tests, CI and controlled deployments",
      ],
      functionalities: [
        "Explore: catalogue of codes sorted by families and categories, detailed or compact cards",
        "Instant search by tool, creator or code, with suggestions",
        "Animated tear-off coupon (GSAP) that copies the code and opens the creator's link",
        "Anonymous “works / no longer works” votes and a success rate per code",
        "Creator pages at merkod.com/@name, with channels and statistics",
        "Creator space: sign-in by email link, channel ownership proven through the bio",
        "“Suggest a code” form protected by Cloudflare Turnstile and rate limiting",
        "Accessible light and dark themes, mobile-first interface",
        "Back office: moderation, management of codes, tools, creators and categories, CSV export",
        "Code discovery on YouTube and podcasts, review assisted by Claude AI with a capped budget",
        "Statistics (Chart.js) and anonymous audience measurement stored in its own database",
        "Automatic code retests and a maintenance mode controlled from the admin",
      ],
    },
  },
  kamercare: {
    description:
      "Modern medical platform designed for the Cameroonian healthcare system, connecting patients with healthcare professionals.",
    reason: "Personal project",
    status: "In progress",
    details: {
      fullDescription:
        "KamerCare is a healthcare platform built for the Cameroonian context. It brings together the search for doctors and facilities, appointment booking, patient records and secure communication between patients and practitioners. The application focuses on accessibility, confidentiality and reliability, with a modular, high-performance architecture.",
      keyObjectives: [
        "Make it easier for patients to reach healthcare professionals",
        "Standardise and secure appointment management",
        "Guarantee the confidentiality of medical data",
        "Offer a smooth experience on web and mobile",
      ],
      functionalities: [
        "Advanced search for doctors by specialty and city",
        "Appointment booking and management with reminders",
        "Encrypted patient–practitioner messaging",
        "Patient record with history and documents",
        "Dashboards for practitioners and patients",
      ],
    },
  },
  bikemapper: {
    description:
      "Locates self-service bike stations in France and around the world: browse the services, the docks and station details by city.",
    reason: "Technical test passed",
    status: "Completed",
    details: {
      context: "Technical test completed as part of a work-study job search.",
      results: ["Technical test passed"],
      fullDescription:
        "BikeMapper maps self-service bike schemes. It aggregates data from available networks (France and international), shows stations on an interactive map, exposes real-time availability and lets you browse details by city and operator. The interface is designed for quick discovery and planning.",
      keyObjectives: [
        "Bring self-service bike networks together in one place",
        "Offer a clear and responsive map",
        "Show station availability and characteristics",
        "Search by city and operator",
      ],
      functionalities: [
        "Interactive station map",
        "Filtering by city, network and type of service",
        "Detailed station pages (docks, opening hours, availability)",
        "Favourites and quick navigation",
      ],
    },
  },
  pokecraft: {
    description:
      "All 1,025 Pokémon in French, a turn-based card duel against the machine, a gym campaign and a collection that grows every day.",
    reason: "Technical test passed",
    status: "Completed",
    captions: [
      "Welcome: pick your trainer among eight avatars",
      "Pick your first Pokémon, it becomes your first card",
      "National Pokédex: 1,025 Pokémon, filters by region, sort and type",
      "Pokémon page: artwork, type and number",
      "Arena: your three-card team against the machine",
      "Turn-based duel, moves and type effectiveness",
      "Campaign: eight gyms per region, then the League",
      "Collection: cards gain experience and evolve",
      "Team builder: coverage across all 18 types",
      "Daily booster: five new cards to open",
    ],
    details: {
      context: "Technical test completed as part of a work-study job search.",
      results: ["Technical test passed", "Result much appreciated by the company"],
      fullDescription:
        "Pokécraft is a \"paper & ink\" Pokédex turned card game. You pick a trainer and a first Pokémon, then browse all 1,025 Pokémon in French, duel the machine turn by turn, move through a gym campaign region by region and grow your collection: cards gain experience and evolve. All progress stays in the browser, no account needed.",
      keyObjectives: [
        "Offer an easy-to-use Pokémon encyclopedia",
        "Make exploration visual and informative",
        "Provide fast filters and search",
      ],
      functionalities: [
        "National Pokédex: 1,025 Pokémon, search, filters by region and type",
        "Turn-based card duel with type effectiveness",
        "Campaign: eight gyms per region, then the League",
        "Collection, experience, evolutions and daily booster",
        "Team builder with coverage across all 18 types",
      ],
    },
  },
  curriqulumai: {
    description:
      "Web application that uses AI to make any CV 100% ATS-compatible, maximising your chances of getting an interview.",
    reason: "Personal project",
    status: "Completed",
    details: {
      fullDescription:
        "Curriqulum.ai is an AI-assisted CV analyser designed to ensure 100% ATS compatibility. It scans structure and content, identifies areas for improvement and suggests recommendations to increase your chances of getting an interview.",
      keyObjectives: [
        "Make CVs ATS-compatible",
        "Give clear, actionable recommendations",
        "Automate analysis and scoring",
      ],
      functionalities: [
        "AI analysis of structure and keywords",
        "ATS score and improvement report",
        "Personalised suggestions and export",
        "Analysis history",
      ],
    },
  },
  appleclone: {
    description:
      "Apple showcase site clone: smooth navigation, GSAP animations and a feast of 3D visuals of the latest iPhones.",
    reason: "Personal project",
    status: "Completed",
    details: {
      fullDescription:
        "Apple 2.0 is a showcase site inspired by Apple's marketing pages, with smooth navigation, GSAP animations and 3D visuals featuring the latest iPhones. The project focuses on performance and aesthetics.",
      keyObjectives: [
        "Recreate a premium marketing experience",
        "Showcase 3D visuals and animations",
        "Optimise performance and accessibility",
      ],
      functionalities: [
        "Animated showcase sections",
        "Parallax effects and GSAP transitions",
        "Interactive product galleries",
        "Calls to action and bento navigation",
      ],
    },
  },
  brainwave: {
    description:
      "Landing page with elegant parallax effects and bento layouts presenting AI-powered services.",
    reason: "Personal project",
    status: "Completed",
    details: {
      fullDescription:
        "Brainwave is a modern landing page presenting AI-powered services, with bento layouts and parallax effects. The focus is on visual storytelling and conversion.",
      keyObjectives: [
        "Present the AI offer clearly",
        "Maximise visual engagement",
        "Drive conversion through calls to action",
      ],
      functionalities: [
        "Modular bento sections",
        "Parallax and micro-interactions",
        "Dynamic calls to action and tracking",
        "FAQ and testimonials",
      ],
    },
  },
  kmertube: {
    description:
      "A YouTube-inspired video platform with a refreshed interface: watch any video, search for it, browse categories and channels.",
    captions: [
      "Home: new uploads and categories",
      "Browsing by category, here JS Mastery",
      "Video search through the YouTube API",
      "Video page: player, views, likes and description",
      "Channel page and latest uploads",
      "Music category, same dark interface",
    ],
    reason: "Personal project",
    status: "In progress",
    details: {
      fullDescription:
        "KmerTube (formerly YouWatch) is a YouTube-inspired app to explore, search and watch videos by category and channel. The project combines API integration, a responsive interface and intuitive navigation.",
      keyObjectives: [
        "Enable content search and discovery",
        "Offer a smooth viewing experience",
        "Organise content by channel and category",
      ],
      functionalities: [
        "Video search and suggestions",
        "Embedded player and channel pages",
        "Sorting by category",
      ],
    },
  },
  animevault: {
    description:
      "Streaming web app for Japanese anime in HD: explore every kind of anime by category, name, author or title.",
    reason: "Personal project",
    status: "Completed",
    details: {
      fullDescription:
        "Anime Vault is an HD streaming platform for Japanese anime. It lets you explore works by category, title and author and open detailed pages. The experience prioritises performance and video quality.",
      keyObjectives: [
        "Offer a rich anime catalogue",
        "Provide smooth HD streaming",
        "Make exploration easy with filters and search",
      ],
      functionalities: [
        "Catalogue by genre and author",
        "Search and multiple filters",
        "Built-in video player",
        "Work pages (synopsis, episodes)",
      ],
    },
  },
  servermanagement: {
    description:
      "Add and remove servers, enable and disable unused ones, and manage connectivity with your different servers.",
    reason: "Personal project",
    status: "Completed",
    details: {
      fullDescription:
        "Server Management is an application for monitoring and managing servers. It lets you add and remove servers, enable or disable unused ones and check their connectivity. A full-stack architecture designed for robustness and readability.",
      keyObjectives: [
        "Centralise server administration",
        "Monitor status and connectivity",
        "Simplify everyday operations",
      ],
      functionalities: [
        "Server CRUD",
        "Enabling/disabling and statuses",
        "Dashboards and filters",
        "Operation history",
      ],
    },
  },
};

export default projectsEn;
