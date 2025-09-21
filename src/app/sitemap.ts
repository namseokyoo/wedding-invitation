import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
  const now = new Date()
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/guestbook`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/map`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ]
}
