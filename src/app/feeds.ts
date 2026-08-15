import { Feed } from "feed";

import { getRecentPosts } from "@/app/logs/utils";
import { copy, locale, pageUrl, personEmail, personName, routes } from "@/seo";

/** `locale` is Open Graph's underscore form; feeds want an RFC-1766 tag. */
const language = locale.toLowerCase().replace("_", "-");

export function buildFeed() {
  const posts = getRecentPosts();
  const logsUrl = pageUrl(routes.logs);

  const lastUpdatedPost = posts
    .map((post) => post.metadata.updatedAt ?? post.metadata.publishedAt)
    .sort()
    .at(-1);

  const feed = new Feed({
    title: copy.logs.title,
    description: copy.logs.description,
    id: logsUrl,
    link: logsUrl,
    language,
    updated: lastUpdatedPost ? new Date(lastUpdatedPost) : undefined,
    generator: false,
    docs: "https://www.rssboard.org/rss-specification",
    feedLinks: {
      rss: pageUrl(routes.rss),
      atom: pageUrl(routes.atom),
      json: pageUrl(routes.jsonFeed),
    },
    author: {
      name: personName,
      email: personEmail,
      link: pageUrl(routes.whoami),
    },
  });

  for (const post of posts) {
    const url = pageUrl(routes.post(post.slug));

    feed.addItem({
      title: post.metadata.title,
      id: url,
      link: url,
      description: post.metadata.summary,
      // `published` drives pubDate/date_published, `date` drives the revision
      // timestamp - splitting them is what carries frontmatter `updatedAt` through.
      published: new Date(post.metadata.publishedAt),
      date: new Date(post.metadata.updatedAt ?? post.metadata.publishedAt),
    });
  }

  return feed;
}
