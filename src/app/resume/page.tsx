import type { Metadata } from "next";
import Link from "next/link";
import {
  AwardsSection,
  CertificationsSection,
  ContactCard,
  EducationSection,
  ExperienceSection,
  SkillsSection,
} from "@/components/resume";
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
  ref,
  routes,
} from "@/seo";

const url = pageUrl(routes.resume);

export const metadata: Metadata = pageMetadata({
  ...copy.resume,
  path: routes.resume,
});

const resumeSchema = graph(
  {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: copy.resume.title,
    description: copy.resume.description,
    dateModified: lastUpdated.resume,
    about: ref(personId),
    breadcrumb: ref(`${url}#breadcrumb`),
  },
  person,
  breadcrumb(`${url}#breadcrumb`, [
    { name: "Home", url: baseUrl },
    { name: "Resume" },
  ]),
);

export default function Resume() {
  return (
    <section>
      <JsonLd schema={resumeSchema} />
      <h1 className="mb-6 text-xl font-semibold tracking-tighter">/resume</h1>
      <p className="mb-8 text-md">
        The full record: every role with dates and detail, certifications,
        education, and the complete tech stack. The short version lives on the{" "}
        <Link href={routes.home} className="underline underline-offset-4">
          home page
        </Link>
        , and the story behind it on{" "}
        <Link href={routes.whoami} className="underline underline-offset-4">
          /whoami
        </Link>
        .
      </p>
      <ContactCard />
      <ExperienceSection />
      <CertificationsSection detailed />
      <EducationSection detailed />
      <AwardsSection />
      <SkillsSection />
    </section>
  );
}
