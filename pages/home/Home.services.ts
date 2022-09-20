import { GetStaticProps } from 'next';
import payload from 'payload';
import {
	Interest,
	Navigation,
	Note,
	Project,
	Social,
	Tool,
} from 'generated-types';

export const getStaticProps: GetStaticProps = async () => {
	const navigation = await payload.findGlobal<Navigation>({
		slug: 'navigation',
	});

	const interests = await payload.find<Interest>({
		collection: 'interests',
	});

	const notes = await payload.find<Note>({
		collection: 'notes',
	});

	const projects = await payload.find<Project>({
		collection: 'projects',
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
			projects,
			socials,
			tools,
			notes,
		},
	};
};
