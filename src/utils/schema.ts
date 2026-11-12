import type { FaqItem } from '../i18n/types';
import { SUPPORT_EMAIL } from '../config/site';
import { SITE_ORIGIN, absoluteAssetUrl, canonicalUrl, getOrganizationSameAs } from '../config/seo';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'WarzoneCheats',
    url: `${SITE_ORIGIN}/`,
    inLanguage: 'en-US',
    description:
      'Call of Duty Warzone cheats with scripts, player ESP, radar, Skin Changer and ranked-safe tiers for PC.',
    sameAs: getOrganizationSameAs(),
  };
}

export function organizationSchema() {
  const sameAs = getOrganizationSameAs();

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'WarzoneCheats',
    url: `${SITE_ORIGIN}/`,
    logo: `${SITE_ORIGIN}/favicon.webp`,
    email: SUPPORT_EMAIL,
    sameAs,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: SUPPORT_EMAIL,
        url: canonicalUrl('/warzone-support/'),
        availableLanguage: ['English'],
        areaServed: 'Worldwide',
      },
    ],
  };
}

export function collectionPageSchema(input: { name: string; description: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: input.name,
    description: input.description,
    url: canonicalUrl(input.url),
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      name: 'WarzoneCheats',
      url: `${SITE_ORIGIN}/`,
    },
  };
}

export function webPageSchema(input: { name: string; description: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: input.name,
    description: input.description,
    url: canonicalUrl(input.url),
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      name: 'WarzoneCheats',
      url: `${SITE_ORIGIN}/`,
    },
  };
}

export function faqPageSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

export function itemListSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: canonicalUrl(item.url),
    })),
  };
}

export function discussionForumPostingSchema(input: {
  name: string;
  text: string;
  url: string;
  author: string;
  comments: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DiscussionForumPosting',
    headline: input.name,
    articleBody: input.text,
    url: canonicalUrl(input.url),
    author: { '@type': 'Person', name: input.author },
    commentCount: input.comments,
    isPartOf: { '@type': 'CollectionPage', name: 'WarzoneCheats Community Forum', url: canonicalUrl('/warzone-forum/') },
  };
}

function offerUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return canonicalUrl(path);
}

/** Digital delivery — zero shipping for Merchant listings. */
function digitalShippingDetails() {
  return {
    '@type': 'OfferShippingDetails',
    shippingRate: {
      '@type': 'MonetaryAmount',
      value: '0',
      currency: 'USD',
    },
    shippingDestination: {
      '@type': 'DefinedRegion',
      addressCountry: 'US',
    },
    deliveryTime: {
      '@type': 'ShippingDeliveryTime',
      handlingTime: {
        '@type': 'QuantitativeValue',
        minValue: 0,
        maxValue: 0,
        unitCode: 'DAY',
      },
      transitTime: {
        '@type': 'QuantitativeValue',
        minValue: 0,
        maxValue: 0,
        unitCode: 'DAY',
      },
    },
  };
}

/** Matches Terms: sales final after checkout (digital licenses). */
function merchantReturnPolicy() {
  return {
    '@type': 'MerchantReturnPolicy',
    applicableCountry: 'US',
    returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
    url: canonicalUrl('/warzone-terms/'),
  };
}

function formatOfferPrice(usd: number): string {
  return usd.toFixed(2);
}

function priceValidUntilIso(daysAhead = 365): string {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + daysAhead);
  return date.toISOString().slice(0, 10);
}

export function productSchema(input: {
  name: string;
  description: string;
  url: string;
  offerUrl: string;
  /** When set, emits Offer price (omit on product pages without public pricing). */
  price?: number;
  image?: string;
  sku?: string;
}) {
  const offerBase = {
    '@type': 'Offer' as const,
    url: offerUrl(input.offerUrl),
    availability: 'https://schema.org/InStock',
    itemCondition: 'https://schema.org/NewCondition',
    seller: {
      '@type': 'Organization',
      name: 'WarzoneCheats',
    },
    shippingDetails: digitalShippingDetails(),
    hasMerchantReturnPolicy: merchantReturnPolicy(),
  };

  const offers =
    input.price !== undefined
      ? {
          ...offerBase,
          price: formatOfferPrice(input.price),
          priceCurrency: 'USD',
          priceValidUntil: priceValidUntilIso(),
        }
      : offerBase;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: input.name,
    description: input.description,
    sku: input.sku ?? input.url.replace(/\//g, '-'),
    brand: {
      '@type': 'Brand',
      name: 'WarzoneCheats',
    },
    ...(input.image ? { image: absoluteAssetUrl(input.image) } : {}),
    offers,
  };
}

/** @deprecated Prefer productSchema for product/cheat detail pages. */
export function softwareApplicationSchema(input: {
  name: string;
  description: string;
  url: string;
  image?: string;
  offerUrl?: string;
  price?: number;
}) {
  return productSchema({
    name: input.name,
    description: input.description,
    url: input.url,
    offerUrl: input.offerUrl ?? input.url,
    image: input.image,
    price: input.price ?? 35,
  });
}

export function articleSchema(input: {
  name: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: input.name,
    description: input.description,
    url: canonicalUrl(input.url),
    image: absoluteAssetUrl(input.image),
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    inLanguage: 'en-US',
    author: {
      '@type': 'Organization',
      name: 'WarzoneCheats',
    },
    publisher: {
      '@type': 'Organization',
      name: 'WarzoneCheats',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_ORIGIN}/favicon.webp`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl(input.url),
    },
  };
}

export function parseBlogDate(date: string): string {
  const parsed = Date.parse(date);
  if (Number.isNaN(parsed)) return new Date().toISOString().slice(0, 10);
  return new Date(parsed).toISOString().slice(0, 10);
}

/**
 * VideoObject schema for the hero gameplay video on the homepage.
 * Fixes Google Search Console "Video isn't on a watch page" by providing
 * all required fields directly in JSON-LD rather than relying on page embedding.
 */
export function videoObjectSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: 'Call of Duty Warzone ESP & Aimbot — Warzone Cheats Gameplay Preview',
    description:
      'Watch Warzone cheats in action: player ESP overlays, aimbot smoothing, radar, and wallhack-style highlights running live in Call of Duty Warzone on PC.',
    thumbnailUrl: `${SITE_ORIGIN}/images/posters/hero-poster-sm.webp`,
    uploadDate: '2026-10-20T00:00:00+00:00',
    contentUrl: `${SITE_ORIGIN}/videos/hero.mp4`,
    embedUrl: `${SITE_ORIGIN}/videos/hero.mp4`,
    duration: 'PT10S',
    inLanguage: 'en-US',
    publisher: {
      '@type': 'Organization',
      name: 'WarzoneCheats',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_ORIGIN}/favicon.webp`,
      },
    },
    isFamilyFriendly: true,
    requiresSubscription: false,
  };
}

/**
 * Homepage-level Product schema for the core Warzone ESP + Aimbot product listing.
 * Fixes GSC errors: missing price, priceSpecification, and hasMerchantReturnPolicy.
 * No aggregateRating — no rating UI exists on the page.
 */
export function homepageProductSchema() {
  const priceValidUntil = priceValidUntilIso();

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Call of Duty Warzone Cheats — ESP & Aimbot',
    description:
      'Call of Duty Warzone cheats for Windows PC: aimbot with Humanizer, player ESP, bots ESP, items ESP, colors, key binds, and configs. Monthly and lifetime plans.',
    sku: 'warzonecheats-elite',
    brand: {
      '@type': 'Brand',
      name: 'WarzoneCheats',
    },
    image: `${SITE_ORIGIN}/images/producthome-1280.webp`,
    url: `${SITE_ORIGIN}/products/warzone-cheats/`,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: '35.00',
      highPrice: '150.00',
      offerCount: '2',
      priceValidUntil,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      url: `${SITE_ORIGIN}/products/warzone-cheats/`,
      seller: {
        '@type': 'Organization',
        name: 'WarzoneCheats',
        url: `${SITE_ORIGIN}/`,
      },
      priceSpecification: [
        {
          '@type': 'UnitPriceSpecification',
          price: '35.00',
          priceCurrency: 'USD',
          name: 'Monthly Plan — 31 days',
          unitText: '31 days',
          priceValidUntil,
          eligibleQuantity: {
            '@type': 'QuantitativeValue',
            value: 31,
            unitText: 'DAY',
          },
        },
        {
          '@type': 'UnitPriceSpecification',
          price: '150.00',
          priceCurrency: 'USD',
          name: 'Lifetime Plan',
          unitText: 'LIFETIME',
          priceValidUntil,
          eligibleQuantity: {
            '@type': 'QuantitativeValue',
            value: 1,
            unitText: 'LIFETIME',
          },
        },
      ],
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'USD',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'US',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 0,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 0,
            unitCode: 'DAY',
          },
        },
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'US',
        returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
        url: `${SITE_ORIGIN}/warzone-terms/`,
      },
    },
  };
}
