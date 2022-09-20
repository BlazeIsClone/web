import {
	Navigation,
	Contacts,
	Interest,
	Metadata,
	Sections,
	Project,
	Social,
	Tool,
	Note,
} from 'types';

export interface Props {
	navigation: Navigation;
	contacts: Contacts;
	metadata: Metadata;
	sections: Sections;
	interests: Interest;
	projects: Project;
	socials: Social;
	notes: Note;
	tools: Tool;
}
