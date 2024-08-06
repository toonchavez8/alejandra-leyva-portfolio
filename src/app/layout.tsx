import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/layout/navBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Alejandra Leyva - Fotografa",
	description:
		"Portfolio de Alejandra Leyva que hace fotoperiodismo con una experiencia creativa y un enfoque en la fotografía.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className + " flex  flex-col  "}>
				<NavBar />
				{children}
			</body>
		</html>
	);
}
