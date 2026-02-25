import type { Metadata } from 'next'
import { BlogPage as BlogPageComponent } from '~/components/blog/blog-page'
import { getPostListItems } from '~/libs/get-posts'

export const metadata: Metadata = {
  title: 'blog',
  description:
    'Latest updates, insights, and resources from ERA Safety - workplace safety solutions for Australian businesses.',
  openGraph: {
    title: 'blog',
    description:
      'Latest updates, insights, and resources from ERA Safety - workplace safety solutions for Australian businesses.',
    type: 'website',
    siteName: 'blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'blog',
    description:
      'Latest updates, insights, and resources from ERA Safety - workplace safety solutions for Australian businesses.',
  },
  alternates: {
    canonical: '/blog',
  },
}

export default async function BlogPage() {
  const allPosts = await getPostListItems()
  const rawBaseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const baseUrl = (rawBaseUrl || 'https://erasafety.com.au').replace(/\/+$/, '')

  return <BlogPageComponent posts={allPosts} baseUrl={baseUrl} />
}
