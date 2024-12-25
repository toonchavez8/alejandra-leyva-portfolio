import { createClient } from "@prismicio/client";
import sm from "./slicemachine.config.json" assert { type: "json" }; // Your Slice Machine config

/** @returns {Promise<import('next').NextConfig>} */
const nextConfig = async () => {
	const client = createClient(sm.repositoryName);

	// Fetch Prismic repository information to get the locales
	const repository = await client.getRepository();
	const locales = repository.languages.map((lang) => lang.id); // Extract locale codes (e.g., 'en-us', 'es-mx')

	return {
		reactStrictMode: true,
		images: {
			remotePatterns: [
				{
					protocol: "https",
					hostname: "images.prismic.io",
				},
			],
		},
		// i18n: {
		// 	locales, // Use locales from Prismic
		// 	defaultLocale: locales[0], // Set the first locale as default (e.g., 'en-us')
		// },
	};
};

export default nextConfig;
