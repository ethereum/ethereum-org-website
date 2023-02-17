// Import libraries
import React, { FC } from "react"
import { useIntl } from "react-intl"
import { DocSearch } from "@docsearch/react"
// Styles
import "@docsearch/css"

const Search: FC = () => {
  const { locale } = useIntl()
  const appId = process.env.GATSBY_ALGOLIA_APP_ID || ""
  const apiKey = process.env.GATSBY_ALGOLIA_SEARCH_KEY || ""
  const indexName = process.env.GATSBY_ALGOLIA_BASE_SEARCH_INDEX_NAME || ""

  return (
    <DocSearch
      appId={appId}
      apiKey={apiKey}
      indexName={indexName}
      transformItems={(items) =>
        items.map((item) => ({
          ...item,
          url: item.url
            .replace(/^https?:\/\/[^\/]+(?=\/)/, "")
            .replace("#main-content", ""),
        }))
      }
      searchParameters={{
        facetFilters: [`lang:${locale}`],
        hitsPerPage: 5,
      }}
      placeholder="Search ethereum.org"
    />
  )
}

export default Search
