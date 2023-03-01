import _ from 'lodash'
import * as THREE from "three"
import { RoundedBoxGeometry } from './3DComponents/RoundedBoxGeometry'
import { Canvas } from "@react-three/fiber "
import { EffectComposer, DepthOfField } from "@react-three/postprocessing"
import { ObjectContainer } from './ObjectContainer'


const RenderCanvas = ({ count = 200, depth = 80 }) => {
    const material = new THREE.MeshLambertMaterial();
    const roundedBox = new RoundedBoxGeometry(0.5, 0.5, 0.5, 2, 0.05);
    const sphere = new THREE.SphereGeometry(0.28)
    const canvasElement = document.getElementsByTagName('canvas')[0]
    canvasElement?.addEventListener("webglcontextlost", () => window.location.reload())
    const blue = "#8abff4"
    const night = "#461d6b"
    const color = <color attach="background" args={[blue]} />
    return (
        <Canvas
            shadows
            gl={{ alpha: true, antialias: false }}
            position={[0, 0, 10]}
            camera={{ near: 0.01, far: 110, fov: 40 }}
            dpr={[1, 1.5]}
        >
            {color}
            {/* <Environment preset="apartment" /> */}
            <spotLight position={[50, 10, 10]} penumbra={1} intensity={1} />
            <ambientLight intensity={1} />

            {Array.from({ length: count }, (_, i) => <ObjectContainer key={i} index={i} z={(i / count) * depth + 20} geometry={i % 2 ? roundedBox : sphere} material={material} />)}

            <EffectComposer multisampling={0}>
                <DepthOfField
                    target={[0, 0, 30]}
                    focalLength={1.5}
                    bokehScale={10}
                    height={700}
                />
            </EffectComposer>
        </Canvas>
    );
};

export default RenderCanvas;
