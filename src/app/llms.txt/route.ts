import { getRecentPosts } from "@/app/logs/utils";
import {
  credential,
  currentEmployer,
  pageUrl,
  personEmail,
  personJobTitle,
  personName,
  personProfiles,
  routes,
  siteName,
  skillGroups,
} from "@/seo";

const monthYear = (isoMonth: string) =>
  new Date(`${isoMonth}-01T00:00:00Z`).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

/**
 * Dates on each entry so a model can weigh recency without fetching the post.
 * `updatedAt` is only present on substantively revised posts.
 */
const postDates = (publishedAt: string, updatedAt?: string) =>
  updatedAt ? `${publishedAt}, updated ${updatedAt}` : publishedAt;

export async function GET() {
  const posts = getRecentPosts();

  const lines = [
    `# ${siteName} - Full-Stack Engineer`,
    "",
    "> Field notes from Sandev Abeykoon, a full-stack engineer who works with everything computers and servers — cloud infrastructure, distributed systems, and whatever else breaks along the way.",
    "",
    // Summary of /whoami, inlined so the core facts are answerable straight from
    // this file. Names, dates and links come from the SEO context, not literals.
    `${personName} is a ${personJobTitle} at ${currentEmployer.name} (${currentEmployer.url}) since ${monthYear(currentEmployer.startDate)}, with 5+ years of experience across DevOps, backend, and web development. Previously at Maya Hive from 2021 to 2026 — joined as a web development intern and moved into a DevOps engineer role in January 2022, which is where most of the infrastructure experience comes from.`,
    "",
    `Certified as ${credential.name} (${credential.url}). Currently building with Go, React and TanStack Start, after several years of Laravel and PHP. Studied Visual Communication at the NIBM School of Design before moving into engineering. Current focus: system design and AI agentic systems.`,
    "",
    `The logs are a field journal: projects actually built, tried, or failed at, written up first-hand. Contact: ${personEmail}.`,
    "",
    "## Site",
    "",
    `- [Home](${pageUrl(routes.home)}): Site entry point with the most recent field logs.`,
    `- [Field logs](${pageUrl(routes.logs)}): Every published log, newest first.`,
    `- [About ${personName}](${pageUrl(routes.whoami)}): Work history, tech stack, certification, and how to get in touch.`,
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
