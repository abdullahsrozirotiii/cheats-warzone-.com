import type { IconName } from '../components/icons/types';
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
  'ESP, wallhack and Ricochet article',
  blogPostPath('ricochet-safety'),
);
const settingsArticle = link('settings terminology', blogPostPath('cheat-settings'));
const featuresOverview = link('features overview', blogPostPath('cheats-features'));
const espAimbotArticle = link('ESP and wallhack terminology', blogPostPath('esp-aimbot'));
const antiCheatContext = link('anti-cheat context', blogPostPath('ricochet-safety'));
const settingsCoverage = link('PC settings guide', blogPostPath('cheat-settings'));
const hacksCoverage = link('hacks & ESP coverage', blogPostPath('warzone-esp'));
const supportPage = link('Support page', ROUTES.support);
const antiCheatFaqArticle = link(
  'anti-cheat FAQ',
  blogPostPath('anticheat-faq'),
);
const howToGetCheatsArticle = link(
  'how to get PC modules',
  blogPostPath('get-cheats'),
);
const consoleCheatingArticle = link(
  'console cheating guide',
  blogPostPath('console-cheats'),
);
const warzone2CodesArticle = link(
  'legacy codes explainer',
  blogPostPath('warzone-codes'),
);

export const faqData: SiteFaqItem[] = [
  {
    id: 'cost',
    topic: 'products',
    icon: 'faqAfterBuy',
    q: 'How much does it cost?',
    a: a(
      'Monthly access is $35 for 31 days; lifetime access is $150. Confirm the live price on the external checkout page before paying.',
    ),
  },
  {
    id: 'checkout',
    topic: 'setup',
    icon: 'faqProductsPage',
    q: 'Where does checkout happen?',
    a: a(
      'Purchases are completed through an external Buy Now checkout. This site does not process cards or store payment details.',
    ),
  },
  {
    id: 'consoles',
    topic: 'setup',
    icon: 'faqPlatforms',
    q: 'Is it available for consoles?',
    a: a('No. This product is scoped to Windows PC. Console versions are not supported.'),
  },
  {
    id: 'stream-proof',
    topic: 'safety',
    icon: 'faqStreamProof',
    q: 'Can I stream or record my gameplay while using the ESP?',
    a: a(
      'Yes, our visual features are completely stream-proof. The ESP and radar overlays will not show up on OBS, Discord screen share, or standard recording software, keeping your gameplay footage looking entirely legitimate.',
    ),
  },
  {
    id: 'aimbot-settings',
    topic: 'scripts',
    icon: 'faqWhichTierScripts',
    q: 'How customizable are the aimbot settings?',
    a: a(
      'You have full control over the configuration. You can adjust the field of view (FOV), smoothing, and target bone selection, allowing you to fine-tune the assistance from a subtle, natural-looking aim assist to a more aggressive playstyle.',
    ),
  },
  {
    id: 'windows-setups',
    topic: 'setup',
    icon: 'faqPlatforms',
    q: 'Does this work on all modern Windows setups?',
    a: a(
      'Our PC modules support most current Windows 10 and Windows 11 builds for both Intel and AMD processors. We recommend checking the specific OS version requirements listed directly on the product page before completing your checkout.',
    ),
  },
  {
    id: 'status-before-buy',
    topic: 'setup',
    icon: 'faqStatus',
    q: 'How do I confirm current status before buying?',
    a: `Read the status note on the ${productPage} immediately before checkout, and review our ${antiCheatArticle} plus ${settingsArticle} before you buy.`,
  },
  {
    id: 'read-more',
    topic: 'blog',
    icon: 'faqBlogVsCheats',
    q: 'Where can I read more before purchasing?',
    a: `Browse the ${articlesHub} for ${featuresOverview}, ${antiCheatFaqArticle}, ${howToGetCheatsArticle}, ${consoleCheatingArticle}, ${espAimbotArticle}, ${antiCheatContext}, ${settingsCoverage}, and ${hacksCoverage}.`,
  },
  {
    id: 'contact',
    topic: 'setup',
    icon: 'faqDiscordHelp',
    q: 'How do I get in touch?',
    a: `Use the ${supportPage} for questions about our articles or this site. Checkout and payment issues are handled on the external checkout provider's side.`,
  },
  {
    id: 'does-warzone-have-anti-cheat',
    topic: 'safety',
    icon: 'faqStatus',
    q: 'Does Call of Duty Warzone have anti-cheat?',
    a: a(
      'Yes. Activision runs RICOCHET Anti-Cheat on protected Call of Duty titles, including the Battle Royale client on PC. It is not Easy Anti-Cheat — Ricochet combines server-side analytics with a kernel-level driver on Windows. See our ' +
        antiCheatFaqArticle +
        ' for how that relates to ESP and aimbot risk.',
    ),
  },
  {
    id: 'does-cod-warzone-anti-cheat-work',
    topic: 'safety',
    icon: 'faqStatus',
    q: 'Does Warzone anti-cheat work?',
    a: a(
      'Ricochet does detect and action many cheat tools through ban waves, hardware bans, and in-match mitigations. “Does anti-cheat work” is not a yes-or-no forever — enforcement improves after major seasons. Treat any third-party PC tool as risky even when a product note looks calm.',
    ),
  },
  {
    id: 'how-warzone-anti-cheat-works',
    topic: 'safety',
    icon: 'faqBlogVsCheats',
    q: 'How does Warzone anti-cheat work?',
    a: `Ricochet reviews gameplay data server-side and, on PC, loads a kernel driver while Call of Duty runs. TPM 2.0 and Secure Boot attestation matter on current builds. The long-form answer lives in ${antiCheatFaqArticle} alongside ${antiCheatArticle}.`,
  },
  {
    id: 'is-warzone-anti-cheat-good',
    topic: 'safety',
    icon: 'faqStatus',
    q: 'Is Warzone anti-cheat good?',
    a: a(
      'Compared with early Call of Duty seasons, Ricochet is stronger — but “how good is anti-cheat” still depends on patch timing. Players report cleaner lobbies after ban waves, yet new tools appear constantly. Status notes on a seller page are snapshots, not guarantees.',
    ),
  },
  {
    id: 'activision-anti-cheat',
    topic: 'safety',
    icon: 'faqStatus',
    q: 'What is Activision anti-cheat for Warzone?',
    a: a(
      'Activision anti-cheat branding refers to RICOCHET — the same program described as anti-cheat Call of Duty, anti-cheat COD, or simply Ricochet in shorter articles. Console players still benefit from backend review when cross-playing with PC.',
    ),
  },
  {
    id: 'easy-anti-cheat-myth',
    topic: 'safety',
    icon: 'faqBlogVsCheats',
    q: 'Does Warzone use Easy Anti-Cheat?',
    a: a(
      'No. Call of Duty on PC uses Ricochet, developed for the franchise. If a blog mentions Easy Anti-Cheat, it is usually outdated or referring to another game. Confirm enforcement context in the Ricochet articles on this site.',
    ),
  },
  {
    id: 'get-cheats',
    topic: 'setup',
    icon: 'faqProductsPage',
    q: 'How do I get Warzone cheats on PC?',
    a: `Read ${howToGetCheatsArticle}, compare modules on the ${productPage}, then use the external Buy Now checkout. This site explains vocabulary; delivery happens through the seller after payment.`,
  },
  {
    id: 'how-to-get-cheats-console',
    topic: 'setup',
    icon: 'faqPlatforms',
    q: 'How do I get Warzone cheats on PS4, PS5, or Xbox?',
    a: `This listing is Windows PC only. Searches like how to get Warzone cheats on PS4, PS5, or Xbox describe a different ecosystem. See ${consoleCheatingArticle} for why console clients are out of scope here.`,
  },
  {
    id: 'can-console-cheat',
    topic: 'setup',
    icon: 'faqPlatforms',
    q: 'Can console players cheat on Warzone?',
    a: `PC cheat clients do not install on PlayStation or Xbox the same way. Can you cheat on Warzone on PS5, PS4, or Xbox? Mostly through adapters, macros, or account sharing — not the modules on our ${productPage}. ${consoleCheatingArticle} covers the limits.`,
  },
  {
    id: 'can-you-cheat-warzone',
    topic: 'safety',
    icon: 'faqStatus',
    q: 'Can you cheat in Warzone?',
    a: a(
      'Technically, third-party tools exist for PC, but they violate Activision rules and can trigger Ricochet enforcement. “Can you cheat in Warzone” is not the same as “should you” — account bans and hardware bans are documented in official policy.',
    ),
  },
  {
    id: 'free-warzone-cheats',
    topic: 'products',
    icon: 'faqAfterBuy',
    q: 'Are there free Warzone cheats?',
    a: a(
      '“Free downloads” and “free tools” funnels often push malware or outdated loaders. Maintained ESP and aimbot builds cost money to update after patches. This site does not host free downloads — only education and a link to the live paid listing.',
    ),
  },
  {
    id: 'best-warzone-cheats',
    topic: 'products',
    icon: 'faqProductsPage',
    q: 'What are the best Warzone cheats?',
    a: `“Best Warzone cheats” lists online rarely disclose update cadence. Compare transparent module lists, Cloud DMA requirements, and status banners on the ${productPage}, then read ${featuresOverview} for feature vocabulary.`,
  },
  {
    id: 'buy-cod-warzone-cheats',
    topic: 'products',
    icon: 'faqAfterBuy',
    q: 'Where can I buy COD Warzone cheats?',
    a: `Checkout for the WARZONE listing linked from cheats-warzone.com is external. Searchers typing buy COD Warzone cheats should still confirm price and Ricochet status on the ${productPage} the same day they pay.`,
  },
  {
    id: 'shadow-loader',
    topic: 'safety',
    icon: 'faqStatus',
    q: 'Is “shadow cheat Warzone loader download” safe?',
    a: a(
      'Unofficial loader mirrors are a common scam vector. Prefer the seller’s authenticated delivery email after a legitimate purchase instead of random “shadow loader download” links from forums or video descriptions.',
    ),
  },
  {
    id: 'warzone-cheat-codes',
    topic: 'blog',
    icon: 'faqBlogVsCheats',
    q: 'Are there Warzone cheat codes for ranked?',
    a: `No. Meme cheat codes and phrases like “cheat code 2100” refer to single-player or joke posts — not live ESP. ${warzone2CodesArticle} separates codes from real PC tools.`,
  },
  {
    id: 'warzone-2-cheats',
    topic: 'blog',
    icon: 'faqBlogVsCheats',
    q: 'Do Warzone 2 cheats still matter in 2026?',
    a: `Legacy “Warzone 2” searches are outdated labels. Ricochet now covers the integrated client. Read ${warzone2CodesArticle} for how old wording maps to today’s modules.`,
  },
  {
    id: 'macros-streamers',
    topic: 'blog',
    icon: 'faqBlogVsCheats',
    q: 'Are macros cheating in Warzone? What about streamers?',
    a: a(
      'Activision has expanded detections for unauthorized input devices. Macro policy depends on hardware — not on ESP menus. Streamer clip drama does not replace reading a live product status note.',
    ),
  },
  {
    id: 'two-dollar-cheat',
    topic: 'products',
    icon: 'faqAfterBuy',
    q: 'Is a $2 Warzone cheat real?',
    a: a(
      'Extreme discount listings rarely ship maintained builds after Ricochet updates. Treat a “$2 listing” ad as a red flag unless you can verify the same seller on the official checkout path.',
    ),
  },
  {
    id: 'warzone-cheats-pc',
    topic: 'products',
    icon: 'faqPlatforms',
    q: 'Where do I find Warzone cheats for PC?',
    a: `High-intent PC searches all point to the same Windows listing. Compare modules on the ${productPage}, then complete external checkout — we do not host free download mirrors.`,
  },
  {
    id: 'how-to-get-aimbot',
    topic: 'scripts',
    icon: 'faqWhichTierScripts',
    q: 'How do I get aimbot on Warzone?',
    a: `“How to get aimbot” is configuration vocabulary, not a console command. After a legitimate PC purchase, aimbot and Humanizer options appear in the private menu — tune FOV and smoothness using ${settingsArticle} and ${espAimbotArticle}, then confirm the live module list on the ${productPage}.`,
  },
  {
    id: 'ps4-warzone-cheats',
    topic: 'setup',
    icon: 'faqPlatforms',
    q: 'How do you cheat on Warzone PS4?',
    a: `Console how-to phrasing describes clients outside our scope. Can you use PC modules on PlayStation or Xbox? Not with the listing on cheats-warzone.com — read ${consoleCheatingArticle} for cross-play and adapter context.`,
  },
  {
    id: 'warzone-2100-platforms',
    topic: 'blog',
    icon: 'faqBlogVsCheats',
    q: 'Are Warzone 2100 cheats on Linux, Mac, or Cheat Engine real?',
    a: `Meme “2100” posts, wrong-game SEO, and Cheat Engine funnels are usually jokes or malware — not ranked Battle Royale ESP. ${warzone2CodesArticle} explains how those phrases differ from maintained Windows builds.`,
  },
  {
    id: 'cheats-gameplay-clips',
    topic: 'blog',
    icon: 'faqStreamProof',
    q: 'What does “Call of Duty Warzone cheats gameplay” mean in videos?',
    a: a(
      'Gameplay clips with overlays or suspicious aim are marketing or accusation content, not proof a build is online today. Always match what you see in a video to the current product status banner before you pay.',
    ),
  },
  {
    id: 'account-phishing',
    topic: 'safety',
    icon: 'faqStatus',
    q: 'How do I protect my Warzone account from theft?',
    a: a(
      'Ignore account-theft phishing posts and scam DMs. Use official Battle.net or Steam recovery, enable two-factor authentication, and never share portal passwords in Discord or forum threads. Support will never ask for your password — only your order email and error screenshots.',
    ),
  },
];
