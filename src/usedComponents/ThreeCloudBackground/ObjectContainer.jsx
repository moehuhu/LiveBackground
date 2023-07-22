import { useFrame, useThree } from "@react-three/fiber ";
import { Detailed, useGLTF } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import niceColors from 'nice-color-palettes'

export const ObjectContainer = ({ index, z, scale = 1, geometry, material }) => {
    const ref = useRef();
    const { viewport, camera } = useThree();
    const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -z]);
    const [r] = useState(() => Math.random())
    const [data] = useState({
        x: THREE.MathUtils.randFloatSpread(width),
        y: THREE.MathUtils.randFloatSpread(2),
        rX: Math.random() * Math.PI,
        rZ: Math.random() * Math.PI,
        scale
    });

    useFrame((state, dt) => {
        if (dt < 0.1) {
            const newX = data.x += dt * 0.5
            const newY = (data.y * height) + Math.sin(state.clock.elapsedTime + r) * 0.1
            const newZ = -z
            ref.current.position.set(newX, newY, newZ);
        }

        if (data.x > (width - 20))
            data.x = -width;
    });

    return (
        <Detailed
            distances={[0, 0, 80]}
            ref={ref}
            scale={3.5}
        >
            <mesh geometry={geometry} material={material} />
        </Detailed>
    );
};
