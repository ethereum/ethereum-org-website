import React, { useState, createRef } from "react"
import { Link as GatsbyLink } from "gatsby"
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
import Link from "../Link"
import Translation from "../Translation"
import { useOnClickOutside } from "../../hooks/useOnClickOutside"

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
  position: absolute;
  right: 0;
  top: calc(100% + 0.5em);
  width: 80vw;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    width: 100%;
  }
  max-width: 30em;
  box-shadow: 0 0 5px 0;
  padding: 0.5rem;
  background: ${(props) => props.theme.colors.background};
  border-radius: 0.25em;
  > * + * {
    padding-top: 1em !important;
    border-top: 2px solid black;
  }
  li {
    margin-bottom: 0.4rem;
  }
  li + li {
    padding-top: 0.7em;
    border-top: 1px solid ${(props) => props.theme.colors.lightBorder};
  }
  ul {
    margin: 0;
    list-style: none;
  }
  mark {
    color: ${(props) => props.theme.colors.primary};
    box-shadow: inset 0 -2px 0 0 ${(props) => props.theme.colors.markUnderline};
  }
  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.3em;
    h3 {
      color: ${(props) => props.theme.colors.background};
      background: ${(props) => props.theme.colors.text300};
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
  a {
    text-decoration: none;
  }
`

const PageHeader = styled.div`
  padding: 5px 10px;
  margin-top: 0;
  font-weight: 600;
  border: none;
  font-size: 1em;
  color: ${(props) => props.theme.colors.searchResultText};
  background: ${(props) => props.theme.colors.searchResultBackground};
`

const StyledSnippet = styled(Snippet)`
  display: block;
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontSizes.m};
  padding: 0.5rem;
  &:hover {
    background: ${(props) => props.theme.colors.markBackground};
  }
`

const StyledHighlight = styled(Highlight)`
  display: block;
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontSizes.m};
  padding: 0.5rem;
  &:hover {
    background: ${(props) => props.theme.colors.markBackground};
  }
`

const PageHit = (clickHandler) => ({ hit }) => {
  // Make url relative, so `handleSelect` is triggered
  const url = hit.url.replace("https://ethereum.org", "")
  return (
    <div>
      <GatsbyLink to={url} onClick={clickHandler}>
        <PageHeader>
          <Highlight attribute="hierarchy.lvl1" hit={hit} tagName="mark" />
        </PageHeader>
        {hit.hierarchy.lvl2 && (
          <StyledHighlight
            attribute="hierarchy.lvl2"
            hit={hit}
            tagName="mark"
          />
        )}
        {hit.hierarchy.lvl3 && (
          <StyledHighlight
            attribute="hierarchy.lvl3"
            hit={hit}
            tagName="mark"
          />
        )}
        {hit.hierarchy.lvl4 && (
          <StyledHighlight
            attribute="hierarchy.lvl4"
            hit={hit}
            tagName="mark"
          />
        )}
        {hit.content && (
          <StyledSnippet attribute="content" hit={hit} tagName="mark" />
        )}
      </GatsbyLink>
    </div>
  )
}

const indices = [
  { name: `prod-ethereum-org`, title: `Pages`, hitComp: `PageHit` },
]

// Validate agaisnt basic requirements of an ETH address
const isValidAddress = (address) => {
  return /^(0x)?[0-9a-f]{40}$/i.test(address)
}

const Results = connectStateResults(
  ({ searchState: state, searchResults: res, children }) => {
    if (res && res.nbHits > 0) {
      return children
    }
    if (isValidAddress(state.query)) {
      return (
        <div>
          <p>
            <strong>
              <Translation id="search-no-results" />
            </strong>{" "}
            "{state.query}"
          </p>
          <p>
            <Translation id="search-eth-address" />{" "}
            <Link to={`https://etherscan.io/address/${state.query}`}>
              Etherscan
            </Link>
            .
          </p>
        </div>
      )
    }
    return (
      <div>
        <strong>
          <Translation id="search-no-results" />
        </strong>{" "}
        "{state.query}"
      </div>
    )
  }
)

const Search = ({ handleSearchSelect }) => {
  const intl = useIntl()
  const ref = createRef()
  const [query, setQuery] = useState(``)
  const [focus, setFocus] = useState(false)
  const algoliaClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY
  )
  const searchClient = {
    // Avoid Algolia request (by mocking one) if search query is empty
    // https://www.algolia.com/doc/guides/building-search-ui/going-further/conditional-requests/js/
    search(requests) {
      if (requests.every(({ params }) => !params.query)) {
        return Promise.resolve({
          results: requests.map(() => ({
            hits: [],
            nbHits: 0,
            nbPages: 0,
            page: 0,
            processingTimeMS: 0,
          })),
        })
      }
      return algoliaClient.search(requests)
    },
  }
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
        <Configure filters={`lang:${intl.locale}`} hitsPerPage={8} />
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
