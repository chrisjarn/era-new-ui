import { defineField, defineType } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'timeline', title: 'Timeline' },
    { name: 'platform', title: 'Platform (Meet ERA)' },
    { name: 'socialProof', title: 'Social Proof' },
    { name: 'stats', title: 'Statistics' },
    { name: 'features', title: 'Features' },
    { name: 'industries', title: 'Industries' },
    { name: 'compliance', title: 'Compliance' },
    { name: 'footerCta', title: 'Footer CTA' },
  ],
  fields: [
    // Hero
    defineField({
      name: 'heroLeadIn',
      title: 'Lead-in Text',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroTagline',
      title: 'Tagline',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Description',
      type: 'text',
      group: 'hero',
    }),
    defineField({
      name: 'heroPrimaryCta',
      title: 'Primary CTA',
      type: 'ctaLink',
      group: 'hero',
    }),
    defineField({
      name: 'heroSecondaryCta',
      title: 'Secondary CTA',
      type: 'ctaLink',
      group: 'hero',
    }),

    // Timeline
    defineField({
      name: 'timelineSectionTitle',
      title: 'Section Title',
      type: 'string',
      group: 'timeline',
    }),

    // Platform (Meet ERA)
    defineField({
      name: 'platformSectionLeadIn',
      title: 'Lead-in Text',
      type: 'string',
      group: 'platform',
    }),
    defineField({
      name: 'platformSectionTitle',
      title: 'Title',
      type: 'string',
      group: 'platform',
    }),
    defineField({
      name: 'platformSectionSubtitle',
      title: 'Subtitle',
      type: 'text',
      group: 'platform',
    }),
    defineField({
      name: 'platformSectionCta',
      title: 'CTA',
      type: 'ctaLink',
      group: 'platform',
    }),

    // Social Proof
    defineField({
      name: 'socialProofSectionTitle',
      title: 'Section Title',
      type: 'string',
      group: 'socialProof',
    }),

    // Stats (How It Works)
    defineField({
      name: 'statsSectionLeadIn',
      title: 'Lead-in Text',
      type: 'string',
      group: 'stats',
    }),
    defineField({
      name: 'statsSectionTitle',
      title: 'Section Title',
      type: 'string',
      group: 'stats',
    }),
    defineField({
      name: 'statsSectionSubtitle',
      title: 'Section Subtitle',
      type: 'text',
      group: 'stats',
    }),
    defineField({
      name: 'statsSectionCta',
      title: 'CTA',
      type: 'ctaLink',
      group: 'stats',
    }),

    // Features
    defineField({
      name: 'featuresSectionLeadIn',
      title: 'Lead-in Text',
      type: 'string',
      group: 'features',
    }),
    defineField({
      name: 'featuresSectionTitle',
      title: 'Section Title',
      type: 'string',
      group: 'features',
    }),
    defineField({
      name: 'featuresSectionCta',
      title: 'CTA',
      type: 'ctaLink',
      group: 'features',
    }),

    // Industries
    defineField({
      name: 'industriesSectionLeadIn',
      title: 'Lead-in Text',
      type: 'string',
      group: 'industries',
    }),
    defineField({
      name: 'industriesSectionTitle',
      title: 'Title',
      type: 'string',
      group: 'industries',
    }),
    defineField({
      name: 'industriesSectionSubtitle',
      title: 'Subtitle',
      type: 'text',
      group: 'industries',
    }),
    defineField({
      name: 'industriesSectionCta',
      title: 'CTA',
      type: 'ctaLink',
      group: 'industries',
    }),

    // Compliance
    defineField({
      name: 'complianceSectionLeadIn',
      title: 'Lead-in Text',
      type: 'string',
      group: 'compliance',
    }),
    defineField({
      name: 'complianceSectionTitle',
      title: 'Section Title',
      type: 'string',
      group: 'compliance',
    }),
    defineField({
      name: 'complianceSectionSubtitle',
      title: 'Section Subtitle',
      type: 'text',
      group: 'compliance',
    }),
    defineField({
      name: 'complianceStatement',
      title: 'Compliance Statement',
      type: 'text',
      group: 'compliance',
    }),

    // Footer CTA
    defineField({
      name: 'footerCtaTitle',
      title: 'Title',
      type: 'string',
      group: 'footerCta',
    }),
    defineField({
      name: 'footerCtaDescription',
      title: 'Description',
      type: 'text',
      group: 'footerCta',
    }),
    defineField({
      name: 'footerCtaCta',
      title: 'CTA',
      type: 'ctaLink',
      group: 'footerCta',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Home Page' }
    },
  },
})
