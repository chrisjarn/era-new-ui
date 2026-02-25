'use client'

import cn from 'clsx'
import { useIntersectionObserver, useRect, useWindowSize } from 'hamo'
import type { CSSProperties } from 'react'
import { useEffect, useRef } from 'react'
import type { BackgroundRefType } from '~/app/(pages)/home/_components/background'
import { TitleBlock } from '~/app/(pages)/home/_components/title-block'
import { CTA } from '~/components/button'
import { Link } from '~/components/link'
import { useDeviceDetection } from '~/hooks/use-device-detection'
import { useDesktopVW } from '~/hooks/use-device-values'
import { useScrollTrigger } from '~/hooks/use-scroll-trigger'
import { fromTo } from '~/libs/utils'
import s from './features.module.css'

const BUTTONS = [
  { title: 'Critical', href: '/contact-us', top: 13, left: 30 },
  { title: 'Capture', href: '/contact-us', top: 16, right: 17 },
  { title: 'Improve', href: '/contact-us', top: 28, left: 12 },
  { title: 'My Site', href: '/contact-us', top: 46, left: 27.5 },
  { title: 'Incident Management', href: '/contact-us', top: 57, right: 13 },
  { title: 'Critical Notifications', href: '/contact-us', top: 33, right: 25.7 },
  { title: 'Live Dashboards', href: '/contact-us', top: 71, left: 19 },
  { title: 'Warden Training', href: '/contact-us', top: 70, right: 30 },
  { title: 'Compliance Records', href: '/contact-us', top: 84, left: 38 },
  { title: 'NEXT Workflow Engine', href: '/contact-us', top: 89, right: 22 },
]

interface FeaturesProps {
  leadIn?: string
  title?: string
  cta?: { text: string; href: string }
}

export function Features({ leadIn, title, cta }: FeaturesProps) {
  const buttonsRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const [setRectRef, rect] = useRect()
  const desktopVW = useDesktopVW()
  const { width: windowWidth = 0 } = useWindowSize()
  const { isDesktop, isSafari } = useDeviceDetection()

  const hasAnimated = useRef(false)
  const backgroundRef = useRef<BackgroundRefType>(null)

  const [setIntersectionRef, intersection] = useIntersectionObserver({
    threshold: 0.1,
  })

  useEffect(() => {
    if (intersection?.isIntersecting && !hasAnimated.current) {
      hasAnimated.current = true

      for (const [index, button] of buttonsRefs.current.entries()) {
        if (button) {
          button.style.transition = `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`
          button.style.opacity = '1'
          button.style.setProperty('--reveal-y', '0px')
        }
      }
    }
  }, [intersection?.isIntersecting])

  useScrollTrigger({
    rect,
    start: 'top center',
    end: 'center center',
    onProgress: ({ progress }) => {
      if (!backgroundRef.current) return

      const element = backgroundRef.current?.getElement?.()
      if (element && !isSafari) {
        element.style.visibility = progress === 0 ? 'hidden' : 'visible'
      }

      const items = backgroundRef.current?.getItems()
      fromTo(
        items,
        {
          width: (index: number) =>
            isSafari
              ? desktopVW(496 + (items!.length - 1 - index) * 260, true)
              : desktopVW(1440 * 1.5 + (items!.length - 1 - index) * 100, true),
          opacity: 1,
        },
        {
          width: (index: number) =>
            desktopVW(496 + (items!.length - 1 - index) * 260, true),
          opacity: 1,
        },
        progress,
        {
          ease: 'easeOutSine',
          render: (item, value) => {
            const { width, opacity } = value
            // @ts-expect-error
            const element = item?.getElement()
            // @ts-expect-error
            item?.setBorderRadius(`${width * 2}px`)

            if (element instanceof HTMLElement) {
              element.style.width = `${width}px`
              element.style.height = `${width}px`
              element.style.opacity = `${opacity}`
            }
          },
        }
      )
    },
  })

  useScrollTrigger({
    rect,
    start: 'top top',
    end: 'bottom bottom',
    onProgress: ({ progress }) => {
      if (!isDesktop) return

      buttonsRefs.current.forEach((button, index) => {
        if (!button) return
        const depth = ((index % 4) + 1) / 4
        const y = -windowWidth * 0.04 * depth * progress
        button.style.setProperty('--parallax-y', `${y}px`)
      })
    },
  })

  return (
    <div className={cn('dt:dr-py-200 bg-white relative', s.section)}>
      <section
        ref={setRectRef}
        className="relative flex flex-col items-center justify-center"
      >
        <div
          className={cn(
            'absolute left-0 right-0 bottom-0 desktop-only',
            isSafari ? 'top-0' : 'top-[-50vh]'
          )}
        />
        <div className="dt:h-screen w-full flex flex-col items-center justify-center dt:bg-transparent bg-white">
          <div
            ref={(node) => {
              setIntersectionRef(node)
            }}
            className="text-center flex flex-col items-center relative z-10 max-dt:dr-mt-64"
          >
            <TitleBlock className="dt:dr-mb-40 dt:max-w-[34vw] max-dt:max-w-[330px] mx-auto">
              <TitleBlock.LeadIn>{leadIn ?? 'FEATURES'}</TitleBlock.LeadIn>
              <TitleBlock.Title level="h2">
                {title ?? 'What ERA provides your organisation'}
              </TitleBlock.Title>
            </TitleBlock>
            <CTA
              className="bg-black! text-teal border-teal w-full dt:w-auto desktop-only"
              href={cta?.href ?? '/contact-us'}
            >
              {cta?.text ?? 'Request a Demo'}
            </CTA>
          </div>

          <div className="absolute inset-0 desktop-only">
            {BUTTONS.map((button, index) => (
              // biome-ignore lint: GSAP animation requires direct DOM ref — Link component doesn't forward refs
              <a
                key={button.title}
                ref={(el) => {
                  buttonsRefs.current[index] = el
                }}
                href={button.href}
                className="absolute typo-button text-nowrap dr-rounded-16 dr-px-16 dr-py-8 bg-white border border-dark-grey  hover:bg-light-gray transition-colors duration-300"
                style={{
                  top: `${button.top}%`,
                  ...('left' in button ? { left: `${button.left}%` } : {}),
                  ...('right' in button ? { right: `${button.right}%` } : {}),
                  opacity: 0,
                  zIndex: 100 - index,
                  transform:
                    'translateY(calc(var(--reveal-y, 20px) + var(--parallax-y, 0px)))',
                  ['--reveal-y' as string]: '20px',
                  ['--parallax-y' as string]: '0px',
                } as CSSProperties}
              >
                {button.title}
              </a>
            ))}
          </div>
          <div className="mobile-only w-full dr-px-16 dr-mt-24">
            {/* Animation placeholder */}
            <div className="w-full aspect-16/9 dr-rounded-16 border border-dashed border-dark-grey/20 bg-dark-grey/5 flex items-center justify-center dr-mb-24">
              <span className="typo-label-s text-off-white/10 uppercase tracking-widest">Feature Animation</span>
            </div>
            <div className="grid grid-cols-2 dr-gap-8">
              {BUTTONS.map((button) => (
                <Link
                  key={button.title}
                  href={button.href}
                  className="typo-label-m text-center dr-rounded-12 dr-px-12 dr-py-10 bg-dark-grey/30 border border-dark-grey/50 text-off-white/70"
                >
                  {button.title}
                </Link>
              ))}
            </div>
            <CTA
              color="black"
              className="mobile-only w-full dr-mt-20 dr-mb-40"
              href={cta?.href ?? '/contact-us'}
            >
              {cta?.text ?? 'Request a Demo'}
            </CTA>
          </div>
        </div>

      </section>
    </div>
  )
}
