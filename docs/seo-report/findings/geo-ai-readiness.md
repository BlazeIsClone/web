# AI Search Readiness (GEO) — blaze64.dev

**Score: 82/100**

## Crawler access — fully open

`robots.txt` is `User-Agent: * / Allow: /` with a sitemap declaration. No AI crawler is blocked — GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, Bingbot all have unrestricted access. Content is server-rendered, so agents that do not execute JavaScript still receive the complete text.

## `llms.txt` — genuinely excellent

`https://blaze64.dev/llms.txt` (200, dynamic route) is better than most implementations in the wild:

- A one-line positioning blockquote, then three paragraphs answering *who is Sandev Abeykoon* without requiring a second fetch — current role + employer + start date, prior employment with dates, AWS certification with Credly URL, current stack, education, learning focus, contact email.
- A `## Site` section covering all three fixed pages.
- A `## Skills & Technologies` section grouped into six categories.
- A `## Logs` section: all 18 published posts, newest first, each with URL, publish date, `updated` date where applicable, and the full 140–160 char summary.
- An `## Elsewhere` section with labelled GitHub / LinkedIn / Stack Overflow / email links.

It is generated from `getBlogPosts()` and the `src/seo/person.ts` constants that also build the `Person` JSON-LD, so the schema and `llms.txt` cannot drift apart. Drafts are correctly excluded.

## Citability

Strong on the six substantial posts — they open with a concrete problem, use descriptive h2s that read like questions a person would ask, and contain specific technical claims (RS256, JWK endpoint, PACELC, AppArmor, IndexedDB + SSE) that are quotable as standalone passages.

Weak on the ten thin posts: four have no subheadings at all (`backup-cli`, `hive-bug-tracker`, `work-and-contribution`, and near-enough `a41sl-bot`), which leaves nothing for passage-level retrieval to anchor to.

## Findings

### 1. Near-zero external corroboration — High (hardest to fix, biggest ceiling)

Common Crawl's `cc-main-2026-jan-feb-mar` web graph returns **no referring domains and no PageRank/harmonic-centrality entry** for `blaze64.dev`. No Moz or Bing Webmaster credentials are configured, so this is one source rather than three — but an absence from the Common Crawl host graph entirely means the domain is not linked from anywhere the crawl reached.

This is the binding constraint on both classic rankings and AI citation. LLM answers preferentially cite entities corroborated across independent sources; `llms.txt` and schema tell an assistant what to believe, but nothing outside the domain confirms it.

**What actually moves this** (in rough order of return, none of them are markup):
1. **Make the profile links reciprocal.** The `Person.sameAs` array claims GitHub, LinkedIn and Stack Overflow. GitHub is confirmed by a `rel="me"` link in the footer; LinkedIn and Stack Overflow are only linked from `/whoami`. Confirm the *reverse* direction — `blaze64.dev` in the GitHub profile website field, the LinkedIn contact info, and the Stack Overflow "about me". Free, verifiable, and it is the loop `sameAs` is designed to close.
2. **Employer corroboration.** A link from `bespokemotorgroup.com` (team page, or an engineering blog byline) is worth more than any on-site change available.
3. **Post where the audience already is.** The `wordpress-survival-guide` incident write-up and the `jwt-microservice-auth` RS256/JWK walkthrough are the two genuinely link-worthy assets. Hacker News, r/selfhosted, r/devops, lobste.rs, and answering the relevant Stack Overflow questions with a link back are the realistic channels.

### 2. `sameAs` claims outrun crawlable links — Medium

`Person.sameAs` lists four URLs (including a `lk.linkedin.com` duplicate of the main LinkedIn profile). The footer links only GitHub and email. Adding LinkedIn and Stack Overflow to the footer with `rel="me"` gives every page a crawlable, machine-readable identity link instead of relying on `/whoami` alone.

Note: LinkedIn returns HTTP 999 to automated requests — that is their anti-bot response, not a broken link. Do not "fix" it.

### 3. Feeds are a real AI-discovery asset, already done — no action

RSS, Atom and JSON Feed all serve valid documents with correct content types and are advertised via `<link rel="alternate">` on every page. Atom and JSON Feed carry `updated` / `date_modified` distinctly from publish dates. Several AI crawlers and aggregators consume feeds preferentially. This is done well.

### 4. Thin posts dilute the entity — Low

Ten posts under 400 words on a 21-page site means roughly half the indexable surface has little to cite. This is the owner-accepted trade-off recorded in `findings/content.md`; noted here only because it caps the GEO score independently of anything technical.
