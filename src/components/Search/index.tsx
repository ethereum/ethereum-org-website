// Import libraries
import React, { FC } from "react"
import { useIntl } from "react-intl"
import { DocSearch } from "@docsearch/react"
import { translateMessageId } from "../../utils/translations"

// Styles
import "@docsearch/css"

const Search: FC = () => {
  const intl = useIntl()
  const appId = process.env.GATSBY_ALGOLIA_APP_ID || ""
  const apiKey = process.env.GATSBY_ALGOLIA_SEARCH_KEY || ""
  const indexName =
    process.env.GATSBY_ALGOLIA_BASE_SEARCH_INDEX_NAME || "prod-ethereum-org"

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
            .replace("#main-content", "")
            .replace("#content", ""),
        }))
      }
      searchParameters={{
        facetFilters: [`lang:${intl.locale}`],
      }}
      placeholder={translateMessageId("search-ethereum-org", intl)}
      translations={{
        button: {
          buttonText: translateMessageId("search", intl),
        },
        /* TODO: Setup remainder of translations */
      }}
    />
  )
}

export default Search
