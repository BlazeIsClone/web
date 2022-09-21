import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import styles from './Background.module.scss';

const Cube: React.FC = () => {
	const mesh = useRef(null);

	useFrame((_, delta) => {
		mesh.current.rotation.x += delta;
		mesh.current.rotation.y += delta;
		mesh.current.rotation.z += delta;
	});

	return (
		<mesh ref={mesh}>
			<boxGeometry args={[2, 2, 2]} />
			<meshPhysicalMaterial
				roughness={0}
				transmission={1}
				opacity={1}
				metalness={0.1}
			/>
		</mesh>
	);
};

export const Background: React.FC = () => (
	<div className={styles.scene}>
		<Canvas>
			<Cube />
			<ambientLight intensity={0.1} />
			<directionalLight color="red" position={[0, 0, 5]} />
			<color args={[0.1, 0.1, 0.1]} attach="background" />
		</Canvas>
	</div>
);
