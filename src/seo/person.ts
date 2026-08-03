import type { Organization, Person } from "schema-dts";
import { pageUrl, routes } from "./config";
import { pageRef } from "./schema";

const whoamiUrl = pageUrl(routes.whoami);

/**
 * Employers. `url` is what lets Google resolve this to a real entity rather
 * than treating the name as a bare string. A `sameAs` LinkedIn company page
 * would strengthen it further.
 */
const bespokeMotorGroup: Organization = {
  "@type": "Organization",
  name: "Bespoke Motor Group",
  url: "https://www.bespokemotorgroup.com",
  sameAs: ["https://www.linkedin.com/company/bespoke-motor-group"],
};

/**
 * The site's single Person entity. Everything that references the author
 * points at this `@id`, so Google consolidates it into one node.
 */
export const personId = `${whoamiUrl}#person`;

export const personName = "Sandev Abeykoon";

export const person: Person = {
  "@id": personId,
  "@type": "Person",
  name: personName,
  jobTitle: "Full Stack Software Engineer",
  description:
    "Full-stack engineer with 5+ years of experience across DevOps and software engineering, AWS Certified Solutions Architect – Associate.",
  url: whoamiUrl,
  mainEntityOfPage: pageRef(whoamiUrl),
  email: "sandev@blaze64.dev",
  worksFor: {
    "@type": "EmployeeRole",
    roleName: "Full Stack Software Engineer",
    startDate: "2026-04",
    worksFor: bespokeMotorGroup,
  },
  sameAs: [
    "https://github.com/BlazeIsClone",
    "https://www.linkedin.com/in/sandev-abeykoon/",
    "https://lk.linkedin.com/in/sandev-abeykoon",
    "https://stackoverflow.com/users/13940160/sandev-abeykoon",
  ],
  knowsAbout: [
    "DevOps",
    "Cloud Infrastructure",
    "Backend Development",
    "Web Development",
    "Linux",
    "AWS",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "NIBM School of Design, National Innovation Centre",
    url: "https://nibm.ac.lk",
  },
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    name: "AWS Certified Solutions Architect – Associate",
    credentialCategory: "certification",
    url: "https://www.credly.com/badges/9fdfe798-e0db-49d2-9b42-29c6b92a421b/linked_in_profile",
    recognizedBy: {
      "@type": "Organization",
      name: "Amazon Web Services",
      url: "https://aws.amazon.com",
    },
  },
};

/** Lightweight reference for nesting inside other nodes — resolves via `@id`. */
export const personRef: Person = {
  "@type": "Person",
  "@id": personId,
  name: personName,
  url: whoamiUrl,
};
