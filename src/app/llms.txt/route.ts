import { getBlogPosts } from "@/app/logs/utils";
import { baseUrl } from "@/app/sitemap";

export async function GET() {
  const posts = getBlogPosts().sort((a, b) =>
    new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
      ? -1
      : 1
  );

  const lines = [
    "# Sandev Abeykoon - Dev Log",
    "",
    "> Field notes from Sandev Abeykoon, a full-stack engineer who works with everything computers and servers — cloud infrastructure, distributed systems, and whatever else breaks along the way.",
    "",
    "## Logs",
    "",
    ...posts.map(
      (post) =>
        `- [${post.metadata.title}](${baseUrl}/logs/${post.slug}): ${post.metadata.summary}`
    ),
  ];

  return new Response(lines.join("\n") + "\n", {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
