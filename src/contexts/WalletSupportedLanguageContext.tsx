import { createContext } from "react"

import { WalletSupportedLanguageContext } from "@/lib/types"

import { DEFAULT_LOCALE } from "@/lib/constants"

// Context API for /find-wallets language support filter
export const WalletSupportedLanguageContext =
  createContext<WalletSupportedLanguageContext>({
    supportedLanguage: DEFAULT_LOCALE,
    setSupportedLanguage: () => {},
  })
