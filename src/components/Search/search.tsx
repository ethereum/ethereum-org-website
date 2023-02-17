import React from "react"
import { DocSearch } from "@docsearch/react"

import "@docsearch/css"

export const Search: React.FC = () => {
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
          url: item.url.replace(/^https?:\/\/[^\/]+(?=\/)/, ""),
        }))
      }
    />
  )
}
