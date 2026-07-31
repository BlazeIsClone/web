import type { Metadata } from "next";
import { BlogPosts } from "@/components/posts";
import {
  baseUrl,
  breadcrumb,
  copy,
  graph,
  JsonLd,
  pageMetadata,
  pageUrl,
  personRef,
  routes,
} from "@/seo";

const url = pageUrl(routes.logs);

export const metadata: Metadata = pageMetadata({
  ...copy.logs,
  path: routes.logs,
});

const blogSchema = graph(
  {
    "@type": "Blog",
    "@id": `${url}#blog`,
    name: copy.logs.title,
    description: copy.logs.description,
    url,
    author: personRef,
  },
  breadcrumb(`${url}#breadcrumb`, [
    { name: "Home", url: baseUrl },
    { name: "Logs" },
  ]),
);

export default function Page() {
  return (
    <section>
      <JsonLd schema={blogSchema} />
      <h1 className="font-semibold text-xl mb-8 tracking-tighter">{`/logs`}</h1>
      <BlogPosts />
    </section>
  );
}
