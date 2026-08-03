import type { WebSite } from "schema-dts";
import { baseUrl, siteName } from "./config";
import { copy } from "./copy";
import { personRef } from "./person";

/**
 * The site itself, as an entity. Distinct from the Person (`/whoami#person`)
 * and from the homepage document (`#webpage`): the site is the container, the
 * person is its author, the homepage is one page within it. Keeping the three
 * separate is what stops the homepage and `/whoami` from competing to be the
 * same thing in Google's eyes.
 */
export const siteId = `${baseUrl}#website`;

export const website: WebSite = {
  "@type": "WebSite",
  "@id": siteId,
  url: baseUrl,
  name: siteName,
  description: copy.home.description,
  inLanguage: "en",
  author: personRef,
  publisher: personRef,
};
