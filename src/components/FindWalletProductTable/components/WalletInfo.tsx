import { useTranslation } from "react-i18next"

import { ButtonLink } from "@/components/Buttons"
import { SupportedLanguagesTooltip } from "@/components/FindWallet/WalletTable/SupportedLanguagesTooltip"
import { DevicesIcon, LanguagesIcon } from "@/components/icons/wallets"
import { TwImage } from "@/components/Image"
import { Badge } from "@/components/ui/badge"

import { formatStringList, getWalletPersonas } from "@/lib/utils/wallets"

const WalletInfo = ({ wallet }) => {
  const { t } = useTranslation("page-wallets-find-wallet")
  const walletPersonas = getWalletPersonas(wallet)
  const deviceLabels: Array<string> = []

  wallet.ios && deviceLabels.push(t("page-find-wallet-iOS"))
  wallet.android && deviceLabels.push(t("page-find-wallet-android"))
  wallet.linux && deviceLabels.push(t("page-find-wallet-linux"))
  wallet.windows && deviceLabels.push(t("page-find-wallet-windows"))
  wallet.macOS && deviceLabels.push(t("page-find-wallet-macOS"))
  wallet.chromium && deviceLabels.push(t("page-find-wallet-chromium"))
  wallet.firefox && deviceLabels.push(t("page-find-wallet-firefox"))
  wallet.hardware && deviceLabels.push(t("page-find-wallet-hardware"))

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4">
        <TwImage
          src={wallet.image}
          alt=""
          style={{ objectFit: "contain", width: "56px", height: "56px" }}
        />
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold">{wallet.name}</p>
          {walletPersonas.length > 0 && (
            <div className="flex flex-row gap-1">
              {walletPersonas.map((persona) => (
                <Badge key={persona} variant="productTable">
                  {t(persona)}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {deviceLabels.length > 0 && (
          <div className="flex flex-row gap-2">
            <DevicesIcon />
            {deviceLabels.join(" · ")}
          </div>
        )}
        <div className="flex flex-row gap-2">
          <LanguagesIcon />
          {formatStringList(wallet.supportedLanguages, 5)}{" "}
          <SupportedLanguagesTooltip
            supportedLanguages={wallet.supportedLanguages}
          />
        </div>
        <div>
          <ButtonLink
            href={wallet.url}
            variant="outline"
            w={{ base: "full", lg: "auto" }}
            isExternal
            size="sm"
            customEventOptions={{
              eventCategory: "WalletExternalLinkList",
              eventAction: "Tap main button",
              eventName: `${wallet.name}`,
            }}
          >
            {t("page-find-wallet-visit-website")}
          </ButtonLink>
        </div>
      </div>
    </div>
  )
}

export default WalletInfo
