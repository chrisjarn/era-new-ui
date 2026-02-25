import { defineField, defineType } from 'sanity'

export const videoAsset = defineType({
  name: 'videoAsset',
  title: 'Video Asset',
  type: 'object',
  fields: [
    defineField({
      name: 'mp4',
      title: 'MP4 URL',
      type: 'url',
    }),
    defineField({
      name: 'webm',
      title: 'WebM URL',
      type: 'url',
    }),
    defineField({
      name: 'poster',
      title: 'Poster Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
