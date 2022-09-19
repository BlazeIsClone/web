import { CollectionConfig } from 'payload/types';

export type MediaType = {
	filename: string;
	alt: string;
};

const Media: CollectionConfig = {
	slug: 'media',
	access: {
		read: (): boolean => true,
	},
	upload: {
		adminThumbnail: 'card',
	},
	fields: [
		{
			name: 'alt',
			label: 'Alt Text',
			type: 'text',
			required: true,
		},
	],
};

export default Media;
