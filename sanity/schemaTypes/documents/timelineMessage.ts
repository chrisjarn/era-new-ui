import { defineField, defineType } from 'sanity'

export const timelineMessage = defineType({
  name: 'timelineMessage',
  title: 'Timeline Message',
  type: 'document',
  fields: [
    defineField({
      name: 'messageId',
      title: 'Message ID',
      type: 'slug',
      options: { source: 'message' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
      options: {
        list: [
          { title: 'Reality', value: 'reality' },
          { title: 'Solution', value: 'solution' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'videoDescription',
      title: 'Video Description',
      type: 'string',
      description: 'Alt text / accessibility description for the video',
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'videoAsset',
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
    select: { title: 'message', tag: 'tag', order: 'order' },
    prepare({ title, tag, order }) {
      return {
        title: title?.substring(0, 60) + (title?.length > 60 ? '...' : ''),
        subtitle: `${tag} · #${order ?? '—'}`,
      }
    },
  },
})
