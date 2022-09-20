import { Seo, Background } from 'components';
import { Props } from './Home.types';
import styles from './Home.module.scss';

export const Page: React.FC<Props> = ({ posts }) => {
	return (
		<main className={styles.page}>
			<Seo />
			<header className={styles.header}>
				<h1>Blaze Hello 👋</h1>
				<hr />
				NextJS + Payload + Threejs{' '}
			</header>
			<Background />
		</main>
	);
};
