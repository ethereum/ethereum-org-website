import { useTranslation } from "next-i18next"
import { BsArrowCounterclockwise } from "react-icons/bs"
import { Center, Icon, Text } from "@chakra-ui/react"

import { trackCustomEvent } from "@/lib/utils/matomo"

type ResetFiltersProps = {
  resetFilters: () => void
  resetWalletFilter: React.MutableRefObject<() => void>
}

export const ResetFiltersButton = ({
  resetFilters,
  resetWalletFilter,
}: ResetFiltersProps) => {
  const { t } = useTranslation("page-wallets-find-wallet")

  const handleResetClick = () => {
    resetFilters()
    resetWalletFilter.current()

    trackCustomEvent({
      eventCategory: "WalletFilterSidebar",
      eventAction: `Reset button`,
      eventName: `reset_click`,
    })
  }

  return (
    <Center
      as="button"
      color="primary.base"
      fontSize="xs"
      gap={1}
      _hover={{
        color: "primary.hover",
      }}
      onClick={handleResetClick}
    >
      <Icon as={BsArrowCounterclockwise} aria-hidden="true" fontSize="sm" />
      <Text as="span" textTransform="uppercase">
        {t("page-find-wallet-reset-filters")}
      </Text>
    </Center>
  )
}
