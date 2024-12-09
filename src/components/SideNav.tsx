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
import { buttonVariants } from "@/components/ui/button"

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
          <span className="w-full text-3xl md:text-[2rem] text-center  font-italiana ">
            {settings.data.site_name}
          </span>
          <span className="font-sans text-lg md:text-[1rem] font-thin md:font-light tracking-[3px] -mt-2 md:-mt-0">
            {settings.data.subslogan}
          </span>
        </Link>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="items-end self-center gap-4 max-w-60 md:gap-6 pe-4">
            {regularNavItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <PrismicNextLink
                  field={item.link}
                  className="font-sans text-lg font-light text-gray-950//75 md:text-[18px] hover:text-gray-800 hover:scale-110 antialiased"
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
          className={buttonVariants({ variant: "outline", class:"text-[18px ] font-sans font-light w-full"}) }
        >
          {ctaNavItems[0].label}
        </PrismicNextLink>

        <div className="flex gap-4 font-sans text-lg font-light text-gray-400">
          <Link href="/">
              Eng
            </Link>
              <Link href="/">
              Esp
              </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
