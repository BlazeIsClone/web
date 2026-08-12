# Content Quality & E-E-A-T — blaze64.dev

**Score: 68/100**

## E-E-A-T assessment — strong

| Signal | Status |
|---|---|
| Named, real author | Sandev Abeykoon, consistent across every page, schema, and `llms.txt` |
| Experience (first-hand) | Every post is a build the author actually did — repos, screenshots, incident write-ups |
| Expertise (credential) | AWS Certified Solutions Architect – Associate, linked to a verifiable Credly badge |
| Authoritativeness (employment) | Current role + employer with a live URL; prior roles in prose |
| Trust (contact) | Real email, GitHub `rel="me"`, LinkedIn, Stack Overflow all reachable |
| Dates | `datePublished` on all posts; `dateModified` differentiated on the 3 revised posts |

This is a well-built entity. The gap is not credibility — it is **corroboration and depth**.

## Findings

### 1. Eight of 18 published posts are under 350 words — Medium (owner-accepted)

| Post | Words | Structure |
|---|---|---|
| `init` | 86 | 1 h2 |
| `cloud-backup-pipeline` | 141 | 2 h2 |
| `backup-cli` | 134 | none |
| `hive-bug-tracker` | 175 | none |
| `game-design` | 203 | 2 h2 + 2 h3 |
| `monitoring-system` | 280 | 5 h2 |
| `building-chamilion-2025` | 300 | 4 h2 |
| `a41sl-bot` | 306 | 1 h2 |
| `work-and-contribution` | 338 | none |
| `cost-to-make-a-website` | 369 | 4 h2 |

The four expanded posts show what the ceiling looks like: `dsa-notes` (2 254 w), `local-first-pwa` (1 251 w), `jwt-microservice-auth` (1 010 w), `building-on-premise-server` (759 w), `ansible-cloud-config` (743 w), `aws-cloud` (698 w).

**Status: the owner decided on 2026-07-20 to stop expanding after two posts and leave the rest as-is.** This is recorded as an accepted trade-off, not an oversight. It is listed here because it remains the largest single constraint on organic reach — a 134-word page will not rank for a competitive query regardless of how good the technical SEO around it is. No action recommended unless the owner reopens it.

Worth noting: `cost-to-make-a-website` (369 w) is the one post targeting genuine commercial-intent search volume ("how much does a website cost"). It is also the shallowest treatment of the highest-competition query on the site. If exactly one post were ever expanded, this is the one with the clearest return.

### 2. Homepage and `/whoami` disagree on the DevOps timeline — Medium

Homepage body copy:

> i've been writing software for about 5 years now, **two of them in DevOps** and the rest in full-stack development

`/whoami`, `person.ts` schema, and `llms.txt` all state: DevOps Engineer at Maya Hive **Jan 2022 – Mar 2026** (≈4 years 2 months), Full Stack Software Engineer **Apr 2026 – present** (≈4 months).

So "two in DevOps, the rest full-stack" inverts the actual split. This matters more than a normal copy nit: `llms.txt` and the `Person` schema exist specifically to give LLMs a groundable answer to "who is Sandev Abeykoon", and the homepage — the page most likely to be retrieved — contradicts them. An assistant asked about the author can now produce either answer.

**Fix:** one sentence in the homepage copy. Suggested: *"about 5 years now, four of them in DevOps before moving into full-stack development."*

### 3. No duplicate or near-duplicate content — clean

Every title, description, h1, and body is unique. No pagination, no tag/category archives, no parameterised URLs, no index bloat. For a 21-page site this is exactly right.

### 4. Readability — appropriate

Prose is short-sentence, first-person, low-jargon-density given the subject matter. Code blocks are syntax-highlighted and captioned by surrounding prose. The deliberately casual register (lowercase headings on `/whoami`, `$ hello!` h1) is a consistent brand voice, not an accident, and does not impede extraction.
