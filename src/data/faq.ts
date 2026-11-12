import type { IconName } from '../components/icons/types';
import type { LocaleCode } from '../i18n/locales';
import { getLocalizedFaqs as getLocalizedFaqsFromOverlays } from './faq/localize';

export { getLocalizedFaqsFromOverlays as getLocalizedFaqs };
import { blogPostPath, normalizeInternalPath, ROUTES } from '../utils/path';

export type FaqTopic =
  | 'all'
  | 'plans'
  | 'esp'
  | 'scripts'
  | 'safety'
  | 'products'
  | 'blog'
  | 'setup';

export interface SiteFaqItem {
  id: string;
  topic: FaqTopic;
  icon: IconName;
  q: string;
  a: string;
  aHtml?: string;
  scopes?: string[];
}

function a(text: string): string {
  return text;
}

function link(text: string, href: string): string {
  return `<a href="${normalizeInternalPath(href)}">${text}</a>`;
}

const productPage = link('product page', ROUTES.products);
const articlesHub = link('articles hub', ROUTES.blog);
const antiCheatArticle = link(
  'Warzone ESP, wallhack and Ricochet article',
  blogPostPath('ricochet-safety'),
);
const settingsArticle = link('settings terminology', blogPostPath('cheat-settings'));
const featuresOverview = link('features overview', blogPostPath('cheats-features'));
const espAimbotArticle = link('Warzone ESP and wallhack terminology', blogPostPath('esp-aimbot'));
const antiCheatContext = link('anti-cheat context', blogPostPath('ricochet-safety'));
const settingsCoverage = link('Warzone settings', blogPostPath('cheat-settings'));
const hacksCoverage = link('hacks & ESP coverage', blogPostPath('warzone-esp'));
const supportPage = link('Support page', ROUTES.support);
const elitePage = link('WARZONE Cheats listing', `${ROUTES.products}aimbot-esp/`);
const utilitiesPage = link('WARZONE Cheats products hub', `${ROUTES.products}`);

import { faqData } from './faqData';
export { faqData };
export const siteFaqs: SiteFaqItem[] = faqData;

export function getLandingFaqs(): SiteFaqItem[] {
  return faqData;
}

export function getAllFaqs(): SiteFaqItem[] {
  return faqData;
}

/** Embedded FAQ sections show this many items before “See more”. */
export const FAQ_LANDING_VISIBLE_COUNT = 5;

/** Shared FAQ block copy + filters (home, /warzone-faq/, products, blog). */
export const SITE_FAQ_SECTION_COPY = {
  eyebrow: 'FAQ',
  title: 'Call of Duty Warzone FAQ',
  subtitle: 'What this independent publication covers, how we source facts, and how fair-play topics are handled.',
} as const;

export const SITE_FAQ_FILTER_TOPICS: FaqTopic[] = [
  'all',
  'scripts',
  'safety',
  'products',
  'setup',
];

/** Section copy when FAQ list is scoped to the current page (not /warzone-faq/). */
export const CONTEXTUAL_FAQ_SECTION_COPY = {
  eyebrow: 'FAQ',
  title: 'WarzoneCheats FAQ',
  subtitle: 'What this site covers, how buying works, and how risk and fair play are handled.',
} as const;

export function faqFilterTopicsForItems(items: SiteFaqItem[]): FaqTopic[] {
  const present = new Set(items.map((item) => item.topic));
  const topics: FaqTopic[] = ['all'];
  for (const topic of SITE_FAQ_FILTER_TOPICS) {
    if (topic !== 'all' && topic !== 'blog' && present.has(topic)) topics.push(topic);
  }
  return topics;
}

const productFaqBanks: Record<string, SiteFaqItem[]> = {
  elite: [
    {
      id: 'elite-what',
      topic: 'products',
      icon: 'faqAfterBuy',
      q: 'What is included in Elite Warzone Cheats?',
      a: a(
        'Elite Warzone Cheats focuses on player ESP, aimbot, loot and vehicle ESP, and config save/load for Call of Duty Warzone on Windows PC. Confirm the live listing and status banner before you pay.',
      ),
    },
    {
      id: 'elite-dma',
      topic: 'setup',
      icon: 'faqPlatforms',
      q: 'Does Elite require Cloud DMA?',
      a: a(
        'The Elite Warzone Cheats notes call out Cloud DMA for full functionality alongside Windows 10/11, Intel or AMD, and security features such as HVCI and Secure Boot. If DMA is unavailable on your rig, read the requirements block before checkout.',
      ),
    },
    {
      id: 'elite-status',
      topic: 'safety',
      icon: 'faqStatus',
      q: 'How should I read Elite status after a patch?',
      a: a(
        'Treat the Elite product banner as source of truth after Ricochet or Warzone updates. If the note says updating or offline, wait—do not force ranked while the Elite build is marked unavailable.',
      ),
    },
  ],
  ugc: [
    {
      id: 'ugc-what',
      topic: 'products',
      icon: 'faqAfterBuy',
      q: 'What does UGC Account Recovery actually do?',
      a: a(
        'UGC Account Recovery structures appeal workflows for Battle.net or Steam restrictions and Ricochet holds. It organizes evidence and timelines; it does not promise a forced unban or bypass platform review.',
      ),
    },
    {
      id: 'ugc-vs-cheats',
      topic: 'setup',
      icon: 'faqProductsPage',
      q: 'Is UGC the same as Elite combat modules?',
      a: a(
        'No. UGC Account Recovery is a utility path about appeals and documentation. Combat ESP and aimbot live on the Elite listing—use UGC when your goal is recovery paperwork, not overlays.',
      ),
    },
    {
      id: 'ugc-evidence',
      topic: 'safety',
      icon: 'faqDiscordHelp',
      q: 'What should I prepare before opening a UGC case?',
      a: a(
        'Have the order email, platform account details, and restriction screenshots ready. Clear evidence speeds UGC Account Recovery workflows and keeps Discord hand-offs shorter.',
      ),
    },
  ],
  'unlock-all': [
    {
      id: 'skin-what',
      topic: 'products',
      icon: 'faqAfterBuy',
      q: 'What is the Skin Changer Utility for?',
      a: a(
        'The Skin Changer Utility (Unlock All) previews weapon camos and operator skins locally on your client. Other players still see your real Battle.net or Steam inventory—not the preview cosmetics.',
      ),
    },
    {
      id: 'skin-store',
      topic: 'setup',
      icon: 'faqProductsPage',
      q: 'Does Skin Changer modify the Battle.net or Steam store?',
      a: a(
        'No. Skin Changer Utility previews stay client-side. It does not rewrite store purchases or gift cosmetics to other accounts.',
      ),
    },
    {
      id: 'skin-elite',
      topic: 'products',
      icon: 'faqWhichTierScripts',
      q: 'Can I get Skin Changer with Elite?',
      a: a(
        'Cosmetic preview is often bundled with Elite access and is also listed as a standalone Skin Changer Utility when you only need local previews without combat modules.',
      ),
    },
  ],
};

const defaultProductFaqs: SiteFaqItem[] = [
  {
    id: 'product-generic-checkout',
    topic: 'products',
    icon: 'faqAfterBuy',
    q: 'How do I buy this product?',
    a: a(
      'Use Buy now on this page to open secure checkout. Keep your order email for loader access and support tickets.',
    ),
  },
  {
    id: 'product-generic-os',
    topic: 'setup',
    icon: 'faqPlatforms',
    q: 'Which platform does this product page support?',
    a: a(
      'Unless stated otherwise, product pages on cheats-warzone.com target Windows PC Call of Duty Warzone through Battle.net or Steam—not console clients.',
    ),
  },
];

const slugToFaqBank: Record<string, string> = {
  'aimbot-esp': 'elite',
};

export function getProductFaqs(slug: string, _kind: 'tier' | 'utility'): SiteFaqItem[] {
  const bankKey = slugToFaqBank[slug] ?? slug;
  return productFaqBanks[bankKey] ?? defaultProductFaqs;
}

/** Per-article FAQ so blog pages do not reprint the global /warzone-faq/ answers. */
export function getBlogFaqs(tag: string, slug: string): SiteFaqItem[] {
  const readable = slug.replace(/-/g, ' ');
  return [
    {
      id: `blog-${slug}-scope`,
      topic: 'blog',
      icon: 'faqBlogVsCheats',
      q: `Does this “${readable}” guide cover Call of Duty Warzone cheats on PC?`,
      a: a(
        `Yes — this ${tag} article explains ESP, wallhack, aimbot, and related wording for Call of Duty Warzone on Windows PC. It is not a substitute for live product notes—use it to understand search terms before you open ${ROUTES.products}.`,
      ),
    },
    {
      id: `blog-${slug}-buy`,
      topic: 'products',
      icon: 'faqProductsPage',
      q: `Is “${readable}” enough to buy undetected Warzone cheats?`,
      a: a(
        `No. “Undetected” language in blogs goes stale after Ricochet or Warzone patches. Re-check modules, price, and status on the product page the day you pay. Guides like “${readable}” stay educational.`,
      ),
    },
    {
      id: `blog-${slug}-next`,
      topic: 'setup',
      icon: 'faqStatus',
      q: `What should I read next after “${readable}”?`,
      a: `Compare nearby ESP, wallhack, and aimbot posts in the ${articlesHub}, then skim the ${elitePage} or ${utilitiesPage} if you are choosing between combat modules and utilities. Return here if you need the vocabulary from “${readable}” again.`,
    },
  ];
}

export const compareRows = [
  { feature: 'Player ESP and boxes', icon: 'comparePlayerEsp' as const, lite: true, pro: true, elite: true },
  { feature: 'Loot and vehicle ESP', icon: 'compareWardLocator' as const, lite: true, pro: true, elite: true },
  { feature: 'Loot & vehicle ESP', icon: 'compareRuneTimer' as const, lite: true, pro: true, elite: true },
  { feature: 'Radar', icon: 'compareZoomHack' as const, lite: true, pro: true, elite: true },
  { feature: 'Streamproof overlay', icon: 'compareStreamproof' as const, lite: true, pro: true, elite: true },
  { feature: 'Player ESP overlay', icon: 'compareMinimapHack' as const, lite: true, pro: true, elite: true },
  { feature: 'Recoil control scripts', icon: 'compareAutoCombo' as const, lite: false, pro: true, elite: true },
  { feature: 'Trigger assist & Aim assist', icon: 'compareOrbwalker' as const, lite: false, pro: true, elite: true },
  { feature: 'Target Selector', icon: 'compareTargetSelector' as const, lite: false, pro: true, elite: true },
  { feature: 'Activator (flash/smoke/utility)', icon: 'compareActivator' as const, lite: false, pro: true, elite: true },
  { feature: 'Tactical radius drawing', icon: 'compareAbilityRadius' as const, lite: false, pro: true, elite: true },
  { feature: 'Gas alert integration', icon: 'compareSmokeAlert' as const, lite: false, pro: true, elite: true },
  { feature: 'Triggerbot', icon: 'compareAutoFarm' as const, lite: false, pro: false, elite: true },
  { feature: 'Low-HP trigger', icon: 'compareAutoKillSteal' as const, lite: false, pro: false, elite: true },
  { feature: 'Loot assist', icon: 'compareAutoDagon' as const, lite: false, pro: false, elite: true },
  { feature: 'Full player ESP suite', icon: 'compareFullMapHack' as const, lite: false, pro: false, elite: true },
  { feature: 'Skin Changer (Unlock All)', icon: 'compareSkinChanger' as const, lite: false, pro: false, elite: true },
  { feature: 'Priority patch queue', icon: 'comparePriorityPatch' as const, lite: false, pro: false, elite: true },
  { feature: 'Direct dev Discord support', icon: 'compareDevSupport' as const, lite: false, pro: false, elite: true },
  { feature: 'Cloud config backup', icon: 'compareCloudBackup' as const, lite: true, pro: true, elite: true },
];
