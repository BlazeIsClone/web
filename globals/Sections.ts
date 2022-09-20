import { Field, GlobalConfig } from 'payload/types';

const idField: Field = {
	name: 'section-id',
	type: 'text',
	required: true,
};

const headlineField: Field = {
	name: 'headline',
	type: 'text',
	required: true,
};

const bodyField: Field = {
	name: 'content',
	type: 'textarea',
	required: true,
};

const Section: GlobalConfig = {
	slug: 'sections',
	fields: [
		{
			name: 'hero',
			type: 'group',
			required: true,
			fields: [
				idField,
				{
					name: 'headline',
					type: 'richText',
					required: true,
				},
			],
		},
		{
			name: 'about',
			type: 'group',
			required: true,
			fields: [idField, bodyField],
		},
		{
			name: 'intrests',
			type: 'group',
			required: true,
			fields: [idField, headlineField],
		},
		{
			name: 'projects',
			type: 'group',
			required: true,
			fields: [idField, headlineField],
		},
		{
			name: 'notes',
			type: 'group',
			required: true,
			fields: [idField, headlineField],
		},
		{
			name: 'tools',
			type: 'group',
			required: true,
			fields: [idField, headlineField],
		},
	],
};

export default Section;
