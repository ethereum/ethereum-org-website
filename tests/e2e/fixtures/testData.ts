import en from "@/intl/en/common.json"
import es from "@/intl/es/common.json"

/**
 * Test data and fixtures for e2e tests
 */

export const testData = {
  urls: {
    invalid: "/invalid-url",
    invalidInternationalized: "/es/invalid-url",
  },

  search: {
    validQuery: "smart contract",
    invalidQuery: "xyz123nonexistent",
  },

  navigation: {
    menu: [
      {
        name: en["nav-learn-label"],
        subsections: [
          en["nav-learn-basics-label"],
          en["nav-learn-ethereum-stack-label"],
          en["nav-learn-advanced-label"],
        ],
      },
      {
        name: en["nav-use-label"],
        subsections: [
          en["nav-use-find-wallets-label"],
          en["nav-use-get-eth-label"],
          en["nav-use-decentralized-applications-label"],
        ],
      },
      {
        name: en["nav-build-label"],
        subsections: [
          en["nav-build-builders-home-label"],
          en["nav-build-development-documentation-label"],
          en["nav-build-learn-by-coding-label"],
        ],
      },
    ],
  },

  content: {
    headings: {
      homepage: en["site-title"],
      findWallet: en["nav-find-wallet-label"],
      notFoundEn: en["we-couldnt-find-that-page"],
      notFoundEs: es["we-couldnt-find-that-page"],
    },
  },
}
