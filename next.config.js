const withTM = require('next-transpile-modules')(['three']);

/** @type {import('next').NextConfig} */
const nextConfig = {
	publicRuntimeConfig: {
		SERVER_URL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
	},
	swcMinify: true,
};

module.exports = withTM(nextConfig);
