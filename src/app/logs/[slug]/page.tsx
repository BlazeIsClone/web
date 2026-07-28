import { notFound } from "next/navigation";
import type { BlogPosting, BreadcrumbList, WithContext } from "schema-dts";
import { CustomMDX } from "@/components/mdx";
import { formatDate, getAllBlogPosts } from "@/app/logs/utils";
import { baseUrl } from "@/app/sitemap";
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
  const ogImage = image ? `${baseUrl}${image}` : `${baseUrl}/og-image.jpg`;

  return {
    title,
    description,
    robots: draft ? { index: false, follow: false } : undefined,
    alternates: {
      canonical: `/logs/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      modifiedTime,
      url: `${baseUrl}/logs/${post.slug}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
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

export default async function Blog({ params }: any) {
  const { slug } = await params;
  const post = getAllBlogPosts().find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  const postUrl = `${baseUrl}/logs/${post.slug}`;

  const postSchema: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metadata.title,
    datePublished: post.metadata.publishedAt,
    dateModified: post.metadata.updatedAt ?? post.metadata.publishedAt,
    description: post.metadata.summary,
    image: post.metadata.image
      ? `${baseUrl}${post.metadata.image}`
      : `${baseUrl}/og-image.jpg`,
    url: postUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    author: {
      "@type": "Person",
      name: "Sandev Abeykoon",
    },
  };

  const breadcrumbSchema: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Logs",
        item: `${baseUrl}/logs`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.metadata.title,
        item: postUrl,
      },
    ],
  };

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
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
      <p className="mt-8 text-sm">by Sandev Abeykoon</p>
    </section>
  );
}
