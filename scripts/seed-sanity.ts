/**
 * Seed script for populating Sanity CMS with ERA Safety website content.
 *
 * Usage:
 *   bun run scripts/seed-sanity.ts
 *   (or: bun run seed:sanity)
 *
 * Requires SANITY_API_WRITE_TOKEN in environment (or .env.local).
 * All operations are idempotent — safe to run multiple times.
 */

import { createClient } from '@sanity/client'

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'h6wntf2c'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'era'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-02-21'

const token = process.env.SANITY_API_WRITE_TOKEN
if (!token) {
  console.error(
    'Missing SANITY_API_WRITE_TOKEN. Set it in your environment or .env.local.'
  )
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
})

// ---------------------------------------------------------------------------
// Document definitions (26 total)
// ---------------------------------------------------------------------------

const documents: Record<string, unknown>[] = [
  // ── siteConfig (singleton) ──────────────────────────────────────────────
  {
    _id: 'siteConfig',
    _type: 'siteConfig',
    siteName: 'era-safety',
    siteDescription:
      'The closed-loop emergency response platform that captures hazards, trains your people, runs your drills, manages real emergencies, and proves you did it right.',
    siteUrl: 'https://erasafety.net',
    contactEmail: 'sales@erasafety.net',
    tagline: 'Every second counts. Every person accounted for.',
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
    copyrightHolder: 'Emergency Response Alliance Pty Ltd',
    footerLinks: [
      {
        _type: 'navLink',
        _key: 'fl1',
        label: 'Platform',
        href: '/platform',
        external: false,
      },
      {
        _type: 'navLink',
        _key: 'fl2',
        label: 'Solutions',
        href: '/solutions',
        external: false,
      },
      {
        _type: 'navLink',
        _key: 'fl3',
        label: 'Compliance',
        href: '/compliance',
        external: false,
      },
      {
        _type: 'navLink',
        _key: 'fl4',
        label: 'About',
        href: '/about',
        external: false,
      },
      {
        _type: 'navLink',
        _key: 'fl5',
        label: 'Contact',
        href: '/contact',
        external: false,
      },
      {
        _type: 'navLink',
        _key: 'fl6',
        label: 'Privacy',
        href: '/privacy',
        external: false,
      },
      {
        _type: 'navLink',
        _key: 'fl7',
        label: 'Terms',
        href: '/terms',
        external: false,
      },
    ],
    socialLinks: [],
  },

  // ── homePage (singleton) ────────────────────────────────────────────────
  {
    _id: 'homePage',
    _type: 'homePage',

    // Hero
    heroLeadIn: 'Emergency Response Platform',
    heroTagline: 'Every second counts.\nEvery person accounted for.',
    heroDescription:
      'The closed-loop platform that captures hazards, trains your people, runs your drills, manages real emergencies, and proves you did it right.',
    heroPrimaryCta: {
      _type: 'ctaLink',
      text: 'Request a Demo',
      href: '/contact-us',
    },
    heroSecondaryCta: {
      _type: 'ctaLink',
      text: 'See How It Works',
      href: '#platform',
    },

    // Timeline
    timelineSectionTitle: 'The reality today.',

    // Platform
    platformSectionLeadIn: 'INTRODUCING ERA',
    platformSectionTitle:
      'One platform. One workflow.\nComplete emergency readiness.',
    platformSectionSubtitle:
      'No more scattered records and manual checklists. ERA gives you a single mobile platform that covers every stage of your emergency management lifecycle.',
    platformSectionCta: {
      _type: 'ctaLink',
      text: 'See How It Works',
      href: '/contact-us',
    },

    // Social Proof
    socialProofSectionTitle: 'Trusted Across Industries',

    // Stats
    statsSectionLeadIn: 'TRUSTED AT SCALE',
    statsSectionTitle: 'Proof in numbers',
    statsSectionCta: {
      _type: 'ctaLink',
      text: 'Request a Demo',
      href: '/contact-us',
    },

    // Features
    featuresSectionLeadIn: 'FEATURES',
    featuresSectionTitle: 'What ERA Safety solves for you',
    featuresSectionCta: {
      _type: 'ctaLink',
      text: 'Request a Demo',
      href: '/contact-us',
    },

    // Industries
    industriesSectionLeadIn: 'SECTORS',
    industriesSectionTitle: 'Built for your industry',
    industriesSectionSubtitle:
      'ERA Safety serves facilities across healthcare, aged care, government, commercial, and education sectors.',
    industriesSectionCta: {
      _type: 'ctaLink',
      text: 'Request a Demo',
      href: '/contact-us',
    },

    // Compliance
    complianceSectionLeadIn: 'COMPLIANCE',
    complianceSectionTitle: 'Your obligations, covered.',
    complianceStatement:
      "ERA is designed from the ground up to satisfy Australian Standard AS3745-2010 and the WHS Regulations across every state and territory. Compliance isn't a feature we added. It's the foundation the entire platform is built on.",

    // Footer CTA
    footerCtaTitle: 'Ready to prove your people are ready?',
    footerCtaDescription:
      'See ERA in action. Request a personalised demo for your building, your portfolio, or your organisation.',
    footerCtaCta: {
      _type: 'ctaLink',
      text: 'REQUEST A DEMO',
      href: '/contact-us',
    },
  },

  // ── platformPhase (5 documents) ────────────────────────────────────────
  {
    _id: 'platformPhase-1',
    _type: 'platformPhase',
    order: 1,
    title: 'Capture It',
    description:
      'Spot a hazard. Snap a photo. Log it in seconds. ERA turns every team member into a safety sensor, capturing hazards, running inspections, and feeding a live risk register.',
  },
  {
    _id: 'platformPhase-2',
    _type: 'platformPhase',
    order: 2,
    title: 'Train It',
    description:
      "ERA's Learning Matrix maps every role to the exact competencies required by AS3745 and your WHS obligations. Track completion, forecast expiries, and close gaps before an auditor finds them.",
  },
  {
    _id: 'platformPhase-3',
    _type: 'platformPhase',
    order: 3,
    title: 'Simulate It',
    description:
      "Run drills that build muscle memory, not just paperwork. ERA's simulation mode uses the same system your team will rely on in a real emergency.",
  },
  {
    _id: 'platformPhase-4',
    _type: 'platformPhase',
    order: 4,
    title: 'Manage It',
    description:
      "When it's real, ERA becomes your command centre. Chief Wardens see every floor's status in real time. A live safe-list tracks who's accounted for and who's not.",
  },
  {
    _id: 'platformPhase-5',
    _type: 'platformPhase',
    order: 5,
    title: 'Improve It',
    description:
      'Every drill and every incident generates a debrief report automatically. Training gaps feed back into the Learning Matrix. The loop closes.',
  },

  // ── timelineMessage (4 documents) ──────────────────────────────────────
  {
    _id: 'timelineMessage-1',
    _type: 'timelineMessage',
    order: 1,
    messageId: { _type: 'slug', current: 'binder-problem' },
    tag: 'reality',
    message:
      'Your emergency plan lives in a binder no one has opened since the last audit.',
    videoDescription:
      'Dusty binder on a shelf \u2014 an outdated emergency plan gathering dust',
  },
  {
    _id: 'timelineMessage-2',
    _type: 'timelineMessage',
    order: 2,
    messageId: { _type: 'slug', current: 'outdated-records' },
    tag: 'reality',
    message:
      'Your warden list is outdated. Your training records are scattered across three spreadsheets.',
    videoDescription:
      'Cluttered spreadsheet tabs \u2014 warden lists and training records spread across files',
  },
  {
    _id: 'timelineMessage-3',
    _type: 'timelineMessage',
    order: 3,
    messageId: { _type: 'slug', current: 'hoping-not-knowing' },
    tag: 'reality',
    message:
      'When the alarm sounds, you\u2019re hoping, not knowing, that your people are ready.',
    videoDescription:
      'Fire alarm flashing \u2014 uncertainty during an evacuation with no live data',
  },
  {
    _id: 'timelineMessage-4',
    _type: 'timelineMessage',
    order: 4,
    messageId: { _type: 'slug', current: 'era-solution' },
    tag: 'solution',
    message:
      'ERA replaces the binders, the spreadsheets, and the guesswork with one platform.',
    videoDescription:
      'ERA dashboard overview \u2014 one platform replacing scattered tools',
  },

  // ── testimonial (3 documents) ──────────────────────────────────────────
  {
    _id: 'testimonial-1',
    _type: 'testimonial',
    order: 1,
    quote:
      '\u201CWe reduced drill preparation from three days to 20 minutes. ERA gives us a live headcount during evacuations \u2014 no more clipboards, no more guessing who\u2019s still inside.\u201D',
    author: 'Sarah Mitchell',
    position: 'Facilities Director, Metro West Hospital Group',
  },
  {
    _id: 'testimonial-2',
    _type: 'testimonial',
    order: 2,
    quote:
      '\u201COur auditors used to spend a full week pulling records from different systems. With ERA, every drill, every training certificate, and every incident report is in one place. Our last compliance review took two hours.\u201D',
    author: 'David Lam',
    position: 'WHS Manager, Northern Councils Alliance',
  },
  {
    _id: 'testimonial-3',
    _type: 'testimonial',
    order: 3,
    quote:
      '\u201CAcross 54 aged care facilities, we had zero consistency in emergency procedures. ERA standardised everything \u2014 warden training, drill schedules, reporting \u2014 and we can see compliance status for every site in real time.\u201D',
    author: 'Karen O\u2019Brien',
    position: 'Chief Risk Officer, Southcare Aged Living',
  },

  // ── stat (4 documents) ─────────────────────────────────────────────────
  {
    _id: 'stat-1',
    _type: 'stat',
    order: 1,
    value: '20+',
    label: 'Hospitals trust ERA',
  },
  {
    _id: 'stat-2',
    _type: 'stat',
    order: 2,
    value: '50+',
    label: 'Aged care facilities protected',
  },
  {
    _id: 'stat-3',
    _type: 'stat',
    order: 3,
    value: '100+',
    label: 'Council sites on-platform',
  },
  {
    _id: 'stat-4',
    _type: 'stat',
    order: 4,
    value: '10+',
    label: 'Years of emergency management R&D',
  },

  // ── sector (5 documents) ───────────────────────────────────────────────
  {
    _id: 'sector-1',
    _type: 'sector',
    order: 1,
    title: 'Healthcare',
    description:
      'Code Blue, Code Yellow, Code Orange \u2014 each demands different response protocols. ERA maps every code to every role, every floor, every shift.',
  },
  {
    _id: 'sector-2',
    _type: 'sector',
    order: 2,
    title: 'Aged Care',
    description:
      'Residents with mobility challenges. Staff rotations. Accreditation audits every three years. ERA keeps your emergency plans current as your facility changes.',
  },
  {
    _id: 'sector-3',
    _type: 'sector',
    order: 3,
    title: 'Government & Councils',
    description:
      '100+ buildings. Different floor plans. Different wardens. One compliance obligation. ERA gives you a single view across your entire portfolio.',
  },
  {
    _id: 'sector-4',
    _type: 'sector',
    order: 4,
    title: 'Commercial & Retail',
    description:
      'Tenants change. Floors get reconfigured. Fire wardens leave. ERA tracks it all so your compliance never lapses.',
  },
  {
    _id: 'sector-5',
    _type: 'sector',
    order: 5,
    title: 'Education',
    description:
      'Students, staff, and visitors across multiple buildings. ERA ensures everyone knows their role when it matters most.',
  },

  // ── complianceStandard (3 documents) ───────────────────────────────────
  {
    _id: 'complianceStandard-1',
    _type: 'complianceStandard',
    order: 1,
    standardName: 'AS3745-2010',
    description: 'Planning for emergencies in facilities',
    cta: { _type: 'ctaLink', text: 'Get a Demo', href: '/contact-us' },
    features: [
      'Emergency planning procedures',
      'Warden training requirements',
      'Evacuation drill standards',
      'Emergency control organisation',
    ],
  },
  {
    _id: 'complianceStandard-2',
    _type: 'complianceStandard',
    order: 2,
    standardName: 'WHS Regulations',
    description: 'State and territory workplace health and safety obligations',
    cta: { _type: 'ctaLink', text: 'Get a Demo', href: '/contact-us' },
    features: [
      'Risk assessment frameworks',
      'Incident reporting requirements',
      'Training and competency records',
      'Emergency preparedness obligations',
    ],
  },
  {
    _id: 'complianceStandard-3',
    _type: 'complianceStandard',
    order: 3,
    standardName: 'ISO 45001',
    description: 'Occupational health and safety management',
    cta: { _type: 'ctaLink', text: 'Get a Demo', href: '/contact-us' },
    features: [
      'Systematic hazard identification',
      'Continuous improvement framework',
      'Audit-ready documentation',
      'Performance monitoring',
    ],
  },
]

// ---------------------------------------------------------------------------
// Seed execution
// ---------------------------------------------------------------------------

async function seed() {
  console.log(
    `Seeding Sanity project "${projectId}" / dataset "${dataset}" with ${documents.length} documents...`
  )

  const transaction = client.transaction()

  for (const doc of documents) {
    transaction.createOrReplace(
      doc as Parameters<typeof transaction.createOrReplace>[0]
    )
  }

  const result = await transaction.commit()

  console.log(
    `Done. Transaction ID: ${result.transactionId} — ${documents.length} documents created or replaced.`
  )
}

seed().catch((error) => {
  console.error('Seed failed:', error)
  process.exit(1)
})
