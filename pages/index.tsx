import { useRef } from 'react';
import Head from '../components/Head';
import classes from '../css/page.module.css';
import { Canvas, useFrame } from '@react-three/fiber';

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
			<meshStandardMaterial />
		</mesh>
	);
};

const Page: React.FC = () => {
	return (
		<main className={classes.page}>
			<Head title={'blazec'} />
			<header className={classes.header}>
				<h1>Blaze Hello 👋</h1>
				<hr />
				NextJS + Payload + Threejs{' '}
			</header>
			<div className={classes.scene}>
				<Canvas>
					<Cube />
					<ambientLight intensity={0.1} />
					<directionalLight color="red" position={[0, 0, 5]} />
					<color args={[0.1, 0.1, 0.1]} attach="background" />
				</Canvas>
			</div>
		</main>
	);
};

export default Page;
