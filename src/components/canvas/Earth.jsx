"use client";


import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import PropTypes from 'prop-types';

import useInViewport from '../../hooks/useInViewport';
import { journey } from '../../constants';
import { useI18n } from '../../i18n/I18nProvider';
// Carte en points générée à partir des terres de Natural Earth (domaine public)
const earthDots = "/assets/globe/earth-dots.webp";

const RADIUS = 2;
const ARC_POINTS = 64;
const ARC_DURATION = 1.4;

// Latitude / longitude -> position sur la sphère (même repère que la texture de SphereGeometry)
const toVector = (lat, lon, radius = RADIUS) => {
    const polar = THREE.MathUtils.degToRad(90 - lat);
    const azimuth = THREE.MathUtils.degToRad(lon + 180);
    return new THREE.Vector3(
        -radius * Math.sin(polar) * Math.cos(azimuth),
        radius * Math.cos(polar),
        radius * Math.sin(polar) * Math.sin(azimuth)
    );
};

// Oriente le globe pour que ce point soit face à la caméra au départ
const VIEW_CENTER = { lat: 27, lon: 9 };

// Le globe (halo et arcs compris) doit toujours tenir dans le cadre, quelle que soit sa forme
const FIT_RADIUS = 2.75;

// Recule la caméra selon le côté le plus court du canvas pour éviter que le globe soit rogné
const CameraFit = () => {
    const { camera, size } = useThree();

    useEffect(() => {
        const verticalFov = THREE.MathUtils.degToRad(camera.fov);
        const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * (size.width / size.height));
        const fov = Math.min(verticalFov, horizontalFov);
        camera.position.setLength(FIT_RADIUS / Math.sin(fov / 2));
        camera.updateProjectionMatrix();
    }, [camera, size]);

    return null;
};

const Arc = ({ from, to, delay }) => {
    const line = useMemo(() => {
        const start = toVector(from.lat, from.lon);
        const end = toVector(to.lat, to.lon);
        const lift = RADIUS + start.distanceTo(end) * 0.45 + 0.05;
        const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(lift);
        const points = new THREE.QuadraticBezierCurve3(start, mid, end).getPoints(ARC_POINTS);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        geometry.setDrawRange(0, 0);
        const material = new THREE.LineBasicMaterial({ color: '#22d3ee', transparent: true, opacity: 0.95 });
        const arc = new THREE.Line(geometry, material);
        // Ne doit pas masquer les étiquettes (la détection des lignes est très large par défaut)
        arc.raycast = () => null;
        return arc;
    }, [from, to]);

    // L'arc se dessine progressivement, l'un après l'autre
    useFrame(({ clock }) => {
        const progress = THREE.MathUtils.clamp((clock.elapsedTime - delay) / ARC_DURATION, 0, 1);
        line.geometry.setDrawRange(0, Math.ceil(progress * (ARC_POINTS + 1)));
    });

    return <primitive object={line} />;
};

Arc.propTypes = {
    from: PropTypes.shape({ lat: PropTypes.number, lon: PropTypes.number }).isRequired,
    to: PropTypes.shape({ lat: PropTypes.number, lon: PropTypes.number }).isRequired,
    delay: PropTypes.number.isRequired,
};

const Marker = ({ step, index, current, occluder }) => {
    const ring = useRef(null);
    const position = useMemo(() => toVector(step.lat, step.lon, RADIUS + 0.01), [step]);
    const normal = useMemo(() => position.clone().normalize(), [position]);
    const quaternion = useMemo(
        () => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal),
        [normal]
    );

    // Onde qui pulse autour de l'étape actuelle
    useFrame(({ clock }) => {
        if (!ring.current) return;
        const t = (clock.elapsedTime * 0.8 + index * 0.3) % 1;
        ring.current.scale.setScalar(1 + t * 2.2);
        ring.current.material.opacity = 0.7 * (1 - t);
    });

    const color = current ? '#22d3ee' : '#a98bf3';

    return (
        <group position={position} quaternion={quaternion}>
            <mesh>
                <circleGeometry args={[0.045, 24]} />
                <meshBasicMaterial color={color} />
            </mesh>
            {current && (
                <mesh ref={ring}>
                    <ringGeometry args={[0.05, 0.065, 32]} />
                    <meshBasicMaterial color={color} transparent opacity={0.7} side={THREE.DoubleSide} />
                </mesh>
            )}
            <Html
                position={[0, 0, 0.02]}
                occlude={[occluder]}
                zIndexRange={[20, 0]}
                className="hidden sm:block pointer-events-none select-none"
            >
                {/* Texte déjà traduit : le contexte de langue ne traverse pas le rendu séparé de <Html> */}
                <div className={`whitespace-nowrap rounded-lg bg-primary/80 px-2 py-1 text-[12px] leading-[1.3] ${step.labelClassName ?? ''}`}>
                    <p className="text-white">{step.label.city}</p>
                    <p className="text-secondary">{step.label.period}</p>
                </div>
            </Html>
        </group>
    );
};

Marker.propTypes = {
    step: PropTypes.shape({
        city: PropTypes.object.isRequired,
        label: PropTypes.shape({ city: PropTypes.string, period: PropTypes.string }).isRequired,
        lat: PropTypes.number.isRequired,
        lon: PropTypes.number.isRequired,
        labelClassName: PropTypes.string,
    }).isRequired,
    index: PropTypes.number.isRequired,
    current: PropTypes.bool,
    occluder: PropTypes.shape({ current: PropTypes.object }).isRequired,
};

const Globe = ({ steps }) => {
    const sphere = useRef(null);
    const texture = useTexture(earthDots);
    /* eslint-disable react-hooks/immutability -- réglage de la texture Three.js, objet mutable par nature */
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    /* eslint-enable react-hooks/immutability */

    return (
        <group rotation-x={THREE.MathUtils.degToRad(VIEW_CENTER.lat)}>
            <group rotation-y={THREE.MathUtils.degToRad(-(VIEW_CENTER.lon + 90))}>
                <mesh ref={sphere}>
                    <sphereGeometry args={[RADIUS, 96, 96]} />
                    <meshBasicMaterial map={texture} />
                </mesh>

                {/* Halo léger autour du globe */}
                <mesh scale={1.06}>
                    <sphereGeometry args={[RADIUS, 48, 48]} />
                    <meshBasicMaterial color="#22d3ee" transparent opacity={0.07} side={THREE.BackSide} />
                </mesh>

                {steps.map((step, index) => (
                    <Marker key={step.label.city} step={step} index={index} current={index === steps.length - 1} occluder={sphere} />
                ))}

                {steps.slice(1).map((step, index) => (
                    <Arc key={step.label.city} from={steps[index]} to={step} delay={0.4 + index * (ARC_DURATION + 0.2)} />
                ))}
            </group>
        </group>
    );
};

Globe.propTypes = {
    steps: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const EarthCanvas = () => {
    const containerRef = useRef(null);
    const { pick } = useI18n();
    const steps = useMemo(
        () => journey.map((step) => ({ ...step, label: { city: pick(step.city), period: pick(step.period) } })),
        [pick]
    );
    const isVisible = useInViewport(containerRef);

    return (
        <div ref={containerRef} className="relative w-full h-full">
            <Canvas
                // Rendu coupé quand le globe n'est plus à l'écran
                frameloop={isVisible ? 'always' : 'never'}
                dpr={[1, 1.75]}
                camera={{ fov: 40, near: 0.1, far: 100, position: [0, 0, 7] }}
            >
                <CameraFit />
                <Suspense fallback={null}>
                    <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />
                    <Globe steps={steps} />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default EarthCanvas;
