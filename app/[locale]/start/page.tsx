import pick from "lodash.pick"
import { getMessages, setRequestLocale } from "next-intl/server"

import { Lang } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"
import { getNewToCryptoWallets } from "@/lib/utils/wallets"

import StartPage from "./_components/start"

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params

  setRequestLocale(locale)

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/start")
  const messages = pick(allMessages, requiredNamespaces)

  const newToCryptoWallets = getNewToCryptoWallets()
  const wallets = newToCryptoWallets.map((wallet) => ({
    ...wallet,
    supportedLanguages: [],
  }))

  return (
    <I18nProvider locale={locale} messages={messages}>
      <StartPage newToCryptoWallets={wallets} />
    </I18nProvider>
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
    slug: ["start"],
    title: "Start with crypto",
    description: "Your gateway to the world of ethereum",
    image: "/images/heroes/developers-hub-hero.jpg",
  })
}

export default Page
