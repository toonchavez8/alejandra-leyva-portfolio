import { createClient } from "@/prismicio";
import SideNavClient from "./SideNavClient"; // Import the Client Component
import { Settings } from "./types"; // Import types if placed in a separate file

export default async function SideNav() {
	const client = createClient();
	const settings: Settings = await client.getSingle("menu_settings");
	return <SideNavClient settings={settings} />;
}
