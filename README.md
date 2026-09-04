# Blaze64.dev

Field journal of [Sandev Abeykoon](https://blaze64.dev).

## Tech stack

- **Runtime:** [Bun](https://bun.sh) (`bun.lock`)
- **Framework:** [Next.js](https://nextjs.org) (App Router) with React 19 and TypeScript
- **Content:** Blog posts authored in MDX (`@next/mdx` + `@mdx-js/loader`), colocated per post in `src/posts/`
- **Styling:** Tailwind CSS with `@tailwindcss/typography`, Roboto Mono as the site font
- **SEO:** Hand-assembled JSON-LD (`schema-dts`), sitemap, robots.txt, `llms.txt`, and RSS/Atom/JSON feeds (`feed`)
- **Analytics:** [PostHog](https://posthog.com), proxied through `/ingest` (configured in `next.config.mjs`) to reduce ad-blocker interference
- **Linting:** ESLint (`eslint-config-next`)
