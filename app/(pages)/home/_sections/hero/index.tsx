'use client'

import cn from 'clsx'
import { useRect } from 'hamo'
import { useRef } from 'react'
import LinesBg from '~/assets/svgs/hero-line-bg.svg'
import { CTA } from '~/components/button'
import { TextEffect, TextEffectWrapper } from '~/components/text-effect'
import { useDeviceDetection } from '~/hooks/use-device-detection'
import { useScrollTrigger } from '~/hooks/use-scroll-trigger'
import { fromTo } from '~/libs/utils'
import s from './hero.module.css'

interface HeroProps {
  heroLeadIn?: string
  heroTagline?: string
  heroTaglineMobile?: string
  heroDescription?: string
  heroPrimaryCta?: { text: string; href: string }
  heroSecondaryCta?: { text: string; href: string }
}

export function Hero({
  heroLeadIn,
  heroTagline,
  heroTaglineMobile,
  heroDescription,
  heroPrimaryCta,
  heroSecondaryCta,
}: HeroProps) {
  const [setRectRef, rect] = useRect()
  useDeviceDetection()

  const titleRef = useRef<HTMLDivElement>(null)
  const arrowDownRef = useRef<HTMLDivElement>(null)

  useScrollTrigger({
    rect,
    start: 'top top',
    end: 'bottom center',
    onProgress: ({ progress }) => {
      fromTo(
        arrowDownRef.current,
        {
          translate: 0,
        },
        {
          translate: 100,
        },
        progress,
        {
          ease: 'linear',
          render: (element, { translate }) => {
            if (element instanceof HTMLElement) {
              element.style.transform = `translate(-50%, 0%) translate(0px, 50%) translateY(${translate}%)`
            }
          },
        }
      )
    },
  })

  return (
    <section
      ref={setRectRef}
      className={cn(
        s.wrapper,
        'relative dt:dr-p-40 px-2 dr-mb-10 dt:dr-mb-0 bg-white section-rounded overflow-hidden z-1'
      )}
    >
      <LinesBg
        className={
          'absolute desktop-only top-0 dr-inset-24 left-1/2 -translate-x-1/2 dt:w-screen dt:h-screen h-full section-rounded-bottom'
        }
      />

      <div
        className={cn(
          s.inner,
          'flex bg-white relative dr-pb-24 dt:dr-pb-0 dr-pt-80 dt:dr-pt-0'
        )}
      >
        <div className="flex dt:flex-row flex-col-reverse items-center content-max-width w-full dt:dr-gap-40">
          <div
            className="w-full flex flex-col dr-gap-16 items-start z-1 px-4 dt:px-0"
            ref={titleRef}
          >
            {heroLeadIn && (
              <TextEffectWrapper>
                <p className="typo-label-s text-off-white/50 tracking-widest uppercase">
                  {heroLeadIn}
                </p>
              </TextEffectWrapper>
            )}
            <div className="hidden dt:block w-full">
              <TextEffect
                as="h1"
                className="typo-hero-title text-start"
                per="char"
                staggerDuration={0.02}
              >
                {heroTagline ?? 'Location. Capture. Improve. Respond.'}
              </TextEffect>
            </div>
            <div className="dt:hidden max-w-[320px]">
              <TextEffect
                as="h1"
                className="typo-hero-mobile text-start text-balance"
                per="char"
                staggerDuration={0.02}
              >
                {heroTaglineMobile ?? heroTagline ?? 'Location. Capture. Improve. Respond.'}
              </TextEffect>
            </div>
            <TextEffectWrapper>
              <p className="typo-p dt:typo-p-l text-off-white/50 text-start max-w-prose">
                {heroDescription ??
                  'From critical incidents to daily operations, ERA orchestrates work across your entire organisation.'}
              </p>
            </TextEffectWrapper>
            <div className="dr-mt-24 flex dr-gap-12 flex-col dt:flex-row">
              <CTA
                href={heroPrimaryCta?.href ?? '/contact-us'}
                className="bg-black! text-teal border-teal"
              >
                {heroPrimaryCta?.text ?? 'Request a Demo'}
              </CTA>
              <CTA
                href={heroSecondaryCta?.href ?? '#platform'}
                type="secondary"
              >
                {heroSecondaryCta?.text ?? 'See How It Works'}
              </CTA>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
