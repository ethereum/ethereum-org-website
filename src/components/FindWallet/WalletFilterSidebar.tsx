import { useContext } from "react"
import { useTranslation } from "next-i18next"
import { Box, type BoxProps, Flex, Stack, Text } from "@chakra-ui/react"

import { WalletFilter } from "@/lib/types"

import WalletFilterFeature from "@/components/FindWallet/WalletFilterFeature"

import { walletsListingCount } from "@/lib/utils/wallets"

import { DEFAULT_LOCALE } from "@/lib/constants"

import { ResetFiltersButton } from "./ResetFiltersButton"

import { WalletSupportedLanguageContext } from "@/contexts/WalletSupportedLanguageContext"

export type WalletFilterSidebarProps = Omit<BoxProps, "children"> & {
  filters: WalletFilter
  resetWalletFilter: React.MutableRefObject<() => void>
  resetFilters: () => void
  updateFilterOption: (key: unknown) => void
  updateFilterOptions: (keys: unknown, value: unknown) => void
  showMobileSidebar?: boolean
}

const WalletFilterSidebar = ({
  filters,
  resetWalletFilter,
  resetFilters,
  updateFilterOption,
  updateFilterOptions,
  top,
  showMobileSidebar,
  ...boxProps
}: WalletFilterSidebarProps) => {
  const { t } = useTranslation("page-wallets-find-wallet")

  // Context API
  const { supportedLanguage } = useContext(WalletSupportedLanguageContext)

  return (
    <Box w={{ md: showMobileSidebar ? "full" : "330px" }} {...boxProps}>
      <Box position="sticky" top={top ?? 0} zIndex={2} w={{ md: "330px" }}>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          px={showMobileSidebar ? 0 : 6}
          py={2}
          borderBottom={showMobileSidebar ? "none" : "1px solid"}
          borderBottomColor="primary.base !important"
          bg={showMobileSidebar ? "none" : "background.base"}
        >
          <Text
            fontWeight="bold"
            lineHeight={1.6}
            fontSize={showMobileSidebar ? "lg" : "md"}
          >
            {`${t("page-find-wallet-filters")} (${
              walletsListingCount(filters) +
              (supportedLanguage === DEFAULT_LOCALE ? 0 : 1)
            })`}
          </Text>

          {!showMobileSidebar && (
            <ResetFiltersButton
              resetFilters={resetFilters}
              resetWalletFilter={resetWalletFilter}
            />
          )}
        </Flex>
      </Box>

      <Stack
        m={0}
        sx={{
          ".chakra-tabs__tab-panel": {
            bg: "transparent",
            border: "none",
            p: 0,
          },
        }}
      >
        <Box mb={showMobileSidebar ? 20 : 0}>
          <WalletFilterFeature
            filters={filters}
            resetWalletFilter={resetWalletFilter}
            updateFilterOption={updateFilterOption}
            updateFilterOptions={updateFilterOptions}
          />
        </Box>
      </Stack>
    </Box>
  )
}

WalletFilterSidebar.displayName = "WalletFilterSidebar"

export default WalletFilterSidebar
