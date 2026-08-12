# On-Page SEO — blaze64.dev

**Score: 76/100**

## Titles and descriptions

All 21 titles are unique and within range (28–60 chars). All descriptions are unique. Twenty of 21 descriptions sit in the 142–160 char sweet spot — the `metaTitle` / `summary` frontmatter convention is doing its job well.

### 1. `/logs` description is 66 chars of starter-template boilerplate — Medium

```
Insights, experiments, and stories to follow along with my journey
```

This is the stock Vercel blog-starter string, still in `src/seo/copy.ts:12-14`. It carries no entity ("Sandev Abeykoon"), no topic ("DevOps", "cloud infrastructure", "distributed systems"), and no differentiator. It is also the `description` on the `Blog` JSON-LD node and the channel description on all three feeds, so one weak string propagates to four surfaces.

`/logs` is the site's hub page and the most likely non-brand landing page. Every *post* description on the site is better written than the index's.

**Fix:** rewrite in `copy.ts` at 140–160 chars, e.g. *"Field logs from Sandev Abeykoon — first-hand write-ups on cloud infrastructure, DevOps, distributed systems and the projects that broke along the way."* One edit; propagates to page meta, OG/Twitter, `Blog` schema, and all three feeds automatically.

### 2. No title template — post titles carry no brand — Low

Root `layout.tsx` has no `title.template`, so a SERP entry for a post reads `Backup CLI: MySQL and Filesystem Backups over SFTP in Rust` with nothing tying it to the site or author. Deliberately left alone in the July review as out-of-scope for a single-page pass; worth revisiting now.

Trade-off: most post titles are already 52–60 chars, so a ` – blaze64.dev` suffix would push them past the truncation point. If applied, shorten `metaTitle` values first, or accept truncation of the suffix (Google often drops it cleanly).

## Heading structure

Every page has exactly one `<h1>`, and the h1 is unique per page. Three posts skip heading levels — Google tolerates this, but headings are what get extracted as standalone passages for AI answers, so a broken ladder weakens passage retrieval.

| Post | Current ladder | Problem |
|---|---|---|
| `building-on-premise-server` | h1 → **h3** → h2 → h2 → h3 → h3 | First heading is h3; `Hardware` should be h2 |
| `wordpress-survival-guide` | h1 → **h3** → h3 → h2 → h2 | `1. Network Hardening` / `2. Application Isolation` should be h2, or nest under a new h2 |
| `distributed-architecture` | h2 → h3 → h3 → h2 → **h4** → h4 → h5 → h5 → h2 | `Implementation Patterns` (h2) is followed by h4, skipping h3 |

Severity: **Low**. Mechanical fix in the MDX source.

### 3. Four posts have no subheadings at all — Medium

`backup-cli` (134 w), `hive-bug-tracker` (172 w), `work-and-contribution` (338 w) render as a bare h1 plus an unbroken block. `a41sl-bot` (429 w) has a single h2. No structure means no extractable passages and no anchor targets.

## Internal linking — the biggest on-page gap

Contextual in-body links (excluding the site nav `/`, `/logs`, `/whoami`, which appear on every page) form **two disconnected clusters and seven isolated posts**:

**Infrastructure cluster** (well linked): `ansible-cloud-config` ↔ `aws-cloud` ↔ `cloud-backup-pipeline` ↔ `monitoring-system` ↔ `building-on-premise-server` ↔ `backup-cli` ↔ `building-chamilion-2025`

**Application cluster** (well linked): `distributed-architecture` ↔ `jwt-microservice-auth` ↔ `local-first-pwa` ↔ `hive-bug-tracker`

**Zero contextual inbound *and* outbound links** — reachable only via `/logs` and (for some) the homepage's 10-item recent list:

| Post | Words | Contextual inbound |
|---|---|---|
| `cost-to-make-a-website` | 369 | 0 |
| `dsa-notes` | 2 254 | 0 (homepage list only) |
| `game-design` | 203 | 0 (homepage list only) |
| `init` | 86 | 0 |
| `wordpress-survival-guide` | 498 | 0 |
| `work-and-contribution` | 338 | 0 |
| `a41sl-bot` | 306 | 0 (`/whoami` links it) |

### 4. The two clusters never link to each other — Medium

Nothing connects the infra cluster to the application cluster, even where the topics genuinely overlap (`aws-cloud` ↔ `distributed-architecture` is the one existing bridge). PageRank pooled in two places does not flow site-wide.

### 5. `wordpress-survival-guide` is isolated despite being the strongest topical asset — Medium

A first-hand account of a real malware incident with screenshots — the kind of page that earns links and gets cited — with zero internal links pointing at it. `ansible-cloud-config`, `building-on-premise-server` and `aws-cloud` all discuss the same hardening stack (AppArmor, Fail2Ban, per-site isolation) and are the natural referrers.

**Fix:** add 2–3 contextual links per isolated post, in prose, in both directions. The house style already does this well inside the two clusters — extend the same pattern outward. The last commit (`475e4f0 fix: add contextual internal links between related posts`) started this work; it stopped before reaching these seven.

### 6. Homepage lists only 10 of 18 published posts — Low

Eight older posts (`cost-to-make-a-website`, `work-and-contribution`, `monitoring-system`, `wordpress-survival-guide`, `building-on-premise-server`, `a41sl-bot`, `backup-cli`, `init`) receive no homepage link. Combined with finding 4, the older half of the archive sits two hops from the strongest page. Not necessarily wrong — a "recent" list is a reasonable design — but it makes the contextual-link fix more important, not less.
