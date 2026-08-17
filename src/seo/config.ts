/**
 * Site-wide constants. This is the root of the SEO context - nothing here
 * imports from anywhere else, so every other module can depend on it freely.
 */

export const baseUrl = "https://blaze64.dev";

export const siteName = "Sandev Abeykoon";

export const locale = "en_US";

export const routes = {
  home: "/",
  logs: "/logs",
  resume: "/resume",
  whoami: "/whoami",
  rss: "/rss.xml",
  atom: "/atom.xml",
  jsonFeed: "/feed.json",
  post: (slug: string) => `/logs/${slug}`,
} as const;

/**
 * Google's Profile page structured data rules
 * validate that property as a datetime and reject YYYY-MM-DD.
 */
export const siteCreated = "2024-09-07T00:00:00Z";

/**
 * Hand-maintained dates for pages with no natural timestamp. Posts derive
 * theirs from MDX frontmatter instead. Feeds both `dateModified` and sitemap
 * `lastmod` so the two can never disagree. Full ISO 8601 datetime, not a
 * bare date, for the same reason as `siteCreated` above - the homepage's
 * ProfilePage `dateModified` reuses `resume`.
 */
export const lastUpdated = {
  whoami: "2026-08-15T00:00:00Z",
  resume: "2026-08-15T00:00:00Z",
} as const;

/** Route path -> absolute URL. Root collapses to a bare origin, no trailing slash. */
export const pageUrl = (path: string) =>
  `${baseUrl}${path === routes.home ? "" : path}`;

/** Site-relative image path -> absolute URL. */
export const imageUrl = (image: string) => `${baseUrl}${image}`;
