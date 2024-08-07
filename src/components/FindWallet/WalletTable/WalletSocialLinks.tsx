import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { FaDiscord, FaGlobe, FaXTwitter } from "react-icons/fa6"
import { Flex, Heading, Icon, Stack, Text } from "@chakra-ui/react"

import { Lang, WalletFilter } from "@/lib/types"

import InlineLink, { LinkProps } from "@/components/Link"

import { getLocaleFormattedDate } from "@/lib/utils/time"

import type { WalletMoreInfoData } from "@/hooks/useWalletTable"

type WalletSocialLinksProps = {
  wallet: WalletMoreInfoData
  idx: number
  filters: WalletFilter
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

export const WalletSocialLinks = ({
  wallet,
  idx,
  filters,
}: WalletSocialLinksProps) => {
  const { t } = useTranslation("page-wallets-find-wallet")
  const { locale } = useRouter()

  // Format last updated date with current locale
  const walletLastUpdated = getLocaleFormattedDate(
    locale as Lang,
    wallet.last_updated
  )

  return (
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
          href={wallet.url}
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
            href={wallet.discord}
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
            href={wallet.twitter}
            hideArrow
            customEventOptions={{
              eventCategory: "WalletExternalLinkList",
              eventAction: `Go to wallet`,
              eventName: `Twitter: ${wallet.name} ${idx}`,
              eventValue: JSON.stringify(filters),
            }}
          >
            <Icon as={FaXTwitter} color="#1da1f2" fontSize="2xl" />
          </SocialLink>
        )}
      </Flex>

      <Text as="i">
        {`${wallet.name} ${t(
          "page-find-wallet-info-updated-on"
        )} ${walletLastUpdated}`}
      </Text>
    </Stack>
  )
}
