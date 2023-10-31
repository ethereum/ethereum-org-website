// Libraries
import React from "react"
import {
  Icon,
  Center,
  useTheme,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Box,
  type TabsProps,
} from "@chakra-ui/react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { BsArrowCounterclockwise } from "react-icons/bs"

// Components
import Translation from "../../Translation"
import WalletFilterProfile from "./WalletFilterFeature"
import WalletFilterPersonas from "./WalletFilterProfile"

// Utils
import { trackCustomEvent } from "../../../utils/matomo"

import { FiltersType } from "../../../pages/wallets/find-wallet"

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

interface WalletFilterSidebarProps extends Omit<TabsProps, "children"> {
  filters: FiltersType
  resetWalletFilter: React.MutableRefObject<() => void>
  resetFilters: () => void
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>
  selectedPersona: number
  setSelectedPersona: React.Dispatch<React.SetStateAction<number>>
  updateFilterOption: (key: any) => void
  updateFilterOptions: (keys: any, value: any) => void
}

const WalletFilterSidebar: React.FC<WalletFilterSidebarProps> = ({
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
}) => {
  const theme = useTheme()
  const { t } = useTranslation()
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
                borderTopLeftRadius: "lg",
              },
              _last: {
                borderTopRightRadius: "lg",
              },
            },
          }}
        >
          <FilterTab eventName="show user personas">
            <Translation id="page-find-wallet-profile-filters" />
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
