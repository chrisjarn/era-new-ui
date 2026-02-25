import type { StructureResolver } from 'sanity/structure'

const singletonTypes = new Set(['siteConfig', 'homePage'])

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Configuration')
        .id('siteConfig')
        .child(S.document().schemaType('siteConfig').documentId('siteConfig')),
      S.listItem()
        .title('Home Page')
        .id('homePage')
        .child(S.document().schemaType('homePage').documentId('homePage')),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !singletonTypes.has(listItem.getId() as string)
      ),
    ])

export { singletonTypes }
