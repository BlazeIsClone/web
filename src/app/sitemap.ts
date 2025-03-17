import { getBlogPosts } from "@/app/logs/utils";

export const baseUrl = "https://blaze64.xyz";

export default async function sitemap() {
  const blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/logs/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const routes = ["", "/logs"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
