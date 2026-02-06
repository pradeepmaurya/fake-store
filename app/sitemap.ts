import { MetadataRoute } from 'next'
import { getSitemapData } from '@/lib/api'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? ""

    // Fetch all products dynamically
    const products = await getSitemapData()

    const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
        url: `${baseUrl}/products/${product.id}`,
        lastModified: new Date(product.updatedAt),
        images: product.images,
        changeFrequency: 'weekly',
        priority: 0.7,
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        ...productEntries,
    ]
}
