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
			name: 'date',
			type: 'date',
			required: true,
		},
		{
			name: 'image',
			type: 'upload',
			relationTo: 'media',
			required: true,
		},
		{
			name: 'link',
			type: 'text',
			required: true,
		},
	],
};

export default Project;
