import { useRouter } from "next/router"
import { GetStaticProps } from "next/types"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import {
  Box,
  BoxProps,
  Flex,
  HeadingProps,
  List,
  ListItem,
  useColorModeValue,
} from "@chakra-ui/react"

import { BasePageProps } from "@/lib/types"

import ActionCard from "@/components/ActionCard"
import Breadcrumbs from "@/components/Breadcrumbs"
import FeedbackCard from "@/components/FeedbackCard"
import { Image } from "@/components/Image"
import InlineLink from "@/components/Link"
import MainArticle from "@/components/MainArticle"
import OldHeading from "@/components/OldHeading"
import Text from "@/components/OldText"
import PageMetadata from "@/components/PageMetadata"
import TranslationLeaderboard from "@/components/TranslationLeaderboard"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import allTimeData from "../../../data/translation-reports/alltime/alltime-data.json"
import monthData from "../../../data/translation-reports/month/month-data.json"
import quarterData from "../../../data/translation-reports/quarter/quarter-data.json"

import darkThemeCertificateImg from "@/public/certificates/dark-certificate.png"
import lightThemeCertificateImg from "@/public/certificates/light-certificate.png"
import dogeComputerImg from "@/public/doge-computer.png"
import whatIsEthereumImg from "@/public/what-is-ethereum.png"

const Content = (props: BoxProps) => (
  <Box as={MainArticle} py={4} px={10} w="full" {...props} />
)

const ContentHeading = (props: HeadingProps) => (
  <OldHeading lineHeight={1.4} {...props} />
)

export const getStaticProps = (async ({ locale }) => {
  const lastDeployDate = getLastDeployDate()

  const requiredNamespaces = getRequiredNamespacesForPage(
    "/contributing/translation-program/acknowledgements"
  )

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      contentNotTranslated,
      lastDeployDate,
    },
  }
}) satisfies GetStaticProps<BasePageProps>

const TranslatorAcknowledgements = () => {
  const router = useRouter()
  const { t } = useTranslation(
    "page-contributing-translation-program-acknowledgements"
  )

  const themedCertificateImage = useColorModeValue(
    lightThemeCertificateImg,
    darkThemeCertificateImg
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
        <Breadcrumbs slug={router.asPath} mt={12} />
        <ContentHeading
          as="h1"
          fontSize={{ base: "2rem", sm: "2.5rem", md: "5xl" }}
        >
          {t(
            "page-contributing-translation-program-acknowledgements-acknowledgement-page-title"
          )}
        </ContentHeading>
        <Flex
          direction={{ base: "column", lg: "row" }}
          align={{ base: "flex-start", lg: "normal" }}
          w="full"
          ms={0}
          me={{ base: 0, lg: 8 }}
        >
          {/* LEFT COLUMN */}
          <Box
            m={{ base: "auto 0", lg: "0 2rem 0 0" }}
            w={{ base: "full", lg: "50%" }}
          >
            <Text>
              {t(
                "page-contributing-translation-program-acknowledgements-acknowledgement-page-1"
              )}
            </Text>
            <Text>
              {t(
                "page-contributing-translation-program-acknowledgements-acknowledgement-page-2"
              )}
            </Text>
            <Text>
              {t(
                "page-contributing-translation-program-acknowledgements-acknowledgement-page-3"
              )}{" "}
              <InlineLink href="/contributing/translation-program/contributors/">
                {t(
                  "page-contributing-translation-program-acknowledgements-acknowledgement-page-link"
                )}
              </InlineLink>
              .
            </Text>
            <Text>
              {t(
                "page-contributing-translation-program-acknowledgements-acknowledgement-page-4"
              )}
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
              src={dogeComputerImg}
              w={500}
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
          {t(
            "page-contributing-translation-program-acknowledgements-translation-leaderboard-title"
          )}
        </ContentHeading>
        <TranslationLeaderboard
          monthData={monthData}
          quarterData={quarterData}
          allTimeData={allTimeData}
        />
        <Text>
          {t(
            "page-contributing-translation-program-acknowledgements-translation-leaderboard-1"
          )}
        </Text>
      </Content>

      <Content>
        <ContentHeading
          as="h2"
          fontSize={{ base: "2xl", md: "2rem" }}
          fontWeight={600}
        >
          {t(
            "page-contributing-translation-program-acknowledgements-our-translators-title"
          )}
        </ContentHeading>
        <Text>
          {t(
            "page-contributing-translation-program-acknowledgements-our-translators-1"
          )}
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
          image={whatIsEthereumImg}
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
              ms: { sm: 4 },
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
          {t(
            "page-contributing-translation-program-acknowledgements-cert-title"
          )}
        </ContentHeading>
        <Text>
          {t("page-contributing-translation-program-acknowledgements-cert-1")}
        </Text>
        <Text>
          {t("page-contributing-translation-program-acknowledgements-cert-2")}
        </Text>
        <Text>
          {t("page-contributing-translation-program-acknowledgements-cert-3")}
        </Text>
        <Flex justify="center">
          <Image src={themedCertificateImage} alt="translator certificate" />
        </Flex>
      </Content>

      <Content id="poap">
        <ContentHeading
          as="h2"
          fontSize={{ base: "2xl", md: "2rem" }}
          fontWeight={600}
        >
          {t(
            "page-contributing-translation-program-acknowledgements-poaps-title"
          )}
        </ContentHeading>
        <Text>
          {t("page-contributing-translation-program-acknowledgements-1")}
        </Text>
        <Text>
          {t("page-contributing-translation-program-acknowledgements-2")}
        </Text>
        <Text>
          {t("page-contributing-translation-program-acknowledgements-3")}
        </Text>
        <ContentHeading
          as="h3"
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight={600}
        >
          {t(
            "page-contributing-translation-program-acknowledgements-how-to-claim-title"
          )}
        </ContentHeading>

        <List as="ol" styleType="decimal">
          <ListItem>
            {t(
              "page-contributing-translation-program-acknowledgements-how-to-claim-1"
            )}{" "}
            <InlineLink href="/discord/">
              {t(
                "page-contributing-translation-program-acknowledgements-how-to-claim-1-discord"
              )}
            </InlineLink>
          </ListItem>
          <ListItem>
            {t(
              "page-contributing-translation-program-acknowledgements-how-to-claim-2"
            )}
          </ListItem>
          <ListItem>
            {t(
              "page-contributing-translation-program-acknowledgements-how-to-claim-3"
            )}
          </ListItem>
          <ListItem>
            {t(
              "page-contributing-translation-program-acknowledgements-how-to-claim-4"
            )}
          </ListItem>
        </List>
        <Text>
          {t("page-contributing-translation-program-acknowledgements-4")}
        </Text>
      </Content>
      <Content>
        <FeedbackCard />
      </Content>
    </Flex>
  )
}

export default TranslatorAcknowledgements
