/**
 * Public surface of the SEO context.
 *
 * Everything outside `src/seo/` imports from here - never from the files
 * directly. Modules inside the context import each other by relative path so
 * the barrel stays free of cycles.
 */

export {
  baseUrl,
  siteName,
  locale,
  routes,
  siteCreated,
  lastUpdated,
  pageUrl,
  imageUrl,
} from "./config";

export { copy } from "./copy";
export { formatMonth, formatMonthShort, formatRange } from "./dates";
export { pageMetadata } from "./metadata";
export { graph, breadcrumb, ref, pageRef } from "./schema";
export {
  person,
  personRef,
  personId,
  personAnchor,
  personName,
  personJobTitle,
  personDescription,
  personEmail,
  personImage,
  personLocation,
  personProfiles,
  serviceAreas,
  personSkills,
  skillGroups,
  experience,
  education,
  certifications,
  awards,
  currentPosition,
} from "./person";
export type {
  Award,
  Certification,
  Education,
  Employer,
  EmploymentType,
  Position,
} from "./person";
export { website, siteId } from "./site";
export { JsonLd } from "./json-ld";
