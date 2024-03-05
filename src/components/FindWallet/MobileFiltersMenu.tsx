import { useTranslation } from "next-i18next"
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text,
} from "@chakra-ui/react"

import { Button } from "@/components/Buttons"

import { trackCustomEvent } from "@/lib/utils/matomo"

import { NAV_BAR_PX_HEIGHT } from "@/lib/constants"

import { FilterBurgerIcon } from "../icons/wallets"
import OldHeading from "../OldHeading"

import { ResetFiltersButton } from "./ResetFiltersButton"
import WalletFilterPersona from "./WalletFilterPersona"
import WalletFilterSidebar, {
  WalletFilterSidebarProps,
} from "./WalletFilterSidebar"

interface MobileFiltersMenuProps extends WalletFilterSidebarProps {
  showMobileSidebar: boolean
  onOpen: () => void
  onClose: () => void
}

export const MobileFiltersMenu = ({
  filters,
  resetWalletFilter,
  resetFilters,
  updateFilterOption,
  updateFilterOptions,
  selectedPersona,
  setFilters,
  setSelectedPersona,
  showMobileSidebar,
  onOpen,
  onClose,
}: MobileFiltersMenuProps) => {
  const { t } = useTranslation("page-wallets-find-wallet")

  return (
    <>
      <Box
        display={{ base: "block", lg: "none" }}
        position="sticky"
        top={NAV_BAR_PX_HEIGHT}
        bg="background.base"
        w="full"
        zIndex="docked"
        py="5px"
      >
        <Button
          rightIcon={<FilterBurgerIcon />}
          variant="outline"
          border="none"
          gap={4}
          sx={{
            svg: {
              boxSize: 8,
              line: { stroke: "primary.base" },
              circle: { stroke: "primary.base" },
            },
          }}
          onClick={() => {
            showMobileSidebar ? onClose() : onOpen()
            trackCustomEvent({
              eventCategory: "MobileFilterToggle",
              eventAction: `Tap MobileFilterToggle`,
              eventName: `show mobile filters ${!showMobileSidebar}`,
            })
          }}
        >
          <Box>
            <Text align="start">{t("page-find-wallet-filters")}</Text>
            <Text
              align="start"
              fontSize="sm"
              lineHeight="14px"
              color="body.medium"
            >
              {Object.values(filters).reduce(
                (acc, filter) => (filter ? acc + 1 : acc),
                0
              )}{" "}
              {t("page-find-wallet-active")}
            </Text>
          </Box>
        </Button>
      </Box>

      <Drawer
        isOpen={showMobileSidebar}
        placement="start"
        onClose={onClose}
        size="full"
      >
        <DrawerOverlay />
        <DrawerContent bg="background.base">
          <DrawerHeader mb={4}>
            <DrawerCloseButton />
          </DrawerHeader>
          <DrawerBody position="relative" p={3}>
            {/* Wallet Personas */}
            <Box px={{ base: showMobileSidebar ? 0 : 4, "2xl": 0 }}>
              <OldHeading
                as="h3"
                fontSize={showMobileSidebar ? "lg" : "xl"}
                fontWeight="bold"
                lineHeight={1.4}
                mt={0}
                mb={2}
              >
                {t("page-find-wallet-personas-title")}
              </OldHeading>

              <WalletFilterPersona
                resetFilters={resetFilters}
                setFilters={setFilters}
                selectedPersona={selectedPersona}
                setSelectedPersona={setSelectedPersona}
                showMobileSidebar={showMobileSidebar}
              />
            </Box>

            <WalletFilterSidebar
              overflow="auto"
              {...{
                filters,
                resetWalletFilter,
                updateFilterOption,
                updateFilterOptions,
                resetFilters,
                selectedPersona,
                setFilters,
                setSelectedPersona,
                showMobileSidebar,
              }}
            />

            <Flex
              justifyContent="space-between"
              alignItems="center"
              position="fixed"
              bottom={0}
              left={0}
              w="100%"
              h="85px"
              px={9}
              py={5}
              bg="background.base"
            >
              <Box flex={1}>
                <ResetFiltersButton
                  resetFilters={resetFilters}
                  resetWalletFilter={resetWalletFilter}
                />
              </Box>

              <Button w="100%" flex={1} onClick={onClose}>
                {t("page-find-wallet-see-wallets")}
              </Button>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
