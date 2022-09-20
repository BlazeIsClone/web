import { Props } from './Home.types';
import styles from './Home.module.scss';
import {
	Seo,
	Background,
	Hero,
	About,
	Interests,
	Projects,
	Notes,
	Tools,
	Socials,
	Email,
} from 'components';

export const Page: React.FC<Props> = () => (
	<main className={styles.page}>
		<Seo />
		<Hero />
		<About />
		<Interests />
		<Projects />
		<Notes />
		<Tools />
		<Socials />
		<Email />
		<Background />
	</main>
);
