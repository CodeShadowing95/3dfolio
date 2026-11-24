"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { domains, lines, stars, starByName, pickers, isLitFor } from "../constants/constellation";
import { useI18n } from "../i18n/I18nProvider";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery";

const copy = {
  fr: {
    all: "Tout",
    group: "Voir les technos d'un projet ou d'un poste",
    sky: "Constellation des technologies, classées par domaine",
    everywhere: "tous mes projets",
    wide: "la plupart",
    count: (n) => (n === 0 ? "" : `${n} ${n > 1 ? "projets / postes" : "projet / poste"}`),
    total: (techs, groups) => `${techs} technos · ${groups} domaines`,
    top: (names) => `Les plus utilisées : ${names}.`,
    uses: (label) => `${label} utilise`,
    usedIn: (name) => `${name} :`,
    usedInList: (list) => (list.length ? `utilisé dans ${list}` : "utilisé dans des projets personnels et académiques"),
    tapStar: "Touchez une techno pour voir où elle est utilisée.",
  },
  en: {
    all: "All",
    group: "Show the technologies of a project or a job",
    sky: "Constellation of technologies, grouped by domain",
    everywhere: "all my projects",
    wide: "most projects",
    count: (n) => (n === 0 ? "" : `${n} ${n > 1 ? "projects / jobs" : "project / job"}`),
    total: (techs, groups) => `${techs} technologies · ${groups} domains`,
    top: (names) => `Most used: ${names}.`,
    uses: (label) => `${label} uses`,
    usedIn: (name) => `${name}:`,
    usedInList: (list) => (list.length ? `used in ${list}` : "used in personal and academic projects"),
    tapStar: "Tap a technology to see where it is used.",
  },
};

const ALL = "__all__";

const starSize = (star) => 10 + star.weight * 4;

const countLabel = (star, c) => (star.everywhere ? c.everywhere : star.wide ? c.wide : c.count(star.used.length));

// Constellation des compétences : chaque étoile est une techno, sa taille dit combien de
// projets / postes l'utilisent. Construite en HTML + SVG (pas de WebGL) : texte net,
// lisible par les lecteurs d'écran et les robots, et presque rien à télécharger.
const SkillConstellation = () => {
  const { locale, pick } = useI18n();
  const c = copy[locale];
  const reducedMotion = usePrefersReducedMotion();
  const [selection, setSelection] = useState({ kind: "all", value: ALL });
  const skyRef = useRef(null);

  // Profondeur : chaque domaine glisse un peu selon la souris, les plus « proches » davantage
  useEffect(() => {
    const sky = skyRef.current;
    if (!sky || reducedMotion) return undefined;
    let frame = 0;
    let target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const tick = () => {
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      sky.style.setProperty("--px", current.x.toFixed(4));
      sky.style.setProperty("--py", current.y.toFixed(4));
      frame = Math.abs(target.x - current.x) + Math.abs(target.y - current.y) > 0.001 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (event) => {
      const rect = sky.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      target = {
        x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
        y: ((event.clientY - rect.top) / rect.height) * 2 - 1,
      };
      if (!frame) frame = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  const lit = useMemo(() => {
    if (selection.kind === "all") return null;
    if (selection.kind === "tech") return new Set([selection.value]);
    return new Set(stars.filter((star) => isLitFor(star, selection.value)).map((star) => star.name));
  }, [selection]);

  const summary = useMemo(() => {
    if (selection.kind === "project") {
      return { title: c.uses(selection.value), text: [...lit].join(", ") };
    }
    if (selection.kind === "tech") {
      const star = starByName[selection.value];
      const list = star.everywhere ? c.everywhere : star.used.join(", ");
      return { title: c.usedIn(star.name), text: star.everywhere ? list : c.usedInList(list) };
    }
    const top = [...stars]
      .filter((star) => !star.wide)
      .sort((a, b) => b.used.length - a.used.length)
      .slice(0, 5)
      .map((star) => star.name)
      .join(", ");
    return { title: c.total(stars.length, domains.length), text: c.top(top) };
  }, [selection, lit, c]);

  const choose = (kind, value) =>
    setSelection((prev) => (prev.kind === kind && prev.value === value ? { kind: "all", value: ALL } : { kind, value }));

  const chip = (label, value, kind) => {
    const on = selection.kind === kind && selection.value === value;
    return (
      <button
        key={value}
        type="button"
        aria-pressed={on}
        onClick={() => (kind === "all" ? setSelection({ kind: "all", value: ALL }) : choose(kind, value))}
        className={`min-h-[40px] px-4 rounded-full text-[14px] font-medium border transition-colors ${
          on ? "bg-[#7c4dff] border-[#7c4dff] text-white" : "bg-white/[0.04] border-white/[0.14] text-[#dfd9ff] hover:border-white/30"
        }`}
      >
        {label}
      </button>
    );
  };

  const isOn = (name) => !lit || lit.has(name);

  return (
    <div>
      <div role="group" aria-label={c.group} className="mt-7 flex flex-wrap gap-2">
        {chip(c.all, ALL, "all")}
        {pickers.map((label) => chip(label, label, "project"))}
      </div>

      {/* Ordinateur et tablette : le ciel */}
      <div
        ref={skyRef}
        role="group"
        aria-label={c.sky}
        className="constellation hidden md:block mt-5 relative h-[540px] lg:h-[600px] rounded-[28px] overflow-hidden border border-white/[0.08] bg-[radial-gradient(ellipse_at_50%_50%,#130f36_0%,#070821_65%,#050816_100%)]"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.18] [background:radial-gradient(circle,rgba(255,255,255,.55)_1px,transparent_1.5px)_0_0/38px_38px,radial-gradient(circle,rgba(183,156,255,.45)_1px,transparent_1.5px)_19px_13px/71px_71px]"
        />

        {/* Liens pointillés du noyau vers chaque constellation (ne bougent pas) */}
        <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          {domains.map((domain) => {
            const hub = starByName[domain.hub];
            return (
              <line
                key={domain.id}
                x1="50"
                y1="50"
                x2={hub.x}
                y2={hub.y}
                stroke="rgba(255,255,255,.12)"
                strokeDasharray="2 4"
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 w-[46px] h-[46px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_34%_28%,#efe7ff_0%,#a57dff_25%,#6b3ae6_55%,#1f1060_100%)] shadow-[0_0_40px_6px_rgba(145,94,255,0.5)]"
        />

        {domains.map((domain) => (
          <div
            key={domain.id}
            className="constellation-layer absolute inset-0"
            style={{ "--depth": domain.depth }}
          >
            <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
              <polyline
                points={lines[domain.id].map((name) => `${starByName[name].x},${starByName[name].y}`).join(" ")}
                fill="none"
                stroke={domain.color}
                strokeWidth="1.2"
                vectorEffect="non-scaling-stroke"
                opacity={lit ? 0.2 : 0.55}
                className="transition-opacity duration-500"
              />
            </svg>
            <span
              className={`absolute ${domain.corner} text-[12px] tracking-[0.16em] uppercase font-semibold`}
              style={{ color: domain.color }}
            >
              {pick(domain.name)}
            </span>

            {stars
              .filter((star) => star.domain === domain.id)
              .map((star, index) => {
                const size = starSize(star);
                const on = isOn(star.name);
                const focused = lit && on;
                const pressed = selection.kind === "tech" && selection.value === star.name;
                return (
                  <button
                    key={star.name}
                    type="button"
                    aria-pressed={pressed}
                    onClick={() => choose("tech", star.name)}
                    className="absolute -translate-x-1/2 flex flex-col items-center gap-1.5 rounded-xl px-2 py-1 transition-opacity duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan"
                    // Le point (et non le centre du bouton) est posé sur la position : les lignes tombent pile dessus
                    style={{ left: `${star.x}%`, top: `calc(${star.y}% - ${size / 2 + 4}px)`, opacity: on ? 1 : 0.18 }}
                  >
                    <span
                      aria-hidden="true"
                      className="star-dot rounded-full"
                      style={{
                        width: size,
                        height: size,
                        background: domain.color,
                        boxShadow: `0 0 ${focused ? size * 2.4 : size * 1.2}px ${domain.color}`,
                        animationDelay: `${(index * 0.7) % 3}s`,
                      }}
                    />
                    <span className="text-[13px] font-semibold text-white whitespace-nowrap [text-shadow:0_0_8px_#050816]">
                      {star.name}
                    </span>
                    <span className="-mt-1 text-[11px] text-secondary whitespace-nowrap">{countLabel(star, c)}</span>
                  </button>
                );
              })}
          </div>
        ))}
      </div>

      {/* Téléphone : la même information sous forme de liste par domaine */}
      <div className="md:hidden mt-5 grid gap-3">
        {domains.map((domain) => (
          <div key={domain.id} className="rounded-[20px] bg-tertiary border border-white/[0.08] p-4">
            <p className="text-[12px] tracking-[0.16em] uppercase font-semibold" style={{ color: domain.color }}>
              {pick(domain.name)}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {stars
                .filter((star) => star.domain === domain.id)
                .map((star) => (
                  <li key={star.name}>
                    <button
                      type="button"
                      aria-pressed={selection.kind === "tech" && selection.value === star.name}
                      onClick={() => choose("tech", star.name)}
                      className="min-h-[40px] flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 text-[14px] text-white transition-opacity"
                      style={{ opacity: isOn(star.name) ? 1 : 0.3 }}
                    >
                      <span
                        aria-hidden="true"
                        className="rounded-full"
                        style={{ width: 6 + star.weight * 1.6, height: 6 + star.weight * 1.6, background: domain.color }}
                      />
                      {star.name}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        ))}
        <p className="text-[13px] text-secondary">{c.tapStar}</p>
      </div>

      <div
        aria-live="polite"
        className="mt-4 rounded-[18px] border border-transparent px-5 py-4 flex flex-wrap items-center gap-x-4 gap-y-2 [background:linear-gradient(#100d25,#100d25)_padding-box,linear-gradient(135deg,#22d3ee,#804dee)_border-box]"
      >
        <span className="font-mono text-[13px] text-cyan">{summary.title}</span>
        <span className="text-[15px] text-white">{summary.text}</span>
      </div>
    </div>
  );
};

export default SkillConstellation;
