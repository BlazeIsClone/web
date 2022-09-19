import { CollectionConfig } from 'payload/types';

export const Project: CollectionConfig = {
	slug: 'projects',
	admin: {
		useAsTitle: 'title',
	},
	access: {
		read: (): boolean => true,
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
		},
		{
			name: 'status',
			type: 'select',
			hasMany: false,
			options: [
				{
					label: 'Planned',
					value: 'planned',
				},
				{
					label: 'In Progress',
					value: 'inProgress',
				},
				{
					label: 'Published',
					value: 'published',
				},
				{
					label: 'Archived',
					value: 'archived',
				},
			],
		},
		{
			name: 'image',
			type: 'upload',
			relationTo: 'media',
		},
		{
			name: 'link',
			type: 'text',
		},
	],
};

export default Project;
