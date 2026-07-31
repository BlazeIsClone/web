import type { BreadcrumbList, Graph, Thing } from "schema-dts";

/**
 * Wraps nodes in a single `@graph`. Only the graph carries `@context` — nodes
 * inside it must not repeat it, which is the one thing that stops a schema
 * object from being reused freely between a standalone script and a graph.
 */
export const graph = (...nodes: Thing[]): Graph => ({
  "@context": "https://schema.org",
  "@graph": nodes,
});

/** Reference to a node defined elsewhere, resolved by Google via `@id`. */
export const ref = (id: string) => ({ "@id": id }) as const;

export const pageRef = (url: string) =>
  ({ "@type": "WebPage", "@id": url }) as const;

type Crumb = { name: string; url?: string };

/** The trailing crumb is the current page, so its `item` is omitted by design. */
export const breadcrumb = (id: string, trail: Crumb[]): BreadcrumbList => ({
  "@type": "BreadcrumbList",
  "@id": id,
  itemListElement: trail.map(({ name, url }, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name,
    ...(url ? { item: url } : {}),
  })),
});
