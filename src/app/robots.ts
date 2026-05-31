import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/yoklama'],
    },
    sitemap: 'https://yeterla.com/sitemap.xml',
  };
}
