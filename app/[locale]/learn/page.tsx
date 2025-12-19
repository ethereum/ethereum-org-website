import { HTMLAttributes, ReactNode } from "react"
import { getTranslations } from "next-intl/server"

import type { ChildOnlyProp, PageParams, ToCItem } from "@/lib/types"
import type { CommitHistory, Lang } from "@/lib/types"

import OriginalCard, {
  type CardProps as OriginalCardProps,
} from "@/components/Card"
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
import { Center, Flex, Stack } from "@/components/ui/flex"
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
  <Image className="h-[200px] w-auto" src={src} alt={alt} sizes="250px" />
)

export default async function Page({ params }: { params: PageParams }) {
  const { locale } = params
  const localeStr = locale as string
  const t = await getTranslations({ locale, namespace: "page-learn" })
  const tCommon = await getTranslations({ locale, namespace: "common" })

  const commitHistoryCache: CommitHistory = {}
  const { contributors, lastEditLocaleTimestamp } =
    await getAppPageContributorInfo("learn", locale as Lang, commitHistoryCache)

  const tocItems = [
    {
      id: "what-is-ai-development",
      title: t("toc-what-is-crypto-ethereum"),
    },
    {
      id: "how-to-build-apps",
      title:
        localeStr === "sv"
          ? "Hur bygger jag moderna appar?"
          : t("toc-how-do-i-use-ethereum"),
    },
    {
      id: "frameworks-and-tools",
      title:
        localeStr === "sv"
          ? "Ramverk och utvecklingsverktyg"
          : t("toc-what-is-ethereum-used-for"),
    },
    {
      id: "web3-and-blockchain",
      title:
        localeStr === "sv"
          ? "Web3 och Blockchain"
          : t("toc-strengthen-the-ethereum-network"),
    },
    {
      id: "learning-resources",
      title:
        localeStr === "sv"
          ? "Inlärningsresurser"
          : t("toc-learn-about-the-ethereum-protocol"),
    },
    {
      id: "developer-community",
      title:
        localeStr === "sv"
          ? "Utvecklargemenskap"
          : t("toc-learn-about-the-ethereum-community"),
    },
    {
      id: "books-and-podcasts",
      title:
        localeStr === "sv"
          ? "Böcker och podcasts"
          : t("toc-books-and-podcasts"),
    },
  ]
  const tocData: ToCItem[] = tocItems.map(({ id, title }) => ({
    title,
    url: "#" + id,
  }))

  const heroContent: HubHeroProps = {
    title: localeStr === "sv" ? "AI & App-utveckling" : tCommon("learn-hub"),
    header:
      localeStr === "sv"
        ? "Lär dig bygga moderna applikationer"
        : t("hero-header"),
    description:
      localeStr === "sv"
        ? "Din pedagogiska guide till världen av AI och modern app-utveckling. Lär dig hur man bygger intelligenta applikationer med moderna ramverk och verktyg."
        : t("hero-subtitle"),
    heroImg: heroImage,
    buttons: [
      {
        content:
          localeStr === "sv" ? "Kom igång" : t("hero-button-lets-get-started"),
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
              <Section
                headingId={tocItems[0].id}
                headingTitle={tocItems[0].title}
                description={
                  locale === "sv"
                    ? "AI-utveckling kombinerar maskininlärning, stora språkmodeller (LLM) och moderna ramverk för att bygga intelligenta applikationer. Börja här för att förstå grunderna."
                    : t("what-is-crypto-2")
                }
              >
                <CardGrid>
                  <Card
                    title={
                      locale === "sv"
                        ? "Vad är AI-agenter?"
                        : t("what-is-ethereum-card-title")
                    }
                    description={
                      locale === "sv"
                        ? "AI-agenter är autonoma program som kan fatta beslut, lära sig från data och utföra komplexa uppgifter. Lär dig grunderna."
                        : t("what-is-ethereum-card-description")
                    }
                  >
                    <>
                      <CardImage>
                        <ImageHeight200
                          src={whatIsEth}
                          alt={
                            locale === "sv"
                              ? "AI-agenter illustration"
                              : t("what-is-ethereum-card-image-alt")
                          }
                        />
                      </CardImage>
                      <ButtonLink href="/ai-agents/">
                        {locale === "sv"
                          ? "Läs om AI-agenter"
                          : t("what-is-ethereum-card-title")}
                      </ButtonLink>
                    </>
                  </Card>
                  <Card
                    title={
                      locale === "sv"
                        ? "Moderna ramverk"
                        : t("what-is-eth-card-title")
                    }
                    description={
                      locale === "sv"
                        ? "React, Next.js, FastAPI, och andra moderna ramverk som används för att bygga kraftfulla applikationer."
                        : t("what-is-eth-description")
                    }
                  >
                    <>
                      <CardImage>
                        <ImageHeight200 src={eth} alt="" />
                      </CardImage>
                      <ButtonLink href="/developers/">
                        {locale === "sv"
                          ? "Utforska ramverk"
                          : t("what-is-eth-card-title")}
                      </ButtonLink>
                    </>
                  </Card>
                  <Card
                    title={
                      locale === "sv"
                        ? "Vad är Web3?"
                        : t("what-is-web3-card-title")
                    }
                    description={
                      locale === "sv"
                        ? "Web3 kombinerar blockchain-teknologi med moderna appar för decentraliserade lösningar."
                        : t("what-is-web3-card-description")
                    }
                  >
                    <>
                      <CardImage>
                        <ImageHeight200 src={impact} alt="" />
                      </CardImage>
                      <ButtonLink href="/web3/">
                        {locale === "sv"
                          ? "Läs om Web3"
                          : t("what-is-web3-card-title")}
                      </ButtonLink>
                    </>
                  </Card>
                </CardGrid>

                <AdditionalDocReading
                  headingText={
                    locale === "sv"
                      ? "Mer om grunderna"
                      : t("additional-reading-more-on-ethereum-basics")
                  }
                  docLinks={[
                    {
                      href: "/guides/",
                      label:
                        locale === "sv"
                          ? "Guider: steg-för-steg instruktioner"
                          : t("guides-hub-desc"),
                    },
                    {
                      href: "/quizzes/",
                      label:
                        locale === "sv"
                          ? "Quiz: testa dina kunskaper"
                          : t("quiz-hub-desc"),
                    },
                    {
                      href: "/smart-contracts/",
                      label:
                        locale === "sv"
                          ? "Vad är smart contracts?"
                          : t("additional-reading-what-are-smart-contracts"),
                    },
                    {
                      href: "https://www.youtube.com/watch?v=UihMqcj-cqc",
                      label:
                        locale === "sv"
                          ? "AI och moderna appar på 30 minuter"
                          : t("additional-reading-ethereum-in-thirty-minutes"),
                      isExternal: true,
                    },
                  ]}
                />
              </Section>

              <Section
                headingId={tocItems[1].id}
                headingTitle={tocItems[1].title}
                description={
                  locale === "sv"
                    ? "Att bygga moderna appar innebär att välja rätt verktyg och ramverk. Här är vad du behöver för att komma igång."
                    : t("how-do-i-use-ethereum-1")
                }
              >
                <CardGrid>
                  <Card
                    title={
                      locale === "sv"
                        ? "Frontend-ramverk"
                        : t("what-is-a-wallet-card-title")
                    }
                    description={
                      locale === "sv"
                        ? "React, Next.js, Vue - moderna ramverk för att bygga användarinterface och single-page applications."
                        : t("what-is-a-wallet-card-description")
                    }
                  >
                    <>
                      <CardImage>
                        <ImageHeight200
                          src={wallet}
                          alt={
                            locale === "sv"
                              ? "Frontend ramverk"
                              : t("what-is-a-wallet-card-alt")
                          }
                        />
                      </CardImage>
                      <ButtonLink href="/developers/">
                        {locale === "sv"
                          ? "Lär dig frontend"
                          : t("what-is-a-wallet-card-title")}
                      </ButtonLink>
                    </>
                  </Card>
                  <Card
                    title={
                      locale === "sv"
                        ? "Backend-utveckling"
                        : t("find-a-wallet-card-title")
                    }
                    description={
                      locale === "sv"
                        ? "Node.js, FastAPI, Django - kraftfulla backend-ramverk för API:er och datahantering."
                        : t("find-a-wallet-card-description")
                    }
                  >
                    <>
                      <CardImage>
                        <ImageHeight200 src={futureTransparent} alt="" />
                      </CardImage>
                      <ButtonLink href="/developers/docs/">
                        {locale === "sv"
                          ? "Backend-guider"
                          : t("find-a-wallet-button")}
                      </ButtonLink>
                    </>
                  </Card>
                  <Card
                    title={
                      locale === "sv"
                        ? "Databaser"
                        : t("ethereum-networks-card-title")
                    }
                    description={
                      locale === "sv"
                        ? "PostgreSQL, MongoDB, Redis - välj rätt databas för din applikation."
                        : t("ethereum-networks-card-description")
                    }
                  >
                    <>
                      <CardImage>
                        <ImageHeight200 src={Layer2LearnHero} alt="" />
                      </CardImage>
                      <ButtonLink href="/developers/docs/">
                        {locale === "sv"
                          ? "Lär dig databaser"
                          : t("ethereum-networks-card-button")}
                      </ButtonLink>
                    </>
                  </Card>
                </CardGrid>

                <Flex className="my-12 flex-col overflow-hidden rounded-[10px] bg-main-gradient lg:flex-row">
                  <Stack className="gap-8 p-12">
                    <H3>
                      {locale === "sv"
                        ? "Viktiga saker att tänka på"
                        : t("things-to-consider-banner-title")}
                    </H3>
                    <UnorderedList className="mb-0">
                      <ListItem>
                        {locale === "sv"
                          ? "Välj ramverk baserat på ditt projekts behov - React för UI, Next.js för full-stack, FastAPI för snabba API:er."
                          : t("things-to-consider-banner-1")}
                      </ListItem>
                      <ListItem>
                        {locale === "sv"
                          ? "Börja med grunderna och bygg stegvis. Använd "
                          : t("things-to-consider-banner-2")}{" "}
                        <InlineLink href="/developers/">
                          {locale === "sv"
                            ? "våra guider"
                            : t("things-to-consider-banner-layer-2")}
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
                  headingText={
                    locale === "sv"
                      ? "Mer om att bygga appar"
                      : t("additional-reading-more-on-using-ethereum")
                  }
                  docLinks={[
                    {
                      href: "/developers/docs/",
                      label:
                        locale === "sv"
                          ? "Utvecklardokumentation"
                          : t(
                              "additional-reading-how-to-create-an-ethereum-account"
                            ),
                    },
                    {
                      href: "/developers/tutorials/",
                      label:
                        locale === "sv"
                          ? "Handledningar och tutorials"
                          : t("additional-reading-how-to-use-a-wallet"),
                    },
                    {
                      href: "/developers/learning-tools/",
                      label:
                        locale === "sv"
                          ? "Lär genom kodning"
                          : t("additional-reading-layer-2"),
                    },
                    {
                      href: "/developers/",
                      label:
                        locale === "sv"
                          ? "Utvecklarresurser"
                          : t("additional-reading-get-eth"),
                    },
                  ]}
                />
              </Section>

              <Section
                headingId={tocItems[2].id}
                headingTitle={tocItems[2].title}
                description={
                  locale === "sv"
                    ? "Moderna utvecklingsverktyg och teknologier som driver nästa generation av applikationer."
                    : t("what-is-ethereum-used-for-1")
                }
              >
                <CardGrid>
                  <Card
                    title={
                      locale === "sv"
                        ? "AI och maskininlärning"
                        : t("defi-card-title")
                    }
                    description={
                      locale === "sv"
                        ? "LangChain, OpenAI, vector databases - bygg intelligenta AI-drivna applikationer."
                        : t("defi-card-description")
                    }
                  >
                    <>
                      <CardImage>
                        <ImageHeight200 src={financeTransparent} alt="" />
                      </CardImage>
                      <ButtonLink href="/developers/">
                        {locale === "sv"
                          ? "Utforska AI-verktyg"
                          : t("defi-card-button")}
                      </ButtonLink>
                    </>
                  </Card>
                  <Card
                    title={
                      locale === "sv"
                        ? "Utvecklingsverktyg"
                        : t("stablecoins-card-title")
                    }
                    description={
                      locale === "sv"
                        ? "Git, Docker, VS Code, CI/CD - moderna verktyg för effektiv utveckling och deployment."
                        : t("stablecoins-card-description")
                    }
                  >
                    <>
                      <CardImage>
                        <ImageHeight200 src={stablecoins} alt="" />
                      </CardImage>
                      <ButtonLink href="/developers/local-environment/">
                        {locale === "sv"
                          ? "Konfigurera miljö"
                          : t("stablecoins-card-button")}
                      </ButtonLink>
                    </>
                  </Card>
                  <Card
                    title={
                      locale === "sv"
                        ? "Testing och kvalitet"
                        : t("nft-card-title")
                    }
                    description={
                      locale === "sv"
                        ? "Jest, Pytest, end-to-end testing - säkerställ kodkvalitet och tillförlitlighet."
                        : t("nft-card-description")
                    }
                  >
                    <>
                      <CardImage>
                        <ImageHeight200
                          src={infrastructureTransparent}
                          alt=""
                        />
                      </CardImage>
                      <ButtonLink href="/developers/docs/">
                        {locale === "sv"
                          ? "Lär dig testing"
                          : t("nft-card-button")}
                      </ButtonLink>
                    </>
                  </Card>
                  <Card
                    title={
                      locale === "sv" ? "Smart Contracts" : t("dao-card-title")
                    }
                    description={
                      locale === "sv"
                        ? "Solidity, Hardhat, Foundry - bygg och deploya smart contracts på Ethereum."
                        : t("dao-card-description")
                    }
                  >
                    <>
                      <CardImage>
                        <ImageHeight200 src={dao} alt="" />
                      </CardImage>
                      <ButtonLink href="/smart-contracts/">
                        {locale === "sv"
                          ? "Lär dig Solidity"
                          : t("dao-card-button")}
                      </ButtonLink>
                    </>
                  </Card>
                  <Card
                    title={
                      locale === "sv"
                        ? "Decentraliserade Appar"
                        : t("dapp-card-title")
                    }
                    description={
                      locale === "sv"
                        ? "Web3.js, Ethers.js - anslut din app till blockchain och bygg decentraliserade tjänster."
                        : t("dapp-card-description")
                    }
                  >
                    <>
                      <CardImage>
                        <ImageHeight200 src={developersEthBlocks} alt="" />
                      </CardImage>
                      <ButtonLink href="/what-are-apps/">
                        {locale === "sv" ? "Bygg dApps" : t("dapp-card-button")}
                      </ButtonLink>
                    </>
                  </Card>
                  <Card
                    className="justify-start bg-gradient-main"
                    title={
                      locale === "sv"
                        ? "Emerging Tech"
                        : t("emerging-use-cases-title")
                    }
                    description={
                      locale === "sv"
                        ? "Nya teknologier och ramverk som formar framtiden:"
                        : t("emerging-use-cases-description")
                    }
                  >
                    <Stack asChild className="flex-1 justify-center gap-0">
                      <UnorderedList className="mb-0">
                        <ListItem>
                          <InlineLink href="/decentralized-identity/">
                            {locale === "sv"
                              ? "Decentraliserad identitet"
                              : tCommon("decentralized-identity")}
                          </InlineLink>
                        </ListItem>
                        <ListItem>
                          <InlineLink href="/ai-agents/">
                            {locale === "sv"
                              ? "AI-agenter och LLM"
                              : tCommon("decentralized-social-networks")}
                          </InlineLink>
                        </ListItem>
                        <ListItem>
                          <InlineLink href="/desci/">
                            {locale === "sv"
                              ? "Decentraliserad vetenskap"
                              : tCommon("decentralized-science")}
                          </InlineLink>
                        </ListItem>
                        <ListItem>
                          <InlineLink href="https://vercel.com">
                            {locale === "sv"
                              ? "Serverless & Edge Computing"
                              : t("play-to-earn")}
                          </InlineLink>
                        </ListItem>
                        <ListItem>
                          <InlineLink href="https://www.docker.com/">
                            {locale === "sv"
                              ? "Containerization & Kubernetes"
                              : t("fundraising-through-quadratic-funding")}
                          </InlineLink>
                        </ListItem>
                        <li>
                          <InlineLink href="/developers/">
                            {locale === "sv"
                              ? "Microservices Architecture"
                              : t("supply-chain-management")}
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
                description={t(
                  "strengthening-the-ethereum-network-description"
                )}
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

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}) {
  const { locale } = params

  const t = await getTranslations({ locale, namespace: "page-learn" })

  return await getMetadata({
    locale,
    slug: ["learn"],
    title: t("page-learn-meta-title"),
    description: t("hero-subtitle"),
    image: "/images/heroes/learn-hub-hero.png",
  })
}
