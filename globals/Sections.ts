import { Field, GlobalConfig } from 'payload/types';

const fields: Field[] = [
	{
		name: 'title',
		type: 'text',
		required: true,
	},
	{
		name: 'id',
		type: 'text',
		required: true,
	},
];

const Section: GlobalConfig = {
	slug: 'sections',
	fields: [
		{
			name: 'hero',
			type: 'group',
			required: true,
			fields,
		},
		{
			name: 'about',
			type: 'group',
			required: true,
			fields,
		},
		{
			name: 'intrests',
			type: 'group',
			required: true,
			fields,
		},
		{
			name: 'projects',
			type: 'group',
			required: true,
			fields,
		},
		{
			name: 'journal',
			type: 'group',
			required: true,
			fields,
		},
		{
			name: 'tools',
			type: 'group',
			required: true,
			fields,
		},
	],
};

export default Section;
