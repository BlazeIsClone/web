import { useEffect, useRef } from 'react';
import Head from '../components/Head';
import classes from '../css/page.module.css';
import {
	BoxGeometry,
	DirectionalLight,
	Mesh,
	MeshPhongMaterial,
	PerspectiveCamera,
	Scene,
	WebGL1Renderer,
} from 'three';

const Page: React.FC = () => {
	const canvas = useRef(null);

	useEffect(() => {
		const activeCanvas = canvas.current;

		// Setup Canvas
		const renderer = new WebGL1Renderer({ canvas: activeCanvas });

		//Setup Camera
		const fov = 75;
		const aspect = window.innerWidth / window.innerHeight;
		const near = 0.1;
		const far = 5;
		const camera = new PerspectiveCamera(fov, aspect, near, far);
		camera.position.z = 2;

		// Setup Scene
		const scene = new Scene();

		// Setup Geometry
		const boxWidth = 1;
		const boxHeight = 1;
		const boxDepth = 1;
		const geometry = new BoxGeometry(boxWidth, boxHeight, boxDepth);

		const material = new MeshPhongMaterial({ color: 0x44aa88 });
		const cube = new Mesh(geometry, material);

		// Add to scene
		scene.add(cube);

		// Render
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);

		renderer.render(scene, camera);

		const render = (time: number) => {
			time *= 0.0001; // convert time to seconds

			cube.rotation.x = time;
			cube.rotation.y = time;

			renderer.render(scene, camera);

			requestAnimationFrame(render);
		};
		requestAnimationFrame(render);

		const color = 0xffffff;
		const intensity = 1;
		const light = new DirectionalLight(color, intensity);
		light.position.set(-1, 2, 4);
		scene.add(light);

		// Redraw canvas on window diemention update
		const onWindowResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			renderer.setSize(window.innerWidth, window.innerHeight);
		};
		window.addEventListener('resize', onWindowResize, false);
	}, [canvas]);

	return (
		<main className={classes.page}>
			<Head title={'blazec'} />
			<header className={classes.header}>
				<h1>Blaze Hello 👋</h1>
				<hr />
				NextJS + Payload + Threejs{' '}
			</header>
			<canvas ref={canvas} className={classes.scene}></canvas>
		</main>
	);
};

export default Page;
