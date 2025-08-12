import {
  Castle,
  Landmark,
  LockKeyhole,
  Shield,
  SquareCode,
  User,
} from "lucide-react"
import { getLocale, getTranslations } from "next-intl/server"

import type { CommitHistory, Lang, ToCItem } from "@/lib/types"

import DocLink from "@/components/DocLink"
import FeedbackCard from "@/components/FeedbackCard"
import FileContributors from "@/components/FileContributors"
import ContentHero, { ContentHeroProps } from "@/components/Hero/ContentHero"
import { Image } from "@/components/Image"
import ListenToPlayer from "@/components/ListenToPlayer/server"
import MainArticle from "@/components/MainArticle"
import TableOfContents from "@/components/TableOfContents"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import Link, { LinkProps } from "@/components/ui/Link"
import { ListItem, OrderedList, UnorderedList } from "@/components/ui/list"
import { Section } from "@/components/ui/section"

import { cn } from "@/lib/utils/cn"
import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getDirection } from "@/lib/utils/direction"
import { getMetadata } from "@/lib/utils/metadata"
import { screens } from "@/lib/utils/screen"

import contributionBanner from "@/public/images/doge-computer.png"
import whatBanner from "@/public/images/eth.png"
import howBanner from "@/public/images/hackathon_transparent.png"
import startBanner from "@/public/images/heroes/guides-hub-hero.jpg"
import networksBanner from "@/public/images/heroes/learn-hub-hero.png"
import etherBanner from "@/public/images/impact_transparent.png"
import whenWhoBanner from "@/public/images/translatathon/walking.png"
import heroImg from "@/public/images/what-is-ethereum.png"

const IconBox = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "grid size-20 place-items-center rounded-2xl border p-6 shadow-window-box [&_svg]:size-8",
      className
    )}
    {...props}
  />
)

const HighlightStack = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "divide-y [&>div:first-child]:pt-0 [&>div:last-child]:pb-0 [&>div]:py-8",
      className
    )}
    {...props}
  />
)

const HighlightCard = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col gap-4 pb-8 lg:flex-row", className)}
    {...props}
  />
)

const HighlightCardContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("space-y-6 text-body-medium", className)} {...props} />
)

const LinkWithArrow = async ({ href, className, children }: LinkProps) => {
  const locale = await getLocale()
  const { twFlipForRtl } = getDirection(locale as Lang)
  return (
    <Link
      href={href}
      className={cn("group block w-fit no-underline", className)}
    >
      <span data-label="link-arrow" className={twFlipForRtl}>
        →
      </span>
      &nbsp;
      <span className="group-hover:underline">{children}</span>
    </Link>
  )
}

const Strong = (chunks) => <strong>{chunks}</strong>
const Emphasis = (chunks) => <em>{chunks}</em>

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params
  const t = await getTranslations({
    locale,
    namespace: "page-what-is-ethereum",
  })

  const commitHistoryCache: CommitHistory = {}
  const { contributors, lastEditLocaleTimestamp } =
    await getAppPageContributorInfo(
      "what-is-ethereum",
      locale as Lang,
      commitHistoryCache
    )

  const tocItems: ToCItem[] = [
    { title: t("page-what-is-ethereum-toc-ethereum"), url: "#ethereum" },
    { title: t("page-what-is-ethereum-toc-network"), url: "#network" },
    { title: t("page-what-is-ethereum-toc-ether"), url: "#ether" },
    { title: t("page-what-is-ethereum-toc-how"), url: "#how" },
    { title: t("page-what-is-ethereum-toc-what"), url: "#what" },
    { title: t("page-what-is-ethereum-toc-start"), url: "#start" },
    {
      title: t("page-what-is-ethereum-toc-bitcoin"),
      url: "#bitcoin",
    },
    {
      title: t("page-what-is-ethereum-toc-when-who"),
      url: "#when-who",
    },
    { title: t("page-what-is-ethereum-toc-roadmap"), url: "#roadmap" },
  ]

  const heroProps: ContentHeroProps = {
    breadcrumbs: { slug: "learn/what-is-ethereum", startDepth: 1 },
    heroImg,
    title: tocItems[0].title,
    description: (
      <>
        <p>{t("page-what-is-ethereum-hero-description-1")}</p>
        <p>{t("page-what-is-ethereum-hero-description-2")}</p>
      </>
    ),
  }

  const getId = (input: string) => {
    const parts = input.split("#")
    return parts.length > 1 ? parts[1] : ""
  }
  return (
    <div>
      <ContentHero {...heroProps} />

      <MainArticle className="grid w-full grid-cols-1 gap-x-20 px-4 py-8 lg:grid-cols-[1fr_auto] lg:px-10 lg:py-10">
        <div
          data-label="extras"
          className="mb-8 space-y-4 lg:col-start-1 lg:row-start-1 lg:mb-10"
        >
          <FileContributors
            className="!py-0 [&>div]:mt-0"
            contributors={contributors}
            lastEditLocaleTimestamp={lastEditLocaleTimestamp}
          />

          <ListenToPlayer slug="what-is-ethereum" />
        </div>

        <div
          className={cn(
            "row-start-1 lg:col-start-2 lg:row-span-2",
            "[&_a]:leading-base [&_a]:!text-primary [&_li]:text-primary [&_ul]:list-decimal [&_ul]:border-s-0 [&_ul]:text-base",
            "[&_li>a]:inline [&_li]:list-item [&_ul]:list-inside [&_ul]:ps-0",
            "[&_[data-label='marker']]:!hidden [&_li:has([data-state-active='false'])]:me-4 [&_li:has([data-state-active='true'])]:font-bold", // me-4 added to prevent layout shift when active turns bold
            // `aside` targets desktop version
            "[&_aside]:sticky [&_aside]:top-[7.25rem]",
            "[&_aside]:h-fit [&_aside]:shrink-0 [&_aside]:gap-0 [&_aside]:space-y-2.5 [&_aside]:rounded-2xl [&_aside]:bg-accent-a/10 [&_aside]:px-3 [&_aside]:py-2",
            "[&_aside]:min-w-80 [&_aside]:max-w-72 [&_aside]:p-8 [&_aside]:pe-4 [&_aside]:text-body-medium", // [&_aside]:pe-4 reduced to account for above me-4 on inactive items
            "[&_[data-label='label']]:font-bold [&_[data-label='label']]:normal-case [&_aside_[data-label='label']]:text-lg",
            // `button` targets mobile version
            "[&_button>span]:flex-none [&_button]:mb-16 [&_button]:justify-center [&_button]:rounded-lg [&_button]:border-border [&_button]:bg-accent-a/10 [&_button]:text-lg [&_button]:font-bold"
          )}
        >
          <TableOfContents items={tocItems} isMobile className="lg:hidden" />
          <TableOfContents items={tocItems} className="max-lg:hidden" />
        </div>

        <div
          data-label="content"
          className="max-w-[50rem] space-y-14 lg:col-start-1 lg:row-start-2"
        >
          <Section id={getId(tocItems[0].url)} className="space-y-6">
            <p>
              {t.rich("page-what-is-ethereum-ethereum-intro-1", {
                strong: Strong,
              })}
            </p>
            <p>
              {t.rich("page-what-is-ethereum-ethereum-intro-2", {
                a: (chunks) => <Link href="/smart-contracts/">{chunks}</Link>,
              })}
            </p>
            <p>
              {t.rich("page-what-is-ethereum-ethereum-intro-3", {
                strong: Strong,
              })}
            </p>
            <p>
              {t.rich("page-what-is-ethereum-ethereum-intro-4", {
                strong: Strong,
              })}
            </p>
            <p>
              {t.rich("page-what-is-ethereum-ethereum-intro-5", {
                strong: Strong,
              })}
            </p>
            <p>
              {t.rich("page-what-is-ethereum-ethereum-intro-6", {
                a: (chunks) => (
                  <Link href="https://tokenterminal.com/explorer/projects/ethereum/metrics/all">
                    {chunks}
                  </Link>
                ),
                p: (chunks) => (
                  <Link href="https://defillama.com/chain/ethereum">
                    {chunks}
                  </Link>
                ),
                span: (chunks) => (
                  <Link href="https://www.gate.com/post/status/11248290">
                    {chunks}
                  </Link>
                ),
              })}
            </p>
            <p>
              {t.rich("page-what-is-ethereum-ethereum-intro-7", {
                strong: Strong,
              })}
            </p>
          </Section>

          <Section className="-scroll-mt-80 space-y-14">
            <Image
              src={networksBanner}
              alt={t("page-what-is-ethereum-banner-networks-alt")}
              sizes={`(max-width: 800px) 100vw, (max-width: ${screens.xl}) 800px, (max-width: ${screens.xl}) calc(100vw - 480px), 800px`}
            />

            <div className="space-y-6">
              <h2 id={getId(tocItems[1].url)} className="scroll-mt-28">
                {tocItems[1].title}
              </h2>

              <p>
                {t.rich("page-what-is-ethereum-network-intro-1", {
                  strong: Strong,
                })}
              </p>

              <p>
                {t.rich("page-what-is-ethereum-network-intro-2", {
                  strong: Strong,
                })}
              </p>

              <p>
                {t.rich("page-what-is-ethereum-network-intro-3", {
                  strong: Strong,
                })}
              </p>
            </div>

            <HighlightStack data-label="ethereum-network-table">
              <HighlightCard>
                <IconBox>
                  <Shield className="text-accent-a" />
                </IconBox>
                <div>
                  <CardTitle className="mb-2">
                    {t("page-what-is-ethereum-network-censorship-title")}
                  </CardTitle>
                  <HighlightCardContent>
                    <p>
                      {t("page-what-is-ethereum-network-censorship-desc-1")}
                    </p>
                    <p>
                      {t("page-what-is-ethereum-network-censorship-desc-2")}
                    </p>
                  </HighlightCardContent>
                </div>
              </HighlightCard>
              <HighlightCard>
                <IconBox>
                  <LockKeyhole className="text-accent-b" />
                </IconBox>
                <div>
                  <CardTitle className="mb-2">
                    {t("page-what-is-ethereum-network-security-title")}
                  </CardTitle>
                  <HighlightCardContent>
                    <p>{t("page-what-is-ethereum-network-security-desc-1")}</p>
                    <p>{t("page-what-is-ethereum-network-security-desc-2")}</p>
                  </HighlightCardContent>
                </div>
              </HighlightCard>
              <HighlightCard>
                <IconBox>
                  <Castle className="text-accent-c" />
                </IconBox>
                <div>
                  <CardTitle className="mb-2">
                    {t("page-what-is-ethereum-network-reliability-title")}
                  </CardTitle>
                  <HighlightCardContent>
                    <p>
                      {t.rich(
                        "page-what-is-ethereum-network-reliability-desc-1",
                        {
                          a: (chunks) => <Link href="#">{chunks}</Link>,
                        }
                      )}
                    </p>
                    <p>
                      {t("page-what-is-ethereum-network-reliability-desc-2")}
                    </p>
                  </HighlightCardContent>
                </div>
              </HighlightCard>
            </HighlightStack>

            <div data-label="layer-2-callout">
              <h3 className="mb-5 text-xl">
                {t("page-what-is-ethereum-network-layer2-title")}
              </h3>

              <div className="space-y-6">
                <p>{t("page-what-is-ethereum-network-layer2-desc-1")}</p>

                <p>
                  {t.rich("page-what-is-ethereum-network-layer2-desc-2", {
                    a: (chunks) => (
                      <Link href="https://www.optimism.io/">{chunks}</Link>
                    ),
                    p: (chunks) => (
                      <Link href="https://arbitrum.io/">{chunks}</Link>
                    ),
                    span: (chunks) => (
                      <Link href="https://www.zksync.io/">{chunks}</Link>
                    ),
                    div: (chunks) => (
                      <Link href="https://www.base.org/">{chunks}</Link>
                    ),
                  })}
                </p>
              </div>
            </div>

            <LinkWithArrow href="/layer-2/networks/">
              {t("page-what-is-ethereum-network-learn-more")}
            </LinkWithArrow>
          </Section>

          <Section
            id={getId(tocItems[2].url)}
            className="space-y-8 rounded-4xl border border-accent-a/20 bg-gradient-to-b from-accent-a/5 to-accent-a/15 px-4 py-6 lg:p-12"
          >
            <div className="flex flex-col items-center justify-center gap-4 xl:flex-row">
              <Image
                src={etherBanner}
                alt={t("page-what-is-ethereum-banner-ether-alt")}
                sizes="224px"
                className="w-56"
              />
              <h2 className="w-full text-3xl font-black lg:text-5xl">
                {tocItems[2].title}
              </h2>
            </div>

            <div className="space-y-6">
              <p>{t("page-what-is-ethereum-ether-intro-1")}</p>
              <p>
                {t.rich("page-what-is-ethereum-ether-intro-2", {
                  strong: Strong,
                })}
              </p>
              <p>
                {t.rich("page-what-is-ethereum-ether-intro-3", {
                  strong: Strong,
                })}
              </p>
              <p>
                {t.rich("page-what-is-ethereum-ether-intro-4", {
                  strong: Strong,
                })}
              </p>
              <p>
                {t.rich("page-what-is-ethereum-ether-intro-5", {
                  strong: Strong,
                })}
              </p>
              <p>{t("page-what-is-ethereum-ether-intro-6")}</p>
            </div>

            <LinkWithArrow href="/eth/">
              {t("page-what-is-ethereum-ether-learn-more")}
            </LinkWithArrow>
          </Section>

          <Section
            id={getId(tocItems[3].url)}
            className="space-y-8 rounded-4xl border border-accent-c/20 bg-gradient-to-b from-accent-c/5 to-accent-c/15 px-4 py-6 lg:p-12"
          >
            <div className="flex flex-col items-center gap-4 xl:flex-row-reverse">
              <Image
                src={howBanner}
                alt={t("page-what-is-ethereum-banner-how-alt")}
                sizes="288px"
                className="w-full max-w-72"
              />
              <h2 className="w-full text-3xl font-black lg:text-5xl">
                {tocItems[3].title}
              </h2>
            </div>

            <div className="space-y-6">
              <p>
                {t.rich("page-what-is-ethereum-how-intro-1", {
                  strong: Strong,
                })}
              </p>
              <p>{t("page-what-is-ethereum-how-intro-2")}</p>
              <p>
                {t.rich("page-what-is-ethereum-how-intro-3", {
                  strong: Strong,
                  a: (chunks) => (
                    <Link href="/energy-consumption/">{chunks}</Link>
                  ),
                })}
              </p>
              <p>{t("page-what-is-ethereum-how-intro-4")}</p>
              <p>{t("page-what-is-ethereum-how-intro-5")}</p>
              <p className="text-lg font-bold">
                {t("page-what-is-ethereum-how-example-1-title")}
              </p>
              <OrderedList className="[&>li]:mb-0.5">
                <ListItem>
                  {t("page-what-is-ethereum-how-example-1-step-1")}
                </ListItem>
                <ListItem>
                  {t("page-what-is-ethereum-how-example-1-step-2")}
                </ListItem>
                <ListItem>
                  {t("page-what-is-ethereum-how-example-1-step-3")}
                </ListItem>
                <ListItem>
                  {t("page-what-is-ethereum-how-example-1-step-4")}
                </ListItem>
                <ListItem>
                  {t("page-what-is-ethereum-how-example-1-step-5")}
                </ListItem>
                <ListItem>
                  {t("page-what-is-ethereum-how-example-1-step-6")}
                </ListItem>
              </OrderedList>
              <p className="text-lg font-bold">
                {t("page-what-is-ethereum-how-example-2-title")}
              </p>
              <OrderedList className="[&>li]:mb-0">
                <ListItem>
                  {t("page-what-is-ethereum-how-example-2-step-1")}
                </ListItem>
                <ListItem>
                  {t("page-what-is-ethereum-how-example-2-step-2")}
                </ListItem>
                <ListItem>
                  {t("page-what-is-ethereum-how-example-2-step-3")}
                </ListItem>
                <ListItem>
                  {t("page-what-is-ethereum-how-example-2-step-4")}
                </ListItem>
                <ListItem>
                  {t("page-what-is-ethereum-how-example-2-step-5")}
                </ListItem>
              </OrderedList>
              <p>{t("page-what-is-ethereum-how-outro-1")}</p>
              <p>
                {t.rich("page-what-is-ethereum-how-outro-2", {
                  span: (chunks) => <span className="font-bold">{chunks}</span>,
                })}
              </p>
              <div>
                <LinkWithArrow href="/learn/">
                  {t("page-what-is-ethereum-how-learn-more-1")}
                </LinkWithArrow>
                <LinkWithArrow href="/developers/docs/">
                  {t("page-what-is-ethereum-how-learn-more-2")}
                </LinkWithArrow>
              </div>
            </div>
          </Section>

          <Section id={getId(tocItems[4].url)} className="space-y-14">
            <Image
              src={whatBanner}
              alt={t("page-what-is-ethereum-banner-what-alt")}
              sizes="320px"
              className="mx-auto w-80 -scale-x-100"
            />
            <h2 className="w-full text-3xl/snug font-bold lg:text-4xl/tight">
              {tocItems[4].title}
            </h2>
            <div className="space-y-6">
              <p>{t("page-what-is-ethereum-what-intro-1")}</p>
              <p>
                {t.rich("page-what-is-ethereum-what-intro-2", {
                  strong: Strong,
                  a: (chunks) => (
                    <Link href="https://blog.etherisc.com/etherisc-teams-up-with-chainlink-to-deliver-crop-insurance-in-kenya-137e433c29dc">
                      {chunks}
                    </Link>
                  ),
                  p: (chunks) => (
                    <Link href="https://usa.visa.com/about-visa/newsroom/press-releases.releaseId.19881.html">
                      {chunks}
                    </Link>
                  ),
                  span: (chunks) => (
                    <Link href="https://www.wfp.org/building-blocks">
                      {chunks}
                    </Link>
                  ),
                })}
              </p>
              <p>{t("page-what-is-ethereum-what-intro-3")}</p>
              <p>{t("page-what-is-ethereum-what-intro-4")}</p>
            </div>
            <HighlightStack data-label="what-is-table">
              <HighlightCard>
                <IconBox>
                  <User className="text-accent-a" />
                </IconBox>
                <div>
                  <CardTitle className="mb-2">
                    {t("page-what-is-ethereum-what-consumers-title")}
                  </CardTitle>
                  <HighlightCardContent>
                    <p>{t("page-what-is-ethereum-what-consumers-desc-1")}</p>
                    <p>{t("page-what-is-ethereum-what-consumers-desc-2")}</p>
                    <UnorderedList className="[&>li]:mb-0.5">
                      <ListItem>
                        {t.rich(
                          "page-what-is-ethereum-what-consumers-benefit-1",
                          {
                            strong: Strong,
                          }
                        )}
                      </ListItem>
                      <ListItem>
                        {t.rich(
                          "page-what-is-ethereum-what-consumers-benefit-2",
                          {
                            strong: Strong,
                          }
                        )}
                      </ListItem>
                      <ListItem>
                        {t.rich(
                          "page-what-is-ethereum-what-consumers-benefit-3",
                          {
                            strong: Strong,
                          }
                        )}
                      </ListItem>
                      <ListItem>
                        {t("page-what-is-ethereum-what-consumers-benefit-4")}
                      </ListItem>
                    </UnorderedList>
                  </HighlightCardContent>
                </div>
              </HighlightCard>
              <HighlightCard>
                <IconBox>
                  <SquareCode className="text-accent-b" />
                </IconBox>
                <div>
                  <CardTitle className="mb-2">
                    {t("page-what-is-ethereum-what-businesses-title")}
                  </CardTitle>
                  <HighlightCardContent>
                    <UnorderedList className="[&>li]:mb-0.5">
                      <ListItem>
                        {t("page-what-is-ethereum-what-businesses-benefit-1")}
                      </ListItem>
                      <ListItem>
                        {t.rich(
                          "page-what-is-ethereum-what-businesses-benefit-2",
                          {
                            strong: Strong,
                          }
                        )}
                      </ListItem>
                      <ListItem>
                        {t("page-what-is-ethereum-what-businesses-benefit-3")}
                      </ListItem>
                    </UnorderedList>
                    <p>
                      {t.rich("page-what-is-ethereum-what-businesses-example", {
                        a: (chunks) => (
                          <Link href="https://newsroom.paypal-corp.com/2023-08-07-PayPal-Launches-U-S-Dollar-Stablecoin">
                            {chunks}
                          </Link>
                        ),
                      })}
                    </p>
                  </HighlightCardContent>
                </div>
              </HighlightCard>
              <HighlightCard>
                <IconBox>
                  <Landmark className="text-accent-c" />
                </IconBox>
                <div>
                  <CardTitle className="mb-2">
                    {t("page-what-is-ethereum-what-governments-title")}
                  </CardTitle>
                  <HighlightCardContent>
                    <p>{t("page-what-is-ethereum-what-governments-intro")}</p>
                    <UnorderedList className="[&>li]:mb-0.5">
                      <ListItem>
                        {t.rich(
                          "page-what-is-ethereum-what-governments-benefit-1",
                          {
                            strong: Strong,
                          }
                        )}
                      </ListItem>
                      <ListItem>
                        {t.rich(
                          "page-what-is-ethereum-what-governments-benefit-2",
                          {
                            strong: Strong,
                          }
                        )}
                      </ListItem>
                      <ListItem>
                        {t.rich(
                          "page-what-is-ethereum-what-governments-benefit-3",
                          {
                            strong: Strong,
                          }
                        )}
                      </ListItem>
                    </UnorderedList>
                    <p>
                      {t.rich(
                        "page-what-is-ethereum-what-governments-example-1",
                        {
                          a: (chunks) => (
                            <Link href="https://www.weforum.org/stories/2023/03/the-role-cryptocurrency-crypto-huge-in-ukraine-war-russia/">
                              {chunks}
                            </Link>
                          ),
                        }
                      )}
                    </p>
                    <p>
                      {t("page-what-is-ethereum-what-governments-example-2")}
                    </p>
                  </HighlightCardContent>
                </div>
              </HighlightCard>
            </HighlightStack>

            <LinkWithArrow href="/learn/">
              {t("page-what-is-ethereum-what-learn-more")}
            </LinkWithArrow>
          </Section>

          <Section id={getId(tocItems[5].url)} className="space-y-14">
            <Image
              src={startBanner}
              alt={t("page-what-is-ethereum-banner-start-alt")}
              sizes={`(max-width: 800px) 100vw, (max-width: ${screens.xl}) 800px, (max-width: ${screens.xl}) calc(100vw - 480px), 800px`}
            />
            <div>
              <h2 className="mb-2 w-full text-3xl/snug font-bold lg:text-4xl/tight">
                {tocItems[5].title}
              </h2>
              <div className="space-y-6">
                <p>{t("page-what-is-ethereum-start-intro-1")}</p>
                <p>{t("page-what-is-ethereum-start-intro-2")}</p>
              </div>
            </div>

            <Card className="overflow-hidden rounded-2xl border">
              <CardTitle className="flex items-center gap-4 border-b bg-background-highlight p-4">
                <User className="size-8 text-accent-a" />
                <h3 className="text-2xl">
                  {t("page-what-is-ethereum-start-individuals-title")}
                </h3>
              </CardTitle>
              <CardContent className="space-y-12 p-8">
                <div className="space-y-6">
                  <p>
                    <span className="font-bold">
                      {t("page-what-is-ethereum-start-individuals-desc-1")}
                    </span>
                  </p>

                  <p>
                    {t.rich("page-what-is-ethereum-start-individuals-desc-3", {
                      a: (chunks) => (
                        <Link href="https://zerion.io/">{chunks}</Link>
                      ),
                      p: (chunks) => (
                        <Link href="https://rainbow.me/">{chunks}</Link>
                      ),
                      span: (chunks) => (
                        <Link href="https://www.coinbase.com/wallet">
                          {chunks}
                        </Link>
                      ),
                    })}
                  </p>

                  <UnorderedList className="[&>li]:mb-0">
                    <ListItem>
                      {t("page-what-is-ethereum-start-individuals-step-1")}
                    </ListItem>
                    <ListItem>
                      {t("page-what-is-ethereum-start-individuals-step-2")}
                    </ListItem>
                    <ListItem>
                      {t.rich(
                        "page-what-is-ethereum-start-individuals-step-3",
                        {
                          a: (chunks) => (
                            <Link href="https://zora.co/">{chunks}</Link>
                          ),
                          p: (chunks) => (
                            <Link href="https://app.uniswap.org/">
                              {chunks}
                            </Link>
                          ),
                          span: (chunks) => (
                            <Link href="https://farcaster.xyz/">{chunks}</Link>
                          ),
                        }
                      )}
                    </ListItem>
                  </UnorderedList>

                  <p>{t("page-what-is-ethereum-start-individuals-desc-4")}</p>
                  <p>{t("page-what-is-ethereum-start-individuals-desc-5")}</p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <ButtonLink href="/start/">
                    {t("page-what-is-ethereum-start-individuals-cta-1")}
                  </ButtonLink>
                  <ButtonLink href="/apps/" variant="outline">
                    {t("page-what-is-ethereum-start-individuals-cta-2")}
                  </ButtonLink>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-2xl border">
              <CardTitle className="flex items-center gap-4 border-b bg-background-highlight p-4">
                <SquareCode className="size-8 text-accent-b" />
                <h3 className="text-2xl">
                  {t("page-what-is-ethereum-start-developers-title")}
                </h3>
              </CardTitle>
              <CardContent className="space-y-12 p-8">
                <div className="space-y-6">
                  <p>{t("page-what-is-ethereum-start-developers-desc-1")}</p>
                  <p>
                    {t.rich("page-what-is-ethereum-start-developers-desc-2", {
                      a: (chunks) => (
                        <Link href="/developers/docs/">{chunks}</Link>
                      ),
                    })}
                  </p>
                  <p>
                    {t.rich("page-what-is-ethereum-start-developers-desc-3", {
                      a: (chunks) => (
                        <Link href="https://hardhat.org/">{chunks}</Link>
                      ),
                      p: (chunks) => (
                        <Link href="https://getfoundry.sh/">{chunks}</Link>
                      ),
                      span: (chunks) => (
                        <Link href="https://docs.ethers.org/">{chunks}</Link>
                      ),
                      div: (chunks) => (
                        <Link href="https://thirdweb.com/">{chunks}</Link>
                      ),
                      aside: (chunks) => (
                        <Link href="https://moralis.com/">{chunks}</Link>
                      ),
                    })}
                  </p>
                  <p>{t("page-what-is-ethereum-start-developers-desc-4")}</p>
                </div>
                <ButtonLink href="/start/">
                  {t("page-what-is-ethereum-start-developers-cta")}
                </ButtonLink>
              </CardContent>
            </Card>

            <Card className="overflow-hidden rounded-2xl border">
              <CardTitle className="flex items-center gap-4 border-b bg-background-highlight p-4">
                <Landmark className="size-8 text-accent-c" />
                <h3 className="text-2xl">
                  {t("page-what-is-ethereum-start-business-title")}
                </h3>
              </CardTitle>
              <CardContent className="space-y-12 p-8">
                <div className="space-y-6">
                  <p>{t("page-what-is-ethereum-start-business-desc-1")}</p>
                  <p>{t("page-what-is-ethereum-start-business-desc-2")} </p>
                  <p>
                    {t("page-what-is-ethereum-start-business-desc-3")}
                    <UnorderedList className="[&>li]:mb-0">
                      <ListItem>
                        {t("page-what-is-ethereum-start-business-benefit-1")}
                      </ListItem>
                      <ListItem>
                        {t("page-what-is-ethereum-start-business-benefit-2")}
                      </ListItem>
                      <ListItem>
                        {t("page-what-is-ethereum-start-business-benefit-3")}
                      </ListItem>
                    </UnorderedList>
                  </p>
                  <p>
                    {t.rich("page-what-is-ethereum-start-business-example", {
                      a: (chunks) => (
                        <Link href="https://www.shopify.com/news/stablecoins-on-shopify">
                          {chunks}
                        </Link>
                      ),
                    })}
                  </p>
                </div>
                <ButtonLink href="/start/">
                  {t("page-what-is-ethereum-start-business-cta")}
                </ButtonLink>
              </CardContent>
            </Card>
          </Section>

          <Section id={getId(tocItems[6].url)}>
            <h2 className="mb-4 w-full text-3xl/snug font-bold lg:text-4xl/tight">
              {tocItems[6].title}
            </h2>

            <div className="space-y-6">
              <p>{t("page-what-is-ethereum-bitcoin-intro-1")}</p>

              <p>
                {t.rich("page-what-is-ethereum-bitcoin-intro-2", {
                  strong: Strong,
                })}
              </p>

              <div>
                <h3 className="mb-1 mt-12 text-xl">
                  {t("page-what-is-ethereum-bitcoin-comparison-1-title")}
                </h3>
                <p>{t("page-what-is-ethereum-bitcoin-comparison-1-desc")}</p>
              </div>

              <div>
                <h3 className="mb-1 mt-12 text-xl">
                  {t("page-what-is-ethereum-bitcoin-comparison-2-title")}
                </h3>
                <p>{t("page-what-is-ethereum-bitcoin-comparison-2-desc")}</p>
              </div>

              <div>
                <h3 className="mb-1 mt-12 text-xl">
                  {t("page-what-is-ethereum-bitcoin-comparison-3-title")}
                </h3>
                <div className="space-y-6">
                  <p>
                    {t("page-what-is-ethereum-bitcoin-comparison-3-desc-1")}
                  </p>
                  <p>
                    {t("page-what-is-ethereum-bitcoin-comparison-3-desc-2")}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="mb-1 mt-12 text-xl">
                  {t("page-what-is-ethereum-bitcoin-comparison-4-title")}
                </h3>
                <div className="space-y-6">
                  <p>
                    {t.rich(
                      "page-what-is-ethereum-bitcoin-comparison-4-desc-1",
                      { strong: Strong }
                    )}
                  </p>
                  <p>
                    {t("page-what-is-ethereum-bitcoin-comparison-4-desc-2")}
                  </p>
                  <p>
                    {t("page-what-is-ethereum-bitcoin-comparison-4-desc-3")}
                  </p>
                </div>
              </div>

              <LinkWithArrow href="#TODO-get-link">
                {t("page-what-is-ethereum-bitcoin-learn-more")}
              </LinkWithArrow>
            </div>
          </Section>

          <Section id={getId(tocItems[7].url)} className="space-y-14">
            <Image
              src={whenWhoBanner}
              alt={t("page-what-is-ethereum-banner-when-who-alt")}
              sizes="176px"
              className="mx-auto w-44"
            />

            <div className="space-y-4">
              <h2 className="w-full text-3xl/snug font-bold lg:text-4xl/tight">
                {tocItems[7].title}
              </h2>
              <div className="space-y-8">
                <div className="space-y-6">
                  <p>{t("page-what-is-ethereum-when-who-intro-1")}</p>
                  <p>{t("page-what-is-ethereum-when-who-intro-2")}</p>
                  <p>{t("page-what-is-ethereum-when-who-intro-3")}</p>
                  <p>{t("page-what-is-ethereum-when-who-intro-4")}</p>
                </div>
                <div className="space-y-6">
                  <h3 className="text-xl">
                    {t("page-what-is-ethereum-when-who-history-title")}
                  </h3>
                  <OrderedList className="m-0 list-none [&>li]:mb-0">
                    <ListItem>
                      <span className="font-bold text-body-medium">2013:</span>{" "}
                      {t("page-what-is-ethereum-when-who-history-2013")}
                    </ListItem>
                    <ListItem>
                      <span className="font-bold text-body-medium">2014:</span>{" "}
                      {t("page-what-is-ethereum-when-who-history-2014")}
                    </ListItem>
                    <ListItem>
                      <span className="font-bold text-body-medium">2015:</span>{" "}
                      {t.rich("page-what-is-ethereum-when-who-history-2015", {
                        em: Emphasis,
                      })}
                    </ListItem>
                    <ListItem>
                      <span className="font-bold text-body-medium">2016:</span>{" "}
                      {t("page-what-is-ethereum-when-who-history-2016")}{" "}
                    </ListItem>
                    <ListItem>
                      <span className="font-bold text-body-medium">2020:</span>{" "}
                      {t("page-what-is-ethereum-when-who-history-2020")}{" "}
                    </ListItem>
                    <ListItem>
                      <span className="font-bold text-body-medium">2021:</span>{" "}
                      {t.rich("page-what-is-ethereum-when-who-history-2021", {
                        em: Emphasis,
                      })}{" "}
                    </ListItem>
                    <ListItem>
                      <span className="font-bold text-body-medium">2022:</span>{" "}
                      {t.rich("page-what-is-ethereum-when-who-history-2022", {
                        em: Emphasis,
                      })}{" "}
                    </ListItem>
                    <ListItem>
                      <span className="font-bold text-body-medium">2025:</span>{" "}
                      {t.rich("page-what-is-ethereum-when-who-history-2025", {
                        em: Emphasis,
                      })}{" "}
                    </ListItem>
                  </OrderedList>
                  <p>{t("page-what-is-ethereum-when-who-governance-1")}</p>
                </div>
                <Image
                  src={contributionBanner}
                  alt={t("page-what-is-ethereum-banner-contributing-alt")}
                  sizes="208px"
                  className="mx-auto w-52"
                />
                <div className="space-y-6">
                  <h3 className="text-xl">
                    {t("page-what-is-ethereum-when-who-contributors-title")}
                  </h3>
                  <UnorderedList className="[&>li]:mb-0">
                    <ListItem>
                      {t("page-what-is-ethereum-when-who-contributors-1")}
                    </ListItem>
                    <ListItem>
                      {t("page-what-is-ethereum-when-who-contributors-2")}
                    </ListItem>
                    <ListItem>
                      {" "}
                      {t("page-what-is-ethereum-when-who-contributors-3")}
                    </ListItem>
                    <ListItem>
                      {t("page-what-is-ethereum-when-who-contributors-4")}
                    </ListItem>
                    <ListItem>
                      {t.rich("page-what-is-ethereum-when-who-contributors-5", {
                        strong: Strong,
                      })}
                    </ListItem>
                  </UnorderedList>
                  <p>
                    {t.rich("page-what-is-ethereum-when-who-governance-2", {
                      strong: Strong,
                    })}
                  </p>
                  <p>
                    {t.rich("page-what-is-ethereum-when-who-governance-3", {
                      a: (chunks) => (
                        <Link href="https://eips.ethereum.org/">{chunks}</Link>
                      ),
                      p: (chunks) => (
                        <Link href="/governance/#formal-process">{chunks}</Link>
                      ),
                    })}
                  </p>
                  <p>{t("page-what-is-ethereum-when-who-governance-4")}</p>
                </div>
                <LinkWithArrow href="/history/">
                  {t("page-what-is-ethereum-when-who-learn-more")}
                </LinkWithArrow>
              </div>
            </div>
          </Section>

          <Section id={getId(tocItems[8].url)} className="space-y-4">
            <h2 className="w-full text-3xl/snug font-bold lg:text-4xl/tight">
              {tocItems[8].title}
            </h2>
            <div className="space-y-8">
              <div className="space-y-6">
                <p>{t("page-what-is-ethereum-roadmap-intro-1")}</p>
                <p>{t("page-what-is-ethereum-roadmap-intro-2")} </p>
                <p>
                  {t.rich("page-what-is-ethereum-roadmap-intro-3", {
                    a: (chunks) => (
                      <Link href="/roadmap/pectra/">{chunks}</Link>
                    ),
                  })}
                </p>
                <p>
                  {t.rich("page-what-is-ethereum-roadmap-priorities-intro", {
                    a: (chunks) => (
                      <Link href="https://blog.ethereum.org/2025/04/28/next-chapter">
                        {chunks}
                      </Link>
                    ),
                  })}
                </p>

                <UnorderedList className="[&>li]:mb-0">
                  <ListItem>
                    {t("page-what-is-ethereum-roadmap-priority-1")}
                  </ListItem>
                  <ListItem>
                    {t("page-what-is-ethereum-roadmap-priority-2")}
                  </ListItem>
                </UnorderedList>

                <p>{t("page-what-is-ethereum-roadmap-outro-1")}</p>
                <p>
                  {t.rich("page-what-is-ethereum-roadmap-outro-2", {
                    a: (chunks) => <Link href="/community/">{chunks}</Link>,
                  })}
                </p>
              </div>

              <LinkWithArrow href="/roadmap/">
                {t("page-what-is-ethereum-roadmap-learn-more")}
              </LinkWithArrow>
            </div>
          </Section>

          <Section id="further-readon" className="space-y-8">
            <h2 className="w-full text-3xl/snug font-bold lg:text-4xl/tight">
              {t("page-what-is-ethereum-further-reading-title")}
            </h2>
            <UnorderedList className="ms-0 list-none">
              <ListItem>
                <DocLink href="/wallets/">
                  {t("page-what-is-ethereum-further-reading-wallets")}
                </DocLink>
              </ListItem>
              <ListItem>
                <DocLink href="/eth/">
                  {t("page-what-is-ethereum-further-reading-eth")}
                </DocLink>
              </ListItem>
              <ListItem>
                <DocLink href="/web3/">
                  {t("page-what-is-ethereum-further-reading-web3")}
                </DocLink>
              </ListItem>
              <ListItem>
                <DocLink href="/layer-2/networks/">
                  {t("page-what-is-ethereum-further-reading-networks")}
                </DocLink>
              </ListItem>
            </UnorderedList>
          </Section>

          <FeedbackCard />
        </div>
      </MainArticle>
    </div>
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
    namespace: "page-what-is-ethereum",
  })

  return await getMetadata({
    locale,
    slug: ["what-is-ethereum"],
    title: t("page-what-is-ethereum-meta-title"),
    description: t("page-what-is-ethereum-meta-description"),
    image: "/images/what-is-ethereum.png",
  })
}

export default Page
