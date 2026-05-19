export type Platform =
  | 'youtube'
  | 'tiktok'
  | 'instagram'
  | 'facebook'
  | 'unknown';

const PLATFORM_PATTERNS: Record<Platform, RegExp> = {
  youtube: /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)/i,
  tiktok: /(?:tiktok\.com\/@[\w.]+\/video\/|vm\.tiktok\.com\/)/i,
  instagram: /instagram\.com\/(?:p|reel|reels)\/[\w-]+/i,
  facebook: /(?:facebook\.com|fb\.watch)\/.*(?:video|reel)/i,
  unknown: /./,
};

export function detectPlatform(url: string): Platform {
  const platforms = ['youtube', 'tiktok', 'instagram', 'facebook'] as const;
  for (const platform of platforms) {
    if (PLATFORM_PATTERNS[platform].test(url)) return platform;
  }
  return 'unknown';
}

export function isSupportedUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      ['http:', 'https:'].includes(parsed.protocol) &&
      detectPlatform(url) !== 'unknown'
    );
  } catch {
    return false;
  }
}
