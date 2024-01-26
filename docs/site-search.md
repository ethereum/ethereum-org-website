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
- While building pages, semantic naming with the aforementioned elements, i.e. `aside`, will ignore any content contained within. This is beneficial for content that is not directly related to the page content, such as callouts, banners, quiz content, or navigation elements.

## Resources

- [Algolia documentation](https://www.algolia.com/doc/)
- [DocSearch documentation](https://docsearch.algolia.com/docs/what-is-docsearch)
