import { Geist, Geist_Mono, Dancing_Script } from "next/font/google";
import "./globals.css";
import Aos from "@/components/Aos";
import 'aos/dist/aos.css';
import { Analytics } from "@vercel/analytics/react"
import { NuqsAdapter } from 'nuqs/adapters/next/app';

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
import type { Metadata } from "next";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export const metadata: Metadata = {
  title: "Rise & Shine | Servicio de Lavado de Autos a Domicilio",
  description: "Expertos en lavado de autos a domicilio. Ofrecemos servicios de limpieza interior, exterior y completa para tu vehículo con la mayor calidad y comodidad.",
  keywords: [
    "lavado de autos", 
    "servicio a domicilio", 
    "limpieza de vehículos", 
    "lavado interior", 
    "lavado exterior",
    "lavado económico", 
    "lavado de vehículos", 
    "lavado a mano", 
    "detailing de autos", 
    "lavado de autos premium", 
    "lavado de autos en casa", 
    "lavado de autos en chicureo", 
    "lavado de autos en las condes", 
    "lavado de autos en providencia", 
    "lavado de autos en lo barnechea", 
    "lavado de autos en la reina", 
    "lavado de autos a buen precio", 
    "servicio de limpieza de autos", 
    "lavado de autos ecológico", 
    "lavado de autos express", 
    "cuidado de vehículos", 
    "lavado de autos con productos naturales", 
    "lavado de autos en tu hogar", 
    "lavado de autos en la puerta de tu casa", 
    "lavado de autos con garantía de calidad", 
    "lavado de autos en la región metropolitana"
  ],
  metadataBase: new URL('https://www.riseandshine.cl'),
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: "Rise & Shine - Lavado de Autos a Domicilio",
    description: "Servicio profesional de lavado de autos en la comodidad de tu hogar",
    url: 'https://www.riseandshine.cl',
    siteName: 'Rise & Shine',
    images: [
      {
        url: 'https://res.cloudinary.com/dfjzdxfop/image/upload/v1743015141/piq1s2ztdrrlrqqghlcu.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'es_CL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Rise & Shine - Lavado de Autos a Domicilio",
    description: "Servicio profesional de lavado de autos en la comodidad de tu hogar",
    images: ['https://res.cloudinary.com/dfjzdxfop/image/upload/v1743015141/piq1s2ztdrrlrqqghlcu.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <GoogleAnalytics />
        <meta name="msvalidate.01" content="1511CC47E8659FB04EB3C1E9ECBAF9E1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoWash",
              "name": "Rise & Shine",
              "description": "Servicio de lavado de autos a domicilio",
              "url": "https://www.riseandshine.cl",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Av Ricardo Lyon 1194",
                "addressLocality": "Santigo",
                "addressCountry": "CL",
                "postalCode": "7500000"
              },
              "telephone": "+56992187281",
              "priceRange": "CLP 10.000-CLP 20.000",
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                "opens": "09:00",
                "closes": "21:00"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dancingScript.variable} antialiased overflow-x-hidden`}
        >
        <Aos/>
        <NuqsAdapter>
          {children}
        </NuqsAdapter>
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
