import InterceptedWalletDetail from "../../_components/InterceptedWalletDetail"

type ModalParams = { locale: string; wallet: string }

/**
 * Intercepts `/wallets/find-wallet/[wallet]` when navigated to from within the
 * find-wallet subtree, rendering the wallet detail as a modal over the catalog.
 * A direct load / refresh of the same URL renders the standalone `[wallet]`
 * page instead.
 */
export default async function InterceptedWalletModal(props: {
  params: Promise<ModalParams>
}) {
  const { locale, wallet } = await props.params
  return <InterceptedWalletDetail locale={locale} walletSlug={wallet} />
}
