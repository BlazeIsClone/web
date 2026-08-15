import type { Metadata } from "next";
import Link from "next/link";
import {
  baseUrl,
  breadcrumb,
  certifications,
  copy,
  currentPosition,
  education,
  formatMonth,
  graph,
  JsonLd,
  lastUpdated,
  pageMetadata,
  pageUrl,
  person,
  personAnchor,
  personId,
  personName,
  ref,
  routes,
} from "@/seo";

const url = pageUrl(routes.whoami);

export const metadata: Metadata = pageMetadata({
  ...copy.whoami,
  path: routes.whoami,
  imageAlt: `${personName} – software engineer`,
  openGraph: {
    type: "profile",
    firstName: "Sandev",
    lastName: "Abeykoon",
    username: "BlazeIsClone",
  },
});

const profileSchema = graph(
  {
    // The homepage is the ProfilePage now; this is the story behind it.
    "@type": "AboutPage",
    "@id": `${url}#webpage`,
    url,
    name: copy.whoami.title,
    description: copy.whoami.description,
    dateModified: lastUpdated.whoami,
    about: ref(personId),
    breadcrumb: ref(`${url}#breadcrumb`),
  },
  person,
  breadcrumb(`${url}#breadcrumb`, [
    { name: "Home", url: baseUrl },
    { name: "About" },
  ]),
);

export default function About() {
  return (
    <section>
      <JsonLd schema={profileSchema} />
      <h1 className="mb-6 text-xl font-semibold tracking-tighter">/whoami</h1>
      <article id={personAnchor} className="prose">
        <p>
          I&apos;m Sandev Abeykoon, and I&apos;m a{" "}
          <strong>software engineer</strong> writing software for{" "}
          <strong>6 years</strong>. I work across the full stack and my
          experience includes DevOps, Backend and Web Development.
        </p>

        <h2>Where I am now</h2>
        <p>
          These days I&apos;m a {currentPosition.position.title} at{" "}
          <a
            href={currentPosition.employer.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {currentPosition.employer.name}
          </a>
          , building platforms for a luxury dealership group since{" "}
          <strong>{formatMonth(currentPosition.position.startDate)}</strong>.
          The years before that were spent at{" "}
          <a
            href="https://mayahive.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Maya Hive
          </a>
          , where I walked in as a web development intern and walked out a{" "}
          <strong>DevOps engineer</strong>. That is where most of my infra
          instincts come from.
        </p>
        <p>
          This page is the story. The record lives on my{" "}
          <Link href={routes.resume}>resume</Link>: every role with dates,
          highlights, and the full stack.
        </p>

        <h2>How I got into code</h2>
        <p>
          Before any of the code, I studied{" "}
          <strong>{education[0].fieldOfStudy}</strong> at design school,
          finishing with a {education[0].qualification} from{" "}
          <a href={education[0].url} target="_blank" rel="noopener noreferrer">
            {education[0].institution}
          </a>
          . I was inspired by User Interface design and that got me into writing
          code.
        </p>
        <p>
          My first lines of code went into the{" "}
          <Link href="/logs/a41sl-bot">A41SL Discord bot</Link>, a Node.js bot I
          built for a community server with my friends. It pulled me into
          backend development in the days when shipping meant pushing to Heroku
          and watching the build log scroll.
        </p>
        <p>
          Alongside that I was building websites for local businesses. Since
          then I&apos;ve worked with some amazing people and teams.
        </p>

        <h2>My tech stack</h2>
        <p>
          On the product side I&apos;ve been enjoying building UIs with{" "}
          <strong>TanStack Start</strong> and <strong>React</strong>, and
          working with <strong>Go</strong> using domain-driven architecture.
          Before that, a lot of <strong>Laravel/PHP</strong> and{" "}
          <strong>NestJS/Node.js</strong>.
        </p>
        <p>
          Ubuntu is my favourite operating system but at the moment I&apos;m
          stuck with Windows. I have a desktop PC with a dual monitor setup.
        </p>
        <p>
          The full list, grouped and kept current with what I ship day to day,
          lives on my <Link href={routes.resume}>resume</Link>.
        </p>

        <h2>What I&apos;m learning now</h2>
        <p>
          Right now I&apos;m learning <strong>system design</strong>, and how{" "}
          <strong>AI agentic systems</strong> can solve real business problems
          and give people back valuable time.
        </p>

        <h2>Certified on AWS</h2>
        <p>
          I&apos;m an{" "}
          <a
            href={certifications[0].url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {certifications[0].name}
          </a>
          . I went in sceptical, thinking of AWS as an expensive abstraction
          over compute servers. What changed my mind was seeing how much
          enterprise infra work it packages into services which a business can
          actually benefit from without a dedicated Ops team.
        </p>

        <h2>Field journal</h2>
        <p>
          My <Link href="/logs">field notes</Link>, are a collection of projects
          I&apos;ve actually built, tried, or failed at.
        </p>

        <h2>Getting in touch</h2>
        <p>
          The fastest way to reach me is{" "}
          <a href="mailto:sandev@blaze64.dev">sandev@blaze64.dev</a>. My code
          lives on{" "}
          <a
            href="https://github.com/BlazeIsClone"
            target="_blank"
            rel="me noopener noreferrer"
          >
            GitHub
          </a>
          , my work history is on{" "}
          <a
            href="https://www.linkedin.com/in/sandev-abeykoon/"
            target="_blank"
            rel="me noopener noreferrer"
          >
            LinkedIn
          </a>
          , and I still find myself on{" "}
          <a
            href="https://stackoverflow.com/users/13940160/sandev-abeykoon"
            target="_blank"
            rel="me noopener noreferrer"
          >
            Stack Overflow
          </a>
          .
        </p>
      </article>
    </section>
  );
}
