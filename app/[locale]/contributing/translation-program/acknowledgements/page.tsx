import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import ContentFeedback from "@/components/ContentFeedback"
import PageHero from "@/components/Hero/PageHero"
import I18nProvider from "@/components/I18nProvider"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import { Flex } from "@/components/ui/flex"
import InlineLink from "@/components/ui/Link"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"
import { ListItem, OrderedList } from "@/components/ui/list"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import allTimeData from "@/data/translation-reports/alltime/alltime-data.json"
import monthData from "@/data/translation-reports/month/month-data.json"
import quarterData from "@/data/translation-reports/quarter/quarter-data.json"

import ThemedCertificate from "./_components/themed-certificate"
import TranslationLeaderboard from "./_components/translation-leaderboard"
import PageJsonLD from "./page-jsonld"

import heroImg from "@/public/images/doge-computer.png"
import whatIsEthereumImg from "@/public/images/what-is-ethereum.png"

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const t = await getTranslations(
    "page-contributing-translation-program-acknowledgements"
  )

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage(
    "/contributing/translation-program/acknowledgements"
  )
  const messages = pick(allMessages, requiredNamespaces)

  const { contributors } = await getAppPageContributorInfo(
    "contributing/translation-program/acknowledgements",
    locale as Lang
  )

  return (
    <>
      <PageJsonLD locale={locale} contributors={contributors} />

      <PageHero
        breadcrumbs={{
          slug: "/contributing/translation-program/acknowledgements/",
        }}
        heroImg={heroImg}
        title={t(
          "page-contributing-translation-program-acknowledgements-acknowledgement-page-title"
        )}
        description={
          <>
            <p>
              {t(
                "page-contributing-translation-program-acknowledgements-acknowledgement-page-1"
              )}
            </p>
            <p>
              {t(
                "page-contributing-translation-program-acknowledgements-acknowledgement-page-2"
              )}
            </p>
            <p>
              {t(
                "page-contributing-translation-program-acknowledgements-acknowledgement-page-3"
              )}{" "}
              <InlineLink href="/contributing/translation-program/contributors/">
                {t(
                  "page-contributing-translation-program-acknowledgements-acknowledgement-page-link"
                )}
              </InlineLink>
              .
            </p>
            <p>
              {t(
                "page-contributing-translation-program-acknowledgements-acknowledgement-page-4"
              )}
            </p>
          </>
        }
      />

      <MainArticle className="space-y-20 px-4 py-12 lg:space-y-24 lg:px-8">
        <Section className="mx-auto max-w-3xl space-y-8">
          <h2 className="text-center">
            {t(
              "page-contributing-translation-program-acknowledgements-translation-leaderboard-title"
            )}
          </h2>
          <I18nProvider locale={locale} messages={messages}>
            <TranslationLeaderboard
              monthData={monthData}
              quarterData={quarterData}
              allTimeData={allTimeData}
            />
          </I18nProvider>
          <p>
            {t(
              "page-contributing-translation-program-acknowledgements-translation-leaderboard-1"
            )}
          </p>
        </Section>

        <Section className="space-y-8">
          <h2>
            {t(
              "page-contributing-translation-program-acknowledgements-our-translators-title"
            )}
          </h2>
          <p>
            {t(
              "page-contributing-translation-program-acknowledgements-our-translators-1"
            )}
          </p>
          <LinkBox className="my-8 flex flex-col shadow-table hover:scale-[1.02] hover:rounded hover:bg-background-highlight hover:shadow-table-box-hover hover:duration-100 focus:scale-[1.02] focus:rounded focus:shadow-table-box-hover focus:duration-100 md:flex-row">
            <Flex className="flex h-65 flex-row items-end justify-center bg-linear-to-r from-accent-a/10 to-accent-c/10">
              <Image
                src={whatIsEthereumImg}
                alt=""
                className="max-h-full self-center object-cover p-4"
                sizes="260px"
              />
            </Flex>
            <div className="flex flex-col justify-center p-6">
              <h3 className="mt-2 mb-4 text-2xl leading-snug">
                <LinkOverlay asChild>
                  <InlineLink
                    href="/contributing/translation-program/contributors/"
                    hideArrow
                    className="text-body no-underline"
                  >
                    {t(
                      "page-contributing-translation-program-acknowledgements-our-translators-view-all"
                    )}
                  </InlineLink>
                </LinkOverlay>
              </h3>
              <p className={"mb-0 text-body/65"}>
                {t(
                  "page-contributing-translation-program-acknowledgements-our-translators-cta"
                )}
              </p>
            </div>
          </LinkBox>
        </Section>

        <Section className="space-y-8" id="certificate">
          <h2>
            {t(
              "page-contributing-translation-program-acknowledgements-cert-title"
            )}
          </h2>
          <p>
            {t("page-contributing-translation-program-acknowledgements-cert-1")}
          </p>
          <p>
            {t("page-contributing-translation-program-acknowledgements-cert-2")}
          </p>
          <p>
            {t("page-contributing-translation-program-acknowledgements-cert-3")}
          </p>
          <Flex className="justify-center">
            <ThemedCertificate />
          </Flex>
        </Section>

        <Section className="space-y-8" id="oats">
          <h2>
            {t(
              "page-contributing-translation-program-acknowledgements-oats-title"
            )}
          </h2>
          <p>{t("page-contributing-translation-program-acknowledgements-1")}</p>
          <p>{t("page-contributing-translation-program-acknowledgements-2")}</p>
          <p>{t("page-contributing-translation-program-acknowledgements-3")}</p>
          <h3 className="mt-10 mb-8 leading-xs">
            {t(
              "page-contributing-translation-program-acknowledgements-how-to-claim-title"
            )}
          </h3>

          <OrderedList>
            <ListItem>
              {t(
                "page-contributing-translation-program-acknowledgements-how-to-claim-1"
              )}{" "}
              <InlineLink href="https://discord.gg/ethereum-org">
                {t(
                  "page-contributing-translation-program-acknowledgements-how-to-claim-1-discord"
                )}
              </InlineLink>
            </ListItem>
            <ListItem>
              {t(
                "page-contributing-translation-program-acknowledgements-how-to-claim-2"
              )}
            </ListItem>
            <ListItem>
              {t(
                "page-contributing-translation-program-acknowledgements-how-to-claim-3"
              )}
            </ListItem>
            <ListItem>
              {t(
                "page-contributing-translation-program-acknowledgements-how-to-claim-4"
              )}
            </ListItem>
          </OrderedList>
          <p>{t("page-contributing-translation-program-acknowledgements-4")}</p>
        </Section>

        <ContentFeedback />
      </MainArticle>
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const params = await props.params
  const { locale } = params

  const t = await getTranslations(
    "page-contributing-translation-program-acknowledgements"
  )

  return await getMetadata({
    locale,
    slug: ["contributing", "translation-program", "acknowledgements"],
    title: t(
      "page-contributing-translation-program-acknowledgements-meta-title"
    ),
    description: t(
      "page-contributing-translation-program-acknowledgements-meta-description"
    ),
  })
}

export default Page
