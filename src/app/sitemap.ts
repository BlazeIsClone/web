import { getBlogPosts } from "@/app/logs/utils";
import { lastUpdated, pageUrl, routes } from "@/seo";

export default async function sitemap() {
  const blogs = getBlogPosts().map((post) => ({
    url: pageUrl(routes.post(post.slug)),
    lastModified: post.metadata.updatedAt ?? post.metadata.publishedAt,
  }));

  const latestPost = blogs
    .map((blog) => blog.lastModified)
    .sort()
    .at(-1);

  // `/` and `/resume` track the CV data, not post publication - only `/logs`
  // changes when a post ships.
  return [
    { url: pageUrl(routes.home), lastModified: lastUpdated.resume },
    { url: pageUrl(routes.logs), lastModified: latestPost },
    { url: pageUrl(routes.resume), lastModified: lastUpdated.resume },
    { url: pageUrl(routes.whoami), lastModified: lastUpdated.whoami },
    ...blogs,
  ];
}
