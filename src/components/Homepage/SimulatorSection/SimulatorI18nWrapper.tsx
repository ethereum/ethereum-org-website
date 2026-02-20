"use client"

import { NextIntlClientProvider } from "next-intl"

/**
 * Minimal glossary translations for the SimulatorSection.
 *
 * The homepage is English-only, so we hardcode just the required translations
 * instead of loading the full glossary-tooltip namespace.
 */
const SIMULATOR_MESSAGES = {
  "glossary-tooltip": {
    "nft-term": "Non-fungible token (NFT)",
    "nft-definition":
      'A unique digital item you can own, like art or collectibles, verified by blockchain technology. <a href="/nft/">More on non-fungible tokens (NFTs)</a>.',
    "web3-term": "Web3",
    "web3-definition":
      'Web3 is the new internet with blockchain, where users control their data and transactions, not companies. No need to share any personal information. <a href="/web3/">More on web3</a>.',
  },
}

export function SimulatorI18nWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NextIntlClientProvider locale="en" messages={SIMULATOR_MESSAGES}>
      {children}
    </NextIntlClientProvider>
  )
}
