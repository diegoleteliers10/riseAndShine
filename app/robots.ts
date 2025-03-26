import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/terminos',
          '/politicas'
        ],
        disallow: [
          '/api/',
          '/login',
          '/dashboard',
        ],
      },
    ],
    sitemap: 'https://riseandshine.cl/sitemap.xml',
  }
}