import { getMetadata } from "@/lib/utils/metadata"

const Page = () => {
  return <div>What is ethereum network</div>
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return await getMetadata({
    locale,
    slug: ["what-is-ethereum-network"],
    title: "",
    description: "",
    twitterDescription: "",
    image: "",
  })
}

export default Page
