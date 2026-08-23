# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Blaze64.dev - Sandev Abeykoon's personal field journal / portfolio. Next.js (App Router) + React 19, blog posts authored in MDX, Tailwind CSS for styling, PostHog for analytics. Licensed GPL-2.0.

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

A self-contained module - everything outside `src/seo/` imports only from `@/seo` (the `index.ts` barrel), never from files inside it directly. Files inside the folder import each other by relative path to avoid cycles. Dependency root is `config.ts` (site constants, `routes`, `pageUrl`/`imageUrl`, no imports of its own); other files (`copy.ts`, `schema.ts`, `person.ts`, `metadata.ts`, `json-ld.tsx`) build on top of it.

- `routes` (in `config.ts`) centralizes every path (`routes.home`, `routes.logs`, `routes.whoami`, `routes.post(slug)`) - use it instead of hardcoding path strings.
- `pageMetadata()` in `metadata.ts` builds canonical + Open Graph + Twitter tags together in one call. Next.js merges route metadata shallowly, so a page-level `openGraph`/`twitter` object silently drops inherited fields if built separately - this function exists specifically to keep them in sync. It deliberately does not set OG/Twitter *images* - those come from the `opengraph-image.tsx` file convention (see below), which Next.js injects automatically.
- JSON-LD is assembled with `graph()` / `breadcrumb()` / `ref()` / `pageRef()` from `schema.ts` and rendered via the `<JsonLd>` component. Every page composes its own schema graph; there is one canonical `Person` node (`person`/`personRef` in `person.ts`, id'd at `/whoami#person`) that other nodes reference by `@id` rather than duplicating.

### Open Graph images

- OG/Twitter card images are generated with `next/og`'s `ImageResponse`, not a static file - there is no `public/og-image.jpg`. Like the rest of the site, they're statically generated at build time and cached, since neither generator reads request-time data. `src/app/opengraph-image.tsx` is the site-wide default (used by `/`, `/resume`, `/whoami`, and the `/logs` index); `src/app/logs/[slug]/opengraph-image.tsx` overrides it per post, per the standard Next.js file-convention precedence (the more specific segment wins). Both call `renderOgImage()` from `src/components/og-image.tsx`, the shared layout (favicon as a small logo, white background, black text).
- `renderOgImage()` lives in `src/components/og-image.tsx`, not `src/seo/`, on purpose: it pulls in `next/og` (and reads `favicon.ico` off disk at module scope), and `src/seo/`'s barrel is imported by every route including ones that have nothing to do with image generation. Keeping it out of the barrel keeps that dependency scoped to the two `opengraph-image.tsx` routes that actually need it.
- The post route resolves the title the same way `generateMetadata` does (`metaTitle ?? title`), so the OG image and the `<title>`/SERP title always agree.
- `BlogPosting.image` in the post's JSON-LD falls back to `personImage` (the author photo) when a post sets no `metadata.json` `image`, rather than to a generated OG image URL - `imageUrl()` needs a real, stable, already-known path, and reverse-engineering the hashed URL Next assigns to a generated image route isn't worth relying on.

### Blog posts (MDX)

- Each post is a directory - `src/posts/<slug>/` - holding `index.mdx` (the body), `metadata.json`, and any images the post uses, all colocated. The directory name is the slug; there's no separate filename-to-slug convention to keep in sync.
- Rendering goes through `@next/mdx` + `@mdx-js/loader` (configured in `next.config.mjs`), not a runtime compiler - `[slug]/page.tsx` dynamically imports the compiled module directly: `await import(`../../../posts/${slug}/index.mdx`)`.
- `metadata.json` is plain JSON, read directly by `src/app/logs/utils.ts` via `fs.readdirSync` + `JSON.parse` - cheap, and independent of the MDX compiler (listing pages never need to compile post bodies just to read metadata). Fields: `title`, `publishedAt`, `summary` are required. `title` is the visible `h1` and the `/logs` listing label; `metaTitle` is optional and overrides it for `<title>` / Open Graph / Twitter only, so the short punchy title can stay on the page while the SERP gets a keyword-bearing 50–60 char one. `summary` is never rendered visibly - it is purely the meta description, and also feeds `BlogPosting.description` and `llms.txt` - so write it at 120–160 chars. `updatedAt` is optional and should only be set for substantive revisions (it drives `dateModified` / `article:modified_time` and renders visibly on the post) - omit it for typo/formatting passes. `image` optionally overrides the generated OG image (see Open Graph images below) for `BlogPosting.image` in JSON-LD, and must be a real public URL string (a bundled asset reference won't do). `draft: true` excludes a post from the homepage, `/logs` index, `sitemap.xml`, and `llms.txt`, and serves `noindex, nofollow` - the page still builds and is reachable by direct link.
- `getBlogPosts()` (excludes drafts) vs `getAllBlogPosts()` (includes drafts) in `src/app/logs/utils.ts` - the former feeds public listings/feeds, the latter feeds `generateStaticParams`/`generateMetadata` in `logs/[slug]/page.tsx` so drafts stay reachable but unlisted.
- Images live next to `index.mdx` in the post's own directory and are imported as static assets, then rendered with `PostImage` (`src/components/post-image.tsx`), a thin `next/image` wrapper with the post column's `sizes` baked in - e.g. `import architecture from "./architecture.webp"` then `<PostImage src={architecture} alt="..." />`. Width/height come from the imported file automatically; never hardcode them. Animated GIFs need `unoptimized` (Next can't optimize animation and otherwise wastes a request retrying) - see `src/posts/monitoring-system/` or `wordpress-survival-guide/` for examples.
- Post rendering uses custom MDX component overrides in `src/posts/mdx-provider.tsx`: auto-slugged headings with anchor links, link handling that branches on internal path vs. `#hash` vs. external URL, `sugar-high` code highlighting, and a custom `Table`. Posts should start headings at `##` since the post title renders as the page's `h1`.
- `next.config.mjs` sets `providerImportSource: "../mdx-provider"` (a plain relative import) instead of leaving `@next/mdx` on its default. The default resolves through Next's internal `next-mdx-import-source-file` alias, which under Turbopack falls back to `@mdx-js/react`'s context-based `useMDXComponents` - and `createContext` doesn't exist in the RSC runtime that renders posts (`[slug]/page.tsx` is a Server Component), so every post crashed at request time. A relative import resolves identically under webpack and Turbopack and never touches that alias. If `mdx-provider.tsx` ever moves, this path needs updating in lockstep - it's not a filename Next resolves by convention.
- For drafting or reviewing post content/voice, invoke the `field-log` skill (`.claude/skills/field-log/`) rather than writing prose ad hoc. `SKILL.md` carries the voice rules, the banned-word list, and the heading conventions; `references/metadata.md`, `references/mdx.md`, and `references/checklist.md` cover the `metadata.json` schema, `PostImage` mechanics, and the pre-ship gate.

### Dynamic SEO surfaces

`src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/llms.txt/route.ts`, and the three feed routes all derive their content from `getBlogPosts()` at request/build time, so they self-maintain as posts are added, edited, or drafted/published - don't hand-maintain lists in these files.

### Feeds

`src/app/feeds.ts` holds `buildFeed()`, the single `feed`-library definition behind all three formats - a sibling of `sitemap.ts`/`robots.ts`, since like them it consumes `logs/utils.ts` rather than belonging to the `/logs` route. The routes (`rss.xml`, `atom.xml`, `feed.json`) are thin - pick a serializer (`rss2()` / `atom1()` / `json1()`), set the content type. Add a field in `buildFeed()`, not in a route, or the formats drift.

- Summary-only by design: items set `description` (the frontmatter `summary`) and never `content`, so readers follow the link back to the post.
- Items set **both** `published` (from `publishedAt`) and `date` (from `updatedAt ?? publishedAt`). The library maps them to different elements per format - that split is what carries `updatedAt` into `<atom:updated>` and `date_modified` while `pubDate`/`date_published` stay the original date. Setting only one collapses the distinction.
- Item `id` is required by `json1()` - it has no fallback to `link` the way `rss2()`/`atom1()` do. The cost of setting it is `<guid isPermaLink="false">` in RSS, which is valid and harmless.
- `rss2()` silently drops the channel-level `author`, so RSS has no `managingEditor`/`webMaster`; Atom and JSON Feed do use it.
- Channel title/description reuse `copy.logs`. Feed URLs live in `routes.rss` / `routes.atom` / `routes.jsonFeed`, and `pageMetadata()` emits all three as `<link rel="alternate">` autodiscovery tags on every page.

`llms.txt` additionally summarizes the author for LLM grounding (role, employers, certifications, education, skills, profile links). Those facts come from the plain-data constants in `src/seo/person.ts` (`experience`, `education`, `certifications`, `awards`, `personLocation`, `personProfiles`, `skillGroups`, `personSkills`, `personEmail`, `personDescription`) - the same constants the `Person` JSON-LD, the CV components (`src/components/resume.tsx`, rendered on `/` and `/resume`), and `llms.txt` are all built from, so the surfaces can't disagree. Change the fact in `person.ts`, not in a route. `currentPosition` and `personJobTitle` are derived from `experience` (the first position without an `endDate` is the primary current role; the build throws if none exists). `skillGroups` is the full stack list and renders on `/resume` only (deliberately not on `/` or `/whoami`, to keep the three pages' content distinct); `personSkills` is the deliberately shorter `knowsAbout` subset rendered on `/` - keep it a subset rather than mirroring the whole list. Each `Position` carries both a one-line `summary` (rendered on `/`) and full `highlights` (rendered on `/resume`), worded distinctly so the two pages never share a sentence.

### Analytics (PostHog)

- `instrumentation-client.ts` initializes `posthog-js` client-side.
- `next.config.mjs` rewrites `/ingest/*` to PostHog's US cloud endpoints to reduce ad-blocker interference - analytics calls should go through `/ingest`, not the PostHog host directly.
- `header.tsx` and `footer.tsx` are client components that call `posthog.capture()` on nav/footer link clicks; pageviews are captured automatically.
- `.claude/skills/integration-nextjs-app-router/` was left by the PostHog setup wizard for future integration work; `docs/posthog-setup-report.md` has the original wizard summary and dashboard/insight links.

### Styling

Tailwind CSS v3 with `@tailwindcss/typography`. Roboto Mono is the site font. Path alias `@/*` maps to `./src/*`.

### Writing style

Never use em dashes (—) anywhere: page copy, metadata, code, comments, or docs. Use commas, colons, semicolons, periods, or parentheses instead. En dashes (–) are fine for numeric/date ranges and in official names ("AWS Certified Solutions Architect – Associate"). Never use arrow characters (→) in page copy or link text. Use standard capitalization in page copy and headings, not the old all-lowercase pattern; slash-prefixed page titles (`/logs`, `/whoami`, `/resume`) are literal route paths and stay lowercase.

### Comments

Write a comment only when the **why** isn't recoverable from the code. Default to none.

Not warranted: restating what the line does, narrating structure (`// now the headers`), explaining what _isn't_ there, or noting facts that go stale (how many callers a branch has today). Prefer a clearer name or an extracted function over a comment explaining an unclear one.

## Other repo context

- `docs/seo-audit-report.md` is a point-in-time SEO audit with a tracked status per finding (most are resolved) - useful history, not a living doc. One item is intentionally left partial by owner decision (deepening older thin posts) and one is intentionally left as-is (`www` not resolving).

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
