"use client"

import { HTMLAttributes } from "react"

import { ChildOnlyProp } from "@/lib/types"
import { Framework } from "@/lib/interfaces"

import FeedbackCard from "@/components/FeedbackCard"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import ProductCard from "@/components/ProductCard"
import Translation from "@/components/Translation"
import { Flex, VStack } from "@/components/ui/flex"
import { ListItem, UnorderedList } from "@/components/ui/list"

import { cn } from "@/lib/utils/cn"

import { useTranslation } from "@/hooks/useTranslation"
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

type Props = {
  frameworksList: Framework[]
}

const LocalEnvironmentPage = ({ frameworksList }: Props) => {
  const { t } = useTranslation("page-developers-local-environment")

  return (
    <VStack className="mx-auto mt-16 w-full">
      <div className="mb-8 w-full justify-center px-8 pb-8 pt-0 xl:pb-4 xl:pt-4">
        <h1 className="mb-[1.625rem] text-center font-monospace text-[2rem] font-semibold uppercase not-italic leading-[1.4]">
          <Translation id="page-developers-local-environment:page-local-environment-setup-title" />
        </h1>
        <Text className="mb-2 text-center leading-xs text-body-medium">
          <Translation id="page-developers-local-environment:page-local-environment-setup-subtitle" />
          <br />
          <Translation id="page-developers-local-environment:page-local-environment-setup-subtitle-2" />
        </Text>
      </div>
      <Content>
        <Flex className="w-full flex-col-reverse items-start justify-between lg:flex-row lg:items-center">
          <Column>
            <h2 className="mb-[1.625rem] text-2xl leading-[1.4] md:text-[2rem]">
              <Translation id="page-developers-local-environment:page-local-environment-frameworks-title" />
            </h2>
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
