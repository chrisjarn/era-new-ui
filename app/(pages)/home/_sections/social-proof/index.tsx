'use client'

import cn from 'clsx'
import { useIntersectionObserver } from 'hamo'
import { useCallback, useEffect, useRef, useState } from 'react'

import { socials } from './data'
import s from './social.module.css'

export type SocialData = {
  text: string
  author: string
  position: string
  icon: React.ReactNode | null
}

type ActiveCard = number | null

interface SocialProofProps {
  sectionTitle?: string
  testimonials?: Array<{
    _id: string
    quote: string
    author: string
    position?: string
    companyLogo?: unknown
    order?: number
  }>
}

export function SocialProof({ sectionTitle, testimonials }: SocialProofProps) {
  const [activeCard, setActiveCard] = useState<ActiveCard>(null)

  const handleIntersect = useCallback(
    (id: ActiveCard, isIntersecting: boolean) => {
      setActiveCard((prev) => {
        if (isIntersecting) return id
        if (prev === id) return null
        return prev
      })
    },
    []
  )

  const displaySocials = testimonials
    ? testimonials.map((t) => ({
        text: t.quote,
        author: t.author,
        position: t.position ?? '',
        icon: null,
      }))
    : socials

  return (
    <section className="dt:dr-py-200 dr-py-80 dr-pt-60 dt:dr-pt-200 bg-white section-rounded-top section-shadow-top">
      <h2 className="typo-h1 text-center dr-mb-56 px-safe flex dr-gap-8 items-center justify-center">
        {sectionTitle ?? 'Trusted across Australia and New Zealand'}
      </h2>

      {/* Social Proof */}
      <div className="dt:grid dt:grid-cols-3 dt:dr-gap-24 flex flex-col dr-gap-12 content-max-width dt:dr-px-155 px-safe">
        {displaySocials?.map((social, index) => (
          <SocialCard
            key={social?.author + index?.toString()}
            social={social}
            index={index}
            isActive={activeCard === index}
            onIntersect={handleIntersect}
          />
        ))}
      </div>
    </section>
  )
}

export function SocialCard({
  social,
  className,
  index,
  isActive,
  onIntersect,
}: {
  social: SocialData
  className?: string
  index?: number
  isActive?: boolean
  onIntersect?: (id: ActiveCard, isIntersecting: boolean) => void
}) {
  const [setIntersectionRef, intersection] = useIntersectionObserver({
    rootMargin: '-45% 0px -45% 0px',
    threshold: 0,
  })
  const prevIntersecting = useRef<boolean | undefined>(undefined)

  // Only run intersection logic when onIntersect is provided
  useEffect(() => {
    if (!onIntersect || index === undefined) return
    const isIntersecting = intersection?.isIntersecting
    if (
      isIntersecting !== undefined &&
      isIntersecting !== prevIntersecting.current
    ) {
      prevIntersecting.current = isIntersecting
      onIntersect(index, isIntersecting)
    }
  }, [intersection, onIntersect, index])

  return (
    <div
      ref={onIntersect ? setIntersectionRef : undefined}
      className={cn(
        s.social,
        isActive && s.active,
        'bg-white dr-rounded-20 border border-dark-grey dr-p-8 dr-pb-16 h-full flex flex-col',
        className
      )}
    >
      <div
        className={cn(
          s.text,
          'dr-p-24 bg-dark-grey dr-rounded-12 dr-mb-16',
          'h-full grow'
        )}
      >
        <p className="typo-p">{social?.text}</p>
      </div>
      <div className="flex items-center dr-gap-12 justify-between dr-px-8 w-full! mt-auto">
        <div className="flex flex-col">
          <span className="typo-p-bold dr-mb-6">{social?.author}</span>
          {social?.position && (
            <span
              className={cn(
                s.position,
                'typo-label-s dr-px-8 dr-py-4 dr-rounded-16 bg-dark-grey w-fit'
              )}
            >
              {social?.position}
            </span>
          )}
        </div>
        {social?.icon}
      </div>
    </div>
  )
}
