/* eslint-disable react/no-unknown-property */

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, Grid, Html, RoundedBox, Text, useTexture } from "@react-three/drei";
import { easing } from "maath";
import * as THREE from "three";
import PropTypes from "prop-types";

import CanvasLoader from "../Loader";
import useInViewport from "../../hooks/useInViewport";
import { stackLayers, stackTechs } from "../../constants/stack";

/* -------------------------------------------------------------------------- */
/*  Dimensions de la pile                                                      */
/* -------------------------------------------------------------------------- */

const PLATE = { w: 4.2, d: 2.4, t: 0.2 };
const INFRA = { w: 4.8, d: 3, t: 0.26 };
const KEY = { size: 0.66, h: 0.14, gap: 0.82, cols: 4 };
const NODE = { w: 1.3, h: 0.12, d: 1.5, spacing: 1.5 };
const POD = { size: 0.32, slotGap: 0.4, capacity: 3 };

// Hauteur occupée au-dessus de chaque plaque (tuiles, ou nœuds + conteneurs)
const INFRA_CONTENT = NODE.h + POD.size + 0.04;
const KEY_CONTENT = KEY.h;

const GAP_CLOSED = 0.15;
const GAP_OPEN = 1;
const REDEPLOY_FADE = 0.3;
const REDEPLOY_IDLE = 6;

const MOBILE_QUERY = "(max-width: 767px)";
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

// Ordre de bas en haut, identique à stackLayers
const LAYER_IDS = stackLayers.map((layer) => layer.id);

// Position verticale (centre de chaque plaque) pour un écart donné entre couches
const computeLayout = (gap) => {
  const ys = [0];
  let previousTop = INFRA.t / 2 + INFRA_CONTENT;

  for (let i = 1; i < LAYER_IDS.length; i += 1) {
    const y = ys[i - 1] + previousTop + gap + PLATE.t / 2;
    ys.push(y);
    previousTop = PLATE.t / 2 + KEY_CONTENT;
  }

  const top = ys[ys.length - 1] + PLATE.t / 2 + KEY_CONTENT;
  const bottom = -INFRA.t / 2;
  return { ys, offset: -(top + bottom) / 2 };
};

// Grille centrée : chaque ligne est recentrée selon son nombre de tuiles
const gridPositions = (count, cols, spacing) => {
  const rows = Math.ceil(count / cols);
  const positions = [];
  for (let i = 0; i < count; i += 1) {
    const row = Math.floor(i / cols);
    const inRow = row === rows - 1 ? count - row * cols : cols;
    const col = i % cols;
    positions.push([(col - (inRow - 1) / 2) * spacing, (row - (rows - 1) / 2) * spacing]);
  }
  return positions;
};

const nodeX = (index, total) => (index - (total - 1) / 2) * NODE.spacing;
const slotX = (slot) => (slot - (POD.capacity - 1) / 2) * POD.slotGap;

/* -------------------------------------------------------------------------- */
/*  Hooks utilitaires                                                          */
/* -------------------------------------------------------------------------- */

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const handle = (event) => setMatches(event.matches);
    media.addEventListener("change", handle);
    return () => media.removeEventListener("change", handle);
  }, [query]);

  return matches;
};

const useHoverCursor = (active) => {
  useEffect(() => {
    if (!active) return undefined;
    document.body.style.cursor = "pointer";
    return () => {
      document.body.style.cursor = "";
    };
  }, [active]);
};

// Monogramme dessiné dans un canvas 2D, pour les technos sans logo local
const makeMonogramTexture = (label, color) => {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = color;
  ctx.font = `700 ${label.length > 2 ? 92 : 120}px Poppins, system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, size / 2, size / 2 + 6);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
};

// Toutes les textures de logos chargées en une fois (une seule suspension)
const useLogoTextures = () => {
  const withIcons = useMemo(() => stackTechs.filter((tech) => tech.icon), []);
  const loaded = useTexture(withIcons.map((tech) => tech.icon));

  return useMemo(() => {
    const map = {};
    withIcons.forEach((tech, index) => {
      const texture = loaded[index];
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 4;
      texture.needsUpdate = true;
      map[tech.name] = texture;
    });
    stackTechs
      .filter((tech) => !tech.icon && tech.monogram)
      .forEach((tech) => {
        const layer = stackLayers.find((item) => item.id === tech.layerId);
        map[tech.name] = makeMonogramTexture(tech.monogram, layer?.id === "infra" ? "#0e7490" : "#4c3bb3");
      });
    return map;
  }, [loaded, withIcons]);
};

/* -------------------------------------------------------------------------- */
/*  Tuiles (couches Data, Back-end, Front-end)                                 */
/* -------------------------------------------------------------------------- */

const capBase = new THREE.Color("#efeaff");
const capDim = new THREE.Color("#5d5878");

const Tooltip = ({ label, y }) => (
  <Html position={[0, y, 0]} center zIndexRange={[20, 0]} style={{ pointerEvents: "none" }}>
    <span className="whitespace-nowrap rounded-md bg-tertiary/95 px-2 py-1 text-[12px] font-medium text-white shadow-card ring-1 ring-white/10">
      {label}
    </span>
  </Html>
);

Tooltip.propTypes = {
  label: PropTypes.string.isRequired,
  y: PropTypes.number.isRequired,
};

const Keycap = ({ tech, texture, position, color, fx, isHovered, isSelected }) => {
  const group = useRef();
  const cap = useRef();
  const logo = useRef();
  const userData = useMemo(() => ({ tech }), [tech]);
  const glow = useMemo(() => new THREE.Color(color), [color]);

  useFrame((_, delta) => {
    const lifted = isHovered || isSelected;
    easing.damp(group.current.position, "y", lifted ? 0.14 : 0, 0.12, delta);
    const dim = fx.current.dim;
    cap.current.color.copy(capBase).lerp(capDim, dim);
    easing.damp(cap.current, "emissiveIntensity", lifted ? 0.45 : 0, 0.15, delta);
    logo.current.opacity = 1 - dim * 0.55;
  });

  return (
    <group position={[position[0], PLATE.t / 2 + KEY.h / 2, position[1]]}>
      <group ref={group}>
        <RoundedBox
          args={[KEY.size, KEY.h, KEY.size]}
          radius={0.05}
          smoothness={3}
          userData={userData}
        >
          <meshStandardMaterial ref={cap} color={capBase} roughness={0.45} emissive={glow} emissiveIntensity={0} />
        </RoundedBox>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, KEY.h / 2 + 0.002, 0]} raycast={() => null}>
          <planeGeometry args={[KEY.size * 0.68, KEY.size * 0.68]} />
          <meshBasicMaterial ref={logo} map={texture} transparent toneMapped={false} depthWrite={false} />
        </mesh>
        {isHovered && <Tooltip label={tech.name} y={0.42} />}
      </group>
    </group>
  );
};

const techShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  layerId: PropTypes.string.isRequired,
  layerName: PropTypes.string.isRequired,
});

Keycap.propTypes = {
  tech: techShape.isRequired,
  texture: PropTypes.object,
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  color: PropTypes.string.isRequired,
  fx: PropTypes.object.isRequired,
  isHovered: PropTypes.bool,
  isSelected: PropTypes.bool,
};

/* -------------------------------------------------------------------------- */
/*  Plaque commune (verre teinté + bord lumineux + nom sur la tranche)         */
/* -------------------------------------------------------------------------- */

const Plate = ({ layerId, size, color, tint, label, fx, isHovered, isDimmed }) => {
  const material = useRef();
  const userData = useMemo(() => ({ layerId }), [layerId]);
  const edges = useRef();
  const glow = useMemo(() => new THREE.Color(color), [color]);

  useFrame((_, delta) => {
    const target = isHovered ? 0.4 : isDimmed ? 0.02 : 0.1;
    easing.damp(material.current, "emissiveIntensity", target, 0.2, delta);
    easing.damp(fx.current, "dim", isDimmed ? 1 : 0, 0.2, delta);
    if (edges.current) {
      edges.current.material.opacity = isHovered ? 1 : isDimmed ? 0.25 : 0.65;
    }
  });

  return (
    <group>
      <RoundedBox args={[size.w, size.t, size.d]} radius={0.06} smoothness={4} userData={userData}>
        <meshPhysicalMaterial
          ref={material}
          color={tint}
          emissive={glow}
          emissiveIntensity={0.1}
          roughness={0.3}
          metalness={0.1}
          clearcoat={0.6}
          transparent
          opacity={0.8}
          depthWrite={false}
        />
      </RoundedBox>
      <mesh raycast={() => null}>
        <boxGeometry args={[size.w - 0.02, size.t - 0.02, size.d - 0.02]} />
        <meshBasicMaterial visible={false} />
        <Edges ref={edges} color={color} transparent opacity={0.65} lineWidth={1.2} toneMapped={false} />
      </mesh>
      <Text
        position={[-size.w / 2 + 0.16, 0, size.d / 2 + 0.004]}
        fontSize={0.12}
        letterSpacing={0.08}
        anchorX="left"
        anchorY="middle"
        color={color}
        raycast={() => null}
      >
        {label.toUpperCase()}
      </Text>
    </group>
  );
};

Plate.propTypes = {
  layerId: PropTypes.string.isRequired,
  size: PropTypes.shape({ w: PropTypes.number, t: PropTypes.number, d: PropTypes.number }).isRequired,
  color: PropTypes.string.isRequired,
  tint: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  fx: PropTypes.object.isRequired,
  isHovered: PropTypes.bool,
  isDimmed: PropTypes.bool,
};

/* -------------------------------------------------------------------------- */
/*  Couche (position verticale animée selon l'écart courant)                   */
/* -------------------------------------------------------------------------- */

const LayerGroup = ({ index, shared, children }) => {
  const ref = useRef();

  useFrame(() => {
    ref.current.position.y = shared.current.layout.ys[index];
  });

  return (
    <group ref={ref}>{children}</group>
  );
};

LayerGroup.propTypes = {
  index: PropTypes.number.isRequired,
  shared: PropTypes.object.isRequired,
  children: PropTypes.node,
};

const TileLayer = ({ layer, textures, hoveredLayer, hoveredName, selectedName }) => {
  const fx = useRef({ dim: 0 });
  const positions = useMemo(() => gridPositions(layer.techs.length, KEY.cols, KEY.gap), [layer.techs.length]);
  const isHovered = hoveredLayer === layer.id;
  const isDimmed = hoveredLayer !== null && !isHovered;

  return (
    <>
      <Plate
        layerId={layer.id}
        size={PLATE}
        color={layer.color}
        tint="#151030"
        label={layer.name}
        fx={fx}
        isHovered={isHovered}
        isDimmed={isDimmed}
      />
      {layer.techs.map((tech, i) => (
        <Keycap
          key={tech.name}
          tech={tech}
          texture={textures[tech.name]}
          position={positions[i]}
          color={layer.color}
          fx={fx}
          isHovered={hoveredName === tech.name}
          isSelected={selectedName === tech.name}
        />
      ))}
    </>
  );
};

TileLayer.propTypes = {
  layer: PropTypes.object.isRequired,
  textures: PropTypes.object.isRequired,
  hoveredLayer: PropTypes.string,
  hoveredName: PropTypes.string,
  selectedName: PropTypes.string,
};

/* -------------------------------------------------------------------------- */
/*  Couche Infra : mini cluster Kubernetes                                     */
/* -------------------------------------------------------------------------- */

const easeOut = (t) => 1 - (1 - t) ** 3;
const nodeBase = new THREE.Color("#161d3a");
const nodeDim = new THREE.Color("#0c1022");

const ClusterNode = ({ index, total, color, ledFlash, reducedMotion, fx }) => {
  const led = useRef();
  const body = useRef();

  useFrame((state, delta) => {
    const flash = ledFlash.current[index];
    if (flash > 0) ledFlash.current[index] = Math.max(0, flash - delta * 2.5);
    const pulse = reducedMotion ? 1 : 0.7 + 0.5 * Math.sin(state.clock.elapsedTime * 1.6 + index * 1.3);
    led.current.emissiveIntensity = pulse + ledFlash.current[index] * 5;
    body.current.color.copy(nodeBase).lerp(nodeDim, fx.current.dim);
  });

  return (
    <group position={[nodeX(index, total), INFRA.t / 2 + NODE.h / 2, 0]}>
      <RoundedBox args={[NODE.w, NODE.h, NODE.d]} radius={0.03} smoothness={3} raycast={() => null}>
        <meshStandardMaterial ref={body} color="#161d3a" roughness={0.6} metalness={0.3} />
      </RoundedBox>
      <mesh position={[NODE.w / 2 - 0.13, NODE.h / 2 + 0.03, NODE.d / 2 - 0.14]} raycast={() => null}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial ref={led} color="#22c55e" emissive="#22c55e" emissiveIntensity={1} toneMapped={false} />
      </mesh>
      <Text
        position={[-NODE.w / 2 + 0.1, NODE.h / 2 + 0.002, NODE.d / 2 - 0.14]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.075}
        anchorX="left"
        anchorY="middle"
        color={color}
        fillOpacity={0.5}
        raycast={() => null}
      >
        {`node-${index + 1}`}
      </Text>
    </group>
  );
};

ClusterNode.propTypes = {
  index: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  ledFlash: PropTypes.object.isRequired,
  reducedMotion: PropTypes.bool,
  fx: PropTypes.object.isRequired,
};

const Pod = ({ tech, texture, placement, nodeCount, color, redeploy, isHovered, isSelected }) => {
  const outer = useRef();
  const lift = useRef();
  const shell = useRef();
  const edges = useRef();
  const logoBack = useRef();
  const logo = useRef();
  const userData = useMemo(() => ({ tech }), [tech]);

  const x = nodeX(placement.node, nodeCount) + slotX(placement.slot);
  const y = INFRA.t / 2 + NODE.h + POD.size / 2;

  useFrame((_, delta) => {
    const current = redeploy.current;
    let scale = 1;
    if (current && current.name === tech.name) {
      const progress = Math.min(current.t / REDEPLOY_FADE, 1);
      scale = current.phase === "out" ? 1 - easeOut(progress) : easeOut(progress);
    }
    outer.current.scale.setScalar(Math.max(scale, 0.001));
    shell.current.opacity = 0.32 * scale;
    logoBack.current.opacity = 0.92 * scale;
    logo.current.opacity = scale;
    if (edges.current) edges.current.material.opacity = (isHovered || isSelected ? 1 : 0.75) * scale;

    const lifted = (isHovered || isSelected) && scale === 1;
    easing.damp(lift.current.position, "y", lifted ? 0.12 : 0, 0.12, delta);
    easing.damp(shell.current, "emissiveIntensity", lifted ? 0.8 : 0.25, 0.15, delta);
  });

  return (
    <group ref={outer} position={[x, y, 0.05]}>
      <group ref={lift}>
        <mesh userData={userData}>
          <boxGeometry args={[POD.size, POD.size, POD.size]} />
          <meshPhysicalMaterial
            ref={shell}
            color="#0b3a4a"
            emissive={color}
            emissiveIntensity={0.25}
            roughness={0.25}
            transparent
            opacity={0.32}
            depthWrite={false}
          />
          <Edges ref={edges} color={color} transparent opacity={0.75} lineWidth={1.4} toneMapped={false} />
        </mesh>
        <mesh position={[0, 0, POD.size / 2 + 0.002]} raycast={() => null}>
          <planeGeometry args={[POD.size * 0.78, POD.size * 0.78]} />
          <meshBasicMaterial ref={logoBack} color="#eef6ff" transparent opacity={0.92} toneMapped={false} />
        </mesh>
        <mesh position={[0, 0, POD.size / 2 + 0.004]} raycast={() => null}>
          <planeGeometry args={[POD.size * 0.62, POD.size * 0.62]} />
          <meshBasicMaterial ref={logo} map={texture} transparent toneMapped={false} depthWrite={false} />
        </mesh>
        {isHovered && <Tooltip label={tech.name} y={0.36} />}
      </group>
    </group>
  );
};

Pod.propTypes = {
  tech: techShape.isRequired,
  texture: PropTypes.object,
  placement: PropTypes.shape({ node: PropTypes.number, slot: PropTypes.number }).isRequired,
  nodeCount: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  redeploy: PropTypes.object.isRequired,
  isHovered: PropTypes.bool,
  isSelected: PropTypes.bool,
};

const initialPlacements = (layer) => {
  const placements = {};
  layer.nodes.forEach((node, nodeIndex) => {
    node.techs.forEach((tech, slot) => {
      placements[tech.name] = { node: nodeIndex, slot };
    });
  });
  return placements;
};

const InfraLayer = ({
  layer,
  textures,
  hoveredLayer,
  hoveredName,
  selectedName,
  autoRedeploy,
  shared,
  redeploy,
  reducedMotion,
}) => {
  const fx = useRef({ dim: 0 });
  const nodeCount = layer.nodes.length;
  const techs = useMemo(() => layer.nodes.flatMap((node) => node.techs), [layer.nodes]);
  const [placements, setPlacements] = useState(() => initialPlacements(layer));
  const placementsRef = useRef(placements);
  const ledFlash = useRef(layer.nodes.map(() => 0));
  const idle = useRef(0);

  const isHovered = hoveredLayer === layer.id;
  const isDimmed = hoveredLayer !== null && !isHovered;

  useEffect(() => {
    placementsRef.current = placements;
    // Position des conteneurs (repère de la pile) pour le départ / l'arrivée des particules
    shared.current.pods = techs.map((tech) => {
      const placement = placements[tech.name];
      return {
        name: tech.name,
        x: nodeX(placement.node, nodeCount) + slotX(placement.slot),
        z: 0.05,
      };
    });
  }, [placements, techs, nodeCount, shared]);

  const protectedNames = useRef([]);
  protectedNames.current = [hoveredName, selectedName];

  const startRedeploy = useCallback(() => {
    if (redeploy.current || reducedMotion) return;
    const current = placementsRef.current;
    const names = Object.keys(current)
      .filter((name) => !protectedNames.current.includes(name))
      .sort(() => Math.random() - 0.5);

    for (const name of names) {
      const from = current[name].node;
      const targets = layer.nodes
        .map((_, index) => index)
        .filter((index) => index !== from)
        .filter((index) => Object.values(current).filter((p) => p.node === index).length < POD.capacity);
      if (!targets.length) continue;

      const node = targets[Math.floor(Math.random() * targets.length)];
      const used = Object.values(current)
        .filter((p) => p.node === node)
        .map((p) => p.slot);
      const slot = [...Array(POD.capacity).keys()].find((s) => !used.includes(s));
      redeploy.current = { name, phase: "out", t: 0, to: { node, slot } };
      return;
    }
  }, [layer.nodes, reducedMotion, redeploy]);

  // Survol de la couche Infra : un redéploiement immédiat
  useEffect(() => {
    if (isHovered && autoRedeploy) {
      startRedeploy();
      idle.current = 0;
    }
  }, [isHovered, autoRedeploy, startRedeploy]);

  useFrame((_, delta) => {
    // Plafonné : après une pause (section hors écran, onglet en arrière-plan),
    // le minuteur reprend où il en était au lieu de sauter d'un coup.
    const dt = Math.min(delta, 0.05);
    const current = redeploy.current;
    if (current) {
      current.t += dt;
      if (current.phase === "out" && current.t >= REDEPLOY_FADE) {
        setPlacements((previous) => ({ ...previous, [current.name]: current.to }));
        ledFlash.current[current.to.node] = 1;
        current.phase = "in";
        current.t = 0;
      } else if (current.phase === "in" && current.t >= REDEPLOY_FADE) {
        redeploy.current = null;
      }
      return;
    }

    if (!autoRedeploy) return;
    idle.current += dt;
    if (idle.current >= REDEPLOY_IDLE) {
      idle.current = 0;
      startRedeploy();
    }
  });

  return (
    <>
      <Plate
        layerId={layer.id}
        size={INFRA}
        color={layer.color}
        tint="#070b18"
        label={layer.name}
        fx={fx}
        isHovered={isHovered}
        isDimmed={isDimmed}
      />
      <Grid
        position={[0, INFRA.t / 2 + 0.003, 0]}
        args={[INFRA.w - 0.2, INFRA.d - 0.2]}
        cellSize={0.2}
        cellThickness={0.6}
        cellColor="#0e4b5a"
        sectionSize={1}
        sectionThickness={1}
        sectionColor={layer.color}
        fadeDistance={60}
        fadeStrength={0}
        side={THREE.DoubleSide}
        raycast={() => null}
      />
      {layer.nodes.map((node, index) => (
        <ClusterNode
          key={node.id}
          index={index}
          total={nodeCount}
          color={layer.color}
          ledFlash={ledFlash}
          reducedMotion={reducedMotion}
          fx={fx}
        />
      ))}
      {techs.map((tech) => (
        <Pod
          key={tech.name}
          tech={tech}
          texture={textures[tech.name]}
          placement={placements[tech.name]}
          nodeCount={nodeCount}
          color={layer.color}
          redeploy={redeploy}
          isHovered={hoveredName === tech.name}
          isSelected={selectedName === tech.name}
        />
      ))}
    </>
  );
};

InfraLayer.propTypes = {
  layer: PropTypes.object.isRequired,
  textures: PropTypes.object.isRequired,
  hoveredLayer: PropTypes.string,
  hoveredName: PropTypes.string,
  selectedName: PropTypes.string,
  autoRedeploy: PropTypes.bool,
  shared: PropTypes.object.isRequired,
  redeploy: PropTypes.object.isRequired,
  reducedMotion: PropTypes.bool,
};

/* -------------------------------------------------------------------------- */
/*  Flux de requêtes : particules instanciées le long de courbes               */
/* -------------------------------------------------------------------------- */

const TRAIL = [0, 0.025, 0.05];
const TRAIL_SCALE = [1, 0.65, 0.4];
const ROUTES = 10;
const UP_COLOR = new THREE.Color("#67e8f9");
const DOWN_COLOR = new THREE.Color("#c4a8ff");

const tilePositionsByLayer = stackLayers
  .filter((layer) => layer.techs)
  .map((layer) => gridPositions(layer.techs.length, KEY.cols, KEY.gap));

const RequestFlow = ({ count, shared }) => {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Chaque route : un conteneur Infra de départ et une tuile cible par couche supérieure
  const routes = useMemo(
    () =>
      Array.from({ length: ROUTES }, (_, index) => ({
        pod: index,
        stops: tilePositionsByLayer.map((positions) => positions[Math.floor(Math.random() * positions.length)]),
        curve: new THREE.CatmullRomCurve3(
          Array.from({ length: tilePositionsByLayer.length + 1 }, () => new THREE.Vector3()),
          false,
          "centripetal"
        ),
      })),
    []
  );

  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        route: index % ROUTES,
        up: index % 2 === 0,
        t: Math.random(),
        speed: 0.16 + Math.random() * 0.14,
      })),
    [count]
  );

  useEffect(() => {
    particles.forEach((particle, index) => {
      TRAIL.forEach((_, trail) => {
        mesh.current.setColorAt(index * TRAIL.length + trail, particle.up ? UP_COLOR : DOWN_COLOR);
      });
    });
    mesh.current.instanceColor.needsUpdate = true;
  }, [particles]);

  const point = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    const { ys } = shared.current.layout;
    const pods = shared.current.pods;
    if (!pods?.length) return;

    // Les courbes suivent l'écartement courant des couches
    routes.forEach((route) => {
      const pod = pods[route.pod % pods.length];
      route.curve.points[0].set(pod.x, ys[0] + INFRA.t / 2 + NODE.h + POD.size + 0.02, pod.z);
      route.stops.forEach(([x, z], i) => {
        route.curve.points[i + 1].set(x, ys[i + 1] + PLATE.t / 2 + KEY.h + 0.04, z);
      });
    });

    const dt = Math.min(delta, 0.05);
    particles.forEach((particle, index) => {
      particle.t += dt * particle.speed;
      if (particle.t > 1) {
        particle.t = 0;
        particle.route = Math.floor(Math.random() * ROUTES);
      }
      const curve = routes[particle.route].curve;

      TRAIL.forEach((lag, trail) => {
        const progress = THREE.MathUtils.clamp(particle.t - lag, 0, 1);
        curve.getPoint(particle.up ? progress : 1 - progress, point);
        // Apparition / disparition douce aux extrémités
        const edge = Math.min(particle.t / 0.06, (1 - particle.t) / 0.06, 1);
        dummy.position.copy(point);
        dummy.scale.setScalar(TRAIL_SCALE[trail] * Math.max(edge, 0.001));
        dummy.updateMatrix();
        mesh.current.setMatrixAt(index * TRAIL.length + trail, dummy.matrix);
      });
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count * TRAIL.length]} raycast={() => null} frustumCulled={false}>
      <sphereGeometry args={[0.045, 8, 8]} />
      <meshBasicMaterial
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </instancedMesh>
  );
};

RequestFlow.propTypes = {
  count: PropTypes.number.isRequired,
  shared: PropTypes.object.isRequired,
};

/* -------------------------------------------------------------------------- */
/*  Scène                                                                      */
/* -------------------------------------------------------------------------- */

const Stack = ({ exploded, reducedMotion, isMobile, onSelect, selectedName }) => {
  const root = useRef();
  const offsetGroup = useRef();
  const textures = useLogoTextures();
  const [hover, setHover] = useState({ layer: null, tech: null });
  const redeploy = useRef(null);
  useHoverCursor(hover.tech !== null);

  const startGap = exploded || reducedMotion ? GAP_OPEN : GAP_CLOSED;
  const shared = useRef({ gap: startGap, layout: computeLayout(startGap), pods: [] });

  useFrame((state, delta) => {
    const s = shared.current;
    const target = exploded ? GAP_OPEN : GAP_CLOSED;
    if (reducedMotion) s.gap = GAP_OPEN;
    else easing.damp(s, "gap", target, 0.35, delta);
    s.layout = computeLayout(s.gap);
    offsetGroup.current.position.y = s.layout.offset;

    if (reducedMotion) return;
    const t = state.clock.elapsedTime;
    root.current.position.y = Math.sin(t * 0.8) * 0.06;
    root.current.rotation.y = Math.sin(t * 0.15) * 0.1;
  });

  // Un seul test d'impact pour toute la pile : la tuile ou le conteneur le plus proche
  // gagne, même s'il est vu à travers une plaque translucide.
  const pick = useCallback(
    (intersections) => {
      const techHit = intersections.find(
        (hit) => hit.object.userData.tech && redeploy.current?.name !== hit.object.userData.tech.name
      );
      if (techHit) {
        const { tech } = techHit.object.userData;
        return { layer: tech.layerId, tech };
      }
      const layerHit = intersections.find((hit) => hit.object.userData.layerId);
      return { layer: layerHit?.object.userData.layerId ?? null, tech: null };
    },
    []
  );

  const handleMove = useCallback(
    (event) => {
      const next = pick(event.intersections);
      setHover((current) =>
        current.layer === next.layer && current.tech === (next.tech?.name ?? null)
          ? current
          : { layer: next.layer, tech: next.tech?.name ?? null }
      );
    },
    [pick]
  );

  const handleOut = useCallback(() => setHover({ layer: null, tech: null }), []);

  const handleClick = useCallback(
    (event) => {
      event.stopPropagation();
      const { tech } = pick(event.intersections);
      if (tech) onSelect(tech);
    },
    [pick, onSelect]
  );

  return (
    <group ref={root} onPointerMove={handleMove} onPointerOut={handleOut} onClick={handleClick}>
      <group ref={offsetGroup}>
        {stackLayers.map((layer, index) => (
          <LayerGroup key={layer.id} index={index} shared={shared}>
            {layer.nodes ? (
              <InfraLayer
                layer={layer}
                textures={textures}
                hoveredLayer={hover.layer}
                hoveredName={hover.tech}
                selectedName={selectedName}
                autoRedeploy={!isMobile && !reducedMotion}
                shared={shared}
                redeploy={redeploy}
                reducedMotion={reducedMotion}
              />
            ) : (
              <TileLayer
                layer={layer}
                textures={textures}
                hoveredLayer={hover.layer}
                hoveredName={hover.tech}
                selectedName={selectedName}
              />
            )}
          </LayerGroup>
        ))}
        {!reducedMotion && <RequestFlow count={isMobile ? 30 : 60} shared={shared} />}
      </group>
    </group>
  );
};

Stack.propTypes = {
  exploded: PropTypes.bool,
  reducedMotion: PropTypes.bool,
  isMobile: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  selectedName: PropTypes.string,
};

/* -------------------------------------------------------------------------- */
/*  Panneau de détail (HTML, hors canvas)                                      */
/* -------------------------------------------------------------------------- */

const DetailPanel = ({ tech, onClose }) => {
  const panel = useRef();

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    const onPointer = (event) => {
      if (panel.current && !panel.current.contains(event.target)) onClose();
    };
    window.addEventListener("keydown", onKey);
    // Au tick suivant : le clic qui a ouvert le panneau ne doit pas le refermer
    const timer = setTimeout(() => window.addEventListener("pointerdown", onPointer), 0);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [onClose]);

  return (
    <div
      ref={panel}
      role="dialog"
      aria-label={`${tech.name} : projets associés`}
      className="absolute bottom-3 left-3 right-3 sm:bottom-auto sm:top-10 sm:right-auto sm:w-80 z-20 rounded-2xl bg-tertiary/95 backdrop-blur-md p-5 shadow-card ring-1 ring-white/10 animate-slide-up"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-accent-light">{tech.layerName}</p>
          <h3 className="mt-1 text-[20px] font-bold text-white">{tech.name}</h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="-mr-1 -mt-1 rounded-lg p-1.5 text-secondary hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Fermer"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      {tech.usageNote ? (
        <>
          <p className="mt-4 text-[14px] font-medium text-white-100">{tech.usageNote}</p>
          {tech.usedIn.length > 0 && <p className="mt-3 text-[13px] font-medium text-secondary">Notamment :</p>}
        </>
      ) : (
        <p className="mt-4 text-[13px] font-medium text-secondary">Utilisé dans :</p>
      )}
      {tech.usedIn.length ? (
        <ul className="mt-2 flex flex-col gap-1.5">
          {tech.usedIn.map((usage) => (
            <li key={usage.label} className="flex items-center gap-2 text-[14px] text-white-100">
              <span
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${usage.kind === "experience" ? "bg-cyan" : "bg-accent"}`}
              />
              <span>{usage.label}</span>
              <span className="text-[12px] text-secondary">
                {usage.kind === "experience" ? "· expérience" : "· projet"}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        !tech.usageNote && <p className="mt-2 text-[14px] text-secondary">Pas encore de projet présenté ici.</p>
      )}
    </div>
  );
};

DetailPanel.propTypes = {
  tech: PropTypes.shape({
    name: PropTypes.string.isRequired,
    layerName: PropTypes.string.isRequired,
    usageNote: PropTypes.string,
    usedIn: PropTypes.arrayOf(
      PropTypes.shape({ label: PropTypes.string.isRequired, kind: PropTypes.string.isRequired })
    ).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

/* -------------------------------------------------------------------------- */
/*  Section complète                                                           */
/* -------------------------------------------------------------------------- */

const StackCanvas = () => {
  const container = useRef(null);
  const isVisible = useInViewport(container);
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const reducedMotion = useMediaQuery(REDUCED_QUERY);
  const [pointerInside, setPointerInside] = useState(false);
  const [selected, setSelected] = useState(null);

  // Desktop : vue éclatée au survol. Mobile : dès que la section est à l'écran.
  const exploded = reducedMotion || (isMobile ? isVisible : pointerInside);
  const closePanel = useCallback(() => setSelected(null), []);

  const camera = useMemo(
    () => ({
      position: isMobile ? [9.1, 6.3, 10.9] : [7.5, 5.2, 9],
      fov: 30,
      near: 0.1,
      far: 100,
    }),
    [isMobile]
  );

  return (
    <div
      ref={container}
      className="relative w-full h-[460px] sm:h-[560px] lg:h-[620px]"
      onPointerEnter={(event) => event.pointerType === "mouse" && setPointerInside(true)}
      onPointerLeave={(event) => event.pointerType === "mouse" && setPointerInside(false)}
    >
      <Canvas
        key={isMobile ? "mobile" : "desktop"}
        frameloop={isVisible ? "always" : "never"}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={camera}
        onCreated={({ camera: cam }) => cam.lookAt(0, 0, 0)}
      >
        <ambientLight intensity={0.55} />
        <hemisphereLight args={["#b9a6ff", "#0b1020", 0.35]} />
        <directionalLight position={[5, 10, 6]} intensity={1.3} />
        <pointLight position={[-4, -2, 3]} intensity={6} distance={12} color="#22d3ee" />
        <Suspense fallback={<CanvasLoader />}>
          <Stack
            exploded={exploded}
            reducedMotion={reducedMotion}
            isMobile={isMobile}
            onSelect={setSelected}
            selectedName={selected?.name ?? null}
          />
        </Suspense>
      </Canvas>

      <p className="pointer-events-none absolute top-2 right-3 text-[12px] text-secondary/70">
        {isMobile ? "Touchez une techno pour voir où je l'ai utilisée" : "Survolez la pile · cliquez sur une techno"}
      </p>

      {selected && <DetailPanel key={selected.name} tech={selected} onClose={closePanel} />}
    </div>
  );
};

export default StackCanvas;
