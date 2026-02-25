'use client'

import cn from 'clsx'
import gsap from 'gsap'
import { useRect } from 'hamo'
import { useEffectEvent, useRef } from 'react'
import { TitleBlock } from '~/app/(pages)/home/_components/title-block'
import { CTA } from '~/components/button'
import { FooterContent } from '~/components/footer-content'
import { useDeviceDetection } from '~/hooks/use-device-detection'
import { useDesktopVW } from '~/hooks/use-device-values'
import { useScrollTrigger } from '~/hooks/use-scroll-trigger'
import { fromTo, mapRange } from '~/libs/utils'
import Background, {
  type BackgroundRefType,
} from '../../_components/background'

interface FooterProps {
  title?: string
  subtitle?: string
  primaryCta?: { text: string; href: string }
  contactEmail?: string
  footerLinks?: Array<{ label: string; href: string; external?: boolean }>
  copyrightHolder?: string
}

export function Footer({
  title,
  subtitle,
  primaryCta,
  contactEmail,
  footerLinks,
  copyrightHolder,
}: FooterProps) {
  const [setRectRef, rect] = useRect({ ignoreTransform: true })
  const innerRef = useRef<HTMLDivElement>(null)
  const desktopVW = useDesktopVW()
  const backgroundRef = useRef<BackgroundRefType>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const { isSafari } = useDeviceDetection()

  useScrollTrigger({
    rect,
    start: `top bottom`,
    end: 'bottom bottom',

    onProgress: ({ progress }) => {
      if (overlayRef.current) {
        overlayRef.current.style.opacity = mapRange(
          0,
          1,
          progress,
          0.25,
          0,
          true
        ).toString()
      }

      if (stickyRef.current) {
        stickyRef.current.style.transform = `translateY(${(1 - progress) * 50}%)`
      }

      const items = backgroundRef.current?.getItems()
      if (!items) return

      fromTo(
        items,
        {
          width: (index) =>
            desktopVW(666 + (items.length - 1 - index) * 344, true),
          y: 0,
        },
        {
          width: (index) =>
            desktopVW(666 + (items.length - 1 - index) * 344, true),
          y: 0,
        },
        progress,
        {
          ease: 'linear',
          render: (item, { width, y }) => {
            // @ts-expect-error
            const element = item?.getElement()

            if (element instanceof HTMLElement) {
              element.style.width = `${width}px`
              element.style.height = `${width}px`
              element.style.transform = `translateY(${y}px)`
            }
          },
        }
      )
    },
  })

  const onMouseEnter = useEffectEvent(() => {
    if (isSafari) return

    const items = backgroundRef.current?.getItems()
    if (!items) return
    items.forEach((item, index) => {
      const element = item?.getElement()
      if (element) {
        const width = desktopVW(596 + (items.length - 1 - index) * 260, true)

        gsap.to(element, {
          width: width,
          height: width,
          duration: 1,
          ease: 'expo.out',
        })
      }
    })
  })

  const onMouseLeave = useEffectEvent(() => {
    if (isSafari) return

    const items = backgroundRef.current?.getItems()
    if (!items) return
    items.forEach((item, index) => {
      const element = item?.getElement()

      if (element) {
        const width = desktopVW(666 + (items.length - 1 - index) * 344, true)

        gsap.to(element, {
          width: width,
          height: width,
          duration: 1,
          ease: 'expo.out',
        })
      }
    })
  })

  const emailHref = contactEmail
    ? `mailto:${contactEmail}`
    : 'mailto:sales@erasafety.net'
  const emailDisplay = contactEmail ?? 'sales@erasafety.net'

  return (
    <section
      ref={setRectRef}
      className=" relative bg-white dt:bg-transparent dt:h-screen"
    >
      <div className="dt:absolute dt:bottom-0 dt:left-0 dt:right-0 dt:top-0">
        <div
          className="dt:h-screen dt:sticky dt:top-0 dt:left-0 dt:right-0 max-dt:transform-[unset]! overflow-clip"
          ref={stickyRef}
        >
          <div
            ref={overlayRef}
            className="bg-black inset-0 absolute z-2 opacity-25 pointer-events-none desktop-only"
          />
          <div
            className={cn(
              'absolute left-0 right-0 top-0 bottom-0 desktop-only'
            )}
          >
            <Background
              ref={backgroundRef}
              className="sticky top-0 h-screen left-0 right-0 bg-white"
            />
          </div>
          <div
            className="relative flex flex-col items-center justify-center dt:h-screen "
            ref={innerRef}
          >
            <div className="text-center flex flex-col items-center relative dr-mb-30 dt:dr-mb-0 px-safe dt:px-0 w-full">
              <TitleBlock className="w-full dt:w-auto">
                <TitleBlock.Title
                  level="h2"
                  className="dr-mb-8! typo-h1! dt:max-w-[28vw]"
                >
                  {title ?? 'Ready to prove your people are ready?'}
                </TitleBlock.Title>
                <TitleBlock.Subtitle className="typo-p! dt:typo-p-l! dt:dr-w-600">
                  {subtitle ??
                    'See ERA in action. Request a personalised demo for your building, your portfolio, or your organisation.'}
                </TitleBlock.Subtitle>
                <div className="flex dr-gap-8 dt:dr-mt-40 dr-mt-24 dt:flex-row flex-col items-center w-full dt:w-auto">
                  <CTA
                    className="bg-black! text-teal border-teal w-full dt:w-auto"
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    href={primaryCta?.href ?? '/contact-us'}
                  >
                    {primaryCta?.text ?? 'REQUEST A DEMO'}
                  </CTA>

                  <CTA
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    className="w-full dt:w-fit"
                    href={emailHref}
                  >
                    Email Us Directly
                  </CTA>
                </div>
                <p className="typo-label-m text-off-white/60 dt:dr-mt-24 dr-mt-16">
                  Or reach us directly at {emailDisplay}
                </p>
              </TitleBlock>
            </div>
            <div className="w-full dt:absolute dt:left-0 dt:right-0 dt:bottom-0">
              <FooterContent
                footerLinks={footerLinks}
                copyrightHolder={copyrightHolder}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
