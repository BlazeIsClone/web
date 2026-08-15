import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, getBlogPosts } from "@/app/logs/utils";
import {
  ContactCard,
  CredentialsSection,
  ExperienceSection,
} from "@/components/resume";
import {
  copy,
  graph,
  JsonLd,
  lastUpdated,
  pageMetadata,
  pageUrl,
  person,
  personId,
  personJobTitle,
  personLocation,
  personName,
  personSkills,
  ref,
  routes,
  siteCreated,
  siteId,
  website,
} from "@/seo";

const url = pageUrl(routes.home);

/** Pinned logs that evidence the CV, LinkedIn "Featured"-style, not a feed. */
const FEATURED_SLUGS = ["local-first-pwa", "aws-cloud", "monitoring-system"];

const featuredPosts = FEATURED_SLUGS.map((slug) => {
  const post = getBlogPosts().find((entry) => entry.slug === slug);
  if (!post) throw new Error(`featured: unknown slug "${slug}"`);
  return post;
});

export const metadata: Metadata = pageMetadata({
  ...copy.home,
  path: routes.home,
  openGraph: {
    type: "profile",
    firstName: "Sandev",
    lastName: "Abeykoon",
    username: "BlazeIsClone",
  },
});

const homeSchema = graph(
  website,
  {
    "@type": "ProfilePage",
    "@id": `${url}#webpage`,
    url,
    name: copy.home.title,
    description: copy.home.description,
    isPartOf: ref(siteId),
    dateCreated: siteCreated,
    dateModified: lastUpdated.resume,
    mainEntity: ref(personId),
  },
  person,
  {
    "@type": "ItemList",
    "@id": `${url}#featured-logs`,
    name: "Featured field logs",
    itemListElement: featuredPosts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: post.metadata.title,
      url: pageUrl(routes.post(post.slug)),
    })),
  },
);

const sectionHeading = "mb-4 text-lg font-semibold tracking-tight";

export default function Page() {
  return (
    <section>
      <JsonLd schema={homeSchema} />
      <h1 className="mb-2 text-xl font-semibold tracking-tighter">
        {personName} – {personJobTitle}
      </h1>
      <p className="mb-6 text-sm text-neutral-500">
        {`${personLocation.city}, ${personLocation.country} | ${personLocation.timeZoneLabel}`}
      </p>

      <p className="mb-4 text-md">
        {`Hello! Welcome to my field journal. The short version of what I do is below. The long version is on `}
        <Link href={routes.resume} className="underline underline-offset-4">
          /resume
        </Link>
        {`, and the story behind it on `}
        <Link href={routes.whoami} className="underline underline-offset-4">
          /whoami
        </Link>
        .
      </p>
      <p className="mb-4 text-md">
        {`I'm a software engineer at Bespoke Motor Group, a New York dealership group operating Bentley, Rolls-Royce, Lamborghini and Porsche franchises, where I led the system design of an in-house market intelligence platform. I'm also part of the team building an AI-powered lead-capture SaaS at BudgetBuy AI in Melbourne. Before that I spent four years at Maya Hive in Colombo, moving from web development intern to DevOps engineer, where I took over the Linux infrastructure, deployment pipelines and monitoring behind the platforms the team shipped.`}
      </p>
      <p className="mb-8 text-md">
        {`I have 6 years of experience across DevOps, backend, and web development, and I'm an AWS Certified Solutions Architect – Associate. I currently build with React, Next.js, NestJS, TypeScript, Node.js, Go and PostgreSQL, and write first-hand field logs about the systems I ship. I'm based in Colombo, Sri Lanka, and work remotely across time zones.`}
      </p>

      <section className="mb-10">
        <h2 className={sectionHeading}>Featured logs</h2>
        <div className="border-t pt-4">
          {featuredPosts.map((post) => (
            <Link
              key={post.slug}
              className="flex flex-col space-y-1 mb-4"
              href={routes.post(post.slug)}
            >
              <div className="w-full flex space-x-2 text-md">
                <p className="tabular-nums">
                  {formatDate(post.metadata.publishedAt, false)}
                </p>
                <p className="tracking-tight"> | {post.metadata.title}</p>
              </div>
            </Link>
          ))}
          <Link
            href={routes.logs}
            className="text-sm text-neutral-500 underline underline-offset-4"
          >
            All field logs
          </Link>
        </div>
      </section>

      <ExperienceSection summaryOnly />
      <CredentialsSection />

      <section className="mb-10">
        <h2 className={sectionHeading}>Current focus</h2>
        <p className="border-t pt-4 text-md">
          System design, and how AI agentic systems can take real work off
          people&apos;s plates. On the tooling side that means
          TanStack Start with React on the frontend, and Go with domain-driven
          architecture on the backend. The full detail behind every role above
          sits on the{" "}
          <Link href={routes.resume} className="underline underline-offset-4">
            resume
          </Link>
          , and the longer story on{" "}
          <Link href={routes.whoami} className="underline underline-offset-4">
            /whoami
          </Link>
          .
        </p>
      </section>

      <section className="mb-10">
        <h2 className={sectionHeading}>Skills</h2>
        <p className="border-t pt-4 text-md">
          {personSkills.join(", ")}, and the full breakdown on the{" "}
          <Link href={routes.resume} className="underline underline-offset-4">
            resume
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className={sectionHeading}>Contact</h2>
        <div className="border-t pt-4">
          <ContactCard />
        </div>
      </section>
    </section>
  );
}
