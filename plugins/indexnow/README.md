# IndexNow

Tells [IndexNow](https://www.indexnow.org/documentation) engines (Bing, Yandex, Naver, Seznam) about changed pages so they don't wait for a recrawl. One submission to `api.indexnow.org` is shared with every participating engine.

## Automatic: after each production deploy

A local Netlify build plugin (`index.js`, registered in `netlify.toml`) runs on `onSuccess`, which fires after the deploy is live. It:

1. Diffs `public/content` between `CACHED_COMMIT_REF` (the previous build) and `COMMIT_REF`.
2. Maps each changed `index.md` to its page URL (`translations/<locale>/` gets the locale prefix).
3. Keeps changed URLs the live sitemap lists, plus removed pages (so engines see the 404 or redirect).
4. POSTs them in batches of up to 10,000.

It runs only for production deploys of the site whose Netlify `URL` is `https://ethereum.org`, and never fails a deploy. The result shows in the deploy summary; a rejected submission (e.g. `403`, key file mismatch) or error marks the plugin as failed in the deploy UI while the deploy itself stays live.

It assumes production deploys auto-publish. If auto-publishing is ever locked, `onSuccess` still fires for unpublished deploys, so new pages would be filtered out against the old sitemap and changed URLs submitted before their content is live.

Known gaps, left to normal recrawling: React pages (`app/`) and UI strings (`src/intl/`) don't map 1:1 to URLs, so their changes aren't submitted. `CACHED_COMMIT_REF` is the last commit Netlify built, not necessarily the last one published, so changes from a failed or cancelled build can be missed; a deploy with no usable previous commit (e.g. after clearing the cache) submits nothing.

## Manual

```bash
pnpm indexnow:submit --sitemap --dry-run   # list every live sitemap URL
pnpm indexnow:submit --sitemap             # submit them all (~28K, 3 requests)
pnpm indexnow:submit https://ethereum.org/eth/ https://ethereum.org/de/eth/
```

Use `--sitemap` after site-wide URL changes, such as a redirect fix. Don't run it routinely: IndexNow is meant for URLs that changed.

## Key

The key is public by design. Engines verify ownership by fetching `https://ethereum.org/<key>.txt`, which must contain exactly the key, so `INDEXNOW_KEY` in `lib.js` and `public/<key>.txt` change together (a unit test enforces it). Submissions show up in Bing Webmaster Tools under IndexNow. `200` and `202` both mean accepted; `202` means the key isn't verified yet. A `403` means the key file is missing or doesn't match.
