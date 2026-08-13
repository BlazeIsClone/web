# Blaze64.dev

Field journal of [Sandev Abeykoon](https://blaze64.dev). 

Built with Next.js, React, and MDX. Analytics powered by PostHog.

Posts live in `src/app/logs/posts/` as `.mdx` files.

PostHog events are proxied through `/ingest` (configured in `next.config.mjs`) to avoid ad-blocker interference.
