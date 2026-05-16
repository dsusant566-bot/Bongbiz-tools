import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tools.bongobiz.com'
  const paths = [
    '',
    '/loan-inquiry',
    '/loan-emi',
    '/pdf-converter',
    '/gst',
    '/currency',
    '/percentage',
    '/age',
    '/cv-maker',
    '/gold-silver-rate',
    '/bmi',
    '/image-compressor',
    '/background-remover',
    '/qr',
    '/invoice',
    '/vehicle-info',
    '/bold-text',
    '/captions',
    '/text-to-speech',
    '/translator'
  ]

  return paths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.8,
  }))
}
