# Schema / Structured Data — blaze64.dev

**Score: 92/100** — the strongest category on the site. Every JSON-LD block parses, every `@id` reference resolves, no orphan nodes, no type errors.

## Implementation

| Page | Graph |
|---|---|
| `/` | `WebSite` (`#website`) + `CollectionPage` (`#webpage`) with `mainEntity` → `ItemList` of 10 recent logs |
| `/logs` | `Blog` (`#blog`) + `BreadcrumbList` |
| `/whoami` | `ProfilePage` (`#webpage`) + `Person` (`#person`) + `BreadcrumbList` |
| `/logs/*` (×18) | `BlogPosting` (`#post`) + `BreadcrumbList` |

### Entity consolidation is done correctly

One canonical `Person` node lives at `https://blaze64.dev/whoami#person`. Every other node — `WebSite.author`, `WebSite.publisher`, `CollectionPage.about`, `Blog.author`, all 18 `BlogPosting.author` — references it by `@id` rather than redeclaring it. `@context` appears on the graph only, never on member nodes. This is the correct pattern and it is applied consistently.

The `Person` node carries `jobTitle`, `description`, `email`, `sameAs` (×4), `knowsAbout` (13 curated terms), `alumniOf` (`CollegeOrUniversity` with post-redirect URL), `hasCredential` (`EducationalOccupationalCredential` → Credly, `recognizedBy` AWS), and `worksFor` as an `EmployeeRole` with `startDate` wrapping the employer `Organization`.

### `BlogPosting` completeness — all 18 posts

`headline`, `datePublished`, `dateModified`, `description`, `image`, `url`, `mainEntityOfPage`, `author` (ref), `isPartOf` (→ `#blog`). No required field missing on any post. All headlines are ≤ 36 chars, well inside Google's 110-char limit.

## Findings

### 1. All 18 posts share one generic `image` — Low

Every `BlogPosting.image` is `https://blaze64.dev/og-image.jpg`. Valid, but the image conveys nothing about the individual post, so it adds no discriminating signal in rich results or social/AI previews. The `image` frontmatter field already supports per-post overrides — it is simply unused.

**Fix (optional):** the 11 posts that already contain a WebP diagram could reference it. Cheap: `image: /images/aws-wordpress-architecture.webp` in frontmatter. Note these are not 1200×630, so they are better as `BlogPosting.image` than as the OG card.

### 2. No `publisher` on `BlogPosting` — Info

Google dropped the `publisher` requirement for `Article` types, so this is not an error. Adding `"publisher": personRef` costs one line and closes a validator warning if one is ever run.

### 3. Unused enrichment opportunities — Low

`keywords`, `about`, `articleSection`, `wordCount`, and `timeRequired` are absent from every `BlogPosting`. None affect rich-result eligibility. `about` (referencing a `Thing`/`DefinedTerm` per post) is the only one with real AI-grounding value, and only if the terms are accurate — worth it for the 6 substantial posts, not for the 134-word ones.

### 4. `CollectionPage` on the homepage — Info, defensible

The homepage is typed `CollectionPage` because it leads with a 10-item post list. `WebPage` or `ProfilePage` would also be defensible given the biography above the list. No practical difference; leave it.

## Validated clean

- No `@id` collisions across pages.
- `breadcrumb` correctly attached to `WebPage`-derived types only (`ProfilePage`), and emitted as a **sibling** `BreadcrumbList` node on `BlogPosting` pages — which is what Google reads and what `schema-dts` permits. This was a deliberate design decision and it is correct.
- `ItemList` uses `itemListOrder: ItemListOrderDescending` with explicit `position` — consistent with the rendered order.
- Dates are ISO-8601 and match the frontmatter and the sitemap `lastmod`.
