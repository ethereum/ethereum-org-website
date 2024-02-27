import { useRef } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { MdSearch } from "react-icons/md"
import {
  Box,
  forwardRef,
  IconButtonProps,
  Portal,
  ThemeTypings,
  type UseDisclosureReturn,
  useMergeRefs,
} from "@chakra-ui/react"
import { useDocSearchKeyboardEvents } from "@docsearch/react"
import { DocSearchHit } from "@docsearch/react/dist/esm/types"

import { Button } from "@/components/Buttons"

import { trackCustomEvent } from "@/lib/utils/matomo"
import { sanitizeHitTitle } from "@/lib/utils/sanitizeHitTitle"
import { sanitizeHitUrl } from "@/lib/utils/url"

import SearchButton from "./SearchButton"
import SearchModal from "./SearchModal"

import "@docsearch/css"

export const SearchIconButton = forwardRef<IconButtonProps, "button">(
  (props, ref) => (
    <Button
      ref={ref}
      variant="ghost"
      isSecondary
      px={2}
      _hover={{
        color: "primary.base",
        transform: "rotate(5deg)",
        transition: "transform 0.2s ease-in-out",
      }}
      transition="transform 0.2s ease-in-out"
      {...props}
    >
      <MdSearch />
    </Button>
  )
)

type Props = Pick<UseDisclosureReturn, "isOpen" | "onOpen" | "onClose">

const Search = forwardRef<Props, "button">(
  ({ isOpen, onOpen, onClose }, ref) => {
    const { locale } = useRouter()
    const searchButtonRef = useRef<HTMLButtonElement>(null)
    const mergedButtonRefs = useMergeRefs(ref, searchButtonRef)
    const { t } = useTranslation("common")

    useDocSearchKeyboardEvents({
      isOpen,
      onOpen,
      onClose,
      searchButtonRef,
    })

    const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || ""
    const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || ""
    const indexName =
      process.env.NEXT_PUBLIC_ALGOLIA_BASE_SEARCH_INDEX_NAME || "ethereumorg"

    const breakpointToken: ThemeTypings["breakpoints"] = "xl"

    return (
      <>
        <Box hideBelow={breakpointToken}>
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
        </Box>
        <Box hideFrom={breakpointToken}>
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
          />
        </Box>
        <Portal>
          {isOpen && (
            <SearchModal
              apiKey={apiKey}
              appId={appId}
              indexName={indexName}
              onClose={onClose}
              searchParameters={{
                facetFilters: [`lang:${locale}`],
              }}
              transformItems={(items) =>
                items.map((item: DocSearchHit) => {
                  const newItem: DocSearchHit = structuredClone(item)
                  newItem.url = sanitizeHitUrl(item.url)
                  const newTitle = sanitizeHitTitle(
                    item._highlightResult.hierarchy.lvl0?.value || ""
                  )
                  newItem._highlightResult.hierarchy.lvl0.value = newTitle
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
                  recentSearchesTitle: t(
                    "docsearch-start-recent-searches-title"
                  ),
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
  }
)

export default Search
