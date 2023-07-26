import React, { ComponentPropsWithRef } from "react"
import { graphql, PageProps } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"
import {
  Box,
  Divider,
  Flex,
  FlexProps,
  Heading,
  HeadingProps,
  List,
  ListItem,
  Text,
  useToken,
} from "@chakra-ui/react"

import Translation from "../../components/Translation"
import Card from "../../components/Card"
import Link from "../../components/Link"
import Trilemma from "../../components/Trilemma"
import PageHero, {
  IContent as IPageHeroContent,
} from "../../components/PageHero"
import Breadcrumbs from "../../components/Breadcrumbs"
import ButtonLink from "../../components/ButtonLink"
import PageMetadata from "../../components/PageMetadata"
import InfoBanner from "../../components/InfoBanner"
import FeedbackCard from "../../components/FeedbackCard"

import { getImage } from "../../utils/image"

import type { ChildOnlyProp } from "../../types"
import Emoji from "../../components/Emoji"

const Page = (props: ChildOnlyProp) => (
  <Flex direction="column" align="center" w="full" {...props} />
)

const PageDivider = () => (
  <Divider
    my={16}
    w="10%"
    borderBottomWidth="0.25rem"
    borderColor="homeDivider"
  />
)

const PageContent = (props: ChildOnlyProp) => (
  <Box py={4} px={8} w="full" {...props} />
)

const H2 = (props: HeadingProps) => (
  <Heading
    as="h2"
    mt={0}
    mb={8}
    fontSize={{ base: "2xl", md: "2rem" }}
    fontWeight="semibold"
    lineHeight={1.4}
    {...props}
  />
)

const CenterH2 = (props: HeadingProps) => <H2 textAlign="center" {...props} />

const H3 = (props: HeadingProps) => (
  <Heading
    as="h3"
    fontSize={{ base: "xl", md: "2xl" }}
    fontWeight="semibold"
    lineHeight={1.4}
    {...props}
  />
)

const H6 = (props: HeadingProps) => (
  <Heading
    as="h6"
    fontSize="0.9rem"
    fontWeight="normal"
    lineHeight={1.4}
    {...props}
  />
)

const CardContainer = (props: FlexProps) => (
  <Flex wrap="wrap" mx={-4} {...props} />
)

const ProblemCardContainer = (props: ChildOnlyProp) => {
  const containerMaxWidth = useToken("breakpoints", ["lg"])

  return <CardContainer maxW={containerMaxWidth} m="0 auto" {...props} />
}
const StyledCardContainer = (props: ChildOnlyProp) => (
  <CardContainer mt={8} mb={12} {...props} />
)

const CentreCard = (props: ComponentPropsWithRef<typeof Card>) => (
  <Card
    flex="1 1 30%"
    minW="240px"
    m={4}
    p={6}
    border={0}
    textAlign="center"
    {...props}
  />
)

const CentralContent = (props: ChildOnlyProp) => (
  <Box my={0} mx={{ base: 0, lg: 48 }} {...props} />
)

const TrilemmaContent = (props: ChildOnlyProp) => (
  <Box w="full" my={8} mx={0} p={8} background="cardGradient" {...props} />
)

const paths = [
  {
    emoji: ":vertical_traffic_light:",
    title: <Translation id="page-roadmap-vision-title-1" />,
    description: <Translation id="page-roadmap-vision-desc-1" />,
  },
  {
    emoji: ":minidisc:",
    title: <Translation id="page-roadmap-vision-title-2" />,
    description: <Translation id="page-roadmap-vision-desc-2" />,
  },
]

const VisionPage = ({
  data,
  location,
}: PageProps<Queries.UpgradesVisionPageQuery>) => {
  const { t } = useTranslation()

  const heroContent: IPageHeroContent = {
    title: t("page-roadmap-vision-title"),
    header: t("page-roadmap-vision-future"),
    subtitle: t("page-roadmap-vision-subtitle"),
    image: getImage(data.oldship)!,
    alt: t("page-eth-whats-eth-hero-alt"),
  }

  return (
    <Page>
      <PageMetadata
        title={t("page-roadmap-vision-meta-title")}
        description={t("page-roadmap-vision-meta-desc")}
      />
      <PageHero content={heroContent} />
      <PageDivider />
      <PageContent>
        <Breadcrumbs slug={location.pathname} startDepth={1} />
        <CentralContent>
          <CenterH2>
            <Translation id="page-roadmap-vision-upgrade-needs" />
          </CenterH2>
          <Text>
            <Translation id="page-roadmap-vision-upgrade-needs-desc" />
          </Text>
          <Text>
            <Translation id="page-roadmap-vision-upgrade-needs-desc-2" />
          </Text>
          <Text>
            <Translation id="page-roadmap-vision-upgrade-needs-desc-3" />{" "}
          </Text>
          <List listStyleType="disc">
            <ListItem>
              <Link to="https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum">
                <Translation id="page-roadmap-vision-2022" />
              </Link>
            </ListItem>
            <ListItem>
              <Link to="https://trent.mirror.xyz/82eyq_NXZzzqFmCNXiKJgSdayf6omCW7BgDQIneyPoA">
                <Translation id="page-roadmap-vision-2021-updates" />
              </Link>
            </ListItem>
            <ListItem>
              <Link to="https://tim.mirror.xyz/CHQtTJb1NDxCK41JpULL-zAJe7YOtw-m4UDw6KDju6c">
                <Translation id="page-roadmap-vision-2021" />
              </Link>
            </ListItem>
            <ListItem>
              <Link to="https://blog.ethereum.org/2015/03/03/ethereum-launch-process/">
                <Translation id="page-roadmap-vision-upgrade-needs-serenity" />
              </Link>
            </ListItem>
            <ListItem>
              <Link to="https://blog.ethereum.org/2014/01/15/slasher-a-punitive-proof-of-stake-algorithm/">
                <Translation id="page-roadmap-vision-2014" />
              </Link>
            </ListItem>
          </List>
          <Text>
            <Translation id="page-roadmap-vision-upgrade-needs-desc-5" />
          </Text>
          <Text>
            <Translation id="page-roadmap-vision-upgrade-needs-desc-6" />
          </Text>
        </CentralContent>
      </PageContent>
      <PageDivider />
      <PageContent>
        <CenterH2>
          <Translation id="page-roadmap-vision-problems" />
        </CenterH2>
        <ProblemCardContainer>
          {paths.map((path, idx) => (
            <CentreCard
              key={idx}
              emoji={path.emoji}
              title={path.title}
              description={path.description}
            />
          ))}
        </ProblemCardContainer>
      </PageContent>
      <TrilemmaContent>
        <Trilemma />
      </TrilemmaContent>
      <PageDivider />
      <PageContent>
        <CentralContent>
          <CenterH2>
            <Translation id="page-roadmap-vision-understanding" />
          </CenterH2>
          <H3>
            <Translation id="page-roadmap-vision-scalability" />{" "}
            <Emoji text=":rocket:" />
          </H3>
          <Text>
            <Translation id="page-roadmap-vision-scalability-desc" />
          </Text>
          <Text>
            <Translation id="page-roadmap-vision-scalability-desc-3" />
          </Text>
          <Text>
            <Translation id="page-roadmap-vision-scalability-desc-4" />{" "}
            <Link to="/roadmap/danksharding/">
              <Translation id="page-roadmap-vision-danksharding" />
            </Link>{" "}
          </Text>
          <H3>
            <Translation id="page-roadmap-vision-security" />{" "}
            <Emoji text=":shield:" />
          </H3>
          <Text>
            <Translation id="page-roadmap-vision-security-desc" />
          </Text>
          <Text>
            <Translation id="page-roadmap-vision-security-desc-3" />{" "}
            <Link to="/developers/docs/consensus-mechanisms/pos/">
              <Translation id="page-upgrades-proof-stake-link" />
            </Link>{" "}
          </Text>
          <Text>
            <Translation id="page-roadmap-vision-security-desc-5" />{" "}
            <Link to="/developers/docs/consensus-mechanisms/pow/">
              <Translation id="page-roadmap-vision-security-desc-5-link" />
            </Link>
          </Text>
          <Text>
            <Translation id="page-roadmap-vision-security-desc-10" />
          </Text>
          <Text>
            <Translation id="page-roadmap-vision-security-validator" />{" "}
            <Link to="/run-a-node/">
              <Translation id="page-roadmap-vision-ethereum-node" />
            </Link>
          </Text>
          <ButtonLink to="/staking/">
            <Translation id="page-roadmap-vision-security-staking" />
          </ButtonLink>
          <H3>
            <Translation id="page-roadmap-vision-sustainability" />{" "}
            <Emoji text=":evergreen_tree:" />
          </H3>
          <Text>
            <Translation id="page-roadmap-vision-sustainability-subtitle" />
          </Text>
          <Text>
            <Translation id="page-roadmap-vision-sustainability-desc-1" />{" "}
            <Link to="/developers/docs/consensus-mechanisms/pow/mining/">
              <Translation id="page-roadmap-vision-mining" />
            </Link>
          </Text>
          <Text>
            <Translation id="page-roadmap-vision-sustainability-desc-2" />{" "}
            <Link to="/staking/">
              <Translation id="page-roadmap-vision-staking-lower" />
            </Link>
          </Text>
          <Text>
            <Translation id="page-roadmap-vision-sustainability-desc-3" />
          </Text>
          <InfoBanner>
            <Text>
              <Translation id="page-roadmap-vision-sustainability-desc-8" />
            </Text>
            <ButtonLink to="/roadmap/merge/">
              <Translation id="page-upgrades-merge-btn" />
            </ButtonLink>
          </InfoBanner>
        </CentralContent>
      </PageContent>
      <PageDivider />
      <FeedbackCard />
    </Page>
  )
}

export default VisionPage

export const query = graphql`
  query UpgradesVisionPage($languagesToFetch: [String!]!) {
    locales: allLocale(
      filter: {
        language: { in: $languagesToFetch }
        ns: { in: ["page-roadmap-vision", "page-upgrades-index", "common"] }
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
    oldship: file(relativePath: { eq: "upgrades/oldship.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 800
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    rhino: file(relativePath: { eq: "upgrades/upgrade_rhino.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 600
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    merge: file(relativePath: { eq: "upgrades/merge.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
  }
`
