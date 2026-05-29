import { contact, faqs, services } from './siteData'

export const siteName = 'AZOE Adult Family Home'
export const defaultSiteUrl = 'https://azoeafh.com'
export const siteTitle =
  'AZOE Adult Family Home | Personalized Senior Care in Lacey, WA'
export const siteDescription =
  'AZOE Adult Family Home provides personalized senior care, meal preparation, 24/7 care, medication support, dementia support, and respite care in a calm residential setting in Lacey, Washington.'
export const previewTitle =
  'Personalized senior care in a warm Lacey, Washington home'
export const previewDescription =
  'Explore AZOE Adult Family Home for personal care, meal preparation, 24/7 care, medication support, dementia support, transportation help, and respite care in a smaller residential setting.'
export const socialImagePath = '/og-image.png'
export const squareLogoPath = '/logo-square-512.png'

export function normalizeSiteUrl(siteUrl = defaultSiteUrl) {
  return siteUrl.replace(/\/+$/, '')
}

export function absoluteUrl(siteUrl, path = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return new URL(normalizedPath, `${normalizeSiteUrl(siteUrl)}/`).toString()
}

export function buildStructuredData(siteUrl = defaultSiteUrl) {
  const normalizedSiteUrl = normalizeSiteUrl(siteUrl)

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteName,
      url: normalizedSiteUrl,
      description: siteDescription,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: siteTitle,
      url: normalizedSiteUrl,
      description: siteDescription,
      isPartOf: {
        '@type': 'WebSite',
        name: siteName,
        url: normalizedSiteUrl,
      },
      about: {
        '@type': 'LocalBusiness',
        name: siteName,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${normalizedSiteUrl}/#organization`,
      name: siteName,
      description: siteDescription,
      url: normalizedSiteUrl,
      telephone: contact.primaryPhone,
      email: contact.email,
      image: absoluteUrl(normalizedSiteUrl, socialImagePath),
      logo: absoluteUrl(normalizedSiteUrl, squareLogoPath),
      address: {
        '@type': 'PostalAddress',
        streetAddress: contact.addressLine1,
        addressLocality: 'Lacey',
        addressRegion: 'WA',
        postalCode: '98513',
        addressCountry: 'US',
      },
      areaServed: {
        '@type': 'City',
        name: 'Lacey',
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: contact.primaryPhone,
          email: contact.email,
          contactType: 'customer service',
        },
      ],
      knowsLanguage: ['English', 'Swahili'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Care services',
        itemListElement: services.map((service) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service.title,
            description: service.description,
          },
        })),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ]
}
