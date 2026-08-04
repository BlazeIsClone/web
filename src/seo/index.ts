/**
 * Public surface of the SEO context.
 *
 * Everything outside `src/seo/` imports from here — never from the files
 * directly. Modules inside the context import each other by relative path so
 * the barrel stays free of cycles.
 */

export {
  baseUrl,
  siteName,
  locale,
  defaultImage,
  routes,
  lastUpdated,
  pageUrl,
  imageUrl,
} from "./config";

export { copy } from "./copy";
export { pageMetadata } from "./metadata";
export { graph, breadcrumb, ref, pageRef } from "./schema";
export {
  person,
  personRef,
  personId,
  personName,
  personJobTitle,
  personDescription,
  personEmail,
  personProfiles,
  personSkills,
  skillGroups,
  currentEmployer,
  credential,
} from "./person";
export { website, siteId } from "./site";
export { JsonLd } from "./json-ld";
