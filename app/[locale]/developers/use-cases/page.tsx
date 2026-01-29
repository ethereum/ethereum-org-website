import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { PageParams } from "@/lib/types"

import Breadcrumbs from "@/components/Breadcrumbs"
import { SimpleHero } from "@/components/Hero"
import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"

import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"
import { getUseCasesData } from "@/lib/utils/use-cases.server"

import { UseCaseExplorer } from "./_components/UseCaseExplorer"
import UseCasesJsonLD from "./page-jsonld"

const Page = async ({ params }: { params: PageParams }) => {
  const { locale } = params

  setRequestLocale(locale)

  // Fetch use cases data from API
  const useCases = await getUseCasesData()

  // Extract unique categories from use cases
  const categories = [...new Set(useCases.map((uc) => uc.category))]

  // Get translations
  const t = await getTranslations({ locale, namespace: "page-use-cases" })

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage(
    "/developers/use-cases"
  )
  const messages = pick(allMessages, requiredNamespaces)

  return (
    <>
      <UseCasesJsonLD locale={locale} />
      <I18nProvider locale={locale} messages={messages}>
        <SimpleHero
          breadcrumbs={<Breadcrumbs slug="/developers/use-cases" />}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <MainArticle className="flex flex-col gap-8 px-4 py-10 md:px-8">
          <section>
            <h2 className="mb-4 text-2xl font-bold">{t("explore-title")}</h2>
            <p className="mb-8 text-lg text-body-medium">
              {t("explore-description")}
            </p>
            <UseCaseExplorer useCases={useCases} categories={categories} />
          </section>
        </MainArticle>
      </I18nProvider>
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}) {
  const { locale } = params
  const t = await getTranslations({ locale, namespace: "page-use-cases" })

  return await getMetadata({
    locale,
    slug: ["developers", "use-cases"],
    title: t("meta-title"),
    description: t("meta-description"),
  })
}

export default Page
