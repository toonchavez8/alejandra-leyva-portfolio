"use client";

import { PrismicNextLink } from "@prismicio/next";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarMenu,
	SidebarMenuItem,
	SidebarHeader,
	SidebarFooter,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { asLink } from "@prismicio/client";
import clsx from "clsx";
import { Settings, NavigationItem } from "./types"; // Import types if placed in a separate file
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useState } from "react";
import { createClient } from "@/prismicio";

export default function SideNavClient({ settings }: { settings: Settings }) {
	const pathName = usePathname();
	const { lang, setLang } = useLanguage();
	const [navigationItems, setNavigationItems] = useState<NavigationItem[]>(
		settings.data.navigation
	);

	const [subslogan, setSubslogan] = useState(settings.data.subslogan);

	// Fetch content based on language
	useEffect(() => {
		const fetchContent = async () => {
			const client = createClient();
			const newSettings: Settings = await client.getSingle("menu_settings", {
				lang,
			});
			setNavigationItems(newSettings.data.navigation);

			setSubslogan(newSettings.data.subslogan); // Update subslogan when language changes
		};

		fetchContent();
	}, [lang]); // Re-fetch content when language changes

	// Separate navigation items into regular and CTA items
	const regularNavItems = navigationItems.filter(
		(item: NavigationItem) => !item.cta_button
	);
	const ctaNavItems = navigationItems.filter(
		(item: NavigationItem) => item.cta_button
	);

	return (
		<Sidebar>
			{/* Sidebar Header */}
			<SidebarHeader>
				<Link
					href="/"
					className="flex flex-col items-center mt-4 text-black hover:scale-105"
				>
					<span className="w-full text-3xl md:text-[2rem] text-center  font-italiana ">
						{settings.data.site_name}
					</span>
					<span className="font-sans text-lg md:text-[1rem] font-thin md:font-light tracking-[3px] -mt-2 md:-mt-0">
						{subslogan}
					</span>
				</Link>
			</SidebarHeader>

			{/* Sidebar Content */}
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenu className="items-end self-center gap-4 max-w-60 md:gap-6 pe-4">
						{regularNavItems.map((item: NavigationItem) => {
							const isActive = pathName.includes(asLink(item.link) as string);
							return (
								<SidebarMenuItem key={item.label}>
									<PrismicNextLink
										field={item.link}
										className={clsx(
											"font-sans text-lg font-light text-gray-950/50 md:text-[18px] hover:text-gray-800 hover:scale-110 antialiased",
											{ "font-bold text-gray-800": isActive }
										)}
										aria-current={isActive ? "page" : undefined}
									>
										{item.label}
									</PrismicNextLink>
								</SidebarMenuItem>
							);
						})}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>

			{/* Sidebar Footer */}
			<SidebarFooter className="items-center self-center w-full gap-4 max-w-64 md:gap-6 pe-4">
				<PrismicNextLink
					field={ctaNavItems[0].link}
					className={buttonVariants({
						variant: "outline",
						class: "text-[18px ] font-sans font-light w-full",
					})}
				>
					{ctaNavItems[0].label}
				</PrismicNextLink>

				<div className="flex gap-4 font-sans text-lg font-light text-gray-400">
					<button
						onClick={() => setLang("en-us")}
						className={clsx("text-[18px] font-sans font-light", {
							"font-bold underline": lang === "en-us",
						})}
					>
						Eng
					</button>
					<button
						onClick={() => setLang("es-mx")}
						className={clsx("text-[18px] font-sans font-light", {
							"font-bold underline": lang === "es-mx",
						})}
					>
						Esp
					</button>
				</div>
			</SidebarFooter>
		</Sidebar>
	);
}
