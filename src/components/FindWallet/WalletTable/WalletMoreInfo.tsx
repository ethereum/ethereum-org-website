import { useTranslation } from "next-i18next"
import { Box, SimpleGrid, Text, VStack } from "@chakra-ui/react"

import { ButtonLink } from "../../Buttons"

import { DropdownOption } from "./useWalletTable"
import { WalletMoreInfoCategory } from "./WalletMoreInfoCategory"

interface WalletMoreInfoProps {
  wallet: Record<string, any>
  filters: Record<string, boolean>
  idx: number
  featureDropdownItems: DropdownOption[]
}

export const WalletMoreInfo = ({
  wallet,
  filters,
  idx,
  featureDropdownItems,
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
  ]

  return (
    <Box>
      <SimpleGrid templateColumns="65px auto">
        <Box>
          <Box
            bgGradient={`linear(to-b, ${wallet.brand_color} 0%, rgba(217, 217, 217, 0) 97.4%)`}
            m="auto"
            width={1}
            height="full"
          />
        </Box>
        <Box>
          {walletInfoSections.map((section, idx) => (
            <WalletMoreInfoCategory
              key={idx}
              wallet={wallet}
              orderedFeatureDropdownItems={orderedFeatureDropdownItems}
              {...section}
            />
          ))}
          <VStack
            as={Text}
            color="text300"
            fontSize="sm"
            justifyContent="space-between"
            wrap="wrap"
            alignItems="flex-start"
            my={8}
            spacing={4}
          >
            <ButtonLink
              to={wallet.url}
              customEventOptions={{
                eventCategory: "WalletExternalLinkList",
                eventAction: `Go to wallet`,
                eventName: `${wallet.name} ${idx}`,
                eventValue: JSON.stringify(filters),
              }}
            >
              {`${t("page-find-wallet-check-out")} ${wallet.name}`}
            </ButtonLink>
            <Text as="i">
              {`${wallet.name} ${t("page-find-wallet-info-updated-on")} ${
                wallet.last_updated
              }`}
            </Text>
          </VStack>
        </Box>
      </SimpleGrid>
    </Box>
  )
}
