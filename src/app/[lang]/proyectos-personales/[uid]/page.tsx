import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { Lancelot } from "next/font/google";

type Params = { uid: string; lang: string };

export default async function Page({ params }: { params: Promise<Params> }) {
	const { uid, lang } = await params;
	const client = createClient();
	const page = await client
		.getByUID("project", uid, { lang: lang })
		.catch(() => notFound());

	return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata({
	params,
}: {
	params: Promise<Params>;
}): Promise<Metadata> {
	const { uid, lang } = await params;
	const client = createClient();
	const page = await client
		.getByUID("project", uid, { lang: lang })
		.catch(() => notFound());

	return {
		title: page.data.meta_title,
		description: page.data.meta_description,
	};
}

export async function generateStaticParams() {
	const client = createClient();
	const pages = await client.getAllByType("project", { lang: "*" });

	return pages.map((page) => {
		return { uid: page.uid, lang: page.lang };
	});
}
