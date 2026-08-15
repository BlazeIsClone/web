# Schema markup validation report

Date: 2026-08-15
Scope: working tree on `develop` (uncommitted `/resume` route, `resume.tsx`, `dates.ts`, and the `src/seo/` changes)
Method: `next build`, then JSON-LD extracted from the 24 prerendered HTML documents in `.next/server/app/` and submitted to Google's Schema Markup Validator (`validator.schema.org`).

## Result

**0 validation errors across all 24 pages.** Every graph parses, every `@id` resolves, every URL is absolute, every date is ISO 8601, and no deprecated type appears anywhere.

| Page | Types emitted | Validator errors |
|---|---|---|
| `/` | WebSite, ProfilePage, Person, EmployeeRole ×4, Organization ×4, PostalAddress, CollegeOrUniversity, HighSchool, EducationalOccupationalCredential ×2, ItemList | 0 |
| `/resume` | WebPage, Person (full), BreadcrumbList | 0 |
| `/whoami` | AboutPage, Person (full), BreadcrumbList | 0 |
| `/logs` | Blog, Person (ref), BreadcrumbList | 0 |
| `/logs/<slug>` ×20 | BlogPosting, Person (ref), WebPage, BreadcrumbList | 0 |

Detection notes: JSON-LD only, one block per page, present in the server-rendered HTML rather than injected by JavaScript, so it is not exposed to the delayed-processing caveat in Google's December 2025 JS SEO guidance. No Microdata and no RDFa anywhere, which is the right call.

## What the new changes got right

- **The ProfilePage move is correctly wired.** `/` is now the `ProfilePage` and declares `mainEntity` pointing at the Person; `/whoami` correctly demoted to `AboutPage` with `about`. The Person's `mainEntityOfPage` points back at `https://blaze64.dev#webpage`, so the homepage is unambiguously the canonical page for the entity. `og:type=profile` on `/` and `og:type=article` on posts both agree with their JSON-LD.
- **One Person entity, referenced rather than redefined.** The full node appears on `/`, `/resume` and `/whoami`, always under the same `@id` and with identical content, so the merge is conflict-free. Keeping the `@id` at `/whoami#person` after the page's role changed is the correct decision: an `@id` is an opaque identifier and re-minting it would reset entity consolidation.
- **URLs agree across every surface.** `<link rel="canonical">`, `og:url` and the schema `url` are byte-identical on all 24 pages, including the bare-origin homepage. No trailing-slash drift.
- **Declared OG image dimensions are truthful.** `public/og-image.jpg` measures exactly 1200×630, matching the hardcoded values in `pageMetadata()`.
- **`EmployeeRole` is the right construct and is used correctly.** It follows schema.org's documented Role pattern, repeating the `worksFor` property inside the role, which is what lets past positions carry an `endDate` that a bare `worksFor: Organization` cannot express.
- **Breadcrumbs are correct.** Positions are sequential from 1 and the final crumb omits `item`, which is what Google expects for the current page.
- **Draft handling is sound.** Both drafts (`ai-lead-capture-n8n`, `socials`) serve `noindex, nofollow` and stay out of the sitemap: 18 published posts plus 4 fixed pages gives the 22 sitemap entries observed.

## Findings

None of these are validity errors. They are accuracy and completeness issues that a validator cannot catch.

### 1. A secondary school was typed as a university (accuracy): FIXED 2026-08-15

`src/seo/person.ts` mapped every education entry to `"@type": "CollegeOrUniversity"`, so the emitted `alumniOf` said:

```json
{ "@type": "CollegeOrUniversity", "name": "S. Thomas' College, Mount Lavinia" }
```

S. Thomas' College awarded a GCE Ordinary Level, which is secondary education. The declared return type was already `CollegeOrUniversity | EducationalOrganization`, but the second half was unreachable because the type was hardcoded. This stated something false about a real institution in the one graph meant to establish the author's identity.

Fixed by adding a required `organizationType: "CollegeOrUniversity" | "HighSchool"` field to the `Education` type, set explicitly per entry and read directly by the `alumniOf` map. Making it required rather than optional means a future education entry cannot be added without deciding the question. Verified in the rebuilt output: Limkokwing stays `CollegeOrUniversity`, S. Thomas' College now emits `HighSchool`.

### 2. The Person image was 200×200: FIXED 2026-08-15

`public/sandev-abeykoon.jpg`, added in this changeset, was 200×200 and 7.1 KB. Google's structured data image guidance asks for high-resolution imagery, and most image-bearing surfaces apply a minimum around 696px wide. For entity consolidation, which is the mechanism behind ranking for a personal name query, the portrait on the Person node is a load-bearing signal and 200px was well under useful size.

Resampled to 800×800 with `sharp` (lanczos3, light sharpen to counter upscale softness, 4:4:4 chroma to avoid colour bleed on a portrait, mozjpeg q90). Now 53.6 KB. No code change was needed: `personImage` already resolves through `imageUrl()`.

Caveat worth recording: no higher-resolution original exists anywhere in the repo, and `docs/resume.pdf` contains no embedded images, so this is a 4× upscale. It clears the pixel-dimension threshold but invents no detail. Re-exporting from the true original, if one exists off-repo, would be strictly better. Separately, the portrait is strongly stylized (red and blue gel lighting, face half in shadow); a plainly lit headshot is easier for Google to attach to a name entity, though that is the owner's call.

### 3. All 20 posts share one image

No `metadata.json` sets `image`, so every `BlogPosting.image` resolves to `https://blaze64.dev/og-image.jpg`. Valid, but Google's Article guidance asks for an image representative of the article, and an identical image across the whole corpus offers nothing to differentiate one post from another. Three posts gained real WebP assets in this changeset. Note the constraint recorded in `CLAUDE.md`: `image` must be a real public URL string, so per-post cards need to live in `public/` rather than being imported as bundled assets.

### 4. `BlogPosting` has no `publisher`

Google lists `publisher` among the recommended Article properties. On a single-author site this is one line, `publisher: personRef`, in the graph built in `src/app/logs/[slug]/page.tsx:73`.

### 5. `ProfilePage` had no `dateCreated`: FIXED 2026-08-15

Google recommends `dateCreated` alongside `dateModified` for `ProfilePage`; the pair is what distinguishes a long-standing profile from a freshly minted one. `dateModified` was already present and correctly sourced from `lastUpdated.resume`.

Fixed with a real date rather than an invented one: `siteCreated = "2024-09-07"` in `config.ts`, taken from the repository's initial commit (`4c30d66`), which is when the homepage first existed at this URL. It sits beside `lastUpdated` rather than inside it, because a creation date is not a maintenance timestamp and folding it in would make that object's name a lie.

### 6. The `/logs` graph is lighter than its siblings

The `Blog` node carries no `isPartOf`, no `mainEntityOfPage`, and does not link its own `BreadcrumbList`, which sits unreferenced at graph top level. The other three fixed pages all wire `breadcrumb: ref(...)` from their page node. Google reads a top-level `BreadcrumbList` fine, so nothing is broken; this is an internal consistency gap. `/logs` is also the only listing page with no `ItemList` or `blogPost` enumeration of what it lists.

### 7. Two URLs for the same LinkedIn profile in `sameAs`

`person.ts:392-396` emits both `https://www.linkedin.com/in/sandev-abeykoon/` and `https://lk.linkedin.com/in/sandev-abeykoon`. The second is a geo-mirror of the first, so `sameAs` asserts two identities where there is one. Harmless, but it is also hardcoded inline rather than coming from `personProfiles`, which the module documents as the single source for profile links.

### 9. The Person `@id` fragment resolved to nothing: FIXED 2026-08-15

Not surfaced by validation, since Google treats `@id` as an opaque identifier and never dereferences it. Raised separately by the owner and worth recording.

The Person entity is identified as `https://blaze64.dev/whoami#person`, but `/whoami` carried no element with `id="person"`, so following that URL landed at the top of the page rather than at the self-description it names. Fixed by putting the anchor on the `<article>` that holds the profile narrative.

The fragment string is no longer written twice. `personAnchor = "person"` in `person.ts` now builds `personId` and is also what `/whoami` renders as the DOM `id`, so the anchor cannot drift away from the `@id` if either is edited. Verified after rebuild: the emitted anchor and the `@id` fragment both read `person`, and the `@id` value is byte-identical to what it was before, which matters because re-minting it would reset Google's entity consolidation.

### 8. The homepage `ItemList` is unattached

`#featured-logs` sits at graph top level and nothing references it. Google surfaces `ItemList` carousels only for specific verticals, none of which apply here, so it produces no rich result either way. If it is intended as a relatedness signal, `hasPart` on the `ProfilePage` node would connect it to the graph.

## Priority

| # | Finding | Severity | Status |
|---|---|---|---|
| 2 | Person image 200×200 | High | Fixed 2026-08-15, resampled to 800×800 |
| 1 | Secondary school typed as `CollegeOrUniversity` | Medium | Fixed 2026-08-15, now `HighSchool` |
| 4 | `BlogPosting` missing `publisher` | Low | Open, 1 line |
| 3 | All posts share one image | Low | Open, per-post asset work |
| 5 | `ProfilePage` missing `dateCreated` | Info | Fixed 2026-08-15, `2024-09-07` from the initial commit |
| 6 | `/logs` graph inconsistency | Info | Open, ~4 lines |
| 7 | Duplicate LinkedIn in `sameAs` | Info | Open, 1 line |
| 8 | Unattached `ItemList` | Info | Open, 1 line |
| 9 | Person `@id` fragment had no DOM anchor | Info | Fixed 2026-08-15, `personAnchor` drives both |

Re-validation after the two fixes: the local structural validator reports no new findings, and the only markup delta is one `@type` swap between two valid `EducationalOrganization` subtypes. Google's validator was rate-limiting by that point (it blocks after roughly 50 requests in quick succession), so the post-fix confirmation against Google specifically is pending; re-run `gvalidate.mjs` from the session scratchpad once the limit clears.
