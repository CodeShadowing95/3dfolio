import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";


const Preloader = ({ onLoadComplete }) => {
  // Read real loading progress from R3F canvas loaders
  const { progress: canvasProgress } = useProgress();
  const displayProgress = Math.round(canvasProgress || 0);
  const [fadeOut, setFadeOut] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);

  // Drive animations once real progress hits 100
  useEffect(() => {
    if (displayProgress >= 100) {
      const t1 = setTimeout(() => setFadeOut(true), 300);
      const t2 = setTimeout(() => setPortalOpen(true), 900);
      const t3 = setTimeout(() => {
        if (typeof onLoadComplete === "function") onLoadComplete();
      }, 1700);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [displayProgress, onLoadComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-background ${fadeOut ? "pointer-events-none" : ""}`}>
      {/* Elegant gradient backdrop with subtle glow accents */}
      <div className={`absolute inset-0 pointer-events-none ${fadeOut ? "animate-fade-out" : ""}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b0c12] via-[#0e1120] to-[#0b0c12] opacity-90" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(40vmin 40vmin at 20% 20%, rgba(167,139,250,0.08) 0%, transparent 60%), radial-gradient(36vmin 36vmin at 80% 30%, rgba(56,189,248,0.10) 0%, transparent 60%), radial-gradient(44vmin 44vmin at 40% 80%, rgba(248,113,113,0.08) 0%, transparent 60%)",
          }}
        />
      </div>
      {/* Portal Left Panel */}
      <div
        className={`absolute inset-y-0 left-0 w-1/2 transition-transform duration-800 ease-in-out ${portalOpen ? "animate-portal-left" : ""
          }`}
      >
        <div className="h-full w-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border-r border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.45)]" />
      </div>

      {/* Portal Right Panel */}
      <div
        className={`absolute inset-y-0 right-0 w-1/2 transition-transform duration-800 ease-in-out ${portalOpen ? "animate-portal-right" : ""
          }`}
      >
        <div className="h-full w-full bg-gradient-to-bl from-neutral-900 via-neutral-800 to-neutral-900 border-l border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.45)]" />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 transition-opacity duration-600 ${fadeOut ? "animate-fade-out" : ""}`}
      >
        {/* Glass card contenant l’avatar, le titre et la progression */}
        <div className="relative mx-auto w-[92vw] max-w-[760px] sm:w-[86vw] md:w-[64vw] rounded-2xl border border-white/15 bg-white/5 px-5 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 shadow-xl backdrop-blur-md">
          {/* Anneau gradient subtil */}
          <div
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-60"
            style={{
              background:
                "linear-gradient(135deg, rgba(167,139,250,0.15), rgba(56,189,248,0.15))",
              filter: "blur(0.5px)",
            }}
          />

          {/* En-tête */}
          <div className="flex flex-col items-center gap-5">
            <div className="relative">
              {/* multi-layer glow */}
              <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-fuchsia-500/12 via-sky-500/12 to-emerald-500/12 blur-2xl" />
              <div className="absolute -inset-2 rounded-full bg-white/10 blur-xl" />
              <div className="absolute inset-0 rounded-full bg-primary/25 blur-3xl" />
              <img
                src="/avatar.jpg"
                alt="Patrick NAMEGNI avatar"
                className="relative h-20 w-20 sm:h-24 sm:w-24 md:h-32 md:w-32 rounded-full object-cover ring-2 ring-white/20 shadow-lg"
              />
            </div>

            <div className="text-center">
              <h2 className="text-white text-base sm:text-lg md:text-xl font-semibold tracking-wide">Patrick NAMEGNI</h2>
              <p className="text-white/75 text-xs sm:text-sm md:text-base">Portfolio – Chargement des assets 3D</p>
            </div>
          </div>

          {/* Progression */}
          <div className="mt-8">
            <div className="mb-3 flex items-center justify-center gap-3">
              <span className="text-xs sm:text-sm font-medium text-white/85">Chargement</span>
              <span className="text-xs sm:text-sm font-semibold text-white/95 tabular-nums">{displayProgress}%</span>
            </div>

            <div
              className="relative h-2.5 sm:h-3 md:h-4 overflow-hidden rounded-full bg-white/10 border border-white/20 backdrop-blur-sm"
              role="progressbar"
              aria-valuenow={displayProgress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 transition-[width] duration-300 ease-out shadow-[0_0_20px_rgba(124,58,237,0.35)]"
                style={{ width: `${displayProgress}%` }}
              >
                {/* shimmer */}
                <div
                  className="absolute inset-0 opacity-25"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, rgba(255,255,255,0.35) 0px, rgba(255,255,255,0.35) 6px, transparent 6px, transparent 12px)",
                    mixBlendMode: "overlay",
                  }}
                />
                {/* spark */}
                <div className="absolute right-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/90 shadow-[0_0_10px_rgba(255,255,255,0.85)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
