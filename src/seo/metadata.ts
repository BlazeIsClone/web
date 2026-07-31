import type { Metadata } from "next";
import { imageUrl, locale, pageUrl, siteName } from "./config";

type PageMeta = {
  title: string;
  description: string;
  /** Route path, e.g. "/", "/logs", "/logs/my-post". Drives canonical + og:url. */
  path: string;
  /** Site-relative image path. Omit to use the shared site card. */
  image?: string;
  imageAlt?: string;
  robots?: Metadata["robots"];
  /** Extra og fields for the page's type (article times, profile names, ...). */
  openGraph?: Metadata["openGraph"];
};

/**
 * Single source for canonical + Open Graph + Twitter tags.
 *
 * Next.js merges metadata *shallowly*: a page declaring its own `openGraph` or
 * `twitter` replaces the layout's object outright, so inherited fields like
 * `images` silently vanish. Building all three together here keeps them in sync
 * and guarantees an image is always present.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  robots,
  openGraph,
}: PageMeta): Metadata {
  const images = [
    {
      url: imageUrl(image),
      width: 1200,
      height: 630,
      alt: imageAlt ?? title,
    },
  ];

  return {
    title,
    description,
    robots,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: pageUrl(path),
      siteName,
      locale,
      type: "website",
      images,
      ...openGraph,
    } as Metadata["openGraph"],
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}
