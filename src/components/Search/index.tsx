// Import libraries
import React, { FC } from "react"
import { useIntl } from "react-intl"
import { DocSearch } from "@docsearch/react"
import { DocSearchHit } from "@docsearch/react/dist/esm/types"
import { translateMessageId } from "../../utils/translations"
// Styles
import "@docsearch/css"
import DocSearchStyles from "./Styles"

const Search: FC = () => {
  const intl = useIntl()
  const appId = process.env.GATSBY_ALGOLIA_APP_ID || ""
  const apiKey = process.env.GATSBY_ALGOLIA_SEARCH_KEY || ""
  const indexName =
    process.env.GATSBY_ALGOLIA_BASE_SEARCH_INDEX_NAME || "prod-ethereum-org"

  return (
    <>
      <DocSearchStyles />
      <DocSearch
        appId={appId}
        apiKey={apiKey}
        indexName={indexName}
        searchParameters={{
          facetFilters: [`lang:${intl.locale}`],
        }}
        transformItems={(items) =>
          items.map((item: DocSearchHit) => {
            const newItem: DocSearchHit = structuredClone(item)
            ;(newItem.url = item.url
              .replace(/^https?:\/\/[^\/]+(?=\/)/, "")
              .replace("#main-content", "")
              .replace("#content", "")
              .replace("#top", "")),
              (newItem._highlightResult.hierarchy.lvl0.value =
                item._highlightResult.hierarchy.lvl0.value.replace(
                  " | ethereum.org",
                  ""
                ))
            return newItem
          })
        }
        placeholder={translateMessageId("search-ethereum-org", intl)}
        translations={{
          button: {
            buttonText: translateMessageId("search", intl),
            buttonAriaLabel: translateMessageId("search", intl),
          },
          modal: {
            searchBox: {
              resetButtonTitle: translateMessageId("clear", intl),
              resetButtonAriaLabel: translateMessageId("clear", intl),
              cancelButtonText: translateMessageId("close", intl),
              cancelButtonAriaLabel: translateMessageId("close", intl),
            },
            footer: {
              selectText: translateMessageId("docsearch-to-select", intl),
              selectKeyAriaLabel: translateMessageId(
                "docsearch-to-select",
                intl
              ),
              navigateText: translateMessageId("docsearch-to-navigate", intl),
              navigateUpKeyAriaLabel: translateMessageId("up", intl),
              navigateDownKeyAriaLabel: translateMessageId("down", intl),
              closeText: translateMessageId("docsearch-to-close", intl),
              closeKeyAriaLabel: translateMessageId("docsearch-to-close", intl),
              searchByText: translateMessageId("docsearch-search-by", intl),
            },
          },
          /* TODO: Setup remainder of translations */
        }}
      />
    </>
  )
}

export default Search
