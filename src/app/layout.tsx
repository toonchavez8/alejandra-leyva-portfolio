import "./globals.css";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import { Italiana, Lato } from "next/font/google";
import SideNav from "@/components/SideNav";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/context/LanguageContext";

const italiana = Italiana({
	subsets: ["latin"],
	weight: "400",
	display: "swap",
	variable: "--font-Italiana",
});

const lato = Lato({
	subsets: ["latin"],
	weight: ["100", "300", "400", "700", "900"],
	display: "swap",
	variable: "--font-lato",
});

export default function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: { lang: string };
}>) {
	return (
		<html lang="en" className={`${lato.variable} ${italiana.variable}`}>
			<head>
				<link rel="preconnect" href="https://images.prismic.io" />
				<link rel="dns-prefetch" href="https://images.prismic.io" />
				<link rel="preconnect" href="https://prismic-io.s3.amazonaws.com" />
				<link rel="dns-prefetch" href="https://prismic-io.s3.amazonaws.com" />
			</head>
			<body className="bg-[#dfe0e0]">
				<LanguageProvider>
					<SidebarProvider>
						<SideNav params={params} />
						<main className="relative w-full @container bg-[#dfe0e0]">
							<SidebarTrigger className="absolute top-0 z-50 left-5" />
							{children}
						</main>
						<Toaster />
					</SidebarProvider>
				</LanguageProvider>
			</body>
			<PrismicPreview repositoryName={repositoryName} />
		</html>
	);
}
