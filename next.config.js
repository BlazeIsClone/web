const withTM = require('next-transpile-modules')(['three']);

/** @type {import('next').NextConfig} */
const nextConfig = {
	publicRuntimeConfig: {
		PUBLIC_HOSTNAME: process.env.PUBLIC_HOSTNAME,
	},
	swcMinify: true,
};

module.exports = withTM(nextConfig);
