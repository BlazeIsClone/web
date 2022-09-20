import { GetStaticProps } from 'next';
import payload from 'payload';
import {
	Contacts,
	Interest,
	Metadata,
	Navigation,
	Note,
	Project,
	Sections,
	Social,
	Tool,
} from 'types';

export const getStaticProps: GetStaticProps = async () => {
	const contacts = await payload.findGlobal<Contacts>({
		slug: 'contacts',
	});

	const metadata = await payload.findGlobal<Metadata>({
		slug: 'metadata',
	});

	const navigation = await payload.findGlobal<Navigation>({
		slug: 'navigation',
	});

	const sections = await payload.findGlobal<Sections>({
		slug: 'sections',
	});

	const interests = await payload.find<Interest>({
		collection: 'interests',
		sort: '+createdAt',
	});

	const notes = await payload.find<Note>({
		collection: 'notes',
		sort: '+createdAt',
	});

	const projects = await payload.find<Project>({
		collection: 'projects',
		sort: '+createdAt',
	});
	const tools = await payload.find<Tool>({
		collection: 'tools',
	});

	const socials = await payload.find<Social>({
		collection: 'socials',
	});

	return {
		props: {
			navigation,
			interests,
			metadata,
			contacts,
			sections,
			projects,
			socials,
			tools,
			notes,
		},
	};
};
