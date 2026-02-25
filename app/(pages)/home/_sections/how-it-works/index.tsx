'use client'

import cn from 'clsx'
import { TitleBlock } from '~/app/(pages)/home/_components/title-block'
import { CTA } from '~/components/button'

const STATS = [
  {
    value: '20+',
    label: 'Years experience in WHS, emergency management and training',
  },
  {
    value: '15+',
    label: 'Years experience in workflow optimisation and full stack software development',
  },
  { value: '10', label: 'Years of research and development' },
  { value: '8', label: 'Nationally deployed across 6 states and 2 territories' },
]

interface HowItWorksProps {
  leadIn?: string
  title?: string
  cta?: { text: string; href: string }
  stats?: Array<{ _id?: string; value: string; label: string; order?: number }>
}

export function HowItWorks({ leadIn, title, cta, stats }: HowItWorksProps) {
  const resolvedLeadIn = leadIn ?? 'TRUSTED AT SCALE'
  const resolvedTitle = title ?? 'Proof in numbers'
  const resolvedCtaText = cta?.text ?? 'Request a Demo'
  const resolvedCtaHref = cta?.href ?? '/contact-us'
  const resolvedStats = stats ?? STATS

  return (
    <section
      className={cn(
        'dt:dr-p-40 dr-px-8 dt:dr-px-40 dt:dr-py-0 bg-white z-1 relative'
      )}
    >
      <div className="z-1 overflow-hidden dr-rounded-20 dt:dr-py-104 dr-py-72 dr-px-16 dt:dr-px-0 flex flex-col relative content-max-width">

        <TitleBlock className="dr-mb-56">
          <TitleBlock.LeadIn>{resolvedLeadIn}</TitleBlock.LeadIn>
          <TitleBlock.Title level="h2" className="dt:dr-mb-40! dr-mb-32">
            {resolvedTitle}
          </TitleBlock.Title>
          <CTA href={resolvedCtaHref} className="w-fit mx-auto">
            {resolvedCtaText}
          </CTA>
        </TitleBlock>
        <div className="grid dt:grid-cols-4 grid-cols-2 dr-gap-16 dt:dr-gap-40 dr-mb-40 text-center px-safe dt:px-0">
          {resolvedStats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center dr-py-16 dr-rounded-16 bg-dark-grey/20">
              <p className="typo-h2 dr-mb-8">{stat.value}</p>
              <p className="typo-p-s dt:typo-p text-off-white/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
