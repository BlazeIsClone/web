import classes from '../../css/page.module.css';
import { Props } from './Home.types';
import { Seo, Background } from 'components';

export const Page: React.FC<Props> = ({ posts }) => {
	return (
		<main className={classes.page}>
			<Seo />
			<header className={classes.header}>
				<h1>Blaze Hello 👋</h1>
				<hr />
				NextJS + Payload + Threejs{' '}
			</header>
			<Background />
		</main>
	);
};
