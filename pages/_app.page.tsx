import React, { useRef } from 'react';
import type { AppProps } from 'next/app';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';
import { Leva } from 'leva';

import 'styles/vendors/index.css';
import 'styles/global/index.scss';

const MyApp = ({ Component, pageProps }: AppProps): React.ReactElement => {
	const containerRef = useRef(null);
	return (
		<LocomotiveScrollProvider
			options={{
				smooth: true,
			}}
			containerRef={containerRef}>
			<Leva collapsed hidden />
			<div data-scroll-container ref={containerRef}>
				<Component {...pageProps} />
			</div>
		</LocomotiveScrollProvider>
	);
};

export default MyApp;
