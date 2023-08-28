/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.leonardo.ai",
			},
		],
	},
	experimental: {
		serverActions: true,
	},
};

module.exports = nextConfig;
