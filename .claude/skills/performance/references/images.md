# Images / LCP

1. **Manual `<picture>` + `getImageProps()` drops `fetchPriority`.** Set it manually on the `<img>`:

   ```tsx
   <img {...props} fetchPriority="high" />
   ```

   (PR #17958). `priority: true` on `getImageProps` is not enough.

2. **Remove `priority` from below-fold images** — they compete with the hero for preload budget (SHA `d41f2a9b3` trustlogos).

3. **Re-encode oversized assets** — PNG → JPG, resize to display size (SHA `e2430a276`: 3.3MB → 119KB banner).
