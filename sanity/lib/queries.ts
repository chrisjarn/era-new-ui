import { defineQuery } from 'next-sanity'

export const SITE_CONFIG_QUERY = defineQuery(
  `*[_type == "siteConfig"][0]{
    siteName,
    siteDescription,
    siteUrl,
    contactEmail,
    tagline,
    keywords,
    ogImage,
    footerLinks[]{
      label,
      href,
      external
    },
    socialLinks[]{
      platform,
      url
    },
    copyrightHolder
  }`
)

export const HOME_PAGE_QUERY = defineQuery(`*[_type == "homePage"][0]`)

export const PLATFORM_PHASES_QUERY = defineQuery(
  `*[_type == "platformPhase"] | order(order asc){
    _id,
    title,
    description,
    video{
      mp4,
      webm,
      poster
    },
    order
  }`
)

export const SECTORS_QUERY = defineQuery(
  `*[_type == "sector"] | order(order asc){
    _id,
    title,
    description,
    icon,
    order
  }`
)

export const COMPLIANCE_STANDARDS_QUERY = defineQuery(
  `*[_type == "complianceStandard"] | order(order asc){
    _id,
    standardName,
    description,
    cta{
      text,
      href
    },
    features,
    order
  }`
)

export const TESTIMONIALS_QUERY = defineQuery(
  `*[_type == "testimonial"] | order(order asc){
    _id,
    quote,
    author,
    position,
    companyLogo,
    order
  }`
)

export const STATS_QUERY = defineQuery(
  `*[_type == "stat"] | order(order asc){
    _id,
    value,
    label,
    order
  }`
)

export const TIMELINE_MESSAGES_QUERY = defineQuery(
  `*[_type == "timelineMessage"] | order(order asc){
    _id,
    messageId,
    tag,
    message,
    videoDescription,
    video{
      mp4,
      webm,
      poster
    },
    order
  }`
)

export const HOME_PAGE_FULL_QUERY = defineQuery(
  `{
    "siteConfig": *[_type == "siteConfig"][0]{
      siteName,
      siteDescription,
      siteUrl,
      contactEmail,
      tagline,
      footerLinks[]{
        label,
        href,
        external
      },
      copyrightHolder
    },
    "homePage": *[_type == "homePage"][0],
    "phases": *[_type == "platformPhase"] | order(order asc){
      _id,
      title,
      description,
      video{
        mp4,
        webm,
        poster
      },
      order
    },
    "sectors": *[_type == "sector"] | order(order asc){
      _id,
      title,
      description,
      icon,
      order
    },
    "complianceStandards": *[_type == "complianceStandard"] | order(order asc){
      _id,
      standardName,
      description,
      cta{
        text,
        href
      },
      features,
      order
    },
    "testimonials": *[_type == "testimonial"] | order(order asc){
      _id,
      quote,
      author,
      position,
      companyLogo,
      order
    },
    "stats": *[_type == "stat"] | order(order asc){
      _id,
      value,
      label,
      order
    },
    "timelineMessages": *[_type == "timelineMessage"] | order(order asc){
      _id,
      messageId,
      tag,
      message,
      videoDescription,
      video{
        mp4,
        webm,
        poster
      },
      order
    }
  }`
)
