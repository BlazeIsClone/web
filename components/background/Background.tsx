import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Cloud, Environment, Sparkles } from '@react-three/drei';
import { useControls } from 'leva';
import { useRef } from 'react';

import styles from './Background.module.scss';
import { Effects } from './Effects';
import { Mesh } from 'three';

const Cube: React.FC = () => {
	const mesh = useRef<Mesh>(null);
	const { camera, scene } = useThree();

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
		envMapIntensity: { value: 3, min: 0, max: 100, step: 1 },
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
const VFX: React.FC = () => {
	const mesh = useRef<Mesh>(null);

	return (
		<mesh ref={mesh}>
			<Sparkles
				count={50}
				scale={5}
				size={2}
				speed={1.2}
				color={'white'}
				opacity={0.3}
			/>
		</mesh>
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
				<VFX />
				<hemisphereLight intensity={0.5} />
				<Environment
					{...environmentProps}
					files={['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']}
					path="/images/"
				/>
				<Cloud
					opacity={0.03}
					speed={0.4}
					width={10}
					depth={1.5}
					segments={20}
				/>
				<Effects />
			</Canvas>
		</div>
	);
};
