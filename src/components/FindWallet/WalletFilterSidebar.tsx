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
  Text,
  useTheme,
} from "@chakra-ui/react"

import { WalletFilter } from "@/lib/types"

import WalletFilterFeature from "@/components/FindWallet/WalletFilterFeature"

import { trackCustomEvent } from "@/lib/utils/matomo"

export type WalletFilterSidebarProps = Omit<TabsProps, "children"> & {
  filters: WalletFilter
  resetWalletFilter: React.MutableRefObject<() => void>
  resetFilters: () => void
  setFilters: React.Dispatch<React.SetStateAction<WalletFilter>>
  selectedPersona: number
  setSelectedPersona: React.Dispatch<React.SetStateAction<number>>
  updateFilterOption: (key: any) => void
  updateFilterOptions: (keys: any, value: any) => void
  showMobileSidebar?: boolean
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
  showMobileSidebar,
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
      <Box position="sticky" top={top ?? 0} zIndex={1} w={{ md: "330px" }}>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          px={showMobileSidebar ? 0 : 6}
          py={2}
          borderBottom={{ base: "none !important", md: "1px solid" }}
          borderBottomColor="primary.base !important"
          bg="background.base"
        >
          <Text
            fontWeight="bold"
            lineHeight={1.6}
            fontSize={showMobileSidebar ? "lg" : "md"}
          >
            {`${t("page-find-wallet-filters")} (${Object.values(filters).reduce(
              (acc, filter) => {
                if (filter) {
                  acc += 1
                }
                return acc
              },
              0
            )})`}
          </Text>

          <Center
            as="button"
            color="primary.base"
            fontSize="xs"
            gap={1}
            _hover={{
              color: "primary.hover",
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
          filters={filters}
          resetWalletFilter={resetWalletFilter}
          updateFilterOption={updateFilterOption}
          updateFilterOptions={updateFilterOptions}
        />
      </Stack>
    </Tabs>
  )
}

WalletFilterSidebar.displayName = "WalletFilterSidebar"

export default WalletFilterSidebar
