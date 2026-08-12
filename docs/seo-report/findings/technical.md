# Technical SEO — blaze64.dev

**Audit date:** 2026-08-11 · **Pages crawled:** 21 (all sitemap URLs) + 2 draft URLs · **Score: 94/100**

## What works

| Check | Result |
|---|---|
| HTTP status, all 21 sitemap URLs | 200, zero redirects, zero errors |
| `robots.txt` | `Allow: /` for all agents, sitemap declared |
| `sitemap.xml` | 21 URLs, valid, `lastmod` per URL, drafts excluded |
| Canonicals | Self-referencing on every page, no cross-canonical conflicts |
| HTTPS + HSTS | `strict-transport-security: max-age=63072000` |
| Security headers | `x-content-type-options: nosniff`, `x-frame-options: DENY`, `referrer-policy: strict-origin-when-cross-origin` |
| `http://` → `https://` | 308 |
| `www.blaze64.dev` → apex | 301 (the July audit's "www does not resolve" finding is now fixed) |
| `/about` → `/whoami` | 308 |
| 404 handling | Unknown paths return a real 404 (no soft-404) |
| Draft posts | `ai-lead-capture-n8n`, `socials` serve `noindex, nofollow` and are absent from sitemap + llms.txt |
| Apex trailing slash | `skipTrailingSlashRedirect: true` — both forms serve 200 with an identical canonical, no duplicate |
| Feeds | `rss.xml`, `atom.xml`, `feed.json` all 200 with correct content types, autodiscovery `<link rel=alternate>` on every page |
| TTFB (lab) | 36–139 ms desktop, 53–312 ms mobile — Vercel edge cache HIT |

## Findings

### 1. `og-image.jpg` is served with no cache lifetime — Low

`/images/*` gets `cache-control: public, max-age=31536000, immutable`, but the social card at `/og-image.jpg` gets `cache-control: public, max-age=0, must-revalidate`. Every social/AI crawler refetch is a full round trip for a file that only changes when the design does.

**Fix:** extend the `next.config.mjs` `headers()` rule that covers `/images/:path*` to cover `/og-image.jpg`, or move the file to `public/images/`.

### 2. `/og` still returns 404 — Info, no action

Legacy dynamic-OG route from before the static card. Nothing references it (verified: no occurrence in any rendered page, sitemap, or feed). Left as-is deliberately per the July audit.

## Not an issue (checked, confirmed clean)

- No `noindex` leaking onto published pages — `robots` meta is absent on all 21 published URLs and present only on the 2 drafts.
- No orphaned or 404 internal links — every internal `href` resolves to a 200 URL in the crawl set.
- No mixed content, no non-HTTPS subresources.
- HTML is server-rendered; content is fully present without JS execution (verified against raw HTML, not just rendered DOM).
