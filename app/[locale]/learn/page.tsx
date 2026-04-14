import { HTMLAttributes, ReactNode } from "react"
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
import {
  Card,
  CardBanner,
  CardContent,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { Flex, Stack } from "@/components/ui/flex"
import InlineLink from "@/components/ui/Link"
import { ListItem, UnorderedList } from "@/components/ui/list"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"

import LearnPageJsonLD from "./page-jsonld"

import developersEthBlocks from "@/public/images/developers-eth-blocks.png"
import dogeComputer from "@/public/images/doge-computer.png"
import enterprise from "@/public/images/enterprise-eth.png"
import eth from "@/public/images/eth.png"
import financeTransparent from "@/public/images/finance_transparent.png"
import futureTransparent from "@/public/images/future_transparent.png"
import hackathon from "@/public/images/hackathon_transparent.png"
import heroImage from "@/public/images/heroes/learn-hub-hero.png"
import impact from "@/public/images/impact_transparent.png"
import Layer2LearnHero from "@/public/images/layer-2/learn-hero.png"
import merge from "@/public/images/upgrades/merge.png"
import newRings from "@/public/images/upgrades/newrings.png"
import wallet from "@/public/images/wallet.png"
import whatIsEth from "@/public/images/what-is-ethereum.png"

const AdditionalDocReading = ({
  headingText,
  docLinks,
}: {
  headingText: string
  docLinks: Array<{ href: string; label: string; isExternal?: boolean }>
}) => (
  <Stack className="mt-16 gap-8">
    <h3 className="text-center text-xl">{headingText}</h3>
    <Flex className="flex-col gap-[0.8rem] xl:mx-36">
      {docLinks.map(({ label, ...rest }) => (
        <DocLink key={label} {...rest}>
          {label}
        </DocLink>
      ))}
    </Flex>
  </Stack>
)

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

const H3 = ({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className="text-xl md:text-2xl" {...props}>
    {children}
  </h3>
)

type LearnCardProps = {
  href: string
  image: ImageProps["src"]
  imageAlt?: string
  title: string
  description: string
}

const LearnCard = ({
  href,
  image,
  imageAlt = "",
  title,
  description,
}: LearnCardProps) => (
  <Card
    href={href}
    className="row-span-3 grid grid-rows-subgrid gap-y-4 rounded-2xl bg-background-highlight p-6"
  >
    <CardBanner background="body" size="full" fit="contain">
      <Image src={image} alt={imageAlt} className="h-full w-full" />
    </CardBanner>
    <CardContent className="space-y-2 p-0">
      <CardTitle>{title}</CardTitle>
      <CardParagraph variant="light">{description}</CardParagraph>
    </CardContent>
    <div />
  </Card>
)

export default async function Page(props: { params: Promise<PageParams> }) {
  const params = await props.params
  const { locale } = params
  const t = await getTranslations("page-learn")
  const tCommon = await getTranslations("common")

  const { contributors, lastEditLocaleTimestamp } =
    await getAppPageContributorInfo("learn", locale as Lang)

  const tocItems = [
    {
      id: "understand-ethereum",
      title: t("toc-what-is-crypto-ethereum"),
    },
    {
      id: "how-do-i-use-ethereum",
      title: t("toc-how-do-i-use-ethereum"),
    },
    {
      id: "what-is-ethereum-used-for",
      title: t("toc-what-is-ethereum-used-for"),
    },
    {
      id: "learn-about-the-ethereum-protocol",
      title: t("toc-learn-about-the-ethereum-protocol"),
    },
    {
      id: "learn-about-the-ethereum-community",
      title: t("toc-learn-about-the-ethereum-community"),
    },
    {
      id: "books-and-podcasts",
      title: t("toc-books-and-podcasts"),
    },
  ]
  const tocData: ToCItem[] = tocItems.map(({ id, title }) => ({
    title,
    url: "#" + id,
  }))

  const heroContent: HubHeroProps = {
    title: tCommon("learn-hub"),
    header: t("hero-header"),
    description: t("hero-subtitle"),
    heroImg: heroImage,
    buttons: [
      {
        content: t("hero-button-lets-get-started"),
        toId: tocItems[0].id,
        matomo: {
          eventCategory: "learn hub hero buttons",
          eventAction: "click",
          eventName: "lets get started",
        },
      },
    ],
  }

  return (
    <>
      <LearnPageJsonLD locale={locale} contributors={contributors} />

      <div className="relative w-full">
        <HubHero {...heroContent} />

        <Flex
          className="mx-auto mb-16 w-full flex-col justify-between pt-10 lg:flex-row lg:pt-16"
          asChild
        >
          <MainArticle>
            <TableOfContents items={tocData} variant="left" />

            <ContentContainer id="content">
              {/* Section 1: Understand Ethereum - guided tour */}
              <Section
                headingId={tocItems[0].id}
                headingTitle={tocItems[0].title}
                description={t("what-is-crypto-2")}
              >
                <div className="grid grid-cols-fill-4 grid-rows-[auto] gap-4">
                  <LearnCard
                    href="/what-is-ethereum/"
                    image={whatIsEth}
                    imageAlt={t("what-is-ethereum-card-image-alt")}
                    title={t("what-is-ethereum-card-title")}
                    description={t("understand-ethereum-card-description")}
                  />
                  <LearnCard
                    href="/what-is-the-ethereum-network/"
                    image={developersEthBlocks}
                    title={t("ethereum-network-card-title")}
                    description={t("ethereum-network-card-description")}
                  />
                  <LearnCard
                    href="/what-is-ether/"
                    image={eth}
                    title={t("what-is-eth-card-title")}
                    description={t("what-is-eth-description")}
                  />
                  <LearnCard
                    href="/ethereum-vs-bitcoin/"
                    image={financeTransparent}
                    title={t("ethereum-vs-bitcoin-card-title")}
                    description={t("ethereum-vs-bitcoin-card-description")}
                  />
                  <LearnCard
                    href="/ethereum-history-founder-and-ownership/"
                    image={merge}
                    title={t("ethereum-history-card-title")}
                    description={t("ethereum-history-card-description")}
                  />
                  <LearnCard
                    href="/wallets/"
                    image={wallet}
                    imageAlt={t("what-is-a-wallet-card-alt")}
                    title={t("what-is-a-wallet-card-title")}
                    description={t("wallets-card-description")}
                  />
                  <LearnCard
                    href="/web3/"
                    image={impact}
                    title={t("what-is-web3-card-title")}
                    description={t("what-is-web3-card-description")}
                  />
                  <LearnCard
                    href="/smart-contracts/"
                    image={hackathon}
                    title={t("smart-contracts-card-title")}
                    description={t("smart-contracts-card-description")}
                  />
                </div>

                <AdditionalDocReading
                  headingText={t("additional-reading-more-on-ethereum-basics")}
                  docLinks={[
                    { href: "/guides/", label: t("guides-hub-desc") },
                    { href: "/quizzes/", label: t("quiz-hub-desc") },
                    {
                      href: "https://www.youtube.com/watch?v=UihMqcj-cqc",
                      label: t("additional-reading-ethereum-in-thirty-minutes"),
                      isExternal: true,
                    },
                  ]}
                />
              </Section>

              {/* Section 2: How to use Ethereum */}
              <Section
                headingId={tocItems[1].id}
                headingTitle={tocItems[1].title}
                description={t("how-do-i-use-ethereum-1")}
              >
                <div className="grid grid-cols-fill-4 grid-rows-[auto] gap-4">
                  <LearnCard
                    href="/wallets/find-wallet/"
                    image={futureTransparent}
                    title={t("find-a-wallet-card-title")}
                    description={t("find-a-wallet-card-description")}
                  />
                  <LearnCard
                    href="/layer-2/networks/"
                    image={Layer2LearnHero}
                    title={t("ethereum-networks-card-title")}
                    description={t("ethereum-networks-card-description")}
                  />
                </div>

                <Flex className="my-12 flex-col overflow-hidden rounded-[10px] bg-main-gradient lg:flex-row">
                  <Stack className="gap-8 p-12">
                    <H3>{t("things-to-consider-banner-title")}</H3>
                    <UnorderedList className="mb-0">
                      <ListItem>{t("things-to-consider-banner-1")}</ListItem>
                      <ListItem>
                        {t("things-to-consider-banner-2")}{" "}
                        <InlineLink href="/layer-2/networks/">
                          {t("things-to-consider-banner-layer-2")}
                        </InlineLink>
                        .
                      </ListItem>
                    </UnorderedList>
                  </Stack>
                  <div className="self-end">
                    <Image
                      className="max-w-[265px]"
                      src={newRings}
                      alt=""
                      sizes="265px"
                    />
                  </div>
                </Flex>

                <AdditionalDocReading
                  headingText={t("additional-reading-more-on-using-ethereum")}
                  docLinks={[
                    {
                      href: "/guides/how-to-create-an-ethereum-account/",
                      label: t(
                        "additional-reading-how-to-create-an-ethereum-account"
                      ),
                    },
                    {
                      href: "/guides/how-to-use-a-wallet/",
                      label: t("additional-reading-how-to-use-a-wallet"),
                    },
                    {
                      href: "/layer-2/",
                      label: t("additional-reading-layer-2"),
                    },
                    {
                      href: "/get-eth/",
                      label: t("additional-reading-get-eth"),
                    },
                  ]}
                />
              </Section>

              {/* Section 3: What is Ethereum used for - slim, links to /use-cases/ */}
              <Section
                headingId={tocItems[2].id}
                headingTitle={tocItems[2].title}
                description={t("what-is-ethereum-used-for-1")}
              >
                <div className="grid grid-cols-fill-4 grid-rows-[auto] gap-4">
                  <LearnCard
                    href="/use-cases/"
                    image={developersEthBlocks}
                    title={t("explore-use-cases-card-title")}
                    description={t("explore-use-cases-card-description")}
                  />
                </div>
              </Section>

              {/* Section 4: Learn about the Ethereum protocol */}
              <Section
                headingId={tocItems[3].id}
                headingTitle={tocItems[3].title}
                description={t("learn-about-ethereum-protocol-description")}
              >
                <div className="grid grid-cols-fill-4 grid-rows-[auto] gap-4">
                  <LearnCard
                    href="/energy-consumption/"
                    image={hackathon}
                    title={t("energy-consumption-card-title")}
                    description={t("energy-consumption-card-description")}
                  />
                  <LearnCard
                    href="/roadmap/"
                    image={merge}
                    title={t("ethereum-upgrades-card-title")}
                    description={t("ethereum-upgrades-card-description")}
                  />
                  <LearnCard
                    href="/whitepaper/"
                    image={financeTransparent}
                    title={t("ethereum-whitepaper-card-title")}
                    description={t("ethereum-whitepaper-card-description")}
                  />
                </div>

                <AdditionalDocReading
                  headingText={t("more-on-ethereum-protocol-title")}
                  docLinks={[
                    {
                      href: "/developers/",
                      label: t(
                        "more-on-ethereum-protocol-ethereum-for-developers"
                      ),
                    },
                    {
                      href: "/developers/docs/consensus-mechanisms/",
                      label: t("more-on-ethereum-protocol-consensus"),
                    },
                    {
                      href: "/developers/docs/evm/",
                      label: t("more-on-ethereum-protocol-evm"),
                    },
                    {
                      href: "/developers/docs/nodes-and-clients/",
                      label: t("more-on-ethereum-protocol-nodes-and-clients"),
                    },
                  ]}
                />
              </Section>

              {/* Section 5: Community */}
              <Section
                headingId={tocItems[4].id}
                headingTitle={tocItems[4].title}
                description={t("ethereum-community-description")}
              >
                <div className="grid grid-cols-fill-4 grid-rows-[auto] gap-4">
                  <LearnCard
                    href="/community/"
                    image={enterprise}
                    imageAlt={t("community-hub-card-alt")}
                    title={t("community-hub-card-title")}
                    description={t("community-hub-card-description")}
                  />
                  <LearnCard
                    href="/community/get-involved/"
                    image={dogeComputer}
                    title={t("get-involved-card-title")}
                    description={t("get-involved-card-description")}
                  />
                  <LearnCard
                    href="/community/online/"
                    image={impact}
                    title={t("online-communities-card-title")}
                    description={t("online-communities-card-description")}
                  />
                </div>
              </Section>

              {/* Section 6: Books and podcasts */}
              <Section
                headingId={tocItems[5].id}
                headingTitle={tocItems[5].title}
              >
                <Stack className="gap-8">
                  <H3>{t("books-about-ethereum")}</H3>
                  <UnorderedList>
                    <ListItem>
                      <InlineLink href="https://www.goodreads.com/book/show/57356067-the-cryptopians">
                        {t("cryptopians-title")}
                      </InlineLink>{" "}
                      <i>{t("cryptopians-description")}</i>
                    </ListItem>
                    <ListItem>
                      <InlineLink href="https://www.goodreads.com/book/show/55360267-out-of-the-ether">
                        {t("out-of-the-ether-title")}
                      </InlineLink>{" "}
                      <i>{t("out-of-the-ether-description")}</i>
                    </ListItem>
                    <ListItem>
                      <InlineLink href="https://www.goodreads.com/en/book/show/50175330-the-infinite-machine">
                        {t("the-infinite-machine-title")}
                      </InlineLink>{" "}
                      <i>{t("the-infinite-machine-description")}</i>
                    </ListItem>
                    <ListItem>
                      <InlineLink href="https://github.com/ethereumbook/ethereumbook">
                        {t("mastering-ethereum-title")}
                      </InlineLink>{" "}
                      <i>{t("mastering-ethereum-description")} </i>
                    </ListItem>
                    <ListItem>
                      <InlineLink href="https://www.goodreads.com/en/book/show/59892281-proof-of-stake">
                        {t("proof-of-stake-title")}
                      </InlineLink>{" "}
                      <i>{t("proof-of-stake-description")}</i>
                    </ListItem>
                  </UnorderedList>
                  <H3>{t("podcasts-about-ethereum")}</H3>
                  <UnorderedList>
                    <ListItem>
                      <InlineLink href="https://www.youtube.com/@Green_Pill_Podcast">
                        {t("green-pill-title")}
                      </InlineLink>{" "}
                      <i>{t("green-pill-description")}</i>
                    </ListItem>
                    <ListItem>
                      <InlineLink href="https://www.zeroknowledge.fm/">
                        {t("zeroknowledge-title")}
                      </InlineLink>{" "}
                      <i>{t("zeroknowledge-description")}</i>
                    </ListItem>
                    <ListItem>
                      <InlineLink href="https://unchainedpodcast.com/">
                        {t("unchained-title")}
                      </InlineLink>{" "}
                      <i>{t("unchained-description")}</i>
                    </ListItem>
                    <ListItem>
                      <InlineLink href="https://www.youtube.com/@TheDailyGwei/">
                        {t("the-daily-gwei-title")}
                      </InlineLink>{" "}
                      <i>{t("the-daily-gwei-description")}</i>
                    </ListItem>
                    <ListItem>
                      <InlineLink href="https://podcast.banklesshq.com/">
                        {t("bankless-title")}
                      </InlineLink>{" "}
                      <i>{t("bankless-description")}</i>
                    </ListItem>
                  </UnorderedList>
                  <H3>{t("about-ethereum-video-series")}</H3>
                  <UnorderedList>
                    <ListItem>
                      <InlineLink href="https://www.youtube.com/playlist?list=PLqgutSGloqiJyyoL0zvLVFPS-GMD2wKa5">
                        {t("ethereum-basics-title")}
                      </InlineLink>{" "}
                      <i>{t("ethereum-basics-description")}</i>
                    </ListItem>
                  </UnorderedList>
                </Stack>
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

  const t = await getTranslations("page-learn")

  return await getMetadata({
    locale,
    slug: ["learn"],
    title: t("page-learn-meta-title"),
    description: t("hero-subtitle"),
    image: "/images/heroes/learn-hub-hero.png",
  })
}
