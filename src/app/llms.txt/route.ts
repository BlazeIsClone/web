import { getBlogPosts } from "@/app/logs/utils";
import { pageUrl, routes, siteName } from "@/seo";

export async function GET() {
  const posts = getBlogPosts().sort((a, b) =>
    new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
      ? -1
      : 1
  );

  const lines = [
    `# ${siteName}`,
    "",
    "> Field notes from Sandev Abeykoon, a full-stack engineer who works with everything computers and servers — cloud infrastructure, distributed systems, and whatever else breaks along the way.",
    "",
    "## About",
    "",
    `- [About Sandev Abeykoon](${pageUrl(routes.whoami)}): Full-stack engineer and AWS Certified Solutions Architect – Associate. Background, tooling, and how to get in touch.`,
    "",
    "## Logs",
    "",
    ...posts.map(
      (post) =>
        `- [${post.metadata.title}](${pageUrl(routes.post(post.slug))}): ${post.metadata.summary}`
    ),
  ];

  return new Response(lines.join("\n") + "\n", {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
