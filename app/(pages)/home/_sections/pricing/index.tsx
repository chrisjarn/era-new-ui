'use client'

import cn from 'clsx'
import { useIntersectionObserver } from 'hamo'
import { TitleBlock } from '~/app/(pages)/home/_components/title-block'
import CheckSVG from '~/assets/svgs/check.svg'
import { CTA } from '~/components/button'
import { TextEffect } from '~/components/text-effect'
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

      <div className="content-max-width px-safe dt:px-0 dr-pt-80 dt:dr-pt-140 dr-pb-80 dt:dr-pb-140">
        <div className="dr-max-w-560 mx-auto w-full">
          {statementParagraphs.map((paragraph, index) => (
            <div
              key={`${paragraph.slice(0, 24)}-${index}`}
              className={cn(index !== statementParagraphs.length - 1 && 'dr-mb-24')}
            >
              <TextEffect
                as="p"
                per="word"
                staggerDuration={0.015}
                className="typo-p-bold dt:typo-h4 text-center text-off-white/80"
              >
                {paragraph}
              </TextEffect>
            </div>
          ))}
        </div>
      </div>
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
