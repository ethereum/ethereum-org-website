import { getTranslations } from "next-intl/server"

import type { PageParams, ToCItem } from "@/lib/types"
import type { Lang } from "@/lib/types"

import CalloutBannerSSR from "@/components/CalloutBannerSSR"
import DocLink from "@/components/DocLink"
import { HubHero } from "@/components/Hero"
import type { HubHeroProps } from "@/components/Hero/HubHero"
import { Image, ImageProps } from "@/components/Image"
import { ButtonLink } from "@/components/ui/buttons/Button"
import {
  Card,
  CardBanner,
  CardContent,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import InlineLink from "@/components/ui/Link"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"

import UseCasesPageJsonLD from "./page-jsonld"

import { ContentLayout } from "@/layouts/ContentLayout"
import aiAgentsHero from "@/public/images/ai-agents/hero-image.png"
import ethImg from "@/public/images/eth.png"
import ethGifCat from "@/public/images/eth-gif-cat.png"
import ethereumLearn from "@/public/images/ethereum-learn.png"
import financeTransparent from "@/public/images/finance_transparent.png"
import futureTransparent from "@/public/images/future_transparent.png"
import heroImage from "@/public/images/heroes/guides-hub-hero.jpg"
import infrastructureTransparent from "@/public/images/infrastructure_transparent.png"
import manAndDog from "@/public/images/man-and-dog-playing.png"
import robotHelpBar from "@/public/images/robot-help-bar.png"
import stablecoinsHero from "@/public/images/stablecoins/hero.png"
import daoImg from "@/public/images/use-cases/dao-2.png"
import defi from "@/public/images/use-cases/defi.png"
import predictionMarkets from "@/public/images/use-cases/prediction-markets.png"
import restaking from "@/public/images/use-cases/restaking.png"

const UseCaseCard = ({
  href,
  image,
  title,
  description,
  ctaLabel,
}: {
  href: string
  image: ImageProps["src"]
  title: string
  description: string
  ctaLabel: string
}) => (
  <Card className="row-span-3 grid grid-rows-subgrid gap-y-8 bg-background-highlight p-8 max-md:p-4">
    <CardBanner background="none" fit="contain">
      <Image src={image} alt="" sizes="250px" />
    </CardBanner>
    <CardContent className="p-0">
      <CardTitle variant="bold">{title}</CardTitle>
      <CardParagraph variant="light">{description}</CardParagraph>
    </CardContent>
    <ButtonLink href={href} variant="solid">
      {ctaLabel}
    </ButtonLink>
  </Card>
)

export default async function Page(props: { params: Promise<PageParams> }) {
  const params = await props.params
  const { locale } = params
  const t = await getTranslations("page-use-cases")

  const { contributors, lastEditLocaleTimestamp } =
    await getAppPageContributorInfo("use-cases", locale as Lang)

  const tocItems = [
    { id: "financial-tools", title: t("toc-financial-tools") },
    { id: "digital-ownership-and-gaming", title: t("toc-digital-ownership") },
    { id: "organizations-and-identity", title: t("toc-organizations") },
    { id: "science-and-public-goods", title: t("toc-science") },
  ]
  const tocData: ToCItem[] = tocItems.map(({ id, title }) => ({
    title,
    url: "#" + id,
  }))

  const heroContent: HubHeroProps = {
    title: t("hero-title"),
    header: t("hero-header"),
    description: t("hero-description"),
    heroImg: heroImage,
    buttons: [
      {
        content: t("hero-button"),
        toId: tocItems[0].id,
        matomo: {
          eventCategory: "use cases hub hero",
          eventAction: "click",
          eventName: "explore use cases",
        },
      },
    ],
  }

  return (
    <>
      <UseCasesPageJsonLD locale={locale} contributors={contributors} />

      <ContentLayout
        tocItems={tocData}
        contributors={contributors}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
        heroSection={<HubHero {...heroContent} />}
        showDropdown={false}
      >
        <div className="space-y-24 max-lg:pt-10">
          <p className="text-lg text-body-medium">
            {t("page-intro-before-link")}{" "}
            <InlineLink href="/what-is-ether/">
              {t("page-intro-ether-link")}
            </InlineLink>
            {t("page-intro-after-link")}
          </p>

          {/* Financial tools */}
          <Section id={tocItems[0].id} className="space-y-16">
            <div className="space-y-8">
              <h2>{tocItems[0].title}</h2>
              <p>{t("financial-tools-description")}</p>

              <div className="grid grid-cols-fill-4 gap-4">
                <UseCaseCard
                  href="/defi/"
                  image={defi}
                  title={t("defi-title")}
                  description={t("defi-description")}
                  ctaLabel={t("defi-cta")}
                />
                <UseCaseCard
                  href="/stablecoins/"
                  image={stablecoinsHero}
                  title={t("stablecoins-title")}
                  description={t("stablecoins-description")}
                  ctaLabel={t("stablecoins-cta")}
                />
                <UseCaseCard
                  href="/payments/"
                  image={ethImg}
                  title={t("payments-title")}
                  description={t("payments-description")}
                  ctaLabel={t("payments-cta")}
                />
              </div>
            </div>

            <div className="space-y-8">
              <h3>{t("novel-uses-title")}</h3>

              <div className="grid grid-cols-fill-4 gap-4">
                <UseCaseCard
                  href="/real-world-assets/"
                  image={manAndDog}
                  title={t("rwa-title")}
                  description={t("rwa-description")}
                  ctaLabel={t("rwa-cta")}
                />
                <UseCaseCard
                  href="/prediction-markets/"
                  image={predictionMarkets}
                  title={t("prediction-markets-title")}
                  description={t("prediction-markets-description")}
                  ctaLabel={t("prediction-markets-cta")}
                />
                <UseCaseCard
                  href="https://institutions.ethereum.org/"
                  image={restaking}
                  title={t("institutions-title")}
                  description={t("institutions-description")}
                  ctaLabel={t("institutions-cta")}
                />
              </div>
            </div>

            <div className="flex xl:mx-36">
              <DocLink href="/restaking/">{t("restaking-link")}</DocLink>
            </div>
          </Section>

          {/* AI agents banner */}
          <CalloutBannerSSR
            id="ai-agents"
            title={t("ai-agents-title")}
            image={aiAgentsHero}
            description={t("ai-agents-description")}
            variant="small"
          >
            <ButtonLink href="/ai-agents/" className="w-fit">
              {t("ai-agents-cta")}
            </ButtonLink>
          </CalloutBannerSSR>

          {/* Digital ownership and gaming */}
          <Section id={tocItems[1].id} className="space-y-8">
            <h2>{tocItems[1].title}</h2>
            <p>{t("digital-ownership-description")}</p>

            <div className="grid grid-cols-fill-4 gap-4">
              <UseCaseCard
                href="/nft/"
                image={infrastructureTransparent}
                title={t("nft-title")}
                description={t("nft-description")}
                ctaLabel={t("nft-cta")}
              />
              <UseCaseCard
                href="/gaming/"
                image={robotHelpBar}
                title={t("gaming-title")}
                description={t("gaming-description")}
                ctaLabel={t("gaming-cta")}
              />
            </div>
          </Section>

          {/* Organizations and identity */}
          <Section id={tocItems[2].id} className="space-y-8">
            <h2>{tocItems[2].title}</h2>
            <p>{t("organizations-description")}</p>

            <div className="grid grid-cols-fill-4 gap-4">
              <UseCaseCard
                href="/dao/"
                image={daoImg}
                title={t("dao-title")}
                description={t("dao-description")}
                ctaLabel={t("dao-cta")}
              />
              <UseCaseCard
                href="/decentralized-identity/"
                image={ethGifCat}
                title={t("identity-title")}
                description={t("identity-description")}
                ctaLabel={t("identity-cta")}
              />
              <UseCaseCard
                href="/social-networks/"
                image={ethereumLearn}
                title={t("social-title")}
                description={t("social-description")}
                ctaLabel={t("social-cta")}
              />
            </div>
          </Section>

          {/* Science and public goods */}
          <Section id={tocItems[3].id} className="space-y-8">
            <h2>{tocItems[3].title}</h2>
            <p>{t("science-description")}</p>

            <div className="grid grid-cols-fill-4 gap-4">
              <UseCaseCard
                href="/desci/"
                image={futureTransparent}
                title={t("desci-title")}
                description={t("desci-description")}
                ctaLabel={t("desci-cta")}
              />
              <UseCaseCard
                href="/refi/"
                image={financeTransparent}
                title={t("refi-title")}
                description={t("refi-description")}
                ctaLabel={t("refi-cta")}
              />
            </div>
          </Section>

          {/* Ready to start? */}
          <CalloutBannerSSR
            id="ready-to-start"
            title={t("ready-to-start-title")}
            description={t("ready-to-start-description")}
            variant="medium"
          >
            <div className="flex flex-wrap gap-4 max-sm:flex-col [&>a]:max-sm:flex-1">
              <ButtonLink href="/wallets/find-wallet/" variant="solid">
                {t("ready-to-start-wallet-cta")}
              </ButtonLink>
              <ButtonLink href="/get-eth/" variant="outline" isSecondary>
                {t("ready-to-start-eth-cta")}
              </ButtonLink>
            </div>
          </CalloutBannerSSR>
        </div>
      </ContentLayout>
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const params = await props.params
  const { locale } = params
  const t = await getTranslations("page-use-cases")

  return await getMetadata({
    locale,
    slug: ["use-cases"],
    title: t("meta-title"),
    description: t("meta-description"),
    image: "/images/heroes/guides-hub-hero.jpg",
  })
}
