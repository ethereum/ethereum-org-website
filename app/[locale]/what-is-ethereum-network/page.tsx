import { ArrowRight } from "lucide-react"
import { getLocale } from "next-intl/server"

import type { CommitHistory, Lang, ToCItem } from "@/lib/types"

import FileContributors from "@/components/FileContributors"
import ContentHero, { ContentHeroProps } from "@/components/Hero/ContentHero"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import TableOfContents from "@/components/TableOfContents"
import { Card } from "@/components/ui/card"
import Link, { LinkProps } from "@/components/ui/Link"
import { Section } from "@/components/ui/section"

import { cn } from "@/lib/utils/cn"
import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getDirection } from "@/lib/utils/direction"
import { getMetadata } from "@/lib/utils/metadata"

import developersHubImg from "@/public/images/heroes/developers-hub-hero.jpg"
import manDogPlayingImg from "@/public/images/man-and-dog-playing.png"
import computerImg from "@/public/images/what-is-ethereum-network/computer_alone.png"
import heroImg from "@/public/images/what-is-ethereum-network/what-is-ethereum-network.png"

const LinkWithArrow = async ({ href, className, children }: LinkProps) => {
  const locale = await getLocale()
  const { twFlipForRtl } = getDirection(locale as Lang)
  return (
    <Link
      href={href}
      className={cn("group block w-fit no-underline", className)}
    >
      <ArrowRight className={cn("mb-1 inline size-[1em]", twFlipForRtl)} />
      &nbsp;
      <span className="group-hover:underline">{children}</span>
    </Link>
  )
}

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params
  // const t = await getTranslations({
  //   locale,
  //   namespace: "page-what-is-ethereum-network",
  // })

  const commitHistoryCache: CommitHistory = {}
  const { contributors, lastEditLocaleTimestamp } =
    await getAppPageContributorInfo(
      "what-is-ethereum-network",
      locale as Lang,
      commitHistoryCache
    )

  const tocItems: ToCItem[] = [
    { title: "What is the Ethereum network", url: "#ethereum-network" },
    {
      title: "What are Ethereum network fees (aka gas fees)?",
      url: "#network-fees",
    },
    {
      title: "What is staking and how does it secure the network?",
      url: "#staking",
    },
    {
      title: "What are Ethereum Layer 2s and how do they scale the network?",
      url: "#layer-2s",
    },
    {
      title: "How to explore live Ethereum network data",
      url: "#live-network-data",
    },
  ]

  const heroProps: ContentHeroProps = {
    breadcrumbs: { slug: "learn/what-is-ethereum-network", startDepth: 1 },
    heroImg,
    title: "What is the Ethereum network",
    description: (
      <>
        <p>
          The Ethereum network is the physical and digital infrastructure that
          underpins Ethereum.
        </p>
        <p>
          This includes nodes that store data, validators that process
          transactions, software that executes smart contracts, and Layer 2
          networks that scale Ethereum beyond the main chain.
        </p>
      </>
    ),
  }

  const getId = (input: string) => {
    const parts = input.split("#")
    return parts.length > 1 ? parts[1] : ""
  }

  return (
    <>
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
        </div>

        <div className="row-start-1 lg:col-start-2 lg:row-span-2">
          <TableOfContents variant="beginner" items={tocItems} isMobile />
          <TableOfContents variant="beginner" items={tocItems} />
        </div>

        <div className="max-w-[50rem] space-y-14 lg:col-start-1 lg:row-start-2">
          <Section id={getId(tocItems[0].url)} className="space-y-6">
            <p>
              When people talk about Ethereum, they&apos;re usually talking
              about a few different things. There&apos;s the ecosystem of apps
              and digital assets, the open-source software platform, and the
              native currency Ether (ETH).
            </p>
            <p>
              But underneath it all is the <strong>Ethereum network</strong>;
              the physical and digital foundation that ties everything together.
            </p>
            <p>
              At its core, the Ethereum network is a collection of{" "}
              <strong>thousands of independent computers called nodes</strong>.
              These nodes are <strong>run by people all over the world</strong>.
              They work together to store data, execute smart contracts, and
              record every transaction on an open, public ledger.
            </p>
            <Image src={computerImg} alt="Computer" className="mx-auto" />
            <p>The Ethereum network handles several key tasks, like:</p>
            <ul>
              <li>updating user accounts and balances</li>
              <li>executing smart contracts (programs running dapps)</li>
              <li>
                tracking ownership of digital assets (like stablecoins and NFTs)
              </li>
              <li>
                processing all transactions that flow through Ethereum every day
              </li>
            </ul>
            <p>
              Fortunately, you don’t need to understand how the network works to
              use it.
            </p>
            <p>
              Most people simply use the network via a{" "}
              <a href="/wallets/">digital wallet</a>. <strong>A wallet</strong>{" "}
              is usually a web or mobile app that lets you <strong>send</strong>{" "}
              and <strong>receive ETH, manage your assets</strong>, and use
              dapps.
            </p>
            <p>
              Other types of users like developers and businesses building on
              Ethereum might use APIs, node software, or deploy smart contracts.
            </p>
            <p>
              The Ethereum network is different from traditional systems because
              of how it&apos;s designed.{" "}
              <strong>
                Ethereum&apos;s code and data is stored on decentralized nodes
              </strong>{" "}
              around the world, so no one can block your access or shut down
              your dapp.
            </p>
            <p>
              And because anyone can join, it opens the door to global access
              and innovation.
            </p>
            <p>
              These qualities enable things that weren’t possible before, like:
            </p>
            <ul>
              <li>lending and borrowing without paperwork</li>
              <li>social media without de-platforming</li>
              <li>and crowdfunding without middlemen</li>
            </ul>
            <p>
              At its core, the Ethereum network is a foundation for digital
              ownership and open participation.
            </p>
            <p>
              You may hear people refer to the <strong>Ethereum mainnet</strong>
              . This is the same Ethereum network millions use every day, where
              real assets are exchanged and real dapps live. But “mainnet” helps
              to distinguish it from Ethereum test networks (testnets), which
              developers use to try out new features before going live.
            </p>
          </Section>

          <Section
            id={getId(tocItems[1].url)}
            className="-scroll-mt-80 space-y-14"
          >
            <Image
              src={developersHubImg}
              alt="Developers Hub"
              className="mx-auto"
            />
            <div className="space-y-6">
              <h2 id={getId(tocItems[1].url)} className="scroll-mt-28">
                {tocItems[1].title}
              </h2>
              <p>
                Every transaction on Ethereum costs a small fee called a gas
                fee. Whether you send ETH, swap tokens, or use a dapp, you pay a
                small amount of gas each time.
              </p>
              <p>
                <strong>Gas fees keep Ethereum running smoothly</strong>.
                Without it, bad actors could spam the network with empty
                transactions and make impossible to use. The network would also
                suffer heavy congestion during busy periods, since there’d be no
                way to prioritize transactions by the fee users are willing to
                pay.
              </p>
              <Card className="mx-auto h-fit max-w-[400px] space-y-1 rounded-2xl border bg-background-highlight p-6 [&_[data-label='avatar']]:bg-accent-c">
                <div className="space-y-6">
                  <p>
                    Ethereum gas fees cover the cost of the many different
                    resources a transaction can consume, such as compute,
                    bandwidth, or storage. All of this gets abstracted into a
                    single value for users, but extensive R&D goes into
                    determining how much each operation should cost relative to
                    the others.
                  </p>
                </div>
                <div className="flex items-center gap-x-2">
                  <div
                    data-label="avatar"
                    className="grid size-8 place-items-center rounded-full text-body-inverse"
                  >
                    T
                  </div>
                  <div>
                    <p className="font-bold">Tim Beiko</p>
                    <p className="text-sm text-body-medium">
                      Protocol Coordination, Ethereum Foundation
                    </p>
                  </div>
                </div>
              </Card>
              <p>
                So, what happens when you pay gas? A part of it is{" "}
                <strong>paid to the validator</strong> who adds your transaction
                to a “block” of transactions. Another part gets{" "}
                <strong>“burned”, removing it from the supply</strong> forever.
              </p>
              <p>
                This helps balance supply and demand, because{" "}
                <strong>when the network is busy, fees go up</strong>. When
                things are quieter, fees go down. It also means{" "}
                <strong>ETH gets burned over time</strong>, which{" "}
                <strong>reduces the total supply</strong>, making it more
                scarce.
              </p>
              <p>
                Since the network{" "}
                <a href="https://blog.ethereum.org/2021/07/15/london-mainnet-announcement">
                  introduced fee burning
                </a>{" "}
                in August 2021,{" "}
                <strong>
                  millions of ETH{" "}
                  <a href="https://beaconcha.in/burn">
                    has been removed from the supply
                  </a>
                </strong>
                . You can explore the latest numbers using{" "}
                <a href="https://ultrasound.money">
                  network dashboards and explorers
                </a>{" "}
                built by the Ethereum community.
              </p>
              <p>So, how much does a transaction cost?</p>
              <p>
                Well, <strong>fees vary depending on what you’re doing</strong>.
                Simply sending ETH might cost less than a dollar. Swapping
                tokens on a decentralized exchange (DEX) can be a few dollars or
                more, especially if the network is busy. The more complex the
                transaction the more gas it costs.
              </p>
              <p>
                Gas fees are one of the most visible parts of using Ethereum,
                especially for new users, but it all goes toward making the
                network more reliable and secure.
              </p>
              <LinkWithArrow href="/gas">
                Learn more about Ethereum Network fees
              </LinkWithArrow>
            </div>
          </Section>

          <Section
            id={getId(tocItems[2].url)}
            className="-scroll-mt-80 space-y-14"
          >
            <Image
              src={manDogPlayingImg}
              alt="Man and Dog Playing"
              className="mx-auto"
            />
            <div className="space-y-6">
              <h2 id={getId(tocItems[2].url)} className="scroll-mt-28">
                {tocItems[2].title}
              </h2>
              <p>
                The Ethereum Network is secured by a system called staking. This
                is how Ethereum{" "}
                <strong>verifies transactions, adds new blocks</strong>, and
                keeps the network <strong>safe from attacks</strong>.
              </p>
              <p>
                When Ethereum started out, it used a consensus mechanism (a way
                to agree on who owns what) called proof-of-work. This is the
                same mechanism Bitcoin uses today.
              </p>
              <p>
                In September 2022, Ethereum upgraded to a more secure and
                energy-efficient proof-of-stake consensus mechanism.
              </p>
              <p>So, how does it work?</p>
              <p>
                In simple terms,{" "}
                <strong>people lock up (stake) some ETH</strong> as a deposit so
                that they can help <strong>secure the network</strong>. These
                people are called validators. When you stake ETH, your validator
                gets chosen to check and add new transactions. If you do it
                honestly, you <strong>earn rewards</strong>. If you{" "}
                <strong>try to cheat, you lose part of your stake</strong>.
              </p>
              <Card className="mx-auto h-fit max-w-[400px] space-y-1 rounded-2xl border bg-background-highlight p-6 [&_[data-label='avatar']]:bg-accent-c">
                <div className="space-y-6">
                  <p>
                    Staking is how Ethereum credibly commits to its service
                    quality. All of this money at stake has the best interest
                    for Ethereum to remain secure—would you bet against it?
                  </p>
                </div>
                <div className="flex items-center gap-x-2">
                  <div
                    data-label="avatar"
                    className="grid size-8 place-items-center rounded-full text-body-inverse"
                  >
                    B
                  </div>
                  <div>
                    <p className="font-bold">Barnabé Monnot</p>
                    <p className="text-sm text-body-medium">
                      Protocol Architecture, Ethereum Foundation
                    </p>
                  </div>
                </div>
              </Card>
              <p>
                Just two years after launching proof-of-stake, Ethereum
                attracted{" "}
                <a href="https://beaconcha.in/charts/validators">
                  over a million validators
                </a>{" "}
                who stake{" "}
                <a href="https://beaconcha.in/charts/staked_ether">
                  millions of ETH
                </a>{" "}
                to secure Ethereum. Together, they{" "}
                <strong>
                  make it extremely expensive and difficult to attack
                </strong>
                . This is because, to attack the network,{" "}
                <strong>
                  a bad actor needs at least 33 percent of all staked ETH
                </strong>
                . Today, that amounts to tens of billions of dollars, and even
                then, the attack would likely fail because of built-in
                safeguards.
              </p>
              <p>
                This is what gives Ethereum “<strong>economic security</strong>
                ”. It’s not just about having the right technology. It’s about
                making attacks too costly to even try.
              </p>
              <p>
                To help secure the Ethereum network, you can do this in two main
                ways.
              </p>
              <p>
                The first way is running a node. Nodes store the entire history
                of the blockchain, including all transactions and smart contract
                data. By syncing with other nodes, they can agree on the state
                of the network, making sure transactions are legit and smart
                contract data is available.
              </p>
              <p>
                The second way is staking your ETH. The easiest way is through a
                staking provider like{" "}
                <a href="https://lido.fi/ethereum">Lido</a> or{" "}
                <a href="https://www.rocketpool.net/">Rocketpool</a> but you
                have the know how, try running validator software at home.
              </p>
              <div>
                <LinkWithArrow href="/staking">
                  Learn more about staking and how to do it
                </LinkWithArrow>
                <LinkWithArrow href="/run-a-node">
                  Learn how to run a node
                </LinkWithArrow>
              </div>
            </div>
          </Section>
        </div>
      </MainArticle>
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return await getMetadata({
    locale,
    slug: ["what-is-ethereum-network"],
    title: "What is the Ethereum network | ethereum.org",
    description:
      "Understand what the Ethereum Network is, staking and security, network fees (aka gas), layer 2 scaling networks and how to explore live network data.",
    twitterDescription:
      "Understand what the Ethereum Network is, staking and security, network fees, layer 2 scaling networks and how to explore live network data.",
    image: "/images/what-is-ethereum-network.png",
  })
}

export default Page
