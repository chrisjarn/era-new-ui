import type { SchemaTypeDefinition } from 'sanity'
import { complianceStandard } from './documents/complianceStandard'
import { homePage } from './documents/homePage'
import { platformPhase } from './documents/platformPhase'
import { sector } from './documents/sector'
// Documents
import { siteConfig } from './documents/siteConfig'
import { stat } from './documents/stat'
import { testimonial } from './documents/testimonial'
import { timelineMessage } from './documents/timelineMessage'
import { ctaLink } from './objects/ctaLink'
import { navLink } from './objects/navLink'
// Objects
import { videoAsset } from './objects/videoAsset'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Objects
    videoAsset,
    ctaLink,
    navLink,
    // Documents
    siteConfig,
    homePage,
    platformPhase,
    sector,
    complianceStandard,
    testimonial,
    stat,
    timelineMessage,
  ],
}
