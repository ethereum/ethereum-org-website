import React, { useState, useEffect, createRef } from "react"
import { useIntl } from "gatsby-plugin-intl"
import {
  Configure,
  InstantSearch,
  Index,
  Hits,
  connectStateResults,
} from "react-instantsearch-dom"
import algoliasearch from "algoliasearch/lite"

import { Root, HitsWrapper } from "./styles"
import Input from "./Input"
import * as hitComps from "./hitComps"

const indices = [
  { name: `dev-ethereum-org`, title: `Pages`, hitComp: `PageHit` },
]

// TODO add custom result for ETH addresses
const Results = connectStateResults(
  ({ searchState: state, searchResults: res, children }) =>
    res && res.nbHits > 0 ? children : `No results for '${state.query}'`
)

const useClickOutside = (ref, handler, events) => {
  if (!events) events = [`mousedown`, `touchstart`]
  const detectClickOutside = (event) =>
    ref.current && event && !ref.current.contains(event.target) && handler()
  useEffect(() => {
    for (const event of events)
      document.addEventListener(event, detectClickOutside)
    return () => {
      for (const event of events)
        document.removeEventListener(event, detectClickOutside)
    }
  })
}

// TODO remove collapse
const Search = ({ collapse, hitsAsGrid }) => {
  const intl = useIntl()
  const ref = createRef()
  const [query, setQuery] = useState(``)
  const [focus, setFocus] = useState(false)
  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY
  )
  useClickOutside(ref, () => setFocus(false))

  const handleSelect = () => {
    setQuery(``)
    setFocus(false)
  }

  return (
    <Root ref={ref}>
      <InstantSearch
        searchClient={searchClient}
        indexName={indices[0].name}
        onSearchStateChange={({ query }) => setQuery(query)}
      >
        <Configure filters={`lang:${intl.locale}`} />
        <Input
          query={query}
          setQuery={setQuery}
          onFocus={() => setFocus(true)}
          {...{ collapse, focus }}
        />
        <HitsWrapper
          show={query.length && query.length > 0 && focus}
          asGrid={hitsAsGrid}
        >
          {indices.map(({ name, title, hitComp }) => (
            <Index key={name} indexName={name}>
              <Results>
                <Hits hitComponent={hitComps[hitComp](() => handleSelect())} />
              </Results>
            </Index>
          ))}
        </HitsWrapper>
      </InstantSearch>
    </Root>
  )
}

export default Search
