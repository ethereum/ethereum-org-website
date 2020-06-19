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

const PageHeader = styled.div`
  padding: 5px 10px;
  margin-top: 0;
  background: #f1f3f5;
  font-weight: 600;
  border: none;
  font-size: 1em;
  color: #33363d;
`
const StyledSnippet = styled(Snippet)`
  display: block;
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontSizes.medium};
  padding: 0.5rem;
  &:hover {
    background: ${(props) => props.theme.colors.markBackground};
  }
`

const PageHit = (clickHandler) => ({ hit }) => (
  <div>
    <Link to={hit.slug} onClick={clickHandler}>
      <PageHeader>
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </PageHeader>
      <StyledSnippet attribute="excerpt" hit={hit} tagName="mark" />
    </Link>
  </div>
)

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
