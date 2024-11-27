import { createClient } from "@/prismicio";
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

export default async function SideNav() {
  const client = createClient();

  const settings = await client.getSingle("menu_settings");

  // Separate navigation items into regular and CTA items
  const regularNavItems = settings.data.navigation.filter(
    (item) => !item.cta_button,
  );
  const ctaNavItems = settings.data.navigation.filter(
    (item) => item.cta_button,
  );

  return (
    <Sidebar>
      {/* Sidebar Header */}
      <SidebarHeader>
        <Link
          href="/"
          className="flex flex-col items-center mt-4 text-black hover:scale-105"
        >
          <span className="w-full text-3xl md:text-[2.625rem] text-center  font-italiana ">
            {settings.data.site_name}
          </span>
          <span className="font-sans text-lg md:text-[1.25rem] font-thin md:font-light -mt-2 md:-mt-0">
            {settings.data.subslogan}
          </span>
        </Link>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="items-end gap-4 md:gap-6 pe-4">
            {regularNavItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <PrismicNextLink
                  field={item.link}
                  className="font-sans text-lg font-light text-gray-400 md:text-2xl hover:text-gray-800 hover:scale-110"
                >
                  {item.label}
                </PrismicNextLink>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter className="items-center gap-4 md:gap-6 pe-4">
        <PrismicNextLink
          field={ctaNavItems[0].link}
          className="font-sans text-lg font-light text-gray-400 md:text-2xl hover:text-gray-800 "
        >
          {ctaNavItems[0].label}
        </PrismicNextLink>
      </SidebarFooter>
    </Sidebar>
  );
}
