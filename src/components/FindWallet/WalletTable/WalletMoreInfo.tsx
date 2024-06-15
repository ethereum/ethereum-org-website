import { useTranslation } from "next-i18next"
import { Box, Flex, SimpleGrid } from "@chakra-ui/react"

import { DropdownOption, WalletFilter } from "@/lib/types"

import { WalletMoreInfoCategory } from "./WalletMoreInfoCategory"
import { WalletSocialLinks } from "./WalletSocialLinks"

import type { WalletMoreInfoData } from "@/hooks/useWalletTable"

type WalletMoreInfoProps = {
  wallet: WalletMoreInfoData
  filters: WalletFilter
  idx: number
  featureDropdownItems: DropdownOption[]
  hasAllLabels: boolean
}

export const WalletMoreInfo = ({
  wallet,
  filters,
  idx,
  featureDropdownItems,
  hasAllLabels,
}: WalletMoreInfoProps) => {
  const { t } = useTranslation("page-wallets-find-wallet")
  const walletHasFilter = (filterKey) => {
    return wallet[filterKey] === true
  }
  // Cast as Number because TypeScript warned about sorting implicitly by true/false
  const orderedFeatureDropdownItems = featureDropdownItems.sort(
    (a, b) =>
      Number(walletHasFilter(b.filterKey)) -
      Number(walletHasFilter(a.filterKey))
  )

  const walletInfoSections = [
    { headingLabel: t("page-find-wallet-features"), sectionName: "feature" },
    { headingLabel: t("page-find-wallet-security"), sectionName: "security" },
    {
      headingLabel:
        t("page-find-wallet-buy-crypto") +
        " / " +
        t("page-find-wallet-sell-for-fiat"),
      sectionName: "trade_and_buy",
    },
    {
      headingLabel: t("page-find-wallet-smart-contract"),
      sectionName: "smart_contract",
    },
    {
      headingLabel: t("page-find-wallet-advanced"),
      sectionName: "advanced",
    },
  ]

  return (
    <Box mt={4} w="full">
      <SimpleGrid
        autoColumns={{ base: "200px", lg: "minmax(0, 1fr)" }}
        templateColumns={{
          base: "38px auto",
          md: "98px auto",
          lg: "74px auto",
        }}
      >
        {/* Border gradient */}
        <Box
          bgGradient={`linear(to-b, ${wallet.brand_color} 0%, rgba(217, 217, 217, 0) 97.4%)`}
          mx="auto"
          mt={hasAllLabels ? { md: -36 } : { md: -28 }}
          width={1}
          height="full"
        />

        {/* Category sections */}
        <Box>
          <Flex
            direction={{ base: "column", xl: "row" }}
            gap={{ base: 4, xl: 0 }}
            ms={-1}
          >
            {walletInfoSections.map((section, idx) => (
              <WalletMoreInfoCategory
                key={idx}
                wallet={wallet}
                orderedFeatureDropdownItems={orderedFeatureDropdownItems}
                {...section}
              />
            ))}
          </Flex>

          {/* Links section */}
          <WalletSocialLinks wallet={wallet} idx={idx} filters={filters} />
        </Box>
      </SimpleGrid>
    </Box>
  )
}
