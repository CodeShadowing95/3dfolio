import { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import { ChevronIcon } from "./icons";

const arrowClass =
  "absolute top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-11 h-11 rounded-full bg-black/60 border border-white/20 text-white hover:bg-black/80 transition";

/** Galerie de captures : bande avec flèches aux extrémités + visionneuse plein écran (clavier : ← → Échap) */
const Gallery = ({ images, projectName }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const [canScroll, setCanScroll] = useState({ prev: false, next: false });
  const closeButtonRef = useRef(null);
  const stripRef = useRef(null);
  const isOpen = openIndex !== null;

  // Active ou désactive les flèches selon la position de la bande
  const updateArrows = useCallback(() => {
    const strip = stripRef.current;
    if (!strip) return;
    setCanScroll({
      prev: strip.scrollLeft > 4,
      next: strip.scrollLeft + strip.clientWidth < strip.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, [updateArrows]);

  // Fait défiler d'environ une largeur visible, capture par capture
  const scrollStrip = (direction) => {
    const strip = stripRef.current;
    if (!strip) return;
    strip.scrollBy({ left: direction * strip.clientWidth * 0.8, behavior: "smooth" });
  };

  const close = useCallback(() => setOpenIndex(null), []);
  const show = useCallback(
    (step) => setOpenIndex((index) => (index + step + images.length) % images.length),
    [images.length]
  );

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") show(1);
      if (event.key === "ArrowLeft") show(-1);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close, show]);

  if (!images?.length) return null;

  const current = isOpen ? images[openIndex] : null;

  return (
    <section id="galerie" className="mt-12 space-y-4">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-white text-xl font-semibold">Aperçu de l&apos;application</h2>
        <p className="text-white/60 text-sm">{images.length} captures</p>
      </div>

      <div className="relative">
        <ul
          ref={stripRef}
          onScroll={updateArrows}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 sm:scroll-px-0 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((image, index) => (
            <li key={image.src} className="snap-start shrink-0 w-40 sm:w-48">
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                aria-label={`Agrandir : ${image.caption}`}
                className="group block w-full text-left focus:outline-none"
              >
                <img
                  src={image.src}
                  alt={image.caption}
                  loading="lazy"
                  className="w-full aspect-[1/2] object-cover object-top rounded-2xl border border-white/10 shadow-lg transition group-hover:border-accent/60 group-focus-visible:ring-2 group-focus-visible:ring-accent"
                />
                <span className="mt-2 block text-xs text-white/70 leading-snug">{image.caption}</span>
              </button>
            </li>
          ))}
        </ul>

        {/* Flèches aux extrémités de la bande, masquées quand on est au bout */}
        {canScroll.prev && (
          <button
            type="button"
            aria-label="Captures précédentes"
            onClick={() => scrollStrip(-1)}
            className={`${arrowClass} -left-2 sm:-left-5 -mt-4 z-10`}
          >
            <ChevronIcon className="w-7 h-7" />
          </button>
        )}
        {canScroll.next && (
          <button
            type="button"
            aria-label="Captures suivantes"
            onClick={() => scrollStrip(1)}
            className={`${arrowClass} -right-2 sm:-right-5 -mt-4 z-10`}
          >
            <ChevronIcon className="w-7 h-7 rotate-180" />
          </button>
        )}
      </div>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Captures de ${projectName}`}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-4"
          onClick={close}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={close}
            aria-label="Fermer"
            className="absolute top-4 right-4 inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/10 border border-white/20 text-white text-2xl leading-none hover:bg-white/20 transition"
          >
            ×
          </button>

          <figure className="relative flex flex-col items-center gap-3" onClick={(event) => event.stopPropagation()}>
            <img src={current.src} alt={current.caption} className="max-h-[80vh] w-auto rounded-2xl shadow-2xl" />
            <figcaption className="text-white/85 text-sm text-center">
              {current.caption}
              <span className="ml-2 text-white/50 tabular-nums">
                {openIndex + 1} / {images.length}
              </span>
            </figcaption>
          </figure>

          {images.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Capture précédente"
                onClick={(event) => {
                  event.stopPropagation();
                  show(-1);
                }}
                className={`${arrowClass} left-3 sm:left-8`}
              >
                <ChevronIcon className="w-7 h-7" />
              </button>
              <button
                type="button"
                aria-label="Capture suivante"
                onClick={(event) => {
                  event.stopPropagation();
                  show(1);
                }}
                className={`${arrowClass} right-3 sm:right-8`}
              >
                <ChevronIcon className="w-7 h-7 rotate-180" />
              </button>
            </>
          )}
        </div>
      )}
    </section>
  );
};

Gallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      caption: PropTypes.string.isRequired,
    })
  ),
  projectName: PropTypes.string.isRequired,
};

export default Gallery;
