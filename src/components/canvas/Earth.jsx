/* eslint-disable react/no-unknown-property */

import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import PropTypes from 'prop-types';

import CanvasLoader from '../Loader';
import useInViewport from '../../hooks/useInViewport';
import { journey } from '../../constants';
// Carte en points générée à partir des terres de Natural Earth (domaine public)
import earthDots from '../../assets/globe/earth-dots.webp';

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
                <div className={`whitespace-nowrap rounded-lg border border-white/15 bg-primary/85 backdrop-blur px-2.5 py-1.5 text-[12px] leading-4 shadow-card ${step.labelClassName ?? ''}`}>
                    <p className="font-semibold text-white">{step.city}</p>
                    <p className="text-secondary min-w-[180px] whitespace-normal">{step.detail}</p>
                </div>
            </Html>
        </group>
    );
};

Marker.propTypes = {
    step: PropTypes.shape({
        city: PropTypes.string.isRequired,
        detail: PropTypes.string.isRequired,
        lat: PropTypes.number.isRequired,
        lon: PropTypes.number.isRequired,
        labelClassName: PropTypes.string,
    }).isRequired,
    index: PropTypes.number.isRequired,
    current: PropTypes.bool,
    occluder: PropTypes.shape({ current: PropTypes.object }).isRequired,
};

const Globe = () => {
    const sphere = useRef(null);
    const texture = useTexture(earthDots);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;

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

                {journey.map((step, index) => (
                    <Marker key={step.city} step={step} index={index} current={index === journey.length - 1} occluder={sphere} />
                ))}

                {journey.slice(1).map((step, index) => (
                    <Arc key={step.city} from={journey[index]} to={step} delay={0.4 + index * (ARC_DURATION + 0.2)} />
                ))}
            </group>
        </group>
    );
};

const EarthCanvas = () => {
    const containerRef = useRef(null);
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
                <Suspense fallback={<CanvasLoader />}>
                    <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />
                    <Globe />
                </Suspense>
            </Canvas>

            {/* Légende lisible sur tous les écrans, y compris quand les étiquettes 3D sont masquées */}
            {/* <ol className="absolute -bottom-2 left-0 right-0 mx-auto w-fit max-w-full flex flex-wrap justify-center gap-x-4 gap-y-1 px-3 py-2 rounded-xl bg-primary/70 backdrop-blur text-[12px] sm:text-[13px]">
                {journey.map((step, index) => (
                    <li key={step.city} className="flex items-center gap-1.5 text-white-100">
                        <span className={`w-2 h-2 rounded-full ${index === journey.length - 1 ? 'bg-cyan' : 'bg-accent-light'}`} aria-hidden="true" />
                        <span className="font-semibold">{step.city}</span>
                        <span className="text-secondary">{step.period}</span>
                    </li>
                ))}
            </ol> */}
        </div>
    );
};

export default EarthCanvas;
