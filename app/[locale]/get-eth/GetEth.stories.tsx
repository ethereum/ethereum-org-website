import { useTranslations } from "next-intl"
import type { Meta, StoryObj } from "@storybook/react"

import { Divider } from "@/components/atoms/divider"
import { Stack } from "@/components/atoms/flex"
import { Heading } from "@/components/atoms/heading"
import InlineLink from "@/components/atoms/Link"
import EmojiCard from "@/components/molecules/Card"
import { Alert, AlertContent, AlertDescription } from "@/components/ui/alert"
import { ButtonLink } from "@/components/ui/buttons/Button"
import Translation from "@/components/utilities/Translation"

const meta = {
  title: "Pages / Get ETH",
  parameters: {
    layout: "fullscreen",
    chromatic: {
      modes: {
        "en-base": { viewport: "base", locale: "en" },
        "en-md": { viewport: "md", locale: "en" },
        "en-lg": { viewport: "lg", locale: "en" },
      },
    },
  },
} satisfies Meta

export default meta

/**
 * The 6-card grid from the "Ways to get ETH" section.
 * Uses EmojiCard (molecules/Card) with bg-background override.
 */
export const CardGrid: StoryObj = {
  render: () => {
    const t = useTranslations("page-get-eth")

    return (
      <div className="p-8">
        <div className="my-4 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <EmojiCard
            className="bg-background [&_h3]:font-bold"
            emoji=":office_building:"
            title={t("page-get-eth-cex")}
            description={t("page-get-eth-cex-desc")}
          >
            <InlineLink href="#country-picker">
              {t("page-get-eth-cex-link-desc")}
            </InlineLink>
          </EmojiCard>
          <EmojiCard
            className="bg-background [&_h3]:font-bold"
            emoji=":building_construction:"
            title={t("page-get-eth-earn")}
            description={t("page-get-eth-earn-desc")}
          >
            <InlineLink href="/dao/">
              {t("page-get-eth-daos-link-desc")}
            </InlineLink>
          </EmojiCard>
          <EmojiCard
            className="bg-background [&_h3]:font-bold"
            emoji=":busts_in_silhouette:"
            title={t("page-get-eth-peers")}
            description={t("page-get-eth-peers-desc")}
          >
            <InlineLink href="/wallets/">
              {t("page-get-eth-wallets-link")}
            </InlineLink>
          </EmojiCard>
          <EmojiCard
            className="bg-background [&_h3]:font-bold"
            emoji=":robot:"
            title={t("page-get-eth-dex")}
            description={
              <Translation id="page-get-eth:page-get-eth-dex-desc" />
            }
          >
            <InlineLink href="#dex">{t("page-get-eth-try-dex")}</InlineLink>
          </EmojiCard>
          <EmojiCard
            className="bg-background [&_h3]:font-bold"
            emoji=":key:"
            title={t("page-get-eth-wallets")}
            description={t("page-get-eth-wallets-purchasing")}
          >
            <InlineLink href="/wallets/">
              {t("page-get-eth-wallets-link")}
            </InlineLink>
          </EmojiCard>
          <EmojiCard
            className="bg-background [&_h3]:font-bold"
            emoji=":shield:"
            title={t("page-get-eth-staking")}
            description={t("page-get-eth-staking-desc")}
          >
            <InlineLink href="/staking">
              {t("page-get-eth-staking-link-desc")}
            </InlineLink>
          </EmojiCard>
        </div>
      </div>
    )
  },
}

/**
 * The DEX two-column section with headings, alerts, and links.
 */
export const DexSection: StoryObj = {
  render: () => {
    const t = useTranslations("page-get-eth")

    return (
      <Stack className="gap-12 p-8">
        <Heading as="h2" size="md" id="dex">
          {t("page-get-eth-dexs")}
        </Heading>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <Stack className="gap-4">
            <Heading as="h3" size="sm">
              {t("page-get-eth-what-are-DEX's")}
            </Heading>
            <p>{t("page-get-eth-dexs-desc")}</p>
            <p>{t("page-get-eth-need-wallet")}</p>
            <ButtonLink href="/wallets/find-wallet/" className="w-fit">
              {t("page-get-eth-get-wallet-btn")}
            </ButtonLink>
            <Alert variant="warning">
              <AlertContent>
                <AlertDescription>
                  <Translation id="page-get-eth:page-get-eth-dexs-desc-4" />
                </AlertDescription>
              </AlertContent>
            </Alert>
          </Stack>

          <Stack className="gap-4">
            <Heading as="h3" size="sm">
              {t("page-get-eth-other-cryptos")}
            </Heading>
            <p>{t("page-get-eth-swapping")}</p>
            <Alert variant="warning">
              <AlertContent>
                <AlertDescription>
                  <Translation id="page-get-eth:page-get-eth-warning" />
                </AlertDescription>
              </AlertContent>
            </Alert>
          </Stack>
        </div>
      </Stack>
    )
  },
}

/**
 * The "Keep it safe" two-column section with headings.
 */
export const SafetySection: StoryObj = {
  render: () => {
    const t = useTranslations("page-get-eth")

    return (
      <Stack className="gap-12 p-8">
        <Heading as="h2" size="md">
          {t("page-get-eth-keep-it-safe")}
        </Heading>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <Stack className="gap-4">
            <Heading as="h3" size="sm">
              {t("page-get-eth-community-safety")}
            </Heading>
          </Stack>

          <Stack className="gap-8">
            <Stack className="gap-4">
              <p>{t("page-get-eth-description")}</p>
              <p>{t("page-get-eth-security")}</p>
            </Stack>
            <Stack className="gap-4">
              <Heading as="h3" size="sm">
                {t("page-get-eth-protect-eth-in-wallet")}
              </Heading>
              <p>{t("page-get-eth-protect-eth-desc")}</p>
              <InlineLink href="/wallets/">
                {t("page-get-eth-your-address-wallet-link")}
              </InlineLink>
            </Stack>
            <Stack className="gap-4">
              <Heading as="h3" size="sm">
                {t("page-get-eth-your-address")}
              </Heading>
              <p>{t("page-get-eth-your-address-desc")}</p>
              <div className="mb-6 flex select-none flex-col-reverse justify-between rounded bg-[#191919] p-2 lg:flex-row">
                <p className="mb-0 font-monospace text-xs text-white">
                  0x0125e2478d69eXaMpLe81766fef5c120d30fb53f
                </p>
                <p className="mx-4 mb-0 text-sm uppercase text-error">
                  {t("page-get-eth-do-not-copy")}
                </p>
              </div>
            </Stack>
            <Stack className="gap-4">
              <Heading as="h3" size="sm">
                {t("page-get-eth-wallet-instructions")}
              </Heading>
              <p>{t("page-get-eth-wallet-instructions-lost")}</p>
            </Stack>
          </Stack>
        </div>

        <Divider className="mx-auto my-16 md:my-32" />
      </Stack>
    )
  },
}
