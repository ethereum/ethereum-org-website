import { ReactNode } from "react"
import { getTranslations } from "next-intl/server"

import type { PageParams, ToCItem } from "@/lib/types"
import type { Lang } from "@/lib/types"

import DocLink from "@/components/DocLink"
import FeedbackCard from "@/components/FeedbackCard"
import FileContributors from "@/components/FileContributors"
import { HubHero } from "@/components/Hero"
import type { HubHeroProps } from "@/components/Hero/HubHero"
import { Image, ImageProps } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import { ContentContainer } from "@/components/MdComponents"
import TableOfContents from "@/components/TableOfContents"
import { ButtonLink } from "@/components/ui/buttons/Button"
import {
  Card,
  CardBanner,
  CardContent,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { Flex, Stack } from "@/components/ui/flex"
import InlineLink, { BaseLink } from "@/components/ui/Link"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"

import UseCasesPageJsonLD from "./page-jsonld"

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

const Section = ({
  headingId,
  headingTitle,
  description,
  children,
}: {
  headingId: string
  headingTitle: string
  description?: string
  children: ReactNode
}) => (
  <Stack asChild className="gap-8">
    <section className="mt-24 first:mt-0">
      <Stack className="gap-8">
        <h2 id={headingId} className="text-2xl leading-[1.4] md:text-[2rem]">
          {headingTitle}
        </h2>
        {description && <p>{description}</p>}
      </Stack>
      {children}
    </section>
  </Stack>
)

type UseCaseCardProps = {
  href: string
  image: ImageProps["src"]
  title: string
  description: string
  ctaLabel: string
}

const UseCaseCard = ({
  href,
  image,
  title,
  description,
  ctaLabel,
}: UseCaseCardProps) => (
  <Card className="row-span-3 grid grid-rows-subgrid gap-y-8 bg-background-highlight p-8 max-md:px-4">
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

      <div className="relative w-full">
        <HubHero {...heroContent} />

        <Flex
          className="mx-auto mb-16 w-full flex-col justify-between pt-10 lg:flex-row lg:pt-16"
          asChild
        >
          <MainArticle>
            <TableOfContents items={tocData} variant="left" />

            <ContentContainer id="content">
              <p className="text-lg text-body-medium">
                {t("page-intro-before-link")}{" "}
                <InlineLink href="/what-is-ether/">
                  {t("page-intro-ether-link")}
                </InlineLink>
                {t("page-intro-after-link")}
              </p>

              {/* Financial tools */}
              <Section
                headingId={tocItems[0].id}
                headingTitle={tocItems[0].title}
                description={t("financial-tools-description")}
              >
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

                <h3 className="mt-8 text-xl md:text-2xl">
                  {t("novel-uses-title")}
                </h3>
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

                <Flex className="mt-8 flex-col gap-[0.8rem] xl:mx-36">
                  <DocLink href="/restaking/">{t("restaking-link")}</DocLink>
                </Flex>
              </Section>

              {/* AI agents banner */}
              <section className="mt-24">
                <BaseLink
                  href="/ai-agents/"
                  className="no-underline hover:no-underline"
                  hideArrow
                >
                  <Flex className="group/link flex-col overflow-hidden rounded-[10px] bg-gradient-to-r from-accent-a/10 to-accent-c/10 lg:flex-row dark:from-accent-a/20 dark:to-accent-c-hover/20">
                    <Stack className="flex-1 gap-3 p-12">
                      <h3 className="text-xl text-body md:text-2xl">
                        {t("ai-agents-title")}
                      </h3>
                      <p className="text-body-medium">
                        {t("ai-agents-description")}
                      </p>
                      <ButtonLink
                        href="/ai-agents/"
                        variant="solid"
                        className="mt-3 w-fit"
                      >
                        {t("ai-agents-cta")}
                      </ButtonLink>
                    </Stack>
                    <div className="self-center pe-8 max-lg:mx-auto">
                      <Image
                        src={aiAgentsHero}
                        alt=""
                        className="max-w-[265px] object-contain"
                        sizes="265px"
                      />
                    </div>
                  </Flex>
                </BaseLink>
              </section>

              {/* Digital ownership and gaming */}
              <Section
                headingId={tocItems[1].id}
                headingTitle={tocItems[1].title}
                description={t("digital-ownership-description")}
              >
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
              <Section
                headingId={tocItems[2].id}
                headingTitle={tocItems[2].title}
                description={t("organizations-description")}
              >
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
              <Section
                headingId={tocItems[3].id}
                headingTitle={tocItems[3].title}
                description={t("science-description")}
              >
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
              <Stack className="mt-24 gap-6 rounded-2xl bg-main-gradient p-12">
                <h2 className="text-2xl leading-[1.4] md:text-[2rem]">
                  {t("ready-to-start-title")}
                </h2>
                <p>{t("ready-to-start-description")}</p>
                <Flex className="gap-4">
                  <ButtonLink href="/wallets/find-wallet/" variant="solid">
                    {t("ready-to-start-wallet-cta")}
                  </ButtonLink>
                  <ButtonLink href="/get-eth/" variant="outline" isSecondary>
                    {t("ready-to-start-eth-cta")}
                  </ButtonLink>
                </Flex>
              </Stack>

              <FileContributors
                className="my-10 border-t"
                contributors={contributors}
                lastEditLocaleTimestamp={lastEditLocaleTimestamp}
              />
              <FeedbackCard />
            </ContentContainer>
          </MainArticle>
        </Flex>
      </div>
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
