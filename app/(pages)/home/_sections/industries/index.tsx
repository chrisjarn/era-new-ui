'use client'

import { TitleBlock } from '~/app/(pages)/home/_components/title-block'
import { CTA } from '~/components/button'
import { SECTORS } from './data'
import s from './industries.module.css'

interface IndustriesProps {
  leadIn?: string
  title?: string
  subtitle?: string
  cta?: { text: string; href: string }
  sectors?: Array<{
    _id: string
    title: string
    description: string
    icon?: unknown
    order?: number
  }>
}

export function Industries({
  leadIn,
  title,
  subtitle,
  cta,
  sectors,
}: IndustriesProps) {
  const displaySectors = sectors ?? SECTORS

  return (
    <section
      className="dr-pt-80 dr-pb-120 dt:dr-pt-120 dt:dr-pb-200 bg-white relative z-1"
      id="industries"
    >
      <div className="mx-auto dr-layout-grid-inner relative content-max-width">
        <TitleBlock className="dt:col-start-4 dt:col-end-10 dr-mb-56 col-span-full">
          <TitleBlock.LeadIn>{leadIn ?? 'SECTORS'}</TitleBlock.LeadIn>
          <TitleBlock.Title level="h2">
            {title ?? 'Built for the Realities of Your Industry'}
          </TitleBlock.Title>
          <TitleBlock.Subtitle>
            {subtitle ??
              'ERA has been shaped by hands-on experience across healthcare, aged care, government, commercial property, retail and education — helping PCBUs meet their WHS obligations with structured, scalable systems.'}
          </TitleBlock.Subtitle>
        </TitleBlock>

        <div className="dt:col-start-3 dt:col-end-11 col-span-full">
          <div className={s.accordion}>
            {displaySectors.map((sector) => (
              <details key={sector.title} className={s.item}>
                <summary className={s.summary}>
                  <span className="typo-h3 dt:typo-h2">{sector.title}</span>
                  <span className={s.icon}>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M10 4V16M4 10H16"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </summary>
                <p className={`${s.content} typo-p dt:typo-p-l`}>
                  {sector.description}
                </p>
              </details>
            ))}
          </div>

          <div className={s.cta}>
            <CTA href={cta?.href ?? '/contact-us'}>
              {cta?.text ?? 'Request a Demo'}
            </CTA>
          </div>
        </div>
      </div>
    </section>
  )
}
