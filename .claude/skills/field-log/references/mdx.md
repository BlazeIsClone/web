# MDX body conventions

## Images

Images live next to `index.mdx` in the post's own directory. WebP, encoded via the `sharp` dependency. Not hotlinked from external hosts, not dropped in `public/`.

Import them as static assets and render with `PostImage`:

```mdx
import { PostImage } from "@/components/post-image";
import architecture from "./architecture.webp";

<PostImage src={architecture} alt="Architecture" priority />
```

`PostImage` (`src/components/post-image.tsx`) is a thin `next/image` wrapper with the post column's responsive `sizes` baked in:

```tsx
const SIZES = "(max-width: 768px) 100vw, 672px";
```

672px is the `max-w-2xl` post column. That's the only reason the wrapper exists.

Width and height come from the imported file automatically. **Never hardcode them.**

## The priority rule

The **first** `PostImage` in a post takes `priority`. Only the first, no matter how many follow.

That image is the post's likely LCP element, so `priority` eager-loads and preloads it instead of leaving it on Next's default lazy/intersection-observer path. Real Core Web Vitals win, not decoration.

Every later `PostImage` in the same post omits `priority` and stays lazy.

A post with only one image still gets `priority`, since that image is both first and last.

This holds regardless of image type. A GIF that needs `unoptimized` still takes `priority` if it's first:

```mdx
<PostImage src={demo} alt="..." unoptimized priority />
```

Reference implementation: `src/posts/ansible-cloud-config/index.mdx`. Four images, `priority` on line 15 only.

## Animated GIFs

Next can't optimize animation, and without `unoptimized` it burns a request retrying. Pass it.

See `src/posts/monitoring-system/` and `src/posts/wordpress-survival-guide/` for working examples.

## Alt text

Write real descriptive alt text. Describe what the image shows, not what it is.

Good: `alt="Payload CMS admin dashboard showing a post editor with a live preview panel"`

Weak: `alt="cloud config modules"`. It names the file, it doesn't describe the image.

## Body markup

Rendering goes through `@next/mdx` + `@mdx-js/loader`, compiled at build time, not a runtime compiler. Component overrides live in `src/posts/mdx-provider.tsx`: auto-slugged headings with anchor links, link handling that branches on internal path vs `#hash` vs external URL, `sugar-high` code highlighting, and a custom `Table`.

- Headings start at `##`. The title is the page `h1`.
- Code blocks get language tags. `sugar-high` handles the highlighting.
- Inline code for technical terms, file names, flags.
- Keep code examples tight. Include only what makes the point. A 40-line paste where 6 lines carry the idea is padding.
