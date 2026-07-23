# Site search on ethereum.org

TL;DR: we use Algolia to implement a site search feature on ethereum.org. As an open source project, Algolia has sponsored the crawling and indexing of the entire site.

## What do we use Algolia and DocSearch for?

Algolia allows us to index the content on ethereum.org and implement a powerful site search tool on ethereum.org. In order to create the index of our content, we use a web crawling tool called DocSearch. DocSearch takes a starting URL of ethereum.org and crawls the site to index the content, based on a custom configuration setup held with the service.

Site crawling and indexing is performed by default on a weekly basis on Friday afternoons. This is performed automatically by Algolia servers, which scrape the entire production site of ethereum.org to build an index. This index is hosted by Algolia for use on the site.

## DocSearch Config

Some important notes about the DocSearch config:

### Configuration

- `indexName` is the name of the Algolia index where the generated index will be uploaded to
- `startUrls` are the urls that the crawler will start from
- Translated pages are automatically faceted for search results based on the `<html lang="">` attribute of each page
- Selectors are used to specify what the crawler should look for when weighting content for the index.
- CheerioAPI can be utilized within the crawler using the `$` selector to manipulate the DOM before indexing each page
- Elements to be ignored are removed before indexing using the CheerioAPI library: `$('selector').remove()`. This includes `aside`, `nav`, `footer` and `style` elements.
- While building pages, semantic naming with the aforementioned elements, i.e., `aside`, will ignore any content contained within. This is beneficial for content that is not directly related to the page content, such as callouts, banners, quiz content, or navigation elements.

## Health monitoring

Because the crawl runs on Algolia's servers and only emails on problems, a blocked or
stalled crawler can go unnoticed for months (the index simply serves stale content). A
weekly GitHub Action guards against this:

- Workflow: `.github/workflows/algolia-index-healthcheck.yml` (Saturdays 09:00 UTC, after
  the Friday crawl). Script: `src/scripts/algolia-healthcheck.mjs`.
- It fails and pings the Discord alerts channel if any of these are true:
  - the **crawler is blocked** or its last successful crawl is older than ~9 days
    (Crawler REST API);
  - the live index's **locale count** differs from the expected 25, or its **record
    count** falls below a floor (search API);
  - a **settled content page** (published more than ~21 days ago, so past one crawl
    cycle) is not searchable — a direct "is search up to date?" probe.

### A blocked crawler after a locale reduction is a known false alarm

When the site dropped from ~70 to ~25 locales, roughly half the records disappeared, which
tripped the crawler's `SafeReindexing` guard ("too many missing records") and left it
**Blocked** — freezing the index at its pre-reduction state. This is expected, not a
regression: the removed records were the dropped locales. To recover, confirm the smaller
record count matches the remaining locales, then **Replace production index** (resets the
baseline) and resume crawling. The guardrail is `maxLostRecordsPercentage` in the crawler
Editor.

### Required secrets / variables

Set on the repository (Settings → Secrets and variables → Actions):

- `NEXT_PUBLIC_ALGOLIA_APP_ID`, `NEXT_PUBLIC_ALGOLIA_SEARCH_KEY` — the public search
  credentials (same values the site uses).
- `ALGOLIA_CRAWLER_USER_ID`, `ALGOLIA_CRAWLER_API_KEY` — a Crawler REST API key
  (crawler.algolia.com → account → API key). Optional: without them the crawler
  status/freshness check is skipped and only the search-index checks run.
- `DISCORD_ALERTS_WEBHOOK_URL` — webhook for the internal alerts channel.
- Variable `ALGOLIA_BASE_SEARCH_INDEX_NAME` (optional) — defaults to `ethereumorg-2`.

## Resources

- [Algolia documentation](https://www.algolia.com/doc/)
- [DocSearch documentation](https://docsearch.algolia.com/docs/what-is-docsearch)
- [Crawler REST API](https://www.algolia.com/doc/rest-api/crawler/)
