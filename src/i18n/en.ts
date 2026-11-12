import type { Translations } from './types';
import { WARZONE_BUY_URL } from '../config/checkout';
import { DISCORD_INVITE_URL, PRODUCT_BASE, SUPPORT_EMAIL } from '../config/site';

const productBase = PRODUCT_BASE;

export const en: Translations = {
    site: {
    name: 'Warzone Cheats',
    domain: 'cheats-warzone.com',
    title: 'Call of Duty Warzone Cheats | Warzone ESP, Aimbot & PC Hacks',
    description:
      'Call of Duty Warzone cheats for Windows PC: ESP, wallhack, aimbot, radar, and recoil helpers—updated every patch at cheats-warzone.com.',
    discord: DISCORD_INVITE_URL,
  },
  nav: [
    { href: '/', label: 'Home' },
    { href: `${productBase}`, label: 'Products' },
    { href: '/warzone-blog/', label: 'Blog' },
    { href: '/warzone-forum/', label: 'Forum' },
    { href: '/warzone-reviews/', label: 'Reviews' },
    { href: '/warzone-faq/', label: 'FAQ' },
    { href: '/warzone-support/', label: 'Support' },
  ],
  hero: {
    status: 'Call of Duty Warzone · PC',
    eyebrow: 'Call of Duty Warzone · PC',
    titleLine1: 'Warzone',
    titleLine2: 'Warzone Cheats — Aimbot, ESP & Hacks',
    homeHeroH1: 'Warzone Cheats – PC Aimbot, ESP & wallhacks',
    subtitle:
      'Warzone cheats for Windows PC: customizable aimbot with Humanizer, player ESP, loot and vehicle markers, wallhack overlays, and radar. Check the product page for live module status before checkout, or read the blog for ranked setup guides.',
    ctaPrimary: 'View Product',
    ctaDiscord: 'Join Discord',
    modesLabel: 'Playlists',
    modes: ['Battle Royale', 'Resurgence', 'Ranked', 'Plunder'],
    metrics: [
      { label: 'Platform', strong: 'Windows' },
      { label: 'Starts at', strong: '$35' },
      { label: 'Delivery', strong: 'Digital' },
      { label: 'Support', strong: '24/7' },
    ],
  },
  features: {
    eyebrow: 'Modules',
    title: 'Warzone Cheats: What You Get',
    subtitle: 'Player ESP, wallhack, aim helpers, radar, loot and vehicle ESP, and recoil tools for Call of Duty Warzone on Windows PC. Exact modules stay on the product page.',
    items: [
      {
        title: 'Scripts',
        subtitle: 'Aim and recoil.',
        desc: 'The listing groups aim helpers and recoil tools for Call of Duty Warzone on Windows PC. Which ones are in the current build is on the product page.',
        bullets: [
          'Aim helper, separate from a recoil helper',
          'Recoil helper for spray control',
          'Triggerbot listed as its own module',
          'Per-loadout notes belong on the product page',
          'Windows PC only — console is not supported',
        ],
        tags: ['aim helper', 'recoil', 'warzone pc'],
        bento: 'sm:col-span-2 lg:col-span-12 lg:col-start-1 lg:row-start-1',
      },
      {
        title: 'Player ESP',
        subtitle: 'Overlay information.',
        desc: 'ESP and wallhack are the words players use for markers the normal Warzone camera does not show.',
        bullets: [
          'Player name, health, armor, and distance',
          'Loot and vehicle markers on the map',
          'A wallhack is overlay information, not a separate game mode',
        ],
        tags: ['esp', 'wallhack', 'players'],
        bento: 'sm:col-span-2 lg:col-span-8 lg:col-start-1 lg:row-start-2',
      },
      {
        title: 'Radar & Map Intel',
        subtitle: 'A compact tactical map.',
        desc: 'Radar is a small position display for the match. It is not the in-game minimap compass.',
        bullets: ['Squad positions around your area', 'Last-seen markers', 'Kept off killcam clutter'],
        tags: ['radar', 'map', 'positions'],
        bento: 'sm:col-span-2 lg:col-span-6 lg:col-start-1 lg:row-start-3',
      },
      {
        title: 'Recoil control',
        subtitle: 'Spray, not aim.',
        desc: 'A recoil helper steadies spray. It is not the same module as an aimbot.',
        bullets: ['Listed apart from the aim helper', 'Weapon notes on the product page', 'Confirm it is in the current build before you pay'],
        tags: ['recoil', 'spray', 'aimbot'],
        bento: 'sm:col-span-2 lg:col-span-6 lg:col-start-7 lg:row-start-3',
      },
      {
        title: 'Utility Suite',
        subtitle: 'Extras on the listing.',
        desc: 'Cosmetic preview and stream-proof display sit beside ESP and aim modules. Other players still see your real inventory.',
        bullets: [
          'Local operator and weapon camo preview',
          'Does not change Battle.net or Steam store inventory',
          'Stream-proof is a display option — test a local recording yourself',
        ],
        tags: ['loot esp', 'configs', 'stream proof'],
        bento:
          'sm:col-span-2 lg:col-span-8 lg:row-span-2 lg:col-start-1 lg:row-start-4',
      },
      {
        title: 'Triggerbot',
        subtitle: 'Fire assist.',
        desc: 'A triggerbot fires when a target is already under the crosshair. It is not an aimbot.',
        bullets: [
          'Separate from the aim helper',
          'On or off in the product notes',
          'Windows PC only',
          'Battle Royale and Resurgence are both PC playlists',
        ],
        tags: ['triggerbot', 'crosshair', 'pc'],
        bento:
          'sm:col-span-2 lg:col-span-4 lg:row-span-2 lg:col-start-9 lg:row-start-4',
      },
      {
        title: 'Stream Proof',
        subtitle: 'Creators Stay Safe.',
        desc: 'Keep overlays on your monitor while capture software records a clean game feed.',
        bullets: ['OBS and Game Bar safe modes', 'Toggle stream proof per module', 'Test checklist in portal docs'],
        tags: ['obs safe', 'stream proof', 'capture hide'],
        bento: 'sm:col-span-2 lg:col-span-6 lg:col-start-1 lg:row-start-6',
      },
      {
        title: 'Radar',
        subtitle: 'Positions, not the compass.',
        desc: 'Use radar to read the map. Keep it small enough that it does not cover the HUD.',
        bullets: ['Squad and enemy positions', 'Pairs with Player ESP', 'Windows PC client only'],
        tags: ['radar', 'camera', 'vision'],
        bento: 'sm:col-span-2 lg:col-span-6 lg:col-start-7 lg:row-start-6',
      },
      {
        title: 'Cloud Config & Updates',
        subtitle: 'Re-check after patches.',
        desc: 'Warzone and Ricochet both update. A status note is only current when it is posted — an older article is not clearance.',
        bullets: ['Read the product note after every patch', 'Stop if the note says updating or offline', 'Price and modules are on the product page'],
        tags: ['cloud sync', 'auto update', 'presets'],
        bento: 'sm:col-span-2 lg:col-span-4 lg:col-start-9 lg:row-start-2',
      },
    ],
  },
  whyUs: {
    eyebrow: 'Why this listing',
    title: 'Updated After EAC Patches',
    subtitle:
      'Warzone Cheats is a Windows PC listing for Call of Duty Warzone. Articles explain ESP, wallhack, and aim helpers. The product page is where price, modules, and status notes live.',
    usLabel: 'Warzone Cheats',
    otherLabel: 'Typical provider',
    rows: [
      {
        title: 'Windows PC only',
        desc: 'Engineered specifically for Call of Duty Warzone on Windows 10 and 11 via Battle.net or Steam. Console editions (PlayStation, Xbox) are not supported.',
        mobileDesc: 'Built exclusively for Windows PC Warzone players; console platforms are not compatible.',
      },
      {
        title: 'Status notes after patches',
        desc: 'Ricochet and client builds receive ongoing patches. Check the live status indicator before every play session; archived guides do not confer clearance.',
        mobileDesc: 'Both the game client and Ricochet update regularly. Always check real-time operational status before queuing matches rather than relying on older posts.',
      },
      {
        title: 'Blogs are not the feature list',
        desc: 'Articles explain tactical concepts and definitions. Active loader modules, available tiers, and current rates are always maintained on the official product listing.',
        mobileDesc: 'Blog posts break down terminology and mechanics. The specific product page confirms live build features, pricing tiers, and compatibility.',
      },
      {
        title: 'Fair play is part of the page',
        desc: 'Third-party game enhancements carry inherent account risks. We publish transparent real-time alerts rather than making false claims of permanent immunity.',
        mobileDesc: 'Running third-party utilities carries account enforcement consequences. Our live dashboard provides honest status indicators instead of empty promises.',
      },
      {
        title: 'Digital delivery',
        desc: 'Instant access credentials and loader access are delivered directly upon completed payment. Review active rates at checkout; monthly licenses are $35 for 31 days.',
        mobileDesc: 'Automated key delivery is generated immediately post-payment. Verify live pricing on the checkout screen; monthly licenses are $35 for 31 days.',
      },
      {
        title: 'Support if delivery looks wrong',
        desc: 'Order fulfillment or key activation questions are resolved through our direct Support desk using your checkout billing email.',
        mobileDesc: 'Need assistance with order access? Contact the support team with the primary email address submitted during checkout.',
      },
    ],
    metrics: [
      {
        value: '300+',
        title: 'Active users',
        desc: 'Players running Warzone ESP, wallhack, and aimbot cheats with live product support.',
      },
      {
        value: '$35',
        title: 'Starting price',
        desc: 'Longer access can cost more. Confirm the price on the checkout page.',
      },
      {
        value: '24/7',
        title: 'Support',
        desc: 'Help with delivery and access after you buy.',
      },
    ],
  },
  setup: {
    eyebrow: 'Setup',
    titleLead: 'Checkout to in-game in',
    titleHighlight: 'three steps',
    intro:
      'Buy access, download the loader from the portal, load a preset, then open Call of Duty Warzone. Discord help is there if you get stuck.',
    ctaPrimary: 'View products',
    ctaSecondary: 'See FAQ',
    ctaPrimaryHref: productBase,
    ctaSecondaryHref: '/warzone-faq/',
    steps: [
      {
        step: 'Step 1',
        title: 'Buy and download the loader',
        desc: 'Buy access, then download the loader from the portal.',
      },
      {
        step: 'Step 2',
        title: 'Load presets',
        desc: 'Load a preset before you launch Call of Duty Warzone.',
      },
      {
        step: 'Step 3',
        title: 'Check status and play',
        desc: 'Confirm the live status note, then play.',
      },
    ],
  },
  compatibility: {
    eyebrow: 'Platform support',
    title: 'Runs on your rig.',
    subtitle: 'Check the live status banner before launching Call of Duty Warzone after updates.',
    items: ['Windows 10 & 11', 'Warzone PC client', 'Not console', 'Product notes', 'Digital delivery', 'Status notes', 'Blogs & FAQ', 'Support'],
  },
  cheats: {
    eyebrow: 'Product',
    title: 'WARZONE',
    subtitle:
      'Player ESP, loot filters, and tuned aim settings — a configurable WARZONE Cheats suite for Windows PC.',
    viewAll: 'View product details',
    explore: 'Explore',
    items: [
      {
        badge: 'Undetected',
        tier: 'WZ',
        name: 'Warzone Cheats',
        title: 'Warzone Cheats — Aimbot, ESP, Wallhack & Humanizer',
        desc: 'Warzone cheats companion for PC: high-precision aimbot with Humanizer, player ESP, bots ESP, items ESP, colors, key binds, and configs. Status Undetected (4.9/5).',
        features: [
          'Enable Aimbot',
          'Field Of View Slider',
          'Smoothness Slider',
          'Humanized Smoothness',
          'Visibility Check',
          'Select Custom Hitbox',
          'Player ESP — box, skeleton, nickname, distance',
          'Bots ESP — health overlays',
          'Items ESP — ammo, cash, armor, perks, crates',
          'Custom colors for aimbot, players, bots, and radar',
          'Custom key binds for menu, hold, and toggles',
          'Save and load custom configs',
          'StreamProof mode',
          'Warzone, MW2, MW3, BO6, BO7 support',
        ],
        more: 0,
        href: `${productBase}aimbot-esp/`,
        variant: 'popular',
      },
    ],
  },
  products: {
    eyebrow: 'Products',
    title: 'Warzone Cheats',
    subtitle:
      'One Warzone cheats suite: aimbot, player ESP, bots ESP, items ESP, colors, key binds, and configs.',
    viewAll: 'View product',
    get: 'Get',
    explore: 'Explore',
    items: [
      {
        badge: 'Undetected',
        category: 'System utility',
        title: 'HWID Spoofer',
        subtitle: 'System utility',
        desc: 'HWID Spoofer for Call of Duty Warzone on Windows PC: serial profile rotation, compatibility scans, and post-spoof verification when Ricochet or platform flags require a clean fingerprint.',
        features: [
          'Spoofer & cleanup tools',
          'Serial profile rotation',
          'Compatibility scan',
          'Post-spoof verification',
        ],
        more: 9,
        href: `${productBase}hwid-spoofer/`,
      },
      {
        badge: 'Active',
        category: 'Account recovery',
        title: 'UGC',
        subtitle: 'Account recovery',
        desc: 'UGC (Unban & Governance Control) helps document Battle.net or Steam restrictions and Ricochet holds with structured appeal workflows—not instant unban guarantees.',
        features: [
          'Custom appeal workflows',
          'Restriction dispute automation',
          'Case documentation templates',
          'Status tracking dashboard',
        ],
        more: 8,
        href: `${productBase}ugc/`,
      },
      {
        badge: 'Active',
        category: 'Cosmetic',
        title: 'Skin Changer',
        subtitle: 'Cosmetic',
        desc: 'Skin Changer previews weapon camos, operator skins, and bundles locally in Call of Duty Warzone—searchable catalog, favorites, and loadout export without modifying live store purchases.',
        features: [
          'Weapon camo preview',
          'Operator skin browser',
          'Loadout preview',
          'Favorites & export',
        ],
        more: 6,
        href: `${productBase}unlock-all/`,
      },
    ],
  },
  blog: {
    eyebrow: 'Blog',
    // Homepage section heading — do not change
    title: 'Warzone Guides',
    heroTitle: 'Warzone Cheats Guides',
    subtitle: 'Guides, patch notes, and deep-dives on ESP, aimbot, wallhack, and Ricochet detection for Call of Duty Warzone.',
    // Also used under homepage “Latest Releases” — keep wording stable
    heroLead:
      'This archive ranks around the searches players actually type—Call of Duty Warzone cheats, Warzone ESP, wallhack, aimbot FOV, radar hacks, recoil scripts, and undetected status notes. Articles explain terminology; the product page remains the live feature list.',
    heroExtra:
      'Filter by topic or sort by read time to find ESP, wallhack, aimbot, and Ricochet deep-dives. Re-check the listing after every Warzone, Ricochet, or seasonal update before you treat a guide as current.',
    searchPlaceholder: 'Search blogs',
    latestTitle: 'Guides: Warzone Blog Aimbot, ESP & PC Setup Advice',
    seeMore: 'See more',
    latestSubtitle:
      'filter guides by topic or sort to find ESP, aimbot, Ricochet, and Warzone cheats articles for Call of Duty on Windows PC.',
    filterAll: 'All blogs',
    sortLabel: 'Sort by',
    sortNewest: 'Newest first',
    sortOldest: 'Oldest first',
    sortShortRead: 'Shortest read',
    sortLongRead: 'Longest read',
    emptyFilter: 'No blogs match this filter.',
    viewAll: 'View all blogs',
    read: 'Read',
    items: [
      {
        tag: 'Warzone Cheats',
        title: 'Warzone Cheats Modules: ESP, Wallhack, Aimbot & More',
        slug: 'cheats-features',
        image: '/images/blog/warzone-esp-aimbot.jpeg',
        desc: 'How Warzone cheats group ESP, wallhack overlays, aimbot, and related modules — and why the live product page is the feature list that matters.',
        date: 'Oct 20, 2026',
        readTime: '8 min read',
      },
      {
        tag: 'Warzone Cheats',
        title: 'Ricochet, Warzone Cheats & ESP: What Status Notes Really Mean',
        slug: 'ricochet-safety',
        image: '/images/blog/warzone-ricochet-safety.jpeg',
        desc: 'How Ricochet and Warzone updates relate to cheats, ESP, and wallhack tools — without treating any status note as a permanent clear.',
        date: 'Oct 06, 2026',
        readTime: '7 min read',
      },
      {
        tag: 'ESP & Aimbot',
        title: 'Warzone Aimbot & ESP Setup Guide for Warzone Cheats',
        slug: 'esp-aimbot',
        image: '/images/blog/warzone-cheats-features.jpeg',
        desc: 'A clear guide to Warzone aimbot, ESP, and wallhack terminology — and how those cheat modules differ from each other.',
        date: 'Sep 22, 2026',
        readTime: '7 min read',
      },
      {
        tag: 'Settings',
        title: 'Warzone Cheat Settings: Aimbot FOV, ESP Colors & Triggerbot',
        slug: 'cheat-settings',
        image: '/images/blog/warzone-cheat-settings.jpg',
        desc: 'How Warzone cheat menus talk about aimbot FOV, ESP colors, wallhack distance, radar, and triggerbot so product notes are easier to read.',
        date: 'Sep 08, 2026',
        readTime: '6 min read',
      },
      {
        tag: 'ESP & Wallhack',
        title: 'Warzone ESP & Wallhack: How Overlay Cheats Work',
        slug: 'warzone-esp',
        image: '/images/blog/warzone-esp-guide.jpeg',
        desc: 'What ESP and wallhack mean in Warzone cheat talk, how they differ from aimbot, and why a blog is not the live feature list.',
        date: 'Aug 25, 2026',
        readTime: '6 min read',
      },
    ],
  },
  toolkit: {
    eyebrow: 'Software',
    title: 'Organized, easy to configure',
    subtitle: 'Every module is grouped for quick tuning mid-match without tabbing through chaos.',
    items: [
      { num: '01', label: 'Scripts', title: 'Profiles that follow your loadout', desc: 'Recoil control, trigger assist, aim assist and delay settings in one tab.' },
      { num: '02', label: 'Vision', title: 'Player ESP that stays readable', desc: 'Filter by distance, team color, loot tier and alert sensitivity.' },
      { num: '03', label: 'Minimap', title: 'Gas and rotates on lock', desc: 'Circle timers, enemy hints and radar on a compact overlay.' },
      { num: '04', label: 'Loadouts', title: 'Per-weapon profiles', desc: 'Save AR, SMG, and sniper setups and swap them with hotkeys.' },
      { num: '05', label: 'Bots', title: 'Trigger assist', desc: 'Triggerbot with a delay slider and separate presets for Ranked and Resurgence.' },
      { num: '06', label: 'Profiles', title: 'Configs for every mode', desc: 'Separate Battle Royale, Resurgence, and Plunder presets with cloud backup.' },
    ],
  },
  workflow: {
    eyebrow: 'How it works',
    badge: '4 steps',
    titleBefore: 'From buy to',
    titleHighlight: 'saved config.',
    subtitle: 'Buy, download the loader, set modules, save your Call of Duty Warzone config for next time.',
    ctaLabel: 'View products',
    ctaHref: productBase,
    ctaSecondary: 'See FAQ',
    ctaSecondaryHref: '/warzone-faq/',
    items: [
      {
        num: '01',
        phase: 'Before purchase',
        title: 'Check status',
        desc: 'Read the live banner on cheats-warzone.com before you buy or launch.',
      },
      {
        num: '02',
        phase: 'Product page',
        title: 'Pick a tier',
        desc: 'Open WARZONE Cheats for aimbot, player ESP, bots ESP, and items ESP.',
      },
      {
        num: '03',
        phase: 'Checkout',
        title: 'Launch and set up',
        desc: 'Download from the portal, turn on modules, and test in a private match or Plunder.',
      },
      {
        num: '04',
        phase: 'After a patch',
        title: 'Save your config',
        desc: 'When the settings feel right, save Ranked and Resurgence presets to the cloud.',
      },
    ],
  },
  fieldNotes: {
    eyebrow: 'Field notes',
    title: 'Built for how Call of Duty Warzone plays.',
    items: [
      { num: '01', title: 'Patch-day ready', desc: 'Patch notes hit Discord and the portal before the official blog—check before you queue Ranked.' },
      { num: '02', title: 'Conservative defaults', desc: 'Start with safe script delays and Player ESP ranges, then tune up—not the other way around.' },
      { num: '03', title: 'Real human support', desc: 'Stuck on access after checkout? Support answers with the order email you used—not a copy-paste thread.' },
    ],
  },
  support: {
    eyebrow: 'Support',
    title: 'WarzoneCheats Support',
    subtitle: 'Loader, HWID, checkout and account help.',
    channels: [
      {
        icon: 'users',
        title: 'Before you buy',
        desc: 'Compare tiers, modules, and delivery before checkout.',
        linkLabel: 'Start checkout',
        href: WARZONE_BUY_URL,
      },
      {
        icon: 'messageCircle',
        title: 'Community Forum',
        desc: 'Discuss setup, loaders, and patch-day checks with other players.',
        linkLabel: 'Open forum',
        href: '/warzone-forum/',
      },
      {
        icon: 'navFaq',
        title: 'FAQ',
        desc: 'Quick answers on compatibility, bans, and post-checkout setup.',
        linkLabel: 'View FAQ',
        href: '/warzone-faq/',
      },
      {
        icon: 'navBlog',
        title: 'Guides',
        desc: 'Step-by-step articles for ESP, aimbot, HWID, and Ricochet status.',
        linkLabel: 'Read guides',
        href: '/warzone-blog/',
      },
    ],
    ticketTitle: 'Support: Include in your ticket',
    ticketItems: [
      { title: 'Order email', desc: 'The address used at checkout on cheats-warzone.com or via our secure checkout confirmation.' },
      { title: 'Platform', desc: 'Battle.net or Steam on Windows 10 or 11—and your Call of Duty Warzone client version.' },
      { title: 'Error detail', desc: 'Screenshot or exact message from the loader or launcher.' },
      { title: 'Product tier', desc: 'Elite, Pro, Lite, or utility (HWID spoofer, unlock tools) so we route you to the right guide.' },
      { title: 'Status check', desc: 'Note whether the homepage status banner and Discord #status showed online when you started.' },
    ],
    detailBlocks: [
      {
        title: 'What we can help with',
        items: [
          {
            title: 'Loader & portal access',
            desc: 'Download links, login issues, missing modules, and first-time setup for WARZONE Cheats on Windows PC.',
          },
          {
            title: 'HWID & device limits',
            desc: 'Hardware resets, moving a license to a new PC, and spoofer utilities when Ricochet or platform flags block access.',
          },
          {
            title: 'Configs & features',
            desc: 'ESP colors, aimbot FOV/smoothing, stream-proof capture checks, and Ranked-safe presets after patches.',
          },
          {
            title: 'Post-patch confusion',
            desc: 'When Ricochet or a Warzone season update changes behavior—confirm status before relaunching.',
          },
        ],
      },
      {
        title: 'Handled on the checkout provider',
        items: [
          {
            title: 'Card declines & billing',
            desc: 'Payment failures, chargebacks, and receipt emails are managed by the external checkout partner—not cheats-warzone.com.',
          },
          {
            title: 'Refund requests',
            desc: 'See Terms & Conditions for eligibility. Include order proof and loader logs when asking about a failed delivery.',
          },
          {
            title: 'License delivery email',
            desc: 'If the portal invite never arrived, check spam first, then email support with your checkout receipt.',
          },
        ],
      },
      {
        title: 'Self-service before you write in',
        items: [
          {
            title: 'Read the live status banner',
            desc: 'Confirm online/offline on the homepage and in Discord #status before opening the loader.',
          },
          {
            title: 'Skim the FAQ',
            desc: 'Compatibility, Ricochet vocabulary, console scope, and checkout flow are answered on the FAQ page.',
          },
          {
            title: 'Use the blog & forum',
            desc: 'Patch-day guides, anti-cheat FAQs, and community threads cover common setup mistakes without a ticket.',
          },
        ],
      },
      {
        title: 'Direct contact',
        items: [
          {
            title: 'Email support',
            desc: `Loader errors, HWID resets, and portal access — write to ${SUPPORT_EMAIL} with the ticket fields above.`,
          },
          {
            title: 'Discord',
            desc: 'Community and engineer chat when online. Join via the homepage button or the invite link after checkout.',
          },
        ],
      },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Call of Duty Warzone FAQ',
    subtitle:
      'WarzoneCheats Answers for Call of Duty Warzone on Windows PC—how we source facts, what listings cover, and how fair-play risk is framed.',
    seeMore: 'See more',
    topicLabels: {
      all: 'All',
      plans: 'Plans',
      esp: 'ESP',
      scripts: 'Scripts',
      safety: 'Safety',
      products: 'Products',
      blog: 'Blog',
      setup: 'Setup',
    },
    items: [
      {
        num: '01',
        q: 'How much does it cost?',
        a: 'Monthly access is $35 for 31 days; lifetime access is $150. Confirm the live price on the external checkout page before paying.',
      },
      {
        num: '02',
        q: 'Where does checkout happen?',
        a: 'Purchases are completed through an external Buy Now checkout. This site does not process cards or store payment details.',
      },
      {
        num: '03',
        q: 'Is it available for consoles?',
        a: 'No. This product is scoped to Windows PC. Console versions are not supported.',
      },
      {
        num: '04',
        q: 'Can I stream or record my gameplay while using the ESP?',
        a: 'Yes, our visual features are completely stream-proof. The ESP and radar overlays will not show up on OBS, Discord screen share, or standard recording software, keeping your gameplay footage looking entirely legitimate.',
      },
      {
        num: '05',
        q: 'How customizable are the aimbot settings?',
        a: 'You have full control over the configuration. You can adjust the field of view (FOV), smoothing, and target bone selection, allowing you to fine-tune the assistance from a subtle, natural-looking aim assist to a more aggressive playstyle.',
      },
      {
        num: '06',
        q: 'Does this work on all modern Windows setups?',
        a: 'Our Warzone modules support most current Windows 10 and Windows 11 builds for both Intel and AMD processors. We recommend checking the specific OS version requirements listed directly on the product page before completing your checkout.',
      },
      {
        num: '07',
        q: 'How do I confirm current status before buying?',
        a: 'Read the status note on the product page immediately before checkout, and review the Warzone ESP, wallhack and anti-cheat article plus settings terminology before you buy.',
      },
      {
        num: '08',
        q: 'Where can I read more before purchasing?',
        a: 'Browse the articles hub for features overview, Warzone ESP and wallhack terminology, Ricochet context, Warzone settings, and hacks and ESP coverage.',
      },
      {
        num: '09',
        q: 'How do I get in touch?',
        a: 'Use the Support page for questions about our articles or this site. Checkout and payment issues are handled on the external checkout provider side.',
      },
    ],
  },
  footer: {
    tagline: 'Call of Duty Warzone cheats — scripts, Player ESP and tools for PC. cheats-warzone.com',
    explore: 'Explore',
    exploreLinks: [
      { href: '/#features', label: 'Feature overview', scrollTarget: 'features' },
      { href: '/products/warzone-cheats/aimbot-esp/', label: 'Aimbot & ESP listing', noLocalize: true },
      { href: '/products/warzone-cheats/', label: 'Product catalog', noLocalize: true },
      { href: '/warzone-blog/', label: 'Read patch guides' },
      { href: '/warzone-forum/', label: 'Community forum' },
      { href: '/warzone-faq/', label: 'Pre-purchase FAQ' },
    ],
    support: 'Support',
    legal: 'Legal',
    privacy: 'Privacy Policy',
    terms: 'Terms & Conditions',
    about: 'About',
  },
  legalPages: {
    about: {
      title: 'About WarzoneCheats – Our Editorial Standards & Testing Guide',
      description:
        'WarzoneCheats testing for Call of Duty PC: who we are, verified ESP and aimbot guides, Ricochet safety status, hardware compatibility, and support at cheats-warzone.com.',
      sections: [
        {
          heading: 'WarzoneCheats: Who we are and our mission',
          paragraphs: [
            'WarzoneCheats research starts here: we are an independent PC gaming publication dedicated to testing, documenting, and guiding players on Warzone cheats and related modules. Since Modern Warfare and Call of Duty launched, our team has analyzed memory injection methods, visual ESP wallhack rendering, kernel driver safety, and aimbot smoothness algorithms for Windows PC players.',
            'Our mission is straightforward: give Call of Duty players transparent, rigorously tested information regarding PC modules, feature configurations, and anti-cheat mitigations. Product names appear for identification and technical reference. This page documents WarzoneCheats editorial standards, live pricing structures, hardware requirements, and support channels.',
          ],
        },
        {
          heading: 'Active plans and pricing offers',
          paragraphs: [
            'We believe in straightforward pricing without hidden renewal traps or deceptive subscription tiers. All active licenses provide full, unrestricted access to the complete Warzone cheats suite—including aimbot with Humanizer, player ESP, bots ESP, loot filters, custom colors, and config management:',
            '• 1-Month Access ($35 USD / 31 Days): Our most popular tier for active ranked players and daily Resurgence grinders, offering continuous protection and instant patch updates.',
            '• Lifetime Access ($150 USD): One-time investment granting unlimited future updates across Warzone, MW2, MW3, BO6, and upcoming COD titles with priority VIP queue.',
            'All purchases include instant automated key delivery upon checkout, loader access credentials, step-by-step PDF installation guides, and complete access to private Discord announcements.',
          ],
        },
        {
          heading: 'Hardware compatibility and system proof',
          paragraphs: [
            'Our cheats Warzone loader is custom-engineered to run natively on standard competitive gaming hardware without requiring specialized secondary PCs or risky BIOS modifications:',
            '• Operating Systems: Windows 10 (versions 20H2, 21H1, 21H2, 22H2) and Windows 11 (builds 21H2 through 24H2) 64-bit editions.',
            '• Processors: Full hardware support for both Intel Core (i3, i5, i7, i9 across 8th to 14th generations) and AMD Ryzen (Ryzen 3, 5, 7, 9, Threadripper).',
            '• Security Features: Fully compatible with Secure Boot enabled, TPM 2.0 active, and Hypervisor-protected Code Integrity (HVCI) / Core Isolation switched on.',
            '• Game Platforms: Seamless integration with Battle.net, Steam, and Microsoft Store PC client versions.',
            '• Cloud DMA Architecture: Designed with memory isolation and zero system hooks so overlays remain 100% StreamProof on OBS, Discord, and streaming capture software.',
          ],
        },
        {
          heading: 'Ricochet anti-cheat monitoring protocol',
          paragraphs: [
            'Every modern Warzone cheat operates alongside Activision’s proprietary RICOCHET anti-cheat kernel driver. To ensure user security, we employ a multi-layered testing protocol before endorsing any software build:',
            '1. Automated Signature Scans: Every loader update runs through signature validation routines before keys are distributed to users.',
            '2. Daily Pilot Testing: Our dedicated internal test group logs matches across Battle Royale, Resurgence, and Ranked Play daily to verify detection statuses.',
            '3. Instant Killswitch System: If Activision deploys an unexpected server-side anti-cheat patch, our servers automatically pause loader injections to safeguard active player accounts until compatibility is re-certified.',
            '4. Real-time Status Updates: Live status notes are displayed directly on our homepage header and in our private Discord status channel so you always know when it is 100% safe to queue.',
          ],
        },
        {
          heading: 'Core feature modules explained',
          paragraphs: [
            'The software package includes three primary tactical cheat modules designed to enhance awareness and mechanical precision without unnatural gameplay artifacts:',
            '• High-Precision Aimbot: Configurable FOV circle (1° to 30°), smoothness curve algorithms, customized bone targeting (head, neck, upper chest, pelvis), weapon recoil stabilization, and visibility raycasting.',
            '• Tactical ESP & Wallhack: 3D bounding boxes, real-time skeleton tracking, player distance readouts up to 300m, health bars, player names, and directional snaplines.',
            '• Loot & Utility ESP: Customizable item filters highlighting high-tier weaponry, armor satchels, cash stacks, ammo crates, killstreaks, self-revives, and contract locations through solid walls.',
          ],
        },
        {
          heading: 'Common setup questions',
          paragraphs: [
            'Q: How fast do I receive my key after payment?\nA: Delivery is completely automated. Your license key and download link are generated immediately upon completed payment on the secure checkout portal.',
            'Q: Are updates free when Call of Duty releases a new season or patch?\nA: Yes. All active license holders receive automatic loader updates at zero additional charge. Our developers typically deliver compatibility patches within hours of major game updates.',
            'Q: Can I use these cheats with controller on PC?\nA: Yes. Both native keyboard/mouse and Xbox/PlayStation controllers connected to PC are supported with full aimbot binding and ESP overlay awareness.',
            'Q: What happens if I need technical assistance during setup?\nA: Our customer support staff is active 24/7 via Discord ticket and direct email support to guide you through initial installation or troubleshoot any system configuration questions.',
          ],
        },
      ],
    },
    privacy: {
      title: 'Privacy Policy',
      description:
        'How WarzoneCheats handles analytics, cookies, and contact data when you use cheats-warzone.com.',
      sections: [
        {
          heading: 'Information we collect',
          paragraphs: [
            'We may collect standard web analytics such as page views, device type, browser, and approximate region through Google Analytics when enabled. Checkout and license delivery happen on external checkout pages—we do not store payment card data on cheats-warzone.com.',
            'If you contact Support, we may retain the email address and message content you send until the issue is closed. Forum preview pages do not collect account passwords.',
          ],
        },
        {
          heading: 'How we use data',
          paragraphs: [
            'Analytics help us understand which Call of Duty Warzone guides and product pages are useful so we can improve content and fix broken links. We do not sell personal contact details to third-party advertisers.',
            'Support tickets may retain the email address and message content you provide until the issue is resolved, then we delete or anonymize records according to operational needs.',
          ],
        },
        {
          heading: 'Cookies',
          paragraphs: [
            'We use minimal cookies required for analytics and theme preference. You can block cookies in your browser settings; core site content remains accessible without them.',
            'External checkout pages may set their own cookies under their privacy policies. Review those providers separately before paying.',
          ],
        },
        {
          heading: 'Support',
          paragraphs: [
            'For privacy questions about cheats-warzone.com, use the options on the Support page. Purchase and refund rules are in our Terms & Conditions, which are separate from this Privacy Policy.',
            'This Privacy Policy covers browsing WarzoneCheats and Call of Duty Warzone guide pages on cheats-warzone.com. It does not replace the privacy terms of external checkout providers used when you purchase access.',
          ],
        },
      ],
    },
    terms: {
      title: 'Terms & Conditions',
      description:
        'Purchase, license, refund, and use terms for WarzoneCheats products and cheats-warzone.com.',
      sections: [
        {
          heading: 'Agreement',
          paragraphs: [
            'Last updated: September 2026. By using cheats-warzone.com or completing checkout for any product listed here, you agree to these Terms & Conditions and our Privacy Policy.',
            'These Terms & Conditions apply to WarzoneCheats Call of Duty Warzone cheat products and related utilities sold for Windows PC use. If you do not agree, do not complete checkout.',
          ],
        },
        {
          heading: 'What you purchase',
          paragraphs: [
            'We sell access to WARZONE Cheats — the Warzone product with aimbot, player ESP, bots ESP, items ESP, colors, key binds, and configs — delivered through a player portal and loader for Battle.net, Steam, or Microsoft Store on Windows.',
            'Feature lists on each product page describe what is included at the time of purchase. Modules can change when Call of Duty Warzone or anti-cheat systems update.',
          ],
        },
        {
          heading: 'Checkout and delivery',
          paragraphs: [
            'Payment and license delivery run on external checkout pages. cheats-warzone.com does not process or store payment card numbers.',
            'After purchase, use the player portal linked from your order flow to download the current loader and setup guide before launching Call of Duty Warzone.',
          ],
        },
        {
          heading: 'License use',
          paragraphs: [
            'Licenses are for your personal use only. Do not share loader files, portal logins, or license keys. HWID and device limits depend on your tier and are enforced in the portal.',
          ],
        },
        {
          heading: 'Refunds and purchases',
          paragraphs: [
            'All sales are final once checkout completes. We do not refund change-of-mind purchases, account bans, Ricochet penalties, or issues caused by ignoring setup guides or running modules while the status banner shows offline.',
            'If the product does not work as described on a supported setup—Battle.net or Steam Call of Duty Warzone on Windows 10/11, current loader from the portal, and the live status banner showing online when you started—contact us through the Support page. Include your order email, Windows version, Call of Duty Warzone build, and screenshots or exact error text from the loader.',
            'We may, at our discretion, offer a fix, replacement access, or partial/full refund when we confirm a fault on our side. We are not obligated to approve every request.',
          ],
        },
        {
          heading: 'Availability and risk',
          paragraphs: [
            'Third-party tools for Call of Duty Warzone can conflict with game updates and anti-cheat systems. You use this software at your own risk, including possible account action.',
            'Check the homepage status banner before every session. Do not queue Ranked while modules are offline or misaligned after a patch.',
          ],
        },
        {
          heading: 'Changes',
          paragraphs: [
            'We may update these terms. The “Last updated” date at the top will change when we do. Continued use of the site after changes means you accept the revised terms.',
          ],
        },
        {
          heading: 'Support',
          paragraphs: [
            'For terms, billing, or loader questions, use the buttons on the Support page. See also our Privacy Policy for how we handle site data.',
          ],
        },
      ],
    },
    support: {
      title: 'WarzoneCheats Support',
      description:
        'Get support for loader and checkout questions at cheats-warzone.com.',
    },
  },
  forum: {
    eyebrow: 'Warzone community forums',
    title: 'Forums: Warzone Cheats Q&A, ESP, Aimbot & Patches',
    subtitle:
      'Forums for practical Windows PC setup, Ricochet status, patch updates, and product notes — discuss guides with other players.',
    exploreGuides: 'Explore the guides',
    sortPopular: 'Popular',
    sortLatest: 'Latest',
    sortDiscussed: 'Most discussed',
    home: 'Home',
    forum: 'Forum',
  },
  ui: {
    skipLink: 'Skip to main content',
    browseCheats: 'Try Now',
    browseCheatsMobile: 'Start checkout',
    homeAria: 'Warzone Cheats home',
    checkoutAria: 'Start checkout',
    discordAria: 'Join WarzoneCheats on Discord',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    home: 'Home',
    products: 'Products',
    popular: 'Popular',
    limited: 'Limited',
    warzoneGame: 'Call of Duty Warzone',
    windowsPc: 'Windows PC',
  },
};
