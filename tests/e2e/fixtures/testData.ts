import en from "@/intl/en/common.json"
import enStart from "@/intl/en/page-start.json"
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
        name: en["learn"],
        subsections: [en["nav-learn-basics-label"]],
      },
      {
        name: en["use"],
        subsections: [en["nav-use-find-wallets-label"]],
      },
      {
        name: en["build"],
        subsections: [en["nav-builders-home-label"]],
      },
    ],
  },

  content: {
    headings: {
      homepage: en["site-title"],
      startPage: enStart["page-start-meta-title"],
      findWallet: en["nav-find-wallet-label"],
      notFoundEn: en["we-couldnt-find-that-page"],
      notFoundEs: es["we-couldnt-find-that-page"],
    },
  },
}
