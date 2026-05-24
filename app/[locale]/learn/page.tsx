import { Fragment } from "react"
import { getTranslations } from "next-intl/server"

import type { PageParams, ToCItem } from "@/lib/types"
import type { Lang } from "@/lib/types"

import DocLink, { type DocLinkProps } from "@/components/DocLink"
import { HubHero } from "@/components/Hero"
import type { HubHeroProps } from "@/components/Hero/HubHero"
import { Image, type ImageProps } from "@/components/Image"
import { ButtonLink } from "@/components/ui/buttons/Button"
import Callout from "@/components/ui/callout"
import {
  Card,
  CardBanner,
  CardContent,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import InlineLink from "@/components/ui/Link"
import { ListItem, UnorderedList } from "@/components/ui/list"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"

import LearnPageJsonLD from "./page-jsonld"

import { ContentLayout } from "@/layouts/ContentLayout"
import developersEthBlocks from "@/public/images/developers-eth-blocks.png"
import eth from "@/public/images/eth.png"
import financeTransparent from "@/public/images/finance_transparent.png"
import futureTransparent from "@/public/images/future_transparent.png"
import hackathon from "@/public/images/hackathon_transparent.png"
import heroImage from "@/public/images/heroes/learn-hub-hero.png"
import impact from "@/public/images/impact_transparent.png"
import merge from "@/public/images/upgrades/merge.png"
import wallet from "@/public/images/wallet.png"
import whatIsEth from "@/public/images/what-is-ethereum.png"

const AdditionalDocReading = ({
  heading,
  docLinks,
}: {
  heading: string
  docLinks: DocLinkProps[]
}) => (
  <div className="mt-24 space-y-8">
    <h3 className="text-center text-md lg:text-xl">{heading}</h3>
    <div className="flex flex-col gap-2 xl:mx-36">
      {docLinks.map(({ children, ...rest }) => (
        <DocLink key={rest.href} {...rest}>
          {children}
        </DocLink>
      ))}
    </div>
  </div>
)

const LearnCard = ({
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
      <Image
        src={image}
        alt=""
        sizes="(min-width: 1280px) 340px, (min-width: 992px) 440px, (min-width: 640px) calc(50vw - 2.5rem), calc(100vw - 4rem)"
      />
    </CardBanner>
    <CardContent className="p-0">
      <CardTitle variant="bold">{title}</CardTitle>
      <CardParagraph variant="light">{description}</CardParagraph>
    </CardContent>
    <ButtonLink href={href}>{ctaLabel}</ButtonLink>
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
      id: "go-deeper",
      title: t("toc-go-deeper"),
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

  const furtherReading: {
    heading: string
    items: {
      label: string
      href: string
      description: string
    }[]
  }[] = [
    {
      heading: t("books-about-ethereum"),
      items: [
        {
          label: t("cryptopians-title"),
          href: "https://www.goodreads.com/book/show/57356067-the-cryptopians",
          description: t("cryptopians-description"),
        },
        {
          label: t("out-of-the-ether-title"),
          href: "https://www.goodreads.com/book/show/55360267-out-of-the-ether",
          description: t("out-of-the-ether-description"),
        },
        {
          label: t("the-infinite-machine-title"),
          href: "https://www.goodreads.com/en/book/show/50175330-the-infinite-machine",
          description: t("the-infinite-machine-description"),
        },
        {
          label: t("mastering-ethereum-title"),
          href: "https://github.com/ethereumbook/ethereumbook",
          description: t("mastering-ethereum-description"),
        },
        {
          label: t("proof-of-stake-title"),
          href: "https://www.goodreads.com/en/book/show/59892281-proof-of-stake",
          description: t("proof-of-stake-description"),
        },
      ],
    },
    {
      heading: t("podcasts-about-ethereum"),
      items: [
        {
          label: t("green-pill-title"),
          href: "https://www.youtube.com/@Green_Pill_Podcast",
          description: t("green-pill-description"),
        },
        {
          label: t("zeroknowledge-title"),
          href: "https://www.zeroknowledge.fm/",
          description: t("zeroknowledge-description"),
        },
        {
          label: t("unchained-title"),
          href: "https://unchainedpodcast.com/",
          description: t("unchained-description"),
        },
        {
          label: t("the-daily-gwei-title"),
          href: "https://www.youtube.com/@TheDailyGwei/",
          description: t("the-daily-gwei-description"),
        },
        {
          label: t("bankless-title"),
          href: "https://podcast.banklesshq.com/",
          description: t("bankless-description"),
        },
      ],
    },
    {
      heading: t("about-ethereum-video-series"),
      items: [
        {
          label: t("ethereum-basics-title"),
          href: "https://www.youtube.com/playlist?list=PLqgutSGloqiJyyoL0zvLVFPS-GMD2wKa5",
          description: t("ethereum-basics-description"),
        },
      ],
    },
  ]

  return (
    <>
      <LearnPageJsonLD locale={locale} contributors={contributors} />

      <ContentLayout
        tocItems={tocData}
        contributors={contributors}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
        heroSection={<HubHero {...heroContent} />}
        showDropdown={false}
      >
        <div className="space-y-24 max-lg:pt-10">
          {/* Section 1: Understand Ethereum */}
          <Section id={tocItems[0].id} className="space-y-16">
            <div className="space-y-8">
              <h2>{tocItems[0].title}</h2>
              <p>
                {t("what-is-crypto-2-before-link")}{" "}
                <InlineLink href="/">{tCommon("ethereum")}</InlineLink>{" "}
                {t("what-is-crypto-2-after-link")}
              </p>

              <div className="grid grid-cols-fill-4 gap-4">
                <LearnCard
                  href="/what-is-ethereum/"
                  image={whatIsEth}
                  title={t("what-is-ethereum-card-title")}
                  description={t("understand-ethereum-card-description")}
                  ctaLabel={t("understand-ethereum-cta")}
                />
                <LearnCard
                  href="/what-is-ether/"
                  image={eth}
                  title={t("what-is-eth-card-title")}
                  description={t("what-is-eth-description")}
                  ctaLabel={t("what-is-eth-cta")}
                />
                <LearnCard
                  href="/ethereum-vs-bitcoin/"
                  image={financeTransparent}
                  title={t("ethereum-vs-bitcoin-card-title")}
                  description={t("ethereum-vs-bitcoin-card-description")}
                  ctaLabel={t("ethereum-vs-bitcoin-cta")}
                />
              </div>

              <h3>{t("keep-learning-title")}</h3>
              <div className="grid grid-cols-fill-4 gap-4">
                <LearnCard
                  href="/what-is-the-ethereum-network/"
                  image={developersEthBlocks}
                  title={t("ethereum-network-card-title")}
                  description={t("ethereum-network-card-description")}
                  ctaLabel={t("ethereum-network-cta")}
                />
                <LearnCard
                  href="/web3/"
                  image={impact}
                  title={t("what-is-web3-card-title")}
                  description={t("what-is-web3-card-description")}
                  ctaLabel={t("what-is-web3-cta")}
                />
                <LearnCard
                  href="/smart-contracts/"
                  image={hackathon}
                  title={t("smart-contracts-card-title")}
                  description={t("smart-contracts-card-description")}
                  ctaLabel={t("smart-contracts-cta")}
                />
              </div>

              <AdditionalDocReading
                heading={t("additional-reading-more-on-ethereum-basics")}
                docLinks={[
                  { href: "/guides/", children: t("guides-hub-desc") },
                  { href: "/quizzes/", children: t("quiz-hub-desc") },
                  {
                    href: "/ethereum-history-founder-and-ownership/",
                    children: t("more-on-ethereum-history"),
                  },
                  {
                    href: "https://www.youtube.com/watch?v=UihMqcj-cqc",
                    children: t(
                      "additional-reading-ethereum-in-thirty-minutes"
                    ),
                    isExternal: true,
                  },
                ]}
              />
            </div>
          </Section>

          {/* Section 2: How to use Ethereum */}
          <Section id={tocItems[1].id} className="space-y-16">
            <div className="space-y-8">
              <h2>{tocItems[1].title}</h2>
              <p>{t("how-do-i-use-ethereum-1")}</p>

              <div className="grid grid-cols-fill-4 gap-4">
                <LearnCard
                  href="/wallets/"
                  image={wallet}
                  title={t("what-is-a-wallet-card-title")}
                  description={t("wallets-card-description")}
                  ctaLabel={t("wallets-cta")}
                />
                <LearnCard
                  href="/wallets/find-wallet/"
                  image={futureTransparent}
                  title={t("find-a-wallet-card-title")}
                  description={t("find-a-wallet-card-description")}
                  ctaLabel={t("find-a-wallet-button")}
                />
                <LearnCard
                  href="/get-eth/"
                  image={eth}
                  title={t("get-eth-card-title")}
                  description={t("get-eth-card-description")}
                  ctaLabel={t("get-eth-cta")}
                />
              </div>

              <AdditionalDocReading
                heading={t("additional-reading-more-on-using-ethereum")}
                docLinks={[
                  {
                    href: "/guides/how-to-create-an-ethereum-account/",
                    children: t(
                      "additional-reading-how-to-create-an-ethereum-account"
                    ),
                  },
                  {
                    href: "/guides/how-to-use-a-wallet/",
                    children: t("additional-reading-how-to-use-a-wallet"),
                  },
                ]}
              />
            </div>
          </Section>

          {/* Section 3: What is Ethereum used for - banner only */}
          <Section id={tocItems[2].id} className="space-y-16">
            <div className="space-y-8">
              <h2>{tocItems[2].title}</h2>
              <p>{t("what-is-ethereum-used-for-1")}</p>

              <Callout
                id="explore-use-cases"
                title={t("explore-use-cases-card-title")}
                image={developersEthBlocks}
                description={t("explore-use-cases-card-description")}
                variant="small"
                className="[&_img]:max-lg:-mt-12"
              >
                <ButtonLink href="/use-cases/">
                  {t("explore-use-cases-cta")}
                </ButtonLink>
              </Callout>
            </div>
          </Section>

          {/* Section 4: Go deeper */}
          <Section id={tocItems[3].id} className="space-y-16">
            <div className="space-y-8">
              <h2>{tocItems[3].title}</h2>
              <p>{t("go-deeper-description")}</p>
            </div>

            <div className="grid grid-cols-fill-4 gap-4">
              <LearnCard
                href="/roadmap/"
                image={merge}
                title={t("ethereum-upgrades-card-title")}
                description={t("ethereum-upgrades-card-description")}
                ctaLabel={t("ethereum-upgrades-card-button")}
              />
              <LearnCard
                href="/whitepaper/"
                image={financeTransparent}
                title={t("ethereum-whitepaper-card-title")}
                description={t("ethereum-whitepaper-card-description")}
                ctaLabel={t("ethereum-whitepaper-card-button")}
              />
              <LearnCard
                href="/privacy/"
                image={hackathon}
                title={t("privacy-card-title")}
                description={t("privacy-card-description")}
                ctaLabel={t("privacy-card-button")}
              />
            </div>

            <AdditionalDocReading
              heading={t("more-on-ethereum-protocol-title")}
              docLinks={[
                {
                  href: "/energy-consumption/",
                  children: t("energy-consumption-card-title"),
                },
                {
                  href: "/developers/",
                  children: t(
                    "more-on-ethereum-protocol-ethereum-for-developers"
                  ),
                },
                {
                  href: "/developers/docs/consensus-mechanisms/",
                  children: t("more-on-ethereum-protocol-consensus"),
                },
                {
                  href: "/developers/docs/evm/",
                  children: t("more-on-ethereum-protocol-evm"),
                },
                {
                  href: "/developers/docs/nodes-and-clients/",
                  children: t("more-on-ethereum-protocol-nodes-and-clients"),
                },
              ]}
            />
          </Section>

          {/* Section 5: Books and podcasts */}
          <Section id={tocItems[4].id} className="space-y-16">
            <div className="space-y-8">
              <h2>{tocItems[4].title}</h2>

              {furtherReading.map(({ heading, items }) => (
                <Fragment key={heading}>
                  <h3>{heading}</h3>
                  <UnorderedList>
                    {items.map(({ label, href, description }) => (
                      <ListItem key={label}>
                        <InlineLink href={href}>{label}</InlineLink> -{" "}
                        <em>{description}</em>
                      </ListItem>
                    ))}
                  </UnorderedList>
                </Fragment>
              ))}
            </div>
          </Section>
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

  const t = await getTranslations("page-learn")

  return await getMetadata({
    locale,
    slug: ["learn"],
    title: t("page-learn-meta-title"),
    description: t("hero-subtitle"),
    image: "/images/heroes/learn-hub-hero.png",
  })
}
