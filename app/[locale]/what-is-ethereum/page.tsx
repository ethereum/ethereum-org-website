import { ChevronDown } from "lucide-react"
import { getTranslations } from "next-intl/server"

import type { CommitHistory, Lang } from "@/lib/types"

import FileContributors from "@/components/FileContributors"
import ContentHero, { ContentHeroProps } from "@/components/Hero/ContentHero"
import { Image } from "@/components/Image"
import ListenToPlayer from "@/components/ListenToPlayer/server"
import MainArticle from "@/components/MainArticle"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"

import networksBanner from "@/public/images/heroes/learn-hub-hero.png"
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

  const heroProps: ContentHeroProps = {
    breadcrumbs: { slug: "learn/what-is-ethereum", startDepth: 1 },
    heroImg,
    title: "What is Ethereum?",
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
          className="mb-16 h-fit shrink-0 rounded border bg-accent-a/10 px-3 py-2 max-lg:text-center lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:min-w-80 lg:text-body-medium"
        >
          <span className="font-bold lg:text-lg">On this page</span>
          <ChevronDown className="inline lg:hidden" />
        </div>

        <div
          data-label="content"
          className="max-w-screen-md space-y-16 lg:col-start-1 lg:row-start-2"
        >
          <Section className="">
            <p className="">
              Ethereum is an open, public blockchain{" "}
              <strong>launched in July 2015</strong> by a software developer
              called Vitalik Buterin and a small team of co-founders.
            </p>
            <p className="">
              The idea behind Ethereum was simple. While Bitcoin let you send
              and receive digital cash, Ethereum would build on this with
              open-source programs called <a>smart contracts</a>.
            </p>
            <p className="">
              <strong>Smart contracts</strong> let anyone create their own
              digital assets and decentralized applications (dapps) that run
              24/7, globally. And unlike banks, corporations or other
              institutions, smart contracts are available to anyone with an
              internet connection.
            </p>
            <p className="">
              Since 2015, Ethereum has grown into a thriving ecosystem of
              digital assets like <strong>stablecoins</strong>, non-fungible
              tokens (<strong>NFTs</strong>), and governance tokens, as well as
              a sprawling world of dapps for decentralized finance (
              <strong>DeFi</strong>), art and collectibles, gaming and
              decentralized social media.
            </p>
            <p className="">
              Collectively, this ecosystem is called &quot;<strong>web3</strong>
              &quot;, representing the third phase of the{" "}
              <strong>internet centered around ownership</strong>.
            </p>
            <p className="">
              Today, Ethereum is used by <a>millions of people</a> around the
              world <a>holding billions of dollars</a> in assets who send and
              receive <a>trillions of dollars</a> every year — all without a
              bank.
            </p>
            <p className="">
              At the heart of all this is Ethereum&apos;s native cryptocurrency{" "}
              <strong>ether (ETH)</strong>, a new kind of digital money used to
              power the whole network.
            </p>
          </Section>

          <Section>
            <Image
              src={networksBanner}
              alt="Illustration of futuristic Ethereum community center"
            />
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
