import { ReactNode, useState } from "react"
import type { GetStaticProps, InferGetStaticPropsType } from "next"
import Link from "next/link"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import { AllMetricData, BasePageProps, ChildOnlyProp, Lang } from "@/lib/types"
import type { CommunityEventsReturnType } from "@/lib/interfaces"

import ActionCard from "@/components/ActionCard"
import ButtonLink from "@/components/Buttons/ButtonLink"
import CalloutBanner from "@/components/CalloutBanner"
import Codeblock from "@/components/Codeblock"
import CodeModal from "@/components/CodeModal"
import CommunityEvents from "@/components/CommunityEvents"
import HomeHero from "@/components/Hero/HomeHero"
import PageMetadata from "@/components/PageMetadata"
import StatsBoxGrid from "@/components/StatsBoxGrid"
import TitleCardList, { ITitleCardItem } from "@/components/TitleCardList"
import Translation from "@/components/Translation"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { runOnlyOnce } from "@/lib/utils/runOnlyOnce"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { BASE_TIME_UNIT, MAIN_CONTENT_ID } from "@/lib/constants"

import CreateWalletContent from "!!raw-loader!@/data/CreateWallet.js"
import SimpleDomainRegistryContent from "!!raw-loader!@/data/SimpleDomainRegistry.sol"
import SimpleTokenContent from "!!raw-loader!@/data/SimpleToken.sol"
import SimpleWalletContent from "!!raw-loader!@/data/SimpleWallet.sol"
import { fetchCommunityEvents } from "@/lib/api/calendarEvents"
import devfixed from "@/public/images/developers-eth-blocks.png"
import dogefixed from "@/public/images/doge-computer.png"
import enterprise from "@/public/images/enterprise-eth.png"
import ethfixed from "@/public/images/eth.png"
import finance from "@/public/images/finance_transparent.png"
import future from "@/public/images/future_transparent.png"
import hackathon from "@/public/images/hackathon_transparent.png"
import hero from "@/public/images/home/hero.png"
import impact from "@/public/images/impact_transparent.png"
import infrastructure from "@/public/images/infrastructure_transparent.png"
import infrastructurefixed from "@/public/images/infrastructure_transparent.png"
import merge from "@/public/images/upgrades/merge.png"
import robotfixed from "@/public/images/wallet-cropped.png"
import ethereum from "@/public/images/what-is-ethereum.png"
import Image from "next/image"

const SectionHeading = (props) => (
  <h1
    className="leading-[1.4] font-sans text-2xl sm:text-[2rem] font-semibold mb-2"
    {...props}
  />
)

const SectionDecription = (props: ChildOnlyProp) => (
  <div className="mb-8 text-md sm:text-xl leading-[1.4]" {...props} />
)

const ImageContainer = (props) => (
  <div className="flex w-[75%] lg:w-full h-full" {...props} />
)

const CardContainer = (props: { children: ReactNode; minChildWidth: any }) => (
  <div className="flex flex-wrap gap-8 w-full lg:p-4">{props.children}</div>
)

const ContentBox = (props: ChildOnlyProp) => (
  <div className="py-4 px-4 lg:px-8" {...props} />
)

const GrayContainer = (props: ChildOnlyProp) => (
  <div className="w-full pb-16 bg-grayBackground" {...props} />
)

const MainSectionContainer = (props: {
  children: ReactNode
  containerBg: unknown
}) => (
  <div
    className={`flex items-center bg-${props.containerBg} border-y border-text h-full lg:h-[720px] mt-[-1px] py-8 lg:py-0 w-full`}
  >
    {props.children}
  </div>
)

const FeatureContent = (props: ChildOnlyProp) => (
  <div
    className="flex-[0_0_50%] flex flex-col justify-center w-full max-w-full lg:max-w-[75%] p-8 lg:p-24"
    {...props}
  />
)

const Row = (props: { children: ReactNode; isReversed?: boolean }) => (
  <div
    className={`flex items-center flex-col-reverse lg:flex-${
      props.isReversed ? "row-reverse" : "row"
    }`}
  >
    {props.children}
  </div>
)

const ButtonLinkRow = (props: ChildOnlyProp) => (
  <div
    className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-2"
    {...props}
  />
)

const cachedFetchCommunityEvents = runOnlyOnce(fetchCommunityEvents)

type Props = BasePageProps & {
  communityEvents: CommunityEventsReturnType
  metricResults: AllMetricData
}

export const getStaticProps = (async ({ locale }) => {
  const metricResults: AllMetricData = {
    totalEthStaked: { data: [], value: 0 },
    nodeCount: { data: [], value: 0 },
    totalValueLocked: { data: [], value: 0 },
    txCount: { data: [], value: 0 },
  }

  const communityEvents = await cachedFetchCommunityEvents()

  // load i18n required namespaces for the given page
  const requiredNamespaces = getRequiredNamespacesForPage("/")

  // check if the translated page content file exists for locale
  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[0])

  // load last deploy date to pass to Footer in RootLayout
  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      communityEvents,
      contentNotTranslated,
      lastDeployLocaleTimestamp,
      metricResults,
    },
    revalidate: BASE_TIME_UNIT * 24,
  }
}) satisfies GetStaticProps<Props>

const HomePage = ({
  communityEvents,
  metricResults,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation(["common", "page-index"])

  const toggleCodeExample = (id: number): void => {
    // setActiveCode(id)
    // setModalOpen(true)
  }

  const cards = [
    {
      image: robotfixed,
      title: t("page-index:page-index-get-started-wallet-title"),
      description: t("page-index:page-index-get-started-wallet-description"),
      alt: t("page-index:page-index-get-started-wallet-image-alt"),
      to: "/wallets/find-wallet/",
    },
    {
      image: ethfixed,
      title: t("page-index:page-index-get-started-eth-title"),
      description: t("page-index:page-index-get-started-eth-description"),
      alt: t("page-index:page-index-get-started-eth-image-alt"),
      to: "/get-eth/",
    },
    {
      image: dogefixed,
      title: t("page-index:page-index-get-started-dapps-title"),
      description: t("page-index:page-index-get-started-dapps-description"),
      alt: t("page-index:page-index-get-started-dapps-image-alt"),
      to: "/dapps/",
    },
    {
      image: devfixed,
      title: t("page-index:page-index-get-started-devs-title"),
      description: t("page-index:page-index-get-started-devs-description"),
      alt: t("page-index:page-index-get-started-devs-image-alt"),
      to: "/developers/",
    },
  ]

  const touts = [
    {
      image: merge,
      alt: t("page-index:page-index-tout-upgrades-image-alt"),
      title: t("page-index:page-index-tout-upgrades-title"),
      description: t("page-index:page-index-tout-upgrades-description"),
      to: "/roadmap/",
    },
    {
      image: infrastructurefixed,
      alt: t("page-index:page-index-tout-enterprise-image-alt"),
      title: t("page-index:page-index-tout-enterprise-title"),
      description: t("page-index:page-index-tout-enterprise-description"),
      to: "/enterprise/",
    },
    {
      image: enterprise,
      alt: t("page-index:page-index-tout-community-image-alt"),
      title: t("page-index:page-index-tout-community-title"),
      description: t("page-index:page-index-tout-community-description"),
      to: "/community/",
    },
  ]

  interface CodeExample extends ITitleCardItem {
    codeLanguage: string
    code: string
  }

  const codeExamples: Array<CodeExample> = [
    {
      title: t("page-index:page-index-developers-code-example-title-0"),
      description: t(
        "page-index:page-index-developers-code-example-description-0"
      ),
      codeLanguage: "language-solidity",
      code: SimpleWalletContent,
    },
    {
      title: t("page-index:page-index-developers-code-example-title-1"),
      description: t(
        "page-index:page-index-developers-code-example-description-1"
      ),
      codeLanguage: "language-solidity",
      code: SimpleTokenContent,
    },
    {
      title: t("page-index:page-index-developers-code-example-title-2"),
      description: t(
        "page-index:page-index-developers-code-example-description-2"
      ),
      codeLanguage: "language-javascript",
      code: CreateWalletContent,
    },
    {
      title: t("page-index:page-index-developers-code-example-title-3"),
      description: t(
        "page-index:page-index-developers-code-example-description-3"
      ),
      codeLanguage: "language-solidity",
      code: SimpleDomainRegistryContent,
    },
  ]

  return (
    <article
      id={MAIN_CONTENT_ID}
      className="scroll-mt-24 flex flex-col items-center w-full"
    >
      <PageMetadata
        title={t("page-index:page-index-meta-title")}
        description={t("page-index:page-index-meta-description")}
      />
      <div>
        <HomeHero heroImg={hero} />
      </div>
      {/* Getting Started Section */}
      <GrayContainer>
        <ContentBox>
          <div className="flex items-center flex-col-reverse md:flex-row md:mt-4 md:mb-12">
            <div className="flex-[0_0_50%] lg:max-w-[75%] sm:p-8 lg:p-24 w-full h-full">
              <SectionHeading>
                <Translation id="page-index:page-index-get-started" />
              </SectionHeading>
              <SectionDecription>
                <Translation id="page-index:page-index-get-started-description" />
              </SectionDecription>
            </div>
            <ImageContainer>
              <Image
                src={hackathon}
                alt={t("page-index:page-index-get-started-image-alt")}
                width={720}
                className="bg-cover bg-no-repeat bg-[50px]"
              />
            </ImageContainer>
          </div>
          <CardContainer minChildWidth={{ lg: "480px" }}>
            {cards.map((card, idx) => (
              <ActionCard
                key={idx}
                title={card.title}
                description={card.description}
                alt={card.alt}
                to={card.to}
                image={card.image}
                imageWidth={320}
              />
            ))}
          </CardContainer>
        </ContentBox>
      </GrayContainer>
      {/* What is Eth Section */}
      <MainSectionContainer containerBg="homeBoxTurquoise">
        <Row isReversed>
          <FeatureContent>
            <SectionHeading>
              <Translation id="page-index:page-index-what-is-ethereum" />
            </SectionHeading>
            <SectionDecription>
              <Translation id="page-index:page-index-what-is-ethereum-description" />
            </SectionDecription>
            <ButtonLinkRow>
              <Link href="/what-is-ethereum/">
                <Translation id="page-index:page-index-what-is-ethereum-button" />
              </Link>
              <Link href="/eth/">
                <Translation id="page-index:page-index-what-is-ethereum-secondary-button" />
              </Link>
            </ButtonLinkRow>
          </FeatureContent>
          <ImageContainer>
            <Image
              src={ethereum}
              alt={t("page-index:page-index-what-is-ethereum-image-alt")}
              width={700}
            />
          </ImageContainer>
        </Row>
      </MainSectionContainer>
      {/* Finance Section */}
      <MainSectionContainer containerBg="homeBoxOrange">
        <Row>
          <FeatureContent>
            <SectionHeading>
              <Translation id="page-index:page-index-defi" />
            </SectionHeading>
            <SectionDecription>
              <Translation id="page-index:page-index-defi-description" />
            </SectionDecription>
            <ButtonLinkRow>
              <Link href="/defi/">
                <Translation id="page-index:page-index-defi-button" />
              </Link>
            </ButtonLinkRow>
          </FeatureContent>
          <ImageContainer>
            <Image
              src={impact}
              alt={t("page-index:page-index-defi-image-alt")}
              width={700}
            />
          </ImageContainer>
        </Row>
      </MainSectionContainer>
      {/* NFT Section */}
      <MainSectionContainer containerBg="homeBoxMint">
        <Row isReversed>
          <FeatureContent>
            <SectionHeading>
              <Translation id="page-index:page-index-nft" />
            </SectionHeading>
            <SectionDecription>
              <Translation id="page-index:page-index-nft-description" />
            </SectionDecription>
            <ButtonLinkRow>
              <Link href="/nft/">
                <Translation id="page-index:page-index-nft-button" />
              </Link>
            </ButtonLinkRow>
          </FeatureContent>
          <ImageContainer>
            <Image
              src={infrastructure}
              alt={t("page-index:page-index-nft-alt")}
              width={700}
            />
          </ImageContainer>
        </Row>
      </MainSectionContainer>
      {/* Internet Section */}
      <MainSectionContainer containerBg="homeBoxPink">
        <div className="lg:ps-8">
          <Row>
            <FeatureContent>
              <SectionHeading>
                <Translation id="page-index:page-index-internet" />
              </SectionHeading>
              <SectionDecription>
                <Translation id="page-index:page-index-internet-description" />
              </SectionDecription>
              <ButtonLinkRow>
                <Link href="/dapps/?category=technology">
                  <Translation id="page-index:page-index-internet-button" />
                </Link>
                <Link href="/wallets/">
                  <Translation id="page-index:page-index-internet-secondary-button" />
                </Link>
              </ButtonLinkRow>
            </FeatureContent>
            <ImageContainer>
              <Image
                src={future}
                alt={t("page-index:page-index-internet-image-alt")}
                width={700}
              />
            </ImageContainer>
          </Row>
        </div>
      </MainSectionContainer>
      {/* Developer Section */}
      <MainSectionContainer containerBg="homeBoxPurple">
        <Row>
          <div className="py-4 px-4 sm:px-8 w-full">
            <TitleCardList
              content={codeExamples}
              clickHandler={toggleCodeExample}
              headerKey="page-index:page-index-developers-code-examples"
              isCode
            />
          </div>
          <FeatureContent>
            <SectionHeading>
              <Translation id="page-index:page-index-developers" />
            </SectionHeading>
            <SectionDecription>
              <Translation id="page-index:page-index-developers-description" />
            </SectionDecription>
            <ButtonLinkRow>
              <Link href="/developers/">
                <Translation id="page-index:page-index-developers-button" />
              </Link>
            </ButtonLinkRow>
          </FeatureContent>
          {/* <CodeModal
            isOpen={isModalOpen}
            setIsOpen={setModalOpen}
            title={codeExamples[activeCode].title}
          >
            <Codeblock
              codeLanguage={codeExamples[activeCode].codeLanguage}
              allowCollapse={false}
              fromHomepage
            >
              {codeExamples[activeCode].code}
            </Codeblock>
          </CodeModal> */}
        </Row>
      </MainSectionContainer>
      {/* Eth Today Section */}
      <GrayContainer>
        <ContentBox>
          <SectionHeading>
            <Translation id="page-index:page-index-network-stats-title" />
          </SectionHeading>
          <SectionDecription>
            <Translation id="page-index:page-index-network-stats-subtitle" />
          </SectionDecription>
        </ContentBox>
        {/* <StatsBoxGrid data={metricResults} /> */}
      </GrayContainer>
      <hr className="mb-16 mt-16 w-[10%] h-1 bg-homeDivider" />

      <CommunityEvents events={communityEvents} />
      {/* Explore Section */}
      <ContentBox>
        <div className="pb-4">
          <SectionHeading>
            <Translation id="page-index:page-index-touts-header" />
          </SectionHeading>
        </div>
        <CardContainer minChildWidth={{ lg: "400px" }}>
          {touts.map((tout, idx) => {
            return (
              <ActionCard
                key={idx}
                title={tout.title}
                description={tout.description}
                alt={tout.alt}
                to={tout.to}
                image={tout.image}
                imageWidth={320}
              />
            )
          })}
        </CardContainer>
        <CalloutBanner
          titleKey={"page-index:page-index-contribution-banner-title"}
          descriptionKey={
            "page-index:page-index-contribution-banner-description"
          }
          image={finance}
          imageWidth={600}
          alt={t("page-index:page-index-contribution-banner-image-alt")}
        >
          <ButtonLinkRow>
            <Link href="/contributing/">
              <Translation id="page-index:page-index-contribution-banner-button" />
            </Link>
            <Link href="https://github.com/ethereum/ethereum-org-website">
              GitHub
            </Link>
          </ButtonLinkRow>
        </CalloutBanner>
      </ContentBox>
    </article>
  )
}

export default HomePage
