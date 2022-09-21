import { GetStaticProps } from 'next';
import payload from 'payload';
import { Contacts, Metadata, Navigation, Sections } from 'types';

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

	const interests = await payload.find({
		collection: 'interests',
		sort: '+createdAt',
		pagination: false,
	});

	const notes = await payload.find({
		collection: 'notes',
		sort: '+createdAt',
		pagination: false,
	});

	const projects = await payload.find({
		collection: 'projects',
		sort: '+createdAt',
	});

	const tools = await payload.find({
		collection: 'tools',
		pagination: false,
	});

	const socials = await payload.find({
		collection: 'socials',
		pagination: false,
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
