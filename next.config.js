const withTM = require('next-transpile-modules')(['three']);

/** @type {import('next').NextConfig} */
const nextConfig = {
	publicRuntimeConfig: {
		PUBLIC_HOSTNAME: process.env.PUBLIC_HOSTNAME,
		SERVER_URL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
	},
	swcMinify: true,
	typescript: {
		ignoreBuildErrors: true,
	},
	pageExtensions: ['Home.tsx'],
};

module.exports = withTM(nextConfig);
