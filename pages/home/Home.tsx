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
	Header,
} from 'components';

export const Page: React.FC<Props> = props => {
	const {
		navigation,
		interests,
		projects,
		contacts,
		metadata,
		sections,
		socials,
		tools,
		notes,
	} = props;

	if (props === undefined) return <h1 style={{ color: 'black' }}>loading</h1>;

	return (
		<main className={styles.page}>
			<Seo data={metadata} />
			<Header data={navigation} />
			<Hero data={sections.hero} />
			<About data={sections.about} />
			<Projects data={sections.projects} collection={projects} />
			<Socials collection={socials} />
			<Interests data={sections.intrests} collection={interests} />
			<Notes data={sections.notes} collection={notes} />
			<Tools data={sections.tools} collection={tools} />
			<Email email={contacts.eamil} data={sections.email} />
			<Background />
		</main>
	);
};
