import { GlobalConfig } from 'payload/types';

const Contact: GlobalConfig = {
	slug: 'contacts',
	fields: [
		{
			name: 'eamil',
			type: 'email',
			required: true,
		},
	],
};

export default Contact;
