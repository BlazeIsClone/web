import type { WebSite } from "schema-dts";
import { baseUrl, siteName } from "./config";
import { copy } from "./copy";
import { personRef } from "./person";

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
