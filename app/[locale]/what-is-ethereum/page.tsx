import { ChevronDown } from "lucide-react"
import { getTranslations } from "next-intl/server"

import type { CommitHistory, Lang, ToCItem } from "@/lib/types"

import FileContributors from "@/components/FileContributors"
import ContentHero, { ContentHeroProps } from "@/components/Hero/ContentHero"
import { Image } from "@/components/Image"
import ListenToPlayer from "@/components/ListenToPlayer/server"
import MainArticle from "@/components/MainArticle"
import Link from "@/components/ui/Link"
import { ListItem, OrderedList } from "@/components/ui/list"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { screens } from "@/lib/utils/screen"

import whatBanner from "@/public/images/eth.png"
import howBanner from "@/public/images/hackathon_transparent.png"
import startBanner from "@/public/images/heroes/guides-hub-hero.jpg"
import networksBanner from "@/public/images/heroes/learn-hub-hero.png"
import etherBanner from "@/public/images/impact_transparent.png"
import whenWhoBanner from "@/public/images/translatathon/walking.png"
import heroImg from "@/public/images/what-is-ethereum.png"

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params

  // const t = await getTranslations({
  //   locale,
  //   namespace: "page-what-is-ethereum",
  // })

  const commitHistoryCache: CommitHistory = {}
  const { contributors, lastEditLocaleTimestamp } =
    await getAppPageContributorInfo(
      "what-is-ethereum",
      locale as Lang,
      commitHistoryCache
    )

  const tocItems: ToCItem[] = [
    { title: "What is Ethereum?", url: "#ethereum" },
    { title: "What is the Ethereum network?", url: "#network" },
    { title: "What is ether (ETH)?", url: "#ether" },
    { title: "How does Ethereum work?", url: "#how" },
    { title: "What is Ethereum used for?", url: "#what" },
    { title: "How to start using Ethereum", url: "#start" },
    {
      title: "What's the difference between Ethereum and Bitcoin?",
      url: "#bitcoin",
    },
    {
      title: "When did Ethereum launch, who founded it and who runs it now?",
      url: "#when-who",
    },
    { title: "What is the Ethereum roadmap for 2025?", url: "#roadmap" },
  ]

  const heroProps: ContentHeroProps = {
    breadcrumbs: { slug: "learn/what-is-ethereum", startDepth: 1 },
    heroImg,
    title: tocItems[0].title,
    description: (
      <>
        <p>
          Ethereum is a decentralized blockchain network and software
          development platform, powered by the cryptocurrency ether (ETH).
        </p>
        <p>
          It&apos;s home to thousands of cryptocurrencies and applications
          across DeFi, NFTs, gaming, decentralized social media and stablecoins.
        </p>
      </>
    ),
  }

  const getId = (input: string) => {
    const parts = input.split("#")
    return parts.length > 1 ? parts[1] : ""
  }
  return (
    <MainArticle className="mx-0 my-auto flex w-full flex-col items-center gap-0">
      <ContentHero {...heroProps} />

      <div className="grid w-full grid-cols-1 gap-x-20 px-4 py-8 lg:grid-cols-[1fr_auto] lg:px-10 lg:py-10">
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
          data-label="TODO-toc"
          className="mb-16 h-fit shrink-0 space-y-2.5 rounded-lg border bg-accent-a/10 px-3 py-2 max-lg:text-center lg:sticky lg:top-[7.25rem] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:min-w-80 lg:max-w-72 lg:p-8 lg:text-body-medium"
        >
          <div className="flex items-center">
            <span className="font-bold lg:text-lg">On this page</span>
            <span className="lg:hidden"> (TODO)</span>
            <ChevronDown className="inline lg:hidden" />
          </div>
          <OrderedList className="max-lg:hidden">
            {tocItems.map(({ title, url }) => (
              <Link key={url} href={url} className="leading-base no-underline">
                <ListItem>{title}</ListItem>
              </Link>
            ))}
          </OrderedList>
        </div>

        <div
          data-label="content"
          className="max-w-[50rem] space-y-14 lg:col-start-1 lg:row-start-2"
        >
          <Section id={getId(tocItems[0].url)} className="space-y-6">
            <p>
              Ethereum is an open, public blockchain{" "}
              <strong>launched in July 2015</strong> by a software developer
              called Vitalik Buterin and a small team of co-founders.
            </p>
            <p>
              The idea behind Ethereum was simple. While Bitcoin let you send
              and receive digital cash, Ethereum would build on this with
              open-source programs called <a>smart contracts</a>.
            </p>
            <p>
              <strong>Smart contracts</strong> let anyone create their own
              digital assets and decentralized applications (dapps) that run
              24/7, globally. And unlike banks, corporations or other
              institutions, smart contracts are available to anyone with an
              internet connection.
            </p>
            <p>
              Since 2015, Ethereum has grown into a thriving ecosystem of
              digital assets like <strong>stablecoins</strong>, non-fungible
              tokens (<strong>NFTs</strong>), and governance tokens, as well as
              a sprawling world of dapps for decentralized finance (
              <strong>DeFi</strong>), art and collectibles, gaming and
              decentralized social media.
            </p>
            <p>
              Collectively, this ecosystem is called &quot;<strong>web3</strong>
              &quot;, representing the third phase of the{" "}
              <strong>internet centered around ownership</strong>.
            </p>
            <p>
              Today, Ethereum is used by <a>millions of people</a> around the
              world <a>holding billions of dollars</a> in assets who send and
              receive <a>trillions of dollars</a> every year — all without a
              bank.
            </p>
            <p>
              At the heart of all this is Ethereum&apos;s native cryptocurrency{" "}
              <strong>ether (ETH)</strong>, a new kind of digital money used to
              power the whole network.
            </p>
          </Section>

          <Section id={getId(tocItems[1].url)} className="space-y-14">
            <Image
              src={networksBanner}
              alt="Illustration of futuristic Ethereum community center"
              sizes={`(max-width: 800px) 100vw, (max-width: ${screens.xl}) 800px, (max-width: ${screens.xl}) calc(100vw - 480px), 800px`}
            />

            <div className="space-y-6">
              <h2>{tocItems[1].title}</h2>

              <p>
                You can think of the ethereum network as{" "}
                <strong>
                  a global digital infrastructure that anyone can use
                </strong>{" "}
                but nobody can abuse.
              </p>

              <p>
                The network is made up of{" "}
                <strong>thousands of independent computers</strong>
                around the world called nodes. These nodes, run by regular
                people, work together to provide financial services and digital
                applications to anyone, anywhere.
              </p>

              <p>
                The Ethereum network has <strong>3 key advantages</strong> over
                traditional networks owned by institutions. These are censorship
                resistance, enhanced security and improved reliability.
              </p>
            </div>

            <div data-label="TODO-what-is-table">
              <div className="border-b pb-8">
                <h3 className="mb-2 text-2xl">Censorship resistant</h3>
                <div className="space-y-6">
                  <p className="text-body-medium">
                    While traditional apps and financial services rely on banks
                    or corporations that can decide to block access or freeze
                    accounts, dapps on Ethereum are censorship resistant.
                  </p>
                  <p className="text-body-medium">
                    This is because ethereum&apos;s network of nodes record
                    every single transaction without discrimination—and this
                    rule is embedded in the code.
                  </p>
                </div>
              </div>
              <div className="border-b py-8">
                <h3 className="mb-2 text-2xl">Highly secure</h3>
                <div className="space-y-6">
                  <p className="text-body-medium">
                    While many apps today are hosted on cloud providers like AWS
                    and can be vulnerable to takedowns and attacks, dapps on
                    Ethereum are secured by the network itself. Every node
                    stores and syncs the entire state of Ethereum, including all
                    contracts.
                  </p>
                  <p className="text-body-medium">
                    If someone tried to change a contract, the network would
                    reject it since it wouldn’t match their records. To take
                    down a single app, attackers need to take over the entire
                    network, which would costs billions and be extremely hard to
                    coordinate.
                  </p>
                </div>
              </div>
              <div className="pt-8">
                <h3 className="mb-2 text-2xl">Durable and reliable</h3>
                <div className="space-y-6">
                  <p className="text-body-medium">
                    Downtime on cloud hosting platforms can take apps offline,
                    but Ethereum&apos;s design ensures <a>perfect uptime</a>.
                    The network will keep running even if some nodes go offline
                    due to software bugs, government crackdowns, natural
                    disaster, or war.
                  </p>
                  <p className="text-body-medium">
                    Millions of people use thousands of dapps on Ethereum every
                    day. While high demand can lead to elevated transaction
                    fees, it reflects the strength of a network that prioritizes
                    security, decentralization, and the guarantee that it&apos;s
                    always available when you need it.
                  </p>
                </div>
              </div>
            </div>

            <div data-label="layer-2-callout">
              <h3 className="mb-5 text-xl">Ethereum extensions (Layer 2)</h3>

              <div className="space-y-6">
                <p>
                  Different teams have created Layer 2 (L2) networks that run on
                  top of Ethereum to increase Ethereum&apos;s capacity. L2s act
                  like express lanes, making transactions faster and cheaper —
                  sometimes costing less than a cent on average.
                </p>

                <p>
                  Some of the most popular L2s including Optimism, Arbitrum,
                  ZKSync, and Base now process millions of transactions worth
                  billions of dollars each year.
                </p>
              </div>
            </div>

            <Link href="/layer-2/networks/" className="block">
              → Learn more about the Ethereum network
            </Link>
          </Section>

          <Section
            id={getId(tocItems[2].url)}
            className="space-y-8 rounded-4xl border border-accent-a/20 bg-gradient-to-b from-accent-a/5 to-accent-a/15 px-4 py-6 lg:p-12"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <Image
                src={etherBanner}
                alt="Open hands holding ether glyph"
                sizes="224px"
                className="mx-auto w-56"
              />
              <h3 className="flex-1 text-3xl font-black lg:text-5xl">
                {tocItems[2].title}
              </h3>
            </div>
          </Section>

          <Section
            id={getId(tocItems[3].url)}
            className="space-y-8 rounded-4xl border border-accent-c/20 bg-gradient-to-b from-accent-c/5 to-accent-c/15 px-4 py-6 lg:p-12"
          >
            <div className="flex flex-col gap-4 lg:flex-row-reverse lg:items-center">
              <Image
                src={howBanner}
                alt="Man repairing computer"
                sizes="288px"
                className="mx-auto w-72"
              />
              <h3 className="flex-1 text-3xl font-black lg:text-5xl">
                {tocItems[3].title}
              </h3>
            </div>
          </Section>

          <Section id={getId(tocItems[4].url)} className="space-y-14">
            <Image
              src={whatBanner}
              alt=""
              sizes="320px"
              className="mx-auto w-80 -scale-x-100"
            />
            <h3 className="flex-1 text-3xl/snug font-bold lg:text-4xl/tight">
              {tocItems[4].title}
            </h3>
          </Section>

          <Section id={getId(tocItems[5].url)} className="space-y-14">
            <Image
              src={startBanner}
              alt=""
              sizes={`(max-width: 800px) 100vw, (max-width: ${screens.xl}) 800px, (max-width: ${screens.xl}) calc(100vw - 480px), 800px`}
            />
            <h3 className="flex-1 text-3xl/snug font-bold lg:text-4xl/tight">
              {tocItems[5].title}
            </h3>
          </Section>

          <Section id={getId(tocItems[6].url)} className="space-y-14">
            <h3 className="flex-1 text-3xl/snug font-bold lg:text-4xl/tight">
              {tocItems[6].title}
            </h3>
          </Section>

          <Section id={getId(tocItems[7].url)} className="space-y-14">
            <Image
              src={whenWhoBanner}
              alt=""
              sizes="176px"
              className="mx-auto w-44"
            />
            <h3 className="flex-1 text-3xl/snug font-bold lg:text-4xl/tight">
              {tocItems[7].title}
            </h3>
          </Section>

          <Section id={getId(tocItems[8].url)} className="space-y-14">
            <h3 className="flex-1 text-3xl/snug font-bold lg:text-4xl/tight">
              {tocItems[8].title}
            </h3>
          </Section>
        </div>
      </div>
    </MainArticle>
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
