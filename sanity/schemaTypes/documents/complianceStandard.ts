import { defineField, defineType } from 'sanity'

export const complianceStandard = defineType({
  name: 'complianceStandard',
  title: 'Compliance Standard',
  type: 'document',
  fields: [
    defineField({
      name: 'standardName',
      title: 'Standard Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'cta',
      title: 'CTA Button',
      type: 'ctaLink',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Sort Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'standardName', order: 'order' },
    prepare({ title, order }) {
      return { title, subtitle: `#${order ?? '—'}` }
    },
  },
})
