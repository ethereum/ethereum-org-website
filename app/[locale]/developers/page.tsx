import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import BigNumber from "@/components/BigNumber"
import ContentFeedback from "@/components/ContentFeedback"
import { CopyButton } from "@/components/CopyToClipboard"
import { HubHero } from "@/components/Hero"
import { CheckCircle } from "@/components/icons/CheckCircle"
import { Image } from "@/components/Image"
import CardImage from "@/components/Image/CardImage"
import MainArticle from "@/components/MainArticle"
import { ButtonLink } from "@/components/ui/buttons/Button"
import {
  Card,
  CardBanner,
  CardContent,
  CardFooter,
  CardHeader,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import {
  EdgeScrollContainer,
  EdgeScrollItem,
} from "@/components/ui/edge-scroll-container"
import { Grid } from "@/components/ui/grid"
import InlineLink from "@/components/ui/Link"
import { Section } from "@/components/ui/section"
import { TagsInlineText } from "@/components/ui/tag"
import { TerminalTypewriter } from "@/components/ui/terminal-typewriter"

import { getBlogFallbackHero } from "@/lib/utils/blog"
import { cn } from "@/lib/utils/cn"
import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { formatDate, formatDateRange } from "@/lib/utils/date"
import { getBlogPostsData } from "@/lib/utils/md"
import { getMetadata } from "@/lib/utils/metadata"
import { screens } from "@/lib/utils/screen"

import BuilderCard from "./_components/BuilderCard"
import BuilderSwiper from "./_components/BuilderSwiper/lazy"
import SpeedRunCard from "./_components/SpeedRunCard"
import VideoCourseCard from "./_components/VideoCourseCard"
import VideoCourseSwiper from "./_components/VideoCourseSwiper/lazy"
import PageJsonLD from "./page-jsonld"
import { getBuilderPaths, getHackathons, getVideoCourses } from "./utils"

import resourcesBanner from "@/public/images/developers/resources-banner.png"
import scaffoldDebugScreenshot from "@/public/images/developers/scaffold-debug-screenshot.png"
import stackExchangeScreenshot from "@/public/images/developers/stack-exchange-screenshot.png"
import tutorialTagsBanner from "@/public/images/developers/tutorial-tags-banner.png"
import dogeImage from "@/public/images/doge-computer.png"
import fallbackThumbnail from "@/public/images/eth-glyph-thumbnail.png"
import heroImage from "@/public/images/heroes/developers-hub-hero.png"

const WhyGrid = ({
  items,
}: {
  items: { heading: string; description: string }[]
}) => {
  return (
    <div
      className={cn(
        "rounded-4xl border border-accent-c/20",
        "grid grid-cols-1 gap-6 p-8 md:grid-cols-2 md:p-14",
        "bg-tint-accent-c from-70%"
      )}
    >
      {items.map(({ heading, description }) => (
        <div className="flex gap-1.5" key={heading}>
          <CheckCircle />
          <div className="space-y-1">
            <h3 className="text-lg font-bold">{heading}</h3>
            <p className="text-body-medium">{description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

const DocsColumn = ({
  heading,
  links,
  children,
}: {
  heading: string
  links: { href: string; label: string; description: string }[]
  children?: React.ReactNode
}) => (
  <div className="flow">
    <h3>{heading}</h3>
    {links.map(({ href, label, description }) => (
      <div key={href}>
        <InlineLink href={href}>{label}</InlineLink>
        <p className="text-body-medium">{description}</p>
      </div>
    ))}
    {children}
  </div>
)

const DevelopersPage = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params
  setRequestLocale(locale)
  const t = await getTranslations("page-developers-index")
  const tCommon = await getTranslations("common")

  const paths = await getBuilderPaths()
  const speedRunDetails = {
    title: t("page-developers-start"),
    description: t("page-developers-speedrunethereum-description"),
    ctaLabel: t("page-developers-speedrunethereum-link"),
  }

  const whyGridItems = [
    {
      heading: t("page-developers-why-grid-money-heading"),
      description: t("page-developers-why-grid-money-desc"),
    },
    {
      heading: t("page-developers-why-grid-skills-heading"),
      description: t("page-developers-why-grid-skills-desc"),
    },
    {
      heading: t("page-developers-why-grid-censorship-heading"),
      description: t("page-developers-why-grid-censorship-desc"),
    },
    {
      heading: t("page-developers-why-grid-sovereignty-heading"),
      description: t("page-developers-why-grid-sovereignty-desc"),
    },
  ]

  const courses = await getVideoCourses()

  const hackathons = (await getHackathons()).slice(0, 5)

  const recentPosts = (await getBlogPostsData(locale)).slice(0, 3)

  const { contributors } = await getAppPageContributorInfo(
    "developers",
    locale as Lang
  )

  return (
    <>
      <PageJsonLD
        locale={locale}
        paths={paths}
        courses={courses}
        hackathons={hackathons}
        contributors={contributors}
      />

      <HubHero
        heroImg={heroImage}
        header={`${t("page-developers-title-1")} ${t(
          "page-developers-title-2"
        )} ${t("page-developers-title-3")}`}
        title={tCommon("developers")}
        description={t("page-developers-subtitle")}
      />

      <main className="pb-page">
        <MainArticle className="flow *:[section]:px-page">
          {/* Get started */}
          <Section id="build" className="py-space-3x">
            <h2>{t("page-developers-get-started")}</h2>
            <p>{t("page-developers-build-section-desc")}</p>

            {/* Desktop */}
            <Grid balanced={4} className="max-md:hidden">
              {paths.map((path, idx) => (
                <BuilderCard path={path} key={idx} />
              ))}

              <SpeedRunCard {...speedRunDetails} />
            </Grid>

            {/* Mobile */}
            <div className="-mx-page md:hidden">
              <BuilderSwiper paths={paths} speedRunDetails={speedRunDetails} />
            </div>
          </Section>

          {/* Why build on Ethereum */}
          <Section
            id="why"
            data-flow="skip"
            className="grid grid-cols-1 items-center gap-6 bg-background-highlight py-space-3x md:gap-10 lg:grid-cols-2"
          >
            <div className="flow">
              <h2>{t("page-developers-why-title")}</h2>
              <p>{t("page-developers-why-subtitle")}</p>
              <div className="flex flex-wrap gap-x-6 md:gap-x-8">
                <BigNumber
                  variant="light"
                  value="$93 - 169K"
                  sourceName="Glassdoor"
                  sourceUrl="https://www.glassdoor.com/Salaries/developer-salary-SRCH_KO0%2C9.htm"
                  lastUpdated="2025-04-10T12:00:00Z"
                >
                  {t("page-developers-why-avg-salary-dev")}
                </BigNumber>
                <BigNumber
                  variant="light"
                  value="$80 - 255K"
                  sourceName="Web3 Jobs"
                  sourceUrl="https://web3.career/web3-salaries/united-states"
                  lastUpdated="2025-08-01T12:00:00Z"
                >
                  {t("page-developers-why-avg-salary-blockchain")}
                </BigNumber>
              </div>
            </div>
            <WhyGrid items={whyGridItems} />
          </Section>

          {/* ETHSKILLS */}
          <Section
            id="ethskills"
            data-flow="skip"
            className="flex flex-col gap-8 py-space-3x sm:items-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/developers/ethskills.svg"
              alt="ETHSKILLS"
              className="h-auto max-h-24 w-full max-w-2xl object-contain"
            />

            <div className="max-w-xl space-y-2 md:text-center">
              <h2>{t("page-developers-ethskills-title")}</h2>
              <p className="text-body-medium">
                {t("page-developers-ethskills-desc")}
              </p>
            </div>

            <TerminalTypewriter
              messages={[
                t("page-developers-ethskills-msg-1"),
                t("page-developers-ethskills-msg-2"),
                t("page-developers-ethskills-msg-3"),
                t("page-developers-ethskills-msg-4"),
                t("page-developers-ethskills-msg-5"),
              ]}
            />

            <ButtonLink
              href="https://ethskills.com/"
              size="lg"
              className="max-md:w-full"
              customEventOptions={{
                eventCategory: "ethskills",
                eventAction: "click",
                eventName: "ethskills-section-cta",
              }}
            >
              {t("page-developers-ethskills-cta", { ethskills: "ethskills" })}
            </ButtonLink>
          </Section>

          {/* Resources */}
          <Section
            id="resources"
            data-flow="skip"
            className="bg-background-highlight py-space-3x"
          >
            <h2 className="sr-only">
              {t("page-developers-resources-section-title")}
            </h2>

            <Grid columns={2} size="wide">
              {/* Quickstart your idea */}
              <Card variant="nested" size="lg">
                <CardHeader>
                  <CardBanner background="none" size="lg">
                    <Image
                      src={scaffoldDebugScreenshot}
                      alt=""
                      sizes={`(max-width: ${screens.sm}) 100vw, calc(50vw - 14rem)`}
                      className="h-56 object-cover"
                    />
                  </CardBanner>
                </CardHeader>
                <CardContent>
                  <CardTitle size="lg">
                    {t("page-developers-jump-right-in-title")}
                  </CardTitle>
                  <CardParagraph>
                    {t("page-developers-quickstart-scaffold-subtext")}{" "}
                    <InlineLink
                      href="https://docs.scaffoldeth.io/"
                      customEventOptions={{
                        eventCategory: "mid_boxes",
                        eventAction: "click",
                        eventName: "scaffold-docs",
                      }}
                      rel="noopener"
                    >
                      {t("page-developers-quickstart-scaffold-docs")}
                    </InlineLink>
                  </CardParagraph>

                  <div className="flex items-center rounded-lg border bg-background px-3 py-1">
                    <span className="flex-1 font-mono text-sm">
                      npx create-eth@latest
                    </span>
                    <CopyButton
                      message="npx create-eth@latest"
                      size="sm"
                      customEventOptions={{
                        eventCategory: "mid_boxes",
                        eventAction: "click",
                        eventName: "scaffold-npx-copy",
                      }}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <InlineLink
                    href="https://docs.scaffoldeth.io/llms-full.txt"
                    customEventOptions={{
                      eventCategory: "mid_boxes",
                      eventAction: "click",
                      eventName: "scaffold-llms-full",
                    }}
                  >
                    Scaffold-ETH 2 <code>llms-full.txt</code>
                  </InlineLink>
                </CardFooter>
              </Card>

              {/* Get help */}
              <Card variant="nested" size="lg">
                <CardHeader>
                  <CardBanner background="none" size="lg">
                    <Image
                      src={stackExchangeScreenshot}
                      alt=""
                      sizes={`(max-width: ${screens.sm}) 100vw, calc(50vw - 14rem)`}
                      className="object-top"
                    />
                  </CardBanner>
                </CardHeader>
                <CardContent>
                  <CardTitle size="lg">
                    {t("page-developers-get-help-title")}
                  </CardTitle>
                  <CardParagraph>
                    {t("page-developers-get-help-desc")}
                  </CardParagraph>
                </CardContent>
                <CardFooter>
                  <ButtonLink
                    variant="outline"
                    isSecondary
                    href="https://ethereum.stackexchange.com/"
                    customEventOptions={{
                      eventCategory: "mid_boxes",
                      eventAction: "click",
                      eventName: "stack-exchange",
                    }}
                  >
                    {t("page-developers-stack-exchange")}
                  </ButtonLink>
                </CardFooter>
              </Card>

              {/* Resources */}
              <Card variant="nested" size="lg">
                <CardHeader>
                  <CardBanner background="none" size="lg" fit="contain">
                    <Image
                      src={resourcesBanner}
                      alt=""
                      sizes={`(max-width: ${screens.sm}) 100vw, calc(50vw - 14rem)`}
                    />
                  </CardBanner>
                </CardHeader>
                <CardContent>
                  <CardTitle size="lg">
                    {t("page-developers-resources-title")}
                  </CardTitle>
                  <CardParagraph>
                    {t("page-developers-resources-desc")}
                  </CardParagraph>
                </CardContent>
                <CardFooter>
                  <ButtonLink
                    variant="outline"
                    isSecondary
                    href="/developers/learning-tools/"
                    customEventOptions={{
                      eventCategory: "mid_boxes",
                      eventAction: "click",
                      eventName: "play-with-code",
                    }}
                  >
                    {t("page-developers-play-code")}
                  </ButtonLink>
                </CardFooter>
              </Card>

              {/* Tutorials */}
              <Card variant="nested" size="lg">
                <CardHeader>
                  <CardBanner background="none" size="lg" fit="contain">
                    <Image
                      src={tutorialTagsBanner}
                      alt=""
                      sizes={`(max-width: ${screens.sm}) 100vw, calc(50vw - 14rem)`}
                    />
                  </CardBanner>
                </CardHeader>
                <CardContent>
                  <CardTitle size="lg">
                    {t("page-developers-tutorials-title")}
                  </CardTitle>
                  <CardParagraph>
                    {t("page-developers-tutorials-desc")}
                  </CardParagraph>
                </CardContent>
                <CardFooter>
                  <ButtonLink
                    variant="outline"
                    isSecondary
                    href="/developers/tutorials/"
                    customEventOptions={{
                      eventCategory: "mid_boxes",
                      eventAction: "click",
                      eventName: "view-tutorials",
                    }}
                  >
                    {t("page-developers-learn-tutorials-cta")}
                  </ButtonLink>
                </CardFooter>
              </Card>
            </Grid>
          </Section>

          {/* Video courses */}
          <Section id="courses">
            <h2>{t("page-developers-video-courses-title")}</h2>
            <p>{t("page-developers-video-courses-desc")}</p>

            {/* Desktop */}
            <div className="relative flex w-screen gap-6 overflow-x-auto pb-2 max-2xl:-mx-page max-2xl:px-page max-sm:hidden lg:gap-8 2xl:w-full">
              {courses.map((course, idx) => (
                <VideoCourseCard
                  key={idx}
                  course={course}
                  className="w-[20%] max-w-[271px] flex-1 max-2xl:min-w-[20rem] xl:w-full"
                />
              ))}
            </div>

            {/* Mobile */}
            <div className="w-screen max-xl:-ms-page sm:hidden xl:w-full">
              <VideoCourseSwiper courses={courses} />
            </div>
          </Section>

          {recentPosts.length > 0 && (
            <Section id="blog">
              <h2>{t("page-developers-blog-title")}</h2>
              <p>{t("page-developers-blog-desc")}</p>

              <EdgeScrollContainer>
                {recentPosts.map((post) => (
                  <EdgeScrollItem
                    key={post.href}
                    asChild
                    className="ms-6 w-[calc(100%-4rem)] max-w-md md:min-w-96 md:flex-1 lg:max-w-[33%]"
                  >
                    <Card
                      href={post.href}
                      customEventOptions={{
                        eventCategory: "builder-blog",
                        eventAction: "click",
                        eventName: post.title,
                      }}
                      variant="ghost"
                      size="sm"
                    >
                      <CardHeader>
                        <CardBanner size="sm">
                          {post.image ? (
                            <Image
                              src={post.image}
                              alt=""
                              width={1200}
                              height={630}
                              sizes="448px"
                            />
                          ) : (
                            <Image
                              src={getBlogFallbackHero(post.href)}
                              alt=""
                              sizes="448px"
                            />
                          )}
                        </CardBanner>
                      </CardHeader>
                      <CardContent>
                        <CardTitle className="line-clamp-2">
                          {post.title}
                        </CardTitle>
                        <TagsInlineText
                          list={[post.author, post.team]}
                          variant="light"
                          className="italic"
                        />
                        <CardParagraph size="sm" className="line-clamp-3">
                          {post.description}
                        </CardParagraph>
                      </CardContent>
                      <CardFooter>
                        <CardParagraph size="sm">
                          {formatDate(post.published, locale)}
                        </CardParagraph>
                      </CardFooter>
                    </Card>
                  </EdgeScrollItem>
                ))}
              </EdgeScrollContainer>

              <div className="flex justify-center max-sm:*:w-full">
                <ButtonLink
                  href="/latest/"
                  className="max-md:w-full"
                  customEventOptions={{
                    eventCategory: "builder-blog",
                    eventAction: "click",
                    eventName: "view-all-updates",
                  }}
                >
                  {t("page-developers-blog-view-all")}
                </ButtonLink>
              </div>
            </Section>
          )}

          {/* Explore the documentation */}
          <Section id="docs" className="bg-background-highlight py-space-3x">
            <div className="flow">
              <h2>{t("page-developers-explore-documentation")}</h2>
              <p>{t("page-developers-docs-section-desc")}</p>
            </div>

            <Grid columns={3}>
              <DocsColumn
                heading={t("page-developers-docs-introductions")}
                links={[
                  {
                    href: "/developers/docs/intro-to-ethereum/",
                    label: t("page-developers-intro-eth-link"),
                    description: t("page-developers-into-eth-desc"),
                  },
                  {
                    href: "/developers/docs/intro-to-ether/",
                    label: t("page-developers-intro-ether-link"),
                    description: t("page-developers-intro-ether-desc"),
                  },
                  {
                    href: "/developers/docs/dapps/",
                    label: t("page-developers-intro-dapps-link"),
                    description: t("page-developers-intro-dapps-desc"),
                  },
                  {
                    href: "/developers/docs/ethereum-stack/",
                    label: t("page-developers-intro-stack"),
                    description: t("page-developers-intro-stack-desc"),
                  },
                  {
                    href: "/developers/docs/web2-vs-web3/",
                    label: t("page-developers-web3-link"),
                    description: t("page-developers-web3-desc"),
                  },
                  {
                    href: "/developers/docs/programming-languages/",
                    label: t("page-developers-languages"),
                    description: t("page-developers-language-desc"),
                  },
                ]}
              >
                <Image
                  className="hidden max-w-100 lg:block"
                  src={dogeImage}
                  alt={t("page-assets-doge")}
                  sizes="400px"
                />
              </DocsColumn>

              <DocsColumn
                heading={t("page-developers-fundamentals")}
                links={[
                  {
                    href: "/developers/docs/accounts/",
                    label: t("page-developers-accounts-link"),
                    description: t("page-developers-account-desc"),
                  },
                  {
                    href: "/developers/docs/transactions/",
                    label: t("page-developers-transactions-link"),
                    description: t("page-developers-transactions-desc"),
                  },
                  {
                    href: "/developers/docs/blocks/",
                    label: t("page-developers-blocks-link"),
                    description: t("page-developers-block-desc"),
                  },
                  {
                    href: "/developers/docs/evm/",
                    label: t("page-developers-evm-link"),
                    description: t("page-developers-evm-desc"),
                  },
                  {
                    href: "/developers/docs/gas/",
                    label: t("page-developers-gas-link"),
                    description: t("page-developers-gas-desc"),
                  },
                  {
                    href: "/developers/docs/nodes-and-clients/",
                    label: t("page-developers-node-clients-link"),
                    description: t("page-developers-node-clients-desc"),
                  },
                  {
                    href: "/developers/docs/networks/",
                    label: t("page-developers-networks-link"),
                    description: t("page-developers-networks-desc"),
                  },
                ]}
              />

              <DocsColumn
                heading={t("page-developers-stack")}
                links={[
                  {
                    href: "/developers/docs/smart-contracts/",
                    label: t("page-developers-smart-contracts-link"),
                    description: t("page-developers-smart-contracts-desc"),
                  },
                  {
                    href: "/developers/docs/frameworks/",
                    label: t("page-developers-frameworks-link"),
                    description: t("page-developers-frameworks-desc"),
                  },
                  {
                    href: "/developers/docs/apis/javascript/",
                    label: t("page-developers-js-libraries-link"),
                    description: t("page-developers-js-libraries-desc"),
                  },
                  {
                    href: "/developers/docs/apis/backend/",
                    label: t("page-developers-api-link"),
                    description: t("page-developers-api-desc"),
                  },
                  {
                    href: "/developers/docs/data-and-analytics/block-explorers/",
                    label: t("page-developers-block-explorers-link"),
                    description: t("page-developers-block-explorers-desc"),
                  },
                  {
                    href: "/developers/docs/smart-contracts/security/",
                    label: t("page-developers-smart-contract-security-link"),
                    description: t(
                      "page-developers-smart-contract-security-desc"
                    ),
                  },
                  {
                    href: "/developers/docs/storage/",
                    label: t("page-developers-storage-link"),
                    description: t("page-developers-storage-desc"),
                  },
                  {
                    href: "/developers/docs/ides/",
                    label: t("page-developers-dev-env-link"),
                    description: t("page-developers-dev-env-desc"),
                  },
                ]}
              />
            </Grid>
          </Section>

          {/* Hackathons */}
          <Section id="hackathons">
            <h2>{t("page-developers-hackathons-title")}</h2>
            <p>{t("page-developers-hackathons-desc")}</p>

            <EdgeScrollContainer>
              {hackathons.map((event) => {
                const {
                  title,
                  link,
                  bannerImage,
                  location,
                  startTime,
                  endTime,
                } = event

                return (
                  <EdgeScrollItem
                    key={event.id}
                    asChild
                    className={cn(
                      "ms-6 w-[calc(100%-4rem)] max-w-md md:min-w-96 md:flex-1 lg:max-w-[33%]",
                      "*:max-w-md *:min-w-72 *:flex-1"
                    )}
                  >
                    <Card
                      href={link}
                      customEventOptions={{
                        eventCategory: "hackathons",
                        eventAction: "click",
                        eventName: title,
                      }}
                      variant="ghost"
                      size="sm"
                    >
                      <CardBanner size="sm">
                        {bannerImage ? (
                          <CardImage src={bannerImage} />
                        ) : (
                          <Image src={fallbackThumbnail} alt="" sizes="276px" />
                        )}
                      </CardBanner>
                      <CardContent>
                        <CardTitle>{title}</CardTitle>
                        <CardParagraph variant="subtitle" size="sm">
                          {formatDateRange(startTime, endTime, locale, {
                            year: "numeric",
                          })}
                        </CardParagraph>
                        <CardParagraph variant="subtitle" size="sm">
                          {location}
                        </CardParagraph>
                      </CardContent>
                    </Card>
                  </EdgeScrollItem>
                )
              })}
            </EdgeScrollContainer>

            <div
              className={cn("flex", hackathons.length > 0 && "justify-center")}
            >
              <ButtonLink
                href="https://ethglobal.com/"
                className="max-md:w-full"
                customEventOptions={{
                  eventCategory: "hackathons",
                  eventAction: "click",
                  eventName: "visit-ethglobal",
                }}
              >
                {t("page-developers-visit-ethglobal")}
              </ButtonLink>
            </div>
          </Section>

          {/* Founders */}
          <Section id="founders">
            <div className="gradient-ring-primary/4xl mx-auto mb-12 flex max-w-screen-lg flex-col items-center gap-y-8 bg-radial-primary px-8 py-12 lg:mb-32 xl:mb-36">
              <div className="flex flex-col gap-y-4 text-center">
                <h2>{t("page-developers-founders-title")}</h2>
                <p>{t("page-developers-founders-desc")}</p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-center">
                <ButtonLink
                  href="mailto:founders@ethereum.org?subject=Founder%20inquiry"
                  customEventOptions={{
                    eventCategory: "founders",
                    eventAction: "click",
                    eventName: "email",
                  }}
                >
                  {t("page-developers-get-in-touch")}
                </ButtonLink>
                <ButtonLink
                  href="/community/grants/"
                  isSecondary
                  variant="outline"
                  customEventOptions={{
                    eventCategory: "founders",
                    eventAction: "click",
                    eventName: "grant-options",
                  }}
                >
                  {t("page-developers-see-grant-options")}
                </ButtonLink>
              </div>
            </div>
          </Section>
        </MainArticle>

        {/* End-of-page actions */}
        <div className="px-page">
          <ContentFeedback />
        </div>
      </main>
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const params = await props.params
  const { locale } = params

  const t = await getTranslations("page-developers-index")

  return await getMetadata({
    locale,
    slug: ["developers"],
    title: t("page-developer-meta-title"),
    description: t("page-developers-meta-desc"),
  })
}

export default DevelopersPage
