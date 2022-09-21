import React from 'react';
import type { AppProps } from 'next/app';

import 'styles/vendors/index.css';
import 'styles/global/index.scss';

const MyApp = ({ Component, pageProps }: AppProps): React.ReactElement => (
	<Component {...pageProps} />
);

export default MyApp;
