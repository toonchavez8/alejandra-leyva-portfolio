import { createClient } from "@/prismicio";
import SideNavClient from "./SideNavClient"; // Import the Client Component
import { Settings } from "./types"; // Import types if placed in a separate file

type Params = { lang: string };
export default async function SideNav({ params }: { params: Params }) {
	const { lang } = params; // Directly destructure from params (no need to await)
	const client = createClient();
	const settings: Settings = await client.getSingle("menu_settings", {
		lang: lang,
	});

	return <SideNavClient settings={settings} />;
}
