import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { FaDiscord, FaGlobe, FaTwitter } from "react-icons/fa"
import {
  Box,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react"

import { Lang, WalletFilter } from "@/lib/types"

import InlineLink, { LinkProps } from "@/components/Link"

import { getLocaleFormattedDate } from "@/lib/utils/time"

import { WalletMoreInfoCategory } from "./WalletMoreInfoCategory"

import { DropdownOption } from "@/hooks/useWalletTable"

type WalletMoreInfoProps = {
  wallet: Record<string, any>
  filters: WalletFilter
  idx: number
  featureDropdownItems: DropdownOption[]
  hasAllLabels: boolean
}

const SocialLink = (props: LinkProps) => (
  <InlineLink
    display="flex"
    height={8}
    alignItems="center"
    verticalAlign="middle"
    transform="scale(1)"
    transition="transform 0.1s"
    _hover={{
      transform: "scale(1.15)",
    }}
    {...props}
  />
)

export const WalletMoreInfo = ({
  wallet,
  filters,
  idx,
  featureDropdownItems,
  hasAllLabels,
}: WalletMoreInfoProps) => {
  const { t } = useTranslation("page-wallets-find-wallet")
  const { locale } = useRouter()
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

  // Format last updated date with current locale
  const walletLastUpdated = getLocaleFormattedDate(
    locale as Lang,
    wallet.last_updated
  )

  // autoColumns={{ base: "200px", lg: "minmax(0, 1fr)" }}
  //     templateColumns={
  //       showMobileSidebar
  //         ? "repeat(2, 1fr)"
  //         : { base: "200px", lg: "minmax(0, 1fr)" }
  //   }

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
          <Stack
            as={Text}
            fontSize="sm"
            justifyContent="space-between"
            wrap="wrap"
            alignItems="flex-start"
            mt={6}
            mb={8}
            spacing={4}
          >
            {/* Social icons */}
            <Heading
              as="h4"
              lineHeight={1.4}
              fontSize="md"
              fontWeight="bold"
              ms={{ lg: 2 }}
              my={-3.5}
            >
              {t("page-find-wallet-social-links")}
            </Heading>

            <Flex ms={{ lg: 2 }} gap="0.8rem">
              <SocialLink
                to={wallet.url}
                hideArrow
                customEventOptions={{
                  eventCategory: "WalletExternalLinkList",
                  eventAction: `Go to wallet`,
                  eventName: `Website: ${wallet.name} ${idx}`,
                  eventValue: JSON.stringify(filters),
                }}
              >
                <Icon as={FaGlobe} fontSize="2xl" />
              </SocialLink>

              {wallet.discord && (
                <SocialLink
                  to={wallet.discord}
                  hideArrow
                  customEventOptions={{
                    eventCategory: "WalletExternalLinkList",
                    eventAction: `Go to wallet`,
                    eventName: `Discord: ${wallet.name} ${idx}`,
                    eventValue: JSON.stringify(filters),
                  }}
                >
                  <Icon as={FaDiscord} color="#7289da" fontSize="2xl" />
                </SocialLink>
              )}

              {wallet.twitter && (
                <SocialLink
                  to={wallet.twitter}
                  hideArrow
                  customEventOptions={{
                    eventCategory: "WalletExternalLinkList",
                    eventAction: `Go to wallet`,
                    eventName: `Twitter: ${wallet.name} ${idx}`,
                    eventValue: JSON.stringify(filters),
                  }}
                >
                  <Icon as={FaTwitter} color="#1da1f2" fontSize="2xl" />
                </SocialLink>
              )}
            </Flex>

            <Text as="i">
              {`${wallet.name} ${t(
                "page-find-wallet-info-updated-on"
              )} ${walletLastUpdated}`}
            </Text>
          </Stack>
        </Box>
      </SimpleGrid>
    </Box>
  )
}
