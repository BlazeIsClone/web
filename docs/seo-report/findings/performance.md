# Performance / Core Web Vitals — blaze64.dev

**Method:** headless Chromium (Playwright, Chromium 1228), `PerformanceObserver` for LCP/CLS/FCP, unthrottled network, 390×844 mobile @2x and 1440×900 desktop. **No CrUX field data** — no Google API key configured, so these are lab numbers on a fast connection and represent a best case. **Score: 62/100**

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

### 1. CLS 0.370 on mobile — every image renders with `height={0}` — High

`src/components/mdx.tsx:66-67` passes `width={1344} height={0}` to `next/image`. With a zero height there is no intrinsic aspect ratio, so the browser reserves **no vertical space** until each image decodes, and everything below it jumps. Measured: **0.370 mobile / 0.207 desktop** on `/logs/wordpress-survival-guide` — mobile is in Google's *poor* band (>0.25); desktop is *needs improvement* (>0.1).

The code comment already acknowledges the trade-off ("costs layout shift, buys srcset and lazyload"), so this is a known compromise — but it is now the single worst CWV number on the site, and it is measurable rather than theoretical.

**Fix:** the images are local files in `public/images/`, so the real dimensions are readable at build/render time. `MdxImage` renders on the server, so it can stat the file — `sharp` is already a project dependency and `sharp(path).metadata()` returns `width`/`height`. Passing real dimensions removes the shift and keeps srcset.

### 2. `loading="eager"` on every MDX image — High

`src/components/mdx.tsx:70` hardcodes `loading="eager"`, which **disables** the lazy-loading the same comment claims to buy. On `/logs/wordpress-survival-guide` all three images — including a 2.68 MB GIF — are fetched during initial load regardless of viewport. That GIF is the mobile LCP element at 1452 ms on an unthrottled connection; on a real 4G link (~1.6 Mbps effective) 2.68 MB alone is ~13 s of transfer.

**Fix:** `loading="eager"` only for the first image in a post (the plausible LCP candidate), `lazy` for the rest. Or drop the prop entirely and let `next/image` default to `lazy`, accepting a slightly later LCP on image-led posts.

### 3. Three animated GIFs total 6.0 MB, unoptimized — High

| File | Size | Used by |
|---|---|---|
| `godzilla-dance.gif` | 2 678 977 B | `wordpress-survival-guide.mdx:8` |
| `family-guy-car-crash.gif` | 2 040 477 B | `monitoring-system.mdx:14` |
| `dark-souls.gif` | 1 285 453 B | `socials.mdx:16` (draft) |

`next/image` passes animated GIFs through **unoptimized** — the `/_next/image?...&w=828` URL returns the full 2.68 MB original, confirmed by response size. Every other image on the site is already WebP (4–135 KB), so these three are the outliers, not the norm.

**Fix:** convert to animated WebP (`sharp` handles `{ animated: true }`) — typically 80–90 % smaller at the same visual quality — or to a muted autoplay `<video>` (MP4/WebM), which is smaller again. Either keeps the joke and drops ~5 MB.

## Not an issue

- **JS payload:** ~257 KB compressed across 9 chunks, including PostHog. Normal for Next.js App Router; not a bottleneck at these TTFBs.
- **`/logs/dsa-notes` HTML is 667 KB uncompressed** but **23.5 KB over the wire** — it is mostly syntax-highlighted code spans, and compression handles it. LCP 136–180 ms. No action.
- **TTFB:** 36–139 ms, Vercel edge `x-vercel-cache: HIT`. Nothing to do.
