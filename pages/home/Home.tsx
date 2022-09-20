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

export const Page: React.FC<Props> = ({
	navigation,
	interests,
	projects,
	contacts,
	metadata,
	sections,
	socials,
	tools,
	notes,
}) => (
	<main className={styles.page}>
		<Seo data={metadata} />
		<Header data={navigation} />
		<Hero data={sections.hero} />
		<About data={sections.about} />
		<Interests data={sections.intrests} collection={interests} />
		<Projects data={sections.projects} collection={projects} />
		<Notes data={sections.notes} collection={notes} />
		<Tools data={sections.tools} collection={tools} />
		<Socials collection={socials} />
		<Email data={contacts.eamil} />
		<Background />
	</main>
);
