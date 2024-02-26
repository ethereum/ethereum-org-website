import { useTranslation } from "next-i18next"
import { BsArrowCounterclockwise } from "react-icons/bs"
import {
  Box,
  Center,
  Flex,
  Icon,
  Stack,
  Tabs,
  type TabsProps,
  useTheme,
} from "@chakra-ui/react"

import WalletFilterFeature from "@/components/FindWallet/WalletFilterSidebar/WalletFilterFeature"

import { trackCustomEvent } from "@/lib/utils/matomo"

import { FiltersType } from "@/pages/wallets/find-wallet"

type WalletFilterSidebarProps = Omit<TabsProps, "children"> & {
  filters: FiltersType
  resetWalletFilter: React.MutableRefObject<() => void>
  resetFilters: () => void
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>
  selectedPersona: number
  setSelectedPersona: React.Dispatch<React.SetStateAction<number>>
  updateFilterOption: (key: any) => void
  updateFilterOptions: (keys: any, value: any) => void
}

const WalletFilterSidebar = ({
  filters,
  resetWalletFilter,
  resetFilters,
  setFilters,
  selectedPersona,
  setSelectedPersona,
  updateFilterOption,
  updateFilterOptions,
  top,
  ...tabsProps
}: WalletFilterSidebarProps) => {
  const theme = useTheme()
  const { t } = useTranslation("page-wallets-find-wallet")

  return (
    <Tabs
      bg="background.base"
      transition="0.5s all"
      sx={{
        scrollbarWidth: "thin",
        scrollbarColor: `${theme.colors.lightBorder} ${theme.colors.background}`,

        "::-webkit-scrollbar": {
          width: 2,
        },
        "::-webkit-scrollbar-track": {
          bg: "background.base",
        },
        "::-webkit-scrollbar-thumb": {
          bgColor: "lightBorder",
          borderRadius: "base",
          border: "2px solid",
          borderColor: "background.base",
        },
      }}
      {...tabsProps}
    >
      <Box position="sticky" top={top ?? 0}>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          px={6}
          py={2}
          borderBottom="1px solid"
          borderBottomColor="primary.base"
        >
          <Box>
            {t("page-find-wallet-filters")} (
            {Object.values(filters).reduce((acc, filter) => {
              if (filter) {
                acc += 1
              }
              return acc
            }, 0)}
            )
          </Box>

          <Center
            as="button"
            color="primary.base"
            fontSize="xs"
            gap={1}
            _hover={{
              color: "selectHover",
            }}
            onClick={() => {
              resetFilters()
              resetWalletFilter.current()
              trackCustomEvent({
                eventCategory: "WalletFilterReset",
                eventAction: `WalletFilterReset clicked`,
                eventName: `reset filters`,
              })
            }}
          >
            <Icon
              as={BsArrowCounterclockwise}
              aria-hidden="true"
              fontSize="sm"
            />
            {t("page-find-wallet-reset-filters").toUpperCase()}
          </Center>
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
        <WalletFilterFeature
          resetWalletFilter={resetWalletFilter}
          filters={filters}
          updateFilterOption={updateFilterOption}
          updateFilterOptions={updateFilterOptions}
        />
      </Stack>
    </Tabs>
  )
}

WalletFilterSidebar.displayName = "WalletFilterSidebar"

export default WalletFilterSidebar
