# Images / LCP

1. **Manual `<picture>` + `getImageProps()` drops `fetchPriority`.** Set it manually on the `<img>`:

   ```tsx
   <img {...props} fetchPriority="high" />
   ```

   (PR #17958). `priority: true` on `getImageProps` is not enough.

2. **Remove `priority` from below-fold images** — they compete with the hero for preload budget (SHA `d41f2a9b3` trustlogos).

3. **Re-encode oversized assets** — PNG → JPG, resize to display size (SHA `e2430a276`: 3.3MB → 119KB banner).

4. **Tighten `sizes` to the actual rendered width.** Loose `sizes` (e.g. `100vw` on a contained image, or `1200px` on a 512px column) make the browser pick an oversized source from the `srcSet`. On throttled mobile, those non-LCP images steal bandwidth from the LCP element. Lighthouse "Improve image delivery" almost always points here. SHA `6dc51d32a2` cut ~200 KB / −150 ms LCP by tightening homepage carousel + trust-logo `sizes`.

   Match `sizes` to the breakpoints that actually constrain the image. Account for container padding (`calc(100vw - 32px)`), max-width caps, and grid columns. Examples from `SavingsCarousel.tsx` / `TrustLogos.tsx`:

   ```tsx
   // Bad: 100vw lies on desktop where the carousel caps at ~512px
   <Image sizes="(max-width: 768px) 100vw, 1200px" ... />

   // Good: reflects column width at each breakpoint
   <Image sizes="(max-width: 1024px) 384px, 512px" ... />

   // Good: account for page padding on mobile
   <Image sizes="(max-width: 480px) calc(100vw - 32px), 100vw" ... />
   ```

   Verify in DevTools: inspect the `<img>`, check `currentSrc` — the `&w=` should match the rendered CSS width × DPR, not the largest entry in `srcSet`.

5. **Lower `quality` on non-LCP images** — `quality={65}` is visually indistinguishable from default `75` for photographic content, ~15% smaller. Add new values to the `qualities` allow-list in `next.config.js` (Next.js 15 only honors whitelisted qualities). SHA `6dc51d32a2`.
