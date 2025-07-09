import { getTranslations } from "next-intl/server"

import type { Lang } from "@/lib/types"
import { ChildOnlyProp } from "@/lib/types"

import CalloutSSR from "@/components/CalloutSSR"
import { CopyButton } from "@/components/CopyToClipboard"
import FeedbackCard from "@/components/FeedbackCard"
import HubHero from "@/components/Hero/HubHero"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Card } from "@/components/ui/card"
import { VStack } from "@/components/ui/flex"
import Link from "@/components/ui/Link"
import InlineLink from "@/components/ui/Link"

import { getMetadata } from "@/lib/utils/metadata"

import BuilderCard from "./_components/BuilderCard"
import BuilderSwiper from "./_components/BuilderSwiper"
import SpeedRunCard from "./_components/SpeedRunCard"
import { getBuilderPaths } from "./utils"

import developersImage from "@/public/images/developers-eth-blocks.png"
import dogeImage from "@/public/images/doge-computer.png"
import heroImage from "@/public/images/heroes/developers-hub-hero.jpg"

const H2 = (props: ChildOnlyProp) => <h2 className="mb-8 mt-12" {...props} />

const H3 = (props: ChildOnlyProp) => <h3 className="mb-8 mt-10" {...props} />

const Text = (props: ChildOnlyProp) => <p className="mb-6" {...props} />

const Column = (props: ChildOnlyProp) => (
  <div className="mb-6 me-8 w-full flex-1 basis-1/3" {...props} />
)
const RightColumn = (props: ChildOnlyProp) => (
  <div className="mb-6 me-0 w-full flex-1 basis-1/3" {...props} />
)
const IntroColumn = (props: ChildOnlyProp) => (
  <div
    className="mb-6 me-0 mt-0 w-full flex-1 basis-1/3 sm:me-8 lg:mt-32"
    {...props}
  />
)

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
  return (
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
        <h2 className="-mb-4 mt-12">{t("page-developers-get-started")}</h2>

        {/* Desktop */}
        <div className="-mx-4 grid gap-6 max-md:hidden md:grid-cols-2 lg:grid-cols-4">
          {paths.map((path, idx) => (
            <BuilderCard path={path} key={idx} />
          ))}

          <SpeedRunCard {...speedRunDetails} />
        </div>

        {/* Mobile */}
        <div className="-mx-8 ps-4 md:hidden">
          <BuilderSwiper paths={paths} speedRunDetails={speedRunDetails} />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 xl:mb-12">
          <Card className="!space-y-8 break-words border border-accent-c/20 bg-gradient-to-t from-accent-c/15 to-accent-c/5 px-6 py-10 md:space-y-6 lg:p-12">
            <h3>{t("page-developers-jump-right-in-title")}</h3>
            <div className="space-y-6">
              <div className="space-y-1">
                <p className="font-bold">Scaffold-ETH 2</p>
                <p className="text-sm text-body-medium">
                  {t("page-developers-quickstart-scaffold-subtext")}{" "}
                  <Link href="https://docs.scaffoldeth.io/">
                    {t("page-developers-quickstart-scaffold-docs")}
                  </Link>
                </p>
                <div className="flex items-center rounded-lg border bg-background px-3 py-1">
                  <span className="flex-1 font-mono text-sm">
                    npx create-eth@latest
                  </span>
                  <CopyButton
                    message="npx create-eth@latest"
                    size="sm"
                    customEventOptions={{
                      eventCategory: "top_boxes",
                      eventAction: "click",
                      eventName: "scaffold",
                    }}
                  />
                </div>
              </div>
            </div>

            <div>
              <p className="mb-2 font-bold">Need to learn the language?</p>
              <Link
                href="https://docs.soliditylang.org/en/latest/"
                customEventOptions={{
                  eventCategory: "top_boxes",
                  eventAction: "click",
                  eventName: "solidity",
                }}
              >
                {t("page-developers-solidity-docs")}
              </Link>
            </div>
          </Card>
        </div>

        <div className="flex w-full flex-col items-start justify-between lg:flex-row lg:items-center">
          <IntroColumn>
            <H2>{t("page-developers-about")}</H2>
            <p className="mb-6 leading-xs text-body-medium">
              {t("page-developers-about-desc")}
            </p>
            <Text>{t("page-developers-about-desc-2")}</Text>
            <Text>
              {t("page-developers-feedback")}{" "}
              <InlineLink href="https://discord.gg/ethereum-org">
                {t("page-developers-discord")}
              </InlineLink>
            </Text>
          </IntroColumn>
          <CalloutSSR
            className="flex-auto md:flex-[1_1_416px]"
            image={developersImage}
            title={t("page-developers-improve-ethereum")}
            description={t("page-developers-improve-ethereum-desc")}
            alt={t("alt-eth-blocks")}
          >
            <div>
              <ButtonLink href="https://github.com/ethereum/ethereum-org-website">
                {t("page-developers-contribute")}
              </ButtonLink>
            </div>
          </CalloutSSR>
        </div>
      </MainArticle>

      <div className="mt-8 w-full border-t bg-background-highlight px-0 py-16 shadow-table-item-box">
        <div className="w-full scroll-mt-24 px-8 py-4">
          <H2>{t("page-developers-explore-documentation")}</H2>
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

            <InlineLink href="/developers/docs/consensus-mechanisms/pow/mining/">
              {t("page-developers-mining-link")}
            </InlineLink>
            <Text>{t("page-developers-mining-desc")}</Text>

            <InlineLink href="/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/">
              {t("page-developers-mining-algorithms-link")}
            </InlineLink>
            <Text>{t("page-developers-mining-algorithms-desc")}</Text>
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
            <H3>{t("page-developers-advanced")}</H3>
            <InlineLink href="/developers/docs/standards/tokens/">
              {t("page-developers-token-standards-link")}
            </InlineLink>
            <Text>{t("page-developers-token-standards-desc")}</Text>
            <InlineLink href="/developers/docs/mev/">
              {t("page-developers-mev-link")}
            </InlineLink>
            <Text>{t("page-developers-mev-desc")}</Text>
            <InlineLink href="/developers/docs/oracles/">
              {t("page-developers-oracles-link")}
            </InlineLink>
            <Text>{t("page-developers-oracle-desc")}</Text>
            <InlineLink href="/developers/docs/scaling/">
              {t("page-developers-scaling-link")}
            </InlineLink>
            <Text>{t("page-developers-scaling-desc")}</Text>
            <InlineLink href="/developers/docs/networking-layer/">
              {t("page-developers-networking-layer-link")}
            </InlineLink>
            <Text>{t("page-developers-networking-layer-desc")}</Text>
            <InlineLink href="/developers/docs/data-structures-and-encoding/">
              {t("page-developers-data-structures-and-encoding-link")}
            </InlineLink>
            <Text>
              {t("page-developers-data-structures-and-encoding-desc")}
            </Text>
          </RightColumn>
        </div>
      </div>
      <FeedbackCard />
    </VStack>
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
