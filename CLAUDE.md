# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Blaze64.dev — Sandev Abeykoon's personal field journal / portfolio. Next.js (App Router) + React 19, blog posts authored in MDX, Tailwind CSS for styling, PostHog for analytics. Licensed GPL-2.0.

## Commands

```
npm run dev      # start dev server
npm run build    # production build
npm run start    # run the production build
npm run lint     # next lint (eslint-config-next: core-web-vitals + typescript)
```

There is no test suite in this repo (no test runner configured, no test files).

## Architecture

### SEO context (`src/seo/`)

A self-contained module — everything outside `src/seo/` imports only from `@/seo` (the `index.ts` barrel), never from files inside it directly. Files inside the folder import each other by relative path to avoid cycles. Dependency root is `config.ts` (site constants, `routes`, `pageUrl`/`imageUrl`, no imports of its own); other files (`copy.ts`, `schema.ts`, `person.ts`, `metadata.ts`, `json-ld.tsx`) build on top of it.

- `routes` (in `config.ts`) centralizes every path (`routes.home`, `routes.logs`, `routes.whoami`, `routes.post(slug)`) — use it instead of hardcoding path strings.
- `pageMetadata()` in `metadata.ts` builds canonical + Open Graph + Twitter tags together in one call. Next.js merges route metadata shallowly, so a page-level `openGraph`/`twitter` object silently drops inherited fields (like the default image) if built separately — this function exists specifically to keep them in sync.
- JSON-LD is assembled with `graph()` / `breadcrumb()` / `ref()` / `pageRef()` from `schema.ts` and rendered via the `<JsonLd>` component. Every page composes its own schema graph; there is one canonical `Person` node (`person`/`personRef` in `person.ts`, id'd at `/whoami#person`) that other nodes reference by `@id` rather than duplicating.

### Blog posts (MDX)

- Posts live in `src/app/logs/posts/*.mdx`.
- Frontmatter is parsed by a hand-rolled parser in `src/app/logs/utils.ts` — **not real YAML**. It's a line-by-line `split(": ")`: no comments, no multi-line values, no lists. One `key: value` per line only.
- Fields: `title`, `publishedAt`, `summary` are required. `title` is the visible `h1` and the `/logs` listing label; `metaTitle` is optional and overrides it for `<title>` / Open Graph / Twitter only, so the short punchy title can stay on the page while the SERP gets a keyword-bearing 50–60 char one. `summary` is never rendered visibly — it is purely the meta description, and also feeds `BlogPosting.description` and `llms.txt` — so write it at 120–160 chars. `updatedAt` is optional and should only be set for substantive revisions (it drives `dateModified` / `article:modified_time` and renders visibly on the post) — omit it for typo/formatting passes. `image` optionally overrides the shared `public/og-image.jpg` social card. `draft: true` excludes a post from the homepage, `/logs` index, `sitemap.xml`, and `llms.txt`, and serves `noindex, nofollow` — the page still builds and is reachable by direct link.
- `getBlogPosts()` (excludes drafts) vs `getAllBlogPosts()` (includes drafts) in `src/app/logs/utils.ts` — the former feeds public listings/feeds, the latter feeds `generateStaticParams`/`generateMetadata` in `logs/[slug]/page.tsx` so drafts stay reachable but unlisted.
- Post rendering uses custom MDX component overrides in `src/components/mdx.tsx`: auto-slugged headings with anchor links, link handling that branches on internal path vs. `#hash` vs. external URL, `sugar-high` code highlighting, and a custom `Table`. Posts should start headings at `##` since the post title renders as the page's `h1`.
- For drafting or reviewing post content/voice, use the `field-log-writer` agent (`.claude/agents/field-log-writer.md`) rather than writing prose ad hoc — it encodes the site's tone rules and the frontmatter conventions in detail.

### Dynamic SEO surfaces

`src/app/sitemap.ts`, `src/app/robots.ts`, and `src/app/llms.txt/route.ts` all derive their content from `getBlogPosts()` at request/build time, so they self-maintain as posts are added, edited, or drafted/published — don't hand-maintain lists in these files.

`llms.txt` additionally summarizes the author for LLM grounding (role, employer, certification, skills, profile links). Those facts come from the plain-data constants in `src/seo/person.ts` (`currentEmployer`, `credential`, `personProfiles`, `skillGroups`, `personSkills`, `personJobTitle`, `personEmail`, `personDescription`) — the same constants the `Person` JSON-LD is built from, so the schema and `llms.txt` can't disagree. Change the fact in `person.ts`, not in the route. `skillGroups` is the full stack list and renders on `/whoami` as well; `personSkills` is the deliberately shorter `knowsAbout` subset — keep it a subset rather than mirroring the whole list. Prose-only facts on `/whoami` (employment history before the current role, education, current learning focus) are summarized in the route itself and must be kept in step with the page by hand.

### Analytics (PostHog)

- `instrumentation-client.ts` initializes `posthog-js` client-side.
- `next.config.mjs` rewrites `/ingest/*` to PostHog's US cloud endpoints to reduce ad-blocker interference — analytics calls should go through `/ingest`, not the PostHog host directly.
- `header.tsx` and `footer.tsx` are client components that call `posthog.capture()` on nav/footer link clicks; pageviews are captured automatically.
- `.claude/skills/integration-nextjs-app-router/` was left by the PostHog setup wizard for future integration work; `docs/posthog-setup-report.md` has the original wizard summary and dashboard/insight links.

### Styling

Tailwind CSS v3 with `@tailwindcss/typography`. Roboto Mono is the site font. Path alias `@/*` maps to `./src/*`.

### Comments

Write a comment only when the **why** isn't recoverable from the code. Default to none.

Not warranted: restating what the line does, narrating structure (`// now the headers`), explaining what _isn't_ there, or noting facts that go stale (how many callers a branch has today). Prefer a clearer name or an extracted function over a comment explaining an unclear one.

## Other repo context

- `docs/seo-audit-report.md` is a point-in-time SEO audit with a tracked status per finding (most are resolved) — useful history, not a living doc. One item is intentionally left partial by owner decision (deepening older thin posts) and one is intentionally left as-is (`www` not resolving).
