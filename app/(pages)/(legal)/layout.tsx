import type { ReactNode } from 'react'
import { Theme } from '~/app/(pages)/_components/theme'
import { Wrapper } from '~/app/(pages)/_components/wrapper'
import { FooterContent } from '~/components/footer-content'
import { ScrollToTop } from '~/libs/scroll-to-top'
import s from './legal.module.css'

interface LegalLayoutProps {
  children: ReactNode
}

export default function LegalLayout({ children }: LegalLayoutProps) {
  return (
    <Theme theme="dark" global>
      <ScrollToTop />
      <div className="min-h-svh flex flex-col bg-white">
        <Wrapper />
        <main className="flex-1 dr-pt-80">
          <div className="dr-layout-grid-inner dr-py-64">
            <article
              className={`col-span-full dt:col-start-4 dt:col-end-10 ${s.prose}`}
            >
              {children}
            </article>
          </div>
        </main>
        <FooterContent />
      </div>
    </Theme>
  )
}
