# SEO recipe index — ethereum.org

Every pattern in the main SKILL.md is backed by at least one PR or SHA. Use this as a quick lookup when you need to trace why a given rule exists, find the original fix for a regression, or audit whether a new change aligns with established practice.

## Structured data / JSON-LD

| Pattern                                                         | PR     | SHA(s)                                |
|-----------------------------------------------------------------|--------|---------------------------------------|
| Canonical org `@id`s + reference pattern across all page-jsonld | 17955  | `0c949c27db`                          |
| Split large event structured data into multiple `<script>`s     | 17863  | `3f3c9d3a0f`                          |
| Absolute URLs + truncated descriptions in course JSON-LD        | 17863  | `aba79d9690`                          |
| Tutorials: remove duplicate `@id`                               | —      | `a86d1edcdd`                          |
| App pages: switch to `WebApplication` type                      | 17863  | `4f50ffab73`                          |
| Events: `startDate` + `Place` with address / geo                | 17863  | `e53af90917`                          |
| Wallet listings: `CollectionPage`                               | 17721  | `58744aaab4`, `75db5dfed0`, `e272958f99` |
| Video listing: strip `VideoObject` from `ItemList`              | —      | `f62978bfcb`, `5fdda75adc`            |
| Video detail: add JSON-LD                                       | —      | `ed9167cecb`, `6f1ad72d52`            |
| KNOWN_AUTHORS registry + page wiring                            | —      | `35f1b2b288`, `ad36c724aa`, `ebc1d78081` |
| Community-hub `Place` schema                                    | 17706  | `b7eb0a3067`, `0bbfbfa1dc`            |

## Hreflang / i18n alternates

| Pattern                                                         | PR     | SHA(s)                                |
|-----------------------------------------------------------------|--------|---------------------------------------|
| Module-level cache for `getTranslatedLocales` (reciprocity)     | 17864  | `8a2e96e2d1`                          |
| Disable `next-intl` middleware `alternateLinks`                 | 16774  | —                                     |
| Limit hreflang to translated locales                            | 16790  | —                                     |
| Reduce locale count 67 → 25                                    | 17111  | —                                     |
| Locale-aware `.md` rewrites regex                              | —      | `next.config.js` (Cursor 2026-03-04)  |

## Noindex / robots

| Pattern                                                         | PR     | SHA(s)                                |
|-----------------------------------------------------------------|--------|---------------------------------------|
| Noindex untranslated pages                                      | 16601  | —                                     |
| Noindex deploy previews / staging subdomains                    | 17741, 17748 | `a33819cd20`, `c45325dd83`, `0eab0c3fb8` |
| Derive `IS_PRODUCTION_DEPLOY` from deploy context, not URL     | —      | `451252b39b`, `8e5e561046`            |

## Sitemap

| Pattern                                                         | PR     | SHA(s)                                |
|-----------------------------------------------------------------|--------|---------------------------------------|
| Add apps + app-category pages to sitemap                        | 17788  | `0daa77eff8`                          |
| Add dev-tool category pages                                     | —      | `1231a0c8ba`, `f492d3554f`            |
| Include dynamic routes + root URL                               | —      | `f8bd75813c`, `0fd44d7612`            |
| Remove `trailingSlash` config (sitemap + URLs consistent)       | —      | `36572c0518`                          |

## Crawlability

| Pattern                                                         | PR     | SHA(s)                                |
|-----------------------------------------------------------------|--------|---------------------------------------|
| Server-rendered crawlable nav (sr-only + inert sibling)         | 17928  | `e5cec0ad63`, `72be7534eb`            |
| A11y tuning: hide CrawlableNav from AT, dedupe keys             | —      | `8e3ac3004f`, `73c8c7c5bb`            |
| sr-only links for modal-only URLs                               | —      | `d018cc9c86`                          |
| Internal backlinks from top pages to homepage                   | —      | `bec4639ffc`                          |
| Internal links to previously orphaned pages                     | —      | `153ad0109f`                          |

## Data-layer SEO / URL cleanup

| Pattern                                                         | PR     | SHA(s)                                |
|-----------------------------------------------------------------|--------|---------------------------------------|
| Normalize dev-tool URLs at the fetcher (fix ~950 4xx)           | 17853  | `80242ecd9e`                          |

## A/B tests and SEO

| Pattern                                                         | PR     | SHA(s)                                |
|-----------------------------------------------------------------|--------|---------------------------------------|
| Revert: don't serve "original variant to bots"                  | —      | `67a3b833fc` (reverted `b6db9a5547`)  |

## Miscellaneous

| Pattern                                                         | PR     | SHA(s)                                |
|-----------------------------------------------------------------|--------|---------------------------------------|
| Disable Safari phone-number auto-detection via metadata         | —      | `1ea2b02ee3`                          |
| SEO-compatible redirects config                                 | —      | `c1b5a5f768`                          |
| Fix 404 / routing errors across translated content              | —      | `0e3411ec6d`                          |

## How to use this index

When you spot a regression or are about to re-implement a pattern:
1. Search this file (grep or ctrl-F) for the area you're working in.
2. `git show <sha>` to read the original diff and commit message.
3. Check PR description for linked Screaming Frog audit / validator output / before-after numbers — these are your template for your own fix's verification.

When you ship a new SEO pattern, add a row here.
