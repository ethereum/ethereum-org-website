import { useTranslation } from "next-i18next"
import { FaDiscord, FaGlobe, FaTwitter } from "react-icons/fa"
import {
  Box,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react"

import InlineLink, { LinkProps } from "@/components/Link"

import { DropdownOption } from "./useWalletTable"
import { WalletMoreInfoCategory } from "./WalletMoreInfoCategory"

interface WalletMoreInfoProps {
  wallet: Record<string, any>
  filters: Record<string, boolean>
  idx: number
  featureDropdownItems: DropdownOption[]
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
      <SimpleGrid columns={1} templateColumns="65px auto">
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
            {/* Social icons */}
            <Heading
              as="h4"
              lineHeight={1.4}
              fontSize="md"
              color="text"
              fontWeight={500}
              mx="0.2rem"
              my={-3}
            >
              {/* TODO: add i18n translation */}
              {"Links"}
            </Heading>

            <Flex gap="0.8rem">
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
