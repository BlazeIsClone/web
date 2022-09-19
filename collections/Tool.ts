import { CollectionConfig } from 'payload/types';

export const Tool: CollectionConfig = {
	slug: 'tools',
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

export default Tool;
