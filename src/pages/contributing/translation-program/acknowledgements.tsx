// Libraries
import React from "react"
import { graphql, PageProps } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"
import {
  Box,
  BoxProps,
  Flex,
  HeadingProps,
  List,
  ListItem,
  useColorModeValue,
} from "@chakra-ui/react"
import type { Context } from "../../../types"

// Components
import ActionCard from "../../../components/ActionCard"
import Breadcrumbs from "../../../components/Breadcrumbs"
import InlineLink from "../../../components/Link"
import PageMetadata from "../../../components/PageMetadata"
import Translation from "../../../components/Translation"
import TranslationLeaderboard from "../../../components/TranslationLeaderboard"
import FeedbackCard from "../../../components/FeedbackCard"
import Text from "../../../components/OldText"
import OldHeading from "../../../components/OldHeading"
import GatsbyImage, {
  type GatsbyImageType,
} from "../../../components/GatsbyImage"

// Utils
import { getImage } from "../../../utils/image"

const Content = (props: BoxProps) => <Box py={4} px={8} w="full" {...props} />

const ContentHeading = (props: HeadingProps) => (
  <OldHeading lineHeight={1.4} {...props} />
)

const Image: GatsbyImageType = (props) => {
  return (
    <GatsbyImage
      maxH={{ base: "300px", sm: "none" }}
      maxW={{ base: "300px", sm: "none" }}
      backgroundSize="contain"
      objectFit="contain"
      {...props}
    />
  )
}

const TranslatorAcknowledgements = ({
  data,
  location,
}: PageProps<Queries.TranslatorAcknowledgementsPageQuery, Context>) => {
  const { t } = useTranslation()
  const themedCertificateImage = useColorModeValue(
    data.lightThemeCertificate,
    data.darkThemeCertificate
  )

  return (
    <Flex direction="column" align="center" w="full">
      <PageMetadata
        title={t(
          "page-contributing-translation-program-acknowledgements-meta-title"
        )}
        description={t(
          "page-contributing-translation-program-acknowledgements-meta-description"
        )}
      />

      <Content>
        <Breadcrumbs slug={location.pathname} />
        <ContentHeading
          as="h1"
          fontSize={{ base: "2rem", sm: "2.5rem", md: "5xl" }}
        >
          <Translation id="page-contributing-translation-program-acknowledgements-acknowledgement-page-title" />
        </ContentHeading>
        <Flex
          direction={{ base: "column", lg: "row" }}
          align={{ base: "flex-start", lg: "normal" }}
          w="full"
          ml={0}
          mr={{ base: 0, lg: 8 }}
        >
          {/* LEFT COLUMN */}
          <Box
            m={{ base: "auto 0", lg: "0 2rem 0 0" }}
            w={{ base: "full", lg: "50%" }}
          >
            <Text>
              <Translation id="page-contributing-translation-program-acknowledgements-acknowledgement-page-1" />
            </Text>
            <Text>
              <Translation id="page-contributing-translation-program-acknowledgements-acknowledgement-page-2" />
            </Text>
            <Text>
              <Translation id="page-contributing-translation-program-acknowledgements-acknowledgement-page-3" />{" "}
              <InlineLink to="/contributing/translation-program/contributors/">
                <Translation id="page-contributing-translation-program-acknowledgements-acknowledgement-page-link" />
              </InlineLink>
              .
            </Text>
            <Text>
              <Translation id="page-contributing-translation-program-acknowledgements-acknowledgement-page-4" />
            </Text>
            {/* TODO: add certification section */}
            {/* <p>
              <Translation id="page-contributing-translation-program-acknowledgements-acknowledgement-page-5" />
            </p> */}
          </Box>
          {/* RIGHT COLUMN */}
          <Box
            m={{ base: "auto 0", lg: "0 0 0 2rem" }}
            w={{ base: "full", lg: "50%" }}
          >
            <Image
              image={getImage(data.dogeComputer)!}
              alt={t(
                "page-contributing-translation-program-acknowledgements-hero-image-alt"
              )}
            />
          </Box>
        </Flex>
      </Content>

      <Content maxW="800px">
        <ContentHeading
          as="h2"
          textAlign="center"
          fontSize={{ base: "2xl", md: "2rem" }}
          fontWeight={600}
        >
          <Translation id="page-contributing-translation-program-acknowledgements-translation-leaderboard-title" />
        </ContentHeading>
        <TranslationLeaderboard
          monthData={data.monthData}
          quarterData={data.quarterData}
          allTimeData={data.allTimeData}
        />
        <Text>
          <Translation id="page-contributing-translation-program-acknowledgements-translation-leaderboard-1" />
        </Text>
      </Content>

      <Content>
        <ContentHeading
          as="h2"
          fontSize={{ base: "2xl", md: "2rem" }}
          fontWeight={600}
        >
          <Translation id="page-contributing-translation-program-acknowledgements-our-translators-title" />
        </ContentHeading>
        <Text>
          <Translation id="page-contributing-translation-program-acknowledgements-our-translators-1" />
        </Text>
        <Box
          as={ActionCard}
          to="/contributing/translation-program/contributors/"
          title={t(
            "page-contributing-translation-program-acknowledgements-our-translators-view-all"
          )}
          description={t(
            "page-contributing-translation-program-acknowledgements-our-translators-cta"
          )}
          image={getImage(data.ethereum)!}
          display={{ base: "block", sm: "flex" }}
          flex="none"
          my={8}
          mx={0}
          sx={{
            ".action-card-image-wrapper": {
              p: 4,
              minW: { sm: "260px" },
            },
            ".action-card-content": {
              display: { sm: "flex" },
              justifyContent: { sm: "center" },
              flexDirection: { sm: "column" },
              ml: { sm: 4 },
            },
            p: {
              mb: 0,
            },
          }}
        />
      </Content>

      <Content id="certificate">
        <ContentHeading
          as="h2"
          fontSize={{ base: "2xl", md: "2rem" }}
          fontWeight={600}
        >
          <Translation id="page-contributing-translation-program-acknowledgements-cert-title" />
        </ContentHeading>
        <Text>
          <Translation id="page-contributing-translation-program-acknowledgements-cert-1" />
        </Text>
        <Text>
          <Translation id="page-contributing-translation-program-acknowledgements-cert-2" />
        </Text>
        <Text>
          <Translation id="page-contributing-translation-program-acknowledgements-cert-3" />
        </Text>
        <Flex justify="center">
          <Image
            image={getImage(themedCertificateImage)!}
            alt="translator certificate"
          />
        </Flex>
      </Content>

      <Content id="poap">
        <ContentHeading
          as="h2"
          fontSize={{ base: "2xl", md: "2rem" }}
          fontWeight={600}
        >
          <Translation id="page-contributing-translation-program-acknowledgements-poaps-title" />
        </ContentHeading>
        <Text>
          <Translation id="page-contributing-translation-program-acknowledgements-1" />
        </Text>
        <Text>
          <Translation id="page-contributing-translation-program-acknowledgements-2" />
        </Text>
        <Text>
          <Translation id="page-contributing-translation-program-acknowledgements-3" />
        </Text>
        <ContentHeading
          as="h3"
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight={600}
        >
          <Translation id="page-contributing-translation-program-acknowledgements-how-to-claim-title" />
        </ContentHeading>

        <List as="ol" styleType="decimal">
          <ListItem>
            <Translation id="page-contributing-translation-program-acknowledgements-how-to-claim-1" />{" "}
            <InlineLink to="https://discord.gg/ethereum-org">
              <Translation id="page-contributing-translation-program-acknowledgements-how-to-claim-1-discord" />
            </InlineLink>
          </ListItem>
          <ListItem>
            <Translation id="page-contributing-translation-program-acknowledgements-how-to-claim-2" />
          </ListItem>
          <ListItem>
            <Translation id="page-contributing-translation-program-acknowledgements-how-to-claim-3" />
          </ListItem>
          <ListItem>
            <Translation id="page-contributing-translation-program-acknowledgements-how-to-claim-4" />
          </ListItem>
        </List>
        <Text>
          <Translation id="page-contributing-translation-program-acknowledgements-4" />
        </Text>
      </Content>
      <Content>
        <FeedbackCard />
      </Content>
    </Flex>
  )
}

export default TranslatorAcknowledgements

export const query = graphql`
  query TranslatorAcknowledgementsPage($languagesToFetch: [String!]!) {
    locales: allLocale(
      filter: {
        language: { in: $languagesToFetch }
        ns: {
          in: [
            "page-contributing-translation-program-acknowledgements"
            "common"
          ]
        }
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
    dogeComputer: file(relativePath: { eq: "doge-computer.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 500
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    lightThemeCertificate: file(
      relativePath: { eq: "certificates/light-certificate.png" }
    ) {
      childImageSharp {
        gatsbyImageData(
          width: 800
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    darkThemeCertificate: file(
      relativePath: { eq: "certificates/dark-certificate.png" }
    ) {
      childImageSharp {
        gatsbyImageData(
          width: 800
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    ethereum: file(relativePath: { eq: "what-is-ethereum.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 220
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    allTimeData: alltimeJson {
      data {
        user {
          totalCosts
          username
          fullName
          avatarUrl
        }
        languages {
          language {
            totalCosts
            name
          }
        }
      }
    }
    quarterData: quarterJson {
      data {
        user {
          totalCosts
          username
          fullName
          avatarUrl
        }
        languages {
          language {
            totalCosts
            name
          }
        }
      }
    }
    monthData: monthJson {
      data {
        user {
          totalCosts
          username
          fullName
          avatarUrl
        }
        languages {
          language {
            totalCosts
            name
          }
        }
      }
    }
  }
`
