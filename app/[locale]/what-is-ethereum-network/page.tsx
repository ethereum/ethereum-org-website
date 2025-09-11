import { ArrowRight } from "lucide-react"
import { getLocale } from "next-intl/server"

import type { CommitHistory, Lang, ToCItem } from "@/lib/types"

import DocLink from "@/components/DocLink"
import FileContributors from "@/components/FileContributors"
import ContentHero, { ContentHeroProps } from "@/components/Hero/ContentHero"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import TableOfContents from "@/components/TableOfContents"
import { Card } from "@/components/ui/card"
import Link, { LinkProps } from "@/components/ui/Link"
import { ListItem, UnorderedList } from "@/components/ui/list"
import { Section } from "@/components/ui/section"

import { cn } from "@/lib/utils/cn"
import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getDirection } from "@/lib/utils/direction"
import { getMetadata } from "@/lib/utils/metadata"

import developersHubImg from "@/public/images/heroes/developers-hub-hero.jpg"
import layer2HubImg from "@/public/images/heroes/layer-2-hub-hero.jpg"
import layer2LearnHeroImg from "@/public/images/layer-2/learn-hero.png"
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
            <UnorderedList>
              <ListItem>updating user accounts and balances</ListItem>
              <ListItem>
                executing smart contracts (programs running dapps)
              </ListItem>
              <ListItem>
                tracking ownership of digital assets (like stablecoins and NFTs)
              </ListItem>
              <ListItem>
                processing all transactions that flow through Ethereum every day
              </ListItem>
            </UnorderedList>
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
            <UnorderedList>
              <ListItem>lending and borrowing without paperwork</ListItem>
              <ListItem>social media without de-platforming</ListItem>
              <ListItem>and crowdfunding without middlemen</ListItem>
            </UnorderedList>
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

          <Section
            id={getId(tocItems[3].url)}
            className="-scroll-mt-80 space-y-14"
          >
            <Image
              src={layer2HubImg}
              alt="Man and Dog Playing"
              className="mx-auto"
            />
            <div className="space-y-6">
              <h2 id={getId(tocItems[2].url)} className="scroll-mt-28">
                {tocItems[3].title}
              </h2>
              <p>
                As Ethereum gets more popular, the network gets busier. When
                demand is high, gas fees go up and transactions take longer. To
                fix this, developers have built a series of{" "}
                <strong>companion networks</strong> called Layer 2s.
              </p>
              <p>
                Layer 2s, or L2s for short, are other networks that{" "}
                <strong>run on top of Ethereum</strong>. They process
                transactions separately, then send a summary to be stored on
                Ethereum.
              </p>
              <p>
                You can think of them like express lanes on a highway. Instead
                of every single transaction going through Ethereum’s mainnet,
                many of them use these faster, cheaper roads.
              </p>
              <p>
                Some of the most popular L2s include{" "}
                <strong>Base Chain, Arbitrum, Optimism, zkSync</strong> and{" "}
                <strong>Starknet</strong>. Each of them work slightly
                differently, but the idea is the same; scale Ethereum without
                compromising on security.
              </p>
              <p>
                And it works. A simple ETH transfer on Optimism or zkSync can{" "}
                <a href="https://l2fees.info/">cost as little as $0.04</a>,
                compared to $0.3–$1 on Ethereum mainnet. Other transactions like
                swapping tokens{" "}
                <a href="https://l2fees.info/">can be as little as $0.20</a>.
                For users, this means{" "}
                <strong>faster transactions at a fraction of the price</strong>.
              </p>
              <p>
                As a result, L2s are growing fast. Together, they hold{" "}
                <a href="https://l2beat.com/scaling/summary">
                  billions of dollars in digital assets
                </a>
                .
              </p>
              <p>
                Since L2s benefit from Ethereum’s security, companies looking to
                create global payments and applications started building on top
                of Ethereum.
              </p>
              <p>
                For example, Robinhood recently{" "}
                <a href="https://newsroom.aboutrobinhood.com/robinhood-launches-stock-tokens-reveals-layer-2-blockchain-and-expands-crypto-suite-in-eu-and-us-with-perpetual-futures-and-staking/">
                  launched its own L2
                </a>{" "}
                to explore faster settlement for stocks. PayPal{" "}
                <a href="https://www.coindesk.com/tech/2025/07/17/paypal-pyusd-goes-live-on-arbitrum">
                  moved its stablecoin PYUSD to Ethereum L2 Arbitrum
                </a>
                . Shopify now{" "}
                <a href="https://www.shopify.com/news/stablecoins-on-shopify">
                  lets merchants accept stablecoin USDC
                </a>{" "}
                on Base Chain.
              </p>
              <p>
                For users, moving assets between Ethereum and L2s is
                straightforward. You can use bridges, built by L2s like{" "}
                <a href="https://superbridge.app/">Superbridge by Optimism</a>{" "}
                or{" "}
                <a href="https://portal.zksync.io/bridge/">Portal by ZKsync</a>{" "}
                to move ETH and other assets. You can even use third-party tools
                like <a href="https://hop.exchange/">Hop</a> and{" "}
                <a href="https://across.to/">Across</a> that are built by
                independent teams.
              </p>
              <LinkWithArrow href="/layer-2/">
                Learn more about Ethereum Layer 2 networks
              </LinkWithArrow>
            </div>
          </Section>

          <Section
            id={getId(tocItems[4].url)}
            className="-scroll-mt-80 space-y-14"
          >
            <Image
              src={layer2LearnHeroImg}
              alt="Man and Dog Playing"
              className="mx-auto"
            />
            <div className="space-y-6">
              <h2 id={getId(tocItems[4].url)} className="scroll-mt-28">
                {tocItems[4].title}
              </h2>
              <p>
                Ethereum is transparent by design. Every action on the network,
                from sending ETH to running a validator, is recorded on an open,
                public ledger that anyone can access.
              </p>
              <p>This is a sharp contrast to how most systems work today:</p>
              <UnorderedList>
                <ListItem>
                  banks and institutions publish their internal numbers
                </ListItem>
                <ListItem>
                  app usage figures are closely guarded by tech companies
                </ListItem>
                <ListItem>
                  economic data often arrives late and gets revised later
                </ListItem>
              </UnorderedList>
              <p>With Ethereum, you don’t have to trust. You can check.</p>
              <p>
                You don’t need to understand any of this to use Ethereum. But if
                you’re curious about how many transactions were settled in 2024,
                or how many new Ethereum addresses were created in the last 6
                months, there are tools that let anyone explore the network in
                real time.
              </p>
              <p>
                Here are a few of the most useful data sources, and what you
                might use them for:
              </p>
              <UnorderedList>
                <ListItem>
                  <a href="https://etherscan.io/">Etherscan</a>: Check
                  transactions, wallet activity, and smart contracts
                </ListItem>
                <ListItem>
                  <a href="https://beaconcha.in/">beaconcha.in</a>: View
                  validator stats, staking levels, and network health
                </ListItem>
                <ListItem>
                  <a href="https://ultrasound.money/">ultrasound.money</a>:
                  Track ETH supply, issuance, and burn in real time
                </ListItem>
                <ListItem>
                  <a href="https://l2fees.info/">l2fees.info</a>: Compare
                  current transaction costs on Ethereum and L2s
                </ListItem>
                <ListItem>
                  <a href="https://l2beat.com/">L2Beat</a>: See value secured
                  and security models across all major L2s
                </ListItem>
                <ListItem>
                  <a href="https://growthepie.com/">growthepie</a>: See all
                  on-chain activity and growth across Ethereum
                </ListItem>
                <ListItem>
                  <a href="https://dune.com/">Dune</a>: Explore custom
                  dashboards on all digital assets across Ethereum
                </ListItem>
                <ListItem>
                  <a href="https://tokenterminal.com/">Token Terminal</a>:
                  Compare dapp revenue, usage, and protocol performance
                </ListItem>
                <ListItem>
                  <a href="https://nansen.ai/">Nansen</a>: Follow wallet flows,
                  stablecoin movements, and smart money trends.
                </ListItem>
              </UnorderedList>
              <p>All of these tools are there if you need them.</p>
              <p>
                Whether you’re a developer, researcher, investor, or just
                someone who wants to check a transaction, Ethereum’s open
                network gives you the data — live, permissionless, and
                verifiable.
              </p>
              <LinkWithArrow href="/resources/#network">
                Browse Ethereum Network dashboards and block explorers
              </LinkWithArrow>
            </div>
          </Section>

          <Section className="-scroll-mt-80 space-y-14">
            <div className="space-y-6">
              <h2 className="scroll-mt-28">Read next</h2>
              <UnorderedList className="ms-0 list-none">
                <ListItem>
                  <DocLink href="/wallets">What are wallets?</DocLink>
                </ListItem>
                <ListItem>
                  <DocLink href="/eth">What is Ether (ETH)?</DocLink>
                </ListItem>
                <ListItem>
                  <DocLink href="/web3">What is Web3?</DocLink>
                </ListItem>
                <ListItem>
                  <DocLink href="/what-is-ethereum">
                    Learn more about Ethereum network
                  </DocLink>
                </ListItem>
              </UnorderedList>
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
