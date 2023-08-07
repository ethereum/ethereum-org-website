// Import libraries
import React from "react"
import { useTranslation, useI18next } from "gatsby-plugin-react-i18next"
import { MdSearch } from "react-icons/md"
import {
  IconButton,
  forwardRef,
  Portal,
  useDisclosure,
  IconButtonProps,
  useToken,
  useMediaQuery,
  useMergeRefs,
} from "@chakra-ui/react"
import { useDocSearchKeyboardEvents } from "@docsearch/react"
import { DocSearchHit } from "@docsearch/react/dist/esm/types"
import SearchButton from "./SearchButton"
import SearchModal from "./SearchModal"
import { sanitizeHitUrl } from "../../utils/url"
import { sanitizeHitTitle } from "../../utils/sanitizeHitTitle"

// Styles
import "@docsearch/css"

// Utils
import { trackCustomEvent } from "../../utils/matomo"

export const SearchIconButton = forwardRef<IconButtonProps, "button">(
  (props, ref) => (
    <IconButton
      ref={ref}
      icon={<MdSearch />}
      fontSize="2xl"
      variant="icon"
      _hover={{ svg: { fill: "primary.base" } }}
      {...props}
    />
  )
)

const Search = forwardRef<{}, "button">((_, ref) => {
  const searchButtonRef = React.useRef<HTMLButtonElement>(null)
  const { isOpen, onClose, onOpen } = useDisclosure()

  const mergedButtonRefs = useMergeRefs(ref, searchButtonRef)

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
    searchButtonRef,
  })
  const { t } = useTranslation()
  const { language } = useI18next()
  const appId = process.env.GATSBY_ALGOLIA_APP_ID || ""
  const apiKey = process.env.GATSBY_ALGOLIA_SEARCH_KEY || ""
  const indexName =
    process.env.GATSBY_ALGOLIA_BASE_SEARCH_INDEX_NAME || "ethereumorg"

  // Check for the breakpoint with theme token
  const xlBp = useToken("breakpoints", "xl")
  const [isLargerThanXl] = useMediaQuery(`(min-width: ${xlBp})`)

  return (
    <>
      {isLargerThanXl ? (
        <SearchButton
          ref={mergedButtonRefs}
          onClick={() => {
            onOpen()
            trackCustomEvent({
              eventCategory: "nav bar",
              eventAction: "click",
              eventName: "search open",
            })
          }}
          translations={{
            buttonText: t("search"),
            buttonAriaLabel: t("search"),
          }}
        />
      ) : (
        <SearchIconButton
          onClick={() => {
            onOpen()
            trackCustomEvent({
              eventCategory: "nav bar",
              eventAction: "click",
              eventName: "search open",
            })
          }}
          ref={mergedButtonRefs}
          aria-label={t("aria-toggle-search-button")}
          size="sm"
        />
      )}
      <Portal>
        {isOpen && (
          <SearchModal
            apiKey={apiKey}
            appId={appId}
            indexName={indexName}
            onClose={onClose}
            searchParameters={{
              facetFilters: [`lang:${language}`],
            }}
            transformItems={(items) =>
              items.map((item: DocSearchHit) => {
                const newItem: DocSearchHit = structuredClone(item)
                newItem.url = sanitizeHitUrl(item.url)
                newItem._highlightResult.hierarchy.lvl0.value =
                  sanitizeHitTitle(item._highlightResult.hierarchy.lvl0.value)
                return newItem
              })
            }
            placeholder={t("search-ethereum-org")}
            translations={{
              searchBox: {
                resetButtonTitle: t("clear"),
                resetButtonAriaLabel: t("clear"),
                cancelButtonText: t("close"),
                cancelButtonAriaLabel: t("close"),
              },
              footer: {
                selectText: t("docsearch-to-select"),
                selectKeyAriaLabel: t("docsearch-to-select"),
                navigateText: t("docsearch-to-navigate"),
                navigateUpKeyAriaLabel: t("up"),
                navigateDownKeyAriaLabel: t("down"),
                closeText: t("docsearch-to-close"),
                closeKeyAriaLabel: t("docsearch-to-close"),
                searchByText: t("docsearch-search-by"),
              },
              errorScreen: {
                titleText: t("docsearch-error-title"),
                helpText: t("docsearch-error-help"),
              },
              startScreen: {
                recentSearchesTitle: t("docsearch-start-recent-searches-title"),
                noRecentSearchesText: t("docsearch-start-no-recent-searches"),
                saveRecentSearchButtonTitle: t(
                  "docsearch-start-save-recent-search"
                ),
                removeRecentSearchButtonTitle: t(
                  "docsearch-start-remove-recent-search"
                ),
                favoriteSearchesTitle: t("docsearch-start-favorite-searches"),
                removeFavoriteSearchButtonTitle: t(
                  "docsearch-start-remove-favorite-search"
                ),
              },
              noResultsScreen: {
                noResultsText: t("docsearch-no-results-text"),
                suggestedQueryText: t("docsearch-no-results-suggested-query"),
                reportMissingResultsText: t("docsearch-no-results-missing"),
                reportMissingResultsLinkText: t(
                  "docsearch-no-results-missing-link"
                ),
              },
            }}
          />
        )}
      </Portal>
    </>
  )
})

export default Search
