import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import Breadcrumbs from "@/components/Breadcrumbs"
import { SimpleHero } from "@/components/Hero"
import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"
import SubpageCard from "@/components/SubpageCard"

import { getHighlightedDapps, getStaffPickDapps } from "@/lib/utils/dapps"
import { dataLoader } from "@/lib/utils/data/dataLoader"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { dappsCategories } from "@/data/dapps/categories"

import { BASE_TIME_UNIT } from "@/lib/constants"

import DappCard from "./_components/DappCard"
import DappsHighlight from "./_components/DappsHighlight"
import SuggestAnApp from "./_components/SuggestAnApp"
import TopDapps from "./_components/TopDapps"

import { fetchDapps } from "@/lib/api/fetchDapps"

// 24 hours
const REVALIDATE_TIME = BASE_TIME_UNIT * 24

const loadData = dataLoader([["dappsData", fetchDapps]], REVALIDATE_TIME * 1000)

const Page = async ({ params }: { params: { locale: string } }) => {
  const { locale } = await params

  setRequestLocale(locale)

  const [dappsData] = await loadData()

  // Get 3 random highlighted dapps
  const highlightedDapps = getHighlightedDapps(dappsData, 3)

  // Get 6 random staff pick dapps
  const staffPickDapps = getStaffPickDapps(dappsData, 6)

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/apps")
  const messages = pick(allMessages, requiredNamespaces)
  return (
    <I18nProvider locale={locale} messages={messages}>
      <SimpleHero
        breadcrumbs={<Breadcrumbs slug={"/apps"} />}
        title="Apps"
        subtitle="Discover a list of curated applications that run on ethereum and layer 2 networks"
        // TODO: Add learn about apps button when we have info page
        // buttons={[
        //   {
        //     href: "/apps/learn",
        //     label: "Learn about apps",
        //     variant: "outline",
        //     isSecondary: true,
        //   },
        // ]}
      />

      <MainArticle className="flex flex-col gap-32 py-10">
        <div className="flex flex-col gap-8 px-4 md:px-8">
          <h2>Highlights</h2>
          <DappsHighlight dapps={highlightedDapps} />
        </div>

        <div className="flex flex-col gap-4 px-4 md:px-8">
          <h2>Staff picks</h2>
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {staffPickDapps.map((dapp) => (
              <DappCard
                key={dapp.name}
                dapp={dapp}
                imageSize={24}
                showDescription={true}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 px-4 md:px-8">
          <h2>Top applications</h2>
          <TopDapps dappsData={dappsData} />
        </div>

        {/* Note: Implemented this instead of swiper from design to allow for SSR */}
        <div className="flex flex-col gap-4 px-4 md:px-8">
          <h2>Application categories</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Object.values(dappsCategories).map((category) => (
              <SubpageCard
                key={category.slug}
                title={category.name}
                description={category.description}
                icon={<category.icon className="h-8 w-8" />}
                href={`/apps/categories/${category.slug}`}
              />
            ))}
          </div>
        </div>

        {/* TODO: Add community picks when we have a way to get them */}
        {/* <div className="flex flex-col gap-4 px-4 md:px-8">
          <h2>Community picks</h2>
        </div> */}

        <div className="flex flex-col px-4 md:px-8">
          <SuggestAnApp />
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
    namespace: "page-dapps",
  })

  return await getMetadata({
    locale,
    slug: ["dapps"],
    title: t("page-dapps-meta-title"),
    description: t("page-dapps-meta-description"),
  })
}

export default Page
