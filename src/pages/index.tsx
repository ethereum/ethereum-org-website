import React, { ReactNode, useState } from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { graphql, PageProps } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import {
  Box,
  chakra,
  Flex,
  FlexProps,
  Heading,
  HeadingProps,
  Icon,
  Img,
  SimpleGridProps,
  Stack,
  Text,
  useToken,
} from "@chakra-ui/react"
import { FaGithub } from "react-icons/fa"

import type { ChildOnlyProp, Context } from "../types"

import ActionCard from "../components/ActionCard"
import ButtonLink from "../components/ButtonLink"
import CalloutBanner from "../components/CalloutBanner"
import CodeModal from "../components/CodeModal"
import Codeblock from "../components/Codeblock"
import Morpher from "../components/Morpher"
import PageMetadata from "../components/PageMetadata"
import StatsBoxGrid from "../components/StatsBoxGrid"
import Translation from "../components/Translation"
import TitleCardList, { ITitleCardItem } from "../components/TitleCardList"
import { isLangRightToLeft } from "../utils/translations"
import { getImage } from "../utils/image"

import SimpleWalletContent from "!!raw-loader!../data/SimpleWallet.sol"
import SimpleTokenContent from "!!raw-loader!../data/SimpleToken.sol"
import CreateWalletContent from "!!raw-loader!../data/CreateWallet.js"
import SimpleDomainRegistryContent from "!!raw-loader!../data/SimpleDomainRegistry.sol"

const SectionHeading = (props: HeadingProps) => (
  <Heading
    lineHeight={1.4}
    fontFamily="sans-serif"
    fontSize={{ base: "2xl", sm: "2rem" }}
    fontWeight={600}
    mt={0}
    mb={2}
    {...props}
  />
)

const SectionDecription = (props: ChildOnlyProp) => (
  <Box mb={8} fontSize={{ base: "md", sm: "xl" }} lineHeight={1.4} {...props} />
)

const ImageContainer = (props: FlexProps & { children: ReactNode }) => (
  <Flex width={{ base: "75%", lg: "full" }} height="full" {...props} />
)

const CardContainer = (props: {
  children: ReactNode
  minChildWidth: SimpleGridProps["minChildWidth"]
}) => (
  <Flex
    flexWrap="wrap"
    gap={8}
    p={{ lg: 4 }}
    width="full"
    sx={{
      "& > *": {
        minW: props.minChildWidth,
      },
    }}
  >
    {props.children}
  </Flex>
)

const ContentBox = (props: ChildOnlyProp) => (
  <Box py={4} px={{ base: 4, lg: 8 }} {...props} />
)

const StyledActionCard = chakra(ActionCard, {
  baseStyle: {
    background: "background.base",
    borderRadius: "sm",
    border: "1px",
    borderColor: "text",
    margin: 0,
  },
})

const StyledCodeModal = chakra(CodeModal)

const StyledTitleCardList = chakra(TitleCardList)

const GrayContainer = (props: ChildOnlyProp) => (
  <Box width="full" pb={16} background="grayBackground" {...props} />
)

const MainSectionContainer = (props: {
  children: ReactNode
  containerBg: FlexProps["bg"]
}) => (
  <Flex
    alignItems="center"
    background={props.containerBg}
    borderBlock="1px"
    borderColor="text"
    height={{ base: "100%", lg: "720px" }}
    mt="-1px"
    py={{ base: 8, lg: 0 }}
    width="full"
  >
    {props.children}
  </Flex>
)

const FeatureContent = (props: ChildOnlyProp) => (
  <Flex
    flex="0 0 50%"
    flexDirection="column"
    justifyContent="center"
    boxSize="full"
    maxWidth={{ lg: "75%" }}
    p={{ base: 8, lg: 24 }}
    {...props}
  />
)

const Row = (props: { children: ReactNode; isReversed?: boolean }) => (
  <Flex
    alignItems="center"
    flexDirection={{
      base: "column-reverse",
      lg: props.isReversed ? "row-reverse" : "row",
    }}
  >
    {props.children}
  </Flex>
)

const ButtonLinkRow = (props: {
  firstButton: { to: string; child: ReactNode }
  secondButton?: { to: string; child: ReactNode }
}) => (
  <Stack
    alignItems="flex-start"
    direction={{ base: "column", md: "row" }}
    spacing={{ base: 6, md: 2 }}
  >
    <ButtonLink to={props.firstButton.to}>{props.firstButton.child}</ButtonLink>
    {!!props.secondButton && (
      <ButtonLink variant="outline" gap={2} to={props.secondButton.to}>
        {props.secondButton.child}
      </ButtonLink>
    )}
  </Stack>
)

const PageHeader = () => (
  <Flex
    as="header"
    flexDirection="column"
    alignItems="center"
    textAlign="center"
    mt={4}
    mb={8}
    px={8}
  >
    <Heading as="h1" fontSize={{ base: "2rem", sm: "2.5rem" }} m={0}>
      <Translation id="page-index-title" />
    </Heading>
    <Text color="text200" maxW="55ch" fontSize="xl" mt={4}>
      <Translation id="page-index-description" />
    </Text>
    <ButtonLinkRow
      firstButton={{
        to: "/learn/",
        child: <Translation id="page-index-title-button" />,
      }}
    />
  </Flex>
)

const HomePage = ({
  data,
  pageContext: { language = "en" },
}: PageProps<Queries.IndexPageQuery, Context>) => {
  const { t } = useTranslation()
  const [isModalOpen, setModalOpen] = useState(false)
  const [activeCode, setActiveCode] = useState(0)
  const dir = isLangRightToLeft(language) ? "rtl" : "ltr"

  const toggleCodeExample = (id: number): void => {
    setActiveCode(id)
    setModalOpen(true)
  }

  const cards = [
    {
      image: getImage(data.robotfixed),
      title: t("page-index-get-started-wallet-title"),
      description: t("page-index-get-started-wallet-description"),
      alt: t("page-index-get-started-wallet-image-alt"),
      to: "/wallets/find-wallet/",
    },
    {
      image: getImage(data.ethfixed),
      title: t("page-index-get-started-eth-title"),
      description: t("page-index-get-started-eth-description"),
      alt: t("page-index-get-started-eth-image-alt"),
      to: "/get-eth/",
    },
    {
      image: getImage(data.dogefixed),
      title: t("page-index-get-started-dapps-title"),
      description: t("page-index-get-started-dapps-description"),
      alt: t("page-index-get-started-dapps-image-alt"),
      to: "/dapps/",
    },
    {
      image: getImage(data.devfixed),
      title: t("page-index-get-started-devs-title"),
      description: t("page-index-get-started-devs-description"),
      alt: t("page-index-get-started-devs-image-alt"),
      to: "/developers/",
    },
  ]

  const touts = [
    {
      image: getImage(data.merge),
      alt: t("page-index-tout-upgrades-image-alt"),
      title: t("page-index-tout-upgrades-title"),
      description: t("page-index-tout-upgrades-description"),
      to: "/roadmap/",
    },
    {
      image: getImage(data.infrastructurefixed),
      alt: t("page-index-tout-enterprise-image-alt"),
      title: t("page-index-tout-enterprise-title"),
      description: t("page-index-tout-enterprise-description"),
      to: "/enterprise/",
    },
    {
      image: getImage(data.enterprise),
      alt: t("page-index-tout-community-image-alt"),
      title: t("page-index-tout-community-title"),
      description: t("page-index-tout-community-description"),
      to: "/community/",
    },
  ]

  interface CodeExample extends ITitleCardItem {
    codeLanguage: string
    code: string
  }

  const codeExamples: Array<CodeExample> = [
    {
      title: t("page-index-developers-code-example-title-0"),
      description: t("page-index-developers-code-example-description-0"),
      codeLanguage: "language-solidity",
      code: SimpleWalletContent,
    },
    {
      title: t("page-index-developers-code-example-title-1"),
      description: t("page-index-developers-code-example-description-1"),
      codeLanguage: "language-solidity",
      code: SimpleTokenContent,
    },
    {
      title: t("page-index-developers-code-example-title-2"),
      description: t("page-index-developers-code-example-description-2"),
      codeLanguage: "language-javascript",
      code: CreateWalletContent,
    },
    {
      title: t("page-index-developers-code-example-title-3"),
      description: t("page-index-developers-code-example-description-3"),
      codeLanguage: "language-solidity",
      code: SimpleDomainRegistryContent,
    },
  ]

  const cardBoxShadow = useToken("colors", "cardBoxShadow")

  return (
    <Flex flexDirection="column" alignItems="center" dir={dir} width="full">
      <PageMetadata
        title={t("page-index-meta-title")}
        description={t("page-index-meta-description")}
      />
      <Img
        as={GatsbyImage}
        image={getImage(data.hero)!}
        alt={t("page-index-hero-image-alt")}
        loading="eager"
        width="full"
        minH="380px"
        maxH="440px"
        backgroundSize="cover"
        background="no-repeat 50px"
        mb={8}
      />
      <Morpher />
      <PageHeader />
      {/* Getting Started Section */}
      <GrayContainer>
        <ContentBox>
          <Flex
            alignItems="center"
            flexDirection={{ base: "column-reverse", md: "row" }}
            mt={{ md: 4 }}
            mb={{ md: 12 }}
          >
            <Box
              flex="0 0 50%"
              maxW={{ lg: "75%" }}
              p={{ sm: 8, lg: 24 }}
              boxSize="full"
            >
              <SectionHeading fontFamily="inherit" mb={6}>
                <Translation id="page-index-get-started" />
              </SectionHeading>
              <SectionDecription>
                <Translation id="page-index-get-started-description" />
              </SectionDecription>
            </Box>
            <ImageContainer>
              <Img
                as={GatsbyImage}
                image={getImage(data.hackathon)!}
                alt={t("page-index-get-started-image-alt")}
                width="full"
                backgroundSize="cover"
                background="no-repeat 50px"
              />
            </ImageContainer>
          </Flex>
          <CardContainer minChildWidth={{ lg: "480px" }}>
            {cards.map((card, idx) => (
              <StyledActionCard
                key={idx}
                boxShadow={cardBoxShadow}
                m={0}
                title={card.title}
                description={card.description}
                alt={card.alt}
                to={card.to}
                image={card.image!}
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
              <Translation id="page-index-what-is-ethereum" />
            </SectionHeading>
            <SectionDecription>
              <Translation id="page-index-what-is-ethereum-description" />
            </SectionDecription>
            <ButtonLinkRow
              firstButton={{
                to: "/what-is-ethereum/",
                child: <Translation id="page-index-what-is-ethereum-button" />,
              }}
              secondButton={{
                to: "/eth/",
                child: (
                  <Translation id="page-index-what-is-ethereum-secondary-button" />
                ),
              }}
            />
          </FeatureContent>
          <ImageContainer pl={{ lg: 8 }}>
            <Img
              as={GatsbyImage}
              width="full"
              image={getImage(data.ethereum)!}
              alt={t("page-index-what-is-ethereum-image-alt")}
            />
          </ImageContainer>
        </Row>
      </MainSectionContainer>
      {/* Finance Section */}
      <MainSectionContainer containerBg="homeBoxOrange">
        <Row>
          <FeatureContent>
            <SectionHeading>
              <Translation id="page-index-defi" />
            </SectionHeading>
            <SectionDecription>
              <Translation id="page-index-defi-description" />
            </SectionDecription>
            <ButtonLinkRow
              firstButton={{
                to: "/defi/",
                child: <Translation id="page-index-defi-button" />,
              }}
            />
          </FeatureContent>
          <ImageContainer>
            <Img
              as={GatsbyImage}
              width="full"
              image={getImage(data.impact)!}
              alt={t("page-index-defi-image-alt")}
            />
          </ImageContainer>
        </Row>
      </MainSectionContainer>
      {/* NFT Section */}
      <MainSectionContainer containerBg="homeBoxMint">
        <Row isReversed>
          <FeatureContent>
            <SectionHeading>
              <Translation id="page-index-nft" />
            </SectionHeading>
            <SectionDecription>
              <Translation id="page-index-nft-description" />
            </SectionDecription>
            <ButtonLinkRow
              firstButton={{
                to: "/nft/",
                child: <Translation id="page-index-nft-button" />,
              }}
            />
          </FeatureContent>
          <ImageContainer>
            <Img
              as={GatsbyImage}
              width="full"
              image={getImage(data.infrastructure)!}
              alt={t("page-index-nft-alt")}
            />
          </ImageContainer>
        </Row>
      </MainSectionContainer>
      {/* Internet Section */}
      <MainSectionContainer containerBg="homeBoxPink">
        <Box pl={{ lg: 8 }}>
          <Row>
            <FeatureContent>
              <SectionHeading>
                <Translation id="page-index-internet" />
              </SectionHeading>
              <SectionDecription>
                <Translation id="page-index-internet-description" />
              </SectionDecription>
              <ButtonLinkRow
                firstButton={{
                  to: "/dapps/?category=technology",
                  child: <Translation id="page-index-internet-button" />,
                }}
                secondButton={{
                  to: "/wallets/",
                  child: (
                    <Translation id="page-index-internet-secondary-button" />
                  ),
                }}
              />
            </FeatureContent>
            <ImageContainer>
              <Img
                as={GatsbyImage}
                width="full"
                image={getImage(data.future)!}
                alt={t("page-index-internet-image-alt")}
              />
            </ImageContainer>
          </Row>
        </Box>
      </MainSectionContainer>
      {/* Developer Section */}
      <MainSectionContainer containerBg="homeBoxPurple">
        <Row>
          <Box py={4} px={{ base: 4, sm: 8 }} width="full">
            <StyledTitleCardList
              content={codeExamples}
              clickHandler={toggleCodeExample}
              headerKey="page-index-developers-code-examples"
              isCode
              border="1px"
              borderColor="text"
              boxShadow={cardBoxShadow}
              maxWidth={{ lg: "624px" }}
              ml={{ lg: 16 }}
            />
          </Box>
          <FeatureContent>
            <SectionHeading>
              <Translation id="page-index-developers" />
            </SectionHeading>
            <SectionDecription>
              <Translation id="page-index-developers-description" />
            </SectionDecription>
            <ButtonLinkRow
              firstButton={{
                to: "/dapps/?category=technology",
                child: <Translation id="page-index-developers-button" />,
              }}
            />
          </FeatureContent>
          <StyledCodeModal
            isOpen={isModalOpen}
            setIsOpen={setModalOpen}
            title={codeExamples[activeCode].title}
            sx={{
              ".modal-component-container": {
                padding: 0,
                left: 0,
                right: 0,
                bottom: 0,
                top: "50%",
              },
              ".modal-component": {
                maxWidth: "100%",
                maxHeight: "50%",
                padding: 0,
              },
              ".modal-component-content": {
                marginTop: "3rem",
                width: "100%",
                overflow: "auto",
              },
            }}
          >
            <Codeblock
              codeLanguage={codeExamples[activeCode].codeLanguage}
              allowCollapse={false}
              fromHomepage
            >
              {codeExamples[activeCode].code}
            </Codeblock>
          </StyledCodeModal>
        </Row>
      </MainSectionContainer>
      {/* Eth Today Section */}
      <GrayContainer>
        <ContentBox>
          <SectionHeading mt={12} mb={8} fontFamily="heading">
            <Translation id="page-index-network-stats-title" />
          </SectionHeading>
          <SectionDecription>
            <Translation id="page-index-network-stats-subtitle" />
          </SectionDecription>
        </ContentBox>
        <StatsBoxGrid />
      </GrayContainer>
      {/* Explore Section */}
      <ContentBox>
        <Box pb={4}>
          <SectionHeading mt={12} mb={8} fontFamily="heading">
            <Translation id="page-index-touts-header" />
          </SectionHeading>
        </Box>
        <CardContainer minChildWidth={{ lg: "400px" }}>
          {touts.map((tout, idx) => {
            return (
              <StyledActionCard
                key={idx}
                title={tout.title}
                description={tout.description}
                alt={tout.alt}
                to={tout.to}
                image={tout.image!}
                boxShadow={cardBoxShadow}
              />
            )
          })}
        </CardContainer>
        <CalloutBanner
          titleKey={"page-index-contribution-banner-title"}
          descriptionKey={"page-index-contribution-banner-description"}
          image={getImage(data.finance)!}
          maxImageWidth={600}
          alt={t("page-index-contribution-banner-image-alt")}
          mt={32}
          mb={16}
          mx={0}
        >
          <ButtonLinkRow
            firstButton={{
              to: "/contributing/",
              child: <Translation id="page-index-contribution-banner-button" />,
            }}
            secondButton={{
              to: "https://github.com/ethereum/ethereum-org-website",
              child: (
                <>
                  <Icon
                    as={FaGithub}
                    color="text"
                    fontSize="2xl"
                    _hover={{ color: "primary.base" }}
                    _active={{ color: "primary.base" }}
                    _focus={{ color: "primary.base" }}
                  />
                  GitHub
                </>
              ),
            }}
          />
        </CalloutBanner>
      </ContentBox>
    </Flex>
  )
}

export default HomePage

export const query = graphql`
  query IndexPage($languagesToFetch: [String!]!) {
    locales: allLocale(
      filter: {
        language: { in: $languagesToFetch }
        ns: { in: ["page-index", "common"] }
      }
    ) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    hero: file(relativePath: { eq: "home/hero.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    ethereum: file(relativePath: { eq: "what-is-ethereum.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    enterprise: file(relativePath: { eq: "enterprise-eth.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 320
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    dogefixed: file(relativePath: { eq: "doge-computer.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 320
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    robotfixed: file(relativePath: { eq: "wallet-cropped.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 320
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    ethfixed: file(relativePath: { eq: "eth.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 320
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    devfixed: file(relativePath: { eq: "developers-eth-blocks.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 320
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    future: file(relativePath: { eq: "future_transparent.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    impact: file(relativePath: { eq: "impact_transparent.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    finance: file(relativePath: { eq: "finance_transparent.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 600
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    hackathon: file(relativePath: { eq: "hackathon_transparent.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    infrastructure: file(
      relativePath: { eq: "infrastructure_transparent.png" }
    ) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    infrastructurefixed: file(
      relativePath: { eq: "infrastructure_transparent.png" }
    ) {
      childImageSharp {
        gatsbyImageData(
          width: 320
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    merge: file(relativePath: { eq: "upgrades/merge.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 320
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
  }
`
