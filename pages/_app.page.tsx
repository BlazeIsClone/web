import React, { useRef } from 'react';
import type { AppProps } from 'next/app';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';

import 'styles/vendors/index.css';
import 'styles/global/index.scss';
import { useRouter } from 'next/router';

const MyApp = ({ Component, pageProps }: AppProps): React.ReactElement => {
	const containerRef = useRef(null);
	const { asPath } = useRouter();

	return (
		<LocomotiveScrollProvider
			options={{
				smooth: true,
			}}
			containerRef={containerRef}
			location={asPath}
			onLocationChange={(scroll: any) =>
				scroll.scrollTo(0, { duration: 0, disableLerp: true })
			}>
			<div data-scroll-container ref={containerRef}>
				<Component {...pageProps} />
			</div>
		</LocomotiveScrollProvider>
	);
};

export default MyApp;
