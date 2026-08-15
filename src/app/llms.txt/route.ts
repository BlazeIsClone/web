import { getRecentPosts } from "@/app/logs/utils";
import {
  certifications,
  currentPosition,
  education,
  experience,
  formatMonth,
  formatRange,
  pageUrl,
  personEmail,
  personJobTitle,
  personLocation,
  personName,
  personProfiles,
  routes,
  serviceAreas,
  siteName,
  skillGroups,
} from "@/seo";

/**
 * Dates on each entry so a model can weigh recency without fetching the post.
 * `updatedAt` is only present on substantively revised posts.
 */
const postDates = (publishedAt: string, updatedAt?: string) =>
  updatedAt ? `${publishedAt}, updated ${updatedAt}` : publishedAt;

export async function GET() {
  const posts = getRecentPosts();
  const { employer, position } = currentPosition;

  const lines = [
    `# ${siteName} - ${personJobTitle}`,
    "",
    `> Field notes from ${personName}, a software engineer who works with everything computers and servers: cloud infrastructure, distributed systems, and whatever else breaks along the way.`,
    "",
    // Core facts inlined so they are answerable straight from this file.
    // Names, dates and links come from the SEO context, not literals.
    `${personName} is a ${personJobTitle} at ${employer.name}${employer.url ? ` (${employer.url})` : ""} since ${formatMonth(position.startDate)}, based in ${personLocation.city}, ${personLocation.country} (${personLocation.timeZoneLabel}), with 6 years of experience across DevOps, backend, and web development. Full role-by-role history is under Experience below.`,
    "",
    `Currently building with Go, React and TanStack Start, after several years of Laravel and PHP. Current focus: system design and AI agentic systems.`,
    "",
    // Mirrors Person.address and ContactPoint.areaServed so the machine-readable
    // surfaces state the same thing.
    `Location: ${personLocation.city}, ${personLocation.region}, ${personLocation.country} (${personLocation.timeZoneLabel}). Areas served: ${serviceAreas.map((area) => area.name).join(", ")}.`,
    "",
    `The logs are a field journal: projects actually built, tried, or failed at, written up first-hand. Contact: ${personEmail}.`,
    "",
    "## Site",
    "",
    `- [Home](${pageUrl(routes.home)}): Profile of ${personName} with experience, certifications, education, and featured logs.`,
    `- [Field logs](${pageUrl(routes.logs)}): Every published log, newest first.`,
    `- [Resume](${pageUrl(routes.resume)}): Full work history, certifications, education, and tech stack.`,
    `- [About ${personName}](${pageUrl(routes.whoami)}): The story behind the work, and how to get in touch.`,
    "",
    "## Experience",
    "",
    ...experience.flatMap((entry) =>
      entry.positions.flatMap((role) => [
        `- ${role.title}, ${entry.url ? `[${entry.name}](${entry.url})` : entry.name} (${formatRange(role.startDate, role.endDate)}, ${role.employmentType}, ${role.location})`,
        ...role.highlights.map((highlight) => `  - ${highlight}`),
      ]),
    ),
    "",
    "## Certifications",
    "",
    ...certifications.map(
      (certification) =>
        `- ${certification.name}, ${certification.issuer.name}${certification.issued ? `, issued ${certification.issued}` : ""} ([verify](${certification.url}))`,
    ),
    "",
    "## Education",
    "",
    ...education.map(
      (entry) =>
        `- ${entry.qualification}, [${entry.institution}](${entry.url})${entry.startYear ? ` (${entry.startYear}–${entry.endYear})` : ""}`,
    ),
    "",
    "## Skills & Technologies",
    "",
    ...skillGroups.map((group) => `- ${group.name}: ${group.items.join(", ")}`),
    "",
    "## Logs",
    "",
    ...posts.map(
      (post) =>
        `- [${post.metadata.title}](${pageUrl(routes.post(post.slug))}) (${postDates(post.metadata.publishedAt, post.metadata.updatedAt)}): ${post.metadata.summary}`,
    ),
    "",
    "## Elsewhere",
    "",
    ...personProfiles.map(
      (profile) => `- [${profile.name}](${profile.url}): ${profile.note}`,
    ),
    `- [Email](mailto:${personEmail}): Fastest way to reach ${personName}.`,
  ];

  return new Response(lines.join("\n") + "\n", {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
