# SEO Audit Report — blaze64.dev

**Site:** Sandev Abeykoon · Dev Log — personal developer blog / portfolio (Next.js on Vercel)
**Audit date:** 2026-07-18
**Scope:** 22 URLs in sitemap. Analyzed homepage, `/logs`, sample posts, `robots.txt`, `sitemap.xml`, response headers, JSON-LD schema, and Open Graph endpoints.
**Last updated:** 2026-07-20 — Critical, High, and Medium findings resolved and committed; item 3 (content depth) intentionally stopped at 2 of the 3–4 target posts by owner decision. All Low/Backlog items resolved.

## SEO Health Score: 69 / 100

| Category | Weight | Score | Notes |
|---|---|---|---|
| Technical SEO | 22% | 78 | SSR/prerendered, clean 404s, HTTP→HTTPS 308. No canonicals; thin security headers |
| Content Quality | 23% | 58 | Genuine first-person E-E-A-T, but posts are very thin (150–350 words) |
| On-Page SEO | 20% | 70 | Good per-post title/desc/OG. Generic homepage description, heading-level skips |
| Schema | 10% | 82 | Clean `Person` + `BlogPosting` JSON-LD |
| Performance | 10% | 85 | Small payloads (16–21 KB HTML), edge cache HIT, font preloads (estimated — no field data) |
| AI Search Readiness | 10% | 60 | Crawlable + schema, but broken social image and no `llms.txt` |
| Images | 5% | 40 | OG image endpoint 404s site-wide |

---

## Critical / High

### 1. The OG image endpoint `/og` returns 404 on every request — all social & AI previews are broken

**Status:** [x] Resolved. Switched every page to a static `public/og-image.jpg` (1200×630) referenced in `layout.tsx`, `logs/[slug]/page.tsx` metadata, and the `BlogPosting` schema `image` field, with per-post `metadata.image` frontmatter still overriding it. Verified live: `og:image`, `twitter:image`, and the schema `image` all resolve to `200 image/jpeg`.

Every post declares `og:image` and `twitter:image` as `https://blaze64.dev/og?title=...`, and `twitter:card` is `summary_large_image`. The route is dead:

- `/og?title=Microservice%20Auth%20with%20JWTs` → **HTTP 404**
- `/og?title=Test` → **HTTP 404**
- `/og` (bare) → **HTTP 404**
- `/logs/aws-cloud/opengraph-image` → **HTTP 404**

The `BlogPosting` schema `image` field points at the same dead URL. On X, LinkedIn, Slack, Discord, iMessage, and for LLM crawlers, posts render with **no preview image and a broken large-image card** — the worst share state. Highest-leverage fix.

- **Likely cause:** the dynamic OG route (`app/og/route.tsx` or an `opengraph-image` handler) isn't deployed/registered, or was renamed.
- **Falsifiability:** paste any post URL into opengraph.xyz or the X Card Validator — blank card confirms it.
- **Fix:** restore the `/og` handler (Next.js `ImageResponse` via `next/og`) so `GET /og?title=...` returns `200 image/png`, then re-validate one URL.
- **Leading indicator:** OG endpoint returns `200 image/png`; social debuggers render a card.

### 2. No canonical tags anywhere

**Status:** [x] Resolved. Added `alternates: { canonical }` to root, `/logs`, and per-post metadata. Sitemap apex needed no change — it already matched the form Next's metadata resolver renders for the root canonical (both verified to serve `200` with no forced redirect between slash/no-slash, since `skipTrailingSlashRedirect: true` is set).

`/`, `/logs`, and `/logs/*` all ship an **empty** canonical. Compounding it, the sitemap lists the apex as `https://blaze64.dev` (no trailing slash) while the server canonicalizes to `https://blaze64.dev/` (trailing slash). Low duplication risk today, but self-referencing canonicals are cheap insurance and consolidate signals for search/LLM.

- **Fix:** add `alternates: { canonical: <absolute-url> }` in each route's `metadata` (App Router). Make the sitemap apex match the served form (`https://blaze64.dev/`).
- **Falsifiability:** `curl -s <url> | grep canonical` returns a self-referencing absolute URL on every page.

---

## Medium

### 3. Thin content across posts

Sampled bodies: `jwt-microservice-auth` ≈ ~200 words, `aws-cloud` ≈ ~150 words (excluding nav/footer). The *experience* signal is strong (real builds, first-person, GitHub-linked) — the gap is **depth**, not authenticity.

- **Fix:** grow the best 3–4 posts to 700–1,200 words — add the concrete decision, the code snippet, the failure hit, the metric/outcome.
- **Leading indicator:** avg body word count > 600 on flagship posts; rising impressions in Search Console.

**Status:** [ ] Partially resolved, stopped intentionally. `jwt-microservice-auth` (~880 words) and `aws-cloud`, retitled "Falling Down the AWS Rabbit Hole" (~940 words), were rewritten using real facts pulled from source repos and the owner's own account — no fabricated outcomes or lessons. Owner decided to stop at 2 of the 3–4 target posts rather than expand the remaining ~17 thin posts; not a gap to chase further unless revisited.

### 4. Homepage & `/logs` share a generic duplicate meta description

Both use `"I build cool things for the web."` — thin, non-descriptive, duplicated. Weakens what an AI Overview would quote.

- **Fix:** e.g. `"Field notes from Sandev Abeykoon, a full-stack engineer — deep dives on distributed systems, cloud infra, PWAs, and microservice auth."`

**Status:** [x] Resolved. Homepage description now reads: *"Field notes from Sandev Abeykoon, a full-stack engineer who works with everything computers and servers — cloud infrastructure, distributed systems, and whatever else breaks along the way."* (mirrored in `llms.txt`). `/logs` already had its own distinct description by the time this was checked.

### 5. Heading hierarchy skips levels

`aws-cloud` goes `h1 → h3` with zero `h2`s. Breaks document outline for crawlers, screen readers, and passage-level AI extraction.

- **Fix:** demote section headings to `h2`; keep one `h1` per page.

**Status:** [x] Resolved, site-wide. Fixed on `aws-cloud` and `jwt-microservice-auth` as part of the content rewrite, then swept the remaining posts: 10 more had the same `h1→h3`/`h4` skip and one (`distributed-architecture`) had an `h4→h6` gap. All posts now go `h1→h2` cleanly with no gaps (mechanical heading-level shifts only, no wording changed).

---

## Low / Backlog

- **Security headers:** only `Strict-Transport-Security` present. Add `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY` (via `next.config.mjs` headers or `vercel.json`).
  - **Status:** [x] Resolved via `next.config.mjs` `headers()`.
- **`llms.txt`:** none present. A short `/llms.txt` pointing to the best logs is a cheap GEO win.
  - **Status:** [x] Resolved. Implemented as a dynamic route (`src/app/llms.txt/route.ts`) that generates its list from the real post data at request time, so it self-maintains as posts are added or removed.
- **Schema enrichment:** add `BreadcrumbList` on posts and `mainEntityOfPage` to `BlogPosting`; consider a `Blog` wrapper on `/logs`; add `knowsAbout` to homepage `Person`.
  - **Status:** [x] Resolved — all four pieces implemented and verified in rendered page HTML.
- **`www` doesn't resolve** — apex-only is fine; ignore unless catching mistyped `www.` links matters.
  - **Status:** [ ] Not changed — left as-is per the audit's own recommendation to ignore.

**Non-issues (verified good):** SSR/prerendered HTML (fully crawlable) · proper 404 status codes · HTTP→HTTPS 308 · robots.txt references sitemap · valid sitemap with `lastmod` · per-post titles/descriptions/OG/Twitter tags · well-formed `Person` + `BlogPosting` JSON-LD · fast edge-cached delivery.

---

## Prioritized action plan

1. [x] **Fix the `/og` image route** (High, ~1 hr) — unblocks social + AI previews for all 20 posts at once. Do first; isolated and highest-impact.
2. [x] **Add self-referencing canonicals + fix sitemap apex slash** (Medium, ~30 min).
3. [ ] **Deepen 3–4 flagship posts to 700+ words** (Medium, ongoing) — biggest long-term ranking/citation lever. *2 of 3–4 done; stopped intentionally by owner decision.*
4. [x] **Unique homepage/logs meta descriptions + fix heading levels** (Medium, ~30 min). *Heading fix applied site-wide, beyond the two posts originally flagged.*
5. [x] **Security headers + `llms.txt` + schema enrichment** (Low, backlog).

---

*Generated by the `/seo audit` skill.*
