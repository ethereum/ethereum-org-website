import { getMetadata } from "@/lib/utils/metadata"

import { routing } from "@/i18n/routing"

const Page = async () => {
  return <h1 className="text-center font-black">ethereum.org</h1>
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({
    locale,
  }))
}

export async function generateMetadata() {
  return await getMetadata({
    locale: "en",
    slug: [""],
    title: "ethereum.org",
    description: "Empty page test",
  })
}

export default Page
