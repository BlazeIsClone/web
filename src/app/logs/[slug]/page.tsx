/* eslint-disable @typescript-eslint/no-explicit-any */

import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { formatDate, getBlogPosts } from "@/app/logs/utils";
import { baseUrl } from "@/app/sitemap";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: any) {
  const post = getBlogPosts().find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  const ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Blog({ params }: any) {
  const post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/logs/${post.slug}`,
            author: {
              "@type": "Person",
              name: "Sandev Abeykoon",
            },
          }),
        }}
      />
      <Link href={`/logs/${post.slug}`}>
        <h1 className="title font-semibold text-xl tracking-tighter">
          {post.metadata.title}
        </h1>
      </Link>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm">date: {formatDate(post.metadata.publishedAt)}</p>
      </div>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
