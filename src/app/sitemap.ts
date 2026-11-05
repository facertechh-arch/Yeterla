import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: 'https://yeterla.com',
      lastModified,
      changeFrequency: 'always',
      priority: 1,
    },
    {
      url: 'https://yeterla.com/gelecek',
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://yeterla.com/gelecek/ekonomi-ve-calisma-hayatinin-gelecegi',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}
