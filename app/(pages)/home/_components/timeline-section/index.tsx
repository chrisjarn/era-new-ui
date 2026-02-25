'use client'
import cn from 'clsx'
import gsap from 'gsap'
import { useIntersectionObserver } from 'hamo'
import {
  createContext,
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import type { messages as messagesType } from '~/app/(pages)/home/_sections/problem-timeline/data'
import { CTA } from '~/components/button'
import { useDeviceDetection } from '~/hooks/use-device-detection'
import { colors } from '~/styles/colors'

export const TimelineSectionContext = createContext<{
  callbacks: RefObject<TimelineCallback[]>
  addCallback: (callback: TimelineCallback) => void
}>({
  callbacks: { current: [] },
  addCallback: () => {
    /* NO OP */
  },
})

const STEPS = 6
// Mobile scale values to align with the 4 dots
const MOBILE_SCALE_VALUES = [0, 0.17, 0.39, 0.62, 0.85, 1]

type CallbackParams = {
  progress: number
  steps: number[]
  currentStep: number
}
export type TimelineCallback = (params: CallbackParams) => void

export function TimelineSection({
  id,
  messages,
  title,
  children,
  ref,
  href,
}: {
  id: string
  messages: typeof messagesType
  title: string
  children?: React.ReactNode
  ref?: React.RefCallback<HTMLElement | null>
  proxyChildren?: React.ReactNode
  proxyPosition?: 'start' | 'end'
  href?: string
}) {
  const [setIntersectionRef, intersection] = useIntersectionObserver({
    threshold: 0.3,
  })
  const [messagesVisible, setMessagesVisible] = useState(0)
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0)
  const whiteLineRef = useRef<HTMLDivElement>(null)
  const callbacks = useRef<TimelineCallback[]>([])
  const addCallback = useCallback((callback: TimelineCallback) => {
    callbacks.current.push(callback)
  }, [])
  const messagesRef = useRef<HTMLUListElement>(null)
  const messageItemRefs = useRef<(HTMLLIElement | null)[]>([])
  const { isDesktop } = useDeviceDetection()
  const hasPlayed = useRef(false)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  // Duration in seconds for each step (index 0 = step 1, etc.)
  const STEP_DURATIONS = [2.5, 4.5, 6, 2, 2, 2]

  const emitStep = useCallback((step: number) => {
    const steps = Array.from({ length: STEPS }, (_, i) => (i < step ? 1 : 0))
    for (const callback of callbacks.current) {
      callback({ progress: step / STEPS, steps, currentStep: step })
    }
  }, [])

  const centerMobileCard = useCallback(
    (index: number, behavior: ScrollBehavior = 'smooth') => {
      const container = messagesRef.current
      const item = messageItemRefs.current[index]
      if (!(container && item)) return

      const targetLeft =
        item.offsetLeft - (container.clientWidth - item.clientWidth) / 2
      container.scrollTo({ left: Math.max(0, targetLeft), behavior })
    },
    []
  )

  const animateStep = useCallback(
    (step: number) => {
      setMessagesVisible(step)

      // Use different scale for mobile vs desktop
      const scaleValue = isDesktop
        ? step / STEPS
        : (MOBILE_SCALE_VALUES[step] ?? 0.875)

      if (whiteLineRef.current && isDesktop) {
        whiteLineRef.current.style.transform = `scaleY(${scaleValue})`

        whiteLineRef.current.style.boxShadow = '0 0 16px 0 rgba(32, 184, 205, 0.70)'
      }

      emitStep(step)

      if (messagesRef.current && !isDesktop) {
        const mobileIndex = Math.min(messages.length - 1, Math.max(0, step - 1))
        setMobileActiveIndex(mobileIndex)
        centerMobileCard(mobileIndex)
      }
    },
    [centerMobileCard, emitStep, isDesktop, messages.length]
  )

  useEffect(() => {
    if (!isDesktop) {
      timelineRef.current?.pause()
      return
    }

    if (intersection?.isIntersecting) {
      if (!hasPlayed.current) {
        hasPlayed.current = true

        const tl = gsap.timeline({ repeat: -1 })
        timelineRef.current = tl

        tl.call(() => animateStep(0), [], 0)

        for (let step = 1; step <= STEPS; step++) {
          tl.call(() => animateStep(step), [], `+=${STEP_DURATIONS[step - 1]}`)
        }
      } else {
        timelineRef.current?.resume()
      }
    } else {
      timelineRef.current?.pause()
    }
  }, [intersection, animateStep, isDesktop])

  useEffect(() => {
    if (isDesktop) return

    const initialStep = 1
    setMessagesVisible(initialStep)
    setMobileActiveIndex(0)
    emitStep(initialStep)

    const timer = window.setTimeout(() => {
      centerMobileCard(0, 'auto')
    }, 0)

    return () => {
      window.clearTimeout(timer)
    }
  }, [centerMobileCard, emitStep, isDesktop])

  const onMobileMessagesScroll = useCallback(() => {
    if (isDesktop || !messagesRef.current) return

    const container = messagesRef.current
    const containerCenter = container.scrollLeft + container.clientWidth / 2

    let nextIndex = 0
    let minDistance = Number.POSITIVE_INFINITY

    for (const [index, item] of messageItemRefs.current.entries()) {
      if (!item) continue
      const itemCenter = item.offsetLeft + item.clientWidth / 2
      const distance = Math.abs(itemCenter - containerCenter)
      if (distance < minDistance) {
        minDistance = distance
        nextIndex = index
      }
    }

    if (nextIndex === mobileActiveIndex) return

    setMobileActiveIndex(nextIndex)
    const step = Math.min(STEPS, nextIndex + 1)
    setMessagesVisible(step)
    emitStep(step)
  }, [emitStep, isDesktop, mobileActiveIndex])

  useEffect(() => {
    return () => {
      timelineRef.current?.kill()
    }
  }, [])

  return (
    <TimelineSectionContext.Provider value={{ callbacks, addCallback }}>
      <section
        id={id}
        ref={(node) => {
          setIntersectionRef(node)
          ref?.(node)
        }}
        className="content-max-width z-0"
      >
        <div className="dr-layout-grid-inner dt:h-screen dt:dr-max-h-900 relative items-center">
          <div className="col-span-4 flex flex-col max-dt:dr-pt-80 max-dt:dr-pb-16 max-dt:h-screen z-1">
            <div className="relative">
              <h3 className="relative typo-h1 text-center dt:text-left z-10">
                {title}
              </h3>
            </div>
            <div className="relative dr-py-40 max-dt:mt-auto ">
              <div className="absolute z-1 dr-w-32 dt:top-0 dt:-bottom-[120px] left-[calc(var(--safe)+32vw)] dt:dr-left-26 max-dt:hidden">
                <div
                  ref={whiteLineRef}
                  className="dr-w-9 h-full bg-white rounded-full mx-auto transition-transform duration-500 ease-out origin-top"
                  style={{
                    transform: 'scaleY(0)',
                  }}
                />
                <div className="dt:hidden absolute inset-0 flex flex-col justify-around items-center dr-py-16 z-10">
                  <div className="dr-size-10 rounded-full border border-dark-teal bg-light-gray" />
                  <div className="dr-size-10 rounded-full border border-dark-teal bg-light-gray" />
                  <div className="dr-size-10 rounded-full border border-dark-teal bg-light-gray" />
                  <div className="dr-size-10 rounded-full border border-dark-teal bg-light-gray" />
                </div>
              </div>

              {/* Left side */}

              <ul
                ref={messagesRef}
                onScroll={onMobileMessagesScroll}
                className="flex dt:flex-col dr-gap-8 dt:items-start max-dt:overflow-x-auto max-dt:snap-x max-dt:snap-mandatory max-dt:px-safe max-dt:-mx-safe [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              >
                {messages.map((message, idx) => {
                  const isLast = idx === messages.length - 1
                  const isActive = isDesktop
                    ? idx === messagesVisible - 1 ||
                      (isLast && messagesVisible >= messages.length)
                    : idx === mobileActiveIndex
                  return (
                    <TimelineItem
                      key={message.id}
                      message={message}
                      isActive={isActive}
                      itemRef={(node) => {
                        messageItemRefs.current[idx] = node
                      }}
                    />
                  )
                })}
              </ul>
            </div>

            <CTA
              className="bg-black! text-teal-500 border-teal w-full dt:w-auto"
              href={href}
              wrapperClassName="dt:w-[80%] relative z-20"
              hideHashOnMobile
            >
              See How ERA Works
            </CTA>
          </div>
          {/* Right side */}

          {children ? <div className={cn('absolute w-full h-full')}>{children}</div> : null}
        </div>
      </section>
    </TimelineSectionContext.Provider>
  )
}

function TimelineItem({
  message,
  isActive,
  itemRef,
}: {
  message: (typeof messagesType)[number]
  isActive: boolean
  itemRef?: React.Ref<HTMLLIElement>
}) {
  const liRef = useRef<HTMLLIElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)

  // Background color and box-shadow animation
  useEffect(() => {
    if (!(iconRef.current && liRef.current)) return

    gsap.to(iconRef.current, {
      backgroundColor: isActive ? colors.teal : colors['light-gray'],
      borderColor: isActive ? colors.teal : colors['dark-grey'],
      duration: 0.35,
      ease: 'power2.inOut',
    })

    gsap.to(liRef.current, {
      boxShadow: isActive ? '0 0 16px 0 rgba(32, 184, 205, 0.70)' : 'none',
      borderColor: isActive ? colors.teal : colors['dark-grey'],
      backgroundColor: isActive ? colors.black : colors['off-white'],
      color: isActive ? colors.mint : colors.black,
      duration: 0.35,
      ease: 'power2.inOut',
    })
  }, [isActive])

  return (
    <li
      ref={(node) => {
        liRef.current = node
        if (typeof itemRef === 'function') {
          itemRef(node)
          return
        }
        if (itemRef && 'current' in itemRef) {
          itemRef.current = node
        }
      }}
      className="relative max-dt:w-[82vw] max-dt:max-w-[340px] shrink-0 max-dt:snap-center dt:w-auto dt:dr-max-w-480 dr-min-h-85 dr-p-8 flex dt:dr-gap-4 dr-gap-12 dr-rounded-20 bg-off-white border border-dark-grey"
    >
      <div
        ref={iconRef}
        className="relative z-50 dr-size-60 shrink-0 dr-rounded-16 bg-light-gray"
      />
      <div className="relative z-10 dr-p-4">
        <div className="flex justify-between typo-label-s opacity-70 dr-mb-8">
          <p>{message.tag}</p>
        </div>
        <p className="typo-p">{message.message}</p>
      </div>
    </li>
  )
}
