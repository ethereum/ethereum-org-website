import { setRequestLocale } from "next-intl/server"

import type { PageParams } from "@/lib/types"

import { getMetadata } from "@/lib/utils/metadata"

import SupportPage from "./_components/support"

export default async function Page({ params }: { params: PageParams }) {
  const { locale } = params

  setRequestLocale(locale)

  return <SupportPage />
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}) {
  const { locale } = params

  return await getMetadata({
    locale,
    slug: ["community", "support"],
    title: "Ethereum support",
    description: "Get support in the Ethereum ecosystem.",
  })
}
