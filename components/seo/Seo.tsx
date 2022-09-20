import NextHead from 'next/head';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { Props } from './Seo.types';

const {
	publicRuntimeConfig: { PUBLIC_HOSTNAME },
} = getConfig();

export const Seo: React.FC<Props> = ({ data }) => {
	const { asPath } = useRouter();

	const getTitle = () => data.meta.title;

	return (
		<NextHead>
			<title>{getTitle()}</title>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="icon" type="image/x-icon" href="/favicon.svg" />

			<meta name="description" content={data.meta.description} />
			<meta property="og:url" content={`${PUBLIC_HOSTNAME}${asPath}`} />
			<meta property="og:title" content={data.meta.title} />
			<meta property="og:description" content={data.meta.description} />
			<meta property="twitter:title" content={data.meta.title} />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:image" content={data.meta.image?.url} />
			<meta property="og:image" content={data.meta.image?.url} />
		</NextHead>
	);
};
