/**
 * Central titles/descriptions for high-traffic routes.
 * After Search Console shows impressions, edit the matching path here and redeploy.
 * Do not change `/` title/description for homepage UI work — meta only when needed.
 */

import { auditPages } from './auditMarkup';

export interface PageSeoEntry {
  title: string;
  description: string;
}

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  '/': {
    // Meta only — does not change homepage UI headings.
    title: 'Warzone Cheats | Undetected COD ESP & Aimbot',
    description:
      'Undetected Warzone cheats companion for Call of Duty PC: premium ESP, aimbot with Humanizer, wallhack, and radar on cheats-warzone.com.',
  },
  '/products/warzone-cheats/': {
    title: 'Warzone Cheats – Undetected Aimbot, ESP & Utilities',
    description:
      'Warzone cheats for Call of Duty PC: Humanizer aimbot, player ESP, bots ESP, items ESP, colors, and configs on one listing.',
  },
  '/products/warzone-cheats/aimbot-esp/': {
    title: 'Aimbot – Warzone Cheats, ESP, Wallhack & Humanizer',
    description:
      'Aimbot with Humanizer, player ESP, bots ESP, items ESP, StreamProof, and configs for Call of Duty on Windows PC. Listed on cheats-warzone.com.',
  },
  '/products/warzone-cheats/hwid-spoofer/': {
    title: 'HWID Spoofer – Warzone PC Hardware ID Reset',
    description:
      'HWID Spoofer for Call of Duty Warzone on Windows PC: serial rotation, compatibility scans, and post-spoof verification on cheats-warzone.com.',
  },
  '/products/warzone-cheats/ugc/': {
    title: 'UGC – Warzone Account Recovery & Appeal Workflows',
    description:
      'UGC appeal workflows for Battle.net, Steam, and Ricochet restrictions on Call of Duty Warzone—structured disputes, not guaranteed unbans.',
  },
  '/products/warzone-cheats/unlock-all/': {
    title: 'Skin Changer – Local Warzone Cosmetic Preview',
    description:
      'Skin Changer previews weapon camos and operator skins locally in Call of Duty Warzone—favorites and loadout export on Windows PC.',
  },
  '/products/warzone-cheats/utilities/': {
    title: 'Warzone Cheats Utilities – HWID, UGC & Skin Changer',
    description:
      'Warzone cheats utilities on PC: HWID spoofer, UGC appeal workflows, and local skin preview alongside the main ESP and aimbot listing on cheats-warzone.com.',
  },
  '/warzone-blog/': {
    title: 'Guides – Warzone Blog Aimbot, ESP & PC Setup Advice',
    description:
      'Guides for Call of Duty PC: ESP wallhack setup, aimbot FOV tuning, Ricochet anti-cheat checks, radar, and recoil scripts on cheats-warzone.com.',
  },
  '/warzone-forum/': {
    title: 'Forums – Warzone Cheats Q&A | ESP, Aimbot & Patches',
    description:
      'Forums for Windows PC setup, ESP and aimbot Q&A, patch-day Ricochet checks, wallhack vocabulary, and live product status on cheats-warzone.com.',
  },
  '/warzone-forum/what-to-ask-before-buying-warzone/': {
    title: 'Forum – What to Ask Before Buying Warzone Cheats',
    description:
      'Pre-purchase checklist for Warzone cheats on PC: modules, Windows scope, and live status — discussion on cheats-warzone.com.',
  },
  '/warzone-forum/what-to-check-after-a-warzone-patch/': {
    title: 'Forum – Warzone Patch Day Ricochet Checklist',
    description:
      'What to verify after a Warzone patch: product status, loader update, and private-match test before ranked.',
  },
  '/warzone-faq/': {
    title: 'Warzone Cheats FAQ | ESP, Aimbot & Pricing 2026',
    description:
      'Warzone cheats FAQ: PC ESP and aimbot, Ricochet anti-cheat, PS4 scope, Warzone 2 codes myths, buy COD Warzone cheats, and how to get cheats on Windows — cheats-warzone.com.',
  },
  '/warzone-reviews/': {
    title: 'Warzone Cheats Reviews – PC Buyer Ratings 2026',
    description:
      'Warzone cheats reviews from PC buyers: ESP clarity, aimbot tuning, loader delivery, and support quality after Ricochet patches on cheats-warzone.com.',
  },
  '/warzone-terms/': {
    title: 'Terms & Conditions | WarzoneCheats Call of Duty',
    description:
      'Terms for WarzoneCheats: digital license rules, checkout, no refunds for ESP and aimbot products, fair-play risk disclosure, and Windows PC use on cheats-warzone.com.',
  },
  '/warzone-privacy/': {
    title: 'Privacy Policy | WarzoneCheats – cheats-warzone.com',
    description:
      'Privacy Policy for cheats-warzone.com: analytics and cookie data collected, how Support contact info is handled, and your rights as a Warzone site visitor.',
  },
  '/warzone-about/': {
    title: 'About Warzone Cheats – Editorial & Testing Standards',
    description:
      'About Warzone Cheats: editorial standards, PC module testing, ESP and aimbot guides, Ricochet context, and support at cheats-warzone.com.',
  },
  '/warzone-support/': {
    title: 'Warzone Cheats Support | Loader & Ricochet Help',
    description:
      'Warzone Cheats support: loader setup, checkout delivery, ESP and aimbot config help, and Ricochet patch status on cheats-warzone.com.',
  },
  '/warzone-blog/get-cheats/': {
    title: 'How to Get Warzone Cheats on PC – Buyer Checklist 2026',
    description:
      'How to get Warzone cheats on PC: module vocabulary, checkout flow, HWID utility context, and why console searches differ on cheats-warzone.com.',
  },
  '/warzone-blog/esp-aimbot/': {
    title: 'Warzone ESP & Aimbot Setup – Soft Aim vs Classic 2026',
    description:
      'Warzone ESP and aimbot on PC: soft aim vs classic aimbot, Humanizer, and FOV before you open the live listing on cheats-warzone.com.',
  },
  '/warzone-blog/console-cheats/': {
    title: 'Warzone Cheats Console vs PC – PS4, PS5 & Xbox',
    description:
      'Warzone cheats on console vs PC: why PS4, PS5, and Xbox lack native ESP and how Battle.net and Steam listings differ on cheats-warzone.com.',
  },
  '/warzone-blog/esp-colors/': {
    title: 'Warzone ESP Colors & Stream-Proof Wallhack Settings',
    description:
      'Warzone ESP colors, wallhack distance, and stream-proof overlay habits for readable PC markers on cheats-warzone.com.',
  },
  '/warzone-blog/warzone-esp/': {
    title: 'Warzone ESP Ranked Setup – Wallhack Overlay Guide 2026',
    description:
      'Warzone ESP ranked setup: player boxes, loot markers, distance caps, and Ricochet habits before ranked on cheats-warzone.com.',
  },
  '/warzone-blog/ricochet-safety/': {
    title: 'Ricochet Patch Day – Warzone Cheats Status Checklist',
    description:
      'Ricochet patch-day checklist for Warzone cheats: status banners, private-match tests, and why blogs are not clearance after updates.',
  },
  '/warzone-blog/warzone-radar/': {
    title: 'Warzone Radar Hack – Trios Rotations & Map Intel 2026',
    description:
      'Warzone radar for trios ranked: rotations, holds, and how radar differs from ESP wallhack on the PC listing at cheats-warzone.com.',
  },
  '/warzone-blog/cheats-features/': {
    title: 'Cheats – Warzone Modules: ESP, Wallhack & Aimbot Guide',
    description:
      'Cheats modules for Call of Duty PC explained: ESP, wallhack overlays, aimbot, radar, and recoil helpers — vocabulary before the live product listing.',
  },
  '/warzone-blog/anticheat-faq/': {
    title: 'Anti Cheat – Ricochet FAQ for Call of Duty Warzone PC',
    description:
      'Anti cheat answers for Ricochet on Windows PC: how enforcement works, Easy Anti-Cheat myths, and how ESP and aimbot risk fits next to live status notes.',
  },
  '/warzone-blog/cheat-settings/': {
    title: 'Warzone – Warzone Cheat Menu Settings: FOV, ESP & Triggers',
    description:
      'PC menu labels on PC: aimbot FOV, ESP colors, wallhack distance, radar, and triggerbot wording mapped to the live module list.',
  },
  '/warzone-blog/recoil-aimbot/': {
    title: 'Recoil – Warzone Scripts vs Aimbot & ESP (2026 Guide)',
    description:
      'Recoil control vs aimbot on Call of Duty PC: spray helpers, triggerbot, and ESP are separate modules — read labels before ranked on cheats-warzone.com.',
  },
  '/warzone-blog/warzone-codes/': {
    title: 'Codes – Warzone 2 Cheats, Free Download & Myths (2026)',
    description:
      'Codes searches vs real PC modules: Warzone 2 cheat code myths, free download traps, and why checkout beats random loaders on cheats-warzone.com.',
  },
};

export function normalizeSeoPath(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return path;
}

export function getPageSeoEntry(pathname: string): PageSeoEntry | undefined {
  const path = normalizeSeoPath(pathname);
  const entry = PAGE_SEO[path];
  const title = auditPages[path]?.title;
  if (title && entry) return { ...entry, title };
  return entry;
}
