import { en } from '../i18n/en';
import type { LocaleCode } from '../i18n/locales';

const t = en;

function localizeProductPage(page: ProductPage, _locale: LocaleCode = 'en'): ProductPage {
  return page;
}
import { checkoutForSlug, WARZONE_BUY_URL } from '../config/checkout';
import type { IconName } from '../components/icons/types';

export interface ProductSlide {
  src: string;
  alt: string;
  caption: string;
  captionDesc: string;
}

export interface ProductOverview {
  title: string;
  paragraphs: string[];
}

export interface AcquisitionStep {
  num: string;
  title: string;
  desc: string;
}

export interface ProductAcquisition {
  title: string;
  steps: AcquisitionStep[];
}

export interface SystemRequirement {
  icon: IconName;
  text: string;
}

export interface ProductPage {
  slug: string;
  kind: 'tier' | 'utility';
  badge: string;
  category?: string;
  tier?: string;
  name: string;
  title: string;
  subtitle: string;
  desc: string;
  features: string[];
  more: number;
  variant?: 'essential' | 'popular' | 'limited';
  buyUrl: string;
  images: ProductSlide[];
  overview: ProductOverview;
  acquisition: ProductAcquisition;
  goodToKnow: string;
  limitations: string;
  fullFeatures: string[];
  systemRequirements: SystemRequirement[];
  about?: { type: 'h2' | 'p'; text: string }[];
  body: { type: 'h2' | 'p'; text: string }[];
  relatedBlogSlugs: string[];
}

/** Guides paired with each product detail page */
export const productRelatedBlogSlugs: Record<string, string[]> = {
  lite: ['warzone-esp', 'cheats-features', 'esp-aimbot', 'ricochet-safety'],
  pro: [
    'esp-aimbot',
    'cheat-settings',
    'cheats-features',
    'ricochet-safety',
  ],
  'aimbot-esp': [
    'cheats-features',
    'warzone-esp',
    'esp-aimbot',
    'ricochet-safety',
    'cheat-settings',
  ],
  ugc: [
    'ricochet-safety',
    'cheats-features',
    'warzone-esp',
  ],
  'unlock-all': [
    'cheats-features',
    'warzone-esp',
    'cheat-settings',
  ],
  'hwid-spoofer': ['ricochet-safety', 'cheats-features', 'esp-aimbot'],
};

const productBase = '/products/warzone-cheats/';

function acquisitionFor(slug: string, productName: string): ProductAcquisition {
  switch (slug) {
    case 'lite':
      return {
        title: `How to get ${productName}`,
        steps: [
          {
            num: '01',
            title: 'Verify overlay status',
            desc: `Prior to acquiring ${productName}, inspect the live status monitor on cheats-warzone.com and Discord #status to ensure the visual overlay is operational following recent Warzone client patches.`,
          },
          {
            num: '02',
            title: 'Review visual features',
            desc: `Examine the Lite feature breakdown to confirm ESP distance caps, radar feeds, and stream-proof settings match your tactical awareness needs.`,
          },
          {
            num: '03',
            title: 'Authorize instant delivery',
            desc: `Complete payment via our secure checkout gateway. Your unique ${productName} license key and loader access credentials dispatch immediately to your inbox.`,
          },
          {
            num: '04',
            title: 'Launch streamer-safe overlay',
            desc: `Open the dedicated Lite loader, calibrate your player ESP colors in a private match, and verify clean HUD rendering before queuing competitive matches.`,
          },
        ],
      };
    case 'pro':
      return {
        title: `How to get ${productName}`,
        steps: [
          {
            num: '01',
            title: 'Check combat script status',
            desc: `Before picking up ${productName}, verify the operational status of our recoil tables and aim assist modules following any Ricochet anti-cheat updates.`,
          },
          {
            num: '02',
            title: 'Confirm weapon profiles',
            desc: `Ensure the Pro tier features meet your requirements—including custom weapon recoil smoothing, trigger assist thresholds, and per-weapon presets.`,
          },
          {
            num: '03',
            title: 'Process your activation',
            desc: `Finalize purchase via the verified payment terminal for ${productName}. Save your order confirmation receipt to register your client portal account.`,
          },
          {
            num: '04',
            title: 'Calibrate firing presets',
            desc: `Load the verified Pro injector, test recoil patterns and FOV targets in the firing range, and dial in humanized smoothing before competitive queues.`,
          },
        ],
      };
    case 'aimbot-esp':
      return {
        title: `How to get ${productName}`,
        steps: [
          {
            num: '01',
            title: 'Confirm full suite status',
            desc: `Review the live indicator for ${productName} on cheats-warzone.com to guarantee player ESP, aimbot hitboxes, and loot and vehicle radars are active following the latest game update.`,
          },
          {
            num: '02',
            title: 'Check DMA & system specs',
            desc: `Double-check Elite system prerequisites—including Windows 10/11 build support, Secure Boot, and Cloud DMA compatibility for maximum security.`,
          },
          {
            num: '03',
            title: 'Secure Elite licensing',
            desc: `Order through the secure checkout terminal. Instant license credentials, private builds, and priority Discord role access dispatch immediately upon payment.`,
          },
          {
            num: '04',
            title: 'Configure private overlay',
            desc: `Follow the step-by-step Elite setup guide in your user dashboard, configure 3D skeleton visual styles, and verify aimbot offsets in a private lobby.`,
          },
        ],
      };
    case 'unlock-all':
      return {
        title: `How to get ${productName}`,
        steps: [
          {
            num: '01',
            title: 'Review cosmetic engine status',
            desc: `Verify that the Skin Changer utility is marked operational on the live status hub after any major season or cosmetic inventory patch.`,
          },
          {
            num: '02',
            title: 'Confirm preview terms',
            desc: `Note that ${productName} renders skins, calling cards, and animated camos locally on your PC client for content creation without altering server-side balances.`,
          },
          {
            num: '03',
            title: 'Unlock instant utility key',
            desc: `Check out via the secure portal to receive your Skin Changer standalone license code and quick-start injection instructions via email.`,
          },
          {
            num: '04',
            title: 'Equip custom loadout sets',
            desc: `Launch the skin changer companion, browse the searchable cosmetics library, and save your favorite loadout presets with one click.`,
          },
        ],
      };
    case 'hwid-spoofer':
      return {
        title: `How to get ${productName}`,
        steps: [
          {
            num: '01',
            title: 'Confirm system baseline',
            desc: `Run the compatibility scan inside ${productName} to list stored motherboard, disk, and NIC identifiers before you apply a spoof profile.`,
          },
          {
            num: '02',
            title: 'Backup and cleanup',
            desc: `Use the bundled cleanup tools to remove leftover Ricochet or launcher traces, then create a Windows restore point before spoofing.`,
          },
          {
            num: '03',
            title: 'Apply spoof profile',
            desc: `Select a serial rotation profile matched to your hardware class, run the spoofer, and restart when the panel confirms the new fingerprint.`,
          },
          {
            num: '04',
            title: 'Verify and launch',
            desc: `Complete post-spoof verification, confirm Warzone launches cleanly, and keep Discord #status open if Activision pushes a same-day patch.`,
          },
        ],
      };
    case 'ugc':
      return {
        title: `How to get ${productName}`,
        steps: [
          {
            num: '01',
            title: 'Review appeal intake status',
            desc: `Check current UGC dashboard intake status and review our latest case processing turnaround times before initiating your dispute submission.`,
          },
          {
            num: '02',
            title: 'Assemble case documentation',
            desc: `Review the UGC workflow requirements, gathering your Battle.net or Steam account ID, ban notice timestamps, and any relevant restriction notices.`,
          },
          {
            num: '03',
            title: 'Enroll in dispute workflow',
            desc: `Submit checkout through the secure recovery portal. Keep your order confirmation email handy to immediately activate your tracking ticket.`,
          },
          {
            num: '04',
            title: 'Submit structured dispute',
            desc: `Access your dedicated recovery workspace, follow the step-by-step evidence template, and coordinate with specialized case agents via Discord.`,
          },
        ],
      };
    default:
      return {
        title: `How to get ${productName}`,
        steps: [
          {
            num: '01',
            title: 'Inspect live status',
            desc: `Check the real-time operational status on cheats-warzone.com before ordering ${productName} to verify compatibility with the active game build.`,
          },
          {
            num: '02',
            title: 'Review product specifications',
            desc: `Verify the module inclusions and system requirements for ${productName} to ensure full alignment with your Windows PC hardware.`,
          },
          {
            num: '03',
            title: 'Complete encrypted checkout',
            desc: `Submit order payment through our verified billing gateway. Retain your invoice receipt and order email for direct portal provisioning.`,
          },
          {
            num: '04',
            title: 'Deploy through user dashboard',
            desc: `Access your client portal using your registered credentials and follow the product guide to initialize your setup safely.`,
          },
        ],
      };
  }
}

const eliteGoodToKnow =
  'WARZONE Cheats tracks Call of Duty and Ricochet patches closely (typically within a few hours). Confirm Undetected status on the live panel before purchase or launch. Use Humanizer and moderate settings in ranked. StreamProof hides visuals from OBS and similar capture tools.';

const liteGoodToKnow =
  'Lite awareness modules still need a green status note after every Warzone patch. Re-check player ESP and radar on the Lite panel before you queue—do not reuse an Elite or Pro checklist blindly.';

const proGoodToKnow =
  'Pro scripts plus ESP shift when Ricochet updates land. Confirm recoil and aim helpers on the Pro status note before purchase; Pro is not the same build path as Elite slot queues.';

const sharedLimitationsElite =
  'WARZONE Cheats is third-party software. Misuse can violate Activision Terms of Use and lead to Ricochet bans. You accept that risk. Availability can change after game, Ricochet, or Windows updates without notice. Cloud DMA is required for full functionality.';

const sharedLimitationsLite =
  'Lite overlays are still third-party tooling. Account action remains possible. Lite compatibility can change after Warzone or Windows updates even when Elite notes look fine.';

const sharedLimitationsPro =
  'Pro scripts and ESP can conflict with Activision Terms of Use. You use Pro at your own risk. Recoil and aim modules may go offline after patches independently from other tiers.';
const warzonePcRequirements: SystemRequirement[] = [
  { icon: 'reqWindows', text: 'Supported 64-bit edition of Windows 10 or Windows 11.' },
  { icon: 'reqSteam', text: 'Current Call of Duty Warzone client via Battle.net or Steam with latest patches applied.' },
  { icon: 'reqSettings', text: 'Administrator access for loader installation and patch updates.' },
  { icon: 'reqWifi', text: 'Stable internet connection for portal access and patch delivery.' },
  { icon: 'reqCpu', text: 'A system that meets Call of Duty Warzone published hardware requirements.' },
];

/** Requirements listed on the Call of Duty Warzone product page. */
const warzoneSystemRequirements: SystemRequirement[] = [
  { icon: 'reqWindows', text: 'Windows 10 / 11 (21H2–24H2).' },
  { icon: 'reqCpu', text: 'AMD & Intel processor.' },
  { icon: 'reqCpu', text: 'AMD & NVIDIA video card.' },
  { icon: 'reqSettings', text: '12GB RAM minimum · 16GB recommended.' },
  { icon: 'reqShieldGuide', text: 'HVCI, Core Isolation, TPM, and Secure Boot on.' },
  { icon: 'reqRestorePoint', text: '2GB free storage · stable internet.' },
  { icon: 'reqWifi', text: 'Steam, Battle.net, Microsoft Store · Warzone, MW2, MW3, BO6, BO7.' },
  { icon: 'reqSteam', text: 'Cloud DMA required for full functionality.' },
];

type GalleryKey = keyof typeof galleryRaw;

const galleryRaw = {
  gpMapHack: {
    src: '/images/playerproduct.jpg',
    alt: 'Warzone cheats player ESP showing enemy positions, loot, and vehicles',
    caption: 'Player ESP awareness',
    captionDesc: 'Enemy position tracking, loot and vehicle ESP, and circle and contract timers during an endgame push.',
  },
  gpScripts: {
    src: '/images/misc.jpeg',
    alt: 'Warzone cheats recoil profile on an aggressive loadout with presets',
    caption: 'Recoil control',
    captionDesc: 'Per-weapon recoil preset with aim assist held on an entry.',
  },
  gpZoomHack: {
    src: '/images/producthome.jpg',
    alt: 'Warzone cheats radar covering the zone and tactical minimap',
    caption: 'Minimap radar',
    captionDesc: 'Radar showing player positions for safer holds and rotates.',
  },
  gpSkinChanger: {
    src: '/images/product-skin-preview.jpeg',
    alt: 'Warzone cheats skin preview on a player loadout with Unlock All',
    caption: 'Skin Changer preview',
    captionDesc: 'Local legendary camo and weapon skin preview via Unlock All—client-side only.',
  },
  gpAutoKill: {
    src: '/images/aimbotproduct.jpeg',
    alt: 'Warzone cheats aimbot target line on an enemy player with assist',
    caption: 'Aimbot',
    captionDesc: 'Hitbox selection for head, chest, stomach, or pelvis, with a colored target line.',
  },
  gpFarmBot: {
    src: '/images/gadegtespproduct.jpeg',
    alt: 'Warzone cheats player ESP with skeleton and box options and loot tracking',
    caption: 'Player ESP',
    captionDesc: 'Skeleton, box, snapline, name, health, armor, distance, and team check, out to 300m.',
  },
  gpHeroEsp: {
    src: '/images/product-colors.jpeg',
    alt: 'Warzone cheats player ESP with name tags and distance readouts',
    caption: 'Player ESP overlay',
    captionDesc: 'Player name, team check, and distance markers.',
  },
};

function slide(...keys: GalleryKey[]): ProductSlide[] {
  return keys.map((k) => {
    const item = galleryRaw[k];
    return {
      src: item.src,
      alt: item.alt,
      caption: item.caption,
      captionDesc: item.captionDesc,
    };
  });
}

const utilityProductSlides: Record<string, ProductSlide[]> = {
  'hwid-spoofer': [
    {
      src: '/images/products/hwid-spoofer/hwid-spoofer-1.webp',
      alt: 'HWID Spoofer dashboard for Call of Duty Warzone on Windows PC',
      caption: 'Spoofer control panel',
      captionDesc: 'Run compatibility scans and apply serial profile rotation before launching Warzone.',
    },
    {
      src: '/images/products/hwid-spoofer/hwid-spoofer-2.webp',
      alt: 'HWID Spoofer verification step after hardware rotation on Warzone PC',
      caption: 'Post-spoof verification',
      captionDesc: 'Confirm a clean fingerprint before you queue Battle.net or Steam.',
    },
  ],
  ugc: [
    {
      src: '/images/products/ugc/ugc-gallery-1.webp',
      alt: 'UGC account recovery workflow for Warzone Battle.net and Steam restrictions',
      caption: 'Case workspace',
      captionDesc: 'Structured appeal templates and status tracking for Ricochet and platform holds.',
    },
  ],
  'unlock-all': [
    {
      src: '/images/products/skin-changer/skin-changer-product.webp',
      alt: 'Skin Changer local cosmetic preview in Call of Duty Warzone',
      caption: 'Skin Changer preview',
      captionDesc: 'Browse weapon camos and operator skins locally—other players see your real inventory.',
    },
  ],
};

function slugFromHref(href: string): string {
  const segment = href.replace(productBase, '').replace(/^\//, '').replace(/\/$/, '');
  return segment || 'warzone-cheats';
}

const tierAbout: Record<string, ProductPage['about']> = {
  lite: [
    {
      type: 'p',
      text: 'Warzone Lite is the awareness slice of the Call of Duty Warzone listing: player ESP, loot and vehicle ESP, and radar on Windows PC. Aimbot and recoil stay on the fuller product notes.',
    },
    { type: 'h2', text: 'Ranked-safe by design' },
    {
      type: 'p',
      text: 'Lite skips Recoil control and bot modules entirely. Your gameplay looks natural while player ESP, radar and circle and contract timers keep you informed. Stream-proof mode hides overlays from OBS capture for content creators.',
    },
  ],
  pro: [
    {
      type: 'p',
      text: 'Warzone Pro adds recoil control and aimbot options on top of player ESP. Smoothness, FOV, and hitbox selection are listed on the product page. Confirm that note before you pay.',
    },
    { type: 'h2', text: 'Scripts + awareness combined' },
    {
      type: 'p',
      text: 'Pro inherits every Lite module and adds recoil control, aimbot smoothness, and hitbox selection. Read the product page for the current modules before you pay.',
    },
  ],
  'aimbot-esp': [
    {
      type: 'p',
      text: 'WARZONE Cheats is a private PC suite: Humanizer aimbot, player ESP, bots ESP, items ESP, colors, key binds, configs, StreamProof, and multi-title Call of Duty support.',
    },
    { type: 'h2', text: 'Use Elite responsibly' },
    {
      type: 'p',
      text: 'Elite power demands disciplined profiles. Test in lobbies, start with portal conservative presets, and scale up over days—not minutes. Staff in Discord help Elite users tune before their first ranked queue.',
    },
  ],
};

const tierBodies: Record<string, ProductPage['body']> = {
  lite: [
    { type: 'h2', text: 'Included modules' },
    {
      type: 'p',
      text: 'Player ESP with distance and name tags, loot and vehicle ESP, circle and contract timers, radar, and stream-safe overlay hiding. Config presets for ranked and Resurgence ship in the portal—load before your first queue.',
    },
    { type: 'h2', text: 'Upgrade path' },
    {
      type: 'p',
      text: 'Lite license holders can upgrade to Pro or Elite through the portal without losing config backups. Compare tiers on the main product page before checkout via our secure checkout.',
    },
  ],
  pro: [
    { type: 'h2', text: 'Scripts and automation' },
    {
      type: 'p',
      text: 'Recoil control, aimbot smoothness, customizable FOV, and hitbox selection for head, chest, stomach, or pelvis. The product page lists what the current build includes.',
    },
    { type: 'h2', text: 'Recommended pairing' },
    {
      type: 'p',
      text: 'Pro is the most popular tier at cheats-warzone.com—enough firepower for high-rank lobbies without Elite slot limits. Pair with our scripts guide in the blog before your first ranked session.',
    },
  ],
  'aimbot-esp': [
    { type: 'h2', text: 'WARZONE Cheats' },
    {
      type: 'p',
      text: 'WARZONE Cheats is a private PC solution with a high-precision aimbot (including Humanizer), player ESP, bots ESP, items ESP, color controls, custom key binds, and config save/load.',
    },
    {
      type: 'p',
      text:
        'Players searching call of duty warzone cheats PC, COD Warzone cheats, buy COD Warzone cheats, or best Warzone cheats should compare this module list and the live Ricochet status banner the same day they checkout — marketing clips and “free Warzone cheats” mirrors are not substitutes for seller delivery.',
    },
    { type: 'h2', text: 'Supported titles' },
    {
      type: 'p',
      text: 'Features work across modern Call of Duty titles including Warzone, Modern Warfare 2, Modern Warfare 3, Black Ops 6, and Black Ops 7. Re-check the live listing after every game update.',
    },
  ],
};

const utilityBodies: Record<string, ProductPage['body']> = {
  'hwid-spoofer': [
    { type: 'h2', text: 'When to use HWID Spoofer' },
    {
      type: 'p',
      text: 'HWID Spoofer rotates motherboard, disk, and network identifiers on Windows PC when Ricochet or platform security flags block clean launches. Pair with conservative Warzone settings after every Activision patch.',
    },
    { type: 'h2', text: 'Verification matters' },
    {
      type: 'p',
      text: 'Always run the built-in post-spoof check before you queue Ranked or Resurgence. Spoofing does not replace fair-play judgment or account recovery for permanent bans.',
    },
  ],
  'ugc': [
    { type: 'h2', text: 'What UGC covers' },
    {
      type: 'p',
      text: 'UGC (Unban & Governance Control) is an appeal workspace for Battle.net or Steam restrictions, Ricochet bans, trade holds and security flags. Build custom workflows, automate dispute steps and track case status from one dashboard—not a guaranteed unban service.',
    },
    { type: 'h2', text: 'Realistic expectations' },
    {
      type: 'p',
      text: 'Some Ricochet bans cannot be reversed. UGC organizes evidence and follow-ups for Activision or platform review.',
    },
  ],
  'unlock-all': [
    { type: 'h2', text: 'Local preview only' },
    {
      type: 'p',
      text: 'Cosmetics display on your client for testing and content creation. Other players in your lobby see your actual inventory, not preview skins.',
    },
    { type: 'h2', text: 'Standalone Skin Unlock' },
    {
      type: 'p',
      text: 'Buy Skin Unlock here when you only need local cosmetic preview without the full Warzone cheats module list.',
    },
  ],
};

const productContent: Record<
  string,
  Pick<ProductPage, 'overview' | 'images' | 'fullFeatures' | 'goodToKnow' | 'limitations' | 'systemRequirements'>
> = {
  lite: {
    images: slide('gpHeroEsp', 'gpMapHack', 'gpZoomHack'),
    goodToKnow: liteGoodToKnow,
    limitations: sharedLimitationsLite,
    systemRequirements: warzonePcRequirements,
    fullFeatures: [
      'Player ESP and boxes',
      'Loot and vehicle ESP',
      'Map position awareness',
      'Player name and health',
      'Player ESP overlay',
      'Streamproof overlay mode',
      'Distance readouts',
      'Team check',
      'Loot & vehicle ESP',
      'Radar',
      'Resurgence preset config',
      'Ranked preset config',
      'Cloud config backup',
      'Patch auto-updater',
    ],
    overview: {
      title: 'Built around a clear Call of Duty Warzone awareness workflow',
      paragraphs: [
        'Warzone Lite focuses on player ESP, loot and vehicle ESP, and radar for Call of Duty Warzone on Windows PC. Modules are grouped so you can tune distance, colors, and stream-proof mode before your first queue.',
        'Lite is the entry path for ranked and Resurgence players who want map awareness with minimal report risk. No Recoil control, no bots—just readable overlays maintained every patch at cheats-warzone.com.',
      ],
    },
  },
  pro: {
    images: slide('gpScripts', 'gpMapHack', 'gpHeroEsp'),
    goodToKnow: proGoodToKnow,
    limitations: sharedLimitationsPro,
    systemRequirements: warzonePcRequirements,
    fullFeatures: [
      'All Lite ESP & player ESP modules',
      'Recoil control scripts',
      'Trigger assist',
      'Aim assist & Prediction',
      'Target Selector',
      'Activator (flash/smoke/utility)',
      'Damage notifications',
      'Tactical radius drawing',
      'Smoothness and FOV',
      'Per-weapon profiles',
      'Gas alert integration',
      'Ranked-safe default presets',
      'Lobby test profile',
      'Cloud config backup',
      'Patch auto-updater',
      'Discord player support',
    ],
    overview: {
      title: 'Built around a clear Call of Duty Warzone scripts workflow',
      paragraphs: [
        'Warzone Pro adds recoil control, aimbot, and triggerbot on top of every Lite module. Per-weapon notes, smoothness, and FOV live on the product page. Confirm the current build before you pay.',
        'Pro is the most popular tier: enough firepower for ranked and Resurgence without Elite slot limits. Target Selector and Activator keep you efficient mid-fight while scripts stay human at default settings.',
      ],
    },
  },
  'aimbot-esp': {
    images: [
      {
        src: '/images/aimbotproduct.jpeg',
        alt: 'Warzone cheats aimbot screenshot with Humanizer and FOV settings',
        caption: 'Aimbot',
        captionDesc:
          'Enable Aimbot, FOV and smoothness sliders, Humanizer, visibility check, custom hitbox, and draw FOV / crosshair / target.',
      },
      {
        src: '/images/playerproduct.jpg',
        alt: 'Warzone cheats player ESP screenshot with skeleton and wallhack distance',
        caption: 'Player ESP',
        captionDesc: 'Nickname, distance, box, lines, and skeleton with thickness and max-distance controls.',
      },
      {
        src: '/images/gadegtespproduct.jpeg',
        alt: 'Warzone cheats items ESP screenshot with loot filters',
        caption: 'Items ESP',
        captionDesc: 'Ammo types, cash, armor, perks, crates, boxes, missions, grenades, knives, and stim through walls.',
      },
      {
        src: '/images/product-config.jpeg',
        alt: 'Warzone cheats config and key bind options screenshot for PC',
        caption: 'Config & binds',
        captionDesc: 'Custom key binds for menu, hold, and toggles, plus save and load custom configs.',
      },
    ],
    goodToKnow: eliteGoodToKnow,
    limitations: sharedLimitationsElite,
    systemRequirements: warzoneSystemRequirements,
    fullFeatures: [
      'Enable Aimbot',
      'Field Of View Slider',
      'Smoothness Slider',
      'Max. Distance Slider',
      'Ignored Knocked Players',
      'Save Target',
      'Aim Lock',
      'Visibility Check',
      'Humanized Smoothness',
      'Humanized Smoothness Percent Slider',
      'Select Custom Hitbox',
      'Draw FOV',
      'Draw Crosshair',
      'Draw Target',
      'Draw Target Type',
      'Aimbot Draw Thickness Slider',
      'Player ESP Enable',
      'Max Distance Slider',
      'Font Size Slider',
      'Nickname',
      'Distance',
      'Box',
      'Box Thickness Slider',
      'Lines',
      'Lines Thickness Slider',
      'Custom Lines Position',
      'Skeleton',
      'Skeleton Thickness Slider',
      'Bots ESP Health',
      'Health Thickness Slider',
      'Custom Health Position',
      'Items ESP Font Scale Slider',
      'Assault Rifle Ammo',
      'Pistol Ammo',
      'SMG Ammo',
      'Shotgun Ammo',
      'Sniper Ammo',
      'Rocket Ammo',
      'Cash',
      'Armor',
      'Perks',
      'Crates',
      'Boxes',
      'Missions',
      'Grenades',
      'Knifes',
      'Stim',
      'Custom Crosshair (Aimbot) Color',
      'Custom FOV (Aimbot) Color',
      'Custom Target (Aimbot) Color',
      'Custom Distance (Players) Color',
      'Custom Nickname (Players) Color',
      'Custom Non Visible (Players) Color',
      'Custom Visible (Players) Color',
      'Custom Distance (Bots) Color',
      'Custom Nickname (Bots) Color',
      'Custom Non Visible (Bots) Color',
      'Custom Visible (Bots) Color',
      'Custom Closest (Radar) Color',
      'Custom Enemies (Radar) Color',
      'Custom Visible (Radar) Color',
      'Custom Menu Key Bind',
      'Custom Hold Primary Key Bind',
      'Custom Hold Secondary Key Bind',
      'Custom Hold Bots Key Bind',
      'Custom Switch To Head Key Bind',
      'Custom Toggle Key Bind',
      'Custom Toggle Players Key Bind',
      'Custom Toggle Radar Key Bind',
      'Custom Toggle Items Key Bind',
      'Select Your Custom Config',
      'Create New Config Name',
      'Add New Config',
      'StreamProof mode',
      'Controller / gamepad support',
    ],
    overview: {
      title: 'WARZONE Cheats — aimbot, player ESP & items ESP',
      paragraphs: [
        'Aimbot on this listing ships with Humanizer, FOV and smoothness controls, visibility check, custom hitboxes, and draw options — plus player ESP with nickname, distance, box, lines, and skeleton; bots ESP health overlays; and items ESP for ammo, cash, armor, perks, crates, and more.',
        'Also included: custom colors for aimbot, players, bots, and radar; custom key binds; and config save/load. Status Undetected (4.9/5). Windows 10/11 on Intel or AMD, with HVCI, Core Isolation, TPM, and Secure Boot on. Cloud DMA is required for full functionality. Supported clients include Steam, Battle.net, Microsoft Store, Warzone, MW2, MW3, BO6, and BO7.',
      ],
    },
  },
  'hwid-spoofer': {
    images: utilityProductSlides['hwid-spoofer'],
    goodToKnow:
      'Create a restore point before your first spoof. Re-run the compatibility scan after every major Warzone or Windows update.',
    limitations:
      'HWID Spoofer is third-party tooling. Misuse can violate Activision Terms of Use. Spoofing does not guarantee access after permanent Ricochet enforcement.',
    systemRequirements: warzonePcRequirements,
    fullFeatures: [
      'Spoofer & cleanup tools',
      'Serial profile rotation',
      'Compatibility scan',
      'Post-spoof verification',
      'Motherboard serial masking',
      'Disk volume rotation',
      'NIC MAC rotation',
      'Trace cleanup presets',
      'Ricochet cache cleanup',
      'Profile export and import',
      'One-click revert snapshot',
      'Discord status alerts',
      'Patch-day compatibility notes',
    ],
    overview: {
      title: 'HWID Spoofer for Call of Duty Warzone PC',
      paragraphs: [
        'HWID Spoofer rotates hardware identifiers and clears leftover launcher traces on Windows PC when Ricochet or platform security blocks a clean Warzone session.',
        'Use compatibility scans, serial profile rotation, and post-spoof verification before you reopen Battle.net or Steam.',
      ],
    },
  },
  ugc: {
    images: utilityProductSlides.ugc,
    goodToKnow:
      'Gather order email, platform account details and restriction screenshots before opening a ticket. UGC structures appeals—it does not bypass platform review.',
    limitations:
      'UGC does not guarantee account restoration. Results vary by case type. Permanent Ricochet bans may require a new account path instead of appeal.',
    systemRequirements: [
      { icon: 'reqMailOrder', text: 'Order email used at checkout on cheats-warzone.com or via the secure checkout confirmation.' },
      { icon: 'reqShieldAccount', text: 'Account details and ban or restriction notification if available.' },
      { icon: 'reqWifiPortal', text: 'Internet access for Discord support and case dashboard.' },
    ],
    fullFeatures: [
      'Custom appeal workflows',
      'Restriction dispute automation',
      'Case documentation templates',
      'Status tracking dashboard',
      'Identity verification guide',
      'Evidence upload structure',
      'Timeline tracker',
      'Follow-up response templates',
      'Multi-platform support',
    ],
    overview: {
      title: 'UGC Account Recovery for Call of Duty Warzone holds',
      paragraphs: [
        'UGC Account Recovery (Unban & Governance Control) helps you document Battle.net or Steam restrictions and Ricochet holds with structured appeal workflows—not instant unban guarantees.',
        'Build custom dispute paths, track case status, and rebuild access notes with restriction-management tools aimed at Call of Duty Warzone account recovery. Support walks you through each step via Discord when you need hands-on help.',
      ],
    },
  },
  'unlock-all': {
    images: utilityProductSlides['unlock-all'],
    goodToKnow:
      'Skin Changer previews cosmetics locally on your client. Other players in your lobby see your real inventory—not preview skins.',
    limitations:
      'Local preview only—does not modify Battle.net or Steam inventory or store state. Other players cannot see previewed legendary camos or sets.',
    systemRequirements: warzonePcRequirements,
    fullFeatures: [
      'Weapon camo preview',
      'Weapon camo and weapon skin preview',
      'Weapon preview',
      'Menu preview',
      'HUD preview',
      'Loadout preview',
      'Favorites list',
      'Loadout export',
    ],
    overview: {
      title: 'Skin Changer — local cosmetic preview',
      paragraphs: [
        'Skin Changer lets you browse weapon camos, operator skins, and bundles locally in Call of Duty Warzone—searchable catalog, favorites, and loadout export without modifying live Battle.net or Steam purchases.',
        'Previews stay on your client for testing and content creation. Other players see your actual inventory, not preview skins. Available standalone when you only need cosmetics without combat modules.',
      ],
    },
  },
};

function buildTierPages(): ProductPage[] {
  return t.cheats.items.map((cheat) => {
    const slug = slugFromHref(cheat.href);
    const content = productContent[slug];
      const displayName =
        cheat.name === 'Lite'
          ? 'Warzone Lite'
          : cheat.name === 'Pro'
            ? 'Warzone Pro'
            : cheat.name === 'WARZONE' || cheat.name === 'Elite'
              ? 'WARZONE Cheats'
              : cheat.name;
    return {
      slug,
      kind: 'tier',
      badge: cheat.badge,
      tier: cheat.tier,
      name: cheat.name,
      title: cheat.title,
      subtitle: cheat.desc,
      desc: cheat.desc,
      features: cheat.features,
      more: cheat.more,
      variant: cheat.variant,
      buyUrl: checkoutForSlug(slug),
      images: content.images,
      overview: content.overview,
      acquisition: acquisitionFor(slug, displayName),
      goodToKnow: content.goodToKnow,
      limitations: content.limitations,
      fullFeatures: content.fullFeatures,
      systemRequirements: content.systemRequirements,
      about: tierAbout[slug],
      body: tierBodies[slug] ?? [],
      relatedBlogSlugs: productRelatedBlogSlugs[slug] ?? [],
    };
  });
}

function buildUtilityPages(): ProductPage[] {
  return t.products.items
    .filter((p) => p.href !== productBase)
    .map((product) => {
      const slug = slugFromHref(product.href);
      const content = productContent[slug];
      return {
        slug,
        kind: 'utility',
        badge: product.badge,
        category: product.category,
        name: product.title,
        title: product.title,
        subtitle: product.subtitle,
        desc: product.desc,
        features: product.features,
        more: product.more,
        buyUrl: checkoutForSlug(slug),
        images: content.images,
        overview: content.overview,
        acquisition: acquisitionFor(slug, product.title),
        goodToKnow: content.goodToKnow,
        limitations: content.limitations,
        fullFeatures: content.fullFeatures,
        systemRequirements: content.systemRequirements,
        body: utilityBodies[slug] ?? [],
        relatedBlogSlugs: productRelatedBlogSlugs[slug] ?? [],
      };
    });
}

export const productPages: ProductPage[] = [...buildTierPages(), ...buildUtilityPages()];

export const cheatPages = productPages.filter((p) => p.kind === 'tier');

export function getProductPage(slug: string, locale: LocaleCode = 'en') {
  const page = productPages.find((p) => p.slug === slug);
  return page ? localizeProductPage(page, locale) : undefined;
}

export function getCheatPage(slug: string) {
  return cheatPages.find((p) => p.slug === slug);
}

export function getAllProductSlugs() {
  return productPages.map((p) => p.slug);
}

export function getAllCheatSlugs() {
  return cheatPages.map((p) => p.slug);
}

const cheatsHubSlides = slide('gpScripts', 'gpAutoKill', 'gpFarmBot');

export const heroSlides = slide(
  'gpMapHack',
  'gpScripts',
  'gpZoomHack',
  'gpSkinChanger',
  'gpAutoKill',
  'gpFarmBot',
  'gpHeroEsp',
);

export const productHub = {
  path: productBase,
  title: t.products.title,
  subtitle: t.products.subtitle,
  description:
    'WARZONE Cheats for Windows PC: aimbot with Humanizer, player ESP, bots ESP, items ESP, colors, key binds, and configs.',
  buyUrl: WARZONE_BUY_URL,
};

export interface WarzoneCatalogCard {
  label: string;
  title: string;
  href: string;
  buyUrl: string;
  features: string[];
  badge: string;
  variant?: 'essential' | 'popular' | 'limited';
  icon: IconName;
}

const warzoneBuy = WARZONE_BUY_URL;
const warzonePage = `${productBase}aimbot-esp/`;

/** Matches https://zadeyo.com/products/warzone-cheats — one WARZONE product, feature modules included. */
export const warzoneCatalogCards: WarzoneCatalogCard[] = [
  {
    label: 'Private',
    title: 'WARZONE',
    href: warzonePage,
    buyUrl: warzoneBuy,
    features: [
      'Player ESP, loot filters, and tuned aim settings',
      'Undetected (4.9/5)',
      'Undetected status notes on the live panel',
      'Windows 10/11 · Intel or AMD',
      'Windows 10/11 · Intel or AMD',
      'HVCI, Core Isolation, TPM, and Secure Boot on',
      'Cloud DMA required for full functionality',
      'Warzone, MW2, MW3, BO6, BO7',
    ],
    badge: 'Undetected',
    variant: 'popular',
    icon: 'crosshair',
  },
  {
    label: 'Included with Warzone',
    title: 'Aimbot',
    href: warzonePage,
    buyUrl: warzoneBuy,
    features: [
      'Enable Aimbot',
      'Field Of View Slider',
      'Smoothness Slider',
      'Max. Distance Slider',
      'Ignored Knocked Players',
      'Save Target',
      'Aim Lock',
      'Visibility Check',
      'Humanized Smoothness',
      'Humanized Smoothness Percent Slider',
      'Select Custom Hitbox',
      'Draw FOV',
      'Draw Crosshair',
      'Draw Target',
      'Draw Target Type',
      'Aimbot Draw Thickness Slider',
    ],
    badge: 'Undetected',
    variant: 'essential',
    icon: 'crosshair',
  },
  {
    label: 'Included with Warzone',
    title: 'Player ESP',
    href: warzonePage,
    buyUrl: warzoneBuy,
    features: [
      'Enable',
      'Max Distance Slider',
      'Font Size Slider',
      'Nickname',
      'Distance',
      'Box',
      'Box Thickness Slider',
      'Lines',
      'Lines Thickness Slider',
      'Custom Lines Position',
      'Skeleton',
      'Skeleton Thickness Slider',
    ],
    badge: 'Undetected',
    variant: 'essential',
    icon: 'eye',
  },
  {
    label: 'Included with Warzone',
    title: 'Bots ESP',
    href: warzonePage,
    buyUrl: warzoneBuy,
    features: ['Health', 'Health Thickness Slider', 'Custom Health Position'],
    badge: 'Undetected',
    variant: 'essential',
    icon: 'users',
  },
  {
    label: 'Included with Warzone',
    title: 'Items ESP',
    href: warzonePage,
    buyUrl: warzoneBuy,
    features: [
      'Font Scale Slider',
      'Assault Rifle Ammo',
      'Pistol Ammo',
      'SMG Ammo',
      'Shotgun Ammo',
      'Sniper Ammo',
      'Rocket Ammo',
      'Cash',
      'Armor',
      'Perks',
      'Crates',
      'Boxes',
      'Missions',
      'Grenades',
      'Knifes',
      'Stim',
    ],
    badge: 'Undetected',
    variant: 'essential',
    icon: 'radar',
  },
  {
    label: 'Included with Warzone',
    title: 'Colors',
    href: warzonePage,
    buyUrl: warzoneBuy,
    features: [
      'Custom Crosshair (Aimbot) Color',
      'Custom FOV (Aimbot) Color',
      'Custom Target (Aimbot) Color',
      'Custom Distance (Players) Color',
      'Custom Nickname (Players) Color',
      'Custom Non Visible (Players) Color',
      'Custom Visible (Players) Color',
      'Custom Distance (Bots) Color',
      'Custom Nickname (Bots) Color',
      'Custom Non Visible (Bots) Color',
      'Custom Visible (Bots) Color',
      'Custom Closest (Radar) Color',
      'Custom Enemies (Radar) Color',
      'Custom Visible (Radar) Color',
    ],
    badge: 'Undetected',
    variant: 'essential',
    icon: 'layers',
  },
  {
    label: 'Included with Warzone',
    title: 'Key Binds',
    href: warzonePage,
    buyUrl: warzoneBuy,
    features: [
      'Custom Menu Key Bind',
      'Custom Hold Primary Key Bind',
      'Custom Hold Secondary Key Bind',
      'Custom Hold Bots Key Bind',
      'Custom Switch To Head Key Bind',
      'Custom Toggle Key Bind',
      'Custom Toggle Players Key Bind',
      'Custom Toggle Radar Key Bind',
      'Custom Toggle Items Key Bind',
    ],
    badge: 'Undetected',
    variant: 'essential',
    icon: 'settings',
  },
  {
    label: 'Included with Warzone',
    title: 'Config',
    href: warzonePage,
    buyUrl: warzoneBuy,
    features: ['Select Your Custom Config', 'Create New Config Name', 'Add New Config'],
    badge: 'Undetected',
    variant: 'essential',
    icon: 'settings',
  },
];
