import { Canvas, useFrame } from '@react-three/fiber';
import styles from './Background.module.scss';
import { ContactShadows, Environment, Lightformer } from '@react-three/drei';
import { useControls } from 'leva';
import { useRef } from 'react';

const Cube: React.FC = () => {
	const mesh = useRef(null);

	useFrame((_, delta) => {
		mesh.current.rotation.x += delta;
		mesh.current.rotation.y += delta;
		mesh.current.rotation.z += delta;
	});

	const materialProps = useControls({
		thickness: { value: 5, min: 0, max: 20 },
		roughness: { value: 0, min: 0, max: 1, step: 0.1 },
		clearcoat: { value: 1, min: 0, max: 1, step: 0.1 },
		clearcoatRoughness: { value: 0, min: 0, max: 1, step: 0.1 },
		transmission: { value: 1, min: 0.9, max: 1, step: 0.01 },
		ior: { value: 1.25, min: 1, max: 2.3, step: 0.05 },
		envMapIntensity: { value: 25, min: 0, max: 100, step: 1 },
		color: '#ffffff',
		attenuationTint: '#ffe79e',
		attenuationDistance: { value: 0, min: 0, max: 1 },
	});

	return (
		<mesh ref={mesh}>
			<boxGeometry args={[1.5, 1.5, 1.5]} />
			<meshPhysicalMaterial {...materialProps} />
		</mesh>
	);
};

import { useLoader } from '@react-three/fiber';
import { EffectComposer, SSR, Bloom, LUT } from '@react-three/postprocessing';
import { LUTCubeLoader } from 'postprocessing';

const Effects = () => {
	const texture = useLoader(LUTCubeLoader, '/STD.cube');
	const { enabled, ...props } = useControls({
		enabled: true,
		temporalResolve: true,
		STRETCH_MISSED_RAYS: true,
		USE_MRT: true,
		USE_NORMALMAP: true,
		USE_ROUGHNESSMAP: true,
		ENABLE_JITTERING: true,
		ENABLE_BLUR: true,
		DITHERING: false,
		temporalResolveMix: { value: 0.9, min: 0, max: 1 },
		temporalResolveCorrectionMix: { value: 0.4, min: 0, max: 1 },
		maxSamples: { value: 0, min: 0, max: 1 },
		resolutionScale: { value: 1, min: 0, max: 1 },
		blurMix: { value: 0.2, min: 0, max: 1 },
		blurKernelSize: { value: 8, min: 0, max: 8 },
		BLUR_EXPONENT: { value: 10, min: 0, max: 20 },
		rayStep: { value: 0.5, min: 0, max: 1 },
		intensity: { value: 2.5, min: 0, max: 5 },
		maxRoughness: { value: 1, min: 0, max: 1 },
		jitter: { value: 0.3, min: 0, max: 5 },
		jitterSpread: { value: 0.25, min: 0, max: 1 },
		jitterRough: { value: 0.1, min: 0, max: 1 },
		roughnessFadeOut: { value: 1, min: 0, max: 1 },
		rayFadeOut: { value: 0, min: 0, max: 1 },
		MAX_STEPS: { value: 20, min: 0, max: 20 },
		NUM_BINARY_SEARCH_STEPS: { value: 6, min: 0, max: 10 },
		maxDepthDifference: { value: 5, min: 0, max: 10 },
		maxDepth: { value: 1, min: 0, max: 1 },
		thickness: { value: 3, min: 0, max: 10 },
		ior: { value: 1.45, min: 0, max: 2 },
	});
	return (
		enabled && (
			<EffectComposer disableNormalPass>
				<SSR {...props} />
				<Bloom
					luminanceThreshold={0.2}
					mipmapBlur
					luminanceSmoothing={0}
					intensity={1.75}
				/>
				<LUT lut={texture} />
			</EffectComposer>
		)
	);
};

export const Background: React.FC = () => {
	const environmentProps = useControls({
		background: false,
	});

	return (
		<div className={styles.scene}>
			<Canvas>
				<Cube />
				<hemisphereLight intensity={0.5} />
				<ContactShadows
					resolution={1024}
					position={[0, -4, 0]}
					scale={15}
					blur={0.5}
					opacity={0.5}
					far={20}
				/>
				<Environment
					{...environmentProps}
					files={['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']}
					path="/images/">
					<Lightformer
						intensity={8}
						rotation-x={Math.PI / 2}
						position={[0, 0, 0]}
						scale={[10, 1, 1]}
					/>
				</Environment>
				<Effects />
			</Canvas>
		</div>
	);
};
