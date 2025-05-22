import pick from "lodash.pick"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { Lang } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"

import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import CountDown from "./_components/CountDown"
import TenYearHero from "./_components/TenYearHero"

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params

  setRequestLocale(locale)

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage(
    "/10-year-anniversary"
  )
  const messages = pick(allMessages, requiredNamespaces)

  return (
    <I18nProvider locale={locale} messages={messages}>
      <MainArticle className="mx-auto flex w-full flex-col items-center gap-16">
        <TenYearHero />

        <div className="flex w-full flex-col gap-16 px-8 py-8 md:flex-row">
          <div className="flex flex-1 flex-col gap-5">
            <div>
              <h1 className="text-4xl font-bold">
                A decade of Transforming the World
              </h1>
              <p className="text-2xl font-bold">One block at a time</p>
            </div>
            <div className="flex flex-1 flex-col gap-4">
              <p className="text-lg">
                On July 30, 2015, at 3:44 p.m. UTC, the first block of the
                Ethereum blockchain came to life. The moment—when the Genesis
                block was mined—marked the beginning of a revolutionary journey
                that would forever change how we think about the internet,
                finance, and digital ownership.
              </p>
              <p className="text-lg">Ten years down, infinity to go! 🚀</p>
            </div>
          </div>
          <div className="flex flex-1 flex-row items-center justify-center">
            <CountDown />
          </div>
        </div>
      </MainArticle>
    </I18nProvider>
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
    namespace: "page-10-year-anniversary",
  })

  return await getMetadata({
    locale,
    slug: ["10-year-anniversary"],
    title: t("page-10-year-anniversary-meta-title"),
    description: t("page-10-year-anniversary-meta-description"),
  })
}

export default Page
