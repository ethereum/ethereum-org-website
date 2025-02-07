import { HTMLAttributes } from "react"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import { BasePageProps, ChildOnlyProp, Lang } from "@/lib/types"
import { Framework } from "@/lib/interfaces"

import FeedbackCard from "@/components/FeedbackCard"
import Heading from "@/components/Heading"
import { TwImage } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import PageMetadata from "@/components/PageMetadata"
import ProductCard from "@/components/ProductCard"
import Translation from "@/components/Translation"
import { Flex, VStack } from "@/components/ui/flex"
import { ListItem, UnorderedList } from "@/components/ui/list"

import { cn } from "@/lib/utils/cn"
import { dataLoader } from "@/lib/utils/data/dataLoader"
import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { getLocalEnvironmentFrameworkData } from "@/lib/api/ghRepoData"
import EthBlocksImage from "@/public/images/developers-eth-blocks.png"

const Content = ({ children }: ChildOnlyProp) => {
  return <MainArticle className="w-full px-8 py-4">{children}</MainArticle>
}

const Column = ({ children }: ChildOnlyProp) => {
  return (
    <div className="mb-6 me-8 w-full max-w-full flex-shrink-0 flex-grow basis-1/3 justify-end md:max-w-none">
      {children}
    </div>
  )
}

const Text = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
  <p className={cn("mb-6", className)} {...props} />
)

const loadData = dataLoader([
  ["frameworksListData", getLocalEnvironmentFrameworkData],
])

type Props = BasePageProps & {
  frameworksList: Framework[]
}

export const getStaticProps = (async ({ locale }) => {
  const requiredNamespaces = getRequiredNamespacesForPage(
    "/developers/local-environment"
  )

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  const [frameworksListData] = await loadData()

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
    <VStack className="mx-auto mt-16 w-full">
      <PageMetadata
        title={t("page-local-environment-setup-meta-title")}
        description={t("page-local-environment-setup-meta-desc")}
      />
      <div className="mb-8 w-full justify-center px-8 pb-8 pt-0 xl:pb-4 xl:pt-4">
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
        <Text className="mb-2 text-center leading-xs text-body-medium">
          <Translation id="page-developers-local-environment:page-local-environment-setup-subtitle" />
          <br />
          <Translation id="page-developers-local-environment:page-local-environment-setup-subtitle-2" />
        </Text>
      </div>
      <Content>
        <Flex className="w-full flex-col-reverse items-start justify-between lg:flex-row lg:items-center">
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
            <TwImage
              className="flex-1 basis-full bg-cover bg-no-repeat"
              src={EthBlocksImage}
              alt={t("page-developers-index:alt-eth-blocks")}
              loading="eager"
            />
          </Column>
        </Flex>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
        </div>
      </Content>
      <Content>
        <FeedbackCard />
      </Content>
    </VStack>
  )
}

export default LocalEnvironmentPage
