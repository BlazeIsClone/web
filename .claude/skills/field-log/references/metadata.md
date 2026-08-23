# metadata.json

Sibling to `index.mdx` in the post directory. Plain JSON, read directly by `src/app/logs/utils.ts`. Not frontmatter, not YAML.

Every supported key, shown together for reference. This is not a template to copy: `updatedAt`, `image`, and `draft` are situational and get left out entirely when they don't apply.

```json
{
  "title": "Falling Down the AWS Rabbit Hole",
  "metaTitle": "Falling Down the AWS Rabbit Hole: Solutions Architect Notes",
  "publishedAt": "2026-04-02",
  "summary": "What actually justifies AWS complexity: high availability, EC2 pricing models, shared responsibility and Global Accelerator, from earning the SAA cert.",
  "updatedAt": "2026-07-20",
  "image": "/og-images/aws-cloud.jpg",
  "draft": true
}
```

## title

Required. The visible `h1`, the label in the `/logs` listing, and `headline` in the `BlogPosting` schema.

Short and punchy. This is the reader-facing name, not the search-facing one. That's what `metaTitle` is for.

## metaTitle

Optional in the type, but write one for every post. All 21 current posts have one.

It overrides `title` for `<title>`, Open Graph, and Twitter only, so the page keeps its short heading while the SERP gets a keyword-bearing one.

Target 50 to 60 characters. Under 50 wastes the slot, over 60 gets truncated in the SERP. **Count them, don't eyeball.**

The shape that works: the post's own title, a colon, then the specific technologies or the concrete payoff. "Backup CLI" becomes "Backup CLI: MySQL and Filesystem Backups over SFTP in Rust".

Do not append the site name. Those characters are better spent on keywords.

## publishedAt

Required. ISO date, `YYYY-MM-DD`.

## summary

Required, and **never rendered on the page.** It is the meta description, the OG and Twitter description, `BlogPosting.description`, and the line in `llms.txt`.

Target 120 to 160 characters. Count them.

Name the actual technologies and the concrete outcome. This is what a searcher reads before deciding to click, and what an LLM reads to decide what the post is about.

Do not restate the title. Do not write it as a teaser. No em dashes, they render verbatim in the SERP.

## updatedAt

Optional, and only for genuinely substantive revisions.

Drives `dateModified` in the schema and `article:modified_time`, and renders visibly as `date: Apr 02, 2026 | updated: Jul 20, 2026`.

Omit it for typo fixes, heading shuffles, formatting passes. Claiming freshness for changes that altered no meaning is the content-churn pattern search quality guidelines penalize. When in doubt, leave it off.

Currently set on 3 of 21 posts. That ratio is correct.

## image

Optional, and currently used by zero posts. Understand what it actually does before reaching for it.

It does **not** override the social preview image. OG and Twitter card images are generated at build time by `next/og` (`src/app/opengraph-image.tsx` site-wide, `src/app/logs/[slug]/opengraph-image.tsx` per post). There is no static `public/og-image.jpg` to override.

What `image` actually feeds is `BlogPosting.image` in the post's JSON-LD, and only that. See `src/app/logs/[slug]/page.tsx`:

```ts
image: imageUrl(post.metadata.image ?? personImage)
```

Without it, the schema falls back to `personImage`, the author photo. That fallback is deliberate: `imageUrl()` needs a real, stable, already-known path, and reverse-engineering the hashed URL Next assigns a generated image route isn't worth depending on.

So set it only when you have a real public URL string that belongs in structured data. A bundled asset import will not work here.

## draft

Optional, `true` or `false`.

A draft is excluded from the homepage, the `/logs` index, `sitemap.xml`, and `llms.txt`, and its page serves `noindex, nofollow`. It still builds and stays reachable at its URL, so a shared link keeps working.

Removing the key publishes the post.

**Never publish a placeholder.** A stub, a title with no body, or a "writing in progress" note gets `"draft": true`. An indexable near-empty page is worse for the site than no page at all.
