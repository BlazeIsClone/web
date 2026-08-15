import Link from "next/link";
import { getBlogPosts } from "@/app/logs/utils";
import {
  awards,
  certifications,
  education,
  experience,
  formatRange,
  personEmail,
  personLocation,
  personProfiles,
  routes,
  skillGroups,
  type Employer,
  type Position,
} from "@/seo";

const sectionHeading = "mb-4 text-lg font-semibold tracking-tight";
const metaLine = "text-sm text-neutral-500";
const linkStyle =
  "underline decoration-neutral-300 underline-offset-4 transition-all hover:decoration-neutral-500";

const postTitles = new Map(
  getBlogPosts().map((post) => [post.slug, post.metadata.title]),
);

function RelatedPosts({ slugs }: { slugs: readonly string[] }) {
  return (
    <p className={`mt-2 ${metaLine}`}>
      Related:{" "}
      {slugs.map((slug, index) => {
        const title = postTitles.get(slug);
        if (!title) throw new Error(`relatedPosts: unknown slug "${slug}"`);
        return (
          <span key={slug}>
            {index > 0 && ", "}
            <Link href={routes.post(slug)} className={linkStyle}>
              {title}
            </Link>
          </span>
        );
      })}
    </p>
  );
}

function PositionEntry({
  position,
  summaryOnly,
}: {
  position: Position;
  summaryOnly?: boolean;
}) {
  return (
    <div>
      <h3 className="text-md font-medium">{position.title}</h3>
      <p className={metaLine}>
        <span className="tabular-nums">
          {formatRange(position.startDate, position.endDate)}
        </span>
        {` | ${position.employmentType} | ${position.location}`}
      </p>
      {summaryOnly ? (
        <p className="mt-2 text-md">{position.summary}</p>
      ) : (
        <ul className="mt-2 list-disc space-y-1 pl-5 text-md marker:text-neutral-400">
          {position.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      )}
      {position.relatedPosts && <RelatedPosts slugs={position.relatedPosts} />}
    </div>
  );
}

function EmployerEntry({
  employer,
  summaryOnly,
}: {
  employer: Employer;
  summaryOnly?: boolean;
}) {
  return (
    <li className="border-t pt-5">
      {employer.url ? (
        <a
          href={employer.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-md font-semibold ${linkStyle}`}
        >
          {employer.name}
        </a>
      ) : (
        <span className="text-md font-semibold">{employer.name}</span>
      )}
      <div className="mt-3 space-y-5 border-l pl-4">
        {employer.positions.map((position) => (
          <PositionEntry
            key={`${position.title}-${position.startDate}`}
            position={position}
            summaryOnly={summaryOnly}
          />
        ))}
      </div>
    </li>
  );
}

interface ExperienceProps {
  summaryOnly?: boolean;
}

export function ExperienceSection({ summaryOnly }: ExperienceProps) {
  return (
    <section className="mb-10">
      <h2 className={sectionHeading}>Experience</h2>
      <ul className="space-y-6">
        {experience.map((employer) => (
          <EmployerEntry
            key={employer.name}
            employer={employer}
            summaryOnly={summaryOnly}
          />
        ))}
      </ul>
    </section>
  );
}

/** Compact one-liner strip for `/`; the full sections live on `/resume`. */
export function CredentialsSection() {
  return (
    <section className="mb-10">
      <h2 className={sectionHeading}>Credentials</h2>
      <ul className="space-y-1 border-t pt-4 text-md">
        {certifications.map((certification) => (
          <li key={certification.name}>
            <a
              href={certification.url}
              target="_blank"
              rel="noopener noreferrer"
              className={linkStyle}
            >
              {certification.name}
            </a>
            <span className="text-neutral-500">{` | ${certification.issuer.name}`}</span>
          </li>
        ))}
        {education
          .filter((entry) => entry.fieldOfStudy)
          .map((entry) => (
            <li key={entry.qualification}>
              {entry.qualification}
              <span className="text-neutral-500">{` | ${entry.institution}`}</span>
            </li>
          ))}
      </ul>
    </section>
  );
}

export function CertificationsSection({ detailed }: { detailed?: boolean }) {
  return (
    <section className="mb-10">
      <h2 className={sectionHeading}>Certifications</h2>
      <ul className="space-y-3">
        {certifications.map((certification) => (
          <li key={certification.name} className="border-t pt-4">
            <a
              href={certification.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-md font-medium ${linkStyle}`}
            >
              {certification.name}
            </a>
            <p className={metaLine}>
              {certification.issuer.name}
              {certification.issued && ` | Issued ${certification.issued}`}
              {detailed &&
                certification.credentialId &&
                ` | ${certification.credentialId}`}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function EducationSection({ detailed }: { detailed?: boolean }) {
  return (
    <section className="mb-10">
      <h2 className={sectionHeading}>Education</h2>
      <ul className="space-y-3">
        {education.map((entry) => (
          <li key={entry.qualification} className="border-t pt-4">
            <h3 className="text-md font-medium">{entry.qualification}</h3>
            <p className={metaLine}>
              <a
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                className={linkStyle}
              >
                {entry.institution}
              </a>
              {detailed && entry.startYear && (
                <span className="tabular-nums">
                  {` | ${entry.startYear}–${entry.endYear}`}
                </span>
              )}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function SkillsSection() {
  return (
    <section className="mb-10">
      <h2 className={sectionHeading}>Skills</h2>
      <ul className="space-y-1 border-t pt-4 text-md">
        {skillGroups.map((group) => (
          <li key={group.name}>
            <strong>{group.name}:</strong> {group.items.join(", ")}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function AwardsSection() {
  return (
    <section className="mb-10">
      <h2 className={sectionHeading}>Awards</h2>
      <ul className="space-y-3">
        {awards.map((award) => (
          <li key={award.name} className="border-t pt-4">
            <h3 className="text-md font-medium">{award.name}</h3>
            <p className={metaLine}>
              {award.by} | <span className="tabular-nums">{award.year}</span>
            </p>
            <p className="mt-1 text-md">{award.detail}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ContactCard() {
  return (
    <div className="mb-10 space-y-1">
      <p className="text-md">
        <a href={`mailto:${personEmail}`} className={linkStyle}>
          {personEmail}
        </a>
      </p>
      <p className={metaLine}>
        {`${personLocation.city}, ${personLocation.country} | ${personLocation.timeZoneLabel}`}
      </p>
      <ul className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-sm">
        {personProfiles.map((profile) => (
          <li key={profile.name}>
            <a
              href={profile.url}
              target="_blank"
              rel="me noopener noreferrer"
              className={linkStyle}
            >
              {profile.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
