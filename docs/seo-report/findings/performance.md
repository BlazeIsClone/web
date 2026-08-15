# Performance / Core Web Vitals — blaze64.dev

**Method:** headless Chromium (Playwright, Chromium 1228), `PerformanceObserver` for LCP/CLS/FCP, unthrottled network, 390×844 mobile @2x and 1440×900 desktop. **No CrUX field data** — no Google API key configured, so these are lab numbers on a fast connection and represent a best case. **Score: 62/100 (2026-08-11, historical — see 2026-08-14 update below)**

**Update — 2026-08-14:** findings #1 and #2 below are resolved (commits `a6351dd`, `8a58ec6`). Re-measurement is recommended to assign a current score — PSI was rate-limited when attempted for this update — but the measurements and score in this file predate the fix and should not be read as current. Finding #3 (GIF weight) is unaffected and still open.

**Update — 2026-08-15:** finding #3 (GIF weight) is now resolved too — see below. All three findings in this file are resolved; the only thing left is re-measurement, since every number and the score above predate all three fixes.

## Measurements

| Page | Device | LCP | FCP | CLS | Transfer | LCP element |
|---|---|---|---|---|---|---|
| `/` | mobile | 492 ms | 492 ms | 0 | 421 K | `<p>` |
| `/logs` | mobile | 108 ms | 108 ms | 0 | 136 K | `<p>` |
| `/whoami` | mobile | 100 ms | 100 ms | 0 | 22 K | `<p>` |
| `/logs/dsa-notes` | mobile | 180 ms | 180 ms | 0 | 31 K | `<p>` |
| `/logs/local-first-pwa` | mobile | 136 ms | 136 ms | 0 | 53 K | `<p>` |
| **`/logs/wordpress-survival-guide`** | **mobile** | **1452 ms** | 108 ms | **0.370** | **2 683 K** | `godzilla-dance.gif` |
| **`/logs/monitoring-system`** | **mobile** | 720 ms | 104 ms | 0 | **2 092 K** | `family-guy-car-crash.gif` |
| `/logs/wordpress-survival-guide` | desktop | 376 ms | 92 ms | **0.207** | 2 678 K | `japanese-seo-spam.webp` |
| `/logs/monitoring-system` | desktop | 812 ms | 100 ms | 0.062 | 2 086 K | `family-guy-car-crash.gif` |
| `/logs/local-first-pwa` | desktop | 444 ms | 100 ms | 0.015 | 59 K | `inventory-catalog-architecture.webp` |

Nineteen of 21 pages are excellent. Two are not, and both problems trace to the same two lines of code.

## Findings

### 1. CLS 0.370 on mobile — every image renders with `height={0}` — **Resolved 2026-08-12**

`src/components/mdx.tsx:66-67` passed `width={1344} height={0}` to `next/image`. With a zero height there was no intrinsic aspect ratio, so the browser reserved **no vertical space** until each image decoded, and everything below it jumped. Measured at audit time: **0.370 mobile / 0.207 desktop** on `/logs/wordpress-survival-guide` — mobile was in Google's *poor* band (>0.25); desktop was *needs improvement* (>0.1).

**Status:** resolved by `a6351dd` ("mdx component library migrated & post structure"). `src/components/mdx.tsx` was deleted entirely; images now go through the `PostImage` component (`src/components/post-image.tsx`), which wraps `next/image` and takes a statically-imported source (`import x from "./foo.webp"`) rather than a markdown string path — `next/image` derives real `width`/`height` from the imported file automatically, so no `height={0}` is possible. The specific fix mechanism differs from what was recommended below (static import vs. `sharp(path).metadata()` at render time), but resolves the same root cause. Live-verified on `https://blaze64.dev/logs/wordpress-survival-guide/`: the GIF `<img>` now ships `width="498" height="480"`.

<details><summary>Original finding (2026-08-11), preserved for reference</summary>

The code comment already acknowledged the trade-off ("costs layout shift, buys srcset and lazyload"), so this was a known compromise — but it was the single worst CWV number on the site, and it was measurable rather than theoretical.

**Fix (as originally proposed):** the images are local files in `public/images/`, so the real dimensions are readable at build/render time. `MdxImage` renders on the server, so it can stat the file — `sharp` is already a project dependency and `sharp(path).metadata()` returns `width`/`height`. Passing real dimensions removes the shift and keeps srcset. *(Note: `sharp` was never actually a direct `package.json` dependency — it ships transitively as `next/image`'s optional runtime optimizer. The fix that shipped used static imports instead, which sidesteps the need for it.)*

</details>

### 2. `loading="eager"` on every MDX image — **Resolved 2026-08-13**

`src/components/mdx.tsx:70` hardcoded `loading="eager"`, which **disabled** the lazy-loading the same comment claimed to buy. On `/logs/wordpress-survival-guide` all three images — including a 2.68 MB GIF — were fetched during initial load regardless of viewport. That GIF was the mobile LCP element at 1452 ms on an unthrottled connection; on a real 4G link (~1.6 Mbps effective) 2.68 MB alone is ~13 s of transfer.

**Status:** resolved by `8a58ec6` ("priority load post first image") — exactly the fix recommended below. `PostImage` no longer hardcodes `loading`; each post's MDX now passes `priority` explicitly on its first image only (verified across all 10 image-bearing posts), and every other image defaults to `next/image`'s standard `loading="lazy"`. Live-verified: the first image on `/logs/wordpress-survival-guide/` and `/logs/monitoring-system/` ships with no `loading` attribute (priority/eager), subsequent images ship `loading="lazy"`.

<details><summary>Original finding (2026-08-11), preserved for reference</summary>

**Fix (as originally proposed):** `loading="eager"` only for the first image in a post (the plausible LCP candidate), `lazy` for the rest. Or drop the prop entirely and let `next/image` default to `lazy`, accepting a slightly later LCP on image-led posts.

</details>

### 3. Three animated GIFs total 6.0 MB, unoptimized — **Resolved 2026-08-15**

**Status:** resolved by re-encoding all three to animated WebP via `sharp({ animated: true })` (transitive dependency of `next/image` — see the note in the original finding below). `godzilla-dance` — the mobile LCP element on `wordpress-survival-guide` in the measurements above — dropped from 2 678 977 B to 194 902 B (-92.7 %); `dark-souls` from 1 285 453 B to 186 610 B (-85.5 %); `family-guy-car-crash` — 58 frames at 360×360, more motion data per pixel, needed a lower quality setting (60 vs. 75) to compress comparably — from 2 040 477 B to 775 236 B (-62.0 %). Total 6.0 MB → 1.16 MB (-80.7 %). `.gif` sources deleted, MDX imports updated, `unoptimized` kept on each `PostImage` (animated WebP gets the same pass-through treatment from `next/image` that GIF did). Verified via production build: served from `/_next/static/media/` with real dimensions, no `/_next/image` proxy hop.

On a real 4G connection (~1.6 Mbps effective), `godzilla-dance` previously cost roughly 13 s of transfer as the mobile LCP element on `wordpress-survival-guide`; at 195 KB that's now a fraction of a second. Re-measurement (PSI/lab) is recommended to get current LCP/CLS/score numbers now that all three findings in this file are resolved.

<details><summary>Original finding (2026-08-11, updated 2026-08-14), preserved for reference</summary>

| File | Size | Used by |
|---|---|---|
| `godzilla-dance.gif` | 2 678 977 B | `wordpress-survival-guide/index.mdx:6` |
| `family-guy-car-crash.gif` | 2 040 477 B | `monitoring-system/index.mdx:12` |
| `dark-souls.gif` | 1 285 453 B | `socials/index.mdx:11` (draft) |

Unaffected by the `a6351dd`/`8a58ec6` fixes — file paths above updated to match the post-restructure layout (each post moved from `<slug>.mdx` to `<slug>/index.mdx`), sizes and severity unchanged. All three now carry an explicit `unoptimized` prop on `PostImage` (making the pass-through intentional rather than incidental), which changes nothing about the weight: `next/image` still passes animated GIFs through untouched — the `/_next/image?...&w=828` URL still returns the full 2.68 MB original. Every other image on the site remains WebP (4–135 KB), so these three are still the outliers, not the norm.

**Fix:** convert to animated WebP — `sharp` (a transitive dependency of `next/image`, not a direct one — see the note on finding #1) supports `{ animated: true }` — typically 80–90 % smaller at the same visual quality — or to a muted autoplay `<video>` (MP4/WebM), which is smaller again. Either keeps the joke and drops ~5 MB.

</details>

## Not an issue

- **JS payload:** ~257 KB compressed across 9 chunks, including PostHog. Normal for Next.js App Router; not a bottleneck at these TTFBs.
- **`/logs/dsa-notes` HTML is 667 KB uncompressed** but **23.5 KB over the wire** — it is mostly syntax-highlighted code spans, and compression handles it. LCP 136–180 ms. No action.
- **TTFB:** 36–139 ms, Vercel edge `x-vercel-cache: HIT`. Nothing to do.
