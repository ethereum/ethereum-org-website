import { useContext } from "react"
import { useTranslation } from "next-i18next"
import { Box, Text } from "@chakra-ui/react"

import { WalletFilter } from "@/lib/types"

import { Button } from "@/components/Buttons"

import { trackCustomEvent } from "@/lib/utils/matomo"
import { walletsListingCount } from "@/lib/utils/wallets"

import { DEFAULT_LOCALE, NAV_BAR_PX_HEIGHT } from "@/lib/constants"

import { FilterBurgerIcon } from "../icons/wallets"

import { WalletSupportedLanguageContext } from "@/contexts/WalletSupportedLanguageContext"

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

  // Context API
  const { supportedLanguage } = useContext(WalletSupportedLanguageContext)

  const handleClick = () => {
    showMobileSidebar ? onClose() : onOpen()

    trackCustomEvent({
      eventCategory: "MobileFilterToggle",
      eventAction: `Tap MobileFilterToggle`,
      eventName: `show mobile filters ${!showMobileSidebar}`,
    })
  }

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
        onClick={handleClick}
      >
        <Box>
          <Text align="start">{t("page-find-wallet-filters")}</Text>
          <Text
            align="start"
            fontSize="sm"
            lineHeight="14px"
            color="body.medium"
          >
            {walletsListingCount(filters) +
              (supportedLanguage === DEFAULT_LOCALE ? 0 : 1)}{" "}
            {t("page-find-wallet-active")}
          </Text>
        </Box>
      </Button>
    </Box>
  )
}
