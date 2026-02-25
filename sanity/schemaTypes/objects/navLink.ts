import { defineField, defineType } from 'sanity'

export const navLink = defineType({
  name: 'navLink',
  title: 'Navigation Link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
    }),
    defineField({
      name: 'href',
      title: 'URL',
      type: 'string',
    }),
    defineField({
      name: 'external',
      title: 'Open in New Tab',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
