const SEO = {
  title: "Rise & Shine | Servicio de Lavado de Autos a Domicilio",
  description:
    "Expertos en lavado de autos a domicilio. Ofrecemos servicios de limpieza interior, exterior y completa para tu vehículo con la mayor calidad y comodidad.",
  canonical: "https://riseandshine.cl",
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://riseandshine.cl",
    site_name: "Rise & Shine",
    title: "Rise & Shine | Servicio de Lavado de Autos a Domicilio",
    description:
      "Expertos en lavado de autos a domicilio. Ofrecemos servicios de limpieza interior, exterior y completa para tu vehículo con la mayor calidad y comodidad.",
    images: [
      {
        url: "https://res.cloudinary.com/dfjzdxfop/image/upload/v1743015141/piq1s2ztdrrlrqqghlcu.png", // Reemplázalo con la URL de tu imagen destacada
        width: 1200,
        height: 630,
        alt: "Rise & Shine - Lavado de Autos a Domicilio",
      },
    ],
  },
  additionalMetaTags: [
    {
      name: "keywords",
      content:
        "lavado de autos, lavado de autos a domicilio, detailing, limpieza de vehículos, lavado interior y exterior, lavado premium",
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
    "image": "https://riseandshine.cl/static/og-image.jpg", // Imagen representativa
    "url": "https://riseandshine.cl",
    "telephone": "+56 9 92187281", // Número actualizado
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

export default SEO;
