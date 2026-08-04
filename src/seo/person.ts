import type { Organization, Person } from "schema-dts";
import { pageUrl, routes } from "./config";
import { pageRef } from "./schema";

const whoamiUrl = pageUrl(routes.whoami);

/**
 * Employers. `url` is what lets Google resolve this to a real entity rather
 * than treating the name as a bare string. A `sameAs` LinkedIn company page
 * would strengthen it further.
 */
export const currentEmployer = {
  name: "Bespoke Motor Group",
  url: "https://www.bespokemotorgroup.com",
  linkedIn: "https://www.linkedin.com/company/bespoke-motor-group",
  /** ISO year-month, also rendered as prose in `llms.txt`. */
  startDate: "2026-04",
};

const bespokeMotorGroup: Organization = {
  "@type": "Organization",
  name: currentEmployer.name,
  url: currentEmployer.url,
  sameAs: [currentEmployer.linkedIn],
};

export const personJobTitle = "Full Stack Software Engineer";

export const personEmail = "sandev@blaze64.dev";

export const credential = {
  name: "AWS Certified Solutions Architect – Associate",
  url: "https://www.credly.com/badges/9fdfe798-e0db-49d2-9b42-29c6b92a421b/linked_in_profile",
  issuer: { name: "Amazon Web Services", url: "https://aws.amazon.com" },
};

/**
 * Off-site profiles, labelled. Feeds both the Person `sameAs` (entity
 * resolution) and the `llms.txt` link list, so the two can't drift apart.
 */
export const personProfiles = [
  {
    name: "GitHub",
    url: "https://github.com/BlazeIsClone",
    note: "Source code, side projects, and the tooling behind the logs.",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/sandev-abeykoon/",
    note: "Full work history and roles.",
  },
  {
    name: "Stack Overflow",
    url: "https://stackoverflow.com/users/13940160/sandev-abeykoon",
    note: "Answers, mostly on backend and infrastructure questions.",
  },
];

export const personDescription =
  "Full-stack engineer with 5+ years of experience across DevOps and software engineering, AWS Certified Solutions Architect – Associate.";

/**
 * The full stack, grouped. Rendered on `/whoami` and as the `Skills &
 * Technologies` section of `llms.txt` — one list, so the page can never claim
 * something the machine-readable surfaces don't, or the other way round.
 */
export const skillGroups = [
  {
    name: "Languages",
    items: [
      "Go",
      "TypeScript",
      "JavaScript",
      "PHP",
      "HTML",
      "CSS",
      "SQL",
      "NoSQL",
    ],
  },
  {
    name: "Frontend",
    items: ["React", "Next.js", "TanStack Start", "Tailwind CSS", "SCSS/SASS"],
  },
  {
    name: "Backend and APIs",
    items: [
      "Node.js",
      "Express",
      "Laravel",
      "Convex",
      "REST APIs",
      "GraphQL",
      "JWT authentication",
    ],
  },
  {
    name: "Infrastructure and cloud",
    items: [
      "AWS (EC2, S3, RDS)",
      "Linux (Ubuntu, Debian)",
      "Nginx",
      "Ansible",
      "Cloudflare",
      "Vercel",
      "GitHub Actions",
    ],
  },
  {
    name: "Data and observability",
    items: ["MySQL", "PostgreSQL", "Redis", "Prometheus", "Grafana"],
  },
  {
    name: "Practices",
    items: ["DevOps", "Domain-driven design", "AI agent workflows (n8n)"],
  },
];

/**
 * `knowsAbout` is a deliberate subset of {@link skillGroups}, not the whole
 * thing — a long list of every tool reads as keyword stuffing and dilutes the
 * entity signal. Broad areas first, then the named technologies with the most
 * supporting evidence in the logs.
 */
export const personSkills = [
  "DevOps",
  "Cloud Infrastructure",
  "Backend Development",
  "Web Development",
  "Linux",
  "AWS",
  "Go",
  "TypeScript",
  "React",
  "Next.js",
  "Laravel",
  "Node.js",
  "Ansible",
];

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
  jobTitle: personJobTitle,
  description: personDescription,
  url: whoamiUrl,
  mainEntityOfPage: pageRef(whoamiUrl),
  email: personEmail,
  worksFor: {
    "@type": "EmployeeRole",
    roleName: personJobTitle,
    startDate: currentEmployer.startDate,
    worksFor: bespokeMotorGroup,
  },
  sameAs: [
    ...personProfiles.map((profile) => profile.url),
    "https://lk.linkedin.com/in/sandev-abeykoon",
  ],
  knowsAbout: personSkills,
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "NIBM School of Design, National Innovation Centre",
    url: "https://nibm.ac.lk",
  },
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    name: credential.name,
    credentialCategory: "certification",
    url: credential.url,
    recognizedBy: {
      "@type": "Organization",
      name: credential.issuer.name,
      url: credential.issuer.url,
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
