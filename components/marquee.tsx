'use client'

import {
  Marquee as MarqueeComponent,
  useMarquee as useMarqueeHook,
} from '@joycostudio/marquee/react'

export const useMarquee = useMarqueeHook

export function Marquee({
  children,
  speed = 1,
  direction = -1,
  ...props
}: Omit<React.ComponentProps<typeof MarqueeComponent>, 'speed' | 'direction'> & {
  speed?: number
  direction?: 1 | -1
}) {
  return (
    <MarqueeComponent speed={speed} direction={direction} {...props}>
      <div className="flex items-center gap-[32px] px-[16px]">{children}</div>
    </MarqueeComponent>
  )
}
