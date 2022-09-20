import { CollectionConfig } from 'payload/types';
import { MediaType } from './Media';

export type Type = {
	title: string;
	slug: string;
	image?: MediaType;
};

export const Intrest: CollectionConfig = {
	slug: 'interests',
	admin: {
		useAsTitle: 'type',
	},
	access: {
		read: (): boolean => true,
	},
	fields: [
		{
			name: 'type',
			type: 'text',
		},
		{
			name: 'interest',
			type: 'array',

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
				},
			],
		},
	],
};

export default Intrest;
