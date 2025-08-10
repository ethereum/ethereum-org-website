import { Castle, ChevronDown, LockKeyhole, Shield } from "lucide-react"
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

import { cn } from "@/lib/utils/cn"
import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getDirection } from "@/lib/utils/direction"
import { getMetadata } from "@/lib/utils/metadata"
import { screens } from "@/lib/utils/screen"

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

            <div data-label="TODO-what-is-table">
              <div className="flex flex-col gap-4 border-b pb-8 lg:flex-row">
                <IconBox>
                  <Shield className="text-accent-a" />
                </IconBox>
                <div>
                  <h3 className="mb-2 text-2xl">Censorship resistant</h3>
                  <div className="space-y-6">
                    <p className="text-body-medium">
                      While traditional apps and financial services rely on
                      banks or corporations that can decide to block access or
                      freeze accounts, dapps on Ethereum are censorship
                      resistant.
                    </p>
                    <p className="text-body-medium">
                      This is because ethereum&apos;s network of nodes record
                      every single transaction without discrimination—and this
                      rule is embedded in the code.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 border-b py-8 lg:flex-row">
                <IconBox>
                  <LockKeyhole className="text-accent-b" />
                </IconBox>
                <div>
                  <h3 className="mb-2 text-2xl">Highly secure</h3>
                  <div className="space-y-6">
                    <p className="text-body-medium">
                      While many apps today are hosted on cloud providers like
                      AWS and can be vulnerable to takedowns and attacks, dapps
                      on Ethereum are secured by the network itself. Every node
                      stores and syncs the entire state of Ethereum, including
                      all contracts.
                    </p>
                    <p className="text-body-medium">
                      If someone tried to change a contract, the network would
                      reject it since it wouldn&apos;t match their records. To
                      take down a single app, attackers need to take over the
                      entire network, which would costs billions and be
                      extremely hard to coordinate.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 pt-8 lg:flex-row">
                <IconBox>
                  <Castle className="text-accent-c" />
                </IconBox>
                <div>
                  <h3 className="mb-2 text-2xl">Durable and reliable</h3>
                  <div className="space-y-6">
                    <p className="text-body-medium">
                      Downtime on cloud hosting platforms can take apps offline,
                      but Ethereum&apos;s design ensures <a>perfect uptime</a>.
                      The network will keep running even if some nodes go
                      offline due to software bugs, government crackdowns,
                      natural disaster, or war.
                    </p>
                    <p className="text-body-medium">
                      Millions of people use thousands of dapps on Ethereum
                      every day. While high demand can lead to elevated
                      transaction fees, it reflects the strength of a network
                      that prioritizes security, decentralization, and the
                      guarantee that it&apos;s always available when you need
                      it.
                    </p>
                  </div>
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
                className="mx//-auto w-56"
              />
              <h3 className="flex-1 text-3xl font-black lg:text-5xl">
                {tocItems[2].title}
              </h3>
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
            <div className="flex flex-col gap-4 lg:items-center xl:flex-row-reverse">
              <Image
                src={howBanner}
                alt="Man repairing computer"
                sizes="288px"
                className="mx-auto w-full max-w-72"
              />
              <h3 className="flex-1 text-3xl font-black lg:text-5xl">
                {tocItems[3].title}
              </h3>
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
              <OrderedList className="[&>li]:mb-0">
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
