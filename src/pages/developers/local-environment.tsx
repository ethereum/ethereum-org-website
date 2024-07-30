import { GetStaticProps, InferGetStaticPropsType } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import {
  Box,
  Flex,
  ListItem,
  SimpleGrid,
  UnorderedList,
} from "@chakra-ui/react"

import { BasePageProps, ChildOnlyProp, Lang } from "@/lib/types"
import { Framework } from "@/lib/interfaces"

import FeedbackCard from "@/components/FeedbackCard"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import Heading from "@/components/OldHeading"
import Text from "@/components/OldText"
import PageMetadata from "@/components/PageMetadata"
import ProductCard from "@/components/ProductCard"
import Translation from "@/components/Translation"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { runOnlyOnce } from "@/lib/utils/runOnlyOnce"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { getLocalEnvironmentFrameworkData } from "@/lib/api/ghRepoData"
import EthBlocksImage from "@/public/images/developers-eth-blocks.png"

const Content = ({ children }: ChildOnlyProp) => {
  return (
    <Box as={MainArticle} py={4} px={8} w="full">
      {children}
    </Box>
  )
}

const Column = ({ children }: ChildOnlyProp) => {
  return (
    <Box
      flex="1 0 33%"
      justifyContent="flex-end"
      mb={6}
      me={8}
      w="full"
      maxW={{ base: "full", md: "none" }}
    >
      {children}
    </Box>
  )
}

type Props = BasePageProps & {
  frameworksList: Framework[]
}

const cachedFetchLocalEnvironmentFrameworkData = runOnlyOnce(
  getLocalEnvironmentFrameworkData
)

export const getStaticProps = (async ({ locale }) => {
  const requiredNamespaces = getRequiredNamespacesForPage(
    "/developers/local-environment"
  )

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  const frameworksListData = await cachedFetchLocalEnvironmentFrameworkData()

  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      contentNotTranslated,
      frameworksList: frameworksListData,
      lastDeployLocaleTimestamp,
    },
  }
}) satisfies GetStaticProps<Props>

const LocalEnvironmentPage = ({
  frameworksList,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation("page-developers-local-environment")

  return (
    <Flex direction="column" alignItems="center" w="full" mx="auto" mt={16}>
      <PageMetadata
        title={t("page-local-environment-setup-meta-title")}
        description={t("page-local-environment-setup-meta-desc")}
      />
      <Box
        pt={{ base: 0, xl: 4 }}
        pb={{ base: 8, xl: 4 }}
        px={8}
        w="full"
        mb={8}
        justifyContent="center"
      >
        <Heading
          as="h1"
          fontStyle="normal"
          fontFamily="monospace"
          textTransform="uppercase"
          fontWeight="semibold"
          fontSize="2rem"
          lineHeight={1.4}
          textAlign="center"
          mt={0}
          mb="1.625rem"
        >
          <Translation id="page-developers-local-environment:page-local-environment-setup-title" />
        </Heading>
        <Text
          fontSize="xl"
          lineHeight={1.4}
          color="text200"
          mb={2}
          textAlign="center"
        >
          <Translation id="page-developers-local-environment:page-local-environment-setup-subtitle" />
          <br />
          <Translation id="page-developers-local-environment:page-local-environment-setup-subtitle-2" />
        </Text>
      </Box>
      <Content>
        <Flex
          direction={{ base: "column-reverse", lg: "row" }}
          alignItems={{ base: "flex-start", lg: "center" }}
          w="full"
          justifyContent="space-between"
        >
          <Column>
            <Heading
              fontSize={{ base: "2xl", md: "2rem" }}
              lineHeight={1.4}
              mt={0}
              mb="1.625rem"
            >
              <Translation id="page-developers-local-environment:page-local-environment-frameworks-title" />
            </Heading>
            <Text>
              <Translation id="page-developers-local-environment:page-local-environment-frameworks-desc" />
            </Text>
            <Text>
              <Translation id="page-developers-local-environment:page-local-environment-framework-features" />
            </Text>
            <UnorderedList>
              <ListItem>
                <Translation id="page-developers-local-environment:page-local-environment-framework-feature-1" />
              </ListItem>
              <ListItem>
                <Translation id="page-developers-local-environment:page-local-environment-framework-feature-2" />
              </ListItem>
              <ListItem>
                <Translation id="page-developers-local-environment:page-local-environment-framework-feature-3" />
              </ListItem>
              <ListItem>
                <Translation id="page-developers-local-environment:page-local-environment-framework-feature-4" />
              </ListItem>
              <ListItem>
                <Translation id="page-developers-local-environment:page-local-environment-framework-feature-5" />
              </ListItem>
            </UnorderedList>
          </Column>
          <Column>
            <Image
              flex="1 1 100%"
              backgroundSize="cover"
              backgroundRepeat="no-repeat"
              src={EthBlocksImage}
              alt={t("page-developers-index:alt-eth-blocks")}
              loading="eager"
            />
          </Column>
        </Flex>
        <SimpleGrid minChildWidth="min(100%, 280px)" spacing={8}>
          {frameworksList.map((framework, idx) => (
            <ProductCard
              key={idx}
              url={framework.url}
              background={framework.background}
              image={framework.image!}
              name={framework.name}
              alt={t(framework.alt)}
              githubUrl={framework.githubUrl}
              githubRepoStars={framework.starCount}
              githubRepoLanguages={framework.languages}
            >
              {t(framework.description)}
            </ProductCard>
          ))}
        </SimpleGrid>
      </Content>
      <Content>
        <FeedbackCard />
      </Content>
    </Flex>
  )
}

export default LocalEnvironmentPage
