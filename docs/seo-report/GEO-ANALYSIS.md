# GEO / AI search analysis: blaze64.dev

**Date:** 2026-08-15
**Goal set by owner:** rank for "Sandev Abeykoon" in Sri Lanka, and surface for
software engineer queries in Colombo.
**Scope decisions:** location published at city level (Colombo) only, no suburb;
targeting both name and discovery queries; no Google Business Profile.

Point-in-time analysis, like `seo-audit-report.md`. Useful history, not a living
doc.

---

## GEO readiness score: 75/100

| Criterion | Weight | Score | Note |
|---|---|---|---|
| Citability | 25% | 19 | FAQ block added; quantified claims deliberately confined to `/resume` |
| Structural readability | 20% | 16 | Clean H1/H2/H3; `/logs` is a bare list with no H2 |
| Multi-modal content | 15% | 8 | Images only. No video, diagrams, or interactive elements |
| Authority & brand signals | 20% | 12 | Strong on-site, thin off-site. The real gap |
| Technical accessibility | 20% | 19 | Full SSR, all AI crawlers allowed, feeds and llms.txt present |

Scores are an assessment against the criteria weights, not measured citation
data. Treat the ranking between rows as the signal, not the absolute numbers.

**The headline:** the site is no longer the bottleneck. Technical and schema
work is close to maxed. Nearly all remaining upside is off-site.

---

## Platform breakdown

| Surface | Assessment | Why |
|---|---|---|
| Google AI Overviews | Good | Ranking-correlated, and classic SEO here is strong. Follows whatever the blue links do |
| Google AI Mode | Good | Rewards freshness and entity authority over raw position. Post cadence is healthy; entity authority is the weak half |
| ChatGPT | Weak | Cites Wikipedia (47.9%) and Reddit (11.3%) heavily. Present on neither |
| Perplexity | Weak | Reddit is 46.7% of its citations. No presence |
| Bing Copilot | Moderate | Depends on Bing indexation, which is unverified. No IndexNow |

Only ~11% of domains are cited by both ChatGPT and Google AI Overviews for the
same query, so the Google-side strength does not carry over to the others.

---

## AI crawler access

`robots.txt` is `User-Agent: * / Allow: /` with a sitemap reference. Every AI
crawler is therefore permitted, including the ones that matter for citation:

| Crawler | Status |
|---|---|
| GPTBot, OAI-SearchBot (OpenAI) | Allowed |
| ClaudeBot, anthropic-ai (Anthropic) | Allowed |
| PerplexityBot | Allowed |
| Google-Extended (Gemini grounding) | Allowed |
| CCBot (Common Crawl) | Allowed |

No action needed. A blanket allow is the correct posture for a personal site
whose goal is maximum discoverability.

---

## llms.txt

Present at `/llms.txt`, generated from `src/seo/person.ts` so it cannot drift
from the rendered pages. Now carries an explicit `Location:` and
`Areas served:` line mirroring the schema.

**Do not expect Google ranking value from this.** Google's AI optimization
guide (updated 2026-06-29) states outright that AI-text files are ignored by
Google Search and "won't harm (nor help) your visibility or rankings", and
Mueller has called the discovery use case "a dead end". It is kept for
non-Google AI services only.

---

## Brand mention analysis

Brand mentions correlate ~3x more strongly with AI visibility than backlinks
(Ahrefs, 75,000 brands). Current footprint:

| Platform | Present | Citation correlation |
|---|---|---|
| GitHub (`BlazeIsClone`) | Yes, ranks for the name | Moderate |
| LinkedIn | Yes (`lk.linkedin.com` in `sameAs`) | Moderate |
| Stack Overflow | Yes | Moderate |
| YouTube | **No** | ~0.737, the strongest single signal |
| Reddit | **No** | High, and dominant for Perplexity |
| Wikipedia | **No** | High, and dominant for ChatGPT |
| Wikidata | **No** | High |

### Conflicting third-party record

A US search for the name surfaces a
[RocketReach profile](https://rocketreach.co/sandev-abeykoon-email_378022479)
listing:

- Employer **"MAYA Creations (Pvt) Ltd"**, where the CV says "Maya Hive"
- A prior role at **KOKATOOO.COM**, which appears nowhere in the CV
- Current role **DevOps**, which is two roles stale

Conflicting employer facts slow Google's entity consolidation on a name. This is
the single most concrete off-site problem found.

---

## Server-side rendering

Verified against the prerendered build output rather than the source: JSON-LD,
body copy, and headings are all present in
`.next/server/app/{index,whoami,resume}.html`. AI crawlers do not execute
JavaScript, so this matters, and it passes cleanly. All 33 routes prerender.

---

## Geographic targeting: what is and is not possible

Worth being explicit, because it constrains everything below.

- **There is no "target Sri Lanka" setting.** Search Console's international
  targeting tool was retired in 2022, and `.dev` is a generic TLD with no
  country association.
- Country relevance therefore comes from four things: location terms in visible
  content, the address in structured data, **links and mentions from Sri Lankan
  sites**, and the searcher's own location.
- The first two are now done (see below). The third is the remaining lever and
  is entirely off-site.
- **Without a Google Business Profile there is no Maps local pack entry**, by
  design of the owner's decision. Queries like "software engineer near me" that
  return a map pack are unreachable. Ordinary blue-link and AI-answer results
  for "software engineer Colombo" remain fully reachable.
- Dropping the suburb costs very little: Google resolves Nugegoda as contained
  within Colombo District / Western Province, so a Colombo-level entity still
  serves a searcher physically in Nugegoda.

---

## Changes implemented in this pass

All in-repo, built and typechecked.

**`src/seo/person.ts`**
- Added `Person.homeLocation` as a `Place` node with `@id`, a `PostalAddress`,
  and Colombo city-centre `GeoCoordinates` (6.9271, 79.8612). City centroid, not
  a residential address.
- Added `Person.workLocation` referencing the same `Place` by `@id`, so the two
  cannot drift.
- Added `Person.contactPoint` as a `ContactPoint` carrying `areaServed`
  (Colombo / Western Province / Sri Lanka) and `availableLanguage`. `areaServed`
  is not valid directly on `Person`, so `ContactPoint` is the schema-correct
  place to state reach.
- New exported `serviceAreas` constant, deliberately separate from
  `personLocation`: the postal address stays at city level, so nothing in the
  reach list narrows the published location.

**`src/seo/copy.ts`**
- Home title now `Sandev Abeykoon – Software Engineer in Colombo, Sri Lanka`
  (57 chars).
- `/whoami` title now `About Sandev Abeykoon – Software Engineer in Sri Lanka`
  (54 chars), country-level so it stays distinct from the home title.
- Home (160) and `/resume` (153) descriptions now carry the location.
- `/logs` copy deliberately untouched. It is a topical page and adding geo there
  would dilute page distinctness.

**`src/app/whoami/page.tsx`**
- New "Where I'm based" section placed high on the page. ~44% of AI citations
  come from the first 30% of a page, so location belongs above the fold, not in
  a footer. Kept to Sri Lankan entity names (JAT Holdings PLC, PayHere, WEBXPAY,
  MPGS) rather than build details that duplicate `/resume`. Those co-occurrences
  are what bind the entity to the country.
- New "Common questions" section with three question-form H3s matching real
  query strings, including "Where is Sandev Abeykoon based?". The "What is
  Blaze64?" entry deliberately links the site name to the person entity.

**`src/app/llms.txt/route.ts`**
- Added a `Location:` / `Areas served:` line derived from the same constants as
  the schema.

**`src/app/page.tsx`**
- Removed the quantified claims (50,000+ vehicles, 6,000+ weekly leads, 99.7%
  uptime) from the hero bio. They now appear only in `/resume` bullets, where
  the surrounding role and dates supply the context that makes a number mean
  something. This aligns the hero with `Position.summary`, which was already
  metric-free for all four roles; the bio paragraph was the lone exception.
- **This is a deliberate trade against citability.** Specific statistics are one
  of the strongest AI-citation signals, so moving them off the homepage costs
  something on that axis. The offsetting gain: unsupported numbers in a
  first-person hero read as self-promotion, which cuts against E-E-A-T, and the
  figures remain fully citable from `/resume`. Owner decision, and a defensible
  one.
- Converted the bio from third person to first, resolving a voice clash: the
  page opened "Welcome to my field journal" and then switched to "Sandev
  Abeykoon is... He has... He is based in...".

  **On the E-E-A-T reasoning behind this:** E-E-A-T is a Search Quality Rater
  Guidelines framework, not a direct ranking factor, and it says nothing about
  grammatical person. The Experience pillar rewards demonstrable first-hand
  involvement, which is about substance rather than pronouns. So the change is
  justified by voice consistency, not by an E-E-A-T lever.

  The genuine cost is citability: third person is self-contained and liftable
  verbatim, while "I" needs resolving from surrounding context. That cost is
  acceptable here only because the third-person entity definition survives in
  four other places an extractor reads: the H1 (`Sandev Abeykoon – Software
  Engineer`), the location subhead directly beneath it, `Person.description` in
  the JSON-LD, and the meta description. **If those are ever reworded into first
  person too, the entity definition disappears from the page entirely.** Keep at
  least the H1 and the schema description in third person.

**No FAQPage schema was added.** Google restricted FAQ rich results to
government and health sites in 2023. The Q&A content still helps AI extraction;
the markup would add graph noise for no rich-result benefit.

**No `og:locale` change.** `en_LK` is not a supported Open Graph locale and
`og:locale` is not a Google ranking signal, so the swap would risk social card
rendering for no gain.

### Verification status

The new schema typechecks against `schema-dts` (a real vocabulary-level check,
since those types are generated from the schema.org vocabulary) and the emitted
JSON-LD was inspected in the prerendered HTML. **Google's Schema Markup
Validator was not run against it**: the endpoint rate-limited and kept returning
429. Re-run per `schema-validation-method` before treating the 0-error baseline
in `SCHEMA-REPORT.md` as still current.

---

## Top 5 highest-impact remaining changes

All off-site. Ordered by expected impact on the stated goal.

1. **Correct or claim the RocketReach record.** It is the only actively
   conflicting fact about the entity, and it ranks for the name. Fixing it costs
   one form submission.
2. **Complete the LinkedIn profile against `person.ts`.** Location set to
   Colombo, headline matching the site's H1, employer strings matching exactly
   ("Maya Hive", not "MAYA Creations"). LinkedIn reliably ranks top-3 for
   personal name queries and is a moderate AI citation source.
3. **Earn two or three links from `.lk` domains.** Sri Lankan dev communities,
   local meetups, or a guest post. This is the only remaining real lever for
   country-level relevance, and the bar is low: a handful of links moves a
   personal-name query meaningfully.
4. **Create a Wikidata item.** Free, and a high-value entity signal for ChatGPT
   in particular. Caveat: Wikidata notability requires serious publicly
   available references, and an item without press coverage can be deleted.
   Worth one attempt, not worth fighting over. Wikipedia itself is out of reach
   on notability grounds.
5. **Establish presence on Reddit or YouTube.** YouTube mentions show the
   strongest measured correlation with AI citations (~0.737) and Reddit is
   46.7% of Perplexity's citations. This is the only route to the ChatGPT and
   Perplexity surfaces, both currently weak. Highest effort of the five.

Also worth doing, lower effort: confirm Search Console is verified and the
sitemap is submitted, and check Bing Webmaster Tools indexation since Bing
Copilot depends on it.

---

## Schema recommendations not yet applied

- **`Person.nationality`** would strengthen the country signal. Not added,
  because residence does not establish nationality and the fact was not
  confirmed. One line in `person.ts` if the owner confirms it.
- **`Person.alumniOf`** already carries two Sri Lankan institutions
  (S. Thomas' College Mount Lavinia, Limkokwing). These are useful LK entity
  co-occurrences and are correctly present.

---

## Incidental finding

`npm run lint` is broken. The script runs `next lint`, which was removed in
Next.js 16; the project is on 16.2.6, so the command fails with
`Invalid project directory provided, no such directory: .../lint`. `CLAUDE.md`
still documents it as working. Unrelated to GEO, not fixed in this pass.
