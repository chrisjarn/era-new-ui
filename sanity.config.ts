'use client'

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schemaTypes'
import { singletonTypes, structure } from './sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  document: {
    // Prevent singletons from appearing in "new document" menu
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter(
          (templateItem) => !singletonTypes.has(templateItem.templateId)
        )
      }
      return prev
    },
    // Restrict actions on singleton documents
    actions: (prev, context) => {
      if (singletonTypes.has(context.schemaType)) {
        return prev.filter(
          ({ action }) =>
            action && ['publish', 'discardChanges', 'restore'].includes(action)
        )
      }
      return prev
    },
  },
})
