<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into your Next.js App Router project. Here's what was done:

- **Installed** `posthog-js` via npm.
- **Created** `instrumentation-client.ts` at the project root to initialize PostHog client-side using the Next.js 15.3+ recommended approach. Includes error tracking (`capture_exceptions: true`) and a reverse proxy host (`/ingest`).
- **Updated** `next.config.mjs` to add reverse proxy rewrites for `/ingest/*` and `/ingest/static/*` routes, reducing ad-blocker interception.
- **Configured** `.env.local` with `NEXT_PUBLIC_POSTHOG_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST`.
- **Updated** `src/components/header.tsx` to capture navigation clicks.
- **Updated** `src/components/footer.tsx` (converted to client component) to capture footer link clicks.

## Events instrumented

| Event name | Description | File |
|---|---|---|
| `nav_link_clicked` | User clicks a navigation link in the header (properties: `path`, `label`) | `src/components/header.tsx` |
| `footer_link_clicked` | User clicks a footer link — GitHub or email (property: `link`) | `src/components/footer.tsx` |

> **Note:** Pageviews are captured automatically by PostHog, covering page-level content engagement.

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics:** https://us.posthog.com/project/418294/dashboard/1567484
- **Nav link clicks over time:** https://us.posthog.com/project/418294/insights/auoDCNGj
- **Nav link clicks by destination:** https://us.posthog.com/project/418294/insights/hZVEtr8m
- **Footer link clicks over time:** https://us.posthog.com/project/418294/insights/Q9CTtP5t
- **Footer link clicks by type:** https://us.posthog.com/project/418294/insights/QPQRlVCD
- **Pageview → footer engagement funnel:** https://us.posthog.com/project/418294/insights/QCL1x0jS

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
