# Blaze64.dev

Personal field journal for [Sandev Abeykoon](https://github.com/BlazeIsClone). Built with Next.js, React, and MDX. Analytics powered by PostHog.

Posts live in `src/app/logs/posts/` as `.mdx` files.

PostHog events are proxied through `/ingest` (configured in `next.config.mjs`) to avoid ad-blocker interference.
