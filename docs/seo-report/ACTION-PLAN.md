# Action Plan — blaze64.dev

**From the 2026-08-11 full audit.** Health score 78/100 (was 69 in July).
Ordered by return per unit of effort, not by severity label alone.

---

## Critical

None. Nothing on this site blocks indexing or risks a penalty.

---

## High — fix within a week

### H1. Give MDX images real dimensions (fixes CLS 0.370)

**File:** `src/components/mdx.tsx:59-72`

`width={1344} height={0}` gives the browser no aspect ratio, so no space is reserved and every image-bearing post shifts on load. Measured CLS **0.370 mobile / 0.207 desktop** on `/logs/wordpress-survival-guide` — mobile is in Google's *poor* band.

All images are local files under `public/`, and `MdxImage` renders on the server, so the real dimensions are readable at render time. `sharp` is already a project dependency:

```ts
// sharp(join(process.cwd(), "public", src)).metadata() -> { width, height }
```

Cache the lookup per path — post pages are statically generated, so it runs once per image at build.

**Verify:** re-run the CWV script; CLS on `/logs/wordpress-survival-guide` should be ≈0 on both viewports. Confirm the rendered `<img>` no longer carries `height="0"`.

### H2. Restore lazy loading

**File:** `src/components/mdx.tsx:70`

`loading="eager"` is hardcoded, which disables the lazy loading the adjacent comment claims the approach buys. Below-fold images — including a 2.04 MB GIF on `/logs/monitoring-system` — are fetched during initial load.

Eager-load only the first image in a post (the plausible LCP candidate) and lazy-load the rest; or drop the prop and take `next/image`'s `lazy` default.

**Verify:** rendered HTML shows `loading="lazy"` on all but the first image per post.

### H3. Re-encode the three animated GIFs

| File | Now | Used by |
|---|---|---|
| `public/images/godzilla-dance.gif` | 2 678 977 B | `wordpress-survival-guide.mdx:8` |
| `public/images/family-guy-car-crash.gif` | 2 040 477 B | `monitoring-system.mdx:14` |
| `public/images/dark-souls.gif` | 1 285 453 B | `socials.mdx:16` (draft) |

`next/image` passes animated GIFs through unoptimized — `/_next/image?...&w=828` returns the full original, confirmed by response size. These are 20× the largest WebP on the site.

Convert to animated WebP with `sharp` (`{ animated: true }`) or to a muted looping `<video>`. Expect 80–90 % reduction. Note the existing MDX pipeline maps `img:` to `MdxImage`; a `<video>` would need a component override, so **animated WebP is the lower-friction path** — it keeps the plain `![alt](/path)` markdown.

**Verify:** `curl -sI` each file for the new `content-length`; re-measure LCP on `/logs/wordpress-survival-guide` mobile (currently 1 452 ms).

H1–H3 are one focused change to one component plus an asset pass. Doing them together is cheaper than doing them separately.

### H4. Connect the seven isolated posts

Excluding site nav, these have **zero contextual internal links in or out**: `wordpress-survival-guide`, `cost-to-make-a-website`, `dsa-notes`, `game-design`, `init`, `work-and-contribution`, `a41sl-bot`.

The archive currently forms two clusters — infrastructure and applications — joined by a single link (`aws-cloud` ↔ `distributed-architecture`).

Highest-value connections, all topically honest:

- `wordpress-survival-guide` ↔ `ansible-cloud-config`, `building-on-premise-server`, `aws-cloud` — all four discuss the same hardening stack (AppArmor, Fail2Ban, per-site isolation)
- `a41sl-bot` ↔ `init`, `work-and-contribution` — the early-projects narrative
- `dsa-notes` ↔ `distributed-architecture` — algorithms into systems
- `cost-to-make-a-website` ↔ `building-chamilion-2025`, `wordpress-survival-guide` — what building and running a site actually costs
- One or two more bridges between the infra and application clusters

Commit `475e4f0` started this work; it stopped before reaching these seven. Match the existing in-prose style — real anchor text in a sentence, not a "related posts" block.

**Verify:** re-crawl and rebuild the link graph; every published post should have ≥1 contextual inbound and ≥1 outbound link.

---

## Medium — fix within a month

### M1. Rewrite the `/logs` description

**File:** `src/seo/copy.ts:12-14`

Still the stock Vercel starter string: *"Insights, experiments, and stories to follow along with my journey"* (66 chars). No entity, no topic, no differentiator — on the site's hub page. It also feeds the `Blog` schema `description` and the channel description of all three feeds, so one edit fixes four surfaces.

Target 140–160 chars, e.g.: *"Field logs from Sandev Abeykoon — first-hand write-ups on cloud infrastructure, DevOps, distributed systems and the projects that broke along the way."*

### M2. Fix the DevOps timeline contradiction

**File:** `src/app/page.tsx` (homepage body copy)

Homepage: *"about 5 years now, two of them in DevOps and the rest in full-stack development."*
`/whoami`, `Person` schema and `llms.txt`: DevOps Jan 2022 – Mar 2026 (≈4y2m), full-stack Apr 2026 – present (≈4 months).

The homepage inverts the split, and it is the page most likely to be retrieved when an assistant is asked who Sandev Abeykoon is. Suggested: *"about 5 years now, four of them in DevOps before moving into full-stack development."*

### M3. Make the `sameAs` claims crawlable from every page

**File:** `src/components/footer.tsx`

`Person.sameAs` asserts GitHub, LinkedIn and Stack Overflow, but the footer links only GitHub (correctly with `rel="me"`) and email. Add LinkedIn and Stack Overflow with `rel="me"`.

Then close the loop from the other side — this is the part that actually counts: put `blaze64.dev` in the GitHub profile website field, the LinkedIn contact info, and the Stack Overflow about-me. Free, and it is the corroboration `sameAs` exists to enable.

*(LinkedIn returns HTTP 999 to automated requests. That is anti-bot behaviour, not a broken link.)*

---

## Low — backlog

- **L1.** Fix heading skips: `building-on-premise-server` (h1→h3), `wordpress-survival-guide` (h1→h3), `distributed-architecture` (h2→h4). Mechanical MDX edits.
- **L2.** Add subheadings to the four posts that have none: `backup-cli`, `hive-bug-tracker`, `work-and-contribution`, `a41sl-bot`. Improves passage extraction without requiring new prose.
- **L3.** Extend the `/images/:path*` cache rule in `next.config.mjs` to cover `/og-image.jpg` (currently `max-age=0, must-revalidate`).
- **L4.** Consider a `title.template` for brand suffixing. Trade-off: most `metaTitle` values are already 52–60 chars and would truncate — shorten them first or skip.
- **L5.** Per-post `BlogPosting.image` for the 11 posts that already contain a WebP diagram. The frontmatter field exists and is unused.
- **L6.** Add `"publisher": personRef` to `BlogPosting`. Not required by Google; closes a validator warning.

---

## Ongoing

### O1. External corroboration — the actual ceiling

Common Crawl's `cc-main-2026-jan-feb-mar` graph contains **no referring domains for `blaze64.dev`**. Every on-page item above is polish next to this. On-site markup asserts the entity; nothing off-site confirms it.

In order of realistic return:
1. Reciprocal profile links (M3) — free, verifiable, closes the `sameAs` loop.
2. Employer corroboration — a link from `bespokemotorgroup.com` outweighs any on-site change available.
3. Distribute the two link-worthy assets: the `wordpress-survival-guide` malware incident write-up and the `jwt-microservice-auth` RS256/JWK walkthrough. Hacker News, r/selfhosted, r/devops, lobste.rs; answer the matching Stack Overflow questions and link back.

### O2. Configure the measurement APIs

This audit ran without CrUX, Search Console, GA4, Moz and Bing data. Field CWV and indexation status would replace lab estimates and materially sharpen the next run:

```
python3 scripts/google_auth.py --check      # in ~/.claude/skills/seo
python3 scripts/backlinks_auth.py --check
```

A free Google API key alone unlocks PageSpeed + CrUX; Search Console needs OAuth.

### O3. Content depth — owner decision, no action

Ten of 18 posts are under 400 words. The owner decided on 2026-07-20 to stop expanding after `jwt-microservice-auth` and `aws-cloud`. Recorded here as an accepted trade-off, not an open item. If it is ever reopened, `cost-to-make-a-website` (369 words) is the one post targeting real commercial-intent volume and the clearest single candidate.

---

## Phasing

| Phase | Timeframe | Items |
|---|---|---|
| 1 — Image pipeline | Week 1 | H1, H2, H3 (one component change + asset pass) |
| 2 — Structure & copy | Weeks 2–3 | H4, M1, M2, M3 |
| 3 — Polish | Month 2 | L1–L6 |
| 4 — Authority & measurement | Ongoing | O1, O2 |
