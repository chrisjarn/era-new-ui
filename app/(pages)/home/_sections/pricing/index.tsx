'use client'

import cn from 'clsx'
import { useIntersectionObserver, useRect } from 'hamo'
import { useContext } from 'react'
import { BackgroundContext } from '~/app/(pages)/home/_components/background/context'
import { TitleBlock } from '~/app/(pages)/home/_components/title-block'
import CheckSVG from '~/assets/svgs/check.svg'
import { CTA } from '~/components/button'
import { useDesktopVW } from '~/hooks/use-device-values'
import { useScrollTrigger } from '~/hooks/use-scroll-trigger'
import { mapRange } from '~/libs/utils'
import { complianceStatement, pricingCards } from './data'
import s from './section-12.module.css'

interface PricingProps {
  leadIn?: string
  title?: string
  complianceStandards?: Array<{
    _id: string
    standardName: string
    description?: string
    cta?: { text: string; href: string }
    features?: string[]
    order?: number
  }>
  complianceStatement?: string
}

export function Pricing({
  leadIn,
  title,
  complianceStandards,
  complianceStatement: stmtProp,
}: PricingProps) {
  const [setRectRef, rect] = useRect()

  const { getSolidBackground } = useContext(BackgroundContext)

  const desktopVW = useDesktopVW()

  useScrollTrigger(
    {
      rect,
      start: 'bottom bottom',
      end: 'bottom top',
      onProgress: ({ progress, height }) => {
        const solidBackground = getSolidBackground()
        if (solidBackground) {
          const inset = mapRange(0, 1, progress, 0, desktopVW(40, true))
          const radius = mapRange(0, 1, progress, 0, desktopVW(20, true))

          solidBackground.style.clipPath = `inset(0 ${inset}px 0px ${inset}px round ${radius}px)`

          solidBackground.style.transform = `translateY(${-height * progress}px)`
        }
      },
    },
    []
  )

  const displayCards = complianceStandards
    ? complianceStandards.map((s) => ({
        plan: s.standardName,
        title: '',
        description: s.description ?? '',
        button: s.cta
          ? { text: s.cta.text, href: s.cta.href }
          : { text: 'Get a Demo', href: '/contact-us' },
        features: s.features ?? [],
      }))
    : pricingCards

  const resolvedComplianceStatement = stmtProp ?? complianceStatement
  const statementSplitMarker = 'From Australian Standards'
  const statementParagraphs = resolvedComplianceStatement.includes(
    statementSplitMarker
  )
    ? [
        resolvedComplianceStatement
          .slice(0, resolvedComplianceStatement.indexOf(statementSplitMarker))
          .trim(),
        resolvedComplianceStatement
          .slice(resolvedComplianceStatement.indexOf(statementSplitMarker))
          .trim(),
      ]
    : [resolvedComplianceStatement]

  return (
    <>
      <section
        className="dt:dr-pt-65 dr-pt-40 dr-pb-40 dt:dr-pb-80 bg-white dt:scroll-mt-220 scroll-mt-80 relative z-1"
        ref={setRectRef}
        id="compliance"
      >
        <div className="mx-auto dr-layout-grid-inner relative content-max-width">
          <TitleBlock className="dt:col-start-4 dt:col-end-10 dr-mb-56 col-span-full">
            <TitleBlock.LeadIn>{leadIn ?? 'COMPLIANCE'}</TitleBlock.LeadIn>
            <TitleBlock.Title level="h2" className="dr-mb-0!">
              {title ?? (
                <>
                  Your obligations, <br className="mobile-only" /> covered.
                </>
              )}
            </TitleBlock.Title>
          </TitleBlock>
          <div className="dt:col-start-2 dt:col-end-12 col-span-full">
            <div className="grid dt:grid-cols-3 grid-cols-1 dt:dr-gap-24 dr-gap-16">
              {displayCards.map((card, i) => (
                <ComplianceCard key={`${card?.plan}-${i}`} card={card} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-black dr-pt-140 dr-pb-96 dt:dr-pt-300 dt:dr-pb-220 overflow-hidden">
        <div className="relative content-max-width px-safe dt:px-0">
          <div className="max-w-5xl mx-auto">
            {statementParagraphs.map((paragraph, index) => (
              <p
                key={`${paragraph.slice(0, 24)}-${index}`}
                className={cn(
                  'typo-p dt:typo-p-l text-center text-off-white/80',
                  index !== statementParagraphs.length - 1 && 'dr-mb-24'
                )}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function ComplianceCard({ card }: { card: (typeof pricingCards)[number] }) {
  const [setIntersectionRef, intersection] = useIntersectionObserver({
    rootMargin: '-20%',
    threshold: 0.4,
  })
  const isActive = intersection?.isIntersecting

  return (
    <div className={s.cardWrapper}>
      <div className={s.cardRing} />

      <div
        ref={setIntersectionRef}
        className={cn(
          'dr-p-8 dr-pb-24 border border-dark-grey dr-rounded-20 bg-white dt:dr-h-497 relative ',
          s.card,
          isActive && s.active
        )}
      >
        <div
          className={cn(
            'dr-p-16 dr-rounded-12 bg-dark-grey border border-dark-grey dr-mb-12',
            s.cardHeader
          )}
        >
          <p className="dt:typo-label-m typo-label-s dr-mb-16">{card?.plan}</p>
          <p className="dt:typo-p typo-p-s">{card?.description}</p>
        </div>
        <CTA
          className="w-full dt:justify-between dr-mb-32"
          href={card?.button?.href}
          active={isActive}
        >
          {card?.button?.text}
        </CTA>
        <ul className="flex flex-col dt:dr-gap-12 dr-gap-8 dr-ml-8 dt:dr-ml-0">
          {card?.features.map((feature) => (
            <li key={feature} className="flex items-center dr-gap-8">
              <CheckSVG className="dr-size-16 text-teal shrink-0" />
              <p className="typo-label-m text-off-white">{feature}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
