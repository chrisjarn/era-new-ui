import dynamic from 'next/dynamic'
import { sanityFetch } from '~/sanity/lib/live'
import { HOME_PAGE_FULL_QUERY } from '~/sanity/lib/queries'
import { Wrapper } from '../_components/wrapper'
// Above-fold: static imports
import { Hero } from './_sections/hero'
// Server Components (no client JS)
import { HowItWorks } from './_sections/how-it-works'
import { PlatformOverview } from './_sections/platform-overview'
import { ProblemTimeline } from './_sections/problem-timeline'

// Below-fold: dynamic imports to reduce initial JS and TBT

const SocialProof = dynamic(() =>
  import('./_sections/social-proof').then((mod) => mod.SocialProof)
)
const Features = dynamic(() =>
  import('./_sections/features-section').then((mod) => mod.Features)
)
const Industries = dynamic(() =>
  import('./_sections/industries').then((mod) => ({
    default: mod.Industries,
  }))
)
const Pricing = dynamic(() =>
  import('./_sections/pricing').then((mod) => mod.Pricing)
)
const Investors = dynamic(() =>
  import('./_sections/investors').then((mod) => mod.Investors)
)
const Showcase = dynamic(() =>
  import('./_sections/showcase').then((mod) => mod.Showcase)
)
const Community = dynamic(() =>
  import('./_sections/comunity').then((mod) => mod.Community)
)
const Footer = dynamic(() =>
  import('./_sections/footer').then((mod) => mod.Footer)
)

/** Convert null to undefined (Sanity TypeGen returns null for optional fields) */
function nu<T>(value: T | null | undefined): T | undefined {
  return value ?? undefined
}

export default async function Home() {
  const { data } = await sanityFetch({ query: HOME_PAGE_FULL_QUERY })
  const homePage = data?.homePage
  const config = data?.siteConfig

  return (
    <Wrapper
      theme="dark"
      lenis={{}}
      className="mx-auto bg-primary max-w-screen overflow-x-clip"
    >
      <Hero
        heroLeadIn={nu(homePage?.heroLeadIn)}
        heroTagline={nu(homePage?.heroTagline)}
        heroDescription={nu(homePage?.heroDescription)}
        heroPrimaryCta={nu(homePage?.heroPrimaryCta)}
        heroSecondaryCta={nu(homePage?.heroSecondaryCta)}
      />
      <ProblemTimeline
        title={nu(homePage?.timelineSectionTitle)}
        messages={data?.timelineMessages?.map((m) => ({
          _id: m._id,
          messageId: nu(m.messageId),
          tag: m.tag,
          message: m.message,
          videoDescription: nu(m.videoDescription),
          video: m.video
            ? {
                mp4: nu(m.video.mp4),
                webm: nu(m.video.webm),
                poster: nu(m.video.poster),
              }
            : undefined,
          order: nu(m.order),
        }))}
      />
      <PlatformOverview
        leadIn={nu(homePage?.platformSectionLeadIn)}
        title={nu(homePage?.platformSectionTitle)}
        subtitle={nu(homePage?.platformSectionSubtitle)}
        cta={nu(homePage?.platformSectionCta)}
        phases={data?.phases?.map((p) => ({
          _id: p._id,
          title: p.title,
          description: p.description,
          video: p.video
            ? {
                mp4: nu(p.video.mp4),
                webm: nu(p.video.webm),
                poster: nu(p.video.poster),
              }
            : undefined,
          order: nu(p.order),
        }))}
      />
      <SocialProof
        sectionTitle={nu(homePage?.socialProofSectionTitle)}
        testimonials={data?.testimonials?.map((t) => ({
          _id: t._id,
          quote: t.quote,
          author: t.author,
          position: nu(t.position),
          companyLogo: nu(t.companyLogo),
          order: nu(t.order),
        }))}
      />
      <HowItWorks
        leadIn={nu(homePage?.statsSectionLeadIn)}
        title={nu(homePage?.statsSectionTitle)}
        cta={nu(homePage?.statsSectionCta)}
        stats={data?.stats?.map((s) => ({
          _id: s._id,
          value: s.value,
          label: s.label,
          order: nu(s.order),
        }))}
      />
      <Features
        leadIn={nu(homePage?.featuresSectionLeadIn)}
        title={nu(homePage?.featuresSectionTitle)}
        cta={nu(homePage?.featuresSectionCta)}
      />
      <Industries
        leadIn={nu(homePage?.industriesSectionLeadIn)}
        title={nu(homePage?.industriesSectionTitle)}
        subtitle={nu(homePage?.industriesSectionSubtitle)}
        cta={nu(homePage?.industriesSectionCta)}
        sectors={data?.sectors?.map((s) => ({
          _id: s._id,
          title: s.title,
          description: s.description,
          icon: nu(s.icon),
          order: nu(s.order),
        }))}
      />
      <Pricing
        leadIn={nu(homePage?.complianceSectionLeadIn)}
        title={nu(homePage?.complianceSectionTitle)}
        complianceStandards={data?.complianceStandards?.map((c) => ({
          _id: c._id,
          standardName: c.standardName,
          description: nu(c.description),
          cta: nu(c.cta),
          features: nu(c.features),
          order: nu(c.order),
        }))}
        complianceStatement={nu(homePage?.complianceStatement)}
      />
      <Investors />
      <Showcase />
      <Community />
      <Footer
        title={nu(homePage?.footerCtaTitle)}
        subtitle={nu(homePage?.footerCtaDescription)}
        primaryCta={nu(homePage?.footerCtaCta)}
        contactEmail={nu(config?.contactEmail)}
        footerLinks={config?.footerLinks?.map((l) => ({
          label: l.label ?? '',
          href: l.href ?? '',
          external: nu(l.external),
        }))}
        copyrightHolder={nu(config?.copyrightHolder)}
      />
    </Wrapper>
  )
}
