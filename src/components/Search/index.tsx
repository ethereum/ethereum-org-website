import React, { useState, useRef, MouseEventHandler, ReactNode } from "react"
import { Box, Grid, GridProps, Text, useToken } from "@chakra-ui/react"
import { Link as GatsbyLink } from "gatsby"
import { useIntl } from "react-intl"
import {
  Configure,
  InstantSearch,
  Index,
  Highlight,
  Hits,
  Snippet,
  connectStateResults,
} from "react-instantsearch-dom"
import type { StateResultsProvided } from "react-instantsearch-core"
import algoliasearch from "algoliasearch/lite"
import { Hit } from "@algolia/client-search"

import Input from "./Input"
import Link from "../Link"
import Translation from "../Translation"
import { useOnClickOutside } from "../../hooks/useOnClickOutside"
import { useKeyPress } from "../../hooks/useKeyPress"

const PageHeader = (props: { children: ReactNode }) => (
  <Box
    p="5px 10px"
    mt={0}
    color="searchResultText"
    bg="searchResultBackground"
    fontWeight="semibold"
    border="none"
    {...props}
  />
)

const StyledHighlight = (props: {
  attribute: string
  hit: Hit<Record<string, any>>
}) => (
  <Box
    as={Highlight}
    tagName="mark"
    display="block"
    color="text"
    fontSize="md"
    padding={2}
    _hover={{
      bg: "markBackground",
    }}
    {...props}
  />
)

const HitsWrapper = (props: GridProps) => {
  const [lightBorder, markUnderline] = useToken("color", [
    "lightBorder",
    "markUnderline",
  ])

  return (
    <Grid
      bg="background"
      pos="absolute"
      maxH="80vh"
      maxW="30em"
      w={{ base: "full", lg: "80vw" }}
      p={2}
      overflow="scroll"
      zIndex={2}
      right={0}
      top="calc(100% + 0.5em)"
      boxShadow="0 0 5px 0"
      borderRadius="base"
      sx={{
        "& > * + *": {
          pt: "1em !important",
          borderTop: "2px solid black",
        },
        ul: {
          m: 0,
          listStyle: "none",
        },
        li: {
          mb: "0.4rem",
        },
        "li + li": {
          pt: "0.7em",
          borderTop: `1px solid ${lightBorder}`,
        },
        mark: {
          color: "primary",
          boxShadow: `inset 0 -2px 0 0 ${markUnderline}`,
        },
        header: {
          display: "flex",
          justifyContent: "space-between",
          mb: "0.3em",
        },
        "header h3": {
          color: "background",
          bg: "text300",
          p: "0.1em 0.4em",
          borderRadius: "base",
        },
        h3: {
          m: "0 0 0.5em",
        },
        h4: {
          mb: "0.3em",
        },
        a: {
          textDecor: "none",
        },
      }}
      {...props}
    />
  )
}

//FIXME: Add a strict type for `hit` prop
const PageHit =
  (clickHandler: MouseEventHandler) =>
  ({ hit }: { hit: Hit<Record<string, any>> }) => {
    // Make url relative, so `handleSelect` is triggered
    const url = hit.url.replace("https://ethereum.org", "")

    return (
      <Box>
        <GatsbyLink to={url} onClick={clickHandler}>
          <PageHeader>
            <Highlight attribute="hierarchy.lvl1" hit={hit} tagName="mark" />
          </PageHeader>
          {hit.hierarchy.lvl2 && (
            <StyledHighlight attribute="hierarchy.lvl2" hit={hit} />
          )}
          {hit.hierarchy.lvl3 && (
            <StyledHighlight attribute="hierarchy.lvl3" hit={hit} />
          )}
          {hit.hierarchy.lvl4 && (
            <StyledHighlight attribute="hierarchy.lvl4" hit={hit} />
          )}
          {hit.content && <StyledHighlight attribute="content" hit={hit} />}
        </GatsbyLink>
      </Box>
    )
  }

const indices = [
  { name: `prod-ethereum-org`, title: `Pages`, hitComp: `PageHit` },
]

// Validate against basic requirements of an ETH address
const isValidAddress = (address: string): boolean => {
  return /^(0x)?[0-9a-f]{40}$/i.test(address)
}

interface ResultsProp extends StateResultsProvided {
  children?: React.ReactNode
}

const Results = ({
  searchState: state,
  searchResults: res,
  children,
}: ResultsProp) => {
  if (res && res.nbHits > 0) {
    return children
  }
  if (state.query && isValidAddress(state.query)) {
    return (
      <Box>
        <Text>
          <Text as="strong">
            <Translation id="search-no-results" />
          </Text>{" "}
          "{state.query}"
        </Text>
        <Text>
          <Translation id="search-eth-address" />{" "}
          <Link to={`https://etherscan.io/address/${state.query}`}>
            Etherscan
          </Link>
          .
        </Text>
      </Box>
    )
  }
  return (
    <Box>
      <Text as="strong">
        <Translation id="search-no-results" />
      </Text>{" "}
      "{state.query}"
    </Box>
  )
}

const ConnectedResults = connectStateResults(Results)

interface ISearchProps {
  handleSearchSelect?: () => void
  useKeyboardShortcut?: boolean
}

const Search: React.FC<ISearchProps> = ({
  handleSearchSelect,
  useKeyboardShortcut = false,
}) => {
  const intl = useIntl()
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
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
  useOnClickOutside(containerRef, () => setFocus(false))

  const handleSelect = (): void => {
    setQuery(``)
    setFocus(false)
    if (handleSearchSelect) {
      handleSearchSelect()
    }
  }

  const focusSearch = (event: KeyboardEvent): void => {
    if (!useKeyboardShortcut) {
      return
    }

    const searchInput = inputRef.current
    if (document.activeElement !== searchInput) {
      event.preventDefault()
      searchInput?.focus()
    }
  }

  useKeyPress("/", focusSearch)

  return (
    <Grid ref={containerRef} gap={4} pos="relative">
      <InstantSearch
        searchClient={searchClient}
        indexName={indices[0].name}
        onSearchStateChange={({ query }) => setQuery(query)}
      >
        <Configure filters={`lang:${intl.locale}`} hitsPerPage={8} />
        <Input
          inputRef={inputRef}
          query={query}
          setQuery={setQuery}
          onFocus={() => setFocus(true)}
        />
        <HitsWrapper display={query?.length > 0 && focus ? "grid" : "none"}>
          {indices.map(({ name, hitComp }) => (
            <Index key={name} indexName={name}>
              <ConnectedResults>
                <Hits hitComponent={PageHit(() => handleSelect())} />
              </ConnectedResults>
            </Index>
          ))}
        </HitsWrapper>
      </InstantSearch>
    </Grid>
  )
}

export default Search
