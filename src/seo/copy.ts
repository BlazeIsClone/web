/**
 * Title and description for the fixed pages, kept together so they can be
 * compared for uniqueness at a glance. Post copy comes from MDX frontmatter.
 * Titles 30-60 chars, descriptions 120-160 - Google truncates past those.
 */
export const copy = {
  home: {
    title: "Sandev Abeykoon – Software Engineer in Colombo, Sri Lanka",
    description:
      "Sandev Abeykoon is a software engineer in Colombo, Sri Lanka, with 6 years across DevOps, backend, and web development. Experience, certifications, field notes.",
  },
  logs: {
    title: "Field Logs by Sandev Abeykoon – Engineering Notes",
    description:
      "First-hand engineering write-ups from Sandev Abeykoon on cloud infrastructure, DevOps, and full-stack projects actually built, tried, or failed at.",
  },
  resume: {
    title: "Sandev Abeykoon – Software Engineer Resume",
    description:
      "Resume of Sandev Abeykoon, a software engineer in Colombo, Sri Lanka: roles at Bespoke Motor Group and Maya Hive, AWS certification, and full tech stack.",
  },
  whoami: {
    title: "About Sandev Abeykoon – Software Engineer in Sri Lanka",
    description:
      "Sandev Abeykoon is a software engineer based in Colombo, Sri Lanka, and an AWS Certified Solutions Architect – Associate working across DevOps and cloud.",
  },
} as const;
