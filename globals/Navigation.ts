import { GlobalConfig } from 'payload/types';

const Navigation: GlobalConfig = {
	slug: 'navigation',
	access: {
		read: (): boolean => true,
		update: (): boolean => true,
	},
	fields: [
		{
			name: 'items',
			type: 'array',
			required: true,
			fields: [
				{
					name: 'section',
					type: 'text',
					required: true,
				},
				{
					name: 'section-id',
					type: 'text',
					required: true,
				},
			],
		},
	],
};

export default Navigation;
