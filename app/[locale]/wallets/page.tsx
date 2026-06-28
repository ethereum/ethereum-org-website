import { Suspense } from "react"
import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import CardList from "@/components/CardList"
import ContentFeedback from "@/components/ContentFeedback"
import FileContributors from "@/components/FileContributors"
import PageHero from "@/components/Hero/PageHero"
import HorizontalCard from "@/components/HorizontalCard"
import I18nProvider from "@/components/I18nProvider"
import { Image } from "@/components/Image"
import ListenToPlayer from "@/components/ListenToPlayer"
import MainArticle from "@/components/MainArticle"
import MarkdownCard from "@/components/MarkdownCard"
import { StandaloneQuizWidget } from "@/components/Quiz/QuizWidget"
import { SIMULATOR_ID } from "@/components/Simulator/constants"
import Translation from "@/components/Translation"
import { ButtonLink } from "@/components/ui/buttons/Button"
import Callout from "@/components/ui/callout"
import { Grid } from "@/components/ui/grid"
import { Divider } from "@/components/ui/hr"
import { Section } from "@/components/ui/section"

import { cn } from "@/lib/utils/cn"
import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import WalletsPageJsonLD from "./page-jsonld"
import { WalletSimulator } from "./WalletSimulator"

import DappsImage from "@/public/images/doge-computer.png"
import ETHImage from "@/public/images/eth-logo.png"
import FindWalletImage from "@/public/images/wallets/find-wallet.png"
import heroImg from "@/public/images/wallets/wallet-hero.png"

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params
  const t = await getTranslations("page-wallets")

  setRequestLocale(locale)

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/wallets")
  const messages = pick(allMessages, requiredNamespaces)

  const { contributors, lastEditLocaleTimestamp } =
    await getAppPageContributorInfo("wallets", locale as Lang)

  const cards = [
    {
      emoji: ":dollar:",
      title: t("page-wallets-manage-funds"),
      description: (
        <Translation id="page-wallets:page-wallets-manage-funds-desc" />
      ),
    },
    {
      emoji: ":frame_with_picture:",
      title: t("page-wallets-your-ethereum-account"),
      description: (
        <Translation id="page-wallets:page-wallets-your-ethereum-account-desc" />
      ),
    },
    {
      emoji: ":bust_in_silhouette:",
      title: t("page-wallets-your-login"),
      description: (
        <Translation id="page-wallets:page-wallets-your-login-desc" />
      ),
    },
  ]

  const types = [
    {
      emoji: ":cd:",
      description: <Translation id="page-wallets:page-wallets-cd" />,
    },
    {
      emoji: ":mobile_phone:",
      description: <Translation id="page-wallets:page-wallets-mobile" />,
    },
    {
      emoji: ":globe_with_meridians:",
      description: <Translation id="page-wallets:page-wallets-web-browser" />,
    },
    {
      emoji: ":globe_with_meridians:",
      description: (
        <Translation id="page-wallets:page-wallets-web-browser-extension" />
      ),
    },
    {
      emoji: ":desktop_computer:",
      description: <Translation id="page-wallets:page-wallets-desktop" />,
    },
  ]

  const articles = [
    {
      title: t("page-wallets-protecting-yourself"),
      description: "MyCrypto",
      link: "https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds",
      customEventOptions: {
        eventCategory: "Link",
        eventAction: "Clicked_external",
        eventName: "protecting_yourself",
      },
    },
    {
      title: t("page-wallets-keys-to-safety"),
      description: t("page-wallets-blog"),
      link: "https://www.coinbase.com/learn/crypto-basics/how-to-secure-crypto",
      customEventOptions: {
        eventCategory: "Link",
        eventAction: "Clicked_external",
        eventName: "the_keys_to_keeping_crypto_safe",
      },
    },
  ]

  const guides = [
    {
      title: t("additional-reading-how-to-create-an-ethereum-account"),
      link: "/guides/how-to-create-an-ethereum-account/",
      customEventOptions: {
        eventCategory: "Link",
        eventAction: "Clicked",
        eventName: "Create_eth_acc",
      },
    },
    {
      title: t("additional-reading-how-to-use-a-wallet"),
      link: "/guides/how-to-use-a-wallet/",
      customEventOptions: {
        eventCategory: "Link",
        eventAction: "Clicked",
        eventName: "How_to_use_wallet",
      },
    },
  ]

  return (
    <>
      <WalletsPageJsonLD
        locale={locale}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
        contributors={contributors}
      />

      <PageHero
        breadcrumbs={{ slug: "wallets" }}
        heroImg={heroImg}
        title={t("page-wallets-slogan")}
        description={t("page-wallets-subtitle")}
        // TODO: remove conditional after soft launch
        buttons={
          locale === "en"
            ? [
                {
                  href: "/wallets/find-wallet/",
                  content: t("page-wallets-find-wallet-link"),
                  matomo: {
                    eventCategory: "Header buttons",
                    eventAction: "click",
                    eventName: "Find_wallet",
                  },
                },
                {
                  href: `#${SIMULATOR_ID}`,
                  content: "How to use a wallet",
                  matomo: {
                    eventCategory: "Header buttons",
                    eventAction: "click",
                    eventName: "How_to_use_wallet",
                  },
                  variant: "outline",
                },
              ]
            : [
                {
                  href: "/wallets/find-wallet/",
                  content: t("page-wallets-find-wallet-link"),
                  matomo: {
                    eventCategory: "Header button",
                    eventAction: "click",
                    eventName: "Find_wallet",
                  },
                },
              ]
        }
        variant="no-divider"
      />

      <main className="pb-page">
        <I18nProvider locale={locale} messages={messages}>
          <MainArticle className="flow *:[section]:px-page">
            <Section
              id="what-is-a-wallet"
              className={cn(
                "bg-background-highlight p-page pb-16",
                locale !== "en" && "pt-16" // Adjust padding-top when no ListenToPlayer
              )}
            >
              {locale === "en" && <ListenToPlayer slug="/wallets/" />}

              <h2>{t("page-wallets-whats-a-wallet")}</h2>
              <div className="flex flex-col gap-x-16 gap-y-8 *:flex-1 lg:flex-row">
                <div className="flow">
                  <p>
                    <Translation id="page-wallets:page-wallets-description" />
                  </p>
                  <p>{t("page-wallets-desc-2")}</p>
                  <CardList items={guides} />
                </div>
                <div className="flow">
                  <p>{t("page-wallets-desc-3")}</p>
                  <p>{t("page-wallets-desc-4")}</p>
                </div>
              </div>
              <Grid columns={3}>
                {cards.map((card, idx) => (
                  <MarkdownCard
                    key={idx}
                    emoji={card.emoji}
                    title={card.title}
                    description={card.description}
                    variant="nested"
                  />
                ))}
              </Grid>
            </Section>

            <Section id="terms-and-types" className="py-16">
              <Grid balanced={2} className="gap-x-8 gap-y-8 lg:gap-x-16">
                <div className="flow">
                  <h2>{t("page-wallets-accounts-addresses")}</h2>
                  <p>{t("page-wallets-accounts-addresses-desc")}</p>
                  <ul>
                    <li>
                      <Translation id="page-wallets:page-wallets-ethereum-account" />
                    </li>
                    <li>
                      <Translation id="page-wallets:page-wallets-accounts-ethereum-addresses" />
                    </li>
                    <li>
                      <Translation id="page-wallets:page-wallets-ethereum-wallet" />
                    </li>
                  </ul>
                  <p>{t("page-wallets-most-wallets")}</p>
                </div>
                <div className="flow">
                  <h2>{t("page-wallets-types")}</h2>
                  <p>{t("page-wallets-types-desc")}</p>
                  <div className="space-y-2">
                    {types.map((type, idx) => (
                      <HorizontalCard
                        key={idx}
                        emoji={type.emoji}
                        description={type.description}
                        emojiClassName="text-[2.5rem]"
                      />
                    ))}
                  </div>
                </div>
              </Grid>
            </Section>

            {locale === "en" ? (
              <Suspense>
                <WalletSimulator>
                  <div className="flex flex-col-reverse gap-space">
                    <h2 className="text-h1">How to use a wallet</h2>
                    <p className="text-h4 text-body-medium italic">
                      Interactive tutorial
                    </p>
                  </div>
                </WalletSimulator>
              </Suspense>
            ) : (
              <Section
                className={cn(
                  "flow flex flex-col items-center bg-gradient-main py-20 text-center"
                )}
              >
                <h2>{t("page-wallets-features-title")}</h2>
                <p className="text-xl">{t("page-wallets-features-desc")}</p>
                <ButtonLink
                  href="/wallets/find-wallet/"
                  customEventOptions={{
                    eventCategory: "header buttons",
                    eventAction: "click",
                    eventName: "Find_wallet",
                  }}
                >
                  {t("page-wallets-find-wallet-btn")}
                </ButtonLink>
                <Image
                  src={FindWalletImage}
                  alt=""
                  className="w-full max-w-3xl"
                  sizes="(max-width: 864px) calc(100vw - 64px), 768px"
                />
              </Section>
            )}

            <Section id="safety" className="py-16">
              <Grid balanced={2} className="gap-x-8 gap-y-8 lg:gap-x-16">
                <div className="flow">
                  <h2>{t("page-wallets-stay-safe")}</h2>
                  <p>
                    <Translation id="page-wallets:page-wallets-stay-safe-desc" />
                  </p>

                  <HorizontalCard
                    key="0"
                    emoji=":white_check_mark:"
                    title={t("page-wallets-take-responsibility")}
                    description={t("page-wallets-take-responsibility-desc")}
                    emojiClassName="text-2xl"
                    className="items-start"
                  />
                  <HorizontalCard
                    key="1"
                    emoji=":white_check_mark:"
                    title={
                      <Translation id="page-wallets:page-wallets-seed-phrase" />
                    }
                    description={t("page-wallets-seed-phrase-desc")}
                    emojiClassName="text-2xl"
                    className="items-start"
                  >
                    <p>{t("page-wallets-seed-phrase-example")}</p>
                    <div className="rounded-md bg-black p-2">
                      <p className="font-mono text-sm text-white">
                        {t("page-wallets-seed-phrase-snippet")}
                      </p>
                    </div>
                    <p>{t("page-wallets-seed-phrase-write-down")}</p>
                  </HorizontalCard>
                  <HorizontalCard
                    key="2"
                    emoji=":white_check_mark:"
                    title={t("page-wallets-bookmarking")}
                    description={t("page-wallets-bookmarking-desc")}
                    emojiClassName="text-2xl"
                    className="items-start"
                  />
                  <HorizontalCard
                    key="3"
                    emoji=":white_check_mark:"
                    title={t("page-wallets-triple-check")}
                    description={t("page-wallets-triple-check-desc")}
                    emojiClassName="text-2xl"
                    className="items-start"
                  />
                </div>
                <div className="flow">
                  <h2>{t("page-wallets-tips")}</h2>
                  <p>{t("page-wallets-tips-community")}</p>
                  <CardList items={articles} />
                </div>
              </Grid>
            </Section>

            <Divider className="mx-page" />

            <Section id="explore">
              <h2>{t("page-wallets-explore")}</h2>
              <Grid balanced={2}>
                <Callout
                  image={ETHImage}
                  title={t("page-wallets-get-some")}
                  description={t("page-wallets-get-some-desc")}
                  as="h3"
                >
                  <ButtonLink href="/get-eth/">
                    {t("page-wallets-get-some-btn")}
                  </ButtonLink>
                </Callout>
                <Callout
                  image={DappsImage}
                  title={t("page-wallets-try-dapps")}
                  description={t("page-wallets-try-dapps-desc")}
                  as="h3"
                >
                  <ButtonLink href="/apps/">
                    {t("page-wallets-more-on-dapps-btn")}
                  </ButtonLink>
                </Callout>
              </Grid>
            </Section>

            <Section id="quiz" className="py-16">
              <StandaloneQuizWidget quizKey="wallets" />
            </Section>

            <Section id="contributors">
              <FileContributors
                className="my-10 border-t"
                contributors={contributors}
                lastEditLocaleTimestamp={lastEditLocaleTimestamp}
              />
            </Section>
          </MainArticle>
        </I18nProvider>

        {/* End-of-page actions */}
        <div className="px-page">
          <ContentFeedback />
        </div>
      </main>
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const params = await props.params
  const { locale } = params

  const t = await getTranslations("page-wallets")

  return await getMetadata({
    locale,
    slug: ["wallets"],
    title: t("page-wallets-meta-title"),
    description: t("page-wallets-meta-description"),
    image: "/images/wallets/wallet-hero.png",
  })
}

export default Page
