import { Geist, Geist_Mono, Dancing_Script } from "next/font/google";
import "./globals.css";
import Aos from "@/components/Aos";
import 'aos/dist/aos.css';
import { Analytics } from "@vercel/analytics/react"
import Head from "next/head";
// import { DefaultSeo } from "next-seo";

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

const seoConfig = {
    title: "Rise & Shine | Servicio de Lavado de Autos a Domicilio",
    description: "Expertos en lavado de autos a domicilio. Ofrecemos servicios de limpieza interior, exterior y completa para tu vehículo con la mayor calidad y comodidad.",
    canonical: "https://riseandshine.cl",
    openGraph: {
      type: "website",
      locale: "es_CL",
      url: "https://riseandshine.cl",
      site_name: "Rise & Shine",
      title: "Rise & Shine | Servicio de Lavado de Autos a Domicilio",
      description: "Expertos en lavado de autos a domicilio. Ofrecemos servicios de limpieza interior, exterior y completa para tu vehículo con la mayor calidad y comodidad.",
      images: [
        {
          url: "https://res.cloudinary.com/dfjzdxfop/image/upload/v1743015141/piq1s2ztdrrlrqqghlcu.png",
          width: 1200,
          height: 630,
          alt: "Rise & Shine - Lavado de Autos a Domicilio",
        },
      ],
    },
    additionalMetaTags: [
      {
        name: "keywords",
        content: "lavado de autos, lavado de autos a domicilio, detailing, limpieza de vehículos, lavado interior y exterior, lavado premium",
      },
      {
        name: "author",
        content: "Rise & Shine",
      },
      {
        name: "theme-color",
        content: "#3268bb",
      },
    ],
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "AutoWash",
      "name": "Rise & Shine",
      "image": "https://riseandshine.cl/static/og-image.jpg",
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
          "availability": "https://schema.org/InStock",
          "url": "https://riseandshine.cl/servicios"
        },
        {
          "@type": "Offer",
          "name": "Lavado Interior",
          "price": "12000",
          "priceCurrency": "CLP",
          "availability": "https://schema.org/InStock",
          "url": "https://riseandshine.cl/servicios"
        },
        {
          "@type": "Offer",
          "name": "Lavado Completo",
          "price": "20000",
          "priceCurrency": "CLP",
          "availability": "https://schema.org/InStock",
          "url": "https://riseandshine.cl/servicios"
        }
      ]
    }
  };

interface SeoProps {
  title: string;
  description: string;
  canonical: string;
  openGraph: {
    type: string;
    locale: string;
    url: string;
    site_name: string;
    title: string;
    description: string;
  };
  additionalMetaTags?: Array<{
    name: string;
    content: string;
  }>;
  jsonLd?: any;
}

export const SEO: React.FC<SeoProps> = ({
  title,
  description,
  canonical,
  openGraph,
  additionalMetaTags = [],
  jsonLd
}) => {
  return (
    <Head>
      {/* Títulos */}
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Canonical */}
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph */}
      <meta property="og:type" content={openGraph.type} />
      <meta property="og:locale" content={openGraph.locale} />
      <meta property="og:url" content={openGraph.url} />
      <meta property="og:site_name" content={openGraph.site_name} />
      <meta property="og:title" content={openGraph.title} />
      <meta property="og:description" content={openGraph.description} />
      
      {/* Etiquetas meta adicionales */}
      {additionalMetaTags.map((tag, index) => (
        <meta key={index} name={tag.name} content={tag.content} />
      ))}
      
      {/* Schema.org JSON-LD */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd)
          }}
        />
      )}
    </Head>
  );
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <SEO {...seoConfig} />
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
