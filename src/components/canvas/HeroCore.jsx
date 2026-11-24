"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import useInViewport from "../../hooks/useInViewport";
import { usePrefersReducedMotion } from "../../hooks/useMediaQuery";

// Couleurs de la charte
const VIOLET = new THREE.Color("#915eff");
const VIOLET_LIGHT = new THREE.Color("#efe7ff");
const VIOLET_DEEP = new THREE.Color("#3b1f8f");
const CYAN = "#22d3ee";
const LAVENDER = "#b79cff";

// Position de la souris sur toute la page (-1 à 1), partagée par la scène
const pointer = { x: 0, y: 0 };

// Texture ronde et douce pour les particules (sinon WebGL dessine des carrés)
const makeDotTexture = () => {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.35, "rgba(255,255,255,0.8)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
};

// Noyau : particules réparties dans une sphère, plus denses et plus claires au centre
const Core = ({ count }) => {
  const ref = useRef();
  const texture = useMemo(() => makeDotTexture(), []);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();
    for (let i = 0; i < count; i += 1) {
      // Rayon tiré vers le centre (puissance) pour un cœur lumineux et un bord diffus
      /* eslint-disable react-hooks/purity -- nuage aléatoire calculé une seule fois (useMemo) */
      const r = Math.pow(Math.random(), 1.6) * 1.3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      /* eslint-enable react-hooks/purity */
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const t = r / 1.3;
      if (t < 0.35) color.copy(VIOLET_LIGHT).lerp(VIOLET, t / 0.35);
      else color.copy(VIOLET).lerp(VIOLET_DEEP, (t - 0.35) / 0.65);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.12;
    // Respiration lente du noyau
    const s = 1 + Math.sin(state.clock.elapsedTime * 1.05) * 0.035;
    ref.current.scale.setScalar(s);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        size={0.075}
        sizeAttenuation
        vertexColors
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

Core.propTypes = {
  count: PropTypes.number.isRequired,
};

// Halo violet et cyan derrière le noyau, comme la lueur de la maquette
const Glow = () => {
  const texture = useMemo(() => makeDotTexture(), []);
  return (
    <>
      <sprite scale={[3.8, 3.8, 1]}>
        <spriteMaterial map={texture} color="#6b3ae6" transparent opacity={0.55} depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
      <sprite scale={[5.2, 5.2, 1]}>
        <spriteMaterial map={texture} color="#22d3ee" transparent opacity={0.06} depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
    </>
  );
};

// Anneau orbital : un cercle fin et un satellite lumineux qui en fait le tour
const Orbit = ({ radius, tilt, speed, color, dashed = false, satellite = true }) => {
  const group = useRef();
  const moon = useRef();

  const line = useMemo(() => {
    const points = [];
    const segments = 160;
    for (let i = 0; i <= segments; i += 1) {
      const a = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = dashed
      ? new THREE.LineDashedMaterial({ color, dashSize: 0.08, gapSize: 0.06, transparent: true, opacity: 0.65 })
      : new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.6 });
    const object = new THREE.Line(geometry, material);
    if (dashed) object.computeLineDistances();
    return object;
  }, [radius, color, dashed]);

  useEffect(
    () => () => {
      line.geometry.dispose();
      line.material.dispose();
    },
    [line]
  );

  useFrame((state) => {
    if (!moon.current) return;
    const a = state.clock.elapsedTime * speed;
    moon.current.position.set(Math.cos(a) * radius, 0, Math.sin(a) * radius);
  });

  return (
    <group ref={group} rotation={tilt}>
      <primitive object={line} />
      {satellite && (
        <mesh ref={moon}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>
      )}
    </group>
  );
};

Orbit.propTypes = {
  radius: PropTypes.number.isRequired,
  tilt: PropTypes.arrayOf(PropTypes.number).isRequired,
  speed: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  dashed: PropTypes.bool,
  satellite: PropTypes.bool,
};

// L'ensemble s'oriente doucement vers la souris
const Scene = ({ isMobile }) => {
  const rig = useRef();
  // Réduit l'ensemble si le cadre est étroit : les anneaux ne sont jamais coupés
  const viewportWidth = useThree((state) => state.viewport.width);
  const fit = Math.min(1, viewportWidth / 5.2);

  useFrame((state, delta) => {
    if (!rig.current) return;
    const targetX = pointer.y * 0.35;
    const targetY = pointer.x * 0.5;
    const k = 1 - Math.exp(-delta * 2.5);
    rig.current.rotation.x += (targetX - rig.current.rotation.x) * k;
    rig.current.rotation.y += (targetY - rig.current.rotation.y) * k;
  });

  return (
    <group ref={rig} scale={fit}>
      <Glow />
      <Core count={isMobile ? 2500 : 6000} />
      <Orbit radius={2.3} tilt={[0.42, 0, 0.12]} speed={0.35} color={CYAN} />
      <Orbit radius={1.9} tilt={[-0.6, 0.35, -0.25]} speed={-0.5} color={LAVENDER} dashed />
      <Orbit radius={1.6} tilt={[0.5, -0.5, 0.6]} speed={0.7} color={CYAN} satellite={false} />
    </group>
  );
};

Scene.propTypes = {
  isMobile: PropTypes.bool,
};

// Image fixe du noyau, en CSS : affichée pendant le chargement, sans WebGL,
// sur appareil modeste ou quand le visiteur demande moins d'animations
export const HeroCoreFallback = () => (
  <div className="relative w-full h-full flex items-center justify-center" aria-hidden="true">
    <div className="absolute w-[min(78%,420px)] aspect-square rounded-full border border-cyan/40 [transform:rotateX(72deg)]" />
    <div className="absolute w-[min(62%,340px)] aspect-square rounded-full border border-dashed border-accent-light/50 [transform:rotateX(64deg)_rotateY(-20deg)]" />
    <div className="w-[min(40%,220px)] aspect-square rounded-full bg-[radial-gradient(circle_at_34%_28%,#efe7ff_0%,#a57dff_22%,#6b3ae6_48%,#1f1060_74%,#080620_100%)] shadow-[0_0_120px_20px_rgba(145,94,255,0.45),0_0_220px_80px_rgba(34,211,238,0.1)]" />
  </div>
);

const canRunWebGL = () => {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
};

const isLowEnd = () => {
  const memory = navigator.deviceMemory ?? 8;
  const cores = navigator.hardwareConcurrency ?? 8;
  const saveData = navigator.connection?.saveData === true;
  return saveData || memory <= 2 || cores <= 2;
};

// Noyau de particules et anneaux orbitaux, entièrement procédural (aucun modèle à télécharger)
const HeroCore = () => {
  const containerRef = useRef(null);
  const isVisible = useInViewport(containerRef, "100px 0px");
  const reducedMotion = usePrefersReducedMotion();
  const [mode, setMode] = useState("pending");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    /* eslint-disable react-hooks/set-state-in-effect -- détection du support WebGL, possible seulement dans le navigateur */
    setIsMobile(mobile);
    setMode(canRunWebGL() && !isLowEnd() ? "3d" : "static");
    /* eslint-enable react-hooks/set-state-in-effect */

    const onMove = (event) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const showCanvas = mode === "3d";

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {!showCanvas && <HeroCoreFallback />}
      {showCanvas && (
        <Canvas
          // Animations réduites : une seule image ; hors écran : plus aucun rendu
          frameloop={!isVisible ? "never" : reducedMotion ? "demand" : "always"}
          dpr={isMobile ? [1, 1.5] : [1, 2]}
          camera={{ position: [0, 0, isMobile ? 7.4 : 6.8], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          aria-hidden="true"
        >
          <Scene isMobile={isMobile} />
        </Canvas>
      )}
    </div>
  );
};

export default HeroCore;
