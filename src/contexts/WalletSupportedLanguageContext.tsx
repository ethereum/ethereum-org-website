import { createContext } from "react"

import { WalletSupportedLanguageContextType } from "@/lib/types"

import { DEFAULT_LOCALE } from "@/lib/constants"

// Context API for /find-wallets language support filter
export const WalletSupportedLanguageContext =
  createContext<WalletSupportedLanguageContextType>({
    supportedLanguage: DEFAULT_LOCALE,
    setSupportedLanguage: () => {},
  })
