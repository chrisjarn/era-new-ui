export const BLUR_FADE_DELAY = 0.15
export const CURRENT_YEAR = new Date().getFullYear()

export const siteConfig = {
  name: 'era-safety',
  description:
    'The closed-loop emergency response platform that captures hazards, trains your people, runs your drills, manages real emergencies, and proves you did it right.',
  url: process.env.NEXT_PUBLIC_BASE_URL || 'https://erasafety.net',
  keywords: [
    'Emergency Management',
    'Safety Platform',
    'AS3745',
    'WHS Compliance',
    'Emergency Response',
    'Warden Management',
    'Emergency Drills',
    'Hazard Reporting',
    'Incident Management',
    'Compliance Reporting',
    'Emergency Preparedness',
    'Workplace Safety',
    'Aged Care Safety',
    'Healthcare Emergency Management',
    'Government Emergency Response',
    'Commercial Building Safety',
    'Industrial Safety',
    'Emergency Training',
    'Drill Management',
    'Safety Auditing',
  ],
  links: {
    email: 'sales@erasafety.net',
  },
  metadata: {
    title: 'ERA Safety | Every second counts. Every person accounted for.',
    description:
      'The closed-loop emergency response platform that captures hazards, trains your people, runs your drills, manages real emergencies, and proves you did it right.',
    icons: {
      icon: '/favicon.ico',
    },
    openGraph: {
      title: 'ERA Safety | Every second counts. Every person accounted for.',
      description:
        'The closed-loop emergency response platform that captures hazards, trains your people, runs your drills, manages real emergencies, and proves you did it right.',
      images: [
        {
          url: '/opengraph-image.png',
          width: 1200,
          height: 630,
          alt: 'ERA Safety - The closed-loop emergency response platform',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: 'ERA Safety | Every second counts. Every person accounted for.',
      description:
        'The closed-loop emergency response platform that captures hazards, trains your people, runs your drills, manages real emergencies, and proves you did it right.',
      images: [
        {
          url: '/twitter-image.jpg',
          width: 1200,
          height: 630,
          alt: 'ERA Safety - The closed-loop emergency response platform',
        },
      ],
    },
  },
  footer: {
    socialLinks: [],
    links: [
      { text: 'Platform', url: '/platform' },
      { text: 'Solutions', url: '/solutions' },
      { text: 'Compliance', url: '/compliance' },
      { text: 'About', url: '/about' },
      { text: 'Contact', url: '/contact' },
      { text: 'Privacy', url: '/privacy' },
      { text: 'Terms', url: '/terms' },
    ],
    bottomText: `Emergency Response Alliance Pty Ltd \u00A9 ${CURRENT_YEAR ?? 2025}`,
    brandText: 'ERA Safety',
  },
}

export type SiteConfig = typeof siteConfig
