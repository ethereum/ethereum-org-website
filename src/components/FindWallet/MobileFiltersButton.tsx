import { useTranslation } from "next-i18next"
import { Box, Text } from "@chakra-ui/react"

import { WalletFilter } from "@/lib/types"

import { Button } from "@/components/Buttons"

import { trackCustomEvent } from "@/lib/utils/matomo"
import { walletsListingCount } from "@/lib/utils/wallets"

import { NAV_BAR_PX_HEIGHT } from "@/lib/constants"

import { FilterBurgerIcon } from "../icons/wallets"

interface MobileFiltersButtonProps {
  filters: WalletFilter
  showMobileSidebar: boolean
  onOpen: () => void
  onClose: () => void
}

export const MobileFiltersButton = ({
  filters,
  showMobileSidebar,
  onOpen,
  onClose,
}: MobileFiltersButtonProps) => {
  const { t } = useTranslation("page-wallets-find-wallet")

  return (
    <Box
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
        ps={0}
        ms={4}
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
            {walletsListingCount(filters)} {t("page-find-wallet-active")}
          </Text>
        </Box>
      </Button>
    </Box>
  )
}
