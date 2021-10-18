# Site search on ethereum.org

TL;DR: we use Algolia to implement a site search feature on ethereum.org.

## What do we use Algolia and Docsearch for?

Algolia allows us to index the content on ethereum.org and implement a powerful site search tool on ethereum.org. In order to create the index of our content, we use a web crawling tool called Docsearch. Docsearch takes a start_urls of ethereum.org and crawls the site to index the content based on a [docsearchConfig file](https://github.com/ethereum/ethereum-org-website/blob/dev/.github/workflows/docsearchConfig.json).

We kick off the crawling and indexing of ethereum.org through a GitHub Action that triggers on the merge to `master` branch. [View the GitHub Action](https://github.com/ethereum/ethereum-org-website/blob/dev/.github/workflows/docsearch-crawl.yml).

## Docsearch Config

Some important notes about the docsearch config file:

### Configuration

- `index_name` is the name of the algolia index where the generated index will be uploaded to.
- `start_urls` are the urls that the crawler will start from. Some important attributes in the `start_urls` that we use are:
  - `lang`: regex path to different languages that the site is translated to that need crawling. Since ethereum.org is translated to 37+ languages, we need to be able to crawl the website in each language for indexing.
  - `page_rank`: the rank of pages that breaks ties when multiple query results have the same weight. This weight is derived from the selectors.
- `stop_urls` is used to strip out query parameters in the websites urls. We were running into issues where we were getting duplicate query results due to query parameters making urls unique. Stripping these out solved our deduplication problem.
- selectors are used to specify what the crawler should look for when weighting content for the index.

### Generation

We generate the docsearchConfig.json file using a [script](https://github.com/ethereum/ethereum-org-website/blob/dev/.github/workflows/docsearchConfigScript.js). This allows us to dynamically pull in the languages the websites support from the [translations.json data file](https://github.com/ethereum/ethereum-org-website/blob/dev/src/data/translations.json). Our GitHub action executes this script.

## Resources

- [Algolia documentation](https://www.algolia.com/doc/)
- [Docsearch documentation](https://docsearch.algolia.com/docs/what-is-docsearch)
- [Docsearch scraper Docker image](https://hub.docker.com/r/algolia/docsearch-scraper)
