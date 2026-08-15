import {
  ogImageContentType,
  ogImageSize,
  renderOgImage,
} from "@/components/og-image";
import { getAllBlogPosts } from "@/app/logs/utils";
import { siteName } from "@/seo";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getAllBlogPosts().find((post) => post.slug === slug);
  const title = post
    ? (post.metadata.metaTitle ?? post.metadata.title)
    : siteName;

  return renderOgImage(title, siteName);
}
