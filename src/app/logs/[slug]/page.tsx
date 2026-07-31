import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { formatDate, getAllBlogPosts } from "@/app/logs/utils";
import {
  baseUrl,
  breadcrumb,
  graph,
  imageUrl,
  JsonLd,
  pageMetadata,
  pageRef,
  pageUrl,
  personName,
  personRef,
  ref,
  routes,
} from "@/seo";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = getAllBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: any) {
  const { slug } = await params;
  const post = getAllBlogPosts().find((post) => post.slug === slug);
  if (!post) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    updatedAt: modifiedTime,
    summary: description,
    image,
    draft,
  } = post.metadata;

  return pageMetadata({
    title,
    description,
    path: routes.post(post.slug),
    image,
    robots: draft ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article",
      publishedTime,
      modifiedTime,
      authors: [pageUrl(routes.whoami)],
    },
  });
}

export default async function Blog({ params }: any) {
  const { slug } = await params;
  const post = getAllBlogPosts().find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  const postUrl = pageUrl(routes.post(post.slug));

  const postSchema = graph(
    {
      "@type": "BlogPosting",
      "@id": `${postUrl}#post`,
      headline: post.metadata.title,
      datePublished: post.metadata.publishedAt,
      dateModified: post.metadata.updatedAt ?? post.metadata.publishedAt,
      description: post.metadata.summary,
      image: imageUrl(post.metadata.image),
      url: postUrl,
      mainEntityOfPage: pageRef(postUrl),
      author: personRef,
      isPartOf: ref(`${pageUrl(routes.logs)}#blog`),
    },
    breadcrumb(`${postUrl}#breadcrumb`, [
      { name: "Home", url: baseUrl },
      { name: "Logs", url: pageUrl(routes.logs) },
      { name: post.metadata.title },
    ]),
  );

  return (
    <section>
      <JsonLd schema={postSchema} />
      <Link href={`/logs/${post.slug}`}>
        <h1 className="title font-semibold text-xl tracking-tighter">
          {post.metadata.title}
        </h1>
      </Link>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm">
          date: {formatDate(post.metadata.publishedAt)}
          {post.metadata.updatedAt
            ? ` | updated: ${formatDate(post.metadata.updatedAt)}`
            : ""}
        </p>
      </div>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
      <p className="mt-8 text-sm">
        by <Link href="/whoami">{personName}</Link>
      </p>
    </section>
  );
}
