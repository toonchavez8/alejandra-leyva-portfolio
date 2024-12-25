import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

type Params = { commissionuid: string; uid: string; lang: string };

export default async function Page({ params }: { params: Params }) {
	const { uid, lang } = params;
	const client = createClient();

	// Fetch the page using the resolver and ensure it matches both parameters
	const page = await client
		.getByUID("comision_project", uid, {
			lang: lang,
			routes: params.commissionuid,
		})
		.catch(() => notFound());

	if (!page) notFound();

	return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata({
	params,
}: {
	params: Params;
}): Promise<Metadata> {
	const { uid, lang } = params;
	const client = createClient();

	// Fetch the metadata document
	const page = await client
		.getByUID("comision_project", uid, { lang: lang })
		.catch(() => notFound());

	if (!page) notFound();

	return {
		title: page.data.meta_title,
		description: page.data.meta_description,
	};
}

export async function generateStaticParams() {
	const client = createClient();

	// Fetch all `comision_project` documents and generate params for dynamic routing
	const pages = await client.getAllByType("comision_project", { lang: "*" });

	return pages.map((page) => {
		{
			return {
				commissionuid: page.data.commissionuid,
				uid: page.uid,
				lang: page.lang,
			};
		}
	});
}
