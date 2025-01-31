import { GetStaticProps } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import type { HTMLAttributes, ReactNode } from "react"

import type { BasePageProps, ChildOnlyProp, Lang, ToCItem } from "@/lib/types"

import OriginalCard, {
  type CardProps as OriginalCardProps,
} from "@/components/Card"
import DocLink from "@/components/DocLink"
import FeedbackCard from "@/components/FeedbackCard"
import { HubHero } from "@/components/Hero"
import type { HubHeroProps } from "@/components/Hero/HubHero"
import { type ImageProps, TwImage } from "@/components/Image"
import LeftNavBar from "@/components/LeftNavBar"
import MainArticle from "@/components/MainArticle"
import { ContentContainer } from "@/components/MdComponents"
import PageMetadata from "@/components/PageMetadata"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Center, Flex, Stack } from "@/components/ui/flex"
import InlineLink from "@/components/ui/Link"
import { ListItem, UnorderedList } from "@/components/ui/list"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import developersEthBlocks from "@/public/images/developers-eth-blocks.png"
import dogeComputer from "@/public/images/doge-computer.png"
import enterprise from "@/public/images/enterprise-eth.png"
import eth from "@/public/images/eth.png"
import financeTransparent from "@/public/images/finance_transparent.png"
import futureTransparent from "@/public/images/future_transparent.png"
import hackathon from "@/public/images/hackathon_transparent.png"
import heroImage from "@/public/images/heroes/learn-hub-hero.png"
import impact from "@/public/images/impact_transparent.png"
import infrastructureTransparent from "@/public/images/infrastructure_transparent.png"
import Layer2LearnHero from "@/public/images/layer-2/learn-hero.png"
import ethereumInside from "@/public/images/run-a-node/ethereum-inside.png"
import stablecoins from "@/public/images/stablecoins/hero.png"
import merge from "@/public/images/upgrades/merge.png"
import newRings from "@/public/images/upgrades/newrings.png"
import rhino from "@/public/images/upgrades/upgrade_rhino.png"
import dao from "@/public/images/use-cases/dao-2.png"
import wallet from "@/public/images/wallet.png"
import whatIsEth from "@/public/images/what-is-ethereum.png"

// TODO: Migrate the original Card component before updating this
const Card = ({ children, ...props }: OriginalCardProps) => (
  <OriginalCard className="justify-between [&_h3]:mt-0" {...props}>
    {children}
  </OriginalCard>
)

const CardImage = ({ children }: ChildOnlyProp) => (
  <Center className="mb-4">{children}</Center>
)

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

const CardGrid = ({ children }: ChildOnlyProp) => (
  <div className="grid grid-cols-[repeat(auto-fill,_minmax(min(100%,_280px),_1fr))] gap-8">
    {children}
  </div>
)

const H3 = ({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className="text-xl md:text-2xl" {...props}>
    {children}
  </h3>
)

const ImageHeight200 = ({ src, alt }: ImageProps) => (
  <TwImage className="h-[200px] w-auto" src={src} alt={alt} />
)

export const getStaticProps = (async ({ locale }) => {
  const requiredNamespaces = getRequiredNamespacesForPage("/learn")

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      contentNotTranslated,
      lastDeployLocaleTimestamp,
    },
  }
}) satisfies GetStaticProps<BasePageProps>

const LearnPage = () => {
  const { t } = useTranslation("page-learn")

  const tocItems = [
    {
      id: "what-is-crypto-ethereum",
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
      id: "strengthen-the-ethereum-network",
      title: t("toc-strengthen-the-ethereum-network"),
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
    title: t("common:learn-hub"),
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
    <div className="relative w-full">
      <PageMetadata
        title={t("page-learn-meta-title")}
        description={t("hero-subtitle")}
        image="/images/heroes/learn-hub-hero.png"
      />

      <HubHero {...heroContent} />

      <Flex
        className="mx-auto mb-16 w-full flex-col justify-between pt-10 lg:flex-row lg:pt-16"
        asChild
      >
        <MainArticle>
          <LeftNavBar
            tocItems={tocData}
            // TODO: Remove `!` flag once this component is migrated to ShadCN
            className="max-lg:!hidden"
          />

          <ContentContainer id="content">
            <Section
              headingId={tocItems[0].id}
              headingTitle={tocItems[0].title}
              description={t("what-is-crypto-2")}
            >
              <CardGrid>
                <Card
                  title={t("what-is-ethereum-card-title")}
                  description={t("what-is-ethereum-card-description")}
                >
                  <>
                    <CardImage>
                      <ImageHeight200
                        src={whatIsEth}
                        alt={t("what-is-ethereum-card-image-alt")}
                      />
                    </CardImage>
                    <ButtonLink href="/what-is-ethereum/">
                      {t("what-is-ethereum-card-title")}
                    </ButtonLink>
                  </>
                </Card>
                <Card
                  title={t("what-is-eth-card-title")}
                  description={t("what-is-eth-description")}
                >
                  <>
                    <CardImage>
                      <ImageHeight200 src={eth} alt="" />
                    </CardImage>
                    <ButtonLink href="/eth/">
                      {t("what-is-eth-card-title")}
                    </ButtonLink>
                  </>
                </Card>
                <Card
                  title={t("what-is-web3-card-title")}
                  description={t("what-is-web3-card-description")}
                >
                  <>
                    <CardImage>
                      <ImageHeight200 src={impact} alt="" />
                    </CardImage>
                    <ButtonLink href="/web3/">
                      {t("what-is-web3-card-title")}
                    </ButtonLink>
                  </>
                </Card>
              </CardGrid>

              <AdditionalDocReading
                headingText={t("additional-reading-more-on-ethereum-basics")}
                docLinks={[
                  { href: "/guides/", label: t("guides-hub-desc") },
                  { href: "/quizzes/", label: t("quiz-hub-desc") },
                  {
                    href: "/smart-contracts/",
                    label: t("additional-reading-what-are-smart-contracts"),
                  },
                  {
                    href: "https://www.youtube.com/watch?v=UihMqcj-cqc",
                    label: t("additional-reading-ethereum-in-thirty-minutes"),
                    isExternal: true,
                  },
                ]}
              />
            </Section>

            <Section
              headingId={tocItems[1].id}
              headingTitle={tocItems[1].title}
              description={t("how-do-i-use-ethereum-1")}
            >
              <CardGrid>
                <Card
                  title={t("what-is-a-wallet-card-title")}
                  description={t("what-is-a-wallet-card-description")}
                >
                  <>
                    <CardImage>
                      <ImageHeight200
                        src={wallet}
                        alt={t("what-is-a-wallet-card-alt")}
                      />
                    </CardImage>
                    <ButtonLink href="/wallets/">
                      {t("what-is-a-wallet-card-title")}
                    </ButtonLink>
                  </>
                </Card>
                <Card
                  title={t("find-a-wallet-card-title")}
                  description={t("find-a-wallet-card-description")}
                >
                  <>
                    <CardImage>
                      <ImageHeight200 src={futureTransparent} alt="" />
                    </CardImage>
                    <ButtonLink href="/wallets/find-wallet/">
                      {t("find-a-wallet-button")}
                    </ButtonLink>
                  </>
                </Card>
                <Card
                  title={t("ethereum-networks-card-title")}
                  description={t("ethereum-networks-card-description")}
                >
                  <>
                    <CardImage>
                      <ImageHeight200 src={Layer2LearnHero} alt="" />
                    </CardImage>
                    <ButtonLink href="/layer-2/networks">
                      {t("ethereum-networks-card-button")}
                    </ButtonLink>
                  </>
                </Card>
              </CardGrid>

              <Flex className="my-12 flex-col overflow-hidden rounded-[10px] bg-main-gradient lg:flex-row">
                <Stack className="gap-8 p-12">
                  <H3>{t("things-to-consider-banner-title")}</H3>
                  <UnorderedList className="mb-0">
                    <ListItem>{t("things-to-consider-banner-1")}</ListItem>
                    <ListItem>
                      {t("things-to-consider-banner-2")}{" "}
                      <InlineLink href="/layer-2/networks">
                        {t("things-to-consider-banner-layer-2")}
                      </InlineLink>
                      .
                    </ListItem>
                  </UnorderedList>
                </Stack>
                <div className="self-end">
                  <TwImage className="max-w-[265px]" src={newRings} alt="" />
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
                  { href: "/layer-2/", label: t("additional-reading-layer-2") },
                  { href: "/get-eth/", label: t("additional-reading-get-eth") },
                ]}
              />
            </Section>

            <Section
              headingId={tocItems[2].id}
              headingTitle={tocItems[2].title}
              description={t("what-is-ethereum-used-for-1")}
            >
              <CardGrid>
                <Card
                  title={t("defi-card-title")}
                  description={t("defi-card-description")}
                >
                  <>
                    <CardImage>
                      <ImageHeight200 src={financeTransparent} alt="" />
                    </CardImage>
                    <ButtonLink href="/defi/">
                      {t("defi-card-button")}
                    </ButtonLink>
                  </>
                </Card>
                <Card
                  title={t("stablecoins-card-title")}
                  description={t("stablecoins-card-description")}
                >
                  <>
                    <CardImage>
                      <ImageHeight200 src={stablecoins} alt="" />
                    </CardImage>
                    <ButtonLink href="/stablecoins/">
                      {t("stablecoins-card-button")}
                    </ButtonLink>
                  </>
                </Card>
                <Card
                  title={t("nft-card-title")}
                  description={t("nft-card-description")}
                >
                  <>
                    <CardImage>
                      <ImageHeight200 src={infrastructureTransparent} alt="" />
                    </CardImage>
                    <ButtonLink href="/nft/">{t("nft-card-button")}</ButtonLink>
                  </>
                </Card>
                <Card
                  title={t("dao-card-title")}
                  description={t("dao-card-description")}
                >
                  <>
                    <CardImage>
                      <ImageHeight200 src={dao} alt="" />
                    </CardImage>
                    <ButtonLink href="/dao/">{t("dao-card-button")}</ButtonLink>
                  </>
                </Card>
                <Card
                  title={t("dapp-card-title")}
                  description={t("dapp-card-description")}
                >
                  <>
                    <CardImage>
                      <ImageHeight200 src={developersEthBlocks} alt="" />
                    </CardImage>
                    <ButtonLink href="/dapps/">
                      {t("dapp-card-button")}
                    </ButtonLink>
                  </>
                </Card>
                <Card
                  className="justify-start bg-gradient-main"
                  title={t("emerging-use-cases-title")}
                  description={t("emerging-use-cases-description")}
                >
                  <Stack asChild className="flex-1 justify-center gap-0">
                    <UnorderedList className="mb-0">
                      <ListItem>
                        <InlineLink href="/decentralized-identity/">
                          {t("common:decentralized-identity")}
                        </InlineLink>
                      </ListItem>
                      <ListItem>
                        <InlineLink href="/social-networks/">
                          {t("common:decentralized-social-networks")}
                        </InlineLink>
                      </ListItem>
                      <ListItem>
                        <InlineLink href="/desci/">
                          {t("common:decentralized-science")}
                        </InlineLink>
                      </ListItem>
                      <ListItem>
                        <InlineLink href="https://decrypt.co/resources/what-are-play-to-earn-games-how-players-are-making-a-living-with-nfts">
                          {t("play-to-earn")}
                        </InlineLink>
                      </ListItem>
                      <ListItem>
                        <InlineLink href="https://woodstockfund.medium.com/quadratic-funding-better-way-to-fund-public-goods-76f1679b2ba2">
                          {t("fundraising-through-quadratic-funding")}
                        </InlineLink>
                      </ListItem>
                      <li>
                        <InlineLink href="https://hbr.org/2022/01/how-walmart-canada-uses-blockchain-to-solve-supply-chain-challenges">
                          {t("supply-chain-management")}
                        </InlineLink>
                      </li>
                    </UnorderedList>
                  </Stack>
                </Card>
              </CardGrid>
            </Section>

            <Section
              headingId={tocItems[3].id}
              headingTitle={tocItems[3].title}
              description={t("strengthening-the-ethereum-network-description")}
            >
              <CardGrid>
                <Card
                  title={t("staking-ethereum-card-title")}
                  description={t("staking-ethereum-card-description")}
                >
                  <>
                    <CardImage>
                      <ImageHeight200 src={rhino} alt="" />
                    </CardImage>
                    <ButtonLink href="/staking/">
                      {t("staking-ethereum-card-button")}
                    </ButtonLink>
                  </>
                </Card>
                <Card
                  title={t("run-a-node-card-title")}
                  description={t("run-a-node-card-description")}
                >
                  <>
                    <CardImage>
                      <ImageHeight200 src={ethereumInside} alt="" />
                    </CardImage>
                    <ButtonLink href="/run-a-node/">
                      {t("run-a-node-card-title")}
                    </ButtonLink>
                  </>
                </Card>
              </CardGrid>
            </Section>

            <Section
              headingId={tocItems[4].id}
              headingTitle={tocItems[4].title}
              description={t("learn-about-ethereum-protocol-description")}
            >
              <CardGrid>
                <Card
                  title={t("energy-consumption-card-title")}
                  description={t("energy-consumption-card-description")}
                >
                  <>
                    <CardImage>
                      <ImageHeight200 src={hackathon} alt="" />
                    </CardImage>
                    <ButtonLink href="/energy-consumption/">
                      {t("energy-consumption-card-button")}
                    </ButtonLink>
                  </>
                </Card>
                <Card
                  title={t("ethereum-upgrades-card-title")}
                  description={t("ethereum-upgrades-card-description")}
                >
                  <>
                    <CardImage>
                      <ImageHeight200 src={merge} alt="" />
                    </CardImage>
                    <ButtonLink href="/roadmap/">
                      {t("ethereum-upgrades-card-button")}
                    </ButtonLink>
                  </>
                </Card>
                <Card
                  title={t("ethereum-whitepaper-card-title")}
                  description={t("ethereum-whitepaper-card-description")}
                >
                  <>
                    <CardImage>
                      <ImageHeight200 src={financeTransparent} alt="" />
                    </CardImage>
                    <ButtonLink href="/whitepaper/">
                      {t("ethereum-whitepaper-card-button")}
                    </ButtonLink>
                  </>
                </Card>
              </CardGrid>

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
                    href: "/developers/docs/consensus-mechanisms",
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

            <Section
              headingId={tocItems[5].id}
              headingTitle={tocItems[5].title}
              description={t("ethereum-community-description")}
            >
              <CardGrid>
                <Card
                  title={t("community-hub-card-title")}
                  description={t("community-hub-card-description")}
                >
                  <>
                    <CardImage>
                      <ImageHeight200
                        src={enterprise}
                        alt={t("community-hub-card-alt")}
                      />
                    </CardImage>
                    <ButtonLink href="/community/">
                      {t("community-hub-card-button")}
                    </ButtonLink>
                  </>
                </Card>
                <Card
                  title={t("get-involved-card-title")}
                  description={t("get-involved-card-description")}
                >
                  <>
                    <CardImage>
                      <ImageHeight200 src={dogeComputer} alt="" />
                    </CardImage>
                    <ButtonLink href="/community/get-involved/">
                      {t("get-involved-card-title")}
                    </ButtonLink>
                  </>
                </Card>
                <Card
                  title={t("online-communities-card-title")}
                  description={t("online-communities-card-description")}
                >
                  <>
                    <CardImage>
                      <ImageHeight200 src={impact} alt="" />
                    </CardImage>
                    <ButtonLink href="/community/online/">
                      {t("online-communities-card-button")}
                    </ButtonLink>
                  </>
                </Card>
              </CardGrid>
            </Section>

            <Section
              headingId={tocItems[6].id}
              headingTitle={tocItems[6].title}
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
                    <InlineLink href="http://podcast.banklesshq.com/">
                      {t("bankless-title")}
                    </InlineLink>{" "}
                    <i>{t("bankless-description")}</i>
                  </ListItem>
                </UnorderedList>
              </Stack>
            </Section>

            <FeedbackCard />
          </ContentContainer>
        </MainArticle>
      </Flex>
    </div>
  )
}

export default LearnPage
