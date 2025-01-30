import { GetStaticProps } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import {
  Box,
  Flex,
  HeadingProps,
  SimpleGrid,
  Text,
  useTheme,
} from "@chakra-ui/react"

import { BasePageProps, ChildOnlyProp, Lang } from "@/lib/types"
import { ICard, IGetInvolvedCard } from "@/lib/interfaces"

import ActionCard from "@/components/ActionCard"
import ButtonLink, { ButtonLinkProps } from "@/components/Buttons/ButtonLink"
import Callout from "@/components/Callout"
import Card from "@/components/Card"
import FeedbackCard from "@/components/FeedbackCard"
import { HubHero } from "@/components/Hero"
import type { HubHeroProps } from "@/components/Hero/HubHero"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import OldHeading from "@/components/OldHeading"
import PageMetadata from "@/components/PageMetadata"
import { Divider } from "@/components/ui/divider"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

// Static assets
import developersEthBlockImg from "@/public/images/developers-eth-blocks.png"
import dogeComputerImg from "@/public/images/doge-computer.png"
import ethImg from "@/public/images/eth.png"
import financeTransparentImg from "@/public/images/finance_transparent.png"
import futureTransparentImg from "@/public/images/future_transparent.png"
import hackathonTransparentImg from "@/public/images/hackathon_transparent.png"
// -- Hero
import communityHeroImg from "@/public/images/heroes/community-hero.png"
// -- Cards
import upgradesCoreImg from "@/public/images/upgrades/core.png"
import whatIsEthereumImg from "@/public/images/what-is-ethereum.png"

export const getStaticProps = (async ({ locale }) => {
  const requiredNamespaces = getRequiredNamespacesForPage("/community")

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

const CardContainer = ({ children }: ChildOnlyProp) => {
  return (
    <Flex wrap="wrap" mx={-4}>
      {children}
    </Flex>
  )
}

const Content = ({ children }: ChildOnlyProp) => {
  return (
    <Box py={4} px={8} w="full">
      {children}
    </Box>
  )
}

const Page = ({ children }: ChildOnlyProp) => {
  return (
    <Flex
      as={MainArticle}
      direction="column"
      alignItems="center"
      w="full"
      mx="auto"
    >
      {children}
    </Flex>
  )
}

const ButtonRow = ({ children }: ChildOnlyProp) => {
  return (
    <Flex alignItems="flex-start" direction={{ base: "column", md: "row" }}>
      {children}
    </Flex>
  )
}

const StyledButtonLink = ({ children, ...props }: ButtonLinkProps) => {
  return (
    <ButtonLink
      mt={{ base: 4, md: 0 }}
      ms={{ base: 0, md: 2 }}
      display="flex"
      alignItems="center"
      {...props}
    >
      {children}
    </ButtonLink>
  )
}

const RowReverse = ({ children }: ChildOnlyProp) => {
  return (
    <Flex
      direction={{ base: "column-reverse", lg: "row-reverse" }}
      alignItems={{ base: "center", lg: "normal" }}
    >
      {children}
    </Flex>
  )
}

const ImageContainer = ({ children }: ChildOnlyProp) => {
  return (
    <Flex h="full" w={{ base: "75%", lg: "full" }}>
      {children}
    </Flex>
  )
}

const Subtitle = ({ children }: ChildOnlyProp) => {
  return (
    <Text mb={8} fontSize={{ base: "md", sm: "xl" }} lineHeight={1.4}>
      {children}
    </Text>
  )
}

const FeatureContent = ({ children }: ChildOnlyProp) => {
  return (
    <Flex
      direction="column"
      boxSize="full"
      justifyContent="center"
      p={{ base: 8, lg: 24 }}
    >
      {children}
    </Flex>
  )
}

const H2 = ({ children, ...props }: HeadingProps) => {
  return (
    <OldHeading fontSize={{ base: "2xl", md: "2rem" }} mt={0} {...props}>
      {children}
    </OldHeading>
  )
}

const CommunityPage = () => {
  const { t } = useTranslation("page-community")
  const theme = useTheme()

  const cards: Array<ICard> = [
    {
      image: upgradesCoreImg,
      title: t("page-community-card-1-title"),
      description: t("page-community-card-1-description"),
      alt: t("page-index-get-started-wallet-image-alt"),
      href: "/community/online/",
    },
    {
      image: ethImg,
      title: t("page-community-card-2-title"),
      description: t("page-community-card-2-description"),
      alt: t("page-index-get-started-eth-image-alt"),
      href: "/community/events/",
    },
    {
      image: dogeComputerImg,
      title: t("page-community-card-3-title"),
      description: t("page-community-card-3-description"),
      alt: t("page-index-get-started-dapps-image-alt"),
      href: "/community/get-involved/",
    },
    {
      image: futureTransparentImg,
      title: t("page-community-card-4-title"),
      description: t("page-community-card-4-description"),
      alt: t("page-index-get-started-dapps-image-alt"),
      href: "/community/grants/",
    },
  ]

  const whyGetInvolvedCards: Array<IGetInvolvedCard> = [
    {
      emoji: ":mage:",
      title: t("page-community-why-get-involved-card-1-title"),
      description: t("page-community-why-get-involved-card-1-description"),
    },
    {
      emoji: ":dollar:",
      title: t("page-community-why-get-involved-card-2-title"),
      description: t("page-community-why-get-involved-card-2-description"),
    },
    {
      emoji: ":collision:",
      title: t("page-community-why-get-involved-card-3-title"),
      description: t("page-community-why-get-involved-card-3-description"),
    },
  ]

  const heroContent: HubHeroProps = {
    title: t("page-community-hero-title"),
    header: t("page-community-hero-header"),
    description: t("page-community-hero-subtitle"),
    heroImg: communityHeroImg,
  }

  return (
    <Page>
      <PageMetadata
        title={t("page-community-meta-title")}
        description={t("page-community-meta-description")}
      />
      <HubHero {...heroContent} />
      <Divider />
      <Flex
        bg="homeBoxTurquoise"
        alignItems="center"
        direction="row-reverse"
        py={{ base: 8, lg: 0 }}
        ps={{ base: 0, lg: 8 }}
        w="full"
        h={{ base: "full", lg: "720px" }}
        mt="-1px"
        borderBottom="1px solid"
        borderColor="text"
      >
        <Content>
          <Flex direction="column" alignItems="center" mb={8}>
            <H2>{t("page-community-why-get-involved-title")}</H2>
          </Flex>
          <CardContainer>
            {whyGetInvolvedCards.map((card, idx) => (
              <Card
                className="m-4 min-w-[280px] max-w-full flex-[1_0_30%] p-6 md:max-w-[46%] lg:max-w-[31%]"
                key={idx}
                emoji={card.emoji}
                title={card.title}
                description={card.description}
              />
            ))}
          </CardContainer>
        </Content>
      </Flex>
      <Box
        w="full"
        pb={16}
        bg="grayBackground"
        boxShadow={`inset 0px 0px 0px ${theme.colors.tableItemBoxShadow}`}
      >
        <Box py={4} px={{ base: 4, lg: 8 }} w="full">
          <Flex
            direction={{ base: "column-reverse", md: "row" }}
            alignItems="center"
            mb={{ base: 0, m: 12 }}
            mt={{ base: 0, m: 4 }}
          >
            <Box p={{ base: 0, sm: 8, lg: 24 }} boxSize="full">
              <H2 id="get-involved">
                {t("page-community-get-involved-title")}
              </H2>
              <Subtitle>
                {t("page-community-get-involved-description")}
              </Subtitle>
            </Box>
            <ImageContainer>
              <Image
                src={developersEthBlockImg}
                alt={t("page-community-get-involved-image-alt")}
                style={{
                  objectFit: "cover",
                }}
                my={-4}
              />
            </ImageContainer>
          </Flex>
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 8, lg: 0 }}>
            {cards.map((card, idx) => (
              <ActionCard
                className="m-0 flex-col rounded-sm border lg:m-4"
                key={idx}
                title={card.title}
                description={card.description}
                href={card.href}
                image={card.image}
                imageWidth={320}
                alt={card.alt}
              />
            ))}
          </SimpleGrid>
        </Box>
      </Box>
      <Flex
        bg="homeBoxTurquoise"
        alignItems="center"
        direction={{ base: "column-reverse", lg: "row-reverse" }}
        ps={{ base: 0, lg: 8 }}
        py={{ base: 8, lg: 0 }}
        w="full"
        h={{ base: "full", lg: "720px" }}
        mt="-1px"
        borderTop="1px solid"
        borderBottom="1px solid"
        borderColor="text"
      >
        <RowReverse>
          <FeatureContent>
            <H2>{t("page-community-open-source")}</H2>
            <Subtitle>{t("page-community-open-source-description")}</Subtitle>
            <ButtonRow>
              <ButtonLink href="/community/get-involved/#ethereum-jobs/">
                {t("page-community-find-a-job")}
              </ButtonLink>
              <StyledButtonLink
                variant="outline"
                href="/community/grants/"
                isSecondary
              >
                {t("page-community-explore-grants")}
              </StyledButtonLink>
            </ButtonRow>
          </FeatureContent>
          <ImageContainer>
            <Image
              src={whatIsEthereumImg}
              alt={t("page-community-open-source-image-alt")}
              style={{
                objectFit: "cover",
              }}
            />
          </ImageContainer>
        </RowReverse>
      </Flex>
      <Flex
        bg="homeBoxPink"
        alignItems="center"
        direction={{ base: "column-reverse", lg: "row-reverse" }}
        ps={{ base: 0, lg: 8 }}
        py={{ base: 8, lg: 0 }}
        h={{ base: "full", lg: "720px" }}
        w="full"
        mt="-1px"
        borderTop="1px solid"
        borderBottom="1px solid"
        borderColor="text"
      >
        <Flex
          direction={{ base: "column-reverse", lg: "row" }}
          alignItems="center"
        >
          <FeatureContent>
            <Flex direction="column" justifyContent="center">
              <H2>{t("page-community-contribute")}</H2>
              <Subtitle>{t("page-community-contribute-description")}</Subtitle>
              <ButtonRow>
                <ButtonLink href="/contributing/">
                  {t("page-community-contribute-button")}
                </ButtonLink>
                <StyledButtonLink
                  variant="outline"
                  href="https://github.com/ethereum/ethereum-org-website/"
                  isSecondary
                >
                  {t("page-community-contribute-secondary-button")}
                </StyledButtonLink>
              </ButtonRow>
            </Flex>
          </FeatureContent>
          <ImageContainer>
            <Image
              src={financeTransparentImg}
              alt={t("page-index-internet-image-alt")}
              style={{
                objectFit: "cover",
              }}
            />
          </ImageContainer>
        </Flex>
      </Flex>
      <Flex
        bg="homeBoxPurple"
        alignItems="center"
        direction={{ base: "column-reverse", lg: "row" }}
        h={{ base: "full", lg: "720px" }}
        w="full"
        mt="-1px"
        borderTop="1px solid"
        borderBottom="1px solid"
        borderColor="text"
      >
        <RowReverse>
          <FeatureContent>
            <H2>{t("page-community-support")}</H2>
            <Subtitle>{t("page-community-support-description")}</Subtitle>
            <Box>
              <ButtonLink href="/community/support/">
                {t("page-community-support-button")}
              </ButtonLink>
            </Box>
          </FeatureContent>
          <ImageContainer>
            <Image
              src={hackathonTransparentImg}
              alt={t("page-community-support-alt")}
              style={{
                objectFit: "cover",
              }}
            />
          </ImageContainer>
        </RowReverse>
      </Flex>
      <Divider />
      <Flex
        direction={{ base: "column", lg: "row" }}
        alignItems={{ base: "felx-start", lg: "center" }}
        w="full"
        py={4}
        px={8}
      >
        <Box flex="0 0 50%" maxW={{ base: "full", md: "75%" }} mb={6}>
          <OldHeading fontSize={{ base: "2xl", md: "2rem" }}>
            {t("page-community-try-ethereum")}
          </OldHeading>
        </Box>
      </Flex>
      <Content>
        <CardContainer>
          <Box
            as={Callout}
            flex="1 1 416px"
            minH="full"
            image={ethImg}
            titleKey="page-community:page-community-get-eth-title"
            alt={t("page-community-get-eth-alt")}
            descriptionKey="page-community:page-community-get-eth-description"
          >
            <Box>
              <ButtonLink href="/get-eth/">
                {t("page-community-get-eth")}
              </ButtonLink>
            </Box>
          </Box>
          <Box
            as={Callout}
            flex="1 1 416px"
            minH="full"
            image={dogeComputerImg}
            titleKey="page-community:page-community-explore-dapps-title"
            alt={t("page-community-explore-dapps-alt")}
            descriptionKey="page-community:page-community-explore-dapps-description"
          >
            <Box>
              <ButtonLink href="/dapps/">
                {t("page-community-explore-dapps")}
              </ButtonLink>
            </Box>
          </Box>
        </CardContainer>
      </Content>
      <FeedbackCard />
    </Page>
  )
}

export default CommunityPage
