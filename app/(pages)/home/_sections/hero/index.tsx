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
  heroDescription?: string
  heroPrimaryCta?: { text: string; href: string }
  heroSecondaryCta?: { text: string; href: string }
}

export function Hero({
  heroLeadIn,
  heroTagline,
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
            className="dt:dr-w-col-5 flex flex-col dr-gap-16 items-center dt:items-start z-1 px-safe dt:px-0"
            ref={titleRef}
          >
            <TextEffectWrapper>
              <p className="typo-label-s text-off-white/50 tracking-widest uppercase">
                {heroLeadIn ?? 'Emergency Response Alliance'}
              </p>
            </TextEffectWrapper>
            {typeof (heroTagline ?? 'Location. Capture. Improve. Respond.') === 'string' ? (
              <TextEffect
                as="h1"
                className="dt:typo-hero-title typo-h2 text-center dt:text-start"
                per="char"
                staggerDuration={0.02}
              >
                {heroTagline ?? 'Location. Capture. Improve. Respond.'}
              </TextEffect>
            ) : (
              <h1 className="dt:typo-hero-title typo-h2 text-center dt:text-start">
                {heroTagline}
              </h1>
            )}
            <TextEffectWrapper>
              <p className="typo-p dt:typo-p-l text-off-white/50 text-center dt:text-start max-w-prose">
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
          <div className="dt:dr-w-col-6 relative dt:dr-ml-col-1 flex items-center justify-center dr-pb-24 dt:dr-pb-0">
            {/* Animation placeholder */}
            <div className="w-full aspect-square max-w-[280px] dt:max-w-none dt:aspect-[4/3] dr-rounded-20 border border-dashed border-dark-grey/30 bg-dark-grey/5 flex items-center justify-center">
              <span className="typo-label-s text-off-white/15 uppercase tracking-widest">3D Visual</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
