import { Geist, Geist_Mono, Dancing_Script } from "next/font/google";
import "./globals.css";
import Aos from "@/components/Aos";
import 'aos/dist/aos.css';
import { Analytics } from "@vercel/analytics/react"
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  subsets: ['latin'],
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
  // Configuración SEO global
  const seoConfig = {
    title: "Rise & Shine | Servicio de Lavado de Autos a Domicilio",
    description: "Expertos en lavado de autos a domicilio. Ofrecemos servicios de limpieza interior, exterior y completa para tu vehículo con la mayor calidad y comodidad.",
    keywords: "lavado de autos, lavado a domicilio, detailing, limpieza de vehículos",
    canonical: "https://riseandshine.cl",
    ogImage: "https://res.cloudinary.com/dfjzdxfop/image/upload/v1743015141/piq1s2ztdrrlrqqghlcu.png"
  };

  // Configuración Schema.org
  const schemaOrgData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Rise & Shine",
    "image": "https://riseandshine.cl/logo.png",
    "url": "https://riseandshine.cl",
    "telephone": "+56 9 92187281",
    "priceRange": "CLP$10.000 - CLP$20.000",
    "serviceType": "Lavado de autos a domicilio, Detailing",
    "offers": [
      {
        "@type": "Offer",
        "name": "Lavado Exterior",
        "price": "10000",
        "priceCurrency": "CLP",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "name": "Lavado Interior",
        "price": "12000",
        "priceCurrency": "CLP",
        "availability": "https://schema.org/InStock"
      }
    ]
  };

  return (
    <html lang="es">
      <Head>
        {/* SEO Básico */}
        <title>{seoConfig.title}</title>
        <meta name="description" content={seoConfig.description} />
        <meta name="keywords" content={seoConfig.keywords} />
        <link rel="canonical" href={seoConfig.canonical} />

        {/* Open Graph */}
        <meta property="og:title" content={seoConfig.title} />
        <meta property="og:description" content={seoConfig.description} />
        <meta property="og:image" content={seoConfig.ogImage} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={seoConfig.canonical} />

        {/* Adicionales */}
        <meta name="next-size-adjust" content="no" />
        <meta name="theme-color" content="#3268bb" />

        {/* Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaOrgData)
          }}
        />
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