import React, {
  useState,
  useEffect,
  ReactNode,
  ComponentPropsWithRef,
} from "react"
import {
  Box,
  chakra,
  Divider,
  DividerProps,
  Flex,
  Grid,
  Heading,
  HeadingProps,
  List,
  ListItem,
  Text,
  useTheme,
  useToken,
} from "@chakra-ui/react"
import { graphql, PageProps } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { shuffle } from "lodash"

import Card from "../../../components/Card"
import Leaderboard, { Person } from "../../../components/Leaderboard"
import CalloutBanner from "../../../components/CalloutBanner"
import Emoji from "../../../components/Emoji"
import ProductCard from "../../../components/ProductCard"
import ButtonLink from "../../../components/ButtonLink"
import PageMetadata from "../../../components/PageMetadata"
import CardList from "../../../components/CardList"
import Translation from "../../../components/Translation"
import Link from "../../../components/Link"
import Breadcrumbs from "../../../components/Breadcrumbs"
import FeedbackCard from "../../../components/FeedbackCard"
import { getImage, ImageDataLike } from "../../../utils/image"
import { ChildOnlyProp } from "../../../types"

const Page = (props: ChildOnlyProp) => (
  <Flex direction="column" align="center" w="full" {...props} />
)

const PageDivider = (props: DividerProps) => (
  <Divider
    my={16}
    w="10%"
    borderBottomWidth="0.25rem"
    borderColor="homeDivider"
    {...props}
  />
)

const PageContent = (props: ChildOnlyProp) => (
  <Box py={4} px={8} w="full" {...props} />
)

const H2 = (props: HeadingProps) => (
  <Heading
    mt={12}
    mb={8}
    fontSize={{ base: "2xl", md: "2rem" }}
    fontWeight="semibold"
    lineHeight={1.4}
    {...props}
  />
)

const H3 = (props: HeadingProps) => (
  <Heading
    as="h3"
    fontSize={{ base: "xl", md: "2xl" }}
    fontWeight="semibold"
    lineHeight={1.4}
    {...props}
  />
)

const StyledCardContainer = (props: ChildOnlyProp) => (
  <Flex wrap="wrap" mt={8} mb={12} mx={-4} {...props} />
)

const StyledCardGrid = (props: ChildOnlyProp) => (
  <Grid
    mt={8}
    mb={12}
    gap={8}
    templateColumns="repeat(auto-fill, minmax(min(100%, 280px), 1fr))"
    {...props}
  />
)

const StyledGrayContainer = (props: ChildOnlyProp) => {
  const tableItemBoxShadow = useToken("colors", "tableItemBoxShadow")

  return (
    <Box
      w="full"
      pt={16}
      pb={8}
      px={0}
      mt={8}
      mb={12}
      bg="grayBackground"
      boxShadow={`inset 0px 1px 0px ${tableItemBoxShadow}`}
      {...props}
    />
  )
}

const SloganGradient = (props: ChildOnlyProp) => {
  const upgradesGradient = useToken("colors", "upgradesGradient")

  return (
    <Box
      fontSize={{ base: "2.5rem", lg: "5xl" }}
      fontWeight="extrabold"
      lineHeight="140%"
      maxW="720px"
      mt={4}
      mb={0}
      mx="auto"
      bgImage={upgradesGradient}
      bgClip="text"
      sx={{
        "&": {
          "-webkit-text-fill-color": "transparent",
        },
      }}
      {...props}
    />
  )
}

const Subtitle = (props: ChildOnlyProp) => (
  <Flex
    justify="center"
    textAlign="center"
    color="text200"
    lineHeight="140%"
    fontSize="2xl"
    mt={4}
    {...props}
  />
)

const HeroContainer = (props: ChildOnlyProp) => (
  <Box
    pl={0}
    pt={{ base: 8, lg: 32 }}
    pb={32}
    w={{ base: "full", lg: "50%" }}
    {...props}
  />
)

const HeroCard = (props: ChildOnlyProp) => (
  <Flex
    justify="center"
    textAlign="center"
    mt={{ base: 4, lg: -8 }}
    {...props}
  />
)

const StyledCard = (props: ComponentPropsWithRef<typeof Card>) => (
  <Card flex="1 1 30%" minW="240px" m={4} p={6} {...props} />
)

const StyledCardList = (props: ComponentPropsWithRef<typeof CardList>) => (
  <Box as={CardList} mr={8} {...props} />
)

const LeaderboardContainer = (props: ChildOnlyProp) => (
  <Flex
    align="center"
    direction="column"
    w={{ base: "full", md: "50%" }}
    pl={0}
    pt={8}
    {...props}
  />
)

const Row = (props: ChildOnlyProp) => (
  <Flex align="center" direction={{ base: "column", md: "row" }} {...props} />
)

const ReverseRow = (props: ChildOnlyProp) => (
  <Flex
    align="center"
    direction={{ base: "column-reverse", md: "row" }}
    {...props}
  />
)

const LeftColumn = (props: ChildOnlyProp) => (
  <Box
    w={{ base: "full", md: "50%" }}
    mr={16}
    ml={{ base: 16, md: 0 }}
    {...props}
  />
)

const RightColumn = (props: ChildOnlyProp) => (
  <Box
    w={{ base: "full", md: "50%" }}
    mr={{ base: 16, md: 0 }}
    ml={16}
    {...props}
  />
)

const Staking = (props: ChildOnlyProp) => (
  <Flex
    direction="column"
    w="full"
    mt={8}
    mb={-8}
    p={16}
    background="cardGradient"
    {...props}
  />
)

const StyledCalloutBanner = chakra(CalloutBanner, {
  baseStyle: {
    bg: "transparent",
    w: { base: "full", md: "auto" },
    p: { base: 0, md: 12 },
    pt: { base: 16, md: 12 },
  },
})

type Layer = "el" | "cl"

type Client = {
  name: string
  background: string
  description: ReactNode
  alt: string
  url: string
  image: (isDarkTheme?: boolean) => ImageDataLike | null
  githubUrl: string
  isBeta?: boolean
  children?: ReactNode
}

type Clients = {
  [key in Layer]: Array<Client>
}

const GetInvolvedPage = ({
  data,
  location,
}: PageProps<Queries.GetInvolvedPageQuery>) => {
  const { t } = useTranslation()
  const { isDark: isDarkTheme } = useTheme()

  // TODO sort query isn't working :(
  const bountyHunters: Array<Person> = [...data.bountyHunters.nodes].sort(
    (a, b) => {
      if (a.score && b.score) {
        return b.score - a.score
      }

      return 0
    }
  )

  const [clients, setClients] = useState<Clients>({ el: [], cl: [] })

  useEffect(() => {
    const executionClients: Array<Client> = [
      {
        name: "Besu",
        background: "#546D78",
        description: (
          <Translation id="page-upgrades-get-involved-written-java" />
        ),
        alt: t("consensus-client-besu-logo-alt"),
        url: "https://besu.hyperledger.org/en/stable/HowTo/Get-Started/Install-Binaries/",
        image: () => data.besu,
        githubUrl: "https://github.com/hyperledger/besu",
      },
      {
        name: "Erigon",
        background: "#3A4B56",
        description: <Translation id="page-upgrades-get-involved-written-go" />,
        alt: t("consensus-client-erigon-logo-alt"),
        url: "https://github.com/ledgerwatch/erigon#erigon",
        image: () => data.erigon,
        githubUrl: "https://github.com/ledgerwatch/erigon",
      },
      {
        name: "Geth",
        background: "#303D4E",
        description: <Translation id="page-upgrades-get-involved-written-go" />,
        alt: t("consensus-client-geth-logo-alt"),
        url: "https://geth.ethereum.org/docs/getting-started",
        image: () => data.geth,
        githubUrl: "https://github.com/ethereum/go-ethereum",
      },
      {
        name: "Nethermind",
        background: "#21222D",
        description: (
          <Translation id="page-upgrades-get-involved-written-c-sharp" />
        ),
        alt: t("consensus-client-lodestar-logo-alt"),
        url: "https://docs.nethermind.io/nethermind/",
        image: () => data.nethermind,
        githubUrl: "https://github.com/NethermindEth/nethermind",
      },
    ]

    const consensusClients: Array<Client> = [
      {
        name: "Prysm",
        background: "#23292e",
        description: <Translation id="page-upgrades-get-involved-written-go" />,
        alt: t("consensus-client-prysm-logo-alt"),
        url: "https://docs.prylabs.network/docs/getting-started/",
        image: () => data.prysm,
        githubUrl: "https://github.com/prysmaticlabs/prysm",
      },
      {
        name: "Lighthouse",
        background: "",
        description: (
          <Translation id="page-upgrades-get-involved-written-rust" />
        ),
        alt: t("consensus-client-lighthouse-logo-alt"),
        url: "https://lighthouse-book.sigmaprime.io/",
        image: (isDarkTheme) =>
          isDarkTheme ? data.lighthouseDark : data.lighthouseLight,
        githubUrl: "https://github.com/sigp/lighthouse",
      },
      {
        name: "Teku",
        background: "#3359d5",
        description: (
          <Translation id="page-upgrades-get-involved-written-java" />
        ),
        alt: t("consensus-client-teku-logo-alt"),
        url: "https://pegasys.tech/teku",
        image: (isDarkTheme) => (isDarkTheme ? data.tekuLight : data.tekuDark),
        githubUrl: "https://github.com/ConsenSys/teku",
      },
      {
        name: "Lodestar",
        background: "#14140b",
        description: (
          <Translation id="page-upgrades-get-involved-written-javascript" />
        ),
        alt: t("consensus-client-lodestar-logo-alt"),
        url: "https://lodestar.chainsafe.io/",
        image: () => data.lodestar,
        githubUrl: "https://github.com/ChainSafe/lodestar",
      },
      {
        name: "Nimbus",
        background: "#dc8600",
        description: (
          <Translation id="page-upgrades-get-involved-written-nim" />
        ),
        alt: t("consensus-client-nimbus-logo-alt"),
        url: "https://nimbus.team/",
        image: () => data.nimbus,
        githubUrl: "https://github.com/status-im/nimbus-eth2",
      },
    ]

    const shuffledExecutionClients = shuffle(executionClients)
    const shuffledConsensusClients = shuffle(consensusClients)
    // Sort beta clients to the end
    const pseudoShuffledConsensusClients = shuffledConsensusClients.sort(
      (_, { isBeta }) => (isBeta ? -1 : 0)
    )
    setClients({
      el: shuffledExecutionClients,
      cl: pseudoShuffledConsensusClients,
    })
  }, [data])

  const ethresearch = [
    {
      title: <Translation id="page-upgrades-get-involved-ethresearch-1" />,
      description: "",
      link: "https://ethresear.ch/c/sharding/6",
    },
    {
      title: <Translation id="page-upgrades-get-involved-ethresearch-2" />,
      description: "",
      link: "https://ethresear.ch/c/the-merge/38",
    },
    {
      title: <Translation id="page-upgrades-get-involved-ethresearch-3" />,
      description: "",
      link: "https://ethresear.ch/c/sharded-execution/35",
    },
    {
      title: <Translation id="page-upgrades-get-involved-ethresearch-4" />,
      description: "",
      link: "https://ethresear.ch/",
    },
  ]

  const paths = [
    {
      emoji: ":computer:",
      title: <Translation id="page-upgrades-get-involved-title-1" />,
      description: <Translation id="page-upgrades-get-involved-desc-1" />,
      url: "#clients",
      button: <Translation id="page-upgrades-get-involved-btn-1" />,
    },
    {
      emoji: ":moneybag:",
      title: <Translation id="page-upgrades-get-involved-title-2" />,
      description: <Translation id="page-upgrades-get-involved-desc-2" />,
      url: "/staking/",
      button: <Translation id="page-upgrades-get-involved-btn-2" />,
    },
    {
      emoji: ":bug:",
      title: <Translation id="page-upgrades-get-involved-title-3" />,
      description: <Translation id="page-upgrades-get-involved-desc-3" />,
      url: "/bug-bounty/",
      button: <Translation id="page-upgrades-get-involved-btn-3" />,
    },
  ]

  const getClientCards = (layer: Layer) => {
    if (!Object.keys(clients).includes(layer)) return
    return (
      <StyledCardGrid>
        {clients[layer].map((client, idx) => (
          <ProductCard
            key={idx}
            url={client.url}
            background={client.background}
            image={getImage(client.image(isDarkTheme))!}
            name={client.name}
            description={client.description}
            alt={client.alt}
            githubUrl={client.githubUrl}
            hideStars={true}
          >
            {client.children}
          </ProductCard>
        ))}
      </StyledCardGrid>
    )
  }

  return (
    <Page>
      <PageMetadata
        title={t("page-upgrades-get-involved")}
        description={t("page-upgrades-get-involved-meta-description")}
      />
      <PageContent>
        <HeroCard>
          <HeroContainer>
            <Breadcrumbs slug={location.pathname} startDepth={1} />
            <SloganGradient>
              <Translation id="page-upgrades-get-involved" />{" "}
              <Emoji text=":wave:" />
            </SloganGradient>
            <Subtitle>
              <Translation id="page-upgrades-get-involved-subtitle" />
            </Subtitle>
          </HeroContainer>
        </HeroCard>
        <H2>
          <Translation id="page-upgrades-get-involved-how" />
        </H2>
        <Text>
          <Translation id="page-upgrades-get-involved-how-desc" />
        </Text>
        <StyledCardContainer>
          {paths.map((path, idx) => (
            <StyledCard
              key={idx}
              emoji={path.emoji}
              title={path.title}
              description={path.description}
            >
              <ButtonLink to={path.url}>{path.button}</ButtonLink>
            </StyledCard>
          ))}
        </StyledCardContainer>
      </PageContent>
      <PageDivider id="clients" />
      <PageContent>
        <H2>
          <Translation id="page-upgrades-get-involved-run-clients" />
        </H2>
        <Text>
          <Translation id="page-upgrades-get-involved-run-clients-desc" />{" "}
          <Link to="https://clientdiversity.org">
            <Translation id="page-upgrades-get-involved-run-clients-desc-link" />
          </Link>
        </Text>
        <H3>
          <Translation id="page-upgrades-get-involved-run-clients-execution" />
        </H3>
        <Text>
          <Translation id="page-upgrades-get-involved-run-clients-execution-desc" />
        </Text>
        {getClientCards("el")}
        <H3>
          <Translation id="page-upgrades-get-involved-run-clients-consensus" />
        </H3>
        <Text>
          <Translation id="page-upgrades-get-involved-run-clients-consensus-desc" />
        </Text>
        {getClientCards("cl")}
      </PageContent>
      <Staking>
        <StyledCalloutBanner
          image={getImage(data.rhino)!}
          alt={t("page-staking-image-alt")}
          titleKey={"page-upgrades-get-involved-stake"}
          descriptionKey={"page-upgrades-get-involved-stake-desc"}
          sx={{
            "&": {
              ml: 0,
            },
          }}
        >
          <Box>
            <ButtonLink to="/staking/">
              <Translation id="page-upgrades-get-involved-stake-eth" />
            </ButtonLink>
          </Box>
        </StyledCalloutBanner>
      </Staking>
      <StyledGrayContainer>
        <PageContent>
          <Row>
            <LeftColumn>
              <H2 id="#bug-bounty">
                <Translation id="page-upgrades-get-involved-bug-hunting" />
              </H2>
              <Text>
                <Translation id="page-upgrades-get-involved-bug-hunting-desc" />
              </Text>
              <Text>
                <Translation id="page-upgrades-get-involved-bug" />
              </Text>
              <List listStyleType="disc">
                <ListItem>
                  <Translation id="page-upgrades-get-involved-bug-li" />
                </ListItem>
                <ListItem>
                  <Translation id="page-upgrades-get-involved-bug-li-2" />
                </ListItem>
                <ListItem>
                  <Translation id="page-upgrades-get-involved-bug-li-3" />
                </ListItem>
                <ListItem>
                  <Translation id="page-upgrades-get-involved-bug-li-4" />
                </ListItem>
              </List>
              <ButtonLink to="/bug-bounty/">
                <Translation id="page-upgrades-get-involved-bug-hunting" />
              </ButtonLink>
            </LeftColumn>
            <LeaderboardContainer>
              <Leaderboard content={bountyHunters} limit={5} />
            </LeaderboardContainer>
          </Row>
        </PageContent>
      </StyledGrayContainer>
      <PageContent>
        <ReverseRow>
          <LeftColumn>
            <StyledCardList content={ethresearch} />
          </LeftColumn>
          <RightColumn>
            <H2>
              <Translation id="page-upgrades-get-involved-join" />
            </H2>
            <Text>
              <Translation id="page-upgrades-get-involved-join-desc" />
            </Text>
          </RightColumn>
        </ReverseRow>
      </PageContent>
      <FeedbackCard />
    </Page>
  )
}

export default GetInvolvedPage

export const Clients = graphql`
  fragment Clients on File {
    childImageSharp {
      gatsbyImageData(
        width: 80
        layout: FIXED
        placeholder: BLURRED
        quality: 100
      )
    }
  }
`

export const query = graphql`
  query GetInvolvedPage($languagesToFetch: [String!]!) {
    locales: allLocale(
      filter: {
        language: { in: $languagesToFetch }
        ns: { in: ["page-upgrades-get-involved", "common"] }
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
    bountyHunters: allConsensusBountyHuntersCsv(sort: { score: DESC }) {
      nodes {
        username
        name
        score
      }
    }
    rhino: file(relativePath: { eq: "upgrades/upgrade_rhino.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 800
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    besu: file(relativePath: { eq: "upgrades/besu-card.png" }) {
      ...Clients
    }
    erigon: file(relativePath: { eq: "upgrades/erigon-card.png" }) {
      ...Clients
    }
    geth: file(relativePath: { eq: "upgrades/geth.png" }) {
      ...Clients
    }
    lighthouseLight: file(
      relativePath: { eq: "upgrades/lighthouse-light.png" }
    ) {
      ...Clients
    }
    lighthouseDark: file(relativePath: { eq: "upgrades/lighthouse-dark.png" }) {
      ...Clients
    }
    lodestar: file(relativePath: { eq: "upgrades/lodestar.png" }) {
      ...Clients
    }
    nethermind: file(relativePath: { eq: "upgrades/nethermind-card.png" }) {
      ...Clients
    }
    nimbus: file(relativePath: { eq: "upgrades/nimbus.png" }) {
      ...Clients
    }
    prysm: file(relativePath: { eq: "upgrades/prysm.png" }) {
      ...Clients
    }
    tekuDark: file(relativePath: { eq: "upgrades/teku-dark.png" }) {
      ...Clients
    }
    tekuLight: file(relativePath: { eq: "upgrades/teku-light.png" }) {
      ...Clients
    }
  }
`
