import { useTranslation } from "next-i18next"
import { BsArrowCounterclockwise } from "react-icons/bs"
import { Center, Icon } from "@chakra-ui/react"

import { trackCustomEvent } from "@/lib/utils/matomo"

type WalletEmptyStateProps = {
  resetFilters: () => void
  resetWalletFilter: React.MutableRefObject<() => void>
}

export const ResetFiltersButton = ({
  resetFilters,
  resetWalletFilter,
}: WalletEmptyStateProps) => {
  const { t } = useTranslation("page-wallets-find-wallet")

  return (
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
      <Icon as={BsArrowCounterclockwise} aria-hidden="true" fontSize="sm" />
      {t("page-find-wallet-reset-filters").toUpperCase()}
    </Center>
  )
}
