import { getTranslations } from "next-intl/server"

import type { Lang } from "@/lib/types"
import { ChildOnlyProp } from "@/lib/types"

import BigNumber from "@/components/BigNumber"
import { CopyButton } from "@/components/CopyToClipboard"
import FeedbackCard from "@/components/FeedbackCard"
import HubHero from "@/components/Hero/HubHero"
import { CheckCircle } from "@/components/icons/CheckCircle"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Card } from "@/components/ui/card"
import { VStack } from "@/components/ui/flex"
import Link from "@/components/ui/Link"
import InlineLink from "@/components/ui/Link"
import { Section } from "@/components/ui/section"

import { cn } from "@/lib/utils/cn"
import { getMetadata } from "@/lib/utils/metadata"
import { screens } from "@/lib/utils/screen"

import BuilderCard from "./_components/BuilderCard"
import BuilderSwiper from "./_components/BuilderSwiper/lazy"
import HackathonCard from "./_components/HackathonCard"
import HackathonSwiper from "./_components/HackathonSwiper/lazy"
import SpeedRunCard from "./_components/SpeedRunCard"
import VideoCourseCard from "./_components/VideoCourseCard"
import VideoCourseSwiper from "./_components/VideoCourseSwiper/lazy"
import DevelopersPageJsonLD from "./page-jsonld"
import { getBuilderPaths, getHackathons, getVideoCourses } from "./utils"

import resourcesBanner from "@/public/images/developers/resources-banner.png"
import scaffoldDebugScreenshot from "@/public/images/developers/scaffold-debug-screenshot.png"
import stackExchangeScreenshot from "@/public/images/developers/stack-exchange-screenshot.png"
import tutorialTagsBanner from "@/public/images/developers/tutorial-tags-banner.png"
import dogeImage from "@/public/images/doge-computer.png"
import heroImage from "@/public/images/heroes/developers-hub-hero.png"

const H3 = (props: ChildOnlyProp) => <h3 className="mb-8 mt-10" {...props} />

const Text = (props: ChildOnlyProp) => <p className="mb-6" {...props} />

const Column = (props: ChildOnlyProp) => (
  <div className="mb-6 me-8 w-full flex-1 basis-1/3" {...props} />
)
const RightColumn = (props: ChildOnlyProp) => (
  <div className="mb-6 me-0 w-full flex-1 basis-1/3" {...props} />
)

const Scroller = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "relative flex w-screen gap-6 overflow-x-auto pb-2 max-2xl:-mx-8 max-2xl:px-8 max-sm:hidden lg:gap-8 2xl:w-full",
        className
      )}
      {...props}
    />
  )
}

const WhyGrid = () => {
  const items = [
    {
      heading: "Money you can program",
      description:
        "Write code that defines how value moves, when, and to whom. No banks, no intermediaries, just logic you define.",
    },
    {
      heading: "Future-proof skills",
      description:
        "Learn the building blocks of the next internet. The tech might evolve, but the principles of web3 are here to stay.",
    },
    {
      heading: "Censorship resistance",
      description:
        "Build projects and commerce that can't be silenced by governments, corporations, or algorithms. If it matters, it stays online.",
    },
    {
      heading: "Digital sovereignty",
      description:
        "Own your identity, assets, and creations online without relying on platforms that can delete you.",
    },
  ]

  return (
    <div
      className={cn(
        "rounded-4xl border border-accent-c/20",
        "grid grid-cols-1 gap-6 p-8 md:grid-cols-2 md:p-14",
        "bg-gradient-to-b from-accent-c/5 from-[60%] to-accent-c/15"
      )}
    >
      {items.map(({ heading, description }) => (
        <div className="flex gap-1.5" key={heading}>
          <CheckCircle />
          <div className="space-y-1">
            <h3 className="text-lg">{heading}</h3>
            <p className="text-body-medium">{description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
const DevelopersPage = async ({
  params,
}: {
  params: Promise<{ locale: Lang }>
}) => {
  const { locale } = await params
  const t = await getTranslations({
    locale,
    namespace: "page-developers-index",
  })
  const tCommon = await getTranslations({
    locale,
    namespace: "common",
  })

  const paths = await getBuilderPaths()
  const speedRunDetails = {
    title: t("page-developers-start"),
    description: t("page-developers-speedrunethereum-description"),
    ctaLabel: t("page-developers-speedrunethereum-link"),
  }

  const courses = await getVideoCourses()

  const hackathons = (await getHackathons()).slice(0, 5)

  return (
    <>
      <DevelopersPageJsonLD
        locale={locale}
        paths={paths}
        courses={courses}
        hackathons={hackathons}
      />
      <VStack className="mx-auto my-0 w-full">
        <HubHero
          heroImg={heroImage}
          header={`${t("page-developers-title-1")} ${t(
            "page-developers-title-2"
          )} ${t("page-developers-title-3")}`}
          title={tCommon("developers")}
          description={t("page-developers-subtitle")}
        />

        <MainArticle className="w-full space-y-12 px-8 py-4">
          <Section id="build" className="space-y-4 py-10 md:py-12">
            <h2>{t("page-developers-get-started")}</h2>

            <p>{t("page-developers-build-section-desc")}</p>
            {/* Desktop */}
            <div className="grid gap-6 max-md:hidden md:grid-cols-2 lg:grid-cols-4">
              {paths.map((path, idx) => (
                <BuilderCard path={path} key={idx} />
              ))}

              <SpeedRunCard {...speedRunDetails} />
            </div>

            {/* Mobile */}
            <div className="-mx-8 md:hidden">
              <BuilderSwiper paths={paths} speedRunDetails={speedRunDetails} />
            </div>
          </Section>

          <Section
            id="why"
            className={cn(
              "grid grid-cols-1 gap-6 md:gap-10 lg:grid-cols-2",
              "-mx-8 w-screen max-w-screen-2xl items-center bg-background-highlight px-8 py-10 md:py-20"
            )}
          >
            <div className="space-y-4">
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
            <WhyGrid />
          </Section>

          <Section
            id="resources"
            className={cn(
              "grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8",
              "-mx-8 w-screen max-w-screen-2xl bg-background-highlight px-8 py-10 md:py-20"
            )}
          >
            <h2 className="sr-only">
              {t("page-developers-resources-section-title")}
            </h2>

            {/* Quickstart your idea */}
            <Card className="!space-y-8 break-words bg-background px-6 py-8 md:space-y-6 lg:p-8">
              <Image
                src={scaffoldDebugScreenshot}
                alt="Scaffold-ETH 2 debug screenshot"
                sizes={`(max-width: ${screens.sm}) 100vw, calc(50vw - 14rem)`}
                className="h-56 object-cover"
              />
              <div>
                <h3>{t("page-developers-jump-right-in-title")}</h3>
                <p className="text-sm text-body-medium">
                  {t("page-developers-quickstart-scaffold-subtext")}{" "}
                  <Link
                    href="https://docs.scaffoldeth.io/"
                    customEventOptions={{
                      eventCategory: "mid_boxes",
                      eventAction: "click",
                      eventName: "scaffold-docs",
                    }}
                    rel="noopener"
                  >
                    {t("page-developers-quickstart-scaffold-docs")}
                  </Link>
                </p>
              </div>
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

              <div>
                <Link
                  href="https://docs.scaffoldeth.io/llms-full.txt"
                  customEventOptions={{
                    eventCategory: "mid_boxes",
                    eventAction: "click",
                    eventName: "scaffold-llms-full",
                  }}
                >
                  Scaffold-ETH 2 <code>llms-full.txt</code>
                </Link>
              </div>
            </Card>

            {/* Get help */}
            <Card className="!space-y-8 break-words bg-background px-6 py-8 md:space-y-6 lg:p-8">
              <Image
                src={stackExchangeScreenshot}
                alt="Ethereum Stack Exchange screenshot"
                sizes={`(max-width: ${screens.sm}) 100vw, calc(50vw - 14rem)`}
                className="max-h-56 w-full object-cover object-top"
              />
              <div>
                <h3>{t("page-developers-get-help-title")}</h3>
                <p className="text-sm text-body-medium">
                  {t("page-developers-get-help-desc")}
                </p>
              </div>

              <div className="flex items-center gap-6">
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
                {/* <ButtonLink
                variant="glow"
                href="#some-magical-AI-link"
                className="text-body"
                >
                {t("page-developers-ask-ai")}
                </ButtonLink> */}
              </div>
            </Card>

            {/* Resources */}
            <Card className="!space-y-8 break-words bg-background px-6 py-8 md:space-y-6 lg:p-8">
              <Image
                src={resourcesBanner}
                alt="Banner showing four resource app icons"
                sizes={`(max-width: ${screens.sm}) 100vw, calc(50vw - 14rem)`}
                className="-my-2 max-h-60 w-full object-contain" // -my-2 accounts for image shadows
              />
              <div>
                <h3>{t("page-developers-resources-title")}</h3>
                <p className="text-sm text-body-medium">
                  {t("page-developers-resources-desc")}
                </p>
              </div>

              <div className="flex items-center gap-6">
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
              </div>
            </Card>

            {/* Tutorials */}
            <Card className="!space-y-8 break-words bg-background px-6 py-8 md:space-y-6 lg:p-8">
              <Image
                src={tutorialTagsBanner}
                alt="Banner displaying multiple learning topics in a tag cloud"
                sizes={`(max-width: ${screens.sm}) 100vw, calc(50vw - 14rem)`}
                className="max-h-56 w-full object-contain"
              />
              <div>
                <h3>{t("page-developers-tutorials-title")}</h3>
                <p className="text-sm text-body-medium">
                  {t("page-developers-tutorials-desc")}
                </p>
              </div>

              <div className="flex items-center gap-6">
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
              </div>
            </Card>
          </Section>

          <Section id="courses" className="space-y-4 py-6">
            <h2>{t("page-developers-video-courses-title")}</h2>
            <p>{t("page-developers-video-courses-desc")}</p>

            {/* DESKTOP */}
            <Scroller>
              {courses.map((course, idx) => (
                <VideoCourseCard
                  key={idx}
                  course={course}
                  className="w-[20%] max-w-[271px] flex-1 max-2xl:min-w-[20rem] xl:w-full"
                />
              ))}
            </Scroller>

            {/* MOBILE */}
            <div className="w-screen max-xl:-ms-8 sm:hidden xl:w-full">
              <VideoCourseSwiper courses={courses} />
            </div>
          </Section>

          <Section
            id="docs"
            className={cn(
              "shadow-table-item-box",
              "-mx-8 w-screen max-w-screen-2xl bg-background-highlight px-8 py-10 md:py-20"
            )}
          >
            <div className="w-full scroll-mt-24 px-8 py-4">
              <h2>{t("page-developers-explore-documentation")}</h2>
              <p>{t("page-developers-docs-section-desc")}</p>
            </div>

            <div className="flex flex-col items-start justify-between px-8 py-0 lg:flex-row">
              <Column>
                <H3>{t("page-developers-docs-introductions")}</H3>
                <InlineLink href="/developers/docs/intro-to-ethereum/">
                  {t("page-developers-intro-eth-link")}
                </InlineLink>
                <Text>{t("page-developers-into-eth-desc")}</Text>

                <InlineLink href="/developers/docs/intro-to-ether/">
                  {t("page-developers-intro-ether-link")}
                </InlineLink>
                <Text>{t("page-developers-intro-ether-desc")}</Text>

                <InlineLink href="/developers/docs/dapps/">
                  {t("page-developers-intro-dapps-link")}
                </InlineLink>
                <Text>{t("page-developers-intro-dapps-desc")}</Text>

                <InlineLink href="/developers/docs/ethereum-stack/">
                  {t("page-developers-intro-stack")}
                </InlineLink>
                <Text>{t("page-developers-intro-stack-desc")}</Text>

                <InlineLink href="/developers/docs/web2-vs-web3/">
                  {t("page-developers-web3-link")}
                </InlineLink>
                <Text>{t("page-developers-web3-desc")}</Text>

                <InlineLink href="/developers/docs/programming-languages/">
                  {t("page-developers-languages")}
                </InlineLink>
                <Text>{t("page-developers-language-desc")}</Text>
                <Image
                  className="mt-16 hidden max-w-[400px] lg:block"
                  src={dogeImage}
                  alt={t("page-assets-doge")}
                />
              </Column>
              <Column>
                <H3>{t("page-developers-fundamentals")}</H3>
                <InlineLink href="/developers/docs/accounts/">
                  {t("page-developers-accounts-link")}
                </InlineLink>
                <Text>{t("page-developers-account-desc")}</Text>

                <InlineLink href="/developers/docs/transactions/">
                  {t("page-developers-transactions-link")}
                </InlineLink>
                <Text>{t("page-developers-transactions-desc")}</Text>

                <InlineLink href="/developers/docs/blocks/">
                  {t("page-developers-blocks-link")}
                </InlineLink>
                <Text>{t("page-developers-block-desc")}</Text>

                <InlineLink href="/developers/docs/evm/">
                  {t("page-developers-evm-link")}
                </InlineLink>
                <Text>{t("page-developers-evm-desc")}</Text>

                <InlineLink href="/developers/docs/gas/">
                  {t("page-developers-gas-link")}
                </InlineLink>
                <Text>{t("page-developers-gas-desc")}</Text>

                <InlineLink href="/developers/docs/nodes-and-clients/">
                  {t("page-developers-node-clients-link")}
                </InlineLink>
                <Text>{t("page-developers-node-clients-desc")}</Text>

                <InlineLink href="/developers/docs/networks/">
                  {t("page-developers-networks-link")}
                </InlineLink>
                <Text>{t("page-developers-networks-desc")}</Text>
              </Column>
              <RightColumn>
                <H3>{t("page-developers-stack")}</H3>
                <InlineLink href="/developers/docs/smart-contracts/">
                  {t("page-developers-smart-contracts-link")}
                </InlineLink>
                <Text>{t("page-developers-smart-contracts-desc")}</Text>
                <InlineLink href="/developers/docs/frameworks/">
                  {t("page-developers-frameworks-link")}
                </InlineLink>
                <Text>{t("page-developers-frameworks-desc")}</Text>
                <InlineLink href="/developers/docs/apis/javascript/">
                  {t("page-developers-js-libraries-link")}
                </InlineLink>
                <Text>{t("page-developers-js-libraries-desc")}</Text>
                <InlineLink href="/developers/docs/apis/backend/">
                  {t("page-developers-api-link")}
                </InlineLink>
                <Text>{t("page-developers-api-desc")}</Text>
                <InlineLink href="/developers/docs/data-and-analytics/block-explorers/">
                  {t("page-developers-block-explorers-link")}
                </InlineLink>
                <Text>{t("page-developers-block-explorers-desc")}</Text>
                <InlineLink href="/developers/docs/smart-contracts/security/">
                  {t("page-developers-smart-contract-security-link")}
                </InlineLink>
                <Text>{t("page-developers-smart-contract-security-desc")}</Text>
                <InlineLink href="/developers/docs/storage/">
                  {t("page-developers-storage-link")}
                </InlineLink>
                <Text>{t("page-developers-storage-desc")}</Text>
                <InlineLink href="/developers/docs/ides/">
                  {t("page-developers-dev-env-link")}
                </InlineLink>
                <Text>{t("page-developers-dev-env-desc")}</Text>
              </RightColumn>
            </div>
          </Section>

          <Section id="hackathons" className="space-y-4 py-10 md:py-12">
            <h2>{t("page-developers-hackathons-title")}</h2>
            <p>{t("page-developers-hackathons-desc")}</p>

            {/* DESKTOP */}
            <Scroller>
              {hackathons.map((event, idx) => (
                <HackathonCard key={idx} event={event} className="flex-1" />
              ))}
            </Scroller>
            {/* MOBILE */}
            <div className="-mx-8 sm:hidden">
              <HackathonSwiper events={hackathons} />
            </div>

            <div className="flex justify-center">
              <ButtonLink
                href="https://ethglobal.com/"
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

          <Section id="founders" className="py-10 md:py-12">
            <div
              className={cn(
                "mx-auto max-w-screen-lg",
                "before:absolute before:-inset-px before:bottom-0 before:z-hide before:rounded-[calc(theme(borderRadius.4xl)+1px)] before:content-['']", // Border/gradient positioning
                "before:bg-gradient-to-b before:from-primary-hover/[0.24] before:to-primary-hover/[0.08] before:dark:from-primary-hover/40 before:dark:to-primary-hover/20", // Border/gradient coloring
                "relative inset-0 rounded-4xl bg-background" // Paint background color over card portion
              )}
            >
              <div className="mb-12 flex flex-col items-center gap-y-8 rounded-4xl bg-radial-a px-8 py-12 lg:mb-32 xl:mb-36">
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
            </div>
          </Section>
        </MainArticle>

        <FeedbackCard />
      </VStack>
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const t = await getTranslations({
    locale,
    namespace: "page-developers-index",
  })

  return await getMetadata({
    locale,
    slug: ["developers"],
    title: t("page-developer-meta-title"),
    description: t("page-developers-meta-desc"),
  })
}

export default DevelopersPage
