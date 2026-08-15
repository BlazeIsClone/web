import type { Metadata } from "next";
import { locale, pageUrl, routes, siteName } from "./config";
import { copy } from "./copy";

type PageMeta = {
  title: string;
  description: string;
  /** Route path, e.g. "/", "/logs", "/logs/my-post". Drives canonical + og:url. */
  path: string;
  robots?: Metadata["robots"];
  /** Extra og fields for the page's type (article times, profile names, ...). */
  openGraph?: Metadata["openGraph"];
};

/**
 * Single source for canonical + Open Graph + Twitter tags.
 *
 * Next.js merges metadata *shallowly*: a page declaring its own `openGraph` or
 * `twitter` replaces the layout's object outright, so inherited fields silently
 * vanish if built separately. Building both together here keeps them in sync.
 *
 * OG/Twitter *images* aren't set here - every route resolves an
 * `opengraph-image.tsx` (its own, or the site-wide default at
 * `src/app/opengraph-image.tsx`), and Next.js injects that automatically.
 */
export function pageMetadata({
  title,
  description,
  path,
  robots,
  openGraph,
}: PageMeta): Metadata {
  return {
    title,
    description,
    robots,
    alternates: {
      canonical: path,
      types: {
        "application/rss+xml": [
          { url: routes.rss, title: `${copy.logs.title} (RSS)` },
        ],
        "application/atom+xml": [
          { url: routes.atom, title: `${copy.logs.title} (Atom)` },
        ],
        "application/feed+json": [
          { url: routes.jsonFeed, title: `${copy.logs.title} (JSON Feed)` },
        ],
      },
    },
    openGraph: {
      title,
      description,
      url: pageUrl(path),
      siteName,
      locale,
      type: "website",
      ...openGraph,
    } as Metadata["openGraph"],
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
