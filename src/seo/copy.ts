/**
 * Title and description for the fixed pages, kept together so they can be
 * compared for uniqueness at a glance. Post copy comes from MDX frontmatter.
 * Titles 30-60 chars, descriptions 120-160 - Google truncates past those.
 */
export const copy = {
  home: {
    title: "Sandev Abeykoon – Software Engineer",
    description:
      "Sandev Abeykoon is a software engineer with 6 years across DevOps, backend, and web development. Work experience, certifications, and field notes.",
  },
  logs: {
    title: "Field Logs by Sandev Abeykoon – Engineering Notes",
    description:
      "First-hand engineering write-ups from Sandev Abeykoon on cloud infrastructure, DevOps, and full-stack projects actually built, tried, or failed at.",
  },
  resume: {
    title: "Sandev Abeykoon – Software Engineer Resume",
    description:
      "Resume of Sandev Abeykoon: work experience at Bespoke Motor Group and Maya Hive, AWS Solutions Architect certification, education, and full tech stack.",
  },
  whoami: {
    title: "About Sandev Abeykoon – Software Engineer",
    description:
      "Sandev Abeykoon is a software engineer and AWS Certified Solutions Architect – Associate, working across DevOps, cloud infrastructure and product engineering.",
  },
} as const;
