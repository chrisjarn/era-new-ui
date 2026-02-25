'use client'

import cn from 'clsx'
import { useCallback, useRef } from 'react'
import { HashPattern } from '~/app/(pages)/home/_components/hash-pattern'
import CloseIcon from '~/assets/svgs/close.svg'
import NavMobile from '~/assets/svgs/nav-mobile.svg'
import { Button, CTA } from '~/components/button'
import { EraLogo } from '~/components/era-logo'
import { Link } from '~/components/link'
import { useStore } from '~/libs/store'
import s from './navigation.module.css'

const LEFT_LINKS = [
  { href: '/#platform', label: 'Platform' },
  { href: '/#sectors', label: 'Solutions' },
] as const

const RIGHT_LINKS = [
  { href: '/#compliance', label: 'Compliance' },
  { href: '/contact-us', label: 'About' },
] as const

export function Navigation() {
  const isMobileNavOpened = useStore((state) => state.isMobileNavOpened)
  const setIsMobileNavOpened = useStore((state) => state.setIsMobileNavOpened)
  const hasAppeared = useStore((state) => state.hasAppeared)
  const centerRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLUListElement>(null)
  const rightRef = useRef<HTMLUListElement>(null)

  const handleMobileLinkClick = useCallback(
    (href: string) => {
      setIsMobileNavOpened(false)

      // Handle anchor links
      const hashIndex = href.indexOf('#')
      if (hashIndex !== -1) {
        const hash = href.slice(hashIndex + 1)
        // Small delay to let the menu close animation start
        setTimeout(() => {
          const element = document.getElementById(hash)
          if (element) {
            const mobileNavOffset = 80
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition =
              elementPosition + window.scrollY - mobileNavOffset

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            })
          }
        }, 100)
      }
    },
    [setIsMobileNavOpened]
  )

  return (
    <nav
      className={cn(
        'fixed top-0 z-100 dr-layout-grid-inner pt-gap uppercase typo-button dt:left-1/2 dt:-translate-x-1/2',
        !hasAppeared && 'dt:opacity-0',
        'transition-opacity duration-600 ease-out-expo'
      )}
    >
      <div className="desktop-only" />
      <section className="col-span-full dt:col-start-3 dt:col-end-11 flex justify-center ">
        {/* Desktop Nav */}
        <div
          ref={centerRef}
          className="w-full dt:dr-max-w-1440 dt:origin-center flex justify-between items-center  border border-dark-grey dt:pl-gap  dt:dr-pr-8  dt:rounded-full overflow-hidden dr-h-48  bg-black/70 backdrop-blur-[30px] desktop-only"
        >
          <ul ref={leftRef} className=" flex dr-gap-20">
            {LEFT_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="link">
                  {link.label}
                  {'external' in link && ' ↗'}
                </Link>
              </li>
            ))}
          </ul>
          <div
            className={cn(
              'dt:absolute dt:left-1/2 dt:-translate-x-1/2 dt:grid dt:place-items-center',
              s.brandDock
            )}
          >
            <Link
              href="/"
              className={cn('no-underline grid place-items-center', s.brandLink)}
              aria-label="ERA Safety Home"
            >
              <EraLogo
                className={cn(
                  'w-auto dt:dr-h-60 dr-h-24',
                  s.brandLogo,
                  s.brandLogoDesktop
                )}
              />
            </Link>
          </div>
          <ul
            ref={rightRef}
            className="flex items-center justify-end dr-gap-20"
          >
            {RIGHT_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="link">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact-us"
                className={cn(
                  'dr-px-16 dr-h-32 rounded-full bg-mint grid place-items-center',
                  s.loginButton
                )}
              >
                Request Demo
              </Link>
            </li>
          </ul>
        </div>
        {/* Mobile Nav */}
        <div
          className={cn(
            'mobile-only border border-dark-grey w-full dr-h-48 dr-rounded-24 relative overflow-hidden bg-black/80 backdrop-blur-[30px]',
            s.mobileNavContainer,
            isMobileNavOpened && s.mobileNavOpened
          )}
        >
          <div className="absolute dr-h-48 dr-pl-24 dr-pr-20  flex justify-between items-center w-full ">
            <Link
              href="/"
              onClick={() => setIsMobileNavOpened(false)}
              className={cn(
                'text-off-white/90 no-underline grid place-items-center',
                s.brandLinkMobile
              )}
              aria-label="ERA Safety Home"
            >
              <EraLogo className={cn('w-auto dr-h-24', s.brandLogoMobile)} />
            </Link>
            <Button
              onClick={() => {
                setIsMobileNavOpened(!isMobileNavOpened)
              }}
              className="flex dr-gap-4"
            >
              {isMobileNavOpened ? 'Close' : 'Menu'}
              {isMobileNavOpened ? (
                <CloseIcon className="dr-w-16" />
              ) : (
                <NavMobile className="dr-w-16" />
              )}
            </Button>
          </div>
          {/* Mobile content */}
          <div
            className={cn(
              'absolute dr-top-80 dr-px-24 transition-opacity duration-300 ease-in-expo w-full',
              isMobileNavOpened ? 'opacity-100' : 'opacity-0'
            )}
          >
            <div className="flex flex-col dr-gap-y-16 dr-mb-40">
              {[...LEFT_LINKS, ...RIGHT_LINKS].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn('link')}
                  onClick={() => handleMobileLinkClick(link.href)}
                >
                  {link.label}
                  {'external' in link && ' ↗'}
                </Link>
              ))}
            </div>
            <CTA
              className={s.ctaMobile}
              href="/contact-us"
              onClick={() => setIsMobileNavOpened(false)}
            >
              Request Demo
            </CTA>
          </div>
        </div>
      </section>
      <div className="desktop-only" />

      <div
        className={cn(
          'mobile-only h-screen w-full  absolute inset -z-1 bg-ghost-mint/80 opacity-0 transition-opacity duration-300 ease-in-out pointer-events-none',
          isMobileNavOpened && 'opacity-100'
        )}
      >
        <HashPattern className="absolute inset-0 text-dark-teal/50" />
      </div>
    </nav>
  )
}
