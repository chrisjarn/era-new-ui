'use client'

import cn from 'clsx'
import { TitleBlock } from '~/app/(pages)/home/_components/title-block'
import { CTA } from '~/components/button'
import { Image } from '~/components/image'
import { Video } from '~/components/video'
import { cards } from './data'
import s from './platform-overview.module.css'

interface PlatformOverviewProps {
  leadIn?: string
  title?: string
  subtitle?: string
  cta?: { text: string; href: string }
  phases?: Array<{
    _id?: string
    title: string
    description: string
    video?: { mp4?: string; webm?: string; poster?: unknown }
    order?: number
  }>
}

export function PlatformOverview({
  leadIn,
  title,
  subtitle,
  cta,
  phases,
}: PlatformOverviewProps) {
  const resolvedLeadIn = leadIn ?? 'INTRODUCING ERA'
  const resolvedTitle =
    title ?? 'One platform. One workflow.\nComplete Readiness.'
  const resolvedSubtitle =
    subtitle ??
    'ERA replaces fragmented systems with a central coordination engine — turning plans into action and action into proof. A mobile-first system built for real incidents, not just audits. Stay in control with real-time accountability and clear next actions.'
  const resolvedCtaText = cta?.text ?? 'See How It Works'
  const resolvedCtaHref = cta?.href ?? '/contact-us'

  // Map Sanity phases to the card shape, or fall back to static data
  const resolvedCards = phases
    ? phases.map((phase) => ({
        title: phase.title,
        text: phase.description,
        video: {
          mp4: phase.video?.mp4 ?? '',
          webm: phase.video?.webm ?? '',
          png: '', // TODO: use urlForImage(phase.video.poster) when poster assets are added
        },
      }))
    : cards

  return (
    <section
      id="platform"
      className="content-max-width dt:dr-pt-106 dr-pt-120 dt:dr-pb-220 dr-pb-120"
    >
      <div className="dr-layout-grid">
        <div className="dt:col-start-1 dt:col-end-5 col-span-full dr-mb-56 dt:dr-mb-0">
          <TitleBlock className="items-start dt:dr-mb-40 dr-mb-32">
            <TitleBlock.LeadIn className="dr-mb-16 dt:dr-mb-24">
              {resolvedLeadIn}
            </TitleBlock.LeadIn>
            <TitleBlock.Title
              level="h2"
              className="dt:dr-mb-16 dr-mb-8 text-left w-full"
            >
              {resolvedTitle.split('\n').map((line) => (
                <span key={line} className="block w-full">
                  {line}
                </span>
              ))}
            </TitleBlock.Title>
            <TitleBlock.Subtitle className="text-left dr-w-180 dt:dr-w-350">
              {resolvedSubtitle}
            </TitleBlock.Subtitle>
          </TitleBlock>
          <CTA href={resolvedCtaHref} className="w-fit mx-0">
            {resolvedCtaText}
          </CTA>
        </div>

        <div className="grid dt:grid-cols-2 grid-cols-1 dt:dr-gap-x-24 dt:dr-gap-y-40 dr-gap-y-24 dt:dr-pt-56 dt:col-start-6 dt:col-end-12 col-span-full dr-px-16 dt:px-0">
          {resolvedCards.map((card) => (
            <Card key={card?.title} data={card} />
          ))}
        </div>
      </div>
    </section>
  )
}

type CardData = {
  title: string
  text: string
  video: { mp4: string; webm: string; png: string }
}

type CardProps = {
  data: CardData
}

function Card({ data }: CardProps) {
  return (
    <div
      className={cn(
        'flex dt:flex-row flex-col items-center dt:items-start dr-gap-12',
        s.cardWrapper
      )}
    >
      <div className="dr-size-64 dr-p-4 dr-rounded-20 border border-dark-grey bg-off-white overflow-hidden shrink-0 grid place-items-center">
        <div className="dr-size-50 grid place-items-center">
          {data?.video?.png ? (
            <Video
              autoPlay
              priority
              fallback={<Image src={data?.video?.png} alt={data?.title} />}
            >
              <source src={data?.video?.mp4} type='video/mp4; codecs="hvc1"' />
              <source src={data?.video?.webm} type="video/webm" />
            </Video>
          ) : (
            <span className="typo-label-s text-off-white/20 uppercase tracking-wider">
              {data?.title?.split(' ')[0]?.[0]}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col dr-gap-8">
        <h4 className="typo-h4 dt:typo-h3 dt:w-fit dt:text-nowrap text-center dt:text-left">
          {data?.title}
        </h4>
        <p className="typo-p text-off-white/50 text-center dt:text-left">
          {data?.text}
        </p>
      </div>
    </div>
  )
}
