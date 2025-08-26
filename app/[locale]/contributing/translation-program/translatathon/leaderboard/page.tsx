import { setRequestLocale } from "next-intl/server"

import { dataLoader } from "@/lib/utils/data/dataLoader"
import { getMetadata } from "@/lib/utils/metadata"

import { BASE_TIME_UNIT } from "@/lib/constants"

import { fetchTranslatathonTranslators } from "@/lib/api/fetchTranslatathonTranslators"

// 24 hours
const REVALIDATE_TIME = BASE_TIME_UNIT * 24

const loadData = dataLoader(
  [["translatathonTranslators", fetchTranslatathonTranslators]],
  REVALIDATE_TIME * 1000
)

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params

  setRequestLocale(locale)

  const [translatathonTranslators] = await loadData()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-bold">
          2025 Ethereum.org Translatathon
        </h1>
        {translatathonTranslators.length > 0 ? (
          <div>
            <h2>{translatathonTranslators.length} Translators</h2>
            {translatathonTranslators.map((translator) => (
              <div key={translator.username}>
                <h2>{translator.username}</h2>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">No data available</div>
        )}
      </div>
    </div>
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
    slug: ["translatathon"],
    title: "2025 Ethereum.org Translatathon",
    description: "2025 Ethereum.org Translatathon",
  })
}

export default Page
