import { buildConfig } from 'payload/config';
import seo from '@payloadcms/plugin-seo';
import dotenv from 'dotenv';
import { resolve } from 'path';

import Interests from './collections/Interests';
import Note from './collections/Note';
import Project from './collections/Project';
import Tool from './collections/Tool';
import Media from './collections/Media';
import Socials from './collections/Social';
import Navigation from './globals/Navigation';
import Metadata from './globals/Metadata';
import Sections from './globals/Sections';
import Contacts from './globals/Contacts';

dotenv.config();

export default buildConfig({
	serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
	collections: [Interests, Note, Project, Tool, Socials, Media],
	globals: [Metadata, Sections, Navigation, Contacts],
	plugins: [
		seo({
			globals: ['metadata'],
			uploadsCollection: 'media',
			generateTitle: () => 'blazeclone.xyz | Home',
			generateDescription: () => 'blaze clone website',
			generateURL: () => 'https://blazeclone.xyz',
		}),
	],
	typescript: {
		outputFile: resolve(__dirname, './types/generated-types.ts'),
	},
});
