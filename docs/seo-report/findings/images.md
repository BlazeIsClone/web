# Images — blaze64.dev

**Score: 55/100 (2026-08-11, historical)** — alt text and format discipline are good; delivery was not.

**Update — 2026-08-14:** findings #2 and #3 below are resolved (commits `a6351dd`, `8a58ec6` — same fix as `findings/performance.md`). Findings #1 (GIF weight) and #4 (3840px fallback) are still open — #4's original "resolves itself" prediction turned out to be wrong; see its note below. Re-measurement is recommended for a current score; see the update note in `FULL-AUDIT-REPORT.md`.

**Update — 2026-08-15:** finding #1 (GIF weight, the last open High in this file) is now resolved too — see below. All three animated GIFs were re-encoded to animated WebP via `sharp` and swapped into their posts' MDX; total weight dropped 6.0 MB → 1.16 MB (-80.7 %). Only finding #4 (Low) remains open. Re-measurement is still recommended for a current score; see the update note in `FULL-AUDIT-REPORT.md`.

## What works

- **Alt text: 100 % coverage.** All 21 `<img>` elements across the crawl have a non-empty `alt`. Several are genuinely descriptive (`"AWS Certified Solutions Architect – Associate badge"`, `"AWS WordPress Architecture"`); a few are lowercase and terse (`"proxmox dashboard"`, `"vps security diagram"`) but still accurate. No decorative-image mislabelling.
- **WebP everywhere it counts.** 19 of 22 post images are WebP, 4–135 KB (post images moved from `public/images/` to per-post directories in `a6351dd`; counts re-verified 2026-08-14 against the new layout). The largest, `aws-wordpress-architecture.webp`, is 131 KB.
- **`og-image.jpg` is 25 KB** — the 581 KB version flagged in the July audit has been compressed. Resolved. (Its cache header is still an open finding — see `findings/technical.md`.)
- **Responsive `srcset`** is generated for every image across 8 breakpoints with `sizes="(max-width: 768px) 100vw, 672px"` matching the `max-w-2xl` post column.
- **Real image dimensions, site-wide (resolved 2026-08-12).** Every `PostImage` now derives `width`/`height` from a static import instead of the old `width={1344} height={0}` — see findings #2 and #4 below, preserved for reference.
- **Correct eager/lazy split (resolved 2026-08-13).** Exactly the first image per post carries `priority`; every other image defaults to lazy — see finding #3 below, preserved for reference.
- **Animated GIFs re-encoded to WebP (resolved 2026-08-15).** All three now ship as animated `.webp` at 80.7 % less total weight — see finding #1 below, preserved for reference.

## Findings

### 1. Three animated GIFs total 6.0 MB — **Resolved 2026-08-15**

| File | Before | After | Post |
|---|---|---|---|
| `godzilla-dance` | 2 678 977 B | 194 902 B | `wordpress-survival-guide/index.mdx:6` |
| `family-guy-car-crash` | 2 040 477 B | 775 236 B | `monitoring-system/index.mdx:12` |
| `dark-souls` | 1 285 453 B | 186 610 B | `socials/index.mdx:11` (draft, so not currently served to search) |

`next/image` does not re-encode animated GIFs — requesting `/_next/image?...&w=828&q=75` for any of the originals returned the full file untouched, confirmed live at audit time. These were 20× the size of the largest WebP on the site.

**Status:** resolved 2026-08-15. All three re-encoded to animated WebP with `sharp({ animated: true })` (a transitive dependency of `next/image`, not a direct `package.json` entry — same caveat this finding originally noted). `godzilla-dance` and `dark-souls` used quality 75 (-92.7 % / -85.5 %); `family-guy-car-crash` — 58 frames at 360×360, more motion data per pixel — needed quality 60 to get a comparable win (-62.0 %). Total: 6.0 MB → 1.16 MB (-80.7 %). The `.gif` sources were deleted and the three posts' MDX imports updated to the `.webp` files; `unoptimized` was kept on each `PostImage` since `next/image` still can't optimize animated WebP any further than it could GIF — same pass-through behavior, so the prop still avoids a wasted round trip. Verified via production build: served from `/_next/static/media/*.webp` with real dimensions (e.g. `width="498" height="480"` on `godzilla-dance`), no `/_next/image` proxying. See `findings/performance.md` for the CWV impact.

### 2. No image dimensions — every image shipped `height="0"` — **Resolved 2026-08-12**

`src/components/mdx.tsx:66-67` set `width={1344} height={0}`. No intrinsic aspect ratio meant no reserved space and a guaranteed layout shift on every image-bearing post. Measured CLS 0.370 on mobile for `wordpress-survival-guide` at audit time.

**Status:** `mdx.tsx` was deleted in `a6351dd`. Images now render through `PostImage` (`src/components/post-image.tsx`), which takes a statically-imported source instead of a markdown path — `next/image` reads the real dimensions from the imported file automatically. Live-verified on `/logs/wordpress-survival-guide/`: `width="498" height="480"`. Full detail in `findings/performance.md`.

### 3. Lazy loading was disabled site-wide — **Resolved 2026-08-13**

`loading="eager"` was hardcoded at `src/components/mdx.tsx:70`, so below-the-fold images were fetched during initial load. On `monitoring-system` that meant a 2.04 MB GIF loaded before the reader had scrolled to it.

**Status:** resolved by `8a58ec6`. `PostImage` no longer sets `loading` itself; each post's first `PostImage` now passes `priority` explicitly (verified on all 10 image-bearing posts) and every other image gets `next/image`'s default `loading="lazy"`. Live-verified: `monitoring-system`'s second and third images ship `loading="lazy"`.

### 4. Fallback `src` requests the 3840 px variant — Low — **still open, 2026-08-14; original prediction was wrong**

Live-checked on 2026-08-14: the bare `src` attribute (used by browsers that ignore `srcset`) is still `...&w=3840&q=75` on `/logs/wordpress-survival-guide/` — e.g. `japanese-seo-spam.webp`. This finding originally predicted the fallback would "disappear once real dimensions are passed" (finding #2); that has not happened. `next/image` sets the bare `src` to its largest configured breakpoint by design, independent of whether the intrinsic dimensions are known — the two are unrelated mechanisms. Still low-impact for the reason originally given (modern browsers use `srcset`/`sizes` and ignore it), just not resolved by the dimension fix as predicted.

### 5. No image sitemap and no `ImageObject` schema — Info

For a site with 23 images, none of which target image search, neither is worth building. Noted for completeness only.
