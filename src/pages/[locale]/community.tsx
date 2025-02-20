import { BaseHTMLAttributes } from "react"
import { GetStaticProps } from "next"

import { BasePageProps, ChildOnlyProp, Lang, Params } from "@/lib/types"
import { ICard, IGetInvolvedCard } from "@/lib/interfaces"

import ActionCard from "@/components/ActionCard"
import Callout from "@/components/Callout"
import Card from "@/components/Card"
import FeedbackCard from "@/components/FeedbackCard"
import { HubHero } from "@/components/Hero"
import type { HubHeroProps } from "@/components/Hero/HubHero"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import PageMetadata from "@/components/PageMetadata"
import { ButtonLink, ButtonLinkProps } from "@/components/ui/buttons/Button"
import { Divider } from "@/components/ui/divider"
import { Flex } from "@/components/ui/flex"

import { cn } from "@/lib/utils/cn"
import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { DEFAULT_LOCALE, LOCALES_CODES } from "@/lib/constants"

import { useTranslation } from "@/hooks/useTranslation"
import loadNamespaces from "@/i18n/loadNamespaces"
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

export async function getStaticPaths() {
  return {
    paths: LOCALES_CODES.map((locale) => ({ params: { locale } })),
    fallback: false,
  }
}

export const getStaticProps = (async ({ params }) => {
  const { locale = DEFAULT_LOCALE } = params || {}

  const requiredNamespaces = getRequiredNamespacesForPage("/community")

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  const messages = await loadNamespaces(locale, requiredNamespaces)

  return {
    props: {
      messages,
      contentNotTranslated,
      lastDeployLocaleTimestamp,
    },
  }
}) satisfies GetStaticProps<BasePageProps, Params>

const CardContainer = ({ children }: ChildOnlyProp) => {
  return <Flex className="-mx-4 flex-wrap">{children}</Flex>
}

const Content = ({ children }: ChildOnlyProp) => {
  return <div className="w-full px-8 py-4">{children}</div>
}

const Page = ({ children }: ChildOnlyProp) => {
  return (
    <Flex asChild className="mx-auto w-full flex-col items-center">
      <MainArticle>{children}</MainArticle>
    </Flex>
  )
}

const ButtonRow = ({ children }: ChildOnlyProp) => {
  return <Flex className="flex-col items-start md:flex-row">{children}</Flex>
}

const StyledButtonLink = ({ children, ...props }: ButtonLinkProps) => {
  return (
    <ButtonLink
      className="ms-0 mt-4 flex items-center md:ms-2 md:mt-0"
      {...props}
    >
      {children}
    </ButtonLink>
  )
}

const RowReverse = ({ children }: ChildOnlyProp) => {
  return (
    <Flex className="flex-col-reverse items-center lg:flex-row-reverse lg:items-stretch">
      {children}
    </Flex>
  )
}

const ImageContainer = ({ children }: ChildOnlyProp) => {
  return <Flex className="h-full w-3/4 lg:w-full">{children}</Flex>
}

const Subtitle = ({ children }: ChildOnlyProp) => {
  return <p className="mb-8 text-md sm:text-xl">{children}</p>
}

const FeatureContent = ({ children }: ChildOnlyProp) => {
  return (
    <Flex className="h-full w-full flex-col justify-center p-8 lg:p-24">
      {children}
    </Flex>
  )
}

const H2 = ({
  children,
  className,
  ...props
}: BaseHTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h2 className={cn("mb-8 mt-0 text-2xl md:text-3xl", className)} {...props}>
      {children}
    </h2>
  )
}

const CommunityPage = () => {
  const { t } = useTranslation("page-community")

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
      <Flex className="-mt-px h-full w-full flex-row-reverse items-center border-b border-b-border-high-contrast bg-[#ccfcff] py-8 ps-0 lg:h-[720px] lg:py-0 lg:ps-8 dark:bg-[#293233]">
        <Content>
          <Flex className="mb-8 flex-col items-center">
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
      <div className="w-full bg-background-highlight pb-16 shadow-table-item-box">
        <div className="w-full px-4 py-4 lg:px-8">
          <Flex className="mb-0 mt-0 flex-col-reverse items-center md:m-12 md:mt-4 md:flex-row">
            <div className="h-full w-full p-0 sm:p-8 lg:p-24">
              <H2 id="get-involved">
                {t("page-community-get-involved-title")}
              </H2>
              <Subtitle>
                {t("page-community-get-involved-description")}
              </Subtitle>
            </div>
            <ImageContainer>
              <Image
                className="-my-4 object-cover"
                src={developersEthBlockImg}
                alt={t("page-community-get-involved-image-alt")}
              />
            </ImageContainer>
          </Flex>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-0">
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
          </div>
        </div>
      </div>
      <Flex className="-mt-px h-full w-full flex-col-reverse items-center border-y border-y-border-high-contrast bg-[#ccfcff] py-8 ps-0 lg:h-[720px] lg:flex-row-reverse lg:py-0 lg:ps-8 dark:bg-[#293233]">
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
              className="object-cover"
              src={whatIsEthereumImg}
              alt={t("page-community-open-source-image-alt")}
            />
          </ImageContainer>
        </RowReverse>
      </Flex>
      <Flex className="-mt-px h-full w-full flex-col-reverse items-center border-y border-y-border-high-contrast bg-[#ffe5f9] py-8 ps-0 lg:h-[720px] lg:flex-row-reverse lg:py-0 lg:ps-8 dark:bg-[#332027]">
        <Flex className="flex-col-reverse items-center lg:flex-row">
          <FeatureContent>
            <Flex className="flex-col justify-center">
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
              className="object-cover"
              src={financeTransparentImg}
              alt={t("page-index-internet-image-alt")}
            />
          </ImageContainer>
        </Flex>
      </Flex>
      <Flex className="-mt-px h-full w-full flex-col-reverse items-center border-y border-y-border-high-contrast bg-[#e8e8ff] lg:h-[720px] lg:flex-row dark:bg-[#212131]">
        <RowReverse>
          <FeatureContent>
            <H2>{t("page-community-support")}</H2>
            <Subtitle>{t("page-community-support-description")}</Subtitle>
            <div>
              <ButtonLink href="/community/support/">
                {t("page-community-support-button")}
              </ButtonLink>
            </div>
          </FeatureContent>
          <ImageContainer>
            <Image
              className="object-cover"
              src={hackathonTransparentImg}
              alt={t("page-community-support-alt")}
            />
          </ImageContainer>
        </RowReverse>
      </Flex>
      <Divider />
      <Flex className="w-full flex-col items-start px-8 py-4 lg:flex-row lg:items-center">
        <div className="mb-6 max-w-full flex-[0_0_50%] md:max-w-[75%]">
          <h2 className="mb-8 mt-12 text-2xl md:text-3xl">
            {t("page-community-try-ethereum")}
          </h2>
        </div>
      </Flex>
      <Content>
        <CardContainer>
          <Callout
            className="min-h-full flex-[1_1_416px]"
            image={ethImg}
            titleKey="page-community:page-community-get-eth-title"
            alt={t("page-community-get-eth-alt")}
            descriptionKey="page-community:page-community-get-eth-description"
          >
            <div>
              <ButtonLink href="/get-eth/">
                {t("page-community-get-eth")}
              </ButtonLink>
            </div>
          </Callout>
          <Callout
            className="min-h-full flex-[1_1_416px]"
            image={dogeComputerImg}
            titleKey="page-community:page-community-explore-dapps-title"
            alt={t("page-community-explore-dapps-alt")}
            descriptionKey="page-community:page-community-explore-dapps-description"
          >
            <div>
              <ButtonLink href="/dapps/">
                {t("page-community-explore-dapps")}
              </ButtonLink>
            </div>
          </Callout>
        </CardContainer>
      </Content>
      <FeedbackCard />
    </Page>
  )
}

export default CommunityPage
