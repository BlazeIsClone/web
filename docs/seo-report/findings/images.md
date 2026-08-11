# Images — blaze64.dev

**Score: 55/100** — alt text and format discipline are good; delivery is not.

## What works

- **Alt text: 100 % coverage.** All 21 `<img>` elements across the crawl have a non-empty `alt`. Several are genuinely descriptive (`"AWS Certified Solutions Architect – Associate badge"`, `"AWS WordPress Architecture"`); a few are lowercase and terse (`"proxmox dashboard"`, `"vps security diagram"`) but still accurate. No decorative-image mislabelling.
- **WebP everywhere it counts.** 20 of 23 files in `public/images/` are WebP, 4–135 KB. The largest, `aws-wordpress-architecture.webp`, is 131 KB.
- **`og-image.jpg` is 25 KB** — the 581 KB version flagged in the July audit has been compressed. Resolved.
- **Responsive `srcset`** is generated for every image across 8 breakpoints with `sizes="(max-width: 768px) 100vw, 672px"` matching the `max-w-2xl` post column.

## Findings

### 1. Three animated GIFs total 6.0 MB — High

| File | Size | Post |
|---|---|---|
| `godzilla-dance.gif` | 2 678 977 B | `wordpress-survival-guide.mdx:8` |
| `family-guy-car-crash.gif` | 2 040 477 B | `monitoring-system.mdx:14` |
| `dark-souls.gif` | 1 285 453 B | `socials.mdx:16` (draft, so not currently served to search) |

`next/image` does not re-encode animated GIFs — requesting `/_next/image?url=%2Fimages%2Fgodzilla-dance.gif&w=828&q=75` returns the full 2.68 MB original. These are 20× the size of the largest WebP on the site.

**Fix:** re-encode to animated WebP with `sharp` (`{ animated: true }`, already a project dependency), or convert to a muted looping `<video>`. Expect 80–90 % reduction. See `findings/performance.md` for the CWV impact.

### 2. No image dimensions — every image ships `height="0"` — High

`src/components/mdx.tsx:66-67` sets `width={1344} height={0}`. No intrinsic aspect ratio means no reserved space and a guaranteed layout shift on every image-bearing post. Measured CLS 0.370 on mobile for `wordpress-survival-guide`.

The files are local, so `sharp(path).metadata()` in the server-rendered `MdxImage` yields the real dimensions. Full detail in `findings/performance.md`.

### 3. Lazy loading is disabled site-wide — High

`loading="eager"` is hardcoded at `src/components/mdx.tsx:70`, so below-the-fold images are fetched during initial load. On `monitoring-system` that means a 2.04 MB GIF loads before the reader has scrolled to it.

### 4. Fallback `src` requests the 3840 px variant — Low

The `src` attribute on every image is `...&w=3840&q=75`. Modern browsers use `srcset`/`sizes` and ignore it, so real-world impact is minimal — but any client that falls back requests a 3840 px render of an image displayed at 672 px. Not worth a dedicated fix; it disappears once real dimensions are passed.

### 5. No image sitemap and no `ImageObject` schema — Info

For a site with 23 images, none of which target image search, neither is worth building. Noted for completeness only.
