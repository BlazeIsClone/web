import { GlobalConfig } from 'payload/types';

const Contact: GlobalConfig = {
	slug: 'contact',
	fields: [
		{
			name: 'eamil',
			type: 'email',
			required: true,
		},
	],
};

export default Contact;
