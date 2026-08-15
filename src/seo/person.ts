import type {
  AdministrativeArea,
  CollegeOrUniversity,
  EducationalOccupationalCredential,
  EmployeeRole,
  HighSchool,
  Organization,
  Person,
  Place,
} from "schema-dts";
import { baseUrl, imageUrl, pageUrl, routes } from "./config";
import { ref } from "./schema";

const homeUrl = pageUrl(routes.home);

export type EmploymentType =
  | "Full-time"
  | "Part-time"
  | "Contract"
  | "Freelance"
  | "Internship";

export type Position = {
  title: string;
  employmentType: EmploymentType;
  /** ISO year-month, e.g. "2026-04". */
  startDate: string;
  /** Absent means current. The first open-ended position in array order is the primary role. */
  endDate?: string;
  location: string;
  /**
   * One-line compression of the role for `/`, worded distinctly from
   * `highlights` so the two pages never share a sentence.
   */
  summary: string;
  /** Full detail, `/resume` only. */
  highlights: readonly string[];
  /** Log slugs that evidence this position, resolved to titles at build time. */
  relatedPosts?: readonly string[];
};

export type Employer = {
  name: string;
  /** Omit when the company has no verified public site - a wrong URL misidentifies the entity. */
  url?: string;
  /** Company page - becomes the Organization `sameAs`. */
  linkedIn?: string;
  /** Newest first. Two or more entries = a promotion track at one company. */
  positions: readonly [Position, ...Position[]];
};

export type Certification = {
  name: string;
  /** Public verification page (Credly badge, etc.). */
  url: string;
  issuer: { name: string; url: string };
  /** ISO year or year-month. */
  issued?: string;
  expires?: string;
  credentialId?: string;
};

export type Education = {
  institution: string;
  url: string;
  organizationType: "CollegeOrUniversity" | "HighSchool";
  /** The award, e.g. "BA (Hons) Visual Communication Design". */
  qualification: string;
  fieldOfStudy?: string;
  startYear?: string;
  endYear?: string;
};

export type Award = {
  name: string;
  by: string;
  year: string;
  detail: string;
};

export const experience: readonly Employer[] = [
  {
    name: "Bespoke Motor Group",
    url: "https://www.bespokemotorgroup.com",
    linkedIn: "https://www.linkedin.com/company/bespoke-motor-group",
    positions: [
      {
        title: "Software Engineer",
        employmentType: "Full-time",
        startDate: "2026-04",
        location: "New York, United States | Remote",
        summary:
          "Leads platform engineering for a luxury dealership group: a market intelligence ETL platform, a local-first sales PWA, and the brand marketing sites.",
        highlights: [
          "Platform engineering for a 50-person dealership group operating Bentley, Rolls-Royce, Lamborghini and Porsche franchises.",
          "Led the system design and delivery of an in-house market intelligence platform featuring an ETL pipeline that scrapes and processes 50,000+ vehicles weekly, surfacing insights on pricing, regional dominance, and model market share.",
          "Architected a local-first inventory eCatalog PWA with React, used daily by 25+ sales agents on showroom iPads, persisting inventory to IndexedDB for instant in-memory filtering and syncing every device through a shared Server-Sent Events stream.",
          "Built scalable REST APIs with NestJS, Node.js, and PostgreSQL powering inventory management and inventory syndication across the Dealer Management System, secured via Microsoft Entra ID (SSO).",
          "Developed responsive marketing websites for the Bentley, Rolls-Royce and Lamborghini brands with Next.js, HTML/CSS and Payload CMS, using server-side rendering for page performance and SEO visibility.",
        ],
        relatedPosts: ["local-first-pwa", "distributed-architecture"],
      },
    ],
  },
  {
    name: "BudgetBuy AI",
    positions: [
      {
        title: "Software Engineer",
        employmentType: "Part-time",
        startDate: "2026-06",
        location: "Melbourne, Australia | Remote",
        summary:
          "Builds a multi-tenant AI lead-capture SaaS: RAG retrieval, workflow agents, and a hardened API gateway.",
        highlights: [
          "AI-powered lead-capture SaaS for Australian SMBs, processing 5,000+ monthly interactions across voice and chat channels.",
          "Architected a multi-tenant service based platform featuring Stripe subscription billing, a RAG pipeline on PostgreSQL with Edge Functions for document ingestion and vector retrieval, and N8N workflows with OpenAI agents.",
          "Engineered a security-hardened API gateway in Express.js/TypeScript, enforcing tenant isolation via Row-Level Security and JWT authentication, while handling 100k+ daily requests and plan-based quotas.",
        ],
        relatedPosts: ["jwt-microservice-auth"],
      },
    ],
  },
  {
    name: "Maya Hive",
    url: "https://mayahive.com",
    positions: [
      {
        title: "DevOps Engineer",
        employmentType: "Full-time",
        startDate: "2022-01",
        endDate: "2026-03",
        location: "Colombo, Sri Lanka",
        summary:
          "Automated secure Linux server provisioning with Ansible and Docker, with delivery running through GitHub Actions CI/CD pipelines.",
        highlights: [
          "Full-stack delivery and ownership of platform engineering within a seven-person Agile product team.",
          "Architected a multi-tenant CRM with Laravel, PHP and REST APIs supporting 6,000+ weekly leads across client tenants.",
          "Engineered a Delivery Management System for JAT Holdings PLC with route optimization to handle 200+ daily deliveries.",
          "Integrated Stripe, PayHere, Cybersource, WEBXPAY and MPGS payment gateways across PCI-sensitive checkout flows.",
          "Designed scalable data architectures using SQL/NoSQL databases such as MySQL and MongoDB.",
          "Architected secure Linux environments using Ansible and Docker, integrated GitHub Actions CI/CD.",
          "Maintained 99.7% uptime SLA and Disaster Recovery (RTO/RPO) via SRE-focused Grafana and Prometheus observability.",
        ],
        relatedPosts: [
          "ansible-cloud-config",
          "monitoring-system",
          "building-on-premise-server",
        ],
      },
      {
        title: "Web Development Intern",
        employmentType: "Internship",
        startDate: "2021-09",
        endDate: "2021-12",
        location: "Colombo, Sri Lanka",
        summary:
          "Delivered CMS-driven client websites during a four-month internship.",
        highlights: [
          "Contributed to client projects leveraging CMS features to create personalized and dynamic websites.",
          "Built responsive WordPress sites with PHP, HTML, SASS and JavaScript, managing code in Git within Agile sprint cycles.",
        ],
        relatedPosts: ["wordpress-survival-guide"],
      },
    ],
  },
];

export const certifications: readonly Certification[] = [
  {
    name: "AWS Certified Solutions Architect – Associate",
    url: "https://www.credly.com/badges/9fdfe798-e0db-49d2-9b42-29c6b92a421b/linked_in_profile",
    issuer: { name: "Amazon Web Services", url: "https://aws.amazon.com" },
    issued: "2026",
    credentialId: "SAA-C03",
  },
];

export const education: readonly Education[] = [
  {
    institution: "Limkokwing University of Creative Technology",
    url: "https://www.limkokwing.net",
    organizationType: "CollegeOrUniversity",
    qualification: "BA (Hons) Visual Communication Design",
    fieldOfStudy: "Visual Communication Design",
    startYear: "2018",
    endYear: "2022",
  },
  {
    institution: "S. Thomas' College, Mount Lavinia",
    url: "https://www.stcmount.edu.lk",
    organizationType: "HighSchool",
    qualification: "GCE Ordinary Level",
    startYear: "2007",
    endYear: "2017",
  },
];

export const awards: readonly Award[] = [
  {
    name: "HaXmas Hackathon – 2nd place",
    by: "Rotaract Club of IIT",
    year: "2021",
    detail:
      "Secured 2nd place for ReClima, an SDG-aligned mobile strategy game built on Unity with C#. Led level design and core game mechanics within a 5-member team to launch an MVP.",
  },
];

export const personLocation = {
  city: "Colombo",
  region: "Western Province",
  country: "Sri Lanka",
  /** ISO 3166-1 alpha-2, for `PostalAddress.addressCountry`. */
  countryCode: "LK",
  timeZone: "Asia/Colombo",
  /** Written out, never derived from the build clock. */
  timeZoneLabel: "UTC+5:30",
  /** Colombo city centre, for `Place.geo`. Not a residential address. */
  latitude: 6.9271,
  longitude: 79.8612,
};

type AreaScope = "City" | "AdministrativeArea" | "Country";

/**
 * `ContactPoint.areaServed`: who can hire me, which is a wider claim than
 * {@link personLocation}'s `address`. Kept at city level and above, so no entry
 * here narrows the published location past what the postal address already says.
 */
export const serviceAreas: readonly { name: string; scope: AreaScope }[] = [
  { name: "Colombo", scope: "City" },
  { name: "Western Province", scope: "AdministrativeArea" },
  { name: "Sri Lanka", scope: "Country" },
];

/**
 * The single `Place` behind both `homeLocation` and `workLocation`. The work is
 * remote, so the two resolve to one node by `@id` rather than repeating.
 */
const placeId = `${baseUrl}#colombo`;

const basedIn: Place = {
  "@type": "Place",
  "@id": placeId,
  name: `${personLocation.city}, ${personLocation.country}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: personLocation.city,
    addressRegion: personLocation.region,
    addressCountry: personLocation.countryCode,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: personLocation.latitude,
    longitude: personLocation.longitude,
  },
};

const findCurrent = () => {
  for (const employer of experience) {
    for (const position of employer.positions) {
      if (!position.endDate) return { employer, position };
    }
  }
  // Fail the build rather than let the CV, Person node and llms.txt disagree
  // about the current employer.
  throw new Error("experience: no position without an endDate");
};

export const currentPosition = findCurrent();

export const personJobTitle = currentPosition.position.title;

export const personEmail = "sandev@blaze64.dev";

export const personImage = "/sandev-abeykoon.jpg";

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
  "Software engineer with 6 years of experience in system design and delivery across DevOps, backend, and web development, AWS Certified Solutions Architect – Associate.";

/**
 * The full stack, grouped. One list feeding `/resume` and `llms.txt`, so the
 * page can never claim something the machine-readable surface doesn't, or the
 * other way round.
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
      "NestJS",
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
      "AWS (EC2, S3, RDS, IAM, Lambda)",
      "Linux (Ubuntu, Debian)",
      "Docker",
      "Nginx",
      "Ansible",
      "Cloudflare",
      "Vercel",
      "GitHub Actions",
    ],
  },
  {
    name: "Data and observability",
    items: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Prometheus", "Grafana"],
  },
  {
    name: "Practices",
    items: ["DevOps", "Domain-driven design", "AI agent workflows (n8n)"],
  },
];

/**
 * `knowsAbout` is a deliberate subset of {@link skillGroups}, not the whole
 * thing - a long list of every tool reads as keyword stuffing and dilutes the
 * entity signal. Broad areas first, then the named technologies with the most
 * supporting evidence in the logs.
 */
export const personSkills = [
  "DevOps",
  "Cloud Infrastructure",
  "Backend Development",
  "Web Development",
  "System Design",
  "Linux",
  "AWS",
  "Go",
  "TypeScript",
  "React",
  "Next.js",
  "NestJS",
  "Laravel",
  "Node.js",
  "Ansible",
];

/**
 * The site's single Person entity `@id`. It predates the homepage profile and
 * must not change - re-minting it resets Google's entity consolidation. The
 * fragment doubles as the DOM anchor on `/whoami` so the two cannot drift.
 */
export const personAnchor = "person";

export const personId = `${pageUrl(routes.whoami)}#${personAnchor}`;

export const personName = "Sandev Abeykoon";

const organization = (employer: Employer): Organization => ({
  "@type": "Organization",
  name: employer.name,
  ...(employer.url ? { url: employer.url } : {}),
  ...(employer.linkedIn ? { sameAs: [employer.linkedIn] } : {}),
});

/**
 * `EmployeeRole` time-bounds the employment with start/end dates, which a
 * bare `worksFor: Organization` cannot express.
 */
const employeeRole = (
  employer: Employer,
  position: Position,
): EmployeeRole<Organization, "worksFor"> => ({
  "@type": "EmployeeRole",
  roleName: position.title,
  startDate: position.startDate,
  ...(position.endDate ? { endDate: position.endDate } : {}),
  description: position.highlights.join(" "),
  worksFor: organization(employer),
});

export const person: Person = {
  "@id": personId,
  "@type": "Person",
  name: personName,
  jobTitle: personJobTitle,
  description: personDescription,
  url: homeUrl,
  mainEntityOfPage: ref(`${homeUrl}#webpage`),
  email: personEmail,
  image: imageUrl(personImage),
  address: {
    "@type": "PostalAddress",
    addressLocality: personLocation.city,
    addressRegion: personLocation.region,
    addressCountry: personLocation.countryCode,
  },
  homeLocation: basedIn,
  workLocation: ref(placeId),
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Professional enquiries",
    email: personEmail,
    availableLanguage: "English",
    areaServed: serviceAreas.map(
      ({ name, scope }): AdministrativeArea => ({ "@type": scope, name }),
    ),
  },
  worksFor: experience.flatMap((employer) =>
    employer.positions.map((position) => employeeRole(employer, position)),
  ),
  sameAs: [
    ...personProfiles.map((profile) => profile.url),
    "https://lk.linkedin.com/in/sandev-abeykoon",
    ...certifications.map((certification) => certification.url),
  ],
  knowsAbout: personSkills,
  alumniOf: education.map(
    (entry): CollegeOrUniversity | HighSchool => ({
      "@type": entry.organizationType,
      name: entry.institution,
      url: entry.url,
    }),
  ),
  hasCredential: [
    ...certifications.map(
      (certification): EducationalOccupationalCredential => ({
        "@type": "EducationalOccupationalCredential",
        name: certification.name,
        credentialCategory: "certification",
        url: certification.url,
        ...(certification.issued
          ? { datePublished: certification.issued }
          : {}),
        recognizedBy: {
          "@type": "Organization",
          name: certification.issuer.name,
          url: certification.issuer.url,
        },
      }),
    ),
    ...education
      .filter((entry) => entry.fieldOfStudy)
      .map(
        (entry): EducationalOccupationalCredential => ({
          "@type": "EducationalOccupationalCredential",
          name: entry.qualification,
          credentialCategory: "degree",
          about: { "@type": "Thing", name: entry.fieldOfStudy },
          recognizedBy: {
            "@type": "Organization",
            name: entry.institution,
            url: entry.url,
          },
        }),
      ),
  ],
};

/** Lightweight reference for nesting inside other nodes - resolves via `@id`. */
export const personRef: Person = {
  "@type": "Person",
  "@id": personId,
  name: personName,
  url: homeUrl,
};
