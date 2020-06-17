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
import styled from "styled-components"

import Input from "./Input"
import * as hitComps from "./hitComps"

const Root = styled.div`
  position: relative;
  display: grid;
  grid-gap: 1em;
`

const HitsWrapper = styled.div`
  display: ${(props) => (props.show ? `grid` : `none`)};
  max-height: 80vh;
  overflow: scroll;
  z-index: 2;
  -webkit-overflow-scrolling: touch;
  position: absolute;
  right: 0;
  top: calc(100% + 0.5em);
  width: 80vw;
  max-width: 30em;
  box-shadow: 0 0 5px 0;
  padding: 1rem;
  background: white;
  border-radius: 0.25em;
  > * + * {
    padding-top: 1em !important;
    border-top: 2px solid black;
  }
  li + li {
    margin-top: 0.7em;
    padding-top: 0.7em;
    border-top: 1px solid gray;
  }
  * {
    margin-top: 0;
    padding: 0;
  }
  ul {
    margin: 0;
    list-style: none;
  }
  mark {
    color: ${(props) => props.theme.colors.primary};
  }
  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.3em;
    h3 {
      color: white;
      background: ${(props) => props.theme.colors.textSecondary};
      padding: 0.1em 0.4em;
      border-radius: 0.25em;
    }
  }
  h3 {
    margin: 0 0 0.5em;
  }
  h4 {
    margin-bottom: 0.3em;
  }
`

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

const Search = () => {
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
        />
        <HitsWrapper show={query.length && query.length > 0 && focus}>
          {indices.map(({ name, hitComp }) => (
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
