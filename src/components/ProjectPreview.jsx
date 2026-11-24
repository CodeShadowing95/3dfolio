"use client";

import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import { useCanHover, usePrefersReducedMotion } from "../hooks/useMediaQuery";
import { useI18n } from "../i18n/I18nProvider";

// Image du projet, remplacée par une courte vidéo muette quand elle existe :
// au survol sur ordinateur, quand la carte est bien visible sur téléphone.
const ProjectPreview = ({ name, image, video, hovered }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const { locale } = useI18n();
  const [inView, setInView] = useState(false);
  const canHover = useCanHover();
  const prefersReducedMotion = usePrefersReducedMotion();
  const autoplay = Boolean(video) && !prefersReducedMotion;
  const playing = autoplay && (canHover ? hovered : inView);

  useEffect(() => {
    if (!autoplay || canHover || !containerRef.current) return undefined;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.6,
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [autoplay, canHover]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (playing) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [playing]);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <img
        src={image}
        alt={locale === "en" ? `${name} preview` : `Aperçu de ${name}`}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />
      {autoplay && (
        <>
          <video
            ref={videoRef}
            src={video}
            poster={image}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300 ${
              playing ? "opacity-100" : "opacity-0"
            }`}
          />
          <span
            className={`absolute left-3 bottom-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 text-white text-[12px] transition-opacity duration-300 ${
              playing ? "opacity-0" : "opacity-100"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M8 5v14l11-7z" />
            </svg>
            {locale === "en" ? "Video demo" : "Démo vidéo"}
          </span>
        </>
      )}
    </div>
  );
};

ProjectPreview.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  video: PropTypes.string,
  hovered: PropTypes.bool,
};

export default ProjectPreview;
