/**
 * Site-wide constants. This is the root of the SEO context — nothing here
 * imports from anywhere else, so every other module can depend on it freely.
 */

export const baseUrl = "https://blaze64.dev";

export const siteName = "Sandev Abeykoon";

export const locale = "en_US";

/** Shared social card, used whenever a page has no image of its own. */
export const defaultImage = "/og-image.jpg";

export const routes = {
  home: "/",
  logs: "/logs",
  whoami: "/whoami",
  post: (slug: string) => `/logs/${slug}`,
} as const;

/**
 * Hand-maintained dates for pages with no natural timestamp. Posts derive
 * theirs from MDX frontmatter instead. Feeds both `dateModified` and sitemap
 * `lastmod` so the two can never disagree.
 */
export const lastUpdated = {
  whoami: "2026-07-31",
} as const;

/** Route path -> absolute URL. Root collapses to a bare origin, no trailing slash. */
export const pageUrl = (path: string) =>
  `${baseUrl}${path === routes.home ? "" : path}`;

/** Site-relative image path -> absolute URL, falling back to the site card. */
export const imageUrl = (image?: string) => `${baseUrl}${image ?? defaultImage}`;
