import { ReactNode } from "react"
import { getTranslations } from "next-intl/server"

import type { PageParams, ToCItem } from "@/lib/types"
import type { Lang } from "@/lib/types"

import FeedbackCard from "@/components/FeedbackCard"
import FileContributors from "@/components/FileContributors"
import { HubHero } from "@/components/Hero"
import type { HubHeroProps } from "@/components/Hero/HubHero"
import { Image, ImageProps } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import { ContentContainer } from "@/components/MdComponents"
import TableOfContents from "@/components/TableOfContents"
import { Card } from "@/components/ui/card"
import { Flex, Stack } from "@/components/ui/flex"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"

import UseCasesPageJsonLD from "./page-jsonld"

import aiAgentsHero from "@/public/images/ai-agents/hero-image.png"
import ethGifCat from "@/public/images/eth-gif-cat.png"
import ethereumLearn from "@/public/images/ethereum-learn.png"
import futureTransparent from "@/public/images/future_transparent.png"
import heroImage from "@/public/images/heroes/learn-hub-hero.png"
import impact from "@/public/images/impact_transparent.png"
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
  imageAlt?: string
  title: string
  description: string
  ctaLabel: string
}

const UseCaseCard = ({
  href,
  image,
  imageAlt = "",
  title,
  description,
  ctaLabel,
}: UseCaseCardProps) => (
  <Card
    href={href}
    className="flex flex-col gap-y-8 rounded-2xl bg-background-highlight p-8 max-md:px-4"
  >
    <Image
      src={image}
      alt={imageAlt}
      className="mx-auto h-[200px] w-auto"
      sizes="250px"
    />
    <div className="flex-1 space-y-2">
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-body-medium">{description}</p>
    </div>
    <span
      className="inline-flex min-h-10.5 w-full items-center justify-center gap-2 rounded border border-solid border-transparent bg-primary-action px-4 py-2 text-white transition hover:bg-primary-action-hover hover:text-white"
      aria-hidden="true"
    >
      {ctaLabel}
    </span>
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
    { id: "emerging-use-cases", title: t("toc-emerging") },
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
              {/* Financial tools */}
              <Section
                headingId={tocItems[0].id}
                headingTitle={tocItems[0].title}
                description={t("financial-tools-description")}
              >
                <div className="grid grid-cols-fill-4 grid-rows-[auto] gap-4">
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
                    image={impact}
                    title={t("payments-title")}
                    description={t("payments-description")}
                    ctaLabel={t("payments-cta")}
                  />
                  <UseCaseCard
                    href="/real-world-assets/"
                    image={manAndDog}
                    title={t("rwa-title")}
                    description={t("rwa-description")}
                    ctaLabel={t("rwa-cta")}
                  />
                </div>
              </Section>

              {/* Digital ownership and gaming */}
              <Section
                headingId={tocItems[1].id}
                headingTitle={tocItems[1].title}
                description={t("digital-ownership-description")}
              >
                <div className="grid grid-cols-fill-4 grid-rows-[auto] gap-4">
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
                <div className="grid grid-cols-fill-4 grid-rows-[auto] gap-4">
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
                <div className="grid grid-cols-fill-4 grid-rows-[auto] gap-4">
                  <UseCaseCard
                    href="/desci/"
                    image={futureTransparent}
                    title={t("desci-title")}
                    description={t("desci-description")}
                    ctaLabel={t("desci-cta")}
                  />
                  <UseCaseCard
                    href="/refi/"
                    image={futureTransparent}
                    title={t("refi-title")}
                    description={t("refi-description")}
                    ctaLabel={t("refi-cta")}
                  />
                </div>
              </Section>

              {/* Emerging use cases */}
              <Section
                headingId={tocItems[4].id}
                headingTitle={tocItems[4].title}
                description={t("emerging-description")}
              >
                <div className="grid grid-cols-fill-4 grid-rows-[auto] gap-4">
                  <UseCaseCard
                    href="/ai-agents/"
                    image={aiAgentsHero}
                    title={t("ai-agents-title")}
                    description={t("ai-agents-description")}
                    ctaLabel={t("ai-agents-cta")}
                  />
                  <UseCaseCard
                    href="/prediction-markets/"
                    image={predictionMarkets}
                    title={t("prediction-markets-title")}
                    description={t("prediction-markets-description")}
                    ctaLabel={t("prediction-markets-cta")}
                  />
                  <UseCaseCard
                    href="/restaking/"
                    image={restaking}
                    title={t("restaking-title")}
                    description={t("restaking-description")}
                    ctaLabel={t("restaking-cta")}
                  />
                </div>
              </Section>

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
    description: t("hero-description"),
    image: "/images/heroes/learn-hub-hero.png",
  })
}
