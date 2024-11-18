  
import "./globals.css";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import { Italiana, Lato } from 'next/font/google'

const italiana = Italiana({
  subsets: ['latin'],
  weight: "400",
  display: 'swap',
  variable: '--font-Italiana',
})
 
const lato = Lato({
  subsets: ['latin'],
  weight: ["100","300","400", "700","900"],
  display: 'swap',
  variable: '--font-lato',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={ `${lato.variable} ${italiana.variable}`} >
      <body className="text-lg font-italiana">{children}

      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
