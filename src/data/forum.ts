import type { LocaleCode } from '../i18n/locales';
import { localizeForumPost, localizeForumPosts } from './forum/localize';
import { FORUM_SLUG_REDIRECTS } from '../config/slug-map';

export interface ForumComment {
  author: string;
  age: string;
  score: number;
  body: string;
  replies?: ForumComment[];
}

export interface ForumPost {
  slug: string;
  category: string;
  categoryTone: 'purple' | 'blue' | 'green' | 'orange';
  title: string;
  excerpt: string;
  author: string;
  age: string;
  commentsCount: number;
  upvotes: number;
  flair?: string;
  body: string[];
  comments: ForumComment[];
  sourceTitle?: string;
  sourcePath?: string;
}

export const forumCategories = [
  { name: 'General', tone: 'purple', icon: 'users' },
  { name: 'Guides & Builds', tone: 'blue', icon: 'navBlog' },
  { name: 'Patch Talk', tone: 'orange', icon: 'refresh' },
  { name: 'Community', tone: 'green', icon: 'messageCircle' },
] as const;

function guideDiscussion(input: {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryTone: ForumPost['categoryTone'];
  sourceTitle: string;
  sourcePath: string;
  upvotes: number;
  answer: string;
  detail: string;
  tip: string;
}): ForumPost {
  const { answer, detail, tip, ...post } = input;
  return {
    ...post,
    author: 'guide_team',
    age: '2 days ago',
    commentsCount: 3,
    upvotes: input.upvotes,
    flair: 'Guide Q&A',
    body: [
      answer,
      detail,
      `This Call of Duty Warzone forum thread focuses on: “${input.title}”. Readers usually arrive after skimming “${input.sourceTitle}” (${input.sourcePath}). The short answer above is the editorial takeaway only. The linked blog guide still owns step-by-step wording, menu vocabulary, and the caveats that change when Ricochet or the Warzone client updates.`,
      `Keep module labels separate while you read. ESP and wallhack talk about overlays. Aimbot, silent aim, and triggerbot talk about aiming or fire assists. Radar and recoil helpers answer different mid-round questions. Utilities such as UGC Account Recovery or Skin Changer are not combat ESP. Match the words in this thread to the live product note before you spend money.`,
      `Windows PC scope matters for every reply here. Console Call of Duty Warzone is outside these guides. If your question is about HVCI, Secure Boot, Cloud DMA, or a post-patch status banner, say so explicitly so answers stay on the checklist instead of drifting into unrelated tier comparisons.`,
      `Competitive risk factors remain ever-present. Software modifications can trigger anti-cheat review even during stable operational periods. When the live dashboard reflects maintenance or downtime, hold off until an official green clearance is posted.`,
      `When you are done with this Q&A, open “${input.sourceTitle}” again and skim the product listing that matches your goal. That two-step habit (guide vocabulary → live inventory) is the fastest way to avoid buying from a headline alone.`,
      `Slug reference for this discussion: ${input.slug}. If you bookmark the thread, pair it with the blog path ${input.sourcePath} so you can re-open both after a mid-season patch. Search traffic often lands on short forum titles; the durable definitions still live in the long-form guide.`,
      `If replies here conflict with the product banner, trust the banner. Forum answers lag when Warzone ships hotfixes overnight. Ask again with the new status text pasted in plain language (no keys, no emails) so the next reply can stay accurate for Windows PC players.`,
    ],
    comments: [
      { author: 'guide_team', age: 'From the guide', score: 0, body: tip },
      {
        author: 'guide_team',
        age: 'Follow-up',
        score: 0,
        body: `If this thread (“${input.title}”) still feels thin, the deeper write-up is “${input.sourceTitle}”. Re-check that guide after patches so the forum summary does not drift from the current Windows PC notes.`,
      },
      {
        author: 'site_reader',
        age: 'Reader note',
        score: 1,
        body: `I keep a local note with three fields after reading “${input.title}”: module goal (ESP, aimbot, utility), last status banner text, and the blog slug I used. That beats relying on memory when ranked queues open.`,
      },
    ],
  };
}

const additionalGuidePosts: ForumPost[] = [
  guideDiscussion({
    slug: 'what-does-warzone-map-awareness-include', title: 'What does map awareness include in the guide?', upvotes: 73,
    excerpt: 'A quick breakdown of player ESP, loot, circle timers, and gas alerts covered by the awareness guide.',
    category: 'Guides & Builds', categoryTone: 'blue', sourceTitle: 'Call of Duty Warzone player ESP setup guide', sourcePath: '/warzone-blog/warzone-esp/',
    answer: 'The guide covers player ESP, loot and vehicle markers, circle and contract timers, gas alerts, and last-seen positions. The exact options depend on the selected product tier.',
    detail: 'It recommends starting with a restrained layout and enabling only the information you can read comfortably during a team fight.',
    tip: 'Keep the overlay uncluttered: begin with the core indicators, then adjust the range and visibility settings one at a time.',
  }),
  guideDiscussion({
    slug: 'how-to-set-up-map-overlay', title: 'How should I set up the map overlay for the first time?', upvotes: 58,
    excerpt: 'Start with the basic display options, confirm the overlay in a practice session, then adjust one setting at a time.',
    category: 'Guides & Builds', categoryTone: 'blue', sourceTitle: 'Call of Duty Warzone player ESP setup guide', sourcePath: '/warzone-blog/warzone-esp/',
    answer: 'Use the setup guide to enable the overlay, choose readable colors, and check that the indicators do not cover important parts of the game interface.',
    detail: 'Test your layout in a private match before relying on it in a live match. A simple configuration is easier to understand than turning on every option immediately.',
    tip: 'If the screen feels crowded, reduce the number of indicators before changing their size or position.',
  }),
  guideDiscussion({
    slug: 'what-zoom-settings-are-comfortable', title: 'What camera zoom settings are comfortable to play with?', upvotes: 44,
    excerpt: 'The radar guide focuses on a zone view you can still play from, without covering the killfeed.',
    category: 'Guides & Builds', categoryTone: 'blue', sourceTitle: 'Call of Duty Warzone radar guide', sourcePath: '/warzone-blog/esp-aimbot/',
    answer: 'There is no single ideal radar size for every player. The guide recommends adjusting gradually and checking that you can still read the zone, nearby players, and the killfeed.',
    detail: 'Keep a quick reset to the default camera view available so you can compare the wider view and return to familiar framing.',
    tip: 'Change one step at a time and play a short practice session before settling on a new camera distance.',
  }),
  guideDiscussion({
    slug: 'how-to-tune-script-delay-settings', title: 'How do smoothness and FOV show up in the product notes?', upvotes: 32,
    excerpt: 'A practical question about aimbot smoothness, FOV, and why the settings article stays general.',
    category: 'Guides & Builds', categoryTone: 'blue', sourceTitle: 'Call of Duty Warzone recoil profiles for ranked', sourcePath: '/warzone-blog/cheat-settings/',
    answer: 'The settings article explains how menus talk about recoil helpers, radar, and triggerbots. Exact sliders belong on the product page, because they change after patches.',
    detail: 'A consistent sequence is easier to review and tune than changing several timing values at once.',
    tip: 'Keep a note of each configuration you try so you can return to the last setup that behaved as expected.',
  }),
  guideDiscussion({
    slug: 'warzone-aimbot-and-recoil', title: 'How do players talk about aimbot and recoil?', upvotes: 29,
    excerpt: 'Aim helpers and recoil helpers are separate modules. The article defines the words. The product page lists what is included.',
    category: 'Guides & Builds', categoryTone: 'blue', sourceTitle: 'Mastering Warzone Aimbot & ESP: The Complete Setup Guide', sourcePath: '/warzone-blog/esp-aimbot/',
    answer: 'An aim helper moves toward a target. A recoil helper steadies spray. A triggerbot fires when a target is already under the crosshair. They are not the same module.',
    detail: 'The article stays on Windows PC. Console versions are not supported. Build-specific toggles stay on the product page.',
    tip: 'Read the product note after a patch. An older article is not a current status.',
  }),
  guideDiscussion({
    slug: 'what-is-in-the-elite-tier', title: 'Which combat and utility modules are on the Warzone listing?', upvotes: 67,
    excerpt: 'The feature guide maps ESP, aim helpers, radar, and utilities — confirm the live module list on the product page.',
    category: 'General', categoryTone: 'purple', sourceTitle: 'Warzone cheat settings guide', sourcePath: '/warzone-blog/cheat-settings/',
    answer: 'The settings guide groups aimbot, triggerbot, recoil, ESP, radar, and stream-proof toggles as separate menu labels on the single Warzone product — not separate checkout tiers.',
    detail: 'Utilities such as HWID spoofer, UGC, and Skin Changer live on their own product paths when you need recovery or cosmetics preview.',
    tip: 'Open the product page and match each toggle to the live note after patches.',
  }),
  guideDiscussion({
    slug: 'how-do-lite-and-pro-differ', title: 'ESP and radar vs aim and recoil modules?', upvotes: 53,
    excerpt: 'Awareness modules (ESP, radar) differ from combat helpers (aim, recoil). All are listed on one product page.',
    category: 'General', categoryTone: 'purple', sourceTitle: 'Call of Duty Warzone feature overview', sourcePath: '/warzone-blog/cheats-features/',
    answer: 'The feature overview separates player ESP, loot markers, and radar from aimbot, triggerbot, and recoil helpers so you know which labels to look for before checkout.',
    detail: 'You do not need every module enabled — many players start with ESP readability, then add combat helpers if the live build lists them.',
    tip: 'Read cheats-features, then cheat-settings, before asking menu-specific questions here.',
  }),
  guideDiscussion({
    slug: 'what-to-know-about-skin-changer', title: 'What should I know about the Skin Changer utility?', upvotes: 38,
    excerpt: 'The product guide explains how cosmetic previews work and what to expect from the utility.',
    category: 'General', categoryTone: 'purple', sourceTitle: 'Call of Duty Warzone Skin Changer guide', sourcePath: '/warzone-blog/cheats-features/',
    answer: 'The guide describes Skin Changer as a local cosmetic preview utility. It explains setup, supported options, and how to restore the default appearance.',
    detail: 'Review the compatibility notes and follow the current setup instructions before using the utility.',
    tip: 'Cosmetic changes are local previews; check the guide for current limitations and setup steps.',
  }),
  guideDiscussion({
    slug: 'what-to-do-if-vac-cannot-verify', title: 'What should I do if Ricochet cannot verify my Call of Duty Warzone install?', upvotes: 24,
    excerpt: 'Start with Battle.net or Steam file verification and a clean restart before assuming the issue is an account restriction.',
    category: 'Patch Talk', categoryTone: 'orange', sourceTitle: 'Ricochet unable to verify Call of Duty Warzone install', sourcePath: '/warzone-blog/ricochet-safety/',
    answer: 'The troubleshooting guide says the message can result from game-file problems or software conflicts and does not always mean an account ban. First verify Call of Duty Warzone files through Battle.net or Steam.',
    detail: 'It also recommends fully exiting Battle.net or Steam, restarting the PC, and checking for conflicting overlays before trying more disruptive steps.',
    tip: 'Test a normal Battle.net or Steam launch before starting other software so you can narrow down the cause.',
  }),
  guideDiscussion({
    slug: 'how-does-an-external-loader-work', title: 'What does “external loader” mean?', upvotes: 46,
    excerpt: 'The external software guide explains the term and outlines the general setup described on the site.',
    category: 'General', categoryTone: 'purple', sourceTitle: 'Call of Duty Warzone external cheat guide', sourcePath: '/warzone-blog/ricochet-safety/',
    answer: 'The article uses “external” to describe software that runs separately from the Call of Duty Warzone process and presents its interface as an overlay.',
    detail: 'It discusses the architecture at a high level and explains setup, patch updates, and the differences described between external and internal tools.',
    tip: 'Check compatibility and current status information whenever Call of Duty Warzone receives an update.',
  }),
  guideDiscussion({
    slug: 'how-to-check-stream-proof-capture', title: 'How can I check whether OBS captures an overlay?', upvotes: 21,
    excerpt: 'The stream-proof setup guide recommends recording a short test and checking the playback before streaming.',
    category: 'Guides & Builds', categoryTone: 'blue', sourceTitle: 'Stream-proof overlay setup for Call of Duty Warzone', sourcePath: '/warzone-blog/cheat-settings/',
    answer: 'Record a short local test with the exact OBS scene and capture mode you plan to use, then review the playback for any overlay elements.',
    detail: 'The guide recommends testing game capture and display capture separately, since capture methods and multi-monitor setups can behave differently.',
    tip: 'Do not rely on the preview alone; review a saved recording from the same scene you intend to stream.',
  }),
  guideDiscussion({
    slug: 'what-to-do-after-hwid-change', title: 'What should I check after changing PCs or hardware?', upvotes: 33,
    excerpt: 'After a PC or hardware change, check the product notes and contact support if the account or device needs a reset.',
    category: 'General', categoryTone: 'purple', sourceTitle: 'Call of Duty Warzone product notes', sourcePath: '/warzone-blog/ricochet-safety/',
    answer: 'Start by checking the account and device notes for your product, then contact support if something still looks wrong.',
    detail: 'Avoid changing several system settings at once. If the product does not recognize your device, contact support with the relevant error details.',
    tip: 'Use the official support path for device resets instead of relying on unrelated third-party tools.',
  }),
  guideDiscussion({
    slug: 'what-to-check-before-installing-tools', title: 'What should I review before installing a new tool?', upvotes: 18,
    excerpt: 'Check the official setup steps, current compatibility notes, and support information before proceeding.',
    category: 'Community', categoryTone: 'green', sourceTitle: 'Call of Duty Warzone cheats features guide', sourcePath: '/warzone-blog/cheats-features/',
    answer: 'Read the feature and setup information first, confirm that it matches your system, and check the current update/status notes.',
    detail: 'The site guide describes the available feature groups and links to more specific setup articles for individual modules.',
    tip: 'Use the linked product and support pages as the source of truth for current availability and compatibility.',
  }),
  guideDiscussion({
    slug: 'does-warzone-have-anti-cheat-forum',
    title: 'Does Call of Duty Warzone have anti-cheat in 2026?',
    upvotes: 91,
    excerpt: 'Ricochet on PC, TPM attestation, and why Easy Anti-Cheat is the wrong name in search results.',
    category: 'Patch Talk',
    categoryTone: 'orange',
    sourceTitle: 'Warzone Anti-Cheat FAQ 2026',
    sourcePath: '/warzone-blog/anticheat-faq/',
    answer:
      'Yes — Warzone uses Activision RICOCHET, not Easy Anti-Cheat. Server analytics plus a kernel driver run on PC while the game is open.',
    detail:
      'Questions like does Warzone anti-cheat work or is Warzone anti-cheat good depend on patch timing. Treat any ESP or aimbot listing as risky even when lobbies feel clean.',
    tip: 'Read the anti-cheat FAQ, then re-check the product status banner after every Ricochet blog post from Activision.',
  }),
  guideDiscussion({
    slug: 'how-to-get-warzone-cheats-forum',
    title: 'How do I get Warzone cheats on PC without shady loaders?',
    upvotes: 84,
    excerpt: 'Checkout flow, delivery email, and why shadow loader download links are risky.',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    sourceTitle: 'How to Get Warzone Cheats on PC (2026 Buyer Checklist)',
    sourcePath: '/warzone-blog/get-cheats/',
    answer:
      'Learn module words, confirm Windows and Cloud DMA notes, pay through the official checkout, and install only from the seller’s authenticated delivery path.',
    detail:
      'How to get cheats on Warzone PS4 or Xbox is out of scope — those searches should not end in a PC loader.',
    tip: 'Keep your order email private; Support needs it, public forums do not.',
  }),
  guideDiscussion({
    slug: 'can-console-players-cheat-warzone',
    title: 'Can console players cheat on Warzone?',
    upvotes: 76,
    excerpt: 'PS4, PS5, and Xbox limits versus PC Warzone cheats and cross-play.',
    category: 'Community',
    categoryTone: 'green',
    sourceTitle: 'Can You Cheat on Warzone Console? PS4, PS5 & Xbox Limits',
    sourcePath: '/warzone-blog/console-cheats/',
    answer:
      'This site documents Windows PC modules. Console clients cannot install the same external ESP and aimbot stacks.',
    detail:
      'Can you cheat on Warzone on PS5 or Xbox threads often confuse adapters with PC cheats — Ricochet still reviews backend data in mixed lobbies.',
    tip: 'If your question is console-only, read the console guide before asking for PC checkout links.',
  }),
  guideDiscussion({
    slug: 'warzone-2-cheats-and-codes-forum',
    title: 'Warzone 2 cheats vs Warzone cheat codes — what is real?',
    upvotes: 62,
    excerpt: 'Legacy Warzone 2.0 wording, free cheat scams, and meme cheat code posts.',
    category: 'General',
    categoryTone: 'purple',
    sourceTitle: 'Warzone 2 Cheats, Cheat Codes & Free Download Myths (2026)',
    sourcePath: '/warzone-blog/warzone-codes/',
    answer:
      'Warzone 2 cheats is mostly legacy SEO. Warzone cheat codes and cheat code Warzone 2100 posts are not ranked ESP.',
    detail:
      'Free Warzone cheats and $2 Warzone cheat ads rarely ship maintained builds after Ricochet updates.',
    tip: 'Use the product page for live modules — not recycled code lists from old seasons.',
  }),
  guideDiscussion({
    slug: 'are-warzone-streamers-cheating-forum',
    title: 'Are Warzone streamers cheating? Macros and clip culture',
    upvotes: 55,
    excerpt: 'Streamer accusations, macro policy, and why clips do not replace status banners.',
    category: 'Community',
    categoryTone: 'green',
    sourceTitle: 'Warzone 2 Cheats, Cheat Codes & Free Download Myths (2026)',
    sourcePath: '/warzone-blog/warzone-codes/',
    answer:
      'Threads about are Warzone streamers cheating or did Nadia cheat in Warzone are about public evidence — not seller inventory.',
    detail:
      'Are macros cheating in Warzone is a separate hardware-policy topic Activision has addressed in Ricochet season notes.',
    tip: 'Judge your own risk from product status and policy, not from viral clips alone.',
  }),
  guideDiscussion({
    slug: 'how-to-choose-warzone-product-tier', title: 'How do I choose the right Call of Duty Warzone product tier?', upvotes: 48,
    excerpt: 'Compare the feature sets first, then follow the official checkout and setup instructions for your selection.',
    category: 'Community', categoryTone: 'green', sourceTitle: 'How to buy Call of Duty Warzone cheats in 2026', sourcePath: '/warzone-blog/cheats-features/',
    answer: 'The buying guide recommends comparing included features and choosing the tier that fits your needs before continuing through the official checkout.',
    detail: 'It covers the purchase flow, account access, downloading the current build, and checking setup instructions before launching.',
    tip: 'If you have a payment or account question, use the site support page and avoid sharing purchase details publicly.',
  }),
  guideDiscussion({
    slug: 'warzone-cheats-pc-forum',
    title: 'Best Warzone cheats PC — what to verify before checkout',
    upvotes: 71,
    excerpt: 'Warzone cheats for PC, buy Warzone cheats PC, and COD Warzone cheats PC free myths.',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    sourceTitle: 'How to Get Warzone Cheats on PC (2026 Buyer Checklist)',
    sourcePath: '/warzone-blog/get-cheats/',
    answer:
      'Warzone cheats PC searches should land on a Windows module list with a live Ricochet status note — not a random EXE or “COD Warzone cheats PC free” mirror.',
    detail:
      'Call of duty warzone cheats PC, cheat for Warzone PC, and cheats Warzone PC are the same buyer checklist: Cloud DMA notes, HVCI, and delivery email after payment.',
    tip: 'Screenshot the status banner the day you pay so Support can match your ticket to the right build.',
  }),
  guideDiscussion({
    slug: 'how-to-cheat-warzone-ps4-forum',
    title: 'How to cheat on Warzone PS4 — why PC guides differ',
    upvotes: 64,
    excerpt: 'PS4 Call of Duty Warzone cheats, how to get cheats on Warzone PS4, and console scope.',
    category: 'Community',
    categoryTone: 'green',
    sourceTitle: 'Can You Cheat on Warzone Console? PS4, PS5 & Xbox Limits',
    sourcePath: '/warzone-blog/console-cheats/',
    answer:
      'How to cheat in Warzone on PS4 and how to get Warzone cheats on PS4 describe PlayStation clients — not the Battle.net or Steam modules on cheats-warzone.com.',
    detail:
      'Can PS4 players cheat on Warzone threads often mix adapters with PC ESP. Cross-play still sees backend Ricochet review when lobbies include PC.',
    tip: 'If you only play console, read the console guide before asking for PC checkout links in this forum.',
  }),
];

function expandForumPost(post: ForumPost): ForumPost {
  const source = post.sourceTitle ?? 'the linked Warzone Cheats guide';
  const path = post.sourcePath ?? '/warzone-blog/';
  const extraBody = [
    `For durable definitions of ESP, wallhack, aimbot, radar, recoil helpers, and utilities, read “${source}” (${path}). Re-check the live product note after Warzone or Ricochet updates before ranked.`,
    `This thread (${post.category}) is discussion only—not checkout. Keep order emails and license keys private; use Support for delivery issues.`,
  ];
  const extraComments: ForumComment[] = [
    {
      author: 'guide_team',
      age: 'Editor note',
      score: 2,
      body: `Blogs explain words; the product page lists live modules. Windows PC Battle.net or Steam only.`,
    },
  ];
  const comments = [...post.comments, ...extraComments];
  return {
    ...post,
    body: [...post.body, ...extraBody],
    comments,
    commentsCount: comments.length,
  };
}

const forumPostsRaw: ForumPost[] = [
  {
    slug: 'what-to-ask-before-buying-warzone', category: 'General', categoryTone: 'purple',
    title: 'What should I ask before I buy?',
    excerpt: 'Ask about modules, price, and Windows PC scope. Confirm the notes on the product page before checkout.',
    author: 'guide_team', age: '2 hours ago', commentsCount: 3, upvotes: 128, flair: 'Guide Q&A',
    sourceTitle: 'Call of Duty Warzone feature overview', sourcePath: '/warzone-blog/cheats-features/',
    body: [
      'Product questions belong here: modules and what the product page covers for Windows PC. Confirm the notes there before you buy.',
      'Checkout is external; this forum preview does not store card details or pricing.',
      'If you need utilities such as HWID spoofer, UGC, or Skin Changer, say whether your goal is awareness, combat helpers, recovery, or cosmetics so replies stay on topic.',
      'Before checkout, write down three checks: Windows PC only, live module list for ESP or aimbot if that is your goal, and the status banner after the latest Warzone or Ricochet patch. Asking those three questions in this thread keeps replies useful instead of generic.',
      'This discussion is not a substitute for “Call of Duty Warzone feature overview” on the blog. Use the guide for vocabulary, then return to the product listing for price and availability. Fair-play risk remains with any third-party tool.',
    ],
    comments: [
      { author: 'site_reader', age: '1 hour ago', score: 24, body: 'I check the product page for the live price before I use Buy Now.' },
      { author: 'pc_only', age: '48 min. ago', score: 11, body: 'Console is not supported. This listing is the Warzone PC client.' },
      { author: 'status_note', age: '35 min. ago', score: 8, body: 'An older blog post is not a current status. Read the product note first.' },
    ],
  },
  {
    slug: 'where-warzone-setup-questions-go', category: 'General', categoryTone: 'purple',
    title: 'Where do setup questions go?',
    excerpt: 'Setup talk is for the Windows PC product. Step-by-step checklists live in the guides, not in this thread.',
    author: 'guide_team', age: '4 hours ago', commentsCount: 2, upvotes: 86, flair: 'Guide Q&A',
    sourceTitle: 'How Call of Duty Warzone tiers differ', sourcePath: '/warzone-blog/cheat-settings/',
    body: [
      'Discuss setup questions for the Windows PC product. For a checklist, use the guides: confirm Windows, read the product notes, and know that delivery is digital after payment.',
      'HVCI, Core Isolation, TPM, and Secure Boot are listed on the product page when they apply to your Windows build.',
      'If your question is about menu labels—FOV, smoothness, radar distance, stream-proof capture—start with the settings guide, then confirm which of those controls appear on the live listing. This thread is for routing questions, not for inventing a second feature list.',
      'Loader errors and checkout access issues belong on Support with your order email attached. Public forum replies cannot reset devices or open purchase tickets. Keep account details out of this preview.',
    ],
    comments: [
      { author: 'windows_pc', age: '3 hours ago', score: 17, body: 'I confirm Windows 10 or 11 before I look at price.' },
      { author: 'guide_link', age: '2 hours ago', score: 9, body: 'The settings article explains the words. The product page lists the current modules.' },
    ],
  },
  {
    slug: 'practice-warzone-site-setups', category: 'Guides & Builds', categoryTone: 'blue',
    title: 'What is the safest way to practice map awareness?',
    excerpt: 'Use a private match and conservative ESP toggles to study POI sight lines, then restore defaults and check the result.',
    author: 'guide_team', age: '6 hours ago', commentsCount: 2, upvotes: 64, flair: 'Guide Q&A',
    sourceTitle: 'Call of Duty Warzone ranked notes and tips', sourcePath: '/warzone-blog/warzone-esp/',
    body: [
      'Use a private match to learn POIs and loadout setups. The product listing is separate: player ESP, aimbot, and recoil layers for Windows PC.',
      'Loot & vehicle ESP on the product page names cash piles, loot crates, vehicles, and buy stations.',
      'Practice without treating a blog overlay screenshot as ranked clearance. Learn the map layout first, then decide whether ESP, wallhack-style markers, or radar language on the listing matches what you actually need.',
      'When you move from custom games to live play, re-read the status note. A setup that felt readable in a private match can still be blocked if the product banner says updating after a patch.',
    ],
    comments: [
      { author: 'site_setup', age: '5 hours ago', score: 13, body: 'I learn the map in a private match, then read the product note before ranked.' },
      { author: 'map_reader', age: '4 hours ago', score: 6, body: 'Radar is a compact zone map. It is not the in-game compass.' },
    ],
  },
  {
    slug: 'what-to-check-after-a-warzone-patch', category: 'Patch Talk', categoryTone: 'orange',
    title: 'What should I check before playing after a Warzone patch?',
    excerpt: 'The patch-day checklist recommends checking build status, updating, and testing in a private match before queueing.',
    author: 'guide_team', age: '9 hours ago', commentsCount: 2, upvotes: 42, flair: 'Guide Q&A',
    sourceTitle: 'Ricochet patch day checklist', sourcePath: '/warzone-blog/ricochet-safety/',
    body: [
      'Check the current build/status notice first. After a game update, wait for a compatible build, update the loader, then verify the setup in a bot or Resurgence lobby before returning to ranked.',
      'If anything behaves unexpectedly, stop and review the status notes rather than assuming the old setup still applies. The checklist covers the patch-day routine in more detail.',
      'ESP, aimbot, and wallhack labels in older posts do not override a fresh Ricochet or Warzone client change. Treat “undetected” marketing language as search vocabulary, not a permanent clear.',
      'Share only non-sensitive details here: Windows version, whether the banner says online or updating, and whether you already reinstalled the current loader. Skip account passwords and license keys.',
    ],
    comments: [
      { author: 'patch_reader', age: '8 hours ago', score: 12, body: 'Testing after the update before ranked is the part I used to skip. Now I check the product note first.' },
      { author: 'support_main_5', age: '7 hours ago', score: 7, body: 'Agree. If the build/status has not caught up, wait. A checklist is better than guessing.' },
    ],
  },
  {
    slug: 'warzone-aim-and-recoil', category: 'Community', categoryTone: 'green',
    title: 'Where are aim and recoil listed on the product page?',
    excerpt: 'Combat helpers are separate menu labels from ESP and radar — confirm them on the Warzone listing.',
    author: 'guide_team', age: '12 hours ago', commentsCount: 1, upvotes: 31, flair: 'Guide Q&A',
    sourceTitle: 'Warzone recoil vs aimbot guide', sourcePath: '/warzone-blog/recoil-aimbot/',
    body: [
      'The recoil guide keeps spray helpers separate from aimbot and ESP. Combat modules share a menu on the single Warzone product — there are no Lite or Pro checkout tiers on cheats-warzone.com.',
      'Start with ESP readability, then enable recoil or aim helpers only if the live note lists them.',
      'If your goal is awareness only, say so—replies can stay on vision tools instead of script settings.',
      'Always confirm the live product page after patches; forum nicknames for modules can lag behind the banner.',
    ],
    comments: [
      { author: 'one_more_game', age: '10 hours ago', score: 10, body: 'The recoil article helped me see why spray and aim sliders are not the same toggle.' },
    ],
  },
  {
    slug: 'warzone-settings-before-launch', category: 'Guides & Builds', categoryTone: 'blue',
    title: 'How do I read settings before the first launch?',
    excerpt: 'Menus talk about recoil helpers, radar, and triggerbots. The product page says which of those are in the current build.',
    author: 'guide_team', age: '1 day ago', commentsCount: 2, upvotes: 27, flair: 'Guide Q&A',
    sourceTitle: 'Call of Duty Warzone feature overview', sourcePath: '/warzone-blog/cheats-features/',
    body: [
      'The settings article is a plain read on how menus talk about recoil helpers, radar, triggerbots, and related controls so the product notes make more sense.',
      'It does not replace the product page. Price, modules, and status stay there—confirm those live fields before you pay.',
      'After you learn the vocabulary, open the main Warzone listing or the utility page that matches your goal and re-check the status banner if Warzone just patched.',
      'A useful first-launch order: read the feature overview, skim settings terminology, confirm Windows requirements, then open checkout only if the live note matches what you want. Skip copying FOV numbers from unrelated screenshots.',
    ],
    comments: [
      { author: 'settings_reader', age: '20 hours ago', score: 10, body: 'I read the settings article first, then the product page, before Buy Now.' },
      { author: 'pc_only', age: '18 hours ago', score: 5, body: 'Windows PC only. Console versions are not supported.' },
    ],
  },
  ...additionalGuidePosts,
];

export const forumPosts: ForumPost[] = forumPostsRaw.map(post => expandForumPost({ ...post, slug: FORUM_SLUG_REDIRECTS[post.slug] ?? post.slug }));

export function getForumPost(slug: string, locale: LocaleCode = 'en'): ForumPost | undefined {
  const post = forumPosts.find((p) => p.slug === (FORUM_SLUG_REDIRECTS[slug] ?? slug));
  return post ? localizeForumPost(post, locale) : undefined;
}

export function getLocalizedForumPosts(locale: LocaleCode) {
  return localizeForumPosts(forumPosts, locale);
}
