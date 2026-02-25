import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Theme } from '~/app/(pages)/_components/theme'
import { Wrapper } from '~/app/(pages)/_components/wrapper'
import { FooterContent } from '~/components/footer-content'
import { ScrollToTop } from '~/libs/scroll-to-top'

export const metadata: Metadata = {
  title: {
    template: '%s | ERA Safety Blog',
    default: 'blog',
  },
  description:
    'Latest updates, insights, and resources from ERA Safety - workplace safety solutions for Australian businesses.',
}

interface BlogLayoutProps {
  children: ReactNode
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <Theme theme="dark" global>
      <ScrollToTop />
      <div className="min-h-dvh flex flex-col bg-white">
        <Wrapper />
        <main className="flex-1 dr-pt-80">{children}</main>
        <FooterContent />
      </div>
    </Theme>
  )
}
