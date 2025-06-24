import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import Breadcrumbs from "@/components/Breadcrumbs"
import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"

import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { DAPPS_STAFF_PICK_DATA } from "@/data/dapps"
import { dappsCategories } from "@/data/dapps/categories"

import DappCard from "./_components/DappCard"
import DappsHighlight from "./_components/DappsHighlight"
import TopDapps from "./_components/TopDapps"

const Page = async ({ params }: { params: { locale: string } }) => {
  const { locale } = await params

  setRequestLocale(locale)

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/dapps")
  const messages = pick(allMessages, requiredNamespaces)
  return (
    <I18nProvider locale={locale} messages={messages}>
      <div className="flex flex-col gap-4 px-4 py-10 md:px-8">
        <Breadcrumbs slug={"/dapps"} />
        <h1>App store</h1>
        <p>
          Discover a list of curated applications that run on ethereum and layer
          2 networks
        </p>
        <div>
          <ButtonLink variant="outline" isSecondary href="/dapps/learn">
            Learn about apps
          </ButtonLink>
        </div>
      </div>

      <MainArticle className="flex flex-col gap-32 py-10">
        <div className="flex flex-col gap-8 px-4 md:px-8">
          <h2>Highlights</h2>
          <DappsHighlight />
        </div>

        <div className="flex flex-col gap-4 px-4 md:px-8">
          <h2>Staff picks</h2>
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {DAPPS_STAFF_PICK_DATA.map((dapp) => (
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
          <TopDapps />
        </div>

        {/* Note: Implemented this instead of swiper from design to allow for SSR */}
        <div className="flex flex-col gap-4 px-4 md:px-8">
          <h2>Application categories</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Object.values(dappsCategories).map((category) => (
              <LinkBox
                key={category.slug}
                className="flex flex-col rounded-3xl border border-[rgba(159,43,212,0.11)] bg-card-gradient-secondary p-6 hover:bg-card-gradient-secondary-hover hover:shadow-lg"
              >
                <div className="mb-3 flex gap-4">
                  <div>
                    <category.icon className="text-primary" size={24} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <LinkOverlay
                      href={`/dapps/categories/${category.slug}`}
                      className="text-body no-underline"
                    >
                      <h3>{category.name}</h3>
                    </LinkOverlay>
                    <p className="text-body-medium">{category.description}</p>
                  </div>
                </div>
              </LinkBox>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 px-4 md:px-8">
          <h2>Community picks</h2>
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
