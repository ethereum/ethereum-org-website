import { pick } from "lodash"
import { BookOpen, Coins, LayoutGrid, Wallet } from "lucide-react"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import Callout from "@/components/ui/callout"
import {
  Card,
  CardButtonFake,
  CardContent,
  CardFooter,
  CardHeader,
  CardIconContainer,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { Grid } from "@/components/ui/grid"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { numberFormat } from "@/lib/utils/numbers"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"
import { getNewToCryptoWallets } from "@/lib/utils/wallets"

import StartWithEthereumFlow from "./_components/StartWithEthereumFlow"
import ShareModal from "./_components/StartWithEthereumFlow/ShareModal"
import PageJsonLD from "./page-jsonld"

import HeroImage from "@/public/images/heroes/developers-hub-hero.png"
import ManDogeImage from "@/public/images/start-with-ethereum/man-doge-playing.png"

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const t = await getTranslations("page-start")

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/start")
  const messages = pick(allMessages, requiredNamespaces)

  const newToCryptoWallets = getNewToCryptoWallets()
  const wallets = newToCryptoWallets.map((wallet) => ({
    ...wallet,
    supportedLanguages: [],
  }))

  const { contributors } = await getAppPageContributorInfo(
    "start",
    locale as Lang
  )

  const steps = [
    { id: "wallet", href: "/wallets/", icon: <Wallet /> },
    { id: "get-eth", href: "/get-eth/", icon: <Coins /> },
    { id: "apps", href: "/apps/", icon: <LayoutGrid /> },
    { id: "guides", href: "/guides/", icon: <BookOpen /> },
  ].map((step, idx) => ({
    ...step,
    title: t(`page-start-steps-${step.id}-title`, {
      number: numberFormat(locale).format(idx + 1),
    }),
    description: t(`page-start-steps-${step.id}-description`),
    cta: t(`page-start-steps-${step.id}-cta`),
  }))

  return (
    <>
      <PageJsonLD locale={locale} contributors={contributors} />

      <Image
        src={HeroImage}
        alt={t("page-start-hero-alt")}
        sizes="(max-width: 1504px) 100vw, 1504px"
        className="mb-space-3x h-60 w-full object-cover md:h-96"
        preload
      />
      <div className="flow mx-auto max-w-3xl px-page text-center">
        <h1>{t("page-start-title")}</h1>
        <p>{t("page-start-subtitle")}</p>
      </div>

      <I18nProvider locale={locale} messages={messages}>
        <MainArticle className="space-y-space-2x overflow-x-hidden px-page py-page-2x">
          <Section id="first-steps" className="flow">
            <h2>{t("page-start-steps-title")}</h2>
            <p>{t("page-start-steps-description")}</p>
            <Grid balanced={4}>
              {steps.map((step) => (
                <Card href={step.href} hoverLift key={step.id}>
                  <CardHeader className="flex items-center justify-between gap-4">
                    <CardTitle>{step.title}</CardTitle>
                    <CardIconContainer>{step.icon}</CardIconContainer>
                  </CardHeader>
                  <CardContent>
                    <CardParagraph>{step.description}</CardParagraph>
                  </CardContent>
                  <CardFooter buttons="full">
                    <CardButtonFake variant="outline">
                      {step.cta}
                    </CardButtonFake>
                  </CardFooter>
                </Card>
              ))}
            </Grid>
          </Section>

          <Section id="start-with-ethereum-flow">
            <StartWithEthereumFlow newToCryptoWallets={wallets} />
          </Section>

          <Callout
            title={t("page-start-share-section-title")}
            description={t("page-start-share-section-description")}
            image={ManDogeImage}
          >
            <ShareModal />
          </Callout>
        </MainArticle>
      </I18nProvider>
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const t = await getTranslations("page-start")

  return await getMetadata({
    locale,
    slug: ["start"],
    title: t("page-start-meta-title"),
    description: t("page-start-meta-description"),
    image: "/images/heroes/developers-hub-hero.png",
  })
}

export default Page
