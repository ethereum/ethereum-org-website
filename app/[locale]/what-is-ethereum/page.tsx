import {
  Castle,
  ChevronDown,
  Landmark,
  LockKeyhole,
  Shield,
  SquareCode,
  User,
} from "lucide-react"
import { getTranslations } from "next-intl/server"

import type { CommitHistory, Lang, ToCItem } from "@/lib/types"

import FileContributors from "@/components/FileContributors"
import ContentHero, { ContentHeroProps } from "@/components/Hero/ContentHero"
import { Image } from "@/components/Image"
import ListenToPlayer from "@/components/ListenToPlayer/server"
import MainArticle from "@/components/MainArticle"
import { CardTitle } from "@/components/ui/card"
import Link from "@/components/ui/Link"
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

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params
  const { twFlipForRtl } = getDirection(locale)
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

          <Section className="-scroll-mt-80 space-y-14">
            <Image
              src={networksBanner}
              alt="Illustration of futuristic Ethereum community center"
              sizes={`(max-width: 800px) 100vw, (max-width: ${screens.xl}) 800px, (max-width: ${screens.xl}) calc(100vw - 480px), 800px`}
            />

            <div className="space-y-6">
              <h2 id={getId(tocItems[1].url)} className="scroll-mt-28">
                {tocItems[1].title}
              </h2>

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

            <HighlightStack data-label="ethereum-network-table">
              <HighlightCard>
                <IconBox>
                  <Shield className="text-accent-a" />
                </IconBox>
                <div>
                  <CardTitle className="mb-2">Censorship resistant</CardTitle>
                  <HighlightCardContent>
                    <p>
                      While traditional apps and financial services rely on
                      banks or corporations that can decide to block access or
                      freeze accounts, dapps on Ethereum are censorship
                      resistant.
                    </p>
                    <p>
                      This is because ethereum&apos;s network of nodes record
                      every single transaction without discrimination—and this
                      rule is embedded in the code.
                    </p>
                  </HighlightCardContent>
                </div>
              </HighlightCard>
              <HighlightCard>
                <IconBox>
                  <LockKeyhole className="text-accent-b" />
                </IconBox>
                <div>
                  <CardTitle className="mb-2">Highly secure</CardTitle>
                  <HighlightCardContent>
                    <p>
                      While many apps today are hosted on cloud providers like
                      AWS and can be vulnerable to takedowns and attacks, dapps
                      on Ethereum are secured by the network itself. Every node
                      stores and syncs the entire state of Ethereum, including
                      all contracts.
                    </p>
                    <p>
                      If someone tried to change a contract, the network would
                      reject it since it wouldn&apos;t match their records. To
                      take down a single app, attackers need to take over the
                      entire network, which would costs billions and be
                      extremely hard to coordinate.
                    </p>
                  </HighlightCardContent>
                </div>
              </HighlightCard>
              <HighlightCard>
                <IconBox>
                  <Castle className="text-accent-c" />
                </IconBox>
                <div>
                  <CardTitle className="mb-2">Durable and reliable</CardTitle>
                  <HighlightCardContent>
                    <p>
                      Downtime on cloud hosting platforms can take apps offline,
                      but Ethereum&apos;s design ensures <a>perfect uptime</a>.
                      The network will keep running even if some nodes go
                      offline due to software bugs, government crackdowns,
                      natural disaster, or war.
                    </p>
                    <p>
                      Millions of people use thousands of dapps on Ethereum
                      every day. While high demand can lead to elevated
                      transaction fees, it reflects the strength of a network
                      that prioritizes security, decentralization, and the
                      guarantee that it&apos;s always available when you need
                      it.
                    </p>
                  </HighlightCardContent>
                </div>
              </HighlightCard>
            </HighlightStack>

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

            <Link
              href="/layer-2/networks/"
              className="group block no-underline"
            >
              <span className={twFlipForRtl}>→</span>{" "}
              <span className="group-hover:underline">
                Learn more about the Ethereum network
              </span>
            </Link>
          </Section>

          <Section
            id={getId(tocItems[2].url)}
            className="space-y-8 rounded-4xl border border-accent-a/20 bg-gradient-to-b from-accent-a/5 to-accent-a/15 px-4 py-6 lg:p-12"
          >
            <div className="flex flex-col items-center justify-center gap-4 xl:flex-row">
              <Image
                src={etherBanner}
                alt="Open hands holding ether glyph"
                sizes="224px"
                className="w-56"
              />
              <h2 className="w-full text-3xl font-black lg:text-5xl">
                {tocItems[2].title}
              </h2>
            </div>

            <div className="space-y-6">
              <p>Ether (ETH) is the native cryptocurrency of Ethereum.</p>
              <p>
                It&apos;s a new kind of{" "}
                <strong>
                  digital money you can send to anyone, anywhere in the world in
                  seconds
                </strong>{" "}
                for as little as a few cents. But ETH is about more than just
                payments. It plays a vital role in keeping the Ethereum network
                running.
              </p>
              <p>
                When you use Ethereum to send money, collect art or build a new
                dapp, you pay a small <strong>transaction fee</strong> (or gas
                fee) <strong>in ETH</strong>. This fee helps prevent spam and
                rewards the people called validators who process transactions.
              </p>
              <p>
                These{" "}
                <strong>validators help secure the ethereum network</strong>{" "}
                through a system called staking. By locking up their ETH
                they&apos;re eligible to process transactions. In return, they
                earn ETH as a reward. This gives Ethereum its own
                self-sustaining economy, powered by users rather than companies.
              </p>
              <p>
                Unlike many traditional currencies,{" "}
                <strong>ETH can become more scarce over time</strong>. Every
                time someone uses Ethereum, a small portion of ETH is burned,
                which permanently removes it from the supply. On busy days, more
                ETH is burned than created, making ETH deflationary and
                increasing its value over time. The more Ethereum is used, the
                more ETH is burned.
              </p>
              <p>
                Because of this, many people see ETH as an investment and choose
                to hold, stake or lend it to grow their savings.
              </p>
            </div>

            <Link href="/eth/" className="group block no-underline">
              <span className={twFlipForRtl}>→</span>{" "}
              <span className="group-hover:underline">
                Learn more about ether (ETH)
              </span>
            </Link>
          </Section>

          <Section
            id={getId(tocItems[3].url)}
            className="space-y-8 rounded-4xl border border-accent-c/20 bg-gradient-to-b from-accent-c/5 to-accent-c/15 px-4 py-6 lg:p-12"
          >
            <div className="flex flex-col items-center gap-4 xl:flex-row-reverse">
              <Image
                src={howBanner}
                alt="Man repairing computer"
                sizes="288px"
                className="w-full max-w-72"
              />
              <h2 className="w-full text-3xl font-black lg:text-5xl">
                {tocItems[3].title}
              </h2>
            </div>

            <div className="space-y-6">
              <p>
                When Ethereum launched in 2015, it used a system called Proof of
                Work.
              </p>
              <p>
                This mechanism pioneered by Bitcoin, is how all computers agreed
                on who owns what. Computers would use a lot of energy trying to
                solve a complex mathematical puzzle. The winner would get to
                propose a block of incoming transactions and earn new ETH.
              </p>
              <p>
                In 2022, Ethereum upgraded to a new system called{" "}
                <strong>Proof of Stake</strong>{" "}
                <a>that&apos;s 99% more energy efficient</a>. Instead of
                mathematical puzzles, validators lock their ETH as a security
                deposit to earn the right to process transactions.
              </p>
              <p>
                If they do it correctly, they earn ETH. If they cheat, they lose
                some of their stake.
              </p>
              <p>Here&apos;s an example:</p>
              <p className="text-lg font-bold">
                When you send $10 in stablecoins to a friend on Ethereum:
              </p>
              <OrderedList className="[&>li]:mb-0.5">
                <ListItem>
                  You open your wallet, add the account address and the amount,
                  then click send.
                </ListItem>
                <ListItem>
                  Your wallet signs the payment and broadcasts it to the
                  network.
                </ListItem>
                <ListItem>
                  The payment waits in the public queue (mempool) until a block
                  proposer picks it.
                </ListItem>
                <ListItem>
                  The block proposer adds it to the next block of transactions,
                  broadcasts it, and earns a fee.
                </ListItem>
                <ListItem>
                  The stablecoin contract moves $10 from you to your friend, and
                  both wallets update.
                </ListItem>
                <ListItem>
                  A global network of validators double-check and attest to the
                  validity of the changes.
                </ListItem>
              </OrderedList>
              <p className="text-lg font-bold">
                When you mint a $5 collectible on Ethereum:
              </p>
              <OrderedList className="[&>li]:mb-0">
                <ListItem>
                  You connect your wallet to the dapp and choose the item to
                  mint.
                </ListItem>
                <ListItem>
                  You confirm the purchase; the wallet signs and broadcasts the
                  transaction.
                </ListItem>
                <ListItem>
                  The mint request joins the mempool and is added to a block by
                  a validator.
                </ListItem>
                <ListItem>
                  The NFT smart contract records your wallet as the new owner.
                </ListItem>
                <ListItem>
                  Your new collectible appears in your wallet a few seconds
                  later.
                </ListItem>
              </OrderedList>
              <p>
                This is all possible thanks to the power of smart contracts;
                open-source programs that live on Ethereum and run 24/7, 365
                accessible to anyone, anywhere.
              </p>
              <p>
                <span className="font-bold">
                  Every transaction, update, and action is synced across
                  thousands of independent nodes.
                </span>{" "}
                This gives Ethereum its reliability, transparency, and
                censorship resistance.
              </p>
              <div>
                <Link href="/learn/" className="group block no-underline">
                  <span className={twFlipForRtl}>→</span>{" "}
                  <span className="group-hover:underline">
                    Learn more about how Ethereum works
                  </span>
                </Link>
                <Link
                  href="/developers/docs/"
                  className="group block no-underline"
                >
                  <span className={twFlipForRtl}>→</span>{" "}
                  <span className="group-hover:underline">
                    Read developer docs for a technical overview of Ethereum
                  </span>
                </Link>
              </div>
            </div>
          </Section>

          <Section id={getId(tocItems[4].url)} className="space-y-14">
            <Image
              src={whatBanner}
              alt=""
              sizes="320px"
              className="mx-auto w-80 -scale-x-100"
            />
            <h2 className="w-full text-3xl/snug font-bold lg:text-4xl/tight">
              {tocItems[4].title}
            </h2>
            <div className="space-y-6">
              <p>
                People use Ethereum to do things that weren&apos;t possible
                before.
              </p>
              <p>
                Farmers in Kenya can receive{" "}
                <a>automated insurance on their crops</a> without applying to a
                bank. Businesses like <strong>Visa</strong> can launch{" "}
                <a>new payment systems that works globally</a> from day one.
                Global organizations like the <strong>UN</strong> can deliver{" "}
                <a>aid to refugees</a> saving millions in bank fees.
              </p>
              <p>
                These dapps and assets run on Ethereum using open-source code
                and can&apos;t be restricted, censored or turned off.
              </p>
              <p>Here&apos;s how different groups are using it today:</p>
            </div>

            <HighlightStack data-label="what-is-table">
              <HighlightCard>
                <IconBox>
                  <User className="text-accent-a" />
                </IconBox>
                <div>
                  <CardTitle className="mb-2">Consumers</CardTitle>
                  <HighlightCardContent>
                    <p>
                      Millions of people already use dapps on Ethereum to move
                      money, trade, and own digital assets every day. Unlike
                      traditional apps, there&apos;s no need to register with
                      your name, wait for a bank to approve you, or hand over
                      your personal data.
                    </p>
                    <p>
                      With just a wallet and an internet connection you can:
                    </p>
                    <UnorderedList className="[&>li]:mb-0.5">
                      <ListItem>
                        Access financial services without a bank account or
                        credit history
                      </ListItem>
                      <ListItem>
                        Own digital collectibles, art, and assets that
                        can&apos;t be copied or confiscated
                      </ListItem>
                      <ListItem>
                        Sign into dapps using your wallet, not your email — no
                        passwords, no personal information necessary
                      </ListItem>
                      <ListItem>
                        Participate in global communities where you can vote,
                        contribute, and earn borderlessly
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
                    Businesses & developers
                  </CardTitle>
                  <HighlightCardContent>
                    <UnorderedList className="[&>li]:mb-0.5">
                      <ListItem>
                        Launch dapps with built-in global payments system from
                        day one
                      </ListItem>
                      <ListItem>
                        Deploy tamper-proof contracts that{" "}
                        <strong>automatically enforce agreements</strong>
                      </ListItem>
                      <ListItem>
                        Create financial products that anyone can build on and
                        drive value to{" "}
                      </ListItem>
                    </UnorderedList>
                    <p>
                      For example,{" "}
                      <a>
                        PayPal launched its own stablecoin, PYUSD, on Ethereum
                      </a>
                      . This is a sign that even the world&apos;s largest
                      payments companies see the benefit of Ethereum&apos;s open
                      and programmable nature.
                    </p>
                  </HighlightCardContent>
                </div>
              </HighlightCard>
              <HighlightCard>
                <IconBox>
                  <Landmark className="text-accent-c" />
                </IconBox>
                <div>
                  <CardTitle className="mb-2">Governments</CardTitle>
                  <HighlightCardContent>
                    <p>
                      Governments are also starting to explore what Ethereum
                      makes possible.
                    </p>
                    <UnorderedList className="[&>li]:mb-0.5">
                      <ListItem>
                        <strong>Distribute public funds</strong> and benefits
                        directly to citizens with full transparency
                      </ListItem>
                      <ListItem>
                        <strong>Issue digital IDs</strong> or records that are
                        verifiable and portable across borders
                      </ListItem>
                      <ListItem>
                        Build{" "}
                        <strong>
                          tamper-proof public infrastructure for voting
                        </strong>
                        , land titles, and registries
                      </ListItem>
                    </UnorderedList>
                    <p>
                      In another case, Ukraine&apos;s Ministry of Digital
                      Transformation{" "}
                      <a>used Ethereum to distribute wartime aid</a>.
                    </p>
                    <p>
                      Funds were sent directly to citizens and NGOs using open
                      smart contracts, providing transparency, speed, and
                      accountability during a crisis.
                    </p>
                  </HighlightCardContent>
                </div>
              </HighlightCard>
            </HighlightStack>

            <Link
              href="/learn/" // TODO: Confirm links
              className="group block no-underline"
            >
              <span className={twFlipForRtl}>→</span>{" "}
              <span className="group-hover:underline">
                Learn more about what Ethereum is used for
              </span>
            </Link>
          </Section>

          <Section id={getId(tocItems[5].url)} className="space-y-14">
            <Image
              src={startBanner}
              alt=""
              sizes={`(max-width: 800px) 100vw, (max-width: ${screens.xl}) 800px, (max-width: ${screens.xl}) calc(100vw - 480px), 800px`}
            />
            <div>
              <h2 className="mb-2 w-full text-3xl/snug font-bold lg:text-4xl/tight">
                {tocItems[5].title}
              </h2>
              <div className="space-y-6">
                <p>
                  Getting started with Ethereum is easier than you might think.
                </p>
                <p>
                  You don&apos;t need permission. You don&apos;t need a bank or
                  even an ID document. All you need to get started is a device
                  and an internet connection.
                </p>
              </div>
            </div>
            <div className="py-4 font-bold italic">TODO: StartCards</div>
          </Section>

          <Section id={getId(tocItems[6].url)}>
            <h2 className="mb-4 w-full text-3xl/snug font-bold lg:text-4xl/tight">
              {tocItems[6].title}
            </h2>

            <div className="space-y-6">
              <p>
                Bitcoin and Ethereum are the two biggest cryptocurrencies in the
                world.
              </p>

              <p>
                They both let you send money without a bank, both run on
                blockchain technology, and both are open to anyone. But
                that&apos;s where the similarities end.
              </p>

              <div>
                <h3 className="mb-1 mt-12 text-xl">
                  Bitcoin is like digital gold.
                </h3>
                <p>
                  It has a fixed supply of 21 million coins, a narrow focus on
                  peer-to-peer payments, and a basic scripting language that
                  limits what you can build with it. This simplicity is by
                  design since Bitcoin prioritizes predictability, durability,
                  and long-term security over flexibility.
                </p>
              </div>

              <div>
                <h3 className="mb-1 mt-12 text-xl">
                  Ethereum takes a broader approach.
                </h3>
                <p>
                  It&apos;s not just money, it&apos;s programmable
                  infrastructure. Instead of just sending and receiving value,
                  Ethereum lets developers build entire applications.
                  You&apos;ve already seen this in action: from lending markets
                  and stablecoins to collectibles, social media, and real-time
                  payments — all powered by smart contracts and secured by ETH.
                </p>
              </div>

              <div>
                <h3 className="mb-1 mt-12 text-xl">
                  The way the networks reach consensus is also different.
                </h3>
                <div className="space-y-6">
                  <p>
                    Bitcoin uses miners to secure the network. These are
                    powerful computers that compete to solve complex puzzle, and
                    the winner gets to add the next block of transactions to the
                    chain and claim bitcoins as a reward. This process is called
                    mining and it uses large amounts of electricity.
                  </p>
                  <p>
                    Ethereum used to work like this too. But in 2022, it
                    transitioned from Proof of Work to Proof of Stake. Today,
                    transactions are confirmed by validators who lock up ETH as
                    collateral. Honest validators earn ETH rewards while any
                    dishonest ones lose part of their stake. This shift made
                    Ethereum over 99.988% more energy efficient without
                    sacrificing security or decentralization.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="mb-1 mt-12 text-xl">
                  There&apos;s also a difference in how supply is handled.
                </h3>
                <div className="space-y-6">
                  <p>
                    Bitcoin has a fixed supply. There will only ever be 21
                    million coins. Ethereum, on the other hand, has a dynamic
                    supply. New ETH is issued to reward validators, while a
                    portion is burned with every transaction. This means
                    <strong>
                      Ethereum can&apos;t just “print infinite ETH.”
                    </strong>
                  </p>
                  <p>
                    The issuance rate is limited by how much ETH is staked. As
                    more ETH is staked, individual rewards decrease, creating a
                    natural balance. This design ensures a sustainable security
                    budget well into the future, without relying solely on
                    transaction fees.
                  </p>
                  <p>
                    In short, Bitcoin is a tool for sending value. Ethereum is a
                    platform for building it.
                  </p>
                </div>
              </div>

              <Link href="#TODO-get-link" className="group block no-underline">
                <span className={twFlipForRtl}>→</span>{" "}
                <span className="group-hover:underline">
                  Learn more about the difference between Ethereum and Bitcoin
                </span>
              </Link>
            </div>
          </Section>

          <Section id={getId(tocItems[7].url)} className="space-y-14">
            <Image
              src={whenWhoBanner}
              alt=""
              sizes="176px"
              className="mx-auto w-44"
            />

            <div className="space-y-4">
              <h2 className="w-full text-3xl/snug font-bold lg:text-4xl/tight">
                {tocItems[7].title}
              </h2>
              <div className="space-y-8">
                <div className="space-y-6">
                  <p>
                    From the start, Ethereum was designed to run by its
                    community.
                  </p>
                  <p>
                    In 2013, Vitalik Buterin published a white paper proposing a
                    new kind of blockchain for money and apps anyone could use.
                    The idea quickly gained traction.
                  </p>
                  <p>
                    By 2014, co-founders like Gavin Wood and Joseph Lubin joined
                    the effort, and the team raised funds through one of the
                    earliest crypto crowdfunding campaigns.
                  </p>
                  <p>Ethereum officially launched in July 2015.</p>
                </div>
                <div className="space-y-6">
                  <h3 className="text-xl">Key moments in Ethereum’s history</h3>
                  <OrderedList className="m-0 list-none [&>li]:mb-0">
                    <ListItem>
                      <span className="font-bold text-body-medium">2013:</span>{" "}
                      19-year-old Vitalik Buterin publishes the Ethereum
                      whitepaper
                    </ListItem>
                    <ListItem>
                      <span className="font-bold text-body-medium">2014:</span>{" "}
                      The Ethereum Foundation forms and launches a crowdfunding
                      campaign
                    </ListItem>
                    <ListItem>
                      <span className="font-bold text-body-medium">2015:</span>{" "}
                      Developers launch the Ethereum network with the Frontier
                      release
                    </ListItem>
                    <ListItem>
                      <span className="font-bold text-body-medium">2016:</span>{" "}
                      Smart contract exploit drains $60M (3.6M ETH) from The DAO
                      prompting a chain fork
                    </ListItem>
                    <ListItem>
                      <span className="font-bold text-body-medium">2020:</span>{" "}
                      Beacon Chain launch starts the move to Proof-of-Stake
                    </ListItem>
                    <ListItem>
                      <span className="font-bold text-body-medium">2021:</span>{" "}
                      “London” upgrade starts burning gas fees via EIP-1559
                    </ListItem>
                    <ListItem>
                      <span className="font-bold text-body-medium">2022:</span>{" "}
                      “The Merge” replaces mining with staking, cutting energy
                      use by 99%
                    </ListItem>
                    <ListItem>
                      <span className="font-bold text-body-medium">2025:</span>{" "}
                      “Pectra” upgrade improves smart wallet support and L2
                      compatibility
                    </ListItem>
                  </OrderedList>
                  <p>Today, no single person or company runs Ethereum.</p>
                </div>
                <Image
                  src={contributionBanner}
                  alt="Doge smiling at the computer"
                  sizes="208px"
                  className="mx-auto w-52"
                />
                <div className="space-y-6">
                  <h3 className="text-xl">
                    The network is maintained by a broad group of contributors:
                  </h3>
                  <UnorderedList className="[&>li]:mb-0">
                    <ListItem>
                      Developers who write and propose upgrades
                    </ListItem>
                    <ListItem>
                      Node operators contributing to distributed physical
                      infrastructure
                    </ListItem>
                    <ListItem>Stakers who validate transactions</ListItem>
                    <ListItem>
                      Community members who build the tools and culture
                    </ListItem>
                    <ListItem>
                      <strong>You</strong> by using the network
                    </ListItem>
                  </UnorderedList>
                  <p>
                    <span className="font-bold">
                      There’s no CEO, board, or central authority.
                    </span>{" "}
                    The Ethereum Foundation still helps fund research and
                    development, but the ecosystem runs on open participation.
                  </p>
                  <p>
                    Changes are proposed through{" "}
                    <a>Ethereum Improvement Proposals (EIPs)</a>, discussed
                    publicly, and only adopted{" "}
                    <a>if the wider community supports them</a>.
                  </p>
                  <p>
                    This makes Ethereum slower to change than a startup, but
                    also much harder to shut down or take over.
                  </p>
                </div>
                <Link href="/history/" className="group block no-underline">
                  <span className={twFlipForRtl}>→</span>{" "}
                  <span className="group-hover:underline">
                    Learn more about Ethereum&apos;s history
                  </span>
                </Link>
              </div>
            </div>
          </Section>

          <Section id={getId(tocItems[8].url)} className="space-y-14">
            <h2 className="w-full text-3xl/snug font-bold lg:text-4xl/tight">
              {tocItems[8].title}
            </h2>
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
