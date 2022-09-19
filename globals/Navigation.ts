import { GlobalConfig } from 'payload/types';

const Navigation: GlobalConfig = {
	slug: 'navigation',
	fields: [
		{
			name: 'items',
			type: 'array',
			required: true,
			maxRows: 8,
			fields: [
				{
					name: 'section',
					type: 'text',
					required: true,
				},
			],
		},
	],
};

export default Navigation;
