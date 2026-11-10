import { pick } from "lodash"
import type { StaticImageData } from "next/image"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import { ButtonLink } from "@/components/ui/buttons/Button"
import Callout from "@/components/ui/callout"
import InlineLink, { LinkWithArrow } from "@/components/ui/Link"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"
import { Section } from "@/components/ui/section"
import { Tag, type TagProps } from "@/components/ui/tag"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { numberFormat } from "@/lib/utils/numbers"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"
import { getWalletPersonaIds } from "@/lib/utils/walletData"
import { getNewToCryptoWallets } from "@/lib/utils/wallets"

import { PERSONA_STYLES, PERSONA_TITLE_KEYS } from "@/data/wallets/personas"
import walletsData from "@/data/wallets/wallet-data"

import ConnectWallet from "./_components/ConnectWallet"
import ShareModal from "./_components/ShareModal"
import PageJsonLD from "./page-jsonld"

import { getStaticAppsData } from "@/lib/data"
import AaveImage from "@/public/images/dapps/aave.png"
import OpenSeaImage from "@/public/images/dapps/opensea.png"
import UniswapImage from "@/public/images/dapps/uni.png"
import ZoraImage from "@/public/images/dapps/zora.png"
import HeroImage from "@/public/images/heroes/developers-hub-hero.png"
import ManDogeImage from "@/public/images/start-with-ethereum/man-doge-playing.png"

interface StepRowProps {
  name: string
  href: string
  image: StaticImageData
  imageClassName?: string
  imageSize: number
  tags: { label: string; status: TagProps["status"] }[]
  detail: string
  eventAction: string
}

const StepRow = ({
  name,
  href,
  image,
  imageClassName,
  imageSize,
  tags,
  detail,
  eventAction,
}: StepRowProps) => (
  <LinkBox
    asChild
    className="m-0 flex items-center gap-4 px-4 py-3 hover:bg-background-highlight"
  >
    <li>
      <Image
        src={image}
        alt=""
        width={imageSize}
        height={imageSize}
        className={imageClassName}
      />
      <div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <LinkOverlay asChild>
            <InlineLink
              href={href}
              className="font-bold text-body no-underline hover:text-body"
              customEventOptions={{
                eventCategory: "start page",
                eventAction,
                eventName: name,
              }}
            >
              {name}
            </InlineLink>
          </LinkOverlay>
          {tags.map((tag) => (
            <Tag
              key={tag.label}
              variant="subtle"
              status={tag.status}
              size="small"
            >
              {tag.label}
            </Tag>
          ))}
        </div>
        <p className="text-sm text-body-medium">{detail}</p>
      </div>
    </li>
  </LinkBox>
)

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const t = await getTranslations("page-start")
  const tFindWallet = await getTranslations("page-wallets-find-wallet")

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/start")
  const messages = pick(allMessages, requiredNamespaces)

  const newToCryptoWallets = getNewToCryptoWallets()
  const wallets = newToCryptoWallets.map((wallet) => ({
    ...wallet,
    // Every wallet here is a beginner pick, so that tag would repeat on each row
    personas: getWalletPersonaIds(wallet).filter(
      (persona) => persona !== "new-to-crypto"
    ),
  }))

  // Static getter keeps /start/ out of ISR; the count refreshes on deploy
  const appsData = await getStaticAppsData()
  const appCount = appsData
    ? new Set(
        Object.values(appsData)
          .flat()
          .map((app) => app.name)
      ).size
    : 0

  const { contributors } = await getAppPageContributorInfo(
    "start",
    locale as Lang
  )

  const formatCount = (count: number) => numberFormat(locale).format(count)

  const appTags = {
    socials: { label: t("page-start-apps-socials-tag"), status: "primary" },
    finance: { label: t("page-start-apps-finance-tag"), status: "accent-c" },
    collectibles: {
      label: t("page-start-apps-collectibles-tag"),
      status: "tag-yellow",
    },
  } satisfies Record<string, StepRowProps["tags"][number]>

  const apps = [
    {
      name: "Uniswap",
      tag: appTags.finance,
      description: t("page-start-apps-uniswap-description"),
      url: "https://app.uniswap.org/",
      image: UniswapImage,
    },
    {
      name: "Aave",
      tag: appTags.finance,
      description: t("page-start-apps-aave-description"),
      url: "https://aave.com/",
      image: AaveImage,
    },
    {
      name: "OpenSea",
      tag: appTags.collectibles,
      description: t("page-start-apps-opensea-description"),
      url: "https://opensea.io/",
      image: OpenSeaImage,
    },
    {
      name: "Zora",
      tag: appTags.socials,
      description: t("page-start-apps-zora-description"),
      url: "https://zora.co/",
      image: ZoraImage,
    },
  ]

  const guides = [
    { id: "use-a-wallet", href: "/guides/how-to-use-a-wallet/" },
    { id: "swap-tokens", href: "/guides/how-to-swap-tokens/" },
    { id: "id-scam-tokens", href: "/guides/how-to-id-scam-tokens/" },
  ]

  const rowListClassName =
    "ms-0 list-none divide-y overflow-hidden rounded-base border"

  const steps = [
    {
      id: "wallet",
      href: "/wallets/find-wallet/",
      description: t("page-start-steps-wallet-description"),
      action: (
        <ul className={rowListClassName}>
          {wallets.map((wallet) => (
            <StepRow
              key={wallet.name}
              name={wallet.name}
              href={wallet.url}
              image={wallet.image}
              imageSize={28}
              tags={wallet.personas.map((persona) => ({
                label: tFindWallet(PERSONA_TITLE_KEYS[persona]),
                status: PERSONA_STYLES[persona].tag,
              }))}
              detail={t("page-start-steps-wallet-languages", {
                count: wallet.languages_supported.length,
                countFormatted: formatCount(wallet.languages_supported.length),
              })}
              eventAction="get wallet"
            />
          ))}
        </ul>
      ),
      // The picks above are the main action; the full list is secondary
      ctaAsLink: true,
      cta: t("page-start-steps-wallet-cta", {
        count: walletsData.length,
        countFormatted: formatCount(walletsData.length),
      }),
    },
    {
      id: "get-eth",
      href: "/get-eth/",
      description: t("page-start-steps-get-eth-description", {
        count: wallets.length,
        countFormatted: formatCount(wallets.length),
      }),
      cta: t("page-start-steps-get-eth-cta"),
    },
    {
      id: "apps",
      href: "/apps/",
      description: t("page-start-steps-apps-description"),
      action: (
        <ul className={rowListClassName}>
          {apps.map((app) => (
            <StepRow
              key={app.name}
              name={app.name}
              href={app.url}
              image={app.image}
              imageSize={36}
              imageClassName="rounded-base"
              tags={[app.tag]}
              detail={app.description}
              eventAction="dapps"
            />
          ))}
        </ul>
      ),
      cta: appCount
        ? t("page-start-steps-apps-cta-count", {
            count: appCount,
            countFormatted: formatCount(appCount),
          })
        : t("page-start-steps-apps-cta"),
      footer: (
        <section className="border-t pt-space-2x">
          <h3 className="text-xl">{t("page-start-steps-connect-title")}</h3>
          <p>{t("page-start-connect-wallet-description")}</p>
          <div data-flow="cta">
            <ConnectWallet />
          </div>
        </section>
      ),
    },
    {
      id: "guides",
      href: "/guides/",
      description: t("page-start-steps-guides-description"),
      action: (
        <ul className="ms-0 list-none">
          {guides.map((guide) => (
            <li key={guide.id}>
              <InlineLink href={guide.href}>
                {t(`page-start-steps-guides-${guide.id}`)}
              </InlineLink>
            </li>
          ))}
        </ul>
      ),
      cta: t("page-start-steps-guides-cta"),
    },
  ].map((step, idx) => ({
    ...step,
    number: formatCount(idx + 1),
    title: t(`page-start-steps-${step.id}-title`),
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
          <Section id="first-steps" className="mx-auto max-w-3xl">
            <ol className="m-0 list-none">
              {steps.map((step) => (
                <li
                  key={step.id}
                  className="group/step m-0 grid grid-cols-[2.5rem_1fr] gap-x-4 sm:gap-x-6"
                >
                  <div className="flex flex-col items-center">
                    <span
                      aria-hidden
                      className="grid size-10 shrink-0 place-items-center rounded-full border-2 border-primary text-lg font-bold text-primary"
                    >
                      {step.number}
                    </span>
                    <span className="my-2 w-px flex-1 bg-body-light group-last/step:hidden" />
                  </div>
                  <div className="flow pt-1.5 pb-space-3x group-last/step:pb-0">
                    <h2 className="text-2xl">
                      <span className="sr-only">{step.number}. </span>
                      {step.title}
                    </h2>
                    <p>{step.description}</p>
                    {step.action}
                    <div data-flow="cta">
                      {step.ctaAsLink ? (
                        <LinkWithArrow
                          href={step.href}
                          customEventOptions={{
                            eventCategory: "start page",
                            eventAction: "first steps",
                            eventName: step.id,
                          }}
                        >
                          {step.cta}
                        </LinkWithArrow>
                      ) : (
                        <ButtonLink
                          href={step.href}
                          customEventOptions={{
                            eventCategory: "start page",
                            eventAction: "first steps",
                            eventName: step.id,
                          }}
                        >
                          {step.cta}
                        </ButtonLink>
                      )}
                    </div>
                    {step.footer}
                  </div>
                </li>
              ))}
            </ol>
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
