import { getBlogPosts } from "@/app/logs/utils";
import { baseUrl, lastUpdated, pageUrl, routes } from "@/seo";

export default async function sitemap() {
  const blogs = getBlogPosts().map((post) => ({
    url: pageUrl(routes.post(post.slug)),
    lastModified: post.metadata.updatedAt ?? post.metadata.publishedAt,
  }));

  const latestPost = blogs
    .map((blog) => blog.lastModified)
    .sort()
    .at(-1);

  const listings = [routes.home, routes.logs].map((route) => ({
    url: pageUrl(route),
    lastModified: latestPost,
  }));

  return [
    ...listings,
    { url: `${baseUrl}${routes.whoami}`, lastModified: lastUpdated.whoami },
    ...blogs,
  ];
}
