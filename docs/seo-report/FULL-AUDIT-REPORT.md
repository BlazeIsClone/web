# Full SEO Audit — blaze64.dev

**Audit date:** 2026-08-11
**Pages crawled:** 21 published (complete sitemap) + 2 drafts verified
**Business type:** Personal technical blog / engineer portfolio — single-author field journal, non-commercial, no local or e-commerce signals
**Previous audit:** 2026-07-18, health score 69/100 (`docs/seo-audit-report.md`)

**Update — 2026-08-14:** Two of this audit's three "top 5 issues" (#1 CLS, #3 disabled lazy loading) were fixed by commits made *after* this audit ran, before this report had even been read. `a6351dd` ("mdx component library migrated & post structure", 2026-08-12) deleted the `src/components/mdx.tsx` file this report cites throughout and replaced its hand-rolled `<img>` logic with `next/image` static imports via the new `PostImage` component, which derives real `width`/`height` from the imported file automatically instead of the old `width={1344} height={0}`. `8a58ec6` ("priority load post first image", 2026-08-13) then applied this report's own recommended fix for eager-loading — `priority` on exactly the first `PostImage` in each of the 10 image-bearing posts, default lazy for the rest — verified across all 10.
Confirmed live on production (`curl https://blaze64.dev/logs/wordpress-survival-guide/`): the GIF `<img>` now ships `width="498" height="480"` with no `loading` attribute (priority), and subsequent images ship real dimensions with `loading="lazy"`. Same pattern confirmed on `/logs/monitoring-system/`.
The Performance (62) and Images (55) scores below, and the CLS 0.370/0.207 measurements, predate this fix and should be treated as **historical** until a fresh lab/PSI run replaces them — Google's PageSpeed Insights API is rate-limited at the time of this update, so no new number is substituted rather than guessing one. Everything else in this report (Content, On-Page, Schema, Technical, AI Search Readiness, and the GIF-weight/internal-linking/heading-skip findings specifically) was independently re-checked against the current repo and live site on 2026-08-14 and remains accurate. Per-finding status notes are inline below and in `findings/performance.md`, `findings/images.md`, and `findings/technical.md`.

**Update — 2026-08-15:** the second of the three clustered problems named in the Executive Summary below — the 6.0 MB of unoptimized GIFs — is also now resolved. All three (`godzilla-dance`, `family-guy-car-crash`, `dark-souls`) were re-encoded to animated WebP via `sharp({ animated: true })` (a transitive dependency of `next/image`, already present in `node_modules`) and swapped into their posts' MDX imports; the `.gif` sources were deleted. Total weight: 6.0 MB → 1.16 MB (-80.7 %) — the mobile LCP element `godzilla-dance` alone went from 2.68 MB to 195 KB. Verified via `npm run build` and the served production HTML: images render from `/_next/static/media/*.webp` with real dimensions, no `/_next/image` proxy hop, matching the pattern the GIFs used before. Of the report's original three clustered problems, only #3 (fragmented internal linking) remains open. The Performance (62) and Images (55) scores above still predate all three fixes and remain historical pending re-measurement. Full detail in `findings/performance.md` and `findings/images.md`.

---

## Executive summary

# SEO Health Score: 78 / 100  <small>(was 69)</small>

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22 % | 94 | 20.7 |
| Content Quality | 23 % | 68 | 15.6 |
| On-Page SEO | 20 % | 76 | 15.2 |
| Schema / Structured Data | 10 % | 92 | 9.2 |
| Performance (CWV) | 10 % | 62 | 6.2 |
| AI Search Readiness | 10 % | 82 | 8.2 |
| Images | 5 % | 55 | 2.8 |
| **Total** | | | **78** |

The technical foundation is in very good shape — the July action plan was executed and it shows. Canonicals, security headers, `llms.txt`, feeds, draft handling, `www` resolution and the entity schema graph are all correct, and several of them are better than typical.

The remaining problems cluster in three places, and two of them are **the same two lines of code**:

1. **`src/components/mdx.tsx` lines 66-70** cause the site's only failing Core Web Vital (CLS 0.370 on mobile) and disable lazy loading site-wide.
2. **Three animated GIFs (6.0 MB)** are served unoptimized because `next/image` passes GIFs through untouched.
3. **Seven posts have no contextual internal links** in either direction, leaving the archive split into two disconnected clusters plus a set of isolated pages.

Everything else is either polish or the owner-accepted decision to stop expanding thin posts.

### Top 5 issues

| # | Issue | Severity | Evidence |
|---|---|---|---|
| 1 | ~~`height={0}` on every MDX image → CLS **0.370** mobile / 0.207 desktop~~ — **Resolved 2026-08-12** (`a6351dd`) | ~~High~~ | `mdx.tsx` (deleted) no longer exists; `PostImage` now derives real dimensions from static imports. Live-verified: `width="498" height="480"` on `/logs/wordpress-survival-guide/`. |
| 2 | ~~Three animated GIFs total **6.0 MB**, served unoptimized; a 2.68 MB GIF is the mobile LCP element~~ — **Resolved 2026-08-15** | ~~High~~ | All three re-encoded to animated WebP (`sharp`); 6.0 MB → 1.16 MB (-80.7 %). `godzilla-dance` (mobile LCP element) 2.68 MB → 195 KB. `.gif` sources deleted, MDX imports updated, `unoptimized` kept (animated WebP still bypasses `next/image` optimization, same as GIF did). |
| 3 | ~~`loading="eager"` hardcoded → lazy loading disabled site-wide~~ — **Resolved 2026-08-13** (`8a58ec6`) | ~~High~~ | `priority` now set on exactly the first `PostImage` per post (verified all 10 image-bearing posts); rest default to lazy. |
| 4 | Seven posts have zero contextual internal links; the two topic clusters never connect | Medium | Link graph across all 21 crawled pages — **still open**, re-checked `wordpress-survival-guide` 2026-08-14, no internal links added |
| 5 | Domain absent from the Common Crawl web graph — no referring domains found | High (external) | `cc-main-2026-jan-feb-mar` — external signal, unaffected by repo changes |

### Top 5 quick wins

| # | Win | Effort |
|---|---|---|
| 1 | Rewrite the `/logs` description in `src/seo/copy.ts` — one string, propagates to page meta, OG/Twitter, `Blog` schema and all three feeds | 5 min |
| 2 | Fix the homepage/`/whoami` DevOps-timeline contradiction ("two of them in DevOps" vs. 4y2m in schema and `llms.txt`) | 5 min |
| 3 | Add LinkedIn + Stack Overflow to the footer with `rel="me"` — makes the `sameAs` claims crawlable from every page | 15 min |
| 4 | Add a dedicated cache header rule for `/og-image.jpg` in `next.config.mjs` — the `/images/:path*` rule this originally pointed at was removed in `a6351dd` since post images no longer live under `public/images/` (they're colocated per-post and served content-hashed from `/_next/static/media/`, which gets Next's default immutable caching automatically — verified live). `/og-image.jpg` is the one file left in `public/` still serving `max-age=0, must-revalidate` (confirmed live 2026-08-14). | 5 min |
| 5 | Fix heading skips in 3 posts (`building-on-premise-server`, `wordpress-survival-guide`, `distributed-architecture`) | 15 min |

---

## Technical SEO — 94/100

All 21 sitemap URLs return 200 with no redirect hops. Self-referencing canonicals everywhere. HSTS, `nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy` all present. `http→https` 308, `www→apex` 301 (the July finding is now resolved), `/about→/whoami` 308, real 404s on unknown paths. Both draft posts serve `noindex, nofollow` and are excluded from the sitemap and `llms.txt`. TTFB 36–139 ms desktop on Vercel edge cache hits.

Only finding: `/og-image.jpg` is served `max-age=0, must-revalidate` while `/images/*` gets a year of immutable caching.

→ Full detail: [`findings/technical.md`](findings/technical.md)

## Content Quality — 68/100

E-E-A-T is strong and real: a named author with a verifiable AWS certification, a current employer with a live URL, first-hand build write-ups, and working contact routes. Nothing is fabricated or borrowed.

The constraint is depth. Ten of 18 published posts are under 400 words and four have no subheadings at all. **This is a recorded owner decision from 2026-07-20 to stop after expanding two posts**, not an oversight, and no action is recommended unless reopened. It is reported because it remains the largest cap on organic reach — a 134-word page will not rank regardless of the technical quality around it.

One correctable content defect: the homepage says *"two of them in DevOps and the rest in full-stack development"*, while `/whoami`, the `Person` schema and `llms.txt` all state DevOps Jan 2022 – Mar 2026 (≈4y2m) and full-stack from Apr 2026 (≈4 months). The homepage inverts the split, and it is the page most likely to be retrieved when an assistant is asked about the author.

→ Full detail: [`findings/content.md`](findings/content.md)

## On-Page SEO — 76/100

Titles and descriptions are handled well: 21 unique titles at 28–60 chars, 21 unique descriptions, 20 of them at 142–160 chars. The `metaTitle` / `summary` frontmatter convention is working.

Two structural gaps:

**`/logs` still carries the Vercel starter boilerplate** — *"Insights, experiments, and stories to follow along with my journey"* (66 chars), in `src/seo/copy.ts:12-14`. It names no entity and no topic, and it also feeds the `Blog` schema `description` and all three feed channel descriptions. The site's hub page has a weaker description than any of its posts.

**Internal linking is fragmented.** Excluding site nav, the archive forms two well-linked clusters — infrastructure (`ansible-cloud-config`, `aws-cloud`, `cloud-backup-pipeline`, `monitoring-system`, `building-on-premise-server`, `backup-cli`, `building-chamilion-2025`) and applications (`distributed-architecture`, `jwt-microservice-auth`, `local-first-pwa`, `hive-bug-tracker`) — connected to each other by exactly one link. Seven posts sit outside both with zero contextual links in or out, including `wordpress-survival-guide`, which is arguably the site's most link-worthy asset.

Also: three posts skip heading levels; four posts have no subheadings; no `title.template`, so post SERP entries carry no brand.

→ Full detail: [`findings/on-page.md`](findings/on-page.md)

## Schema & Structured Data — 92/100

The strongest category. Every JSON-LD block parses, every `@id` resolves, no orphan nodes. One canonical `Person` at `/whoami#person` is referenced by `@id` from `WebSite.author`, `WebSite.publisher`, `CollectionPage.about`, `Blog.author` and all 18 `BlogPosting.author` nodes — correct entity consolidation, applied consistently. `@context` appears on graphs only, never on member nodes.

All 18 `BlogPosting` nodes carry the full required set (`headline`, `datePublished`, `dateModified`, `description`, `image`, `url`, `mainEntityOfPage`, `author`, `isPartOf`) with no field missing anywhere. `BreadcrumbList` is correctly emitted as a sibling node on post pages rather than as a `BlogPosting.breadcrumb` property.

Remaining opportunities are all optional: every post shares the same generic `image`, and `keywords` / `about` / `wordCount` are unused.

→ Full detail: [`findings/schema.md`](findings/schema.md)

## Performance (Core Web Vitals) — 62/100 (historical — see update note)

**No field data available** — no Google API key configured, so there is no CrUX. These are lab measurements from headless Chromium on an unthrottled connection and represent a best case, captured 2026-08-11, **before** the `a6351dd`/`8a58ec6` image-pipeline fix.

Nineteen of 21 pages were excellent even then: LCP 84–492 ms, CLS 0, transfer 22–444 KB. Two pages were not, and both traced to the same root cause — `height={0}` on every MDX image:

| Page | Device | LCP | CLS | Transfer |
|---|---|---|---|---|
| `/logs/wordpress-survival-guide` | mobile | 1 452 ms | **0.370** | 2 683 K |
| `/logs/wordpress-survival-guide` | desktop | 376 ms | **0.207** | 2 678 K |
| `/logs/monitoring-system` | mobile | 720 ms | 0 | 2 092 K |
| `/logs/monitoring-system` | desktop | 812 ms | 0.062 | 2 086 K |

**Status as of 2026-08-14:** the `height={0}` cause of the CLS numbers above is fixed (see the update note at the top of this report) — every image now ships real `width`/`height` from a static import, confirmed live in production HTML for both pages. CLS should now read at or near 0 on both, the same as the other 19 pages, but this is not yet re-measured: Google's PageSpeed Insights API returned a rate-limit error when queried for this update (`PSI rate limit exceeded (240 QPM / 25,000 QPD)`), so the score above is left at its pre-fix value rather than replaced with a guess. Re-run `pagespeed_check.py` (or a fresh full audit) once quota resets to get the real number.

**Update 2026-08-15:** the GIF-weight finding referenced below is now also resolved — `godzilla-dance` (the mobile LCP element on `/logs/wordpress-survival-guide`) dropped from 2.68 MB to 195 KB, a swap that on a real 4G connection turns roughly 13 seconds of transfer into a fraction of a second. Combined with the already-resolved CLS fix, both lab blockers for `wordpress-survival-guide` and `monitoring-system` are now addressed on paper; only re-measurement remains to confirm the current numbers.

`/logs/dsa-notes` looks alarming at 667 KB of HTML but compresses to 23.5 KB over the wire and renders in 136–180 ms — no action needed.

→ Full detail: [`findings/performance.md`](findings/performance.md)

## Images — 55/100 (historical — see update note)

Alt text is at 100 % coverage and 20 of 23 files are already WebP at 4–135 KB — the discipline is there. The 581 KB `og-image.jpg` from the July audit is now 25 KB.

At audit time, the three GIF exceptions (6.0 MB total, which `next/image` cannot re-encode) combined with `height={0}` and `loading="eager"` in `src/components/mdx.tsx` to produce every performance and CLS finding above. As of 2026-08-15, both halves are fixed: `mdx.tsx` no longer exists (the `height={0}`/`loading="eager"` half, resolved 2026-08-12/13) and all three GIFs are re-encoded to animated WebP (the weight half, resolved 2026-08-15 — 6.0 MB → 1.16 MB, -80.7 %). This score is left unchanged pending re-measurement — see the update note at the top of this report.

→ Full detail: [`findings/images.md`](findings/images.md)

## AI Search Readiness (GEO) — 82/100

`robots.txt` is fully open to every AI crawler, content is server-rendered, and `llms.txt` is genuinely excellent — a self-contained author profile, all three site pages, six grouped skill categories, all 18 posts with dates and full summaries, and labelled profile links. It is generated from the same `src/seo/person.ts` constants that build the `Person` schema, so the two cannot drift. Three feed formats with correct `updated` semantics add real discovery surface.

The ceiling is external, not on-page: **Common Crawl's current web graph contains no referring domains for `blaze64.dev` at all.** Nothing outside the domain corroborates what the schema and `llms.txt` assert. The highest-return fixes are reciprocal profile links (GitHub website field, LinkedIn contact info, Stack Overflow about-me), employer corroboration, and posting the two genuinely link-worthy assets — the WordPress malware incident write-up and the RS256/JWK walkthrough — where their audiences are.

→ Full detail: [`findings/geo-ai-readiness.md`](findings/geo-ai-readiness.md)

---

## Method and limitations

- Full crawl of all 21 published URLs plus both drafts; raw HTML retained in `raw/`.
- On-page elements, heading ladders, link graph, image attributes and JSON-LD parsed from the served HTML, not from source.
- CWV measured via Playwright + `PerformanceObserver` (Chromium 1228) at 390×844 mobile @2x and 1440×900 desktop, unthrottled.
- Backlinks from Common Crawl `cc-main-2026-jan-feb-mar` only.

**Not available for this audit:** CrUX field data, Search Console indexation and query data, GA4 traffic (no Google API credentials); Moz DA/PA and Bing Webmaster link data (no credentials). Configure these via `python3 scripts/google_auth.py --check` and `scripts/backlinks_auth.py --check` in the `seo` skill to enrich a future run.
