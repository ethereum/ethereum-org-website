import React, { useState, createRef } from "react"
import { Link } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"
import {
  Configure,
  InstantSearch,
  Index,
  Highlight,
  Hits,
  Snippet,
  connectStateResults,
} from "react-instantsearch-dom"
import algoliasearch from "algoliasearch/lite"
import styled from "styled-components"

import Input from "./Input"
import { useOnClickOutside } from "../../hooks/useOnClickOutside"

const PageHit = (clickHandler) => ({ hit }) => (
  <div>
    <Link to={hit.slug} onClick={clickHandler}>
      <h4>
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </h4>
    </Link>
    <Snippet attribute="excerpt" hit={hit} tagName="mark" />
  </div>
)

const Root = styled.div`
  position: relative;
  display: grid;
  grid-gap: 1em;
`

// TODO style
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
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    width: 100%;
  }
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

// TODO add custom result for ETH address searches
const Results = connectStateResults(
  ({ searchState: state, searchResults: res, children }) =>
    res && res.nbHits > 0 ? children : `No results for '${state.query}'`
)

// TODO confirm env variable approach works with Netlify
const Search = ({ handleSearchSelect }) => {
  const intl = useIntl()
  const ref = createRef()
  const [query, setQuery] = useState(``)
  const [focus, setFocus] = useState(false)
  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY
  )
  useOnClickOutside(ref, () => setFocus(false))

  const handleSelect = () => {
    setQuery(``)
    setFocus(false)
    if (handleSearchSelect) {
      handleSearchSelect()
    }
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
        <HitsWrapper show={query && query.length > 0 && focus}>
          {indices.map(({ name, hitComp }) => (
            <Index key={name} indexName={name}>
              <Results>
                <Hits hitComponent={PageHit(() => handleSelect())} />
              </Results>
            </Index>
          ))}
        </HitsWrapper>
      </InstantSearch>
    </Root>
  )
}

export default Search
