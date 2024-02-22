import { useTranslation } from "next-i18next"
import { BsArrowCounterclockwise } from "react-icons/bs"
import {
  Box,
  Center,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  type TabsProps,
  useTheme,
} from "@chakra-ui/react"

import WalletFilterProfile from "@/components/FindWallet/WalletFilterSidebar/WalletFilterFeature"
import WalletFilterPersonas from "@/components/FindWallet/WalletFilterSidebar/WalletFilterProfile"

import { trackCustomEvent } from "@/lib/utils/matomo"

import { FiltersType } from "@/pages/wallets/find-wallet"

const FilterTab = ({
  eventName,
  ...rest
}: {
  children: React.ReactNode
  eventName: string
}) => (
  <Tab
    onClick={() => {
      trackCustomEvent({
        eventCategory: "WalletFilterSidebar",
        eventAction: `WalletFilterSidebar tab clicked`,
        eventName,
      })
    }}
    _hover={{
      bg: "selectHover",
    }}
    sx={{
      "&[aria-selected=true]": {
        _hover: {
          bg: "primary.base",
        },
      },
    }}
    {...rest}
  />
)

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
        <TabList
          borderBottom="1px solid"
          borderBottomColor="primary.base"
          bg="background.base"
          sx={{
            ".chakra-tabs__tab": {
              flex: 1,
              fontSize: "0.9rem",
              letterSpacing: "0.02rem",
              py: "0.9rem",
              _first: {
                borderTopStartRadius: "lg",
              },
              _last: {
                borderTopEndRadius: "lg",
              },
            },
          }}
        >
          <FilterTab eventName="show user personas">
            {t("page-find-wallet-profile-filters")}
          </FilterTab>
          <FilterTab eventName="show feature filters">
            {t("page-find-wallet-feature-filters")} (
            {Object.values(filters).reduce((acc, filter) => {
              if (filter) {
                acc += 1
              }
              return acc
            }, 0)}
            )
          </FilterTab>
        </TabList>
      </Box>
      <Center
        as="button"
        borderRadius="base"
        color="primary.base"
        fontSize="xs"
        gap={1}
        mx="auto"
        mt="0.55rem"
        py={0.5}
        px={1}
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
        <Icon as={BsArrowCounterclockwise} aria-hidden="true" fontSize="sm" />
        {t("page-find-wallet-reset-filters").toUpperCase()}
      </Center>
      <TabPanels
        m={0}
        sx={{
          ".chakra-tabs__tab-panel": {
            bg: "transparent",
            border: "none",
            p: 0,
          },
        }}
      >
        <TabPanel>
          <WalletFilterPersonas
            resetFilters={resetFilters}
            setFilters={setFilters}
            selectedPersona={selectedPersona}
            setSelectedPersona={setSelectedPersona}
          />
        </TabPanel>
        <TabPanel>
          <WalletFilterProfile
            resetWalletFilter={resetWalletFilter}
            filters={filters}
            updateFilterOption={updateFilterOption}
            updateFilterOptions={updateFilterOptions}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

WalletFilterSidebar.displayName = "WalletFilterSidebar"

export default WalletFilterSidebar
