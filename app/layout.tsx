import type { Metadata, Viewport } from 'next'

import type { PropsWithChildren } from 'react'
import { ReactTempus } from 'tempus/react'
import { RealViewport } from '~/components/real-viewport'
import AppData from '~/package.json'
import { AnalyticsProvider } from '~/providers/posthog-provider'
import { themes } from '~/styles/colors'
import '~/styles/css/index.css'

import { Agentation } from 'agentation'
import Script from 'next/script'
import { GSAPRuntime } from '~/components/gsap/runtime'
import { TurnstileScript } from '~/components/turnstile-script'
import { SEO_FALLBACK_BASE_URL } from '~/libs/seo/constants'
import {
  getRootStructuredData,
  serializeJsonLd,
} from '~/libs/seo/structured-data'
import { OrchestraTools } from '~/orchestra'
import { SanityLive } from '~/sanity/lib/live'
import { fontsVariable } from '~/styles/fonts'

const APP_NAME = AppData.name
const APP_DEFAULT_TITLE = 'ERA Safety'
const APP_TITLE_TEMPLATE = '%s'
const APP_DESCRIPTION = AppData.description
const APP_BASE_URL = (
  process.env.NEXT_PUBLIC_BASE_URL || SEO_FALLBACK_BASE_URL
).replace(/\/+$/, '')

export const metadata: Metadata = {
  metadataBase: new URL(APP_BASE_URL),
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  keywords: [
    'emergency management',
    'safety platform',
    'AS3745',
    'WHS',
    'emergency response',
    'warden management',
    'emergency drills',
    'hazard reporting',
    'incident management',
    'compliance reporting',
    'workplace safety',
    'emergency preparedness',
  ],
  alternates: {
    canonical: '/',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: { telephone: false },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    url: APP_BASE_URL,
    images: [
      {
        url: '/opengraph-image.jpg?v=3',
        width: 1200,
        height: 630,
        alt: 'ERA Safety - The closed-loop emergency response platform',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images: ['/twitter-image.jpg?v=3'],
  },
  authors: [{ name: 'ERA Safety', url: 'https://erasafety.net' }],
  other: {
    'fb:app_id': process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || '',
  },
}

export const viewport: Viewport = {
  themeColor: themes.dark.primary,
  colorScheme: 'dark',
}

export default async function Layout({ children }: PropsWithChildren) {
  const sameAs: string[] = []

  const structuredDataJson = serializeJsonLd(
    getRootStructuredData({
      baseUrl: APP_BASE_URL,
      description: APP_DESCRIPTION,
      sameAs,
    })
  )

  return (
    <html
      lang="en"
      dir="ltr"
      className={fontsVariable}
      // NOTE: This is due to the data-theme attribute being set which causes hydration errors
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to external origins for faster resource loading */}
        <link rel="preconnect" href="https://us.i.posthog.com" />
        <link rel="preconnect" href="https://us-assets.i.posthog.com" />
        <link rel="dns-prefetch" href="https://api.mapbox.com" />
        <link rel="dns-prefetch" href="https://api.open-meteo.com" />
        {/* JSON-LD structured data for SEO */}
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires injecting a serialized string.
          dangerouslySetInnerHTML={{ __html: structuredDataJson }}
        />
      </head>
      {/* this helps to track Satus usage thanks to Wappalyzer */}
      <Script async>{`window.satusVersion = '${AppData.version}';`}</Script>
      {/* Cloudflare Turnstile for contact form spam protection */}
      <TurnstileScript />
      <body>
        <AnalyticsProvider>
          {/* Critical: CSS custom properties needed for layout */}
          <RealViewport>
            {/* Main app content */}
            {children}
          </RealViewport>
          {/* Development tools - dynamically imported */}
          <OrchestraTools />

          {/* Animation framework */}
          <GSAPRuntime />

          {/* Agentation annotation toolbar - development only */}
          {process.env.NODE_ENV === 'development' && <Agentation />}

          {/* RAF management - lightweight, but don't patch in draft mode to avoid conflicts */}
          <ReactTempus
            // patch={!isDraftMode}
            patch={true}
          />

          {/* Sanity Live Content API - keeps content automatically updated */}
          <SanityLive />
        </AnalyticsProvider>
      </body>
    </html>
  )
}
