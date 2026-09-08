import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { PageParams } from "@/lib/types"

import PageHero from "@/components/Hero/PageHero"
import MainArticle from "@/components/MainArticle"

import { getMetadata } from "@/lib/utils/metadata"
import {
  getCatalogWallets,
  getLastUpdatedDisplay,
  getWalletLanguageOptions,
  getWalletNetworks,
  getWalletsByPersona,
  isWalletPersonaId,
  WALLET_PERSONA_IDS,
  WALLET_PERSONAS,
} from "@/lib/utils/walletData"

import FindWalletBreadcrumbs from "../../_components/FindWalletBreadcrumbs"
import WalletsPageBody from "../../_components/WalletsPageBody"

import PersonaPageJsonLD from "./page-jsonld"

export const revalidate = false

type PersonaPageParams = PageParams & { persona: string }

const getPersona = (id: string) =>
  WALLET_PERSONAS.find((persona) => persona.id === id)

const Page = async (props: { params: Promise<PersonaPageParams> }) => {
  const { locale, persona: personaId } = await props.params
  setRequestLocale(locale)

  if (!isWalletPersonaId(personaId)) notFound()
  const persona = getPersona(personaId)!

  const t = await getTranslations({
    locale,
    namespace: "page-wallets-find-wallet",
  })

  // The catalog gets every wallet with this persona pre-selected, so a second
  // persona can be added client-side; only the structured data stays subset-only.
  const wallets = getCatalogWallets(locale)
  const personaWallets = getWalletsByPersona(wallets, personaId)
  const networks = getWalletNetworks(wallets)
  const languages = getWalletLanguageOptions(wallets, locale)

  const lastUpdatedDisplay = getLastUpdatedDisplay(personaWallets, locale)

  return (
    <>
      <PersonaPageJsonLD
        locale={locale}
        persona={persona}
        wallets={personaWallets}
      />
      <MainArticle className="relative flex flex-col">
        <PageHero
          breadcrumbs={
            <FindWalletBreadcrumbs locale={locale} leaf={t(persona.titleKey)} />
          }
          title={t(persona.heroTitleKey)}
          description={t(persona.heroDescKey)}
          variant="no-divider"
        />
        <WalletsPageBody
          locale={locale}
          wallets={wallets}
          networks={networks}
          languages={languages}
          lastUpdatedDisplay={lastUpdatedDisplay}
          initialPersonaId={personaId}
        />
      </MainArticle>
    </>
  )
}

export function generateStaticParams() {
  return WALLET_PERSONA_IDS.map((persona) => ({ persona }))
}

export async function generateMetadata(props: {
  params: Promise<PersonaPageParams>
}) {
  const { locale, persona: personaId } = await props.params
  setRequestLocale(locale)

  if (!isWalletPersonaId(personaId)) return {}
  const persona = getPersona(personaId)!

  const t = await getTranslations({
    locale,
    namespace: "page-wallets-find-wallet",
  })

  return await getMetadata({
    locale,
    slug: ["wallets", "find-wallet", "personas", personaId],
    title: t(persona.heroTitleKey),
    description: t(persona.heroDescKey),
    image: "/images/wallets/wallet-hero.png",
  })
}

export default Page
