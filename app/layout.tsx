import { Geist, Geist_Mono, Dancing_Script } from "next/font/google";
import "./globals.css";
import Aos from "@/components/Aos";
import 'aos/dist/aos.css';
import { Analytics } from "@vercel/analytics/react"
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import SEO from "@/next-seo.config"; // Configuración SEO Global

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  // el rango de weights que especificaste (400 a 700)
  variable: "--font-dancing-script",
  weight: ['400', '500', '600', '700'],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <DefaultSeo {...SEO} />
        <meta name="next-size-adjust" content="no" />
        <meta property="og:image" content="https://res.cloudinary.com/dfjzdxfop/image/upload/v1743015141/piq1s2ztdrrlrqqghlcu.png"/>
      </Head>
      <Aos/>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dancingScript.variable} antialiased overflow-x-hidden`}
      >
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
