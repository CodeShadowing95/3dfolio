/* eslint-disable react/no-unknown-property */

import { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

import useInViewport from '../../hooks/useInViewport';

const Stars = (props) => {
    const ref = useRef();

    const [sphere] = useState(() => random.inSphere(new Float32Array(5000 * 3), { radius: 1.2 }));

    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;
    })

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
                <PointMaterial
                    transparent
                    color="#f272c8"
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    )
}

const StarsCanvas = () => {
    const containerRef = useRef(null);
    const isVisible = useInViewport(containerRef);

    return (
        <div ref={containerRef} className="w-full h-auto absolute inset-0 z-[-1]">
            {/* Les étoiles tournent en continu : on coupe le rendu quand la section n'est plus à l'écran */}
            <Canvas frameloop={isVisible ? 'always' : 'never'} dpr={[1, 1.5]} camera={{ position: [0, 0, 1] }}>
                <Suspense fallback={null}>
                    <Stars />
                </Suspense>
            </Canvas>
        </div>
    )
}


export default StarsCanvas
