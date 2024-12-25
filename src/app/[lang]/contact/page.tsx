import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

type Params = { lang: string };

export default async function Page({ params }: { params: Promise<Params> }) {
	const { lang } = await params;
	const client = createClient();
	const page = await client.getSingle("contact", { lang: lang });

	return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata(): Promise<Metadata> {
	const client = createClient();
	const page = await client.getSingle("contact");

	return {
		title: page.data.meta_title,
		description: page.data.meta_description,
	};
}
