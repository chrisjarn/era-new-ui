'use client'

import { useMemo, useState } from 'react'
import { BlogSearch } from '~/components/blog/list/blog-search'
import { BlogCard } from '~/components/blog/shared/blog-card'
import type { BlogPostListItem } from '~/libs/blog/types'

interface BlogPageProps {
  posts: BlogPostListItem[]
  baseUrl: string
}

export function BlogPage({ posts, baseUrl }: BlogPageProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts
    const query = searchQuery.toLowerCase()
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.description?.toLowerCase().includes(query) ||
        post.author?.toLowerCase().includes(query)
    )
  }, [posts, searchQuery])

  const blogListSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'ERA Safety Blog',
    description: 'Latest updates, insights, and resources from ERA Safety.',
    url: `${baseUrl}/blog`,
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      author: { '@type': 'Person', name: post.author || 'ERA Safety team' },
      datePublished: post.date,
      url: `${baseUrl}/blog/posts/${post.slug}`,
    })),
  }

  return (
    <div className="dr-layout-grid-inner dr-py-64">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: required for JSON-LD structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }}
      />

      <div className="col-span-full dt:col-start-4 dt:col-end-10">
        {/* Header */}
        <header className="text-center dr-mb-48">
          <h1 className="typo-h1 dr-text-48 dt:dr-text-64 dr-mb-16 text-balance">
            ERA Safety Blog
          </h1>
          <p className="typo-p dr-text-16 text-off-white text-pretty">
            Latest updates, insights, and resources from the ERA Safety team.
          </p>
        </header>

        {/* Search */}
        <div className="dr-mb-24 max-w-[320px] mx-auto">
          <BlogSearch value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Posts */}
        <div className="flex flex-col dr-gap-16">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => <BlogCard key={post.id} post={post} />)
          ) : (
            <p className="typo-p dr-text-16 text-off-white text-center dr-py-32">
              No posts found matching your search.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
