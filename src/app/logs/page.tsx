import type { Blog, WithContext } from "schema-dts";
import { BlogPosts } from "@/components/posts";
import { baseUrl } from "@/app/sitemap";

export const metadata = {
  title: "Sandev Abeykoon - Field Logs",
  description:
    "Insights, experiments, and stories to follow along with my journey",
  alternates: {
    canonical: "/logs",
  },
};

const blogSchema: WithContext<Blog> = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Sandev Abeykoon - Field Logs",
  description:
    "Insights, experiments, and stories to follow along with my journey",
  url: `${baseUrl}/logs`,
  author: {
    "@type": "Person",
    name: "Sandev Abeykoon",
  },
};

export default function Page() {
  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <h1 className="font-semibold text-xl mb-8 tracking-tighter">{`/logs`}</h1>
      <BlogPosts />
    </section>
  );
}
