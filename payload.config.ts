import { buildConfig } from 'payload/config';
import seo from '@payloadcms/plugin-seo';
import dotenv from 'dotenv';

import Intrest from './collections/Intrest';
import Note from './collections/Note';
import Project from './collections/Project';
import Tool from './collections/Tool';
import Media from './collections/Media';
import Navigation from './globals/Navigation';
import Metadata from './globals/Metadata';
import Sections from './globals/Sections';
import Contact from './globals/Contact';

dotenv.config();

export default buildConfig({
	serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
	collections: [Intrest, Note, Project, Tool, Media],
	globals: [Metadata, Sections, Navigation, Contact],
	plugins: [
		seo({
			globals: ['metadata'],
			uploadsCollection: 'media',
			generateTitle: () => `Website.com — Home`,
			generateDescription: () => `blaze clone website`,
			generateURL: () => `https://blazeclone.xyz`,
		}),
	],
});
