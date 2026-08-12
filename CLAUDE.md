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

- Each post is a directory — `src/app/logs/posts/<slug>/` — holding `index.mdx` (the body), `metadata.json`, and any images the post uses, all colocated. The directory name is the slug; there's no separate filename-to-slug convention to keep in sync.
- Rendering goes through `@next/mdx` + `@mdx-js/loader` (configured in `next.config.mjs`), not a runtime compiler — `[slug]/page.tsx` dynamically imports the compiled module directly: `await import(`../posts/${slug}/index.mdx`)`.
- `metadata.json` is plain JSON, read directly by `src/app/logs/utils.ts` via `fs.readdirSync` + `JSON.parse` — cheap, and independent of the MDX compiler (listing pages never need to compile post bodies just to read metadata). Fields: `title`, `publishedAt`, `summary` are required. `title` is the visible `h1` and the `/logs` listing label; `metaTitle` is optional and overrides it for `<title>` / Open Graph / Twitter only, so the short punchy title can stay on the page while the SERP gets a keyword-bearing 50–60 char one. `summary` is never rendered visibly — it is purely the meta description, and also feeds `BlogPosting.description` and `llms.txt` — so write it at 120–160 chars. `updatedAt` is optional and should only be set for substantive revisions (it drives `dateModified` / `article:modified_time` and renders visibly on the post) — omit it for typo/formatting passes. `image` optionally overrides the shared `public/og-image.jpg` social card and must be a real public URL string (OG tags and JSON-LD need an actual URL, not a bundled asset reference). `draft: true` excludes a post from the homepage, `/logs` index, `sitemap.xml`, and `llms.txt`, and serves `noindex, nofollow` — the page still builds and is reachable by direct link.
- `getBlogPosts()` (excludes drafts) vs `getAllBlogPosts()` (includes drafts) in `src/app/logs/utils.ts` — the former feeds public listings/feeds, the latter feeds `generateStaticParams`/`generateMetadata` in `logs/[slug]/page.tsx` so drafts stay reachable but unlisted.
- Images live next to `index.mdx` in the post's own directory and are imported as static assets, then rendered with `PostImage` (`src/components/post-image.tsx`), a thin `next/image` wrapper with the post column's `sizes` baked in — e.g. `import architecture from "./architecture.webp"` then `<PostImage src={architecture} alt="..." />`. Width/height come from the imported file automatically; never hardcode them. Animated GIFs need `unoptimized` (Next can't optimize animation and otherwise wastes a request retrying) — see `src/app/logs/posts/monitoring-system/` or `wordpress-survival-guide/` for examples.
- Post rendering uses custom MDX component overrides in `src/app/logs/posts/mdx-provider.tsx`: auto-slugged headings with anchor links, link handling that branches on internal path vs. `#hash` vs. external URL, `sugar-high` code highlighting, and a custom `Table`. Posts should start headings at `##` since the post title renders as the page's `h1`.
- `next.config.mjs` sets `providerImportSource: "../mdx-provider"` (a plain relative import) instead of leaving `@next/mdx` on its default. The default resolves through Next's internal `next-mdx-import-source-file` alias, which under Turbopack falls back to `@mdx-js/react`'s context-based `useMDXComponents` — and `createContext` doesn't exist in the RSC runtime that renders posts (`[slug]/page.tsx` is a Server Component), so every post crashed at request time. A relative import resolves identically under webpack and Turbopack and never touches that alias. If `mdx-provider.tsx` ever moves, this path needs updating in lockstep — it's not a filename Next resolves by convention.
- For drafting or reviewing post content/voice, use the `field-log-writer` agent (`.claude/agents/field-log-writer.md`) rather than writing prose ad hoc — it encodes the site's tone rules and the `metadata.json` conventions in detail.

### Dynamic SEO surfaces

`src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/llms.txt/route.ts`, and the three feed routes all derive their content from `getBlogPosts()` at request/build time, so they self-maintain as posts are added, edited, or drafted/published — don't hand-maintain lists in these files.

### Feeds

`src/app/feeds.ts` holds `buildFeed()`, the single `feed`-library definition behind all three formats — a sibling of `sitemap.ts`/`robots.ts`, since like them it consumes `logs/utils.ts` rather than belonging to the `/logs` route. The routes (`rss.xml`, `atom.xml`, `feed.json`) are thin — pick a serializer (`rss2()` / `atom1()` / `json1()`), set the content type. Add a field in `buildFeed()`, not in a route, or the formats drift.

- Summary-only by design: items set `description` (the frontmatter `summary`) and never `content`, so readers follow the link back to the post.
- Items set **both** `published` (from `publishedAt`) and `date` (from `updatedAt ?? publishedAt`). The library maps them to different elements per format — that split is what carries `updatedAt` into `<atom:updated>` and `date_modified` while `pubDate`/`date_published` stay the original date. Setting only one collapses the distinction.
- Item `id` is required by `json1()` — it has no fallback to `link` the way `rss2()`/`atom1()` do. The cost of setting it is `<guid isPermaLink="false">` in RSS, which is valid and harmless.
- `rss2()` silently drops the channel-level `author`, so RSS has no `managingEditor`/`webMaster`; Atom and JSON Feed do use it.
- Channel title/description reuse `copy.logs`. Feed URLs live in `routes.rss` / `routes.atom` / `routes.jsonFeed`, and `pageMetadata()` emits all three as `<link rel="alternate">` autodiscovery tags on every page.

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
