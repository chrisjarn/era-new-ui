'use client'

import { Link } from '~/components/link'
import { CURRENT_YEAR, siteConfig } from '~/libs/config'

interface FooterContentProps {
  footerLinks?: Array<{ label: string; href: string; external?: boolean }>
  copyrightHolder?: string
}

export function FooterContent({
  footerLinks,
  copyrightHolder,
}: FooterContentProps) {
  const links = footerLinks
    ? footerLinks.map((l) => ({ text: l.label, url: l.href }))
    : siteConfig.footer.links

  const holder = copyrightHolder ?? 'Emergency Response Alliance Pty Ltd'

  return (
    <footer>
      {/* Bottom footer with grid layout */}
      <div className="dt:dr-layout-grid-inner flex flex-col-reverse w-full typo-label-m dr-mb-16 dt:dr-mb-16 max-dt:px-safe">
        <span className="dt:col-span-2 typo-label-s dt:typo-label-m text-center dt:text-left text-off-white/70">
          {holder} &copy; {CURRENT_YEAR ?? 2025}
        </span>
        <div className="dt:col-[3/-3] max-dt:w-full flex items-center justify-center max-dt:flex-wrap max-dt:gap-x-12 max-dt:gap-y-8 dt:dr-gap-24 dr-mb-16 dt:mb-0">
          {links.map((link, index) => (
            <Link
              key={link.text + index.toString()}
              href={link.url}
              className="link typo-label-s dt:typo-label-m whitespace-nowrap"
            >
              {link.text}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
