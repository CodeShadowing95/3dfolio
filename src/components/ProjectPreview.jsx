import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const canHover = typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;
const prefersReducedMotion =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Image du projet, remplacée par une courte vidéo muette quand elle existe :
// au survol sur ordinateur, quand la carte est bien visible sur téléphone.
const ProjectPreview = ({ name, image, video, hovered }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [inView, setInView] = useState(false);
  const autoplay = Boolean(video) && !prefersReducedMotion;
  const playing = autoplay && (canHover ? hovered : inView);

  useEffect(() => {
    if (!autoplay || canHover || !containerRef.current) return undefined;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.6,
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [autoplay]);

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
        alt={`Aperçu de ${name}`}
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
            Démo vidéo
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
