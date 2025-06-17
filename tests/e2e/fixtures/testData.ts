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
      { name: "Learn", subsections: ["Basics", "Ethereum Stack", "Advanced"] },
      {
        name: "Use",
        subsections: [
          "Find wallets",
          "Get ETH",
          "Decentralized applications (dapps)",
        ],
      },
      {
        name: "Build",
        subsections: [
          "Builder's home",
          "Development documentation",
          "Learn by coding",
        ],
      },
    ],
  },

  content: {
    headings: {
      homepage: "Ethereum.org",
      findWallet: "Choose your wallet",
      notFoundEn: "we couldn't find that page",
      notFoundEs: "no hemos podido encontrar esa página",
    },
  },
}
