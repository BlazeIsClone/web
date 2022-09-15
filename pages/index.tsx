import Head from '../components/Head';
import classes from '../css/page.module.css';

const Page: React.FC = () => {
	return (
		<main className={classes.page}>
			<Head title={'blazec'} />
			<header className={classes.header}>
				<h1>Blaze Hello 👋</h1>
			</header>
			<footer className={classes.footer}>
				<hr />
				NextJS + Payload{' '}
			</footer>
		</main>
	);
};

export default Page;
