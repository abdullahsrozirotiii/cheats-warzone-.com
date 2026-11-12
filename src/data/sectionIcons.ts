import type { IconName } from '../components/icons/types';

export const featureIcons: Record<string, IconName> = {
  Scripts: 'stepCrosshair',
  'Player ESP': 'featureEsp',
  'Radar & Objectives': 'featureRadar',
  'Recoil control': 'featureAimbot',
  'Utility Suite': 'featureUtilitySuite',
  Triggerbot: 'compareAutoFarm',
  'Stream Proof': 'streamProof',
  Radar: 'compareZoomHack',
  'Cloud Config & Updates': 'compareCloudBackup',
};

export const whyUsIcons: IconName[] = ['whyShield', 'whyUsers', 'whyMonitor', 'whyHeadphones'];

export const setupStepIcons: IconName[] = ['acqPackage', 'acqSettings', 'acqCheck'];

export const toolkitIcons: Record<string, IconName> = {
  Combat: 'toolkitCombat',
  Vision: 'toolkitVision',
  Radar: 'toolkitRadar',
  Weapons: 'toolkitWeapons',
  Movement: 'toolkitMovement',
  Profiles: 'toolkitProfiles',
};

export const workflowIcons: IconName[] = [
  'workflowAlert',
  'workflowPackage',
  'workflowSettings',
  'workflowCheck',
];

export const fieldNoteIcons: IconName[] = ['fieldCalendar', 'fieldShield', 'fieldHeadphones'];

export const blogTagIcons: Record<string, IconName> = {
  Guides: 'navBlog',
  Setup: 'settings',
  Features: 'layers',
  Updates: 'refresh',
  Troubleshooting: 'alert',
  Aimbot: 'boneSelect',
  'ESP & Wallhack': 'lootEsp',
  'Warzone Cheats': 'liveStatus',
  Wallhack: 'mapHack',
  Triggerbot: 'triggerBot',
  'Hacks & ESP': 'skeletonEsp',
  'ESP & Aimbot': 'featureEsp',
  Settings: 'settings',
};

export const heroStatusPills: { icon: IconName; label: string }[] = [
  { icon: 'espActive', label: 'ESP' },
  { icon: 'radarOnline', label: 'Radar' },
  { icon: 'seasonBuild', label: 'Warzone PC' },
  { icon: 'undetected', label: 'Windows PC' },
  { icon: 'softAim', label: 'Aim Helper' },
  { icon: 'noRecoil', label: 'Recoil Helper' },
  { icon: 'streamProof', label: 'Stream Proof' },
  { icon: 'lootEsp', label: 'Wallhack' },
  { icon: 'skeletonEsp', label: 'Player ESP' },
  { icon: 'uavRadar', label: 'Zone Radar' },
  { icon: 'mapHack', label: 'Loot & vehicle ESP' },
  { icon: 'support247', label: '24/7 Support' },
  { icon: 'instantDelivery', label: 'Digital Delivery' },
  { icon: 'rankedSafe', label: 'Fair Play' },
  { icon: 'triggerBot', label: 'Triggerbot' },
  { icon: 'boneSelect', label: 'Aimbot' },
  { icon: 'liveStatus', label: 'Status Notes' },
  { icon: 'autoUpdates', label: 'Patch Updates' },
];

export const heroStatIcons: IconName[] = [
  'heroStatStream',
  'heroStatClock',
  'heroStatUsers',
  'heroStatHeadphones',
];

export const cheatTierIcons: Record<string, IconName> = {
  Lite: 'tierLite',
  Pro: 'tierPro',
  Elite: 'tierElite',
  WARZONE: 'tierElite',
};

export const productCategoryIcons: Record<string, IconName> = {
  'Core product': 'coreProduct',
  'External suite': 'externalSuite',
  'DMA hardware': 'dmaHardware',
  'System utility': 'systemUtility',
  'Account recovery': 'accountRecovery',
  Cosmetic: 'cosmetic',
};

export const acquisitionStepIcons: IconName[] = ['acqPackage', 'acqSettings', 'acqZap', 'acqCheck'];

/** After-purchase timeline on product detail — one distinct icon per step */
export const productAcquisitionStepIcons: IconName[] = [
  'liveStatus',
  'acqPackage',
  'headphones',
  'acqCheck',
];

/** Product detail requirement tiles — prefer compat-style icons where mapped */
export const productRequirementIcons: Partial<Record<IconName, IconName>> = {
  reqWindows: 'compatWindows',
  reqSteam: 'compatSteam',
  reqSettings: 'compatPackage',
  reqWifi: 'compatWifi',
  reqCpu: 'compatMonitor',
  reqRestorePoint: 'compatRefresh',
  reqShieldGuide: 'compatShield',
  reqMailOrder: 'mail',
  reqShieldAccount: 'compatShield',
  reqWifiPortal: 'compatWifi',
};

export function requirementDisplayIcon(icon: IconName): IconName {
  return productRequirementIcons[icon] ?? icon;
}

export const compatibilityIcons: IconName[] = [
  'compatWindows',
  'compatPackage',
  'compatSteam',
  'compatMonitor',
  'compatRefresh',
  'compatWifi',
  'compatDiscord',
  'compatShield',
];
