import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";
import sm from "../slicemachine.config.json";

/**
 * The project's Prismic repository name.
 */
export const repositoryName =
	process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT ?? sm.repositoryName;

/**
 * The project's Prismic Route Resolvers. This list determines a Prismic document's URL.
 */
const routes: prismic.ClientConfig["routes"] = [
	{ type: "page", uid: "home", path: "/:lang" },
	{ type: "page", path: "/:lang/:uid" },
	{ type: "contact", path: "/:lang/contact", uid: "contact" },
	{ type: "project", path: "/:lang/proyectos-personales/:uid" },
	{ type: "work", path: "/:lang/trabajos-multidisciplinarios/:uid" },
	{ type: "comision", path: "/:lang/comisiones-y-publicaciones/:uid" },
	{
		type: "comision_project",
		path: "/:lang/comisiones-y-publicaciones/commission/:commission/:uid",
		resolvers: { commission: "commissionuid" },
	},
	{
		type: "contact",
		path: "/:lang/contact",
	},
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createClient = (config: prismicNext.CreateClientConfig = {}) => {
	const client = prismic.createClient(sm.apiEndpoint || repositoryName, {
		routes,
		fetchOptions:
			process.env.NODE_ENV === "production"
				? { next: { tags: ["prismic"] }, cache: "force-cache" }
				: { next: { revalidate: 5 } },
		...config,
	});

	prismicNext.enableAutoPreviews({ client });

	return client;
};
