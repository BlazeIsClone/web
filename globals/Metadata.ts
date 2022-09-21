import { GlobalConfig } from 'payload/types';

const Metadata: GlobalConfig = {
	slug: 'metadata',
	access: {
		read: (): boolean => true,
		update: (): boolean => true,
	},
	fields: [],
};

export default Metadata;
