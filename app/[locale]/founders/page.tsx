import React from "react"
import { Banknote, ChartNoAxesCombined, Handshake } from "lucide-react"

import type { Lang, SectionNavDetails } from "@/lib/types"

import ContentHero from "@/components/Hero/ContentHero"
import { CheckCircle } from "@/components/icons/CheckCircle"
import MainArticle from "@/components/MainArticle"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Card } from "@/components/ui/card"
import { Section } from "@/components/ui/section"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tag } from "@/components/ui/tag"

import { cn } from "@/lib/utils/cn"
import { getMetadata } from "@/lib/utils/metadata"

import Alliance from "./logos/alliance.svg"
import Arbitrum from "./logos/arbitrum.svg"
import Base from "./logos/base.svg"
import Devconnect from "./logos/devconnect.svg"
import EcosystemSupport from "./logos/ecosystem-support-program.svg"
import EFFounderSuccess from "./logos/ef-founder-success.svg"
import EnsBuilderGrants from "./logos/ens-builder-grants.svg"
import EthGlobal from "./logos/ethglobal.svg"
// import Gitcoin from "./logos/gitcoin.svg"
import Kernel from "./logos/kernel.svg"
import Optimism from "./logos/optimism.svg"
import Polygon from "./logos/polygon.svg"
import ProtogolGuild from "./logos/protocol-guild.svg"
import Unichain from "./logos/unichain.svg"

import heroImg from "@/public/images/upgrades/merge.png"

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params
  console.log("TODO: setup intl", locale)

  const supportTags = {
    active: {
      // TODO: intl label setup, i.e. t("page-founders-support-tag-active")
      label: "Active",
      // TODO: extract color variants to ui/tag component
      className:
        "bg-green-100 dark:bg-green-700/50 text-green-700 dark:text-green-100",
    },
    grantProgram: {
      label: "Grant Program",
      className:
        "bg-blue-100 dark:bg-blue-600/50 text-blue-600 dark:text-blue-100",
    },
    auditGrants: {
      label: "Audit Grants",
      className:
        "bg-purple-100 dark:bg-purple-600/50 text-purple-600 dark:text-purple-100",
    },
    publicGoods: {
      label: "Public Goods",
      className:
        "bg-orange-100 dark:bg-orange-700/50 text-orange-700 dark:text-orange-100",
    },
    toolingInfra: {
      label: "Tooling & Infra",
      className:
        "bg-pink-100 dark:bg-pink-800/50 text-pink-800 dark:text-pink-100",
    },
    events: {
      label: "Events",
      className:
        "bg-yellow-100 dark:bg-yellow-700/50 text-yellow-700 dark:text-yellow-100",
    },
    fundraising: {
      label: "Fundraising",
      className:
        "bg-yellow-100 dark:bg-yellow-700/50 text-yellow-700 dark:text-yellow-100",
    },
    ecosystemEvents: {
      label: "Ecosystem Events",
      className:
        "bg-pink-100 dark:bg-pink-800/50 text-pink-800 dark:text-pink-100 tracking-1",
    },
    accelerator: {
      label: "Accelerator",
      className:
        "bg-orange-100 dark:bg-orange-700/50 text-orange-700 dark:text-orange-100",
    },
    mentorship: {
      label: "Mentorship",
      className:
        "bg-purple-100 dark:bg-purple-600/50 text-purple-600 dark:text-purple-100",
    },
    networking: {
      label: "Networking",
      className:
        "bg-blue-100 dark:bg-blue-600/50 text-blue-600 dark:text-blue-100",
    },
  } as const satisfies Record<string, { label: string; className: string }>

  type SupportTag = keyof typeof supportTags

  type SupportEntity = {
    name: string // sr-only h3
    Logo: React.FC<React.SVGProps<SVGElement>>
    tags: SupportTag[]
    description: string
    highlights: string[] // w/ CheckCircle
    href: string
    ctaLabel?: string
  }

  type SupportSection = Omit<Required<SectionNavDetails>, "href"> & {
    entities: SupportEntity[]
    categoryCtaLabel?: string
  }

  const supportTabs: SupportSection[] = [
    {
      key: "funding",
      label: "Funding",
      icon: <Banknote />,
      entities: [
        {
          name: "Optimism Atlas",
          Logo: Optimism,
          tags: ["active", "grantProgram", "auditGrants", "publicGoods"],
          description:
            "Support for individual builders and teams making onchain apps, tooling, and infrastructure to advance the Superchain.",
          highlights: ["19 chains eligible", "700+ projects supported"],
          href: "https://atlas.optimism.io/",
        },
        // {
        //   name: "Gitcoin",
        //   Logo: Gitcoin,
        //   tags: ["grantProgram", "publicGoods"],
        //   description: "A quarterly initiative that empowers people and collectives in web3 to allocate funding toward projects and causes they believe in.",
        //   highlights: ["3,700+ projects supported"],
        //   href: "https://www.gitcoin.co/program",
        // },
        {
          name: "Base",
          Logo: Base,
          tags: ["active", "grantProgram", "toolingInfra"],
          description:
            "Builder Grants are ongoing experiments to recognize Base builders.",
          highlights: ["1-5 ETH grants"],
          href: "https://paragraph.com/@grants.base.eth/calling-based-builders",
        },
        {
          name: "Ecosystem Support Program",
          Logo: EcosystemSupport,
          tags: [
            "active",
            "grantProgram",
            "publicGoods",
            "toolingInfra",
            "events",
          ],
          description:
            "Allocating resources to critical projects, to be a valued voice within the Ethereum ecosystem, and to advocate for Ethereum to the outside world.",
          highlights: ["2,000+ projects supported"],
          href: "https://esp.ethereum.foundation/",
        },
        {
          name: "Arbitrum",
          Logo: Arbitrum,
          tags: ["active", "grantProgram", "auditGrants", "toolingInfra"],
          description:
            "The mission is to empower developers and entrepreneurs to build impactful DApps that leverage the capabilities of the Arbitrum network",
          highlights: ["300+ projects supported"],
          href: "https://arbitrum.foundation/grants",
        },
        {
          name: "Unichain",
          Logo: Unichain,
          tags: ["active", "grantProgram", "auditGrants", "toolingInfra"],
          description:
            "A series of programs and resources designed to support Unichain’s emergent developer community",
          highlights: ["Novel DeFi mechanisms"],
          href: "https://uniswapfoundation.mirror.xyz/CR1Boh_s3T7FDGwn2TQyyHYNMO_wp4jJDdtKR4U4CgE",
        },
        {
          name: "Polygon",
          Logo: Polygon,
          tags: ["active", "grantProgram", "toolingInfra"],
          description:
            "A community grants program to support builders, teams, and creators committed to the growth of Polygon",
          highlights: ["Building or migrating to Polygon"],
          href: "https://polygon.technology/grants",
        },
      ],
      categoryCtaLabel: "Get funded",
    },
    {
      key: "accelerators-growth",
      label: "Accelerators & Growth",
      icon: <ChartNoAxesCombined />,
      entities: [
        {
          name: "Kernel",
          Logo: Kernel,
          tags: ["active", "mentorship", "networking"],
          description:
            "Kernel is about slowly building, through repeated interactions with peers.",
          highlights: ["2,200+ fellows", "150+ active projects"],
          href: "https://www.kernel.community/",
        },
        {
          name: "Alliance",
          Logo: Alliance,
          tags: [
            "active",
            "accelerator",
            "networking",
            "mentorship",
            "fundraising",
          ],
          description:
            "Alliance is the leading crypto accelerator & founder community. Now accepting AI startups.",
          highlights: ["$500K Funding"],
          href: "https://alliance.xyz/",
        },
        {
          name: "Base",
          Logo: Base,
          tags: ["accelerator", "mentorship", "networking"],
          description:
            "Base Batches is a global program for builders creating the next wave of onchain apps",
          highlights: ["Up to $1M funding"],
          href: "https://www.basebatches.xyz/",
        },
      ],
      categoryCtaLabel: "Explore",
    },
    {
      key: "partnerships-integrations",
      label: "Partnerships & Integrations",
      icon: <Handshake />,
      entities: [
        {
          name: "Unichain",
          Logo: Unichain,
          tags: ["active", "auditGrants"],
          description:
            "A series of programs and resources designed to support Unichain’s emergent developer community",
          highlights: ["Novel DeFi mechanisms"],
          href: "https://www.uniswapfoundation.org/grants",
          ctaLabel: "Visit Unichain",
        },
        {
          name: "ENS Builder Grants",
          Logo: EnsBuilderGrants,
          tags: ["active", "publicGoods", "fundraising"],
          description:
            "The program aims to empower projects that have demonstrated exceptional usefulness and impact for developers and users alike.",
          highlights: [
            "Small grants up to 2 ETH",
            "Large grants up to 50k USDC",
          ],
          href: "https://builder.ensgrants.xyz/",
          ctaLabel: "Visit ENS",
        },
        {
          name: "Protocol Guild",
          Logo: ProtogolGuild,
          tags: ["active", "fundraising"],
          description:
            "Independent funding organization for Ethereum core developers. We proactively fund maintainers doing work the ecosystem depends on.",
          highlights: ["$28M raised to core devs"],
          href: "$28M raised to core devs",
          ctaLabel: "Visit PG",
        },
        {
          name: "Devconnect",
          Logo: Devconnect,
          tags: ["ecosystemEvents"],
          description:
            "Devconnect ARG is the Ethereum World's Fair: A showcase of apps and an event to connect, build, and accelerate Ethereum adoption.",
          highlights: [],
          href: "https://devconnect.org/",
          ctaLabel: "Visit Devconnect",
        },
        {
          name: "ETHGlobal",
          Logo: EthGlobal,
          tags: ["ecosystemEvents"],
          description:
            "Global events that foster a world-class ecosystem of Ethereum developers and entrepreneurs.",
          highlights: [],
          href: "https://ethglobal.com/",
          ctaLabel: "Visit ETHGlobal",
        },
        // {
        //   name: "Base",
        //   Logo: Base,
        //   tags: [],
        //   description: "Base Batches is a global program for builders creating the next wave of onchain apps",
        //   highlights: [],
        //   href: "https://www.basebatches.xyz/",
        //   ctaLabel: "Visit Base",
        // },
      ],
    },
  ]

  // TODO: Re-enable metrics when ready
  // const metrics: StatsBoxMetric[] = [
  //   { label: "Fundraisings", state: { value: "23" } },
  //   { label: "GTM strategies", state: { value: "32" } },
  //   { label: "Projects", state: { value: "34" } },
  // ]

  const stories: {
    name: string
    affiliation: string
    className?: string
    content: React.ReactNode
  }[] = [
    {
      name: "Fahim",
      affiliation: "Optimism",
      className: "[&_[data-label='avatar']]:bg-accent-a",
      content: (
        <p>
          The Founder Success team is a huge asset to the Ethereum ecosystem.
          They truly care about helping teams win, and their hands-on support
          and genuine commitment to helping teams like Optimism is clear to see.
          I&apos;m excited to continue collaborating with them and strengthening
          our ecosystem together.
        </p>
      ),
    },
    {
      name: "Kedian",
      affiliation: "LevelMoney",
      className: "[&_[data-label='avatar']]:bg-accent-b",
      content: (
        <>
          <p>
            Our contact at the EF has been instrumental in guiding us, not only
            by sharing valuable insights on our upcoming feature but also by
            introducing us to key L2s in the Ethereum ecosystem.
          </p>
          <p>
            Thanks to their feedback on our GTM strategy, we accelerated
            decision-making, reduced time spent on research, and focused
            directly on execution.
          </p>
        </>
      ),
    },
    {
      name: "Dith",
      affiliation: "Gigaverse",
      className: "[&_[data-label='avatar']]:bg-accent-c",
      content: (
        <p>
          EF Founder Support was excellent, they were a great impartial thought
          partner & advisor to us as we completed our first fund raise. I have
          no hesitation recommending other EVM founders to engage them.
        </p>
      ),
    },
  ]

  return (
    <div>
      <ContentHero
        breadcrumbs={{ slug: "build/founders", startDepth: 1 }}
        heroImg={heroImg}
        title="Empowering Founders on Ethereum"
        description="A dedicated hub for entrepreneurs to access programs, mentorship, and visibility across the Ethereum ecosystem, giving founders the support they need at every stage."
      />
      <MainArticle className="relative space-y-16 px-4 py-16 md:space-y-20 md:px-10 md:py-20">
        <Section id="apply" className="space-y-12">
          <div className="space-y-4">
            <h2>Apply for support</h2>
            <p>
              Choose your path and get routed to the most relevant next step.
            </p>
          </div>

          <Tabs defaultValue={supportTabs[0].key}>
            <TabsList>
              {supportTabs.map(({ key, label, icon }) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  // TODO: Add tracking to triggers
                  // customEventOptions={{
                  //   eventCategory: "founders_support",
                  //   eventAction: "apply_for_support_section",
                  // }}
                >
                  {icon}&nbsp;{label}
                </TabsTrigger>
              ))}
            </TabsList>
            {supportTabs.map(({ key, entities, categoryCtaLabel }) => (
              <TabsContent key={key} value={key} className="mt-12 border-0 p-0">
                <div className="grid grid-cols-[repeat(auto-fill,_minmax(min(100%,_280px),_1fr))] gap-4">
                  {entities.map(
                    ({
                      name,
                      Logo,
                      tags,
                      description,
                      highlights,
                      href,
                      ctaLabel,
                    }) => (
                      <Card
                        key={name}
                        className="row-span-3 grid grid-rows-subgrid gap-y-8 rounded-2xl bg-background-highlight p-8 max-md:px-4"
                      >
                        <h3 className="sr-only">{name}</h3>
                        <Logo />
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-x-1 gap-y-2">
                            {tags.map((tag) => (
                              <Tag
                                key={tag}
                                className={supportTags[tag].className}
                              >
                                {supportTags[tag].label}
                              </Tag>
                            ))}
                          </div>
                          <p>{description}</p>
                          {highlights.map((highlight) => (
                            <div
                              key={highlight}
                              className="flex items-center gap-2"
                            >
                              <CheckCircle />
                              <p>{highlight}</p>
                            </div>
                          ))}
                        </div>
                        <ButtonLink href={href} variant="outline">
                          {/* // TODO: Add proper fallback */}
                          {ctaLabel || categoryCtaLabel || "Go"}
                        </ButtonLink>
                      </Card>
                    )
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Section>
        <Section
          id="succeed"
          className="flex w-full flex-col items-center gap-y-14 rounded-t-4xl bg-radial-b px-4 py-20 md:rounded-t-[4rem] md:px-24"
        >
          <div className="space-y-2 px-4 text-center">
            <h2 className="text-4xl md:text-5xl">How others succeeded</h2>
            <p className="">
              You don&apos;t have to build alone, this ecosystem has your back.
            </p>
          </div>
          {/* // TODO: Re-enable metrics when ready */}
          {/* <ActivityStats
            data-label="signalling-metrics"
            metrics={metrics}
            className={cn(
              "text-nowrap max-sm:gap-10 max-sm:px-4",
              "flex w-fit max-w-xl shrink-0 flex-wrap gap-16 text-center text-body-medium",
              "[&_[data-label='big-number']]:border-none [&_[data-label='big-number']]:p-0",
              "[&_[data-label='big-number']:nth-of-type(1)_[data-label='value']]:text-accent-a",
              "[&_[data-label='big-number']:nth-of-type(2)_[data-label='value']]:text-accent-b",
              "[&_[data-label='big-number']:nth-of-type(3)_[data-label='value']]:text-accent-c"
            )}
          /> */}

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {stories.map(({ name, affiliation, content, className }) => (
              <Card
                key={name}
                className={cn(
                  "h-fit space-y-1 rounded-2xl border bg-background p-6",
                  className
                )}
              >
                <div className="space-y-6">{content}</div>
                <div className="flex items-center gap-x-2">
                  <div
                    data-label="avatar"
                    className="grid size-8 place-items-center rounded-full text-body-inverse"
                  >
                    {name[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold">{name}</p>
                    <p className="text-sm text-body-medium">{affiliation}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Section>
        <Section
          id="get-in-touch"
          className="flex flex-col items-center gap-y-8 rounded-4xl border border-accent-a/20 bg-gradient-to-b from-accent-a/5 to-accent-a/10 px-8 py-20 dark:from-accent-a/10 dark:to-accent-a/20"
        >
          <h2 className="sr-only">Ethereum Foundation Founder Success Team</h2>
          <EFFounderSuccess />
          <p className="max-w-screen-md text-center">
            Founder Success is for builders with bold ideas, entrepreneurs who
            see Ethereum as the foundation for products, communities, and
            businesses that can shape the future.
          </p>
          <ButtonLink href="https://efdn.notion.site/255d989555418113975ff62641d9c814">
            Request support
          </ButtonLink>
        </Section>
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

  // const t = await getTranslations({
  //   locale,
  //   namespace: "page-founders",
  // })

  return await getMetadata({
    locale,
    slug: ["founders"],
    title: "Founders", // TODO
    description: "Some meta description", // TODO
    image: "/images/upgrades/merge.png",
  })
}
export default Page
