import { motion } from "framer-motion";

import { StackCanvas } from "./canvas";
import LazyOnView from "./LazyOnView";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { stackLayers } from "../constants/stack";
import { textVariant } from "../utils/motion";

// Couches affichées du haut (Front-end) vers le bas (Infra), comme dans la pile 3D
const layersTopDown = [...stackLayers].reverse();
const techsOf = (layer) => (layer.nodes ? layer.nodes.flatMap((node) => node.techs) : layer.techs);

// Affiché tant que la scène 3D (three.js + logos) n'est pas chargée : même hauteur, pas de saut de mise en page
const StackFallback = () => (
  <div className="w-full h-[460px] sm:h-[560px] lg:h-[620px] flex flex-col justify-center gap-5" aria-hidden="true">
    {layersTopDown.map((layer) => (
      <div key={layer.id} className="flex flex-wrap items-center justify-center gap-2">
        <span className="w-28 text-right text-[11px] uppercase tracking-widest" style={{ color: layer.color }}>
          {layer.name}
        </span>
        {techsOf(layer).map((tech) => (
          <span
            key={tech.name}
            className="rounded-lg bg-tertiary px-2.5 py-1 text-[12px] text-secondary ring-1 ring-white/10"
          >
            {tech.name}
          </span>
        ))}
      </div>
    ))}
  </div>
);

// Liste texte pour les lecteurs d'écran, le SEO et les ATS (toujours dans le DOM)
const StackTextList = () => (
  <div className="sr-only">
    <h3>Technologies par couche</h3>
    {layersTopDown.map((layer) => (
      <section key={layer.id}>
        <h4>{layer.name}</h4>
        <ul>
          {techsOf(layer).map((tech) => (
            <li key={tech.name}>
              {tech.name}
              {tech.usageNote && ` : ${tech.usageNote.toLowerCase()}`}
              {tech.usedIn.length > 0 &&
                ` ${tech.usageNote ? "(notamment" : ": utilisé dans"} ${tech.usedIn.map((usage) => usage.label).join(", ")}${tech.usageNote ? ")" : ""}`}
            </li>
          ))}
        </ul>
      </section>
    ))}
  </div>
);

// eslint-disable-next-line react-refresh/only-export-components
const Tech = () => (
  <>
    <motion.div variants={textVariant()} className="mb-6">
      <p className={styles.sectionSubText}>Technologies</p>
      <h2 className={styles.sectionHeadText}>Stack technique.</h2>
      <p className="mt-3 max-w-2xl text-secondary text-[16px] leading-[28px]">
        Du navigateur jusqu&apos;au cluster : les technologies que j&apos;utilise à chaque couche d&apos;une
        application, de l&apos;interface au déploiement.
      </p>
    </motion.div>

    <StackTextList />

    <LazyOnView fallback={<StackFallback />}>
      <StackCanvas />
    </LazyOnView>
  </>
);

// eslint-disable-next-line react-refresh/only-export-components
export default SectionWrapper(Tech, "stack");
