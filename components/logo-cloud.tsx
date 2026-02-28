'use client'

import { Beacon } from '~/components/ui/svgs/beacon'
import { Hulu } from '~/components/ui/svgs/hulu'
import { Stripe } from '~/components/ui/svgs/stripe'
import { Supabase } from '~/components/ui/svgs/supabase'
import { VercelFull } from '~/components/ui/svgs/vercel'
import { Spotify } from '~/components/ui/svgs/spotify'
import Link from 'next/link'
import TailwindCSS from '~/components/ui/svgs/tailwindcss'
import { Marquee } from '~/components/marquee'

const logos = [
    { key: 'hulu', Component: Hulu, height: 28 },
    { key: 'spotify', Component: Spotify, height: 36 },
    { key: 'supabase', Component: Supabase, height: 32 },
    { key: 'beacon', Component: Beacon, height: 28 },
    { key: 'vercel', Component: VercelFull, height: 28 },
    { key: 'stripe', Component: Stripe, height: 32 },
    { key: 'tailwindcss', Component: TailwindCSS, height: 32 },
]

export default function LogoCloud() {
    return (
        <div className="relative py-[96px]">
            <div className="mx-auto max-w-[72rem] px-[24px] dt:px-[48px]">
                <div className="flex flex-col gap-[48px] dt:grid dt:grid-cols-[auto_1fr] dt:items-center dt:gap-[24px]">
                    <div className="flex flex-col gap-[16px] max-dt:text-center">
                        <p className="text-secondary w-fit max-w-[24rem] text-balance text-[20px] leading-[1.4] max-dt:mx-auto">
                            Trusted by fast-growing companies around the world
                        </p>
                        <Link
                            href="#"
                            className="text-contrast text-[14px] underline"
                        >
                            Read case studies
                        </Link>
                    </div>

                    {/* Desktop: grid */}
                    <div className="hidden dt:grid dt:grid-cols-4 items-center gap-x-[32px] gap-y-[48px] **:fill-secondary">
                        {logos.map(({ key, Component, height }) => (
                            <div
                                key={key}
                                className="flex items-center justify-center px-[12px]"
                            >
                                <Component height={height} width="auto" />
                            </div>
                        ))}
                    </div>

                    {/* Mobile: marquee */}
                    <div
                        className="dt:hidden **:fill-secondary overflow-hidden"
                        style={{
                            maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                            WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                        }}
                    >
                        <Marquee speed={1} direction={-1}>
                            {logos.map(({ key, Component, height }) => (
                                <div
                                    key={key}
                                    className="flex shrink-0 items-center justify-center px-[24px]"
                                >
                                    <Component height={height} width="auto" />
                                </div>
                            ))}
                        </Marquee>
                    </div>
                </div>
            </div>
        </div>
    )
}
