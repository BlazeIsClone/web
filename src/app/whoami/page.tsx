import type { Metadata } from "next";
import Link from "next/link";
import {
  baseUrl,
  breadcrumb,
  copy,
  graph,
  JsonLd,
  lastUpdated,
  pageMetadata,
  pageUrl,
  person,
  personId,
  personName,
  ref,
  routes,
} from "@/seo";

const url = pageUrl(routes.whoami);

export const metadata: Metadata = pageMetadata({
  ...copy.whoami,
  path: routes.whoami,
  imageAlt: `${personName} – full-stack engineer`,
  openGraph: {
    type: "profile",
    firstName: "Sandev",
    lastName: "Abeykoon",
    username: "BlazeIsClone",
  },
});

const profileSchema = graph(
  {
    "@type": "ProfilePage",
    "@id": `${url}#webpage`,
    url,
    name: copy.whoami.title,
    description: copy.whoami.description,
    dateModified: lastUpdated.whoami,
    mainEntity: ref(personId),
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
      <article className="prose">
        <p>
          I&apos;m Sandev Abeykoon, and I&apos;m a{" "}
          <strong>full-stack engineer</strong> writing software for{" "}
          <strong>5+ years</strong>. I work across the stack and my experience
          includes DevOps, Backend and Web Development.
        </p>

        <h2>full-time work experience</h2>
        <p>
          I&apos;m a Full Stack Software Engineer at{" "}
          <a
            href="https://www.bespokemotorgroup.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bespoke Motor Group
          </a>
          , and I&apos;ve been there since <strong>April 2026</strong>.
        </p>
        <p>
          Before that I was at{" "}
          <a
            href="https://mayahive.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Maya Hive
          </a>{" "}
          from 2021 to 2026. I joined as a web development intern in September
          2021 and moved into a <strong>DevOps engineer</strong> role that
          January, which is where a lot of my infra experience comes from.
        </p>

        <h2>how i got into code</h2>
        <p>
          Before any of the code, I studied{" "}
          <strong>Visual Communication</strong> at the NIBM School of Design. I
          was inspired by User Interface design and that got me into writing
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

        <h2>my tech stack</h2>
        <p>
          On the product side I&apos;ve been enjoying building UIs with{" "}
          <strong>TanStack Start</strong> and <strong>React</strong>, and
          working with <strong>Go</strong> using domain-driven architecture.
          Before that, a lot of <strong>Laravel</strong> and{" "}
          <strong>PHP</strong>.
        </p>
        <p>
          Ubuntu is my favourite operating system but at the moment I&apos;m
          stuck with Windows. I have a desktop PC with a dual monitor setup.
        </p>

        <h2>what i&apos;m learning now</h2>
        <p>
          Right now I&apos;m learning <strong>system design</strong>, and how{" "}
          <strong>AI agentic systems</strong> can solve real business problems
          and give people back valuable time.
        </p>

        <h2>certified on AWS</h2>
        <p>
          I&apos;m an{" "}
          <a
            href="https://www.credly.com/badges/9fdfe798-e0db-49d2-9b42-29c6b92a421b/linked_in_profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            AWS Certified Solutions Architect – Associate
          </a>
          . I went in sceptical, thinking of AWS as an expensive abstraction
          over compute servers. What changed my mind was seeing how much
          enterprise infra work it packages into services which a business can
          actually benefit from without a dedicated Ops team.
        </p>

        <h2>field journal</h2>
        <p>
          My <Link href="/logs">field notes</Link>, are a collection of projects
          I&apos;ve actually built, tried, or failed at.
        </p>

        <h2>getting in touch</h2>
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
