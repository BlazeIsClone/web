import { GlobalConfig } from 'payload/types';

const Contact: GlobalConfig = {
	slug: 'contacts',
	access: {
		read: (): boolean => true,
		update: (): boolean => true,
	},
	fields: [
		{
			name: 'eamil',
			type: 'email',
			required: true,
		},
	],
};

export default Contact;
