import { getRecentPosts } from "@/app/logs/utils";
import { BlogPosts } from "@/components/posts";
import {
  copy,
  graph,
  JsonLd,
  pageUrl,
  personRef,
  ref,
  routes,
  siteId,
  website,
} from "@/seo";

const url = pageUrl(routes.home);

const MAX_POSTS = 10;

/**
 * The homepage is a hub, not a profile — it describes the site and lists the
 * logs, and points at `/whoami#person` for the author rather than restating
 * the Person node that page owns.
 */
const homeSchema = graph(website, {
  "@type": "CollectionPage",
  "@id": `${url}#webpage`,
  url,
  name: copy.home.title,
  description: copy.home.description,
  isPartOf: ref(siteId),
  about: personRef,
  mainEntity: {
    "@type": "ItemList",
    "@id": `${url}#recent-logs`,
    name: "Recent field logs",
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    itemListElement: getRecentPosts(MAX_POSTS).map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: post.metadata.title,
      url: pageUrl(routes.post(post.slug)),
    })),
  },
});

export default function Page() {
  return (
    <section>
      <JsonLd schema={homeSchema} />
      <div className="mb-6 flex items-center gap-2">
        <h1
          className="text-xl font-semibold tracking-tighter outline-offset-4 outline-gray-400"
          contentEditable
          suppressContentEditableWarning
        >
          $ {`hello!, I'm Sandev Abeykoon`}
        </h1>
        <span className="text-sm  animate-blink text-slate-600 select-none">
          ▌
        </span>
      </div>
      <p className="mb-4 text-md">
        {`i build cool things for the web and I am always open to exciting challenges. welcome to my field journal!`}
      </p>
      <p className="mb-4 text-md">
        {`i've been writing software for about 5 years now, two of them in DevOps and the rest in full-stack development. I started out building websites for local businesses, and along the way I've gotten to work with some great people and teams.`}
      </p>
      <p className="mb-8 text-md">
        {`right now I'm curious about system design, and about how AI agentic systems can solve real business problems and give people back valuable time. that mix of business and solutions-driven thinking is part of what's pulling me toward becoming a software architect. on the tooling side, I've been enjoying building UIs with TanStack Start with React, and working with Go using domain-driven architecture.`}
      </p>
      <div className="border-t" />
      <div className="my-8">
        <BlogPosts maxPosts={MAX_POSTS} />
      </div>
    </section>
  );
}
